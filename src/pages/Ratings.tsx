import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Filter, 
  Search, 
  ArrowUpDown, 
  Image, 
  Video, 
  FileText, 
  Megaphone, 
  Facebook, 
  Youtube, 
  MessageCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download,
  Calendar,
  Sparkles,
  Loader,
  BrainCircuit,
  Lightbulb,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { analyzeCreative } from '../services/aiService';

// Rating data for creative assets
const creativeRatings = [
  {
    id: 1,
    name: 'Summer Sale Banner',
    type: 'image',
    platform: 'facebook',
    url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'Summer Sale Campaign',
    dateCreated: '2025-05-10',
    dateAnalyzed: '2025-05-12',
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
      "Product positioning is effective",
      "Consider adding more white space around the logo"
    ],
    improvements: [
      "Increase contrast between text and background for better readability",
      "Test a version with more emphasis on discount percentage",
      "Consider adding social proof element (e.g., customer review)"
    ],
    status: 'active'
  },
  {
    id: 2,
    name: 'Product Demo Video',
    type: 'video',
    platform: 'facebook',
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'New Collection Launch',
    dateCreated: '2025-05-08',
    dateAnalyzed: '2025-05-11',
    overallScore: 7.5,
    scores: {
      relevance: 7.8,
      engagement: 6.9,
      clarity: 8.2,
      brandConsistency: 7.2
    },
    feedback: [
      "Good product demonstration with clear features",
      "Pacing is appropriate for the platform",
      "Audio quality could be improved",
      "First 3 seconds could be more attention-grabbing"
    ],
    improvements: [
      "Add captions for viewers watching without sound",
      "Include stronger hook in the first 3 seconds",
      "Add clearer call-to-action at the end",
      "Consider adding background music to enhance emotional appeal"
    ],
    status: 'active'
  },
  {
    id: 3,
    name: 'Limited Time Offer Copy',
    type: 'copy',
    platform: 'google',
    content: "Summer's hottest deals are here! 40% off all swimwear collections. Limited time only. Free shipping on orders over $50. Shop now before they're gone!",
    campaign: 'Summer Sale Campaign',
    dateCreated: '2025-05-09',
    dateAnalyzed: '2025-05-12',
    overallScore: 8.2,
    scores: {
      relevance: 8.5,
      engagement: 8.0,
      clarity: 8.7,
      brandConsistency: 7.6
    },
    feedback: [
      "Strong sense of urgency with 'limited time' messaging",
      "Clear value proposition with discount percentage",
      "Good additional incentive with free shipping offer",
      "Call-to-action is clear and direct"
    ],
    improvements: [
      "Consider adding specific end date to increase urgency",
      "Test more specific product mentions (e.g., 'bestselling bikinis')",
      "Add emotional trigger words like 'perfect', 'stunning', etc."
    ],
    status: 'active'
  },
  {
    id: 4,
    name: 'AR Lens Promo',
    type: 'image',
    platform: 'snapchat',
    url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'AR Lens Campaign',
    dateCreated: '2025-05-07',
    dateAnalyzed: '2025-05-10',
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
      "Add text overlay explaining how to interact with the lens",
      "Consider showing before/after of the lens effect"
    ],
    status: 'needs_improvement'
  },
  {
    id: 5,
    name: 'TikTok Challenge Intro',
    type: 'video',
    platform: 'tiktok',
    url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    campaign: 'TikTok Trend Challenge',
    dateCreated: '2025-05-05',
    dateAnalyzed: '2025-05-09',
    overallScore: 9.1,
    scores: {
      relevance: 9.5,
      engagement: 9.3,
      clarity: 8.8,
      brandConsistency: 8.7
    },
    feedback: [
      "Excellent hook in the first second",
      "Challenge is clearly demonstrated and easy to replicate",
      "Music choice is trending and appropriate",
      "Brand integration is natural and not forced"
    ],
    improvements: [
      "Consider adding text overlay with challenge hashtag",
      "Include brief tutorial element for better participation",
      "Test version with influencer collaboration"
    ],
    status: 'excellent'
  },
  {
    id: 6,
    name: 'Retargeting Ad Copy',
    type: 'copy',
    platform: 'facebook',
    content: "Still thinking about that perfect summer look? Your cart is waiting! Complete your purchase now and get an extra 10% off with code SUMMER10.",
    campaign: 'Retargeting - Website Visitors',
    dateCreated: '2025-05-04',
    dateAnalyzed: '2025-05-08',
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
      "Good use of FOMO (fear of missing out)",
      "Direct call-to-action"
    ],
    improvements: [
      "Test version with specific product mention",
      "Add time limit to discount code for urgency",
      "Consider adding social proof element"
    ],
    status: 'active'
  }
];

