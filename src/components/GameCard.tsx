import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle, Star } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playTime: string;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  icon,
  difficulty,
  playTime
}) => {
  const difficultyColors = {
    Easy: 'text-secondary bg-secondary/20',
    Medium: 'text-cyber-orange bg-cyber-orange/20',
    Hard: 'text-destructive bg-destructive/20'
  };

  const difficultyStars = {
    Easy: 1,
    Medium: 2,
    Hard: 3
  };

  return (
    <div className="cyber-card p-6 flex flex-col h-full group">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-cyber-pink/20 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-display font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 flex-grow">
        {description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
          {Array.from({ length: difficultyStars[difficulty] }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-current" />
          ))}
          <span className="text-xs font-semibold ml-1">{difficulty}</span>
        </div>
        <span className="text-xs text-muted-foreground">⏱️ {playTime}</span>
      </div>

      {/* Action */}
      <Link to={`/game/${id}`}>
        <Button variant="game" className="w-full gap-2">
          <PlayCircle className="w-4 h-4" />
          Play Now
        </Button>
      </Link>
    </div>
  );
};

export default GameCard;
