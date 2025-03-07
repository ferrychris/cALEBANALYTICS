import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket,
  ChevronRight,
  Youtube as GoogleIcon,
  Facebook,
  MessageCircle as SnapchatIcon,
  Mail,
  BellRing,
  ShoppingBag,
  MessageSquare,
  Building2,
  Globe,
  CheckCircle,
  XCircle,
  Loader,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    website: '',
    industry: '',
    size: '',
    monthlyAdSpend: ''
  });
  
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [connectedTools, setConnectedTools] = useState<string[]>([]);

  const handlePlatformConnect = async (platform: string) => {
    setIsConnecting(true);
    try {
      // In a real implementation, this would handle OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnectedPlatforms([...connectedPlatforms, platform]);
      toast.success(`Connected to ${platform} successfully`);
    } catch (error) {
      toast.error(`Failed to connect to ${platform}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleToolConnect = async (tool: string) => {
    setIsConnecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnectedTools([...connectedTools, tool]);
      toast.success(`Connected to ${tool} successfully`);
    } catch (error) {
      toast.error(`Failed to connect to ${tool}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleComplete = () => {
    toast.success('Onboarding completed! Welcome to Nova Analytics.');
    navigate('/');
  };

  const steps = [
    {
      title: "Business Information",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Business Name</label>
            <input 
              type="text" 
              className="input-field w-full" 
              value={businessInfo.name}
              onChange={(e) => setBusinessInfo({...businessInfo, name: e.target.value})}
              placeholder="Enter your business name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
            <input 
              type="url" 
              className="input-field w-full" 
              value={businessInfo.website}
              onChange={(e) => setBusinessInfo({...businessInfo, website: e.target.value})}
              placeholder="https://www.example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Industry</label>
            <select 
              className="input-field w-full"
              value={businessInfo.industry}
              onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
            >
              <option value="">Select your industry</option>
              <option value="ecommerce">E-commerce</option>
              <option value="saas">SaaS</option>
              <option value="retail">Retail</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Business Size</label>
            <select 
              className="input-field w-full"
              value={businessInfo.size}
              onChange={(e) => setBusinessInfo({...businessInfo, size: e.target.value})}
            >
              <option value="">Select business size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Monthly Ad Spend</label>
            <select 
              className="input-field w-full"
              value={businessInfo.monthlyAdSpend}
              onChange={(e) => setBusinessInfo({...businessInfo, monthlyAdSpend: e.target.value})}
            >
              <option value="">Select monthly ad spend</option>
              <option value="0-1000">$0 - $1,000</option>
              <option value="1001-5000">$1,001 - $5,000</option>
              <option value="5001-10000">$5,001 - $10,000</option>
              <option value="10001-50000">$10,001 - $50,000</option>
              <option value="50000+">$50,000+</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: "Connect Ad Platforms",
      content: (
        <div className="space-y-6">
          <p className="text-gray-400">Connect your advertising platforms to enable AI-powered optimization:</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4285F4]/20 text-[#4285F4]">
                    <GoogleIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Google Ads</h4>
                    <p className="text-sm text-gray-400">Connect your Google Ads account</p>
                  </div>
                </div>
                {connectedPlatforms.includes('google') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handlePlatformConnect('google')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1877F2]/20 text-[#1877F2]">
                    <Facebook size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Facebook Ads</h4>
                    <p className="text-sm text-gray-400">Connect your Facebook Ads account</p>
                  </div>
                </div>
                {connectedPlatforms.includes('facebook') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handlePlatformConnect('facebook')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#000000]/20 text-white">
                    <GoogleIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">TikTok Ads</h4>
                    <p className="text-sm text-gray-400">Connect your TikTok Ads account</p>
                  </div>
                </div>
                {connectedPlatforms.includes('tiktok') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handlePlatformConnect('tiktok')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FFFC00]/20 text-[#FFFC00]">
                    <SnapchatIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Snapchat Ads</h4>
                    <p className="text-sm text-gray-400">Connect your Snapchat Ads account</p>
                  </div>
                </div>
                {connectedPlatforms.includes('snapchat') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handlePlatformConnect('snapchat')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Connect Marketing Tools",
      content: (
        <div className="space-y-6">
          <p className="text-gray-400">Connect your marketing tools to enable comprehensive analytics:</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Klaviyo</h4>
                    <p className="text-sm text-gray-400">Email marketing automation</p>
                  </div>
                </div>
                {connectedTools.includes('klaviyo') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handleToolConnect('klaviyo')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <BellRing size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Attentive</h4>
                    <p className="text-sm text-gray-400">SMS marketing platform</p>
                  </div>
                </div>
                {connectedTools.includes('attentive') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handleToolConnect('attentive')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Postscript</h4>
                    <p className="text-sm text-gray-400">SMS marketing for Shopify</p>
                  </div>
                </div>
                {connectedTools.includes('postscript') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handleToolConnect('postscript')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 bg-dark-100 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Omnisend</h4>
                    <p className="text-sm text-gray-400">Omnichannel marketing automation</p>
                  </div>
                </div>
                {connectedTools.includes('omnisend') ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                ) : (
                  <button 
                    className="btn-primary text-sm py-1.5"
                    onClick={() => handleToolConnect('omnisend')}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Loader size={14} className="animate-spin" />
                        <span>Connecting...</span>
                      </div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-300 via-purple-900/20 to-dark-300 relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1/3 h-1/3 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-1/2 h-1/2 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 rounded-full bg-pink-500/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <Rocket size={24} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome to Nova Analytics</h1>
              <p className="text-gray-400">Let's get your account set up</p>
            </div>
          </div>

          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-4 mb-8">
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div 
                    className={`flex items-center gap-2 ${
                      step === i 
                        ? 'text-primary-400' 
                        : step > i
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === i 
                        ? 'bg-primary-500/20 text-primary-400' 
                        : step > i
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-dark-100 text-gray-400'
                    }`}>
                      {step > i ? (
                        <CheckCircle size={16} />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="font-medium">{s.title}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={20} className="text-gray-600" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mb-8">
              {steps[step].content}
            </div>

            <div className="flex justify-between">
              <button
                className="btn-outline"
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
              >
                Back
              </button>
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => {
                  if (step < steps.length - 1) {
                    setStep(step + 1);
                  } else {
                    handleComplete();
                  }
                }}
              >
                {step === steps.length - 1 ? (
                  <>
                    <Rocket size={16} />
                    <span>Launch Dashboard</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400">
            Need help? <button className="text-primary-400 hover:underline">Contact Support</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;