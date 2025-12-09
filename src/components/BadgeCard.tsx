import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface BadgeCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  onClick?: () => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({
  name,
  description,
  icon,
  color,
  earned,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer group",
        earned 
          ? "cyber-card hover:scale-105" 
          : "bg-muted/30 border-border/50 opacity-60"
      )}
    >
      {/* Badge Icon */}
      <div className={cn(
        "w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl",
        earned 
          ? `bg-gradient-to-br ${color} shadow-lg` 
          : "bg-muted"
      )}>
        {earned ? (
          <span className="animate-bounce-slow">{icon}</span>
        ) : (
          <Lock className="w-8 h-8 text-muted-foreground" />
        )}
      </div>

      {/* Badge Info */}
      <h3 className={cn(
        "text-lg font-display font-bold text-center mb-2",
        earned ? "text-foreground" : "text-muted-foreground"
      )}>
        {name}
      </h3>
      
      <p className={cn(
        "text-sm text-center",
        earned ? "text-muted-foreground" : "text-muted-foreground/50"
      )}>
        {earned ? description : "Complete the quiz to unlock!"}
      </p>

      {/* Earned indicator */}
      {earned && (
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-secondary/20 border border-secondary/30">
          <span className="text-xs font-semibold text-secondary">✓ Earned</span>
        </div>
      )}

      {/* Glow effect for earned badges */}
      {earned && (
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl",
          `bg-gradient-to-br ${color}`
        )} />
      )}
    </div>
  );
};

export default BadgeCard;
