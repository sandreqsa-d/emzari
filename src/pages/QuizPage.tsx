import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { quizzes } from '@/data/quizData';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ProgressBar';
import AIExplanation from '@/components/AIExplanation';
import RobotMascot from '@/components/RobotMascot';
import { ChevronLeft, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user, userProgress, updateProgress, addBadge, addXP } = useAuth();
  const { toast } = useToast();

  const quiz = quizzes.find(q => q.id === quizId);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (!quiz) {
      navigate('/quizzes');
    }
  }, [quiz, navigate]);

  if (!quiz) return null;

  const question = quiz.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const percentage = Math.round((score / quiz.questions.length) * 100);

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setAnswers([...answers, answerIndex]);

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    setIsComplete(true);
    const finalScore = score + (isCorrect ? 1 : 0);
    const finalPercentage = Math.round((finalScore / quiz.questions.length) * 100);

    if (user && userProgress) {
      const newCompletedQuizzes = userProgress.completedQuizzes.includes(quiz.id)
        ? userProgress.completedQuizzes
        : [...userProgress.completedQuizzes, quiz.id];

      await updateProgress({
        completedQuizzes: newCompletedQuizzes,
        quizScores: {
          ...userProgress.quizScores,
          [quiz.id]: Math.max(finalPercentage, userProgress.quizScores[quiz.id] || 0)
        }
      });

      await addXP(quiz.xpReward);

      if (finalPercentage >= 60 && !userProgress.badges.includes(quiz.badgeId)) {
        await addBadge(quiz.badgeId);
        toast({
          title: "🎉 New Badge Earned!",
          description: `You earned the ${quiz.title.replace(' Quiz', '')} badge!`,
        });
      }

      // Check for Cyber Champion badge
      if (newCompletedQuizzes.length === quizzes.length && !userProgress.badges.includes('cyber-champion')) {
        await addBadge('cyber-champion');
        toast({
          title: "🏆 CYBER CHAMPION!",
          description: "You've completed all quizzes and earned the ultimate badge!",
        });
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
    setAnswers([]);
  };

  // Results Screen
  if (isComplete) {
    const finalScore = score;
    const finalPercentage = Math.round((finalScore / quiz.questions.length) * 100);
    const passed = finalPercentage >= 60;

    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="container max-w-lg mx-auto px-4">
          <div className="cyber-card p-8 text-center">
            <RobotMascot 
              mood={passed ? 'excited' : 'sad'} 
              size="lg" 
              className="mx-auto mb-6"
            />

            <h1 className="text-3xl font-display font-bold mb-2">
              {passed ? '🎉 Awesome Job!' : 'Keep Practicing!'}
            </h1>
            
            <p className="text-muted-foreground mb-6">
              {passed 
                ? 'You did great! You\'ve proven your cybersecurity skills.'
                : 'Don\'t worry! Learning takes practice. Try again!'}
            </p>

            <div className="p-6 rounded-2xl bg-muted/50 mb-6">
              <div className="text-5xl font-display font-bold text-gradient-cyber mb-2">
                {finalPercentage}%
              </div>
              <p className="text-sm text-muted-foreground">
                {finalScore} out of {quiz.questions.length} correct
              </p>
            </div>

            {passed && (
              <div className="p-4 rounded-xl bg-secondary/20 border border-secondary/30 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <span className="font-semibold text-secondary">
                    Badge Unlocked! +{quiz.xpReward} XP
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={restartQuiz}
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              <Button
                variant="cyber"
                className="flex-1 gap-2"
                onClick={() => navigate('/quizzes')}
              >
                More Quizzes
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/quizzes')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{quiz.icon}</span>
            <span className="font-display font-bold text-lg">{quiz.title}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-primary font-semibold">
              Score: {score}/{quiz.questions.length}
            </span>
          </div>
          <ProgressBar
            value={currentQuestion + 1}
            max={quiz.questions.length}
            variant="default"
            size="md"
          />
        </div>

        {/* Question Card */}
        <div className="cyber-card p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let optionStyles = "p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left w-full";
              
              if (isAnswered) {
                if (index === question.correctAnswer) {
                  optionStyles += " border-secondary bg-secondary/20 text-foreground";
                } else if (index === selectedAnswer) {
                  optionStyles += " border-destructive bg-destructive/20 text-foreground";
                } else {
                  optionStyles += " border-border bg-muted/30 text-muted-foreground cursor-default";
                }
              } else {
                optionStyles += " border-border hover:border-primary hover:bg-primary/10";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={optionStyles}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm",
                      isAnswered && index === question.correctAnswer
                        ? "bg-secondary text-secondary-foreground"
                        : isAnswered && index === selectedAnswer
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* AI Explanation */}
          {isAnswered && !isCorrect && (
            <AIExplanation
              question={question.question}
              correctAnswer={question.options[question.correctAnswer]}
              userAnswer={question.options[selectedAnswer!]}
              defaultExplanation={question.explanation}
              visible={true}
            />
          )}

          {/* Correct Answer Feedback */}
          {isAnswered && isCorrect && (
            <div className="mt-6 p-4 rounded-xl bg-secondary/20 border border-secondary/30 animate-slide-up">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="font-semibold text-secondary">Correct!</p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <Button
              variant="cyber"
              size="lg"
              className="w-full mt-6 gap-2"
              onClick={handleNext}
            >
              {currentQuestion < quiz.questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  See Results
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
