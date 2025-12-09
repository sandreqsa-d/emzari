import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import QuizCard from '@/components/QuizCard';
import { quizzes } from '@/data/quizData';
import { Shield } from 'lucide-react';

const Quizzes: React.FC = () => {
  const { userProgress } = useAuth();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyber-blue-glow mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Cyber Quizzes
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Test your cybersecurity knowledge! Complete quizzes to earn badges 
            and become a Cyber Champion.
          </p>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz, index) => {
            const completed = userProgress?.completedQuizzes.includes(quiz.id) || false;
            const score = userProgress?.quizScores[quiz.id];
            
            return (
              <div
                key={quiz.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <QuizCard
                  id={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  icon={quiz.icon}
                  topic={quiz.topic}
                  questionCount={quiz.questions.length}
                  xpReward={quiz.xpReward}
                  completed={completed}
                  score={score}
                />
              </div>
            );
          })}
        </div>

        {/* Progress Info */}
        {userProgress && (
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-cyber-green/10 border border-secondary/30 text-center">
            <p className="text-lg">
              <span className="font-semibold text-secondary">
                {userProgress.completedQuizzes.length} / {quizzes.length}
              </span>
              <span className="text-muted-foreground"> quizzes completed</span>
            </p>
            {userProgress.completedQuizzes.length === quizzes.length && (
              <p className="mt-2 text-secondary font-semibold">
                🏆 Congratulations! You're a Cyber Champion!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
