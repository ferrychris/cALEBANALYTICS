import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Target, 
  CheckCircle2, 
  XCircle,
  Filter,
  ArrowUpDown,
  Sparkles,
  Clock,
  AlertCircle,
  Calendar,
  RefreshCw,
  Loader,
  Zap,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';
import { generateCampaignRecommendations, generateAIInsights } from '../services/aiService';

// Sample campaign data
const campaignData = [
  { 
    id: 1,
    name: 'Summer Sale Campaign',
    status: 'active',
    type: 'Search',
    platform: 'google',
    budget: 250,
    spend: 4872,
    impressions: 124500,
    clicks: 3245,
    ctr: 2.6,
    conversions: 87,
    cpa: 56,
    roas: 4.2,
    lastEdited: '2 days ago',
    performance: 'high'
  },
  { 
    id: 2,
    name: 'Retargeting - Website Visitors',
    status: 'active',
    type: 'Display',
    platform: 'facebook',
    budget: 150,
    spend: 2105,
    impressions: 98750,
    clicks: 1876,
    ctr: 1.9,
    conversions: 42,
    cpa: 50.12,
    roas: 5.1,
    lastEdited: '5 days ago',
    performance: 'high'
  },
  { 
    id: 3,
    name: 'New Collection Launch',
    status: 'active',
    type: 'Search',
    platform: 'google',
    budget: 200,
    spend: 3845,
    impressions: 87600,
    clicks: 2345,
    ctr: 2.7,
    conversions: 53,
    cpa: 72.55,
    roas: 3.8,
    lastEdited: '1 day ago',
    performance: 'medium'
  },
  { 
    id: 4,
    name: 'Brand Awareness',
    status: 'paused',
    type: 'Display',
    platform: 'facebook',
    budget: 180,
    spend: 4521,
    impressions: 215000,
    clicks: 1850,
    ctr: 0.86,
    conversions: 22,
    cpa: 205.5,
    roas: 2.1,
    lastEdited: '2 weeks ago',
    performance: 'low'
  },
  { 
    id: 5,
    name: 'Competitor Keywords',
    status: 'active',
    type: 'Search',
    platform: 'google',
    budget: 120,
    spend: 1876,
    impressions: 45600,
    clicks: 1245,
    ctr: 2.73,
    conversions: 18,
    cpa: 104.22,
    roas: 3.2,
    lastEdited: '3 days ago',
    performance: 'medium'
  },
];

// Initial recommendations data
const initialRecommendations = [
  {
    id: 1,
    title: 'Increase budget for "Summer Sale" campaign',
    description: 'This campaign is performing well with ROAS of 4.2. Consider increasing budget by 20% to scale results.',
    impact: 'high',
    type: 'budget',
    campaign: 'Summer Sale Campaign',
    metric: 'ROAS',
    currentValue: '4.2x',
    suggestedAction: 'Increase budget from $250/day to $300/day',
    estimatedImprovement: '+15% conversions',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Adjust bidding strategy for "Brand Awareness"',
    description: 'Switch from manual CPC to target ROAS bidding to improve performance.',
    impact: 'medium',
    type: 'bidding',
    campaign: 'Brand Awareness',
    metric: 'CPA',
    currentValue: '$205.50',
    suggestedAction: 'Change bidding strategy to Target ROAS (300%)',
    estimatedImprovement: '-25% CPA',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Optimize ad schedule for "Retargeting"',
    description: 'Performance data shows higher conversion rates between 6-9pm. Adjust ad schedule to focus on these hours.',
    impact: 'medium',
    type: 'optimization',
    campaign: 'Retargeting - Website Visitors',
    metric: 'Conversion Rate',
    currentValue: '2.24%',
    suggestedAction: 'Increase bid adjustments by 20% during 6-9pm',
    estimatedImprovement: '+18% conversion rate',
    status: 'pending'
  },
  {
    id: 4,
    title: 'Pause underperforming keywords in "Competitor Keywords"',
    description: 'Several keywords have high cost but low conversion rates. Consider pausing or optimizing them.',
    impact: 'high',
    type: 'keywords',
    campaign: 'Competitor Keywords',
    metric: 'Cost per Conversion',
    currentValue: '$104.22',
    suggestedAction: 'Pause 5 keywords with CPC > $2 and no conversions',
    estimatedImprovement: '-15% CPA',
    status: 'implemented'
  },
  {
    id: 5,
    title: 'Create new ad variations for "New Collection Launch"',
    description: 'Current ads have below-average CTR. Testing new variations could improve performance.',
    impact: 'medium',
    type: 'creative',
    campaign: 'New Collection Launch',
    metric: 'CTR',
    currentValue: '2.7%',
    suggestedAction: 'Create 3 new ad variations with different headlines',
    estimatedImprovement: '+20% CTR',
    status: 'rejected'
  },
];

