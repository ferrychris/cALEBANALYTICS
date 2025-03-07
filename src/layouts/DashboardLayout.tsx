import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Megaphone, 
  Lightbulb, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  BrainCircuit,
  Globe,
  ChevronDown,
  Facebook,
  Youtube,
  MessageCircle,
  Star,
  Sparkles,
  Rocket,
  Zap,
  Receipt
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Lightbulb, label: 'Recommendations', path: '/recommendations' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Star, label: 'Ratings', path: '/ratings' },
  { icon: BrainCircuit, label: 'Supernova', path: '/attribution' },
  { icon: Receipt, label: 'Invoicing', path: '/invoicing' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const platformItems = [
  { icon: Globe, label: 'All Platforms', path: '/platforms/all' },
  { icon: Megaphone, label: 'Google Ads', path: '/platforms/google' },
  { icon: Facebook, label: 'Facebook Ads', path: '/platforms/facebook' },
  { icon: Youtube, label: 'TikTok Ads', path: '/platforms/tiktok' },
  { icon: MessageCircle, label: 'Snapchat Ads', path: '/platforms/snapchat' },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [platformsExpanded, setPlatformsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Stars animation
  const [stars, setStars] = useState<{x: number, y: number, size: number, opacity: number}[]>([]);
  
  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setStars(newStars);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  // Function to handle platform navigation
  const handlePlatformClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-dark-300 via-dark-300 to-dark-300 relative">
      {/* Cosmic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated stars */}
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
        
        {/* Nebula effects */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 rounded-full bg-pink-500/5 blur-3xl"></div>
      </div>
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="w-64 h-full bg-dark-200/80 backdrop-blur-md border-r border-white/5 flex flex-col z-20 relative"
      >
        {/* Sidebar cosmic accent */}
        <div className="absolute top-20 right-0 w-1/2 h-20 rounded-full bg-purple-500/10 blur-xl"></div>
        <div className="absolute bottom-40 left-0 w-1/2 h-20 rounded-full bg-blue-500/10 blur-xl"></div>
        
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Nova</h1>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-blue-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className={location.pathname === item.path ? 'text-purple-400' : ''} />
              <span>{item.label}</span>
              
              {/* Add subtle glow effect for active items */}
              {location.pathname === item.path && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse-slow pointer-events-none"></div>
              )}
            </Link>
          ))}

          {/* Platforms Section */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <button 
              onClick={() => setPlatformsExpanded(!platformsExpanded)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} />
                <span>Platforms</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${platformsExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {platformsExpanded && (
              <div className="mt-1 ml-2 space-y-1">
                {platformItems.map((platform) => (
                  <button
                    key={platform.path}
                    onClick={() => handlePlatformClick(platform.path)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 w-full text-left ${
                      location.pathname === platform.path
                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-blue-400'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <platform.icon size={18} className={location.pathname === platform.path ? 'text-purple-400' : ''} />
                    <span className="text-sm">{platform.label}</span>
                    
                    {/* Add subtle glow effect for active items */}
                    {location.pathname === platform.path && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse-slow pointer-events-none"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 text-gray-400 hover:text-white w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-dark-200/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 relative z-10">
          {/* Header cosmic accent */}
          <div className="absolute top-0 right-20 w-20 h-10 rounded-full bg-purple-500/10 blur-xl"></div>
          
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="ml-4 relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-dark-100/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-dark-100/50 text-gray-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.email || 'User'}</p>
                <p className="text-xs text-gray-400">Marketing Director</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-transparent p-6 relative">
          {/* Floating cosmic elements */}
          <div className="absolute top-20 right-10 z-0 pointer-events-none">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl animate-float"></div>
          </div>
          
          <div className="absolute bottom-20 left-10 z-0 pointer-events-none">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Cosmic sparkle */}
          <div className="absolute top-40 right-1/4 z-0 pointer-events-none">
            <div className="text-yellow-400/30 animate-spin-slow">
              <Sparkles size={24} />
            </div>
          </div>
          
          <div className="absolute bottom-40 left-1/3 z-0 pointer-events-none">
            <div className="text-blue-400/30 animate-spin-slow" style={{animationDuration: '25s'}}>
              <Star size={20} />
            </div>
          </div>
          
          {/* Content wrapper with backdrop blur */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Add a shooting star animation */}
      <motion.div
        initial={{ x: '-10%', y: '0%', opacity: 0 }}
        animate={{ 
          x: '120%', 
          y: '50%',
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "easeOut"
        }}
        className="absolute h-0.5 w-20 bg-white blur-sm z-0 pointer-events-none"
        style={{ 
          top: '5%',
          left: '10%',
          transform: 'rotate(-15deg)',
          boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.7)'
        }}
      />
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;