import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart,
  PieChart,
  ArrowRight,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Loader,
  Globe,
  MapPin,
  Clock,
  RefreshCw
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
import { toast } from 'sonner';

const performanceData = [
  { name: 'Jan', spend: 4000, conversions: 24, roas: 3.2 },
  { name: 'Feb', spend: 3000, conversions: 18, roas: 3.0 },
  { name: 'Mar', spend: 5000, conversions: 35, roas: 3.5 },
  { name: 'Apr', spend: 8000, conversions: 60, roas: 3.8 },
  { name: 'May', spend: 7000, conversions: 48, roas: 3.4 },
  { name: 'Jun', spend: 9000, conversions: 72, roas: 4.0 },
  { name: 'Jul', spend: 11000, conversions: 90, roas: 4.1 },
];

const campaignPerformance = [
  { name: 'Summer Sale', value: 4872 },
  { name: 'Retargeting', value: 2105 },
  { name: 'New Collection', value: 3845 },
  { name: 'Brand Awareness', value: 4521 },
  { name: 'Competitor', value: 1876 },
];

const deviceData = [
  { name: 'Mobile', value: 65 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 5 },
];

const hourlyData = [
  { hour: '12am', impressions: 1200, clicks: 40, conversions: 2 },
  { hour: '1am', impressions: 800, clicks: 25, conversions: 1 },
  { hour: '2am', impressions: 600, clicks: 18, conversions: 0 },
  { hour: '3am', impressions: 400, clicks: 12, conversions: 0 },
  { hour: '4am', impressions: 300, clicks: 8, conversions: 0 },
  { hour: '5am', impressions: 500, clicks: 15, conversions: 0 },
  { hour: '6am', impressions: 900, clicks: 30, conversions: 1 },
  { hour: '7am', impressions: 1500, clicks: 60, conversions: 3 },
  { hour: '8am', impressions: 2500, clicks: 100, conversions: 5 },
  { hour: '9am', impressions: 3500, clicks: 150, conversions: 8 },
  { hour: '10am', impressions: 4200, clicks: 180, conversions: 10 },
  { hour: '11am', impressions: 4800, clicks: 210, conversions: 12 },
  { hour: '12pm', impressions: 5200, clicks: 230, conversions: 15 },
  { hour: '1pm', impressions: 5000, clicks: 220, conversions: 14 },
  { hour: '2pm', impressions: 4800, clicks: 210, conversions: 13 },
  { hour: '3pm', impressions: 4600, clicks: 200, conversions: 12 },
  { hour: '4pm', impressions: 4900, clicks: 215, conversions: 14 },
  { hour: '5pm', impressions: 5300, clicks: 240, conversions: 16 },
  { hour: '6pm', impressions: 5800, clicks: 260, conversions: 18 },
  { hour: '7pm', impressions: 6200, clicks: 280, conversions: 20 },
  { hour: '8pm', impressions: 5800, clicks: 260, conversions: 18 },
  { hour: '9pm', impressions: 5000, clicks: 220, conversions: 15 },
  { hour: '10pm', impressions: 3500, clicks: 150, conversions: 9 },
  { hour: '11pm', impressions: 2000, clicks: 80, conversions: 4 },
];