// Initial insights data
const initialInsights = [
  {
    id: 1,
    title: "Performance Disparity Between Campaigns",
    description: "There's a significant performance gap between your best campaign (Retargeting - Website Visitors with ROAS 5.1x) and worst campaign (Brand Awareness with ROAS 2.1x).",
    actionItem: "Analyze the targeting and creative strategies of your top-performing campaign and apply those learnings to underperforming campaigns."
  },
  {
    id: 2,
    title: "Budget Allocation Opportunity",
    description: "Your average ROAS across all campaigns is 3.7x, but budget allocation doesn't align with performance metrics.",
    actionItem: "Redistribute at least 30% of budget from campaigns with below-average ROAS to those with above-average ROAS."
  },
  {
    id: 3,
    title: "Creative Refresh Needed",
    description: "The average CTR of 2.2% indicates potential creative fatigue across multiple campaigns.",
    actionItem: "Implement a systematic creative refresh schedule, prioritizing campaigns that have been running the longest without creative updates."
  }
];

const Recommendations = () => {
  const [filter, setFilter] = useState('all');
  const [expandedRec, setExpandedRec] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [insights, setInsights] = useState(initialInsights);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [showInsights, setShowInsights] = useState(true);

  const filteredRecommendations = filter === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.status === filter);

  const toggleExpand = (id: number) => {
    setExpandedRec(expandedRec === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented':
        return 'bg-green-500/20 text-green-500';
      case 'rejected':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-yellow-500/20 text-yellow-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-500';
      case 'medium':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-500';
      default:
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'budget':
        return <DollarSign size={18} />;
      case 'bidding':
        return <TrendingUp size={18} />;
      case 'keywords':
        return <Target size={18} />;
      case 'creative':
        return <BarChart3 size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, status: newStatus } : rec
    ));
    
    toast.success(`Recommendation ${newStatus === 'implemented' ? 'implemented' : 'rejected'} successfully`);
  };

  const generateNewRecommendations = async () => {
    if (!selectedCampaign && selectedCampaign !== 0) {
      toast.error("Please select a campaign first");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const campaign = campaignData.find(c => c.id === selectedCampaign);
      if (!campaign) {
        throw new Error("Campaign not found");
      }
      
      // Generate recommendations using OpenAI
      const newRecommendations = await generateCampaignRecommendations(campaign);
      
      // Add necessary fields and add to existing recommendations
      const formattedRecommendations = newRecommendations.map((rec, index) => ({
        id: recommendations.length + index + 1,
        ...rec,
        campaign: campaign.name,
        metric: rec.type === 'budget' ? 'ROAS' : rec.type === 'bidding' ? 'CPA' : 'CTR',
        currentValue: rec.type === 'budget' ? `${campaign.roas}x` : rec.type === 'bidding' ? `$${campaign.cpa}` : `${campaign.ctr}%`,
        suggestedAction: rec.description.split('. ')[1] || rec.description,
        estimatedImprovement: rec.impact === 'high' ? '+20% performance' : rec.impact === 'medium' ? '+15% performance' : '+10% performance',
        status: 'pending'
      }));
      
      setRecommendations([...formattedRecommendations, ...recommendations]);
      toast.success(`Generated ${formattedRecommendations.length} new recommendations for ${campaign.name}`);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast.error("Failed to generate recommendations. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateNewInsights = async () => {
    setIsGenerating(true);
    
    try {
      // Generate insights using OpenAI
      const newInsights = await generateAIInsights(campaignData);
      
      // Add necessary fields
      const formattedInsights = newInsights.map((insight, index) => ({
        id: insights.length + index + 1,
        ...insight
      }));
      
      setInsights(formattedInsights);
      toast.success(`Generated ${formattedInsights.length} new strategic insights`);
    } catch (error) {
      console.error("Error generating insights:", error);
      toast.error("Failed to generate insights. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">AI Recommendations</h1>
          <p className="text-gray-400 mt-1">Smart suggestions to optimize your campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="btn-outline flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
            onClick={() => setShowInsights(!showInsights)}
          >
            <BrainCircuit size={16} />
            <span>{showInsights ? 'Hide Insights' : 'Show Insights'}</span>
          </button>
          <button 
            className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
            onClick={generateNewInsights}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader size={16} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate Insights</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Strategic Insights */}
      {showInsights && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Cosmic accent */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-50"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <BrainCircuit className="text-purple-400" size={20} />
              <h3 className="font-semibold">Strategic Insights</h3>
            </div>
            <button 
              className="btn-outline text-sm py-1.5 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10 flex items-center gap-2"
              onClick={generateNewInsights}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={14} />
                  <span>Refresh</span>
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-4 relative z-10">
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl hover:bg-dark-100/80 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400">
                    <Lightbulb size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{insight.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="p-1 rounded-full bg-purple-500/20 text-purple-400">
                        <Zap size={14} />
                      </div>
                      <p className="text-sm font-medium text-purple-400">Action Item: {insight.actionItem}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Campaign Selector and Generate Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-auto">
          <select 
            className="bg-dark-100/70 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full md:w-64"
            value={selectedCampaign || ''}
            onChange={(e) => setSelectedCampaign(Number(e.target.value))}
          >
            <option value="">Select a campaign for recommendations</option>
            {campaignData.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
        <button 
          className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2 w-full md:w-auto"
          onClick={generateNewRecommendations}
          disabled={isGenerating || !selectedCampaign}
        >
          {isGenerating ? (
            <>
              <Loader size={16} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Recommendations</span>
            </>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'all' ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : 'bg-dark-100/70 text-gray-400 hover:bg-white/10'
          }`}
        >
          All Recommendations
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'pending' ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : 'bg-dark-100/70 text-gray-400 hover:bg-white/10'
          }`}
        >
          Pending
        </button>
        <button 
          onClick={() => setFilter('implemented')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'implemented' ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : 'bg-dark-100/70 text-gray-400 hover:bg-white/10'
          }`}
        >
          Implemented
        </button>
        <button 
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'rejected' ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white' : 'bg-dark-100/70 text-gray-400 hover:bg-white/10'
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.length === 0 ? (
          <div className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg text-center">
            <p className="text-gray-400">No recommendations found. Try changing the filter or generating new recommendations.</p>
          </div>
        ) : (
          filteredRecommendations.map((rec) => (
            <motion.div 
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-md bg-dark-200/40 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
            >
              {/* Subtle cosmic accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
              
              <div 
                className="p-6 cursor-pointer hover:bg-white/5 transition-all relative z-10"
                onClick={() => toggleExpand(rec.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getImpactColor(rec.impact)}`}>
                      {getTypeIcon(rec.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{rec.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(rec.status)}`}>
                          {rec.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getImpactColor(rec.impact)}`}>
                          {rec.impact} impact
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{rec.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>Generated 2 days ago</span>
                        </div>
                        <div>Campaign: {rec.campaign}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ArrowUpDown 
                      size={16} 
                      className={`transition-transform ${expandedRec === rec.id ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </div>
              </div>
              
              {expandedRec === rec.id && (
                <div className="px-6 pb-6 pt-0 relative z-10">
                  <div className="border-t border-white/10 pt-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Current Metrics</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">{rec.metric}</p>
                            <p className="text-xl font-semibold mt-1">{rec.currentValue}</p>
                          </div>
                          <div className={`p-2 rounded-full ${
                            rec.impact === 'high' ? 'bg-green-500/20 text-green-500' : 
                            rec.impact === 'medium' ? 'bg-blue-500/20 text-blue-500' : 
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {rec.type === 'budget' ? <DollarSign size={18} /> : 
                             rec.type === 'bidding' ? <TrendingUp size={18} /> : 
                             <BarChart3 size={18} />}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Suggested Action</h4>
                        <p className="text-sm">{rec.suggestedAction}</p>
                        <div className="mt-2 flex items-center gap-1 text-green-500">
                          <TrendingUp size={14} />
                          <span className="text-sm font-medium">{rec.estimatedImprovement}</span>
                        </div>
                      </div>
                      
                      <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Implementation</h4>
                        {rec.status === 'pending' ? (
                          <div className="flex items-center gap-3 mt-2">
                            <button 
                              className="btn-primary bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 border-0 text-sm py-1.5 flex items-center gap-1"
                              onClick={() => handleStatusChange(rec.id, 'implemented')}
                            >
                              <CheckCircle2 size={14} />
                              Implement
                            </button>
                            <button 
                              className="btn-outline text-sm py-1.5 flex items-center gap-1 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                              onClick={() => handleStatusChange(rec.id, 'rejected')}
                            >
                              <XCircle size={14} />
                              Reject
                            </button>
                          </div>
                        ) : rec.status === 'implemented' ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle2 size={16} />
                            <span>Implemented on May 15, 2025</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-500">
                            <XCircle size={16} />
                            <span>Rejected on May 14, 2025</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {rec.status === 'implemented' && (
                      <div className="mt-6 bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Results After Implementation</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Previous {rec.metric}</p>
                            <p className="text-lg font-medium">{rec.currentValue}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Current {rec.metric}</p>
                            <p className="text-lg font-medium text-green-500">
                              {rec.metric === 'ROAS' ? '4.8x' : 
                               rec.metric === 'CPA' ? '$88.50' : 
                               rec.metric === 'Conversion Rate' ? '2.65%' : 
                               rec.metric === 'Cost per Conversion' ? '$89.15' : 
                               '3.2%'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Improvement</p>
                            <p className="text-lg font-medium text-green-500">+14.3%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recommendations;