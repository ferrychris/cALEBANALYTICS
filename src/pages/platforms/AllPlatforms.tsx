import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart, 
  ArrowRight,
  Plus,
  Globe,
  Facebook,
  Youtube,
  MessageCircle,
  Megaphone,
  Link,
  ExternalLink
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { usePlatforms } from '../../context/PlatformContext';
import ConnectPlatformModal from '../../components/ConnectPlatformModal';
import { toast } from 'sonner';

const performanceData = [
  { name: 'Jan', google: 4000, facebook: 2400, tiktok: 1200, snapchat: 900 },
  { name: 'Feb', google: 3000, facebook: 2100, tiktok: 900, snapchat: 800 },
  { name: 'Mar', google: 5000, facebook: 3200, tiktok: 1500, snapchat: 1100 },
  { name: 'Apr', google: 8000, facebook: 4800, tiktok: 2200, snapchat: 1600 },
  { name: 'May', google: 7000, facebook: 4200, tiktok: 2000, snapchat: 1400 },
  { name: 'Jun', google: 9000, facebook: 5400, tiktok: 2700, snapchat: 1800 },
  { name: 'Jul', google: 11000, facebook: 6600, tiktok: 3300, snapchat: 2200 },
];

const platformData = [
  { name: 'Google Ads', value: 11000, color: '#4285F4' },
  { name: 'Facebook Ads', value: 6600, color: '#1877F2' },
  { name: 'TikTok Ads', value: 3300, color: '#000000' },
  { name: 'Snapchat Ads', value: 2200, color: '#FFFC00' },
];

const attributionData = [
  { name: 'Last Click', value: 35 },
  { name: 'First Click', value: 15 },
  { name: 'Linear', value: 20 },
  { name: 'Time Decay', value: 25 },
  { name: 'Position Based', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="glass-card p-6"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="text-sm ml-1">{change}</span>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-dark-100">
        <Icon size={20} className="text-primary-400" />
      </div>
    </div>
  </motion.div>
);

const PlatformCard = ({ name, icon: Icon, color, connected, path, onConnect }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="glass-card p-6 hover:border-primary-500/50 border border-transparent transition-all cursor-pointer"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: color + '20', color: color }}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {connected ? 'Connected and tracking' : 'Not connected'}
          </p>
        </div>
      </div>
      <div>
        {connected ? (
          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
        ) : (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">Not Connected</span>
        )}
      </div>
    </div>
    <div className="mt-4 flex justify-between items-center">
      {connected ? (
        <Link to={path} className="text-primary-400 flex items-center gap-1 text-sm hover:underline">
          View dashboard <ArrowRight size={14} />
        </Link>
      ) : (
        <button 
          className="btn-primary text-sm py-1.5 flex items-center gap-1"
          onClick={onConnect}
        >
          <Plus size={14} />
          Connect Account
        </button>
      )}
    </div>
  </motion.div>
);

