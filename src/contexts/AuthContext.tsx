import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProgress {
  xp: number;
  level: number;
  badges: string[];
  completedGames: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
}

interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateProgress: (updates: Partial<UserProgress>) => Promise<void>;
  addBadge: (badgeId: string) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  badges: [],
  completedGames: [],
  completedQuizzes: [],
  quizScores: {}
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const progressDoc = await getDoc(doc(db, 'userProgress', user.uid));
        if (progressDoc.exists()) {
          setUserProgress(progressDoc.data() as UserProgress);
        } else {
          setUserProgress(defaultProgress);
        }
      } else {
        setUserProgress(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'userProgress', user.uid), {
      ...defaultProgress,
      displayName,
      createdAt: new Date().toISOString()
    });
    setUserProgress(defaultProgress);
  };

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
    setUserProgress(null);
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user || !userProgress) return;
    const newProgress = { ...userProgress, ...updates };
    await updateDoc(doc(db, 'userProgress', user.uid), updates);
    setUserProgress(newProgress);
  };

  const addBadge = async (badgeId: string) => {
    if (!user || !userProgress) return;
    if (!userProgress.badges.includes(badgeId)) {
      const newBadges = [...userProgress.badges, badgeId];
      await updateProgress({ badges: newBadges });
      
      // Trigger ESP32 reward dispenser
      try {
        await fetch('/api/trigger-reward', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: user.uid, 
            badgeId,
            timestamp: new Date().toISOString()
          })
        });
      } catch (error) {
        console.log('ESP32 trigger skipped (not configured)');
      }
    }
  };

  const addXP = async (amount: number) => {
    if (!user || !userProgress) return;
    const newXP = userProgress.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    await updateProgress({ xp: newXP, level: newLevel });
  };

  const value = {
    user,
    userProgress,
    loading,
    signUp,
    logIn,
    logOut,
    updateProgress,
    addBadge,
    addXP
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
