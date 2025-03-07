import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { getCreativeAssets, createCreativeAsset, analyzeCreativeAsset } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface CreativeContextType {
  creativeAssets: any[];
  loading: boolean;
  error: string | null;
  loadCreativeAssets: (filters?: any) => Promise<void>;
  addCreativeAsset: (assetData: any) => Promise<{ success: boolean; error?: any }>;
  analyzeAsset: (assetId: string, analysisData: any) => Promise<{ success: boolean; error?: any }>;
}

const CreativeContext = createContext<CreativeContextType>({
  creativeAssets: [],
  loading: false,
  error: null,
  loadCreativeAssets: async () => {},
  addCreativeAsset: async () => ({ success: false }),
  analyzeAsset: async () => ({ success: false }),
});

export const useCreatives = () => useContext(CreativeContext);

export const CreativeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [creativeAssets, setCreativeAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCreativeAssets = async (filters?: any) => {
    if (!user) {
      setCreativeAssets([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await getCreativeAssets(user.id, filters);
      
      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      
      setCreativeAssets(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load creative assets');
    } finally {
      setLoading(false);
    }
  };

  const addCreativeAsset = async (assetData: any) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const newAsset = {
        id: uuidv4(),
        ...assetData,
        date_created: new Date().toISOString(),
        status: 'pending_analysis'
      };
      
      const { error: createError } = await createCreativeAsset(user.id, newAsset);
      
      if (createError) {
        return { success: false, error: createError };
      }
      
      // Refresh the assets list
      await loadCreativeAssets();
      return { success: true, assetId: newAsset.id };
    } catch (error) {
      console.error('Error adding creative asset:', error);
      return { success: false, error };
    }
  };

  const analyzeAsset = async (assetId: string, analysisData: any) => {
    try {
      const { error } = await analyzeCreativeAsset(assetId, analysisData);
      
      if (error) {
        return { success: false, error };
      }
      
      // Refresh the assets list
      await loadCreativeAssets();
      return { success: true };
    } catch (error) {
      console.error('Error analyzing asset:', error);
      return { success: false, error };
    }
  };

  return (
    <CreativeContext.Provider 
      value={{ 
        creativeAssets, 
        loading, 
        error, 
        loadCreativeAssets, 
        addCreativeAsset,
        analyzeAsset
      }}
    >
      {children}
    </CreativeContext.Provider>
  );
};