const AllPlatforms = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  
  const { isPlatformConnected, refreshConnections } = usePlatforms();

  useEffect(() => {
    refreshConnections();
  }, []);

  const handleConnectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    setConnectModalOpen(true);
  };

  const getPlatformKey = (name: string) => {
    switch (name) {
      case 'Google Ads': return 'google';
      case 'Facebook Ads': return 'facebook';
      case 'TikTok Ads': return 'tiktok';
      case 'Snapchat Ads': return 'snapchat';
      default: return '';
    }
  };

  const getPlatformPath = (name: string) => {
    switch (name) {
      case 'Google Ads': return '/platforms/google';
      case 'Facebook Ads': return '/platforms/facebook';
      case 'TikTok Ads': return '/platforms/tiktok';
      case 'Snapchat Ads': return '/platforms/snapchat';
      default: return '/platforms/all';
    }
  };

  const getPlatformIcon = (name: string) => {
    switch (name) {
      case 'Google Ads': return Megaphone;
      case 'Facebook Ads': return Facebook;
      case 'TikTok Ads': return Youtube;
      case 'Snapchat Ads': return MessageCircle;
      default: return Globe;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">All Platforms</h1>
          <p className="text-gray-400 mt-1">Unified view of all your advertising platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-dark-100 rounded-lg p-1">
            <button 
              className={`px-3 py-1.5 rounded-md text-sm ${dateRange === 'last7' ? 'bg-primary-600 text-white' : 'text-gray-400'}`}
              onClick={() => setDateRange('last7')}
            >
              7 Days
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-sm ${dateRange === 'last30' ? 'bg-primary-600 text-white' : 'text-gray-400'}`}
              onClick={() => setDateRange('last30')}
            >
              30 Days
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-sm ${dateRange === 'last90' ? 'bg-primary-600 text-white' : 'text-gray-400'}`}
              onClick={() => setDateRange('last90')}
            >
              90 Days
            </button>
          </div>
          <button 
            className="btn-primary flex items-center gap-2"
            onClick={() => {
              setSelectedPlatform('');
              setConnectModalOpen(true);
            }}
          >
            <Plus size={16} />
            <span>Connect Platform</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Ad Spend" 
          value="$23,100" 
          change="+15.2% from last period" 
          icon={DollarSign} 
          trend="up" 
        />
        <StatCard 
          title="Total Conversions" 
          value="412" 
          change="+22.4% from last period" 
          icon={ShoppingCart} 
          trend="up" 
        />
        <StatCard 
          title="Blended ROAS" 
          value="3.6x" 
          change="+4.8% from last period" 
          icon={BarChart} 
          trend="up" 
        />
        <StatCard 
          title="Avg. CTR" 
          value="2.2%" 
          change="-0.3% from last period" 
          icon={Users} 
          trend="down" 
        />
      </div>

      {/* Connected Platforms */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Connected Platforms</h3>
          <button 
            className="btn-outline text-sm py-1.5"
            onClick={() => refreshConnections()}
          >
            Refresh Connections
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {platformData.map((platform) => {
            const platformKey = getPlatformKey(platform.name);
            const isConnected = isPlatformConnected(platformKey);
            const Icon = getPlatformIcon(platform.name);
            const path = getPlatformPath(platform.name);
            
            return (
              <PlatformCard 
                key={platform.name}
                name={platform.name}
                icon={Icon}
                color={platform.color}
                connected={isConnected}
                path={path}
                onConnect={() => handleConnectPlatform(platformKey)}
              />
            );
          })}
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Cross-Platform Performance</h3>
            <select className="bg-dark-100 border border-white/10 rounded-lg px-2 py-1 text-sm">
              <option>Ad Spend</option>
              <option>Conversions</option>
              <option>ROAS</option>
              <option>CTR</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1877F2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1877F2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTikTok" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSnapchat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFFC00" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFFC00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E2E', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="google" 
                  name="Google Ads"
                  stroke="#4285F4" 
                  fillOpacity={1} 
                  fill="url(#colorGoogle)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="facebook" 
                  name="Facebook Ads"
                  stroke="#1877F2" 
                  fillOpacity={1} 
                  fill="url(#colorFacebook)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="tiktok" 
                  name="TikTok Ads"
                  stroke="#000000" 
                  fillOpacity={1} 
                  fill="url(#colorTikTok)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="snapchat" 
                  name="Snapchat Ads"
                  stroke="#FFFC00" 
                  fillOpacity={1} 
                  fill="url(#colorSnapchat)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Ad Spend Distribution</h3>
            <select className="bg-dark-100 border border-white/10 rounded-lg px-2 py-1 text-sm">
              <option>By Platform</option>
              <option>By Campaign Type</option>
              <option>By Objective</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E2E', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }} 
                  formatter={(value) => [`$${value}`, 'Spend']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Attribution Model Comparison</h3>
            <button className="btn-outline text-sm py-1.5 flex items-center gap-2">
              <Link size={14} />
              <span>Configure Attribution</span>
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={attributionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E2E', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }} 
                  formatter={(value) => [`${value}%`, 'Contribution']}
                />
                <Bar dataKey="value" name="Contribution %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Attribution Setup */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Link size={18} className="text-primary-400" />
            Attribution Setup
          </h3>
          <Link to="/attribution" className="btn-primary text-sm py-1.5 flex items-center gap-2">
            <ExternalLink size={14} />
            <span>Advanced Attribution Settings</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Current Attribution Model</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold">Multi-Touch</p>
                <p className="text-sm text-gray-400 mt-1">Position-based (40/20/40)</p>
              </div>
              <div className="p-2 rounded-full bg-primary-500/20 text-primary-400">
                <Link size={18} />
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Tracking Status</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-green-500">Active</p>
                <p className="text-sm text-gray-400 mt-1">Tracking on 3 platforms</p>
              </div>
              <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                <TrendingUp size={18} />
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Conversion Events</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold">5 Events</p>
                <p className="text-sm text-gray-400 mt-1">Purchase, Add to Cart, etc.</p>
              </div>
              <div className="p-2 rounded-full bg-secondary-500/20 text-secondary-400">
                <ShoppingCart size={18} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-primary-600/10 border border-primary-600/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary-600/20 text-primary-400 mt-1">
              <TrendingUp size={18} />
            </div>
            <div>
              <h4 className="font-medium">Easy Attribution Setup</h4>
              <p className="text-sm text-gray-400 mt-1">
                Our system automatically tracks conversions across all connected platforms without requiring complex setup. 
                Simply connect your ad accounts and install our tracking pixel on your website to get started.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button className="btn-primary text-sm py-1.5">Install Tracking Pixel</button>
                <button className="btn-outline text-sm py-1.5">View Documentation</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connect Platform Modal */}
      <ConnectPlatformModal 
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        platform={selectedPlatform}
      />
    </div>
  );
};

export default AllPlatforms;