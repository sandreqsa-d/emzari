import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, PlayCircle } from 'lucide-react';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  topic: string;
  questionCount: number;
  xpReward: number;
  completed: boolean;
  score?: number;
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  description,
  icon,
  topic,
  questionCount,
  xpReward,
  completed,
  score
}) => {
  return (
    <div className={cn(
      "cyber-card p-6 flex flex-col h-full",
      completed && "border-secondary/50"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
          {icon}
        </div>
        {completed && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 border border-secondary/30">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-xs font-semibold text-secondary">{score}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
          {topic}
        </span>
        <h3 className="text-xl font-display font-bold text-foreground mt-1 mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <span>📝 {questionCount} questions</span>
        <span>⚡ {xpReward} XP</span>
      </div>

      {/* Action */}
      <Link to={`/quiz/${id}`}>
        <Button 
          variant={completed ? "outline" : "cyber"} 
          className="w-full gap-2"
        >
          <PlayCircle className="w-4 h-4" />
          {completed ? 'Play Again' : 'Start Quiz'}
        </Button>
      </Link>
    </div>
  );
};

export default QuizCard;
