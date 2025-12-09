import React from 'react';
import { cn } from '@/lib/utils';

interface RobotMascotProps {
  mood?: 'happy' | 'thinking' | 'excited' | 'sad';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

const RobotMascot: React.FC<RobotMascotProps> = ({ 
  mood = 'happy', 
  size = 'md',
  className,
  animate = true
}) => {
  const sizes = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-5xl'
  };

  const moodEmojis = {
    happy: '🤖',
    thinking: '🤔',
    excited: '🎉',
    sad: '😢'
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30",
        sizes[size],
        animate && "animate-float",
        className
      )}
    >
      <span className="select-none">{moodEmojis[mood]}</span>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl -z-10" />
      
      {/* Antenna */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-primary rounded-full">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary animate-pulse" />
      </div>
    </div>
  );
};

export default RobotMascot;
