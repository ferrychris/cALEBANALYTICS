import React, { useState } from 'react';
import { X, Megaphone, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { usePlatforms } from '../context/PlatformContext';
import { toast } from 'sonner';

interface ConnectPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
}

const ConnectPlatformModal: React.FC<ConnectPlatformModalProps> = ({ 
  isOpen, 
  onClose,
  platform
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { connectNewPlatform } = usePlatforms();

  if (!isOpen) return null;

  const getPlatformName = () => {
    switch (platform) {
      case 'google':
        return 'Google Ads';
      case 'facebook':
        return 'Facebook Ads';
      case 'instagram':
        return 'Instagram Ads';
      case 'tiktok':
        return 'TikTok Ads';
      case 'snapchat':
        return 'Snapchat Ads';
      default:
        return 'Platform';
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'google':
        return <Megaphone size={24} className="text-[#4285F4]" />;
      case 'facebook':
        return <Facebook size={24} className="text-[#1877F2]" />;
      case 'instagram':
        return <Instagram size={24} className="text-[#E1306C]" />;
      case 'tiktok':
        return <Youtube size={24} className="text-[#000000]" />;
      case 'snapchat':
        return <MessageCircle size={24} className="text-[#FFFC00]" />;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    try {
      setIsConnecting(true);
      
      // In a real app, we would securely handle these credentials
      // For demo purposes, we're just simulating a connection
      const credentials = { email, password };
      
      const { success, error } = await connectNewPlatform(platform, credentials);
      
      if (!success) {
        toast.error(`Failed to connect ${getPlatformName()}: ${error?.message || 'Unknown error'}`);
        return;
      }
      
      toast.success(`${getPlatformName()} connected successfully`);
      onClose();
      
      // Reset form
      setEmail('');
      setPassword('');
    } catch (error: any) {
      toast.error(`Error: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-md">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Connect {getPlatformName()}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="p-4 rounded-full bg-dark-100 mb-4">
              {getPlatformIcon()}
            </div>
            <p className="text-gray-400 text-center max-w-xs">
              Enter your {getPlatformName()} account credentials to connect your account.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              className="input-field w-full" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              className="input-field w-full" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              disabled={isConnecting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                'Connect'
              )}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            Note: This is a demo application. No actual connection will be made.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ConnectPlatformModal;