// Initial insights data
const initialInsights = [
  {
    id: 1,
    title: "Visual Content Outperforms Text",
    description: "Video and image assets have an average score of 8.0, while copy assets average 7.2.",
    actionItem: "Allocate more resources to visual content creation, particularly video which has the highest engagement scores."
  },
  {
    id: 2,
    title: "Platform-Specific Performance Variations",
    description: "TikTok assets score 25% higher on average than other platforms, while Snapchat assets underperform.",
    actionItem: "Optimize creative strategy for each platform rather than using a one-size-fits-all approach."
  },
  {
    id: 3,
    title: "Call-to-Action Effectiveness",
    description: "Assets with clear, direct CTAs score 18% higher in clarity metrics than those with subtle or missing CTAs.",
    actionItem: "Implement a standardized CTA framework across all creative assets to ensure consistent performance."
  }
];

// Sample campaign data for asset creation
const campaignData = [
  { id: 1, name: 'Summer Sale Campaign' },
  { id: 2, name: 'Retargeting - Website Visitors' },
  { id: 3, name: 'New Collection Launch' },
  { id: 4, name: 'Brand Awareness' },
  { id: 5, name: 'TikTok Trend Challenge' },
  { id: 6, name: 'AR Lens Campaign' }
];

const Ratings = () => {
  const [filter, setFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAsset, setExpandedAsset] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [ratings, setRatings] = useState(creativeRatings);
  const [insights, setInsights] = useState(initialInsights);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'image',
    platform: 'facebook',
    campaign: '',
    url: '',
    content: ''
  });

  // Filter and sort the ratings
  const filteredRatings = ratings
    .filter(rating => {
      // Filter by status
      if (filter !== 'all' && rating.status !== filter) return false;
      
      // Filter by platform
      if (platformFilter !== 'all' && rating.platform !== platformFilter) return false;
      
      // Filter by type
      if (typeFilter !== 'all' && rating.type !== typeFilter) return false;
      
      // Filter by search query
      if (searchQuery && !rating.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.dateAnalyzed).getTime() - new Date(a.dateAnalyzed).getTime()
          : new Date(a.dateAnalyzed).getTime() - new Date(b.dateAnalyzed).getTime();
      } else if (sortBy === 'score') {
        return sortOrder === 'desc' 
          ? b.overallScore - a.overallScore
          : a.overallScore - b.overallScore;
      } else {
        return sortOrder === 'desc' 
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      }
    });

  const toggleExpand = (id: number) => {
    setExpandedAsset(expandedAsset === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500/20 text-green-500';
      case 'active':
        return 'bg-blue-500/20 text-blue-500';
      case 'needs_improvement':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return <Megaphone size={18} className="text-[#4285F4]" />;
      case 'facebook':
        return <Facebook size={18} className="text-[#1877F2]" />;
      case 'tiktok':
        return <Youtube size={18} className="text-[#000000]" />;
      case 'snapchat':
        return <MessageCircle size={18} className="text-[#FFFC00]" />;
      default:
        return <Star size={18} />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image size={18} />;
      case 'video':
        return <Video size={18} />;
      case 'copy':
        return <FileText size={18} />;
      default:
        return <Star size={18} />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-500';
    if (score >= 7.5) return 'text-blue-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderScoreBar = (score: number) => {
    let color = '';
    if (score >= 9) color = 'bg-green-500';
    else if (score >= 7.5) color = 'bg-blue-500';
    else if (score >= 6) color = 'bg-yellow-500';
    else color = 'bg-red-500';

    return (
      <div className="w-full bg-dark-100 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${score * 10}%` }}></div>
      </div>
    );
  };

  const generateNewInsights = async () => {
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call the OpenAI API
      // For now, we'll simulate a delay and return the initial insights with slight modifications
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newInsights = initialInsights.map(insight => ({
        ...insight,
        description: insight.description + " Updated analysis confirms this trend.",
      }));
      
      setInsights(newInsights);
      toast.success('Generated new creative insights');
    } catch (error) {
      console.error("Error generating insights:", error);
      toast.error("Failed to generate insights. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAsset.name || !newAsset.campaign) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if ((newAsset.type === 'image' || newAsset.type === 'video') && !newAsset.url) {
      toast.error('Please provide a URL for the creative asset');
      return;
    }
    
    if (newAsset.type === 'copy' && !newAsset.content) {
      toast.error('Please provide content for the ad copy');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Create new asset
      const newCreativeAsset = {
        id: ratings.length + 1,
        ...newAsset,
        dateCreated: new Date().toISOString(),
        dateAnalyzed: new Date().toISOString(),
        status: 'pending',
        overallScore: 0,
        scores: {
          relevance: 0,
          engagement: 0,
          clarity: 0,
          brandConsistency: 0
        },
        feedback: [],
        improvements: []
      };
      
      // Analyze the asset using AI
      const analysisResult = await analyzeCreative(newCreativeAsset);
      
      // Update the asset with analysis results
      const analyzedAsset = {
        ...newCreativeAsset,
        ...analysisResult
      };
      
      // Add to ratings
      setRatings([analyzedAsset, ...ratings]);
      
      // Reset form and close modal
      setNewAsset({
        name: '',
        type: 'image',
        platform: 'facebook',
        campaign: '',
        url: '',
        content: ''
      });
      setShowAddAssetModal(false);
      
      toast.success('Creative asset analyzed successfully');
    } catch (error) {
      console.error("Error analyzing asset:", error);
      toast.error("Failed to analyze asset. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Creative Ratings</h1>
          <p className="text-gray-400 mt-1">AI-powered analysis and optimization of your creative assets</p>
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
            onClick={() => setShowAddAssetModal(true)}
          >
            <Star size={16} />
            <span>Analyze New Asset</span>
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
              <h3 className="font-semibold">Creative Performance Insights</h3>
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
                  <Sparkles size={14} />
                  <span>Generate Insights</span>
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Subtle cosmic accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-purple-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-gray-400 text-sm">Average Score</p>
              <h3 className="text-2xl font-bold mt-1">8.2</h3>
              <div className="flex items-center mt-2 text-green-500">
                <Star size={16} />
                <span className="text-sm ml-1">+0.5 from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <Star size={20} className="text-purple-400" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Subtle cosmic accent */}
          <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-blue-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-gray-400 text-sm">Top Platform</p>
              <h3 className="text-2xl font-bold mt-1">TikTok</h3>
              <div className="flex items-center mt-2 text-green-500">
                <Star size={16} />
                <span className="text-sm ml-1">9.1 avg score</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <Youtube size={20} className="text-purple-400" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Subtle cosmic accent */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-purple-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-gray-400 text-sm">Top Asset Type</p>
              <h3 className="text-2xl font-bold mt-1">Copy</h3>
              <div className="flex items-center mt-2 text-green-500">
                <Star size={16} />
                <span className="text-sm ml-1">8.6 avg score</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <FileText size={20} className="text-purple-400" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
        >
          {/* Subtle cosmic accent */}
          <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-blue-500/5 blur-xl"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-gray-400 text-sm">Assets Analyzed</p>
              <h3 className="text-2xl font-bold mt-1">{ratings.length}</h3>
              <div className="flex items-center mt-2 text-green-500">
                <Star size={16} />
                <span className="text-sm ml-1">+2 this week</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <AlertCircle size={20} className="text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 pr-4 py-2 bg-dark-100/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select 
              className="bg-dark-100/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="google">Google Ads</option>
              <option value="facebook">Facebook Ads</option>
              <option value="tiktok">TikTok Ads</option>
              <option value="snapchat">Snapchat Ads</option>
            </select>
            
            <select 
              className="bg-dark-100/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="copy">Ad Copy</option>
            </select>
            
            <select 
              className="bg-dark-100/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="excellent">Excellent</option>
              <option value="active">Active</option>
              <option value="needs_improvement">Needs Improvement</option>
            </select>
            
            <button 
              className="btn-outline text-sm py-1.5 flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
              onClick={() => {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              <ArrowUpDown size={16} />
              <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Creative Assets List */}
      <div className="space-y-4">
        {filteredRatings.length === 0 ? (
          <div className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg text-center">
            <p className="text-gray-400">No creative assets match your filters.</p>
          </div>
        ) : (
          filteredRatings.map((asset) => (
            <motion.div 
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-md bg-dark-200/40 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
            >
              {/* Subtle cosmic accent */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/5 blur-xl"></div>
              
              <div 
                className="p-6 cursor-pointer hover:bg-white/5 transition-all relative z-10"
                onClick={() => toggleExpand(asset.id)}
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex items-start gap-4">
                    {asset.type === 'image' || asset.type === 'video' ? (
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-100 flex-shrink-0">
                        <img 
                          src={asset.url} 
                          alt={asset.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                        <FileText size={24} className="text-purple-400" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{asset.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(asset.status)}`}>
                          {asset.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          {getPlatformIcon(asset.platform)}
                          <span className="capitalize">{asset.platform}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(asset.type)}
                          <span className="capitalize">{asset.type}</span>
                        </div>
                        <span>•</span>
                        <span>Campaign: {asset.campaign}</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${getScoreColor(asset.overallScore)}`}>
                            {asset.overallScore.toFixed(1)}
                          </span>
                          <div className="w-32 bg-dark-100 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                asset.overallScore >= 9 ? 'bg-green-500' : 
                                asset.overallScore >= 7.5 ? 'bg-blue-500' : 
                                asset.overallScore >= 6 ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`} 
                              style={{ width: `${asset.overallScore * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Analyzed: {new Date(asset.dateAnalyzed).toLocaleDateString()}</span>
                    <ArrowUpDown 
                      size={16} 
                      className={`transition-transform ${expandedAsset === asset.id ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </div>
              </div>
              
              {expandedAsset === asset.id && (
                <div className="px-6 pb-6 pt-0 relative z-10">
                  <div className="border-t border-white/10 pt-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        {asset.type === 'copy' ? (
                          <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Ad Copy</h4>
                            <p className="text-sm">{asset.content}</p>
                          </div>
                        ) : (
                          <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Creative Preview</h4>
                            <div className="rounded-lg overflow-hidden bg-dark-100 mt-2">
                              <img 
                                src={asset.url} 
                                alt={asset.name} 
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl mt-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">AI Feedback</h4>
                          <ul className="space-y-2">
                            {asset.feedback.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-400 mb-4">Score Breakdown</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Relevance</span>
                                <span className={`text-sm font-medium ${getScoreColor(asset.scores.relevance)}`}>
                                  {asset.scores.relevance.toFixed(1)}
                                </span>
                              </div>
                              {renderScoreBar(asset.scores.relevance)}
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Engagement</span>
                                <span className={`text-sm font-medium ${getScoreColor(asset.scores.engagement)}`}>
                                  {asset.scores.engagement.toFixed(1)}
                                </span>
                              </div>
                              {renderScoreBar(asset.scores.engagement)}
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Clarity</span>
                                <span className={`text-sm font-medium ${getScoreColor(asset.scores.clarity)}`}>
                                  {asset.scores.clarity.toFixed(1)}
                                </span>
                              </div>
                              {renderScoreBar(asset.scores.clarity)}
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Brand Consistency</span>
                                <span className={`text-sm font-medium ${getScoreColor(asset.scores.brandConsistency)}`}>
                                  {asset.scores.brandConsistency.toFixed(1)}
                                </span>
                              </div>
                              {renderScoreBar(asset.scores.brandConsistency)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-dark-100/50 backdrop-blur-sm p-4 border border-white/5 rounded-xl mt-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Suggested Improvements</h4>
                          <ul className="space-y-2">
                            {asset.improvements.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <AlertCircle size={16} className="text-yellow-500 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-end mt-4 gap-2">
                          <button className="btn-outline text-sm py-1.5 flex items-center gap-1 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
                            <Download size={14} />
                            <span>Export Analysis</span>
                          </button>
                          <button className="btn-primary text-sm py-1.5 flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0">
                            <Sparkles size={14} />
                            <span>Re-analyze</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Add Asset Modal */}
      {showAddAssetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-200/90 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl relative"
          >
            {/* Cosmic accents */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"></div>
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
              <h2 className="text-xl font-semibold">Analyze New Creative Asset</h2>
              <button 
                onClick={() => setShowAddAssetModal(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddAsset} className="p-6 space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Asset Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  placeholder="Enter asset name"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Asset Type</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    className={`p-4 rounded-lg border ${
                      newAsset.type === 'image' 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-white/10 hover:bg-white/5'
                    } flex flex-col items-center gap-2`}
                    onClick={() => setNewAsset({...newAsset, type: 'image'})}
                  >
                    <Image size={24} className={newAsset.type === 'image' ? 'text-purple-400' : 'text-gray-400'} />
                    <span className={newAsset.type === 'image' ? 'text-purple-400' : 'text-gray-400'}>Image</span>
                  </button>
                  
                  <button
                    type="button"
                    className={`p-4 rounded-lg border ${
                      newAsset.type === 'video' 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-white/10 hover:bg-white/5'
                    } flex flex-col items-center gap-2`}
                    onClick={() => setNewAsset({...newAsset, type: 'video'})}
                  >
                    <Video size={24} className={newAsset.type === 'video' ? 'text-purple-400' : 'text-gray-400'} />
                    <span className={newAsset.type === 'video' ? 'text-purple-400' : 'text-gray-400'}>Video</span>
                  </button>
                  
                  <button
                    type="button"
                    className={`p-4 rounded-lg border ${
                      newAsset.type === 'copy' 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-white/10 hover:bg-white/5'
                    } flex flex-col items-center gap-2`}
                    onClick={() => setNewAsset({...newAsset, type: 'copy'})}
                  >
                    <FileText size={24} className={newAsset.type ===  'copy' ? 'text-purple-400' : 'text-gray-400'} />
                    <span className={newAsset.type === 'copy' ? 'text-purple-400' : 'text-gray-400'}>Ad Copy</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Platform</label>
                <select 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={newAsset.platform}
                  onChange={(e) => setNewAsset({...newAsset, platform: e.target.value})}
                >
                  <option value="facebook">Facebook Ads</option>
                  <option value="google">Google Ads</option>
                  <option value="tiktok">TikTok Ads</option>
                  <option value="snapchat">Snapchat Ads</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Campaign</label>
                <select 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={newAsset.campaign}
                  onChange={(e) => setNewAsset({...newAsset, campaign: e.target.value})}
                  required
                >
                  <option value="">Select a campaign</option>
                  {campaignData.map(campaign => (
                    <option key={campaign.id} value={campaign.name}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {(newAsset.type === 'image' || newAsset.type === 'video') && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    {newAsset.type === 'image' ? 'Image URL' : 'Video Thumbnail URL'}
                  </label>
                  <input 
                    type="url" 
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                    placeholder="Enter URL"
                    value={newAsset.url}
                    onChange={(e) => setNewAsset({...newAsset, url: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a valid URL for your {newAsset.type}. For testing, you can use Unsplash images.
                  </p>
                </div>
              )}
              
              {newAsset.type === 'copy' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ad Copy Content</label>
                  <textarea 
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 h-32 resize-none" 
                    placeholder="Enter your ad copy text here..."
                    value={newAsset.content}
                    onChange={(e) => setNewAsset({...newAsset, content: e.target.value})}
                  ></textarea>
                </div>
              )}
              
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddAssetModal(false)}
                  className="btn-outline bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Analyze Asset</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
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
          repeatDelay: 12,
          ease: "easeOut"
        }}
        className="fixed h-0.5 w-20 bg-white blur-sm z-0 pointer-events-none"
        style={{ 
          top: '15%',
          left: '10%',
          transform: 'rotate(-15deg)',
          boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.7)'
        }}
      />
    </div>
  );
};

export default Ratings;