import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart, 
  ArrowRight,
  Youtube,
  Filter,
  Calendar,
  Download,
  Search,
  AlertCircle,
  Video,
  Eye,
  ThumbsUp,
  Plus
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

const performanceData = [
  { name: 'Jan', spend: 1200, conversions: 8, roas: 2.5 },
  { name: 'Feb', spend: 900, conversions: 6, roas: 2.3 },
  { name: 'Mar', spend: 1500, conversions: 12, roas: 2.8 },
  { name: 'Apr', spend: 2200, conversions: 20, roas: 3.0 },
  { name: 'May', spend: 2000, conversions: 18, roas: 2.9 },
  { name: 'Jun', spend: 2700, conversions: 25, roas: 3.1 },
  { name: 'Jul', spend: 3300, conversions: 32, roas: 3.2 },
];

const campaignData = [
  { 
    id: 1,
    name: 'TikTok Trend Challenge',
    status: 'active',
    budget: 100,
    spend: 1872,
    impressions: 95500,
    clicks: 2845,
    ctr: 3.0,
    conversions: 18,
    cpa: 104.00,
    roas: 2.8,
  },
  { 
    id: 2,
    name: 'Product Demo Videos',
    status: 'active',
    budget: 80,
    spend: 905,
    impressions: 72750,
    clicks: 2176,
    ctr: 3.0,
    conversions: 12,
    cpa: 75.42,
    roas: 3.2,
  },
  { 
    id: 3,
    name: 'Influencer Partnerships',
    status: 'active',
    budget: 70,
    spend: 545,
    impressions: 47600,
    clicks: 1545,
    ctr: 3.2,
    conversions: 8,
    cpa: 68.13,
    roas: 3.5,
  },
];

