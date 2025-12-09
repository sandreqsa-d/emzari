import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import RobotMascot from '@/components/RobotMascot';
import ProgressBar from '@/components/ProgressBar';
import { Shield, Gamepad2, Award, ChevronRight, Zap, Lock, Eye, Globe } from 'lucide-react';

const Index: React.FC = () => {
  const { user, userProgress } = useAuth();

  const features = [
    {
      icon: Lock,
      title: 'Password Safety',
      description: 'Learn to create super strong passwords',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'Spot Phishing',
      description: 'Detect fake messages and scams',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Privacy Guard',
      description: 'Protect your personal information',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Safe Browsing',
      description: 'Navigate the internet safely',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Learn Cybersecurity the Fun Way!</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-cyber">CyberKids</span>
              <br />
              <span className="text-foreground">Academy</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Become a cyber hero! Learn how to protect yourself online through exciting games, 
              fun quizzes, and earn awesome badges. Are you ready for the adventure?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {user ? (
                <>
                  <Link to="/games">
                    <Button variant="cyber" size="xl" className="w-full sm:w-auto gap-2">
                      <Gamepad2 className="w-5 h-5" />
                      Play Games
                    </Button>
                  </Link>
                  <Link to="/quizzes">
                    <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2">
                      <Shield className="w-5 h-5" />
                      Take Quizzes
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="cyber" size="xl" className="w-full sm:w-auto gap-2">
                      Start Learning
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/games">
                    <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2">
                      <Gamepad2 className="w-5 h-5" />
                      Try a Game
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mascot & Progress */}
          <div className="flex-1 flex flex-col items-center gap-8">
            <RobotMascot mood="excited" size="lg" />
            
            {user && userProgress && (
              <div className="w-full max-w-sm p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Your Progress
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Level {userProgress.level}</span>
                      <span className="text-primary font-semibold">{userProgress.xp} XP</span>
                    </div>
                    <ProgressBar 
                      value={userProgress.xp % 100} 
                      max={100} 
                      variant="default"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Badges Earned</span>
                    <span className="text-lg font-bold text-secondary">
                      {userProgress.badges.length} / 5
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-display font-bold text-center mb-12">
          What You'll Learn
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="cyber-card p-6 text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="container mx-auto px-4 py-12">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to become a Cyber Hero?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of kids learning to stay safe online. 
                Sign up now and start your cybersecurity adventure!
              </p>
              <Link to="/auth">
                <Button variant="cyber" size="xl" className="gap-2">
                  Create Free Account
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
