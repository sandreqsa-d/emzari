import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Gamepad2, Award, User, LogOut, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, userProgress, logOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/games', icon: Gamepad2, label: 'Games' },
    { path: '/quizzes', icon: Shield, label: 'Quizzes' },
    { path: '/badges', icon: Award, label: 'Badges' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-gradient-cyber hidden sm:block">
              CyberKids
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? "cyber" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* XP Display */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30">
                  <span className="text-secondary font-semibold text-sm">
                    ⚡ {userProgress?.xp || 0} XP
                  </span>
                </div>
                
                {/* Profile */}
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>

                {/* Logout */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => logOut()}
                  className="rounded-full text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="cyber" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
