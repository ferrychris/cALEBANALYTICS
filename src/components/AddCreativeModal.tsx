import React, { useState } from 'react';
import { X, Upload, Image, Video, FileText } from 'lucide-react';
import { useCreatives } from '../context/CreativeContext';
import { analyzeCreative } from '../services/aiService';
import { toast } from 'sonner';

interface AddCreativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  campaign: string;
}

const AddCreativeModal: React.FC<AddCreativeModalProps> = ({ 
  isOpen, 
  onClose,
  platform,
  campaign
}) => {
  const [assetName, setAssetName] = useState('');
  const [assetType, setAssetType] = useState('image');
  const [assetUrl, setAssetUrl] = useState('');
  const [assetContent, setAssetContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { addCreativeAsset, analyzeAsset } = useCreatives();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assetName) {
      toast.error('Please enter a name for the creative asset');
      return;
    }
    
    if (assetType === 'image' || assetType === 'video') {
      if (!assetUrl) {
        toast.error('Please enter a URL for the creative asset');
        return;
      }
    } else if (assetType === 'copy') {
      if (!assetContent) {
        toast.error('Please enter content for the ad copy');
        return;
      }
    }
    
    try {
      setIsAnalyzing(true);
      
      // First, create the asset
      const assetData = {
        name: assetName,
        type: assetType,
        platform,
        campaign,
        ...(assetType === 'copy' ? { content: assetContent } : { url: assetUrl })
      };
      
      const { success, assetId, error } = await addCreativeAsset(assetData);
      
      if (!success || !assetId) {
        toast.error(`Failed to add creative asset: ${error?.message || 'Unknown error'}`);
        return;
      }
      
      toast.success('Creative asset added successfully');
      
      // Now analyze the asset
      const analysisResult = await analyzeCreative(assetData);
      
      const { success: analyzeSuccess, error: analyzeError } = await analyzeAsset(assetId, analysisResult);
      
      if (!analyzeSuccess) {
        toast.error(`Failed to analyze asset: ${analyzeError?.message || 'Unknown error'}`);
      } else {
        toast.success('Creative asset analyzed successfully');
      }
      
      // Close the modal
      onClose();
      
      // Reset form
      setAssetName('');
      setAssetType('image');
      setAssetUrl('');
      setAssetContent('');
    } catch (error: any) {
      toast.error(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Creative Asset</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Asset Name</label>
            <input 
              type="text" 
              className="input-field w-full" 
              placeholder="Enter asset name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Asset Type</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                className={`p-4 rounded-lg border ${
                  assetType === 'image' 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-white/10 hover:bg-white/5'
                } flex flex-col items-center gap-2`}
                onClick={() => setAssetType('image')}
              >
                <Image size={24} className={assetType === 'image' ? 'text-primary-400' : 'text-gray-400'} />
                <span className={assetType === 'image' ? 'text-primary-400' : 'text-gray-400'}>Image</span>
              </button>
              
              <button
                type="button"
                className={`p-4 rounded-lg border ${
                  assetType === 'video' 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-white/10 hover:bg-white/5'
                } flex flex-col items-center gap-2`}
                onClick={() => setAssetType('video')}
              >
                <Video size={24} className={assetType === 'video' ? 'text-primary-400' : 'text-gray-400'} />
                <span className={assetType === 'video' ? 'text-primary-400' : 'text-gray-400'}>Video</span>
              </button>
              
              <button
                type="button"
                className={`p-4 rounded-lg border ${
                  assetType === 'copy' 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-white/10 hover:bg-white/5'
                } flex flex-col items-center gap-2`}
                onClick={() => setAssetType('copy')}
              >
                <FileText size={24} className={assetType === 'copy' ? 'text-primary-400' : 'text-gray-400'} />
                <span className={assetType === 'copy' ? 'text-primary-400' : 'text-gray-400'}>Ad Copy</span>
              </button>
            </div>
          </div>
          
          {(assetType === 'image' || assetType === 'video') && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {assetType === 'image' ? 'Image URL' : 'Video Thumbnail URL'}
              </label>
              <input 
                type="url" 
                className="input-field w-full" 
                placeholder="Enter URL"
                value={assetUrl}
                onChange={(e) => setAssetUrl(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a valid URL for your {assetType}. For testing, you can use Unsplash images.
              </p>
            </div>
          )}
          
          {assetType === 'copy' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Ad Copy Content</label>
              <textarea 
                className="input-field w-full h-32 resize-none" 
                placeholder="Enter your ad copy text here..."
                value={assetContent}
                onChange={(e) => setAssetContent(e.target.value)}
                required
              ></textarea>
            </div>
          )}
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              disabled={isAnalyzing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Add & Analyze</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCreativeModal;