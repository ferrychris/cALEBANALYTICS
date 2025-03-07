import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart, 
  ArrowRight,
  AlertCircle,
  Sparkles,
  Rocket,
  Star,
  Download
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
  Legend
} from 'recharts';

const performanceData = [
  { name: 'Jan', spend: 4000, conversions: 24, roas: 3.2 },
  { name: 'Feb', spend: 3000, conversions: 18, roas: 3.0 },
  { name: 'Mar', spend: 5000, conversions: 35, roas: 3.5 },
  { name: 'Apr', spend: 8000, conversions: 60, roas: 3.8 },
  { name: 'May', spend: 7000, conversions: 48, roas: 3.4 },
  { name: 'Jun', spend: 9000, conversions: 72, roas: 4.0 },
  { name: 'Jul', spend: 11000, conversions: 90, roas: 4.1 },
];

const campaignData = [
  { name: 'Summer Sale', spend: 5200, roas: 4.2, status: 'active' },
  { name: 'New Collection', spend: 3800, roas: 3.8, status: 'active' },
  { name: 'Retargeting', spend: 2100, roas: 5.1, status: 'active' },
  { name: 'Brand Awareness', spend: 4500, roas: 2.1, status: 'paused' },
];

const aiRecommendations = [
  {
    id: 1,
    title: 'Increase budget for "Summer Sale" campaign',
    description: 'This campaign is performing well with ROAS of 4.2. Consider increasing budget by 20% to scale results.',
    impact: 'high',
    type: 'budget'
  },
  {
    id: 2,
    title: 'Adjust bidding strategy for "Brand Awareness"',
    description: 'Switch from manual CPC to target ROAS bidding to improve performance.',
    impact: 'medium',
    type: 'bidding'
  },
  {
    id: 3,
    title: 'Optimize ad schedule for "Retargeting"',
    description: 'Performance data shows higher conversion rates between 6-9pm. Adjust ad schedule to focus on these hours.',
    impact: 'medium',
    type: 'optimization'
  },
];

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden group"
  >
    {/* Subtle glow effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 opacity-0 group-hover:opacity-100 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300"></div>
    
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="text-sm ml-1">{change}</span>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <Icon size={20} className="text-purple-400" />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const handleExportToSheets = () => {
    // In a real application, this would integrate with Google Sheets API
    // For demo purposes, we'll open Google Sheets in a new tab
    window.open('https://sheets.google.com/create', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, here's what's happening with your campaigns</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportToSheets}
            className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
          >
            <Download size={16} />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Spend" 
          value="$24,500" 
          change="+12.5% from last month" 
          icon={DollarSign} 
          trend="up" 
        />
        <StatCard 
          title="Conversions" 
          value="347" 
          change="+18.2% from last month" 
          icon={ShoppingCart} 
          trend="up" 
        />
        <StatCard 
          title="ROAS" 
          value="3.8x" 
          change="+5.3% from last month" 
          icon={BarChart} 
          trend="up" 
        />
        <StatCard 
          title="CTR" 
          value="2.4%" 
          change="-0.8% from last month" 
          icon={Users} 
          trend="down" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Subtle cosmic accent */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-semibold">Campaign Performance</h3>
            <select className="bg-dark-100/70 border border-white/10 rounded-lg px-2 py-1 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-80 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
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
                <Area 
                  type="monotone" 
                  dataKey="spend" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorSpend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Subtle cosmic accent */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-semibold">ROAS by Campaign</h3>
            <select className="bg-dark-100/70 border border-white/10 rounded-lg px-2 py-1 text-sm">
              <option>All Campaigns</option>
              <option>Active Campaigns</option>
              <option>Paused Campaigns</option>
            </select>
          </div>
          <div className="h-80 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={campaignData}
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
                />
                <Legend />
                <Bar dataKey="roas" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
      >
        {/* Cosmic accent */}
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-50"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-400" size={20} />
            <h3 className="font-semibold">AI Recommendations</h3>
          </div>
          <button className="btn-outline text-sm py-1.5 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">View All</button>
        </div>
        
        <div className="space-y-4">
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl hover:bg-dark-100/80 transition-all duration-200 group">
              <div className="flex justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    rec.impact === 'high' 
                      ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-500' 
                      : rec.impact === 'medium'
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-500'
                      : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-500'
                  }`}>
                    {rec.type === 'budget' ? <DollarSign size={18} /> : 
                     rec.type === 'bidding' ? <TrendingUp size={18} /> : 
                     <AlertCircle size={18} />}
                  </div>
                  <div>
                    <h4 className="font-medium">{rec.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{rec.description}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg group-hover:text-purple-400 transition-colors">
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-purple-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Active Campaigns */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
      >
        {/* Cosmic accent */}
        <div className="absolute -bottom-10 right-20 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="font-semibold">Active Campaigns</h3>
          <button className="btn-outline text-sm py-1.5 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">View All Campaigns</button>
        </div>
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Campaign</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Budget</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Spend</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4">{campaign.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">${(campaign.spend * 1.2).toFixed(2)}/day</td>
                  <td className="py-3 px-4">${campaign.spend.toLocaleString()}</td>
                  <td className="py-3 px-4">{Math.round(campaign.spend / (campaign.roas * 100))}</td>
                  <td className="py-3 px-4">{campaign.roas}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;