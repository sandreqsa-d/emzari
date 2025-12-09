import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = false,
  variant = 'default',
  size = 'md',
  className
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const variants = {
    default: 'bg-gradient-to-r from-primary to-cyber-blue-glow',
    success: 'bg-gradient-to-r from-secondary to-cyber-green-glow',
    accent: 'bg-gradient-to-r from-accent to-cyber-pink'
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
