import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Copy, 
  Check, 
  ShieldCheck, 
  Settings, 
  ChevronRight,
  Rocket,
  Sparkles,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import shopifyService from '../services/shopifyService';

const Attribution = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [shopifyDomain, setShopifyDomain] = useState('');
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleCopyCode = () => {
    const trackingCode = `<!-- Nova Analytics Attribution Tracking -->
<script>
  window.novaAnalytics = window.novaAnalytics || [];
  window.novaAnalytics.push(['init', 'YOUR_TRACKING_ID']);
  
  (function() {
    var na = document.createElement('script');
    na.type = 'text/javascript';
    na.async = true;
    na.src = 'https://cdn.nova-analytics.com/tracking.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(na, s);
  })();
</script>`;

    navigator.clipboard.writeText(trackingCode);
    setCopiedCode(true);
    toast.success('Tracking code copied to clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleInstallShopify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInstalling(true);

    try {
      // In a real implementation, this would:
      // 1. Initiate Shopify OAuth flow
      // 2. Get access token
      // 3. Install tracking code via Shopify API
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Successfully connected to Shopify store');
      setShowInstallModal(false);
    } catch (error) {
      console.error('Error installing to Shopify:', error);
      toast.error('Failed to connect to Shopify store');
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Supernova Attribution</h1>
          <p className="text-gray-400 mt-1">AI-powered attribution tracking and analysis</p>
        </div>
      </div>

      {/* Quick Setup Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
            <Rocket size={24} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Quick Setup</h2>
            <p className="text-gray-400">Get started with attribution tracking</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-dark-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code size={18} className="text-primary-400" />
                  <h3 className="font-medium">Manual Installation</h3>
                </div>
                <button 
                  className="btn-outline text-sm py-1.5 flex items-center gap-1"
                  onClick={handleCopyCode}
                >
                  {copiedCode ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Add this code to your website's &lt;head&gt; tag to enable attribution tracking.
              </p>
            </div>

            <div className="bg-dark-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-primary-400" />
                  <h3 className="font-medium">Security Guide</h3>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">
                Learn about our security measures and data handling practices.
              </p>
            </div>

            <div className="bg-dark-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-primary-400" />
                  <h3 className="font-medium">Advanced Configuration</h3>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-400">
                Customize tracking behavior and attribution settings.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-dark-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BrainCircuit size={18} className="text-primary-400" />
                  <h3 className="font-medium">AI Attribution</h3>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">Pro</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Unlock AI-powered attribution modeling and insights.
              </p>
              <button className="btn-primary text-sm w-full flex items-center justify-center gap-2">
                <Sparkles size={14} />
                <span>Upgrade to Pro</span>
              </button>
            </div>

            <div className="bg-dark-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-primary-400" />
                  <h3 className="font-medium">Quick Install</h3>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Automatically install tracking code on popular platforms.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="btn-outline text-sm py-1.5 flex items-center justify-center gap-2"
                  onClick={() => setShowInstallModal(true)}
                >
                  Install on Shopify
                </button>
                <button className="btn-outline text-sm py-1.5" disabled>
                  More Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shopify Install Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-200/90 backdrop-blur-md rounded-lg w-full max-w-md border border-white/10 shadow-xl"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold">Install on Shopify</h2>
            </div>
            
            <form onSubmit={handleInstallShopify} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Shopify Store URL
                </label>
                <input 
                  type="text" 
                  className="input-field w-full"
                  placeholder="your-store.myshopify.com"
                  value={shopifyDomain}
                  onChange={(e) => setShopifyDomain(e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowInstallModal(false)}
                  className="btn-outline"
                  disabled={isInstalling}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                  disabled={isInstalling}
                >
                  {isInstalling ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Installing...</span>
                    </>
                  ) : (
                    <>
                      <Rocket size={16} />
                      <span>Install Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Attribution;