const geoData = [
  { region: 'California', users: 12500, conversions: 450, spend: 8500, cpa: 18.89 },
  { region: 'New York', users: 10200, conversions: 380, spend: 7200, cpa: 18.95 },
  { region: 'Texas', users: 8500, conversions: 310, spend: 5800, cpa: 18.71 },
  { region: 'Florida', users: 7200, conversions: 260, spend: 4900, cpa: 18.85 },
  { region: 'Illinois', users: 5800, conversions: 210, spend: 3900, cpa: 18.57 },
  { region: 'Pennsylvania', users: 4900, conversions: 180, spend: 3400, cpa: 18.89 },
  { region: 'Ohio', users: 4200, conversions: 150, spend: 2800, cpa: 18.67 },
  { region: 'Michigan', users: 3800, conversions: 140, spend: 2600, cpa: 18.57 },
  { region: 'Georgia', users: 3500, conversions: 130, spend: 2400, cpa: 18.46 },
  { region: 'North Carolina', users: 3200, conversions: 120, spend: 2200, cpa: 18.33 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const DEVICE_COLORS = ['#8b5cf6', '#0ea5e9', '#10b981'];

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

const Analytics = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [showHourlyPerformance, setShowHourlyPerformance] = useState(false);
  const [showGeoPerformance, setShowGeoPerformance] = useState(false);
  const [geoMetric, setGeoMetric] = useState('conversions');
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  
  const generateNewInsights = async () => {
    setIsGeneratingInsights(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Generated new analytics insights');
    } catch (error) {
      console.error("Error generating insights:", error);
      toast.error("Failed to generate insights. Please try again.");
    } finally {
      setIsGeneratingInsights(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive performance metrics for your campaigns</p>
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
          <button className="btn-outline flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
            <Calendar size={16} />
            <span>Custom</span>
          </button>
          <button className="btn-outline flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Spend" 
          value="$24,500" 
          change="+12.5% from last period" 
          icon={DollarSign} 
          trend="up" 
        />
        <StatCard 
          title="Conversions" 
          value="347" 
          change="+18.2% from last period" 
          icon={ShoppingCart} 
          trend="up" 
        />
        <StatCard 
          title="ROAS" 
          value="3.8x" 
          change="+5.3% from last period" 
          icon={BarChart} 
          trend="up" 
        />
        <StatCard 
          title="CTR" 
          value="2.4%" 
          change="-0.8% from last period" 
          icon={Users} 
          trend="down" 
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Cosmic accent */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-semibold">Performance Over Time</h3>
            <div className="flex items-center gap-3">
              <select className="bg-dark-100/70 border border-white/10 rounded-lg px-2 py-1 text-sm">
                <option>All Campaigns</option>
                <option>Summer Sale</option>
                <option>Retargeting</option>
                <option>New Collection</option>
              </select>
              <button className="btn-outline text-sm py-1.5 flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
                <Filter size={14} />
                <span>Metrics</span>
              </button>
            </div>
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
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
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
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorSpend)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  name="Conversions"
                  stroke="#0ea5e9" 
                  fillOpacity={1} 
                  fill="url(#colorConversions)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Hourly Performance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
      >
        {/* Cosmic accent */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/5 blur-xl"></div>
        
        <div className="flex justify-between items-center mb-2 relative z-10">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-purple-400" />
            <h3 className="font-semibold">Hourly Performance</h3>
          </div>
          <button 
            className="p-1 rounded-full bg-dark-100/50 hover:bg-white/10"
            onClick={() => setShowHourlyPerformance(!showHourlyPerformance)}
          >
            {showHourlyPerformance ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 relative z-10">Understand how your campaigns perform throughout the day to optimize ad scheduling</p>
        
        {showHourlyPerformance && (
          <div className="h-80 mt-4 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={hourlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="hour" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E2E', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Bar dataKey="clicks" name="Clicks" fill="#8b5cf6" />
                <Bar dataKey="conversions" name="Conversions" fill="#0ea5e9" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>

      {/* Geographic Performance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
      >
        {/* Cosmic accent */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
        
        <div className="flex justify-between items-center mb-2 relative z-10">
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-purple-400" />
            <h3 className="font-semibold">Geographic Performance</h3>
          </div>
          <div className="flex items-center gap-2">
            <select 
              className="bg-dark-100/70 border border-white/10 rounded-lg px-2 py-1 text-sm"
              value={geoMetric}
              onChange={(e) => setGeoMetric(e.target.value)}
            >
              <option value="conversions">Conversions</option>
              <option value="users">Users</option>
              <option value="spend">Spend</option>
              <option value="cpa">CPA</option>
            </select>
            <button 
              className="p-1 rounded-full bg-dark-100/50 hover:bg-white/10"
              onClick={() => setShowGeoPerformance(!showGeoPerformance)}
            >
              {showGeoPerformance ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 relative z-10">Analyze performance by geographic region to identify high-performing locations</p>
        
        {showGeoPerformance && (
          <div className="mt-4 relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Region</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Conversions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Spend</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">CPA</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">{geoMetric.charAt(0).toUpperCase() + geoMetric.slice(1)} Chart</th>
                  </tr>
                </thead>
                <tbody>
                  {geoData.map((region, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-purple-400" />
                          <span>{region.region}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{region.users.toLocaleString()}</td>
                      <td className="py-3 px-4">{region.conversions}</td>
                      <td className="py-3 px-4">${region.spend.toLocaleString()}</td>
                      <td className="py-3 px-4">${region.cpa.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <div className="w-24 h-4 bg-dark-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                            style={{ 
                              width: `${(region[geoMetric] / Math.max(...geoData.map(r => r[geoMetric]))) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Cosmic accent */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-semibold">Campaign Spend Distribution</h3>
            <select className="bg-dark-100/70 border border-white/10 rounded-lg px-2 py-1 text-sm">
              <option>By Spend</option>
              <option>By Conversions</option>
              <option>By ROAS</option>
            </select>
          </div>
          <div className="h-80 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={campaignPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {campaignPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          transition={{ duration: 0.3, delay: 0.5 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Cosmic accent */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-semibold">ROAS by Campaign</h3>
            <select className="bg-dark-100/70 border border-white/10 rounded-lg px-2 py-1 text-sm">
              <option>All Time</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-80 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={performanceData}
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
                  formatter={(value) => [`${value}x`, 'ROAS']}
                />
                <Bar dataKey="roas" name="ROAS" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Cosmic accent */}
          <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-blue-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-semibold">Device Breakdown</h3>
          </div>
          <div className="h-60 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E2E', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }} 
                  formatter={(value) => [`${value}%`, 'Traffic']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg col-span-1 lg:col-span-2 relative overflow-hidden"
        >
          {/* Cosmic accent */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-semibold">Top Performing Keywords</h3>
            <button 
              className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 text-sm py-1.5 flex items-center gap-2"
              onClick={generateNewInsights}
              disabled={isGeneratingInsights}
            >
              {isGeneratingInsights ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Generate Insights</span>
                </>
              )}
            </button>
          </div>
          <div className="overflow-x-auto relative z-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Keyword</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Conv.</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Cost/Conv.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 font-medium">buy premium shoes</td>
                  <td className="py-3 px-4">12,450</td>
                  <td className="py-3 px-4">845</td>
                  <td className="py-3 px-4">6.8%</td>
                  <td className="py-3 px-4">32</td>
                  <td className="py-3 px-4">$42.50</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 font-medium">running shoes sale</td>
                  <td className="py-3 px-4">8,320</td>
                  <td className="py-3 px-4">624</td>
                  <td className="py-3 px-4">7.5%</td>
                  <td className="py-3 px-4">28</td>
                  <td className="py-3 px-4">$38.75</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 font-medium">best athletic footwear</td>
                  <td className="py-3 px-4">6,780</td>
                  <td className="py-3 px-4">412</td>
                  <td className="py-3 px-4">6.1%</td>
                  <td className="py-3 px-4">18</td>
                  <td className="py-3 px-4">$52.30</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 font-medium">discount sports shoes</td>
                  <td className="py-3 px-4">5,240</td>
                  <td className="py-3 px-4">387</td>
                  <td className="py-3 px-4">7.4%</td>
                  <td className="py-3 px-4">15</td>
                  <td className="py-3 px-4">$48.15</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-primary-400 flex items-center gap-1 text-sm hover:underline">
              View detailed keyword analysis <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;