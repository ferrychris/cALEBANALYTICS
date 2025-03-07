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
  Facebook,
  Filter,
  Calendar,
  Download,
  Search,
  AlertCircle,
  Target,
  PieChart,
  Star,
  Image,
  FileText,
  CheckCircle,
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
import CreativeRatingCard from '../../components/CreativeRatingCard';

const performanceData = [
  { name: 'Jan', spend: 2400, conversions: 18, roas: 3.0 },
  { name: 'Feb', spend: 2100, conversions: 15, roas: 2.8 },
  { name: 'Mar', spend: 3200, conversions: 25, roas: 3.2 },
  { name: 'Apr', spend: 4800, conversions: 42, roas: 3.5 },
  { name: 'May', spend: 4200, conversions: 35, roas: 3.3 },
  { name: 'Jun', spend: 5400, conversions: 48, roas: 3.6 },
  { name: 'Jul', spend: 6600, conversions: 60, roas: 3.7 },
];

const campaignData = [
  { 
    id: 1,
    name: 'Summer Collection - Carousel',
    status: 'active',
    budget: 150,
    spend: 2872,
    impressions: 98500,
    clicks: 2245,
    ctr: 2.3,
    conversions: 48,
    cpa: 59.83,
    roas: 3.8,
  },
  { 
    id: 2,
    name: 'Website Visitors Retargeting',
    status: 'active',
    budget: 100,
    spend: 1805,
    impressions: 75750,
    clicks: 1576,
    ctr: 2.1,
    conversions: 32,
    cpa: 56.41,
    roas: 4.2,
  },
  { 
    id: 3,
    name: 'Lookalike Audience - Purchasers',
    status: 'active',
    budget: 120,
    spend: 1945,
    impressions: 67600,
    clicks: 1845,
    ctr: 2.7,
    conversions: 33,
    cpa: 58.94,
    roas: 3.5,
  },
];

