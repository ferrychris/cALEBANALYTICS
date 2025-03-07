import React from 'react';
import { 
  Star, 
  Image, 
  Video, 
  FileText, 
  Megaphone, 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ArrowUpDown
} from 'lucide-react';

interface CreativeAsset {
  id: number;
  name: string;
  type: 'image' | 'video' | 'copy';
  platform: string;
  url?: string;
  content?: string;
  campaign: string;
  dateCreated?: string;
  dateAnalyzed?: string;
  overallScore: number;
  scores: {
    relevance: number;
    engagement: number;
    clarity: number;
    brandConsistency: number;
  };
  feedback: string[];
  improvements: string[];
  status: string;
}

interface CreativeRatingCardProps {
  asset: CreativeAsset;
  expanded: boolean;
  onToggleExpand: () => void;
}

const CreativeRatingCard: React.FC<CreativeRatingCardProps> = ({ asset, expanded, onToggleExpand }) => {
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
      case 'instagram':
        return <Instagram size={18} className="text-[#E1306C]" />;
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

  return (
    <div className="glass-card overflow-hidden backdrop-blur-md bg-dark-200/40 border border-white/10 rounded-xl shadow-lg">
      <div 
        className="p-4 cursor-pointer hover:bg-white/5 transition-all"
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400">
              {asset.type === 'image' ? <Image size={18} /> : 
              asset.type === 'video' ? <Video size={18} /> : 
              <FileText size={18} />}
            </div>
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
                <span>Campaign: {asset.campaign}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-lg font-bold ${getScoreColor(asset.overallScore)}`}>
              {asset.overallScore.toFixed(1)}
            </div>
            <ArrowUpDown 
              size={16} 
              className={`transition-transform ${expanded ? 'rotate-180' : ''}`} 
            />
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 border-t border-white/10 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              {asset.type === 'copy' ? (
                <div className="glass-panel p-4 bg-dark-100/50 border border-white/5 rounded-xl">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Ad Copy</h4>
                  <p className="text-sm">{asset.content}</p>
                </div>
              ) : (
                <div className="glass-panel p-4 bg-dark-100/50 border border-white/5 rounded-xl">
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
            </div>
            
            <div>
              <div className="glass-panel p-4 bg-dark-100/50 border border-white/5 rounded-xl">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Score Breakdown</h4>
                <div className="space-y-3 mt-3">
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
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="glass-panel p-4 bg-dark-100/50 border border-white/5 rounded-xl">
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
            
            <div className="glass-panel p-4 bg-dark-100/50 border border-white/5 rounded-xl">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativeRatingCard;