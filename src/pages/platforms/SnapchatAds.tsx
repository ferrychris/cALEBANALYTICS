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
  MessageCircle,
  Filter,
  Calendar,
  Download,
  Search,
  AlertCircle,
  Camera,
  Clock,
  Zap,
  Plus,
  Star,
  Video
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
import CreativeRatingCard from '../../components/CreativeRatingCard';

const performanceData = [
  { name: 'Jan', spend: 900, conversions: 6, roas: 2.2 },
  { name: 'Feb', spend: 800, conversions: 5, roas: 2.0 },
  { name: 'Mar', spend: 1100, conversions: 8, roas: 2.4 },
  { name: 'Apr', spend: 1600, conversions: 14, roas: 2.7 },
  { name: 'May', spend: 1400, conversions: 12, roas: 2.6 },
  { name: 'Jun', spend: 1800, conversions: 16, roas: 2.8 },
  { name: 'Jul', spend: 2200, conversions: 20, roas: 2.9 },
];

const campaignData = [
  { 
    id: 1,
    name: 'AR Lens Campaign',
    status: 'active',
    budget: 80,
    spend: 1272,
    impressions: 85500,
    clicks: 1845,
    ctr: 2.2,
    conversions: 12,
    cpa: 106.00,
    roas: 2.5,
  },
  { 
    id: 2,
    name: 'Story Ads Collection',
    status: 'active',
    budget: 60,
    spend: 605,
    impressions: 52750,
    clicks: 1176,
    ctr: 2.2,
    conversions: 8,
    cpa: 75.63,
    roas: 3.0,
  },
  { 
    id: 3,
    name: 'Dynamic Product Ads',
    status: 'active',
    budget: 50,
    spend: 345,
    impressions: 37600,
    clicks: 845,
    ctr: 2.2,
    conversions: 5,
    cpa: 69.00,
    roas: 2.8,
  },
];

const adFormatData = [
  { name: 'AR Lenses', value: 45 },
  { name: 'Story Ads', value: 30 },
  { name: 'Collection Ads', value: 15 },
  { name: 'Dynamic Ads', value: 10 },
];

const COLORS = ['#FFFC00', '#00C4FF', '#FF0000', '#00FF00'];

const aiAlerts = [
  {
    id: 1,
    campaign: 'AR Lens Campaign',
    message: 'AR lens engagement is high but conversion path needs optimization.',
    type: 'warning',
    metric: 'conversion'
  },
  {
    id: 2,
    campaign: 'Story Ads Collection',
    message: 'Strong ROAS performance. Consider increasing budget allocation.',
    type: 'success',
    metric: 'budget'
  }
];

