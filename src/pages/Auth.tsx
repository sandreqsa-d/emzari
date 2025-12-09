import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RobotMascot from '@/components/RobotMascot';
import { Shield, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const signUpSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user, signUp, logIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      if (isSignUp) {
        signUpSchema.parse(formData);
      } else {
        signInSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.displayName);
        toast({
          title: "Welcome to CyberKids! 🎉",
          description: "Your account has been created successfully.",
        });
      } else {
        await logIn(formData.email, formData.password);
        toast({
          title: "Welcome back! 👋",
          description: "You're now signed in.",
        });
      }
      navigate('/');
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Try signing in instead!';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please check and try again.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Try signing up!';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      }

      toast({
        title: "Oops!",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <RobotMascot mood="happy" size="md" className="mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            {isSignUp ? 'Join CyberKids!' : 'Welcome Back!'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp 
              ? 'Create an account to start your cybersecurity adventure' 
              : 'Sign in to continue your learning journey'}
          </p>
        </div>

        {/* Form Card */}
        <div className="cyber-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Your Name
                </Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder="CyberHero123"
                  value={formData.displayName}
                  onChange={handleChange}
                  className={errors.displayName ? 'border-destructive' : ''}
                />
                {errors.displayName && (
                  <p className="text-xs text-destructive">{errors.displayName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hero@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="cyber"
              size="lg"
              className="w-full gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </>
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                }}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Info */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          💡 Tip: After signing up, check your email if confirmation is required.
        </p>
      </div>
    </div>
  );
};

export default Auth;
