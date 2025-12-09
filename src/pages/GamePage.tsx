import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RobotMascot from '@/components/RobotMascot';
import { ChevronLeft, RefreshCw, CheckCircle, XCircle, Shield, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Password Builder Game Component
const PasswordBuilderGame: React.FC = () => {
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<string[]>([]);

  const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    numbers: '0123456789'.split(''),
    symbols: '!@#$%^&*'.split('')
  };

  const addChar = (char: string) => {
    if (password.length < 20) {
      setPassword(password + char);
    }
  };

  const checkStrength = () => {
    const checks = [];
    if (password.length >= 8) checks.push('✓ At least 8 characters');
    else checks.push('✗ Need at least 8 characters');
    
    if (/[a-z]/.test(password)) checks.push('✓ Has lowercase letters');
    else checks.push('✗ Add lowercase letters');
    
    if (/[A-Z]/.test(password)) checks.push('✓ Has uppercase letters');
    else checks.push('✗ Add uppercase letters');
    
    if (/[0-9]/.test(password)) checks.push('✓ Has numbers');
    else checks.push('✗ Add numbers');
    
    if (/[!@#$%^&*]/.test(password)) checks.push('✓ Has symbols');
    else checks.push('✗ Add symbols');

    setFeedback(checks);
  };

  const strengthScore = feedback.filter(f => f.startsWith('✓')).length;

  return (
    <div className="space-y-6">
      <div className="cyber-card p-6">
        <h3 className="font-display font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Build Your Password
        </h3>
        
        <div className="p-4 rounded-xl bg-muted/50 border border-border mb-4 min-h-[60px] flex items-center justify-center">
          <span className="text-2xl font-mono tracking-wider">
            {password || <span className="text-muted-foreground">Click letters below...</span>}
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => setPassword('')}>
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPassword(password.slice(0, -1))}>
            Backspace
          </Button>
          <Button variant="cyber" size="sm" onClick={checkStrength}>
            Check Strength
          </Button>
        </div>

        {/* Character buttons */}
        <div className="space-y-3">
          {Object.entries(characters).map(([type, chars]) => (
            <div key={type}>
              <p className="text-xs text-muted-foreground mb-1 capitalize">{type}</p>
              <div className="flex flex-wrap gap-1">
                {chars.slice(0, type === 'lowercase' || type === 'uppercase' ? 13 : chars.length).map(char => (
                  <button
                    key={char}
                    onClick={() => addChar(char)}
                    className="w-8 h-8 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 transition-colors text-sm font-mono"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {feedback.length > 0 && (
        <div className="cyber-card p-6">
          <h3 className="font-display font-bold mb-4">Password Strength</h3>
          <div className="space-y-2">
            {feedback.map((check, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  check.startsWith('✓') ? 'text-secondary' : 'text-destructive'
                )}
              >
                {check.startsWith('✓') ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {check.slice(2)}
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Strength:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className={cn(
                      "w-6 h-2 rounded-full",
                      i <= strengthScore ? 'bg-secondary' : 'bg-muted'
                    )}
                  />
                ))}
              </div>
              <span className="font-semibold">
                {strengthScore === 5 ? '💪 Super Strong!' : 
                 strengthScore >= 3 ? '👍 Getting There!' : 
                 '🔓 Keep Adding!'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Phishing Detector Game
const PhishingDetectorGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const scenarios = [
    {
      from: 'amaz0n-security@mail.ru',
      subject: 'URGENT: Your Account Will Be Deleted!!!',
      preview: 'Click here immediately to verify your account or lose everything!',
      isPhishing: true,
      explanation: 'This is phishing! "Amazon" is spelled wrong (amaz0n), uses a suspicious domain (.ru), and creates false urgency.'
    },
    {
      from: 'support@school.edu',
      subject: 'Library Book Return Reminder',
      preview: 'Hi! This is a friendly reminder that your library books are due next week.',
      isPhishing: false,
      explanation: 'This is safe! It\'s from your school domain (.edu), has a normal subject, and doesn\'t ask for personal information.'
    },
    {
      from: 'free-robux@gameprize.net',
      subject: 'You Won 10,000 FREE ROBUX!!!',
      preview: 'Enter your Roblox password to claim your prize NOW!',
      isPhishing: true,
      explanation: 'Phishing alert! Never enter passwords to claim "prizes". Real games never ask for your password via email.'
    },
    {
      from: 'mom@gmail.com',
      subject: 'Pick up after school',
      preview: 'Hey! I\'ll pick you up at 3:30 today. Love you!',
      isPhishing: false,
      explanation: 'Safe message! It\'s from a known contact with a normal request and no suspicious links.'
    },
    {
      from: 'netf1ix@account-verify.com',
      subject: 'Payment Failed - Update NOW',
      preview: 'Your credit card was declined. Update your payment immediately.',
      isPhishing: true,
      explanation: 'Phishing! "Netflix" is misspelled (netf1ix), uses a fake domain, and creates urgency about payments.'
    }
  ];

  const current = scenarios[currentIndex];

  const handleAnswer = (answer: boolean) => {
    setAnswered(true);
    const correct = answer === current.isPhishing;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const nextScenario = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">
          Message {currentIndex + 1} of {scenarios.length}
        </span>
        <span className="text-secondary font-semibold">Score: {score}</span>
      </div>

      {/* Email Preview */}
      <div className="cyber-card p-6">
        <div className="space-y-3 border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">From:</span>
            <span className="font-mono text-sm">{current.from}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Subject:</span>
            <span className="font-semibold">{current.subject}</span>
          </div>
        </div>
        <p className="text-muted-foreground">{current.preview}</p>
      </div>

      {/* Answer Buttons */}
      {!answered ? (
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleAnswer(true)}
            className="border-destructive text-destructive hover:bg-destructive/10"
          >
            🎣 It's Phishing!
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleAnswer(false)}
            className="border-secondary text-secondary hover:bg-secondary/10"
          >
            ✅ It's Safe
          </Button>
        </div>
      ) : (
        <div className={cn(
          "p-6 rounded-xl border",
          isCorrect 
            ? "bg-secondary/20 border-secondary/30" 
            : "bg-destructive/20 border-destructive/30"
        )}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-secondary" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            <span className="font-semibold">
              {isCorrect ? 'Correct!' : 'Oops!'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{current.explanation}</p>
          
          {currentIndex < scenarios.length - 1 ? (
            <Button variant="cyber" onClick={nextScenario}>
              Next Message
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold mb-2">
                Final Score: {score}/{scenarios.length}
              </p>
              <Button variant="cyber" onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setAnswered(false);
              }}>
                Play Again
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Game Page
const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const games: Record<string, { title: string; icon: string; Component: React.FC }> = {
    'password-builder': {
      title: 'Password Builder',
      icon: '🔐',
      Component: PasswordBuilderGame
    },
    'phishing-detector': {
      title: 'Phishing Detector',
      icon: '🎣',
      Component: PhishingDetectorGame
    }
  };

  const game = gameId ? games[gameId] : null;

  if (!game) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <RobotMascot mood="sad" size="lg" className="mx-auto mb-6" />
          <h1 className="text-2xl font-display font-bold mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-6">This game is coming soon!</p>
          <Button variant="cyber" onClick={() => navigate('/games')}>
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  const GameComponent = game.Component;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/games')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{game.icon}</span>
            <span className="font-display font-bold text-lg">{game.title}</span>
          </div>
        </div>

        {/* Game Content */}
        <GameComponent />
      </div>
    </div>
  );
};

export default GamePage;
