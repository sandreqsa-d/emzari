import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BadgeCard from '@/components/BadgeCard';
import { badges } from '@/data/quizData';
import { Award } from 'lucide-react';

const Badges: React.FC = () => {
  const { userProgress } = useAuth();

  const earnedCount = userProgress?.badges.length || 0;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 mb-4">
            <Award className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Badge Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Earn badges by completing quizzes with at least 60% score. 
            Collect them all to become a Cyber Champion!
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-12 p-6 rounded-2xl bg-card border border-border text-center">
          <div className="text-4xl font-display font-bold text-gradient-cyber mb-2">
            {earnedCount} / {badges.length}
          </div>
          <p className="text-muted-foreground">Badges Earned</p>
          
          {/* Progress circles */}
          <div className="flex justify-center gap-2 mt-4">
            {badges.map((badge, index) => (
              <div
                key={badge.id}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  userProgress?.badges.includes(badge.id)
                    ? "bg-secondary scale-110"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {badges.map((badge, index) => {
            const earned = userProgress?.badges.includes(badge.id) || false;
            
            return (
              <div
                key={badge.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BadgeCard
                  id={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={badge.icon}
                  color={badge.color}
                  earned={earned}
                />
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {earnedCount === badges.length && (
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 text-center">
            <span className="text-6xl mb-4 block">🏆</span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              CYBER CHAMPION!
            </h2>
            <p className="text-muted-foreground">
              You've collected all badges and proven yourself as a true Cyber Hero!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper for conditional classes
const cn = (...classes: (string | boolean | undefined)[]) => 
  classes.filter(Boolean).join(' ');

export default Badges;
