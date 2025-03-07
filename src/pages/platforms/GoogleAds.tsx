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
  Megaphone,
  Filter,
  Calendar,
  Download,
  Search,
  AlertCircle,
  Star,
  Image,
  FileText,
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
  Legend
} from 'recharts';
import CreativeRatingCard from '../../components/CreativeRatingCard';

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
  { 
    id: 1,
    name: 'Summer Sale Campaign',
    status: 'active',
    budget: 250,
    spend: 4872,
    impressions: 124500,
    clicks: 3245,
    ctr: 2.6,
    conversions: 87,
    cpa: 56,
    roas: 4.2,
  },
  { 
    id: 2,
    name: 'Retargeting - Website Visitors',
    status: 'active',
    budget: 150,
    spend: 2105,
    impressions: 98750,
    clicks: 1876,
    ctr: 1.9,
    conversions: 42,
    cpa: 50.12,
    roas: 5.1,
  },
  { 
    id: 3,
    name: 'New Collection Launch',
    status: 'active',
    budget: 200,
    spend: 3845,
    impressions: 87600,
    clicks: 2345,
    ctr: 2.7,
    conversions: 53,
    cpa: 72.55,
    roas: 3.8,
  },
];

const aiAlerts = [
  {
    id: 1,
    campaign: 'Summer Sale Campaign',
    message: 'This campaign is performing well. Consider increasing budget by 20% to scale results.',
    type: 'success',
    metric: 'budget'
  },
  {
    id: 2,
    campaign: 'Brand Awareness',
    message: 'High CPA detected. Consider adjusting targeting or bidding strategy.',
    type: 'warning',
    metric: 'bidding'
  }
];

// Creative ratings data for Google Ads
const googleAdsCreatives = [
  {
    id: 1,
    name: 'Summer Sale Search Ad',
    type: 'copy',
    platform: 'google',
    content: "Summer's Hottest Deals | 40% Off All Collections | Free Shipping on Orders $50+",
    campaign: 'Summer Sale Campaign',
    dateCreated: '2025-05-10',
    dateAnalyzed: '2025-05-12',
    overallScore: 8.5,
    scores: {
      relevance: 9.0,
      engagement: 8.2,
      clarity: 8.8,
      brandConsistency: 8.0
    },
    feedback: [
      "Strong headline with clear value proposition (40% off)",
      "Good use of free shipping incentive",
      "Character count is optimized for search ads",
      "Clear seasonal relevance with 'Summer' mention"
    ],
    improvements: [
      "Consider adding specific product categories in description",
      "Test a version with price point mentions",
      "Add more specific call-to-action"
    ],
    status: 'active'
  },
  {
    id: 2,
    name: 'New Collection Display Banner',
    type: 'image',
    platform: 'google',
    url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'New Collection Launch',
    dateCreated: '2025-05-08',
    dateAnalyzed: '2025-05-11',
    overallScore: 7.2,
    scores: {
      relevance: 7.5,
      engagement: 6.8,
      clarity: 7.0,
      brandConsistency: 7.5
    },
    feedback: [
      "Clean, professional design",
      "Product is clearly visible",
      "Brand logo is appropriately placed",
      "Color scheme matches brand guidelines"
    ],
    improvements: [
      "Text is slightly small for some display placements",
      "Call-to-action button could be more prominent",
      "Consider testing a version with a human model",
      "Add a stronger value proposition in the headline"
    ],
    status: 'needs_improvement'
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

const GoogleAds = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedAsset, setExpandedAsset] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  const toggleExpandAsset = (id: number) => {
    setExpandedAsset(expandedAsset === id ? null : id);
  };

  const handleConnect = () => {
    setIsConnected(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#4285F420', color: '#4285F4' }}>
            <Megaphone size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Google Ads</h1>
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
              <span>Connect Google Ads</span>
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
              <Megaphone size={40} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Connect Your Google Ads Account</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Link your Google Ads account to Nova to unlock powerful analytics, AI-driven insights, and optimization recommendations.
            </p>
            <button 
              onClick={handleConnect}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Connect Google Ads</span>
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
                  value="$11,000" 
                  change="+12.5% from last period" 
                  icon={DollarSign} 
                  trend="up" 
                />
                <StatCard 
                  title="Conversions" 
                  value="90" 
                  change="+18.2% from last period" 
                  icon={ShoppingCart} 
                  trend="up" 
                />
                <StatCard 
                  title="ROAS" 
                  value="4.1x" 
                  change="+5.3% from last period" 
                  icon={BarChart} 
                  trend="up" 
                />
                <StatCard 
                  title="CTR" 
                  value="2.8%" 
                  change="+0.4% from last period" 
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
                  Google Ads Insights
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
                          alert.metric === 'bidding' ? <TrendingUp size={16} /> : 
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
                        <option>Summer Sale</option>
                        <option>Retargeting</option>
                        <option>New Collection</option>
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
                          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
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
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="spend" 
                          name="Spend ($)"
                          stroke="#0ea5e9" 
                          fillOpacity={1} 
                          fill="url(#colorSpend)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="conversions" 
                          name="Conversions"
                          stroke="#8b5cf6" 
                          fillOpacity={1} 
                          fill="url(#colorConversions)" 
                        />
                      </AreaChart>
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
              transition={{ duration: 0.3, delay: 0.2 }}
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
                    <Megaphone size={16} />
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
                <p className="text-sm text-gray-400">Showing 3 of 8 campaigns</p>
                <a href="#" className="text-primary-400 flex items-center gap-1 text-sm hover:underline">
                  View all campaigns <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          )}

          {/* Creative Ratings Tab */}
          {activeTab === 'creatives' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Star size={20} className="text-primary-400" />
                  Google Ads Creative Ratings
                </h3>
                <div className="flex items-center gap-3">
                  <button className="btn-outline text-sm py-1.5 flex items-center gap-2">
                    <Filter size={14} />
                    <span>Filter</span>
                  </button>
                  <button className="btn-primary text-sm py-1.5 flex items-center gap-2">
                    <Star size={14} />
                    <span>Analyze New Asset</span>
                  </button>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary-600/20 text-primary-400">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Google Ads Creative Performance</h3>
                      <p className="text-sm text-gray-400">AI-powered analysis of your Google Ads creative assets</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-dark-100 rounded-lg">
                      <FileText size={16} className="text-blue-400" />
                      <span className="text-sm">Copy: 1</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-dark-100 rounded-lg">
                      <Image size={16} className="text-green-400" />
                      <span className="text-sm">Images: 1</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {googleAdsCreatives.map(asset => (
                    <CreativeRatingCard 
                      key={asset.id}
                      asset={asset}
                      expanded={expandedAsset === asset.id}
                      onToggleExpand={() => toggleExpandAsset(asset.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GoogleAds;