import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import RobotMascot from './RobotMascot';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface AIExplanationProps {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  defaultExplanation: string;
  visible: boolean;
}

const AIExplanation: React.FC<AIExplanationProps> = ({
  question,
  correctAnswer,
  userAnswer,
  defaultExplanation,
  visible
}) => {
  const [explanation, setExplanation] = useState(defaultExplanation);
  const [loading, setLoading] = useState(false);
  const [hasAIResponse, setHasAIResponse] = useState(false);

  const fetchAIExplanation = async () => {
    setLoading(true);
    try {
      // This would connect to Lovable AI via edge function
      // For now, we'll use the default explanation with a fun enhancement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated AI-enhanced explanation
      const enhancedExplanation = `🤖 Hey there, cyber defender! ${defaultExplanation} Remember, staying safe online is like being a superhero - you protect yourself and others!`;
      setExplanation(enhancedExplanation);
      setHasAIResponse(true);
    } catch (error) {
      console.log('Using default explanation');
      setExplanation(defaultExplanation);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && !hasAIResponse) {
      setExplanation(defaultExplanation);
    }
  }, [visible, defaultExplanation, hasAIResponse]);

  if (!visible) return null;

  return (
    <div className={cn(
      "mt-6 p-6 rounded-2xl bg-gradient-to-br from-destructive/10 to-cyber-orange/10 border border-destructive/30",
      "animate-slide-up"
    )}>
      <div className="flex items-start gap-4">
        <RobotMascot mood="thinking" size="sm" animate={loading} />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-destructive font-semibold">Oops! That's not quite right</span>
            <Sparkles className="w-4 h-4 text-cyber-orange" />
          </div>
          
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">You answered:</span> {userAnswer}
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-secondary">Correct answer:</span> {correctAnswer}
            </p>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-card/50 border border-border">
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>CyberBot is thinking...</span>
              </div>
            ) : (
              <p className="text-foreground leading-relaxed">{explanation}</p>
            )}
          </div>

          {!hasAIResponse && !loading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchAIExplanation}
              className="mt-3 gap-2 text-primary"
            >
              <Sparkles className="w-4 h-4" />
              Get AI-powered explanation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIExplanation;
