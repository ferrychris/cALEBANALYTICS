import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { 
  Star, 
  Sparkles, 
  Rocket, 
  Zap,
  ArrowRight
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  
  // Get the redirect path from location state, default to '/'
  const from = (location.state as any)?.from || '/';

  // Stars animation
  const [stars, setStars] = useState<{x: number, y: number, size: number, opacity: number}[]>([]);
  
  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3
    }));
    setStars(newStars);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error(error.message || 'Failed to sign up');
          return;
        }
        toast.success('Account created successfully!');
        navigate('/onboarding');
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message || 'Invalid email or password');
          return;
        }
        toast.success('Signed in successfully!');
        navigate(from);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google sign-in error:', error);
        toast.error(error.message || 'Failed to sign in with Google');
        return;
      }

      // No error means the OAuth redirect is about to happen
      // Show a loading message as the page will redirect
      toast.loading('Connecting to Google...', {
        duration: 3000,
      });

      // The actual redirect will happen automatically
      // No need to navigate manually as Supabase handles the redirect
      
    } catch (error: any) {
      console.error('Google OAuth error:', error);
      toast.error('Failed to connect with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-dark-300 via-purple-900/20 to-dark-300">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`
            }}
          />
        ))}
      </div>
      
      {/* Cosmic nebula effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-blend-screen">
        <div className="absolute top-10 left-10 w-1/3 h-1/3 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-1/2 h-1/2 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 rounded-full bg-pink-500/20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="max-w-md mx-auto w-full backdrop-blur-lg bg-dark-200/40 p-8 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Nova Analytics</h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-2 text-white">{isSignUp ? 'Join the Cosmos' : 'Welcome Back, Explorer'}</h2>
              <p className="text-blue-300 mb-8">{isSignUp ? 'Create your portal to the stars' : 'Resume your journey to brand excellence'}</p>
              
              <button
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-3 bg-dark-100 hover:bg-dark-100/70 text-white rounded-lg transition-all duration-200 font-medium relative overflow-hidden group border border-white/10 mb-6"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-dark-100 to-dark-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {isGoogleLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </div>
              </button>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-200/40 text-gray-400">Or continue with email</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                {!isSignUp && (
                  <div className="flex justify-end">
                    <button type="button" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full py-4 mt-6 text-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-lg transition-all duration-200 font-medium relative overflow-hidden group shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>{isSignUp ? 'Creating Account...' : 'Launching...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        {isSignUp ? <Rocket size={24} /> : <Zap size={24} />}
                        <span>{isSignUp ? 'Launch Your Journey' : 'Blast Off'}</span>
                      </div>
                    )}
                  </span>
                </button>
                
                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {isSignUp ? 'Already exploring the stars? Sign In' : "Ready to join the cosmos? Sign Up"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
        
        {/* Right Side - Hero Content */}
        <div className="hidden md:flex items-center justify-center p-12 relative">
          <div className="absolute top-1/4 right-1/4 w-20 h-20">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-70"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 max-w-lg backdrop-blur-lg bg-dark-200/30 p-8 rounded-2xl border border-white/10 shadow-xl"
          >
            <div className="absolute -top-6 -left-6">
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <Sparkles className="h-12 w-12 text-yellow-400" />
              </motion.div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Take Your Brand SUPERNOVA
            </h2>
            
            <p className="text-white/90 text-lg mb-8">
              Ignite your brand's potential and watch it outshine the competition. Our cosmic analytics propel your campaigns to new galaxies of performance.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Star size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Stellar Performance</h3>
                  <p className="text-gray-300 mt-1">Watch your metrics soar beyond the stratosphere with AI-powered optimization</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Rocket size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Cosmic Scaling</h3>
                  <p className="text-gray-300 mt-1">Break free from gravity and scale your campaigns to interstellar heights</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-white">Nebula Insights</h3>
                  <p className="text-gray-300 mt-1">Discover hidden patterns in your data with our constellation of analytics tools</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Add some floating elements */}
      <div className="absolute bottom-10 left-10 z-0">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: 5,
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30"
        />
      </div>
      
      <div className="absolute top-20 right-20 z-0">
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{ 
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 blur-xl opacity-20"
        />
      </div>
      
      {/* Add a shooting star animation */}
      <motion.div
        initial={{ x: '-100%', y: '0%', opacity: 0 }}
        animate={{ 
          x: '200%', 
          y: '100%',
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 7,
          ease: "easeOut"
        }}
        className="absolute h-0.5 w-20 bg-white blur-sm z-0"
        style={{ 
          top: '15%',
          left: '10%',
          transform: 'rotate(-15deg)',
          boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.7)'
        }}
      />
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Login;