// Snapchat creative ratings
const snapchatCreativeRatings = [
  {
    id: 1,
    name: 'AR Lens Promo',
    type: 'image',
    platform: 'snapchat',
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'AR Lens Campaign',
    overallScore: 6.8,
    scores: {
      relevance: 7.2,
      engagement: 6.5,
      clarity: 6.0,
      brandConsistency: 7.5
    },
    feedback: [
      "AR lens effect is visually interesting",
      "Brand elements are present but subtle",
      "Purpose of the lens isn't immediately clear",
      "Could be more aligned with campaign objectives"
    ],
    improvements: [
      "Make the purpose and action clearer in the visual",
      "Increase brand presence without being intrusive",
      "Add text overlay explaining how to interact with the lens"
    ],
    status: 'needs_improvement'
  },
  {
    id: 2,
    name: 'Story Ad Collection',
    type: 'image',
    platform: 'snapchat',
    url: 'https://images.unsplash.com/photo-1611162616305-c69b3267bc40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'Story Ads Collection',
    overallScore: 7.9,
    scores: {
      relevance: 8.2,
      engagement: 7.8,
      clarity: 7.5,
      brandConsistency: 8.1
    },
    feedback: [
      "Good use of Snapchat's vertical format",
      "Product display is clear and attractive",
      "Call-to-action is visible",
      "Brand identity is consistent"
    ],
    improvements: [
      "Add more interactive elements",
      "Test with brighter colors for better attention",
      "Consider adding social proof elements"
    ],
    status: 'active'
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

const SnapchatAds = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedRating, setExpandedRating] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const toggleRatingExpand = (id: number) => {
    setExpandedRating(expandedRating === id ? null : id);
  };

  const handleConnect = () => {
    setIsConnected(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFFC0020', color: '#FFFC00' }}>
            <MessageCircle size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Snapchat Ads</h1>
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
              <span>Connect Snapchat Ads</span>
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
            <div className="p-4 rounded-full bg-yellow-500/20 mb-4">
              <MessageCircle size={40} className="text-yellow-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Connect Your Snapchat Ads Account</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Link your Snapchat Ads account to Nova to unlock powerful analytics, AI-driven insights, and optimization recommendations.
            </p>
            <button 
              onClick={handleConnect}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Connect Snapchat Ads</span>
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Your data is secure and will only be used to provide insights and recommendations.
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'campaigns'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('creatives')}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'creatives'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Creative Ratings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Spend" 
                  value="$2,200" 
                  change="+22.2% from last period" 
                  icon={DollarSign} 
                  trend="up" 
                />
                <StatCard 
                  title="Conversions" 
                  value="20" 
                  change="+25.0% from last period" 
                  icon={ShoppingCart} 
                  trend="up" 
                />
                <StatCard 
                  title="ROAS" 
                  value="2.9x" 
                  change="+3.6% from last period" 
                  icon={BarChart} 
                  trend="up" 
                />
                <StatCard 
                  title="Lens Plays" 
                  value="125K" 
                  change="+35.8% from last period" 
                  icon={Camera} 
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
                  Snapchat Ads Insights
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
                          {alert.metric === 'budget' ? <DollarSign size={16} /> : 
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
                        <option>AR Lens Campaign</option>
                        <option>Story Ads</option>
                        <option>Dynamic Ads</option>
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
                          <linearGradient id="colorSpendSC" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFFC00" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FFFC00" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorConversionsSC" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00C4FF" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#00C4FF" stopOpacity={0}/>
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
                          stroke="#FFFC00" 
                          fillOpacity={1} 
                          fill="url(#colorSpendSC)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="conversions" 
                          name="Conversions"
                          stroke="#00C4FF" 
                          fillOpacity={1} 
                          fill="url(#colorConversionsSC)" 
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
                    <h3 className="font-semibold">Ad Format Distribution</h3>
                    <select className="bg-dark-100 border border-white/10 rounded-lg px-2 py-1 text-sm">
                      <option>By Spend</option>
                      <option>By Engagement</option>
                      <option>By Conversions</option>
                    </select>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={adFormatData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {adFormatData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1E1E2E', 
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: 'white'
                          }} 
                          formatter={(value) => [`${value}%`, 'Distribution']}
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
                        <Bar dataKey="roas" name="ROAS" fill="#FFFC00" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
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
                    <MessageCircle size={16} />
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
                <p className="text-sm text-gray-400">Showing 3 of 4 campaigns</p>
                <a href="#" className="text-primary-400 flex items-center gap-1 text-sm hover:underline">
                  View all campaigns <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          )}

          {/* Creative Ratings Tab */}
          {activeTab === 'creatives' && (
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Star size={18} className="text-primary-400" />
                    Creative Performance Ratings
                  </h3>
                  <button className="btn-primary text-sm py-1.5 flex items-center gap-2">
                    <Star size={14} />
                    <span>Analyze New Creative</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="glass-panel p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Average Score</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-semibold text-blue-500">7.4</p>
                        <p className="text-sm text-gray-400 mt-1">Across all creatives</p>
                      </div>
                      <div className="p-2 rounded-full bg-blue-500/20 text-blue-500">
                        <Star size={18} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Top Performing</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">Story Ad Collection</p>
                        <p className="text-sm text-gray-400 mt-1">Score: 7.9/10</p>
                      </div>
                      <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                        <Camera size={18} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Needs Improvement</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">AR Lens Promo</p>
                        <p className="text-sm text-gray-400 mt-1">Score: 6.8/10</p>
                      </div>
                      <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-500">
                        <Camera size={18} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-400">Creative Assets</h4>
                  
                  {snapchatCreativeRatings.map(rating => (
                    <CreativeRatingCard 
                      key={rating.id}
                      asset={rating}
                      expanded={expandedRating === rating.id}
                      onToggleExpand={() => toggleRatingExpand(rating.id)}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SnapchatAds;