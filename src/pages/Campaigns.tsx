import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Pause, 
  Play,
  ArrowUpDown,
  DollarSign,
  ShoppingCart,
  BarChart3,
  TrendingUp,
  AlertCircle,
  XCircle
} from 'lucide-react';

const campaignData = [
  { 
    id: 1,
    name: 'Summer Sale Campaign',
    status: 'active',
    type: 'Search',
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
  },
  {
    id: 3,
    campaign: 'Competitor Keywords',
    message: 'Keyword "premium shoes" has low quality score. Consider optimizing ad relevance.',
    type: 'info',
    metric: 'keywords'
  }
];

const Campaigns = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'Search',
    budget: '',
    platform: 'google',
    objective: 'sales',
    targeting: {
      locations: [],
      interests: [],
      demographics: []
    }
  });

  const toggleCampaignSelection = (id: number) => {
    if (selectedCampaigns.includes(id)) {
      setSelectedCampaigns(selectedCampaigns.filter(campaignId => campaignId !== id));
    } else {
      setSelectedCampaigns([...selectedCampaigns, id]);
    }
  };

  const toggleAllCampaigns = () => {
    if (selectedCampaigns.length === campaignData.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(campaignData.map(campaign => campaign.id));
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle campaign creation logic here
    setShowNewCampaignModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="text-gray-400 mt-1">Manage and optimize your Google Ads campaigns</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowNewCampaignModal(true)}
        >
          <Plus size={18} />
          <span>New Campaign</span>
        </button>
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
          AI Insights
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
                   <BarChart3 size={16} />}
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

      {/* Campaigns Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
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
            
            {selectedCampaigns.length > 0 && (
              <div className="flex items-center gap-2">
                <button className="btn-outline text-sm py-1.5">Pause Selected</button>
                <button className="btn-outline text-sm py-1.5 text-red-500 border-red-500/20 hover:bg-red-500/10">
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-left">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-white/20 bg-dark-100 text-primary-500 focus:ring-primary-500"
                      checked={selectedCampaigns.length === campaignData.length}
                      onChange={toggleAllCampaigns}
                    />
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                    Campaign <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Budget/day</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Spend</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">ROAS</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Performance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign) => (
                <tr key={campaign.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-white/20 bg-dark-100 text-primary-500 focus:ring-primary-500"
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => toggleCampaignSelection(campaign.id)}
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{campaign.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{campaign.type}</td>
                  <td className="py-3 px-4">${campaign.budget}</td>
                  <td className="py-3 px-4">${campaign.spend.toLocaleString()}</td>
                  <td className="py-3 px-4">{campaign.conversions}</td>
                  <td className="py-3 px-4">{campaign.roas}x</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.performance === 'high' ? 'bg-green-500/20 text-green-500' : 
                      campaign.performance === 'medium' ? 'bg-blue-500/20 text-blue-500' : 
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {campaign.performance}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <button 
                        onClick={() => setDropdownOpen(dropdownOpen === campaign.id ? null : campaign.id)}
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {dropdownOpen === campaign.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-dark-100 border border-white/10 rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 w-full text-left">
                              <Edit size={16} />
                              Edit Campaign
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 w-full text-left">
                              {campaign.status === 'active' ? (
                                <>
                                  <Pause size={16} />
                                  Pause Campaign
                                </>
                              ) : (
                                <>
                                  <Play size={16} />
                                  Activate Campaign
                                </>
                              )}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-white/10 w-full text-left">
                              <Trash2 size={16} />
                              Delete Campaign
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-400">Showing 5 of 12 campaigns</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg bg-dark-100 text-gray-400 hover:bg-white/10">Previous</button>
            <button className="px-3 py-1 rounded-lg bg-primary-600 text-white">1</button>
            <button className="px-3 py-1 rounded-lg bg-dark-100 text-gray-400 hover:bg-white/10">2</button>
            <button className="px-3 py-1 rounded-lg bg-dark-100 text-gray-400 hover:bg-white/10">3</button>
            <button className="px-3 py-1 rounded-lg bg-dark-100 text-gray-400 hover:bg-white/10">Next</button>
          </div>
        </div>
      </motion.div>

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-200/90 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create New Campaign</h2>
              <button 
                onClick={() => setShowNewCampaignModal(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Campaign Name</label>
                <input 
                  type="text" 
                  className="input-field w-full" 
                  placeholder="Enter campaign name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Campaign Type</label>
                <select 
                  className="input-field w-full"
                  value={newCampaign.type}
                  onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                >
                  <option value="Search">Search</option>
                  <option value="Display">Display</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Video">Video</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Daily Budget</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                  <input 
                    type="number" 
                    className="input-field w-full pl-8" 
                    placeholder="Enter daily budget"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Campaign Objective</label>
                <select 
                  className="input-field w-full"
                  value={newCampaign.objective}
                  onChange={(e) => setNewCampaign({...newCampaign, objective: e.target.value})}
                >
                  <option value="sales">Sales</option>
                  <option value="leads">Lead Generation</option>
                  <option value="traffic">Website Traffic</option>
                  <option value="awareness">Brand Awareness</option>
                </select>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;