const audienceData = [
  { name: 'Women 25-34', value: 35 },
  { name: 'Women 35-44', value: 25 },
  { name: 'Men 25-34', value: 20 },
  { name: 'Men 35-44', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#1877F2', '#42B72A', '#F7B928', '#FA383E', '#A4A4A4'];

const aiAlerts = [
  {
    id: 1,
    campaign: 'Summer Collection - Carousel',
    message: 'Creative fatigue detected. Consider refreshing ad creatives to improve CTR.',
    type: 'warning',
    metric: 'creative'
  },
  {
    id: 2,
    campaign: 'Website Visitors Retargeting',
    message: 'This campaign is performing well. Consider increasing budget by 15% to scale results.',
    type: 'success',
    metric: 'budget'
  }
];

// Facebook creative ratings
const facebookCreativeRatings = [
  {
    id: 1,
    name: 'Summer Sale Banner',
    type: 'image',
    platform: 'facebook',
    url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'Summer Sale Campaign',
    overallScore: 8.7,
    scores: {
      relevance: 9.2,
      engagement: 8.5,
      clarity: 9.0,
      brandConsistency: 8.0
    },
    feedback: [
      "Strong visual appeal with vibrant summer colors",
      "Clear call-to-action that stands out",
      "Product positioning is effective"
    ],
    improvements: [
      "Increase contrast between text and background for better readability",
      "Test a version with more emphasis on discount percentage"
    ],
    status: 'active'
  },
  {
    id: 2,
    name: 'Retargeting Ad Copy',
    type: 'copy',
    platform: 'facebook',
    content: "Still thinking about that perfect summer look? Your cart is waiting! Complete your purchase now and get an extra 10% off with code SUMMER10.",
    campaign: 'Retargeting - Website Visitors',
    overallScore: 8.9,
    scores: {
      relevance: 9.4,
      engagement: 8.6,
      clarity: 9.0,
      brandConsistency: 8.5
    },
    feedback: [
      "Excellent personalization for abandoned cart scenario",
      "Clear incentive with additional discount",
      "Good use of FOMO (fear of missing out)"
    ],
    improvements: [
      "Test version with specific product mention",
      "Add time limit to discount code for urgency"
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

const FacebookAds = () => {
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
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#1877F220', color: '#1877F2' }}>
            <Facebook size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Facebook Ads</h1>
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
              <span>Connect Facebook Ads</span>
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
            <div className="p-4 rounded-full bg-blue-500/20 mb-4">
              <Facebook size={40} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Connect Your Facebook Ads Account</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Link your Facebook Ads account to Nova to unlock powerful analytics, AI-driven insights, and optimization recommendations.
            </p>
            <button 
              onClick={handleConnect}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Connect Facebook Ads</span>
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
              onClick={() => setActiveTab('audience')}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                activeTab === 'audience'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Audience
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
                  value="$6,600" 
                  change="+22.2% from last period" 
                  icon={DollarSign} 
                  trend="up" 
                />
                <StatCard 
                  title="Conversions" 
                  value="60" 
                  change="+25.0% from last period" 
                  icon={ShoppingCart} 
                  trend="up" 
                />
                <StatCard 
                  title="ROAS" 
                  value="3.7x" 
                  change="+2.8% from last period" 
                  icon={BarChart} 
                  trend="up" 
                />
                <StatCard 
                  title="CTR" 
                  value="2.4%" 
                  change="+0.3% from last period" 
                  icon={Users} 
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
                  Facebook Ads Insights
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
                          alert.metric === 'creative' ? <Target size={16} /> : 
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Performance Over Time</h3>
                    <select className="bg-dark-100 border border-white/10 rounded-lg px-2 py-1 text-sm">
                      <option>Spend & Conversions</option>
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
                          <linearGradient id="colorFbSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1877F2" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#1877F2" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorFbConversions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#42B72A" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#42B72A" stopOpacity={0}/>
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
                          stroke="#1877F2" 
                          fillOpacity={1} 
                          fill="url(#colorFbSpend)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="conversions" 
                          name="Conversions"
                          stroke="#42B72A" 
                          fillOpacity={1} 
                          fill="url(#colorFbConversions)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="glass-card p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Audience Demographics</h3>
                    <button className="btn-outline text-sm py-1.5 flex items-center gap-2">
                      <Target size={14} />
                      <span>Audience Insights</span>
                    </button>
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
              </div>
            </>
          )}

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
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
                    <Facebook size={16} />
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
                <p className="text-sm text-gray-400">Showing 3 of 7 campaigns</p>
                <a href="#" className="text-primary-400 flex items-center gap-1 text-sm hover:underline">
                  View all campaigns <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Audience Demographics</h3>
                  <button className="btn-outline text-sm py-1.5 flex items-center gap-2">
                    <Target size={14} />
                    <span>Detailed Insights</span>
                  </button>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-semibold mb-4">Age Distribution</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">18-24</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">25-34</span>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">35-44</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">45-54</span>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">55+</span>
                        <span className="text-sm font-medium">8%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-semibold mb-4">Gender Distribution</h3>
                  <div className="flex items-center justify-center h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'Women', value: 60 },
                            { name: 'Men', value: 35 },
                            { name: 'Other', value: 5 }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#E1306C" />
                          <Cell fill="#1877F2" />
                          <Cell fill="#A4A4A4" />
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
                  <h3 className="font-semibold mb-4">Top Locations</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">New York</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Los Angeles</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Chicago</span>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Miami</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Other</span>
                        <span className="text-sm font-medium">38%</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
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
                        <p className="text-2xl font-semibold text-blue-500">8.8</p>
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
                        <p className="text-lg font-semibold">Retargeting Ad Copy</p>
                        <p className="text-sm text-gray-400 mt-1">Score: 8.9/10</p>
                      </div>
                      <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                        <FileText size={18} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Needs Improvement</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">None</p>
                        <p className="text-sm text-gray-400 mt-1">All creatives performing well</p>
                      </div>
                      <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                        <CheckCircle size={18} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-400">Creative Assets</h4>
                  
                  {facebookCreativeRatings.map(rating => (
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

export default FacebookAds;