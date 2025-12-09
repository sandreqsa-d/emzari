import React from 'react';
import GameCard from '@/components/GameCard';
import { Gamepad2 } from 'lucide-react';

const games = [
  {
    id: 'password-builder',
    title: 'Password Builder',
    description: 'Build the strongest password by combining letters, numbers, and symbols!',
    icon: '🔐',
    difficulty: 'Easy' as const,
    playTime: '3-5 min'
  },
  {
    id: 'phishing-detector',
    title: 'Phishing Detector',
    description: 'Can you spot the fake emails and messages? Test your detective skills!',
    icon: '🎣',
    difficulty: 'Medium' as const,
    playTime: '5-7 min'
  },
  {
    id: 'privacy-maze',
    title: 'Privacy Maze',
    description: 'Navigate through decisions about what to share online!',
    icon: '🛡️',
    difficulty: 'Medium' as const,
    playTime: '4-6 min'
  },
  {
    id: 'virus-defender',
    title: 'Virus Defender',
    description: 'Protect your computer from malware attacks in this action game!',
    icon: '🦠',
    difficulty: 'Hard' as const,
    playTime: '5-8 min'
  }
];

const Games: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-cyber-pink mb-4">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Cyber Games
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Learn cybersecurity through fun and interactive games! 
            Each game teaches you important skills to stay safe online.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GameCard {...game} />
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 p-6 rounded-2xl bg-card border border-border text-center">
          <p className="text-muted-foreground">
            🎮 <span className="font-semibold text-foreground">Pro tip:</span> Complete games to prepare for quizzes and earn extra XP!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Games;
