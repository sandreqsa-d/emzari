import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import RobotMascot from '@/components/RobotMascot';
import { quizzes, badges } from '@/data/quizData';
import { User, Award, Zap, Target, LogOut, Shield } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, userProgress, logOut } = useAuth();
  const navigate = useNavigate();

  if (!user || !userProgress) {
    navigate('/auth');
    return null;
  }

  const completedQuizzes = userProgress.completedQuizzes.length;
  const totalQuizzes = quizzes.length;
  const earnedBadges = userProgress.badges.length;
  const totalBadges = badges.length;

  const stats = [
    {
      icon: Zap,
      label: 'Total XP',
      value: userProgress.xp,
      color: 'text-primary'
    },
    {
      icon: Target,
      label: 'Level',
      value: userProgress.level,
      color: 'text-secondary'
    },
    {
      icon: Shield,
      label: 'Quizzes Done',
      value: `${completedQuizzes}/${totalQuizzes}`,
      color: 'text-accent'
    },
    {
      icon: Award,
      label: 'Badges',
      value: `${earnedBadges}/${totalBadges}`,
      color: 'text-cyber-orange'
    }
  ];

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="cyber-card p-8 text-center mb-8">
          <RobotMascot mood="happy" size="lg" className="mx-auto mb-6" />
          
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            {user.email?.split('@')[0] || 'Cyber Hero'}
          </h1>
          <p className="text-muted-foreground mb-4">{user.email}</p>

          {/* Level Progress */}
          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Level {userProgress.level}</span>
              <span className="text-primary font-semibold">{userProgress.xp % 100}/100 XP</span>
            </div>
            <ProgressBar
              value={userProgress.xp % 100}
              max={100}
              variant="default"
              size="lg"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {100 - (userProgress.xp % 100)} XP until next level
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="cyber-card p-4 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Earned Badges */}
        <div className="cyber-card p-6 mb-8">
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-orange" />
            Your Badges
          </h2>
          
          {earnedBadges > 0 ? (
            <div className="flex flex-wrap gap-4">
              {badges
                .filter(badge => userProgress.badges.includes(badge.id))
                .map(badge => (
                  <div
                    key={badge.id}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-3xl`}
                    title={badge.name}
                  >
                    {badge.icon}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Complete quizzes to earn badges!
            </p>
          )}
        </div>

        {/* Quiz Scores */}
        <div className="cyber-card p-6 mb-8">
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Quiz Scores
          </h2>
          
          <div className="space-y-4">
            {quizzes.map(quiz => {
              const score = userProgress.quizScores[quiz.id];
              const completed = userProgress.completedQuizzes.includes(quiz.id);
              
              return (
                <div key={quiz.id} className="flex items-center gap-4">
                  <span className="text-2xl">{quiz.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{quiz.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {completed ? `${score}%` : 'Not completed'}
                      </span>
                    </div>
                    <ProgressBar
                      value={score || 0}
                      max={100}
                      variant={score && score >= 60 ? 'success' : 'default'}
                      size="sm"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