const audienceData = [
  { name: 'Women 18-24', value: 40 },
  { name: 'Men 18-24', value: 30 },
  { name: 'Women 25-34', value: 15 },
  { name: 'Men 25-34', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#000000', '#25F4EE', '#FE2C55', '#FFFFFF', '#A4A4A4'];

const aiAlerts = [
  {
    id: 1,
    campaign: 'TikTok Trend Challenge',
    message: 'High engagement but low conversion rate. Consider optimizing landing page experience.',
    type: 'warning',
    metric: 'conversion'
  },
  {
    id: 2,
    campaign: 'Product Demo Videos',
    message: 'Videos under 15 seconds are performing best. Consider shortening other creatives.',
    type: 'info',
    metric: 'creative'
  }
];

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

const TikTokAds = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [isConnected, setIsConnected] = useState(false);
  
  const handleConnect = () => {
    setIsConnected(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#00000020', color: '#FFFFFF' }}>
            <Youtube size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">TikTok Ads</h1>
            <p className="text-gray-400 mt-1">Performance metrics and campaign management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isConnected ? (
            <button 
              onClick={handleConnect}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Connect TikTok Ads</span>
            </button>
          ) : (
            <>
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
              <button className="btn-outline flex items-center gap-2">
                <Calendar size={16} />
                <span>Custom</span>
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Download size={16} />
                <span>Export</span>
              </button>
            </>
          )}
        </div>
      </div>

      {!isConnected ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8 text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="p-4 rounded-full bg-gray-500/20 mb-4">
              <Youtube size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">Connect Your TikTok Ads Account</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Link your TikTok Ads account to Nova to unlock powerful analytics, AI-driven insights, and optimization recommendations.
            </p>
            <button 
              onClick={handleConnect}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Connect TikTok Ads</span>
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Your data is secure and will only be used to provide insights and recommendations.
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Spend" 
              value="$3,300" 
              change="+22.2% from last period" 
              icon={DollarSign} 
              trend="up" 
            />
            <StatCard 
              title="Conversions" 
              value="32" 
              change="+28.0% from last period" 
              icon={ShoppingCart} 
              trend="up" 
            />
            <StatCard 
              title="ROAS" 
              value="3.2x" 
              change="+3.2% from last period" 
              icon={BarChart} 
              trend="up" 
            />
            <StatCard 
              title="Video Views" 
              value="215K" 
              change="+45.3% from last period" 
              icon={Eye} 
              trend="up" 
            />
          </div>

          {/* AI Alerts */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-primary-400" />
              TikTok Ads Insights
            </h3>
            
            <div className="space-y-3">
              {aiAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${
                    alert.type === 'success' 
                      ? 'border-green-500/20 bg-green-500/10' 
                      : alert.type === 'warning'
                      ? 'border-yellow-500/20 bg-yellow-500/10'
                      : 'border-blue-500/20 bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      alert.type === 'success' 
                        ? 'bg-green-500/20 text-green-500' 
                        : alert.type === 'warning'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {alert.metric === 'creative' ? <Video size={16} /> : 
                      alert.metric === 'conversion' ? <ShoppingCart size={16} /> : 
                      <BarChart size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{alert.campaign}</p>
                      <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Performance Over Time</h3>
                <div className="flex items-center gap-3">
                  <select className="bg-dark-100 border border-white/10 rounded-lg px-2 py-1 text-sm">
                    <option>All Campaigns</option>
                    <option>Trend Challenge</option>
                    <option>Product Demo</option>
                    <option>Influencer Partnerships</option>
                  </select>
                  <button className="btn-outline text-sm py-1.5 flex items-center gap-2">
                    <Filter size={14} />
                    <span>Metrics</span>
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorSpendTT" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FE2C55" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorConversionsTT" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#25F4EE" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#25F4EE" stopOpacity={0}/>
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
                      dataKey="spend" 
                      name="Spend ($)"
                      stroke="#FE2C55" 
                      fillOpacity={1} 
                      fill="url(#colorSpendTT)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="conversions" 
                      name="Conversions"
                      stroke="#25F4EE" 
                      fillOpacity={1} 
                      fill="url(#colorConversionsTT)" 
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
                <h3 className="font-semibold">Audience Demographics</h3>
                <select className="bg-dark-100 border border-white/10 rounded-lg px-2 py-1 text-sm">
                  <option>By Age & Gender</option>
                  <option>By Location</option>
                  <option>By Interests</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={audienceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E1E2E', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: 'white'
                      }} 
                      formatter={(value) => [`${value}%`, 'Audience']}
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
                <h3 className="font-semibold">ROAS by Campaign</h3>
                <select className="bg-dark-100 border border-white/10 rounded-lg px-2 py-1 text-sm">
                  <option>All Time</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={campaignData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" tickFormatter={(value) => value.split(' ')[0]} />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E1E2E', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        color: 'white'
                      }} 
                      formatter={(value) => [`${value}x`, 'ROAS']}
                    />
                    <Bar dataKey="roas" name="ROAS" fill="#FE2C55" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Campaigns Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="pl-10 pr-4 py-2 bg-dark-100 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="btn-outline flex items-center gap-2 text-sm py-1.5">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                <button className="btn-primary flex items-center gap-2 text-sm py-1.5">
                  <Youtube size={16} />
                  <span>New Campaign</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Campaign</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Budget/day</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Spend</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Impressions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Clicks</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">CTR</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Conv.</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer">
                      <td className="py-3 px-4 font-medium">{campaign.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          campaign.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">${campaign.budget}</td>
                      <td className="py-3 px-4">${campaign.spend.toLocaleString()}</td>
                      <td className="py-3 px-4">{campaign.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4">{campaign.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4">{campaign.ctr}%</td>
                      <td className="py-3 px-4">{campaign.conversions}</td>
                      <td className="py-3 px-4">{campaign.roas}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-400">Showing 3 of 5 campaigns</p>
              <a href="#" className="text-primary-400 flex items-center gap-1 text-sm hover:underline">
                View all campaigns <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default TikTokAds;