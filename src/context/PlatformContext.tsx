import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getPlatformConnections, connectPlatform } from '../lib/supabase';

interface PlatformContextType {
  connectedPlatforms: any[];
  loading: boolean;
  connectNewPlatform: (platform: string, credentials: any) => Promise<{ success: boolean; error?: any }>;
  isPlatformConnected: (platform: string) => boolean;
  refreshConnections: () => Promise<void>;
}

const PlatformContext = createContext<PlatformContextType>({
  connectedPlatforms: [],
  loading: true,
  connectNewPlatform: async () => ({ success: false }),
  isPlatformConnected: () => false,
  refreshConnections: async () => {},
});

export const usePlatforms = () => useContext(PlatformContext);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [connectedPlatforms, setConnectedPlatforms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlatformConnections = async () => {
    if (!user) {
      setConnectedPlatforms([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await getPlatformConnections(user.id);
      
      if (error) {
        console.error('Error loading platform connections:', error);
        return;
      }
      
      setConnectedPlatforms(data || []);
    } catch (error) {
      console.error('Error loading platform connections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlatformConnections();
  }, [user]);

  const connectNewPlatform = async (platform: string, credentials: any) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { error } = await connectPlatform(user.id, platform, credentials);
      
      if (error) {
        console.error('Error connecting platform:', error);
        return { success: false, error };
      }
      
      // Refresh the connections list
      await loadPlatformConnections();
      return { success: true };
    } catch (error) {
      console.error('Error connecting platform:', error);
      return { success: false, error };
    }
  };

  const isPlatformConnected = (platform: string) => {
    return connectedPlatforms.some(conn => conn.platform_name === platform && conn.status === 'active');
  };

  const refreshConnections = async () => {
    await loadPlatformConnections();
  };

  return (
    <PlatformContext.Provider 
      value={{ 
        connectedPlatforms, 
        loading, 
        connectNewPlatform, 
        isPlatformConnected,
        refreshConnections
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};