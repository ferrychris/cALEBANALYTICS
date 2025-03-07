import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}
console.log(supabaseUrl)
// Ensure URL is valid and properly formatted
let url;
try {
  // Add https:// if not present
  const urlString = supabaseUrl.startsWith('http') ? supabaseUrl : `https://${supabaseUrl}`;
  url = new URL(urlString).toString();
} catch (error) {
  throw new Error('Invalid Supabase URL. Please check your VITE_SUPABASE_URL environment variable.');
}

export const supabase = createClient(url, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'nova_supabase_auth',
    storage: localStorage,
    flowType: 'pkce'
  }
});

// Auth functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/oauth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        scopes: 'email profile'
      }
    });

    if (error) {
      console.error('Google OAuth error:', error);
      throw error;
    }

    // Return data even if null - this is expected as the user will be redirected
    return { data, error: null };
  } catch (error: any) {
    console.error('Failed to initiate Google sign-in:', error);
    return { 
      data: null, 
      error: {
        message: error.message || 'Failed to sign in with Google',
        details: error
      }
    };
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Platform connection functions
export const connectPlatform = async (userId: string, platform: string, credentials: any) => {
  const { data, error } = await supabase
    .from('platform_connections')
    .insert([
      { 
        user_id: userId,
        platform_name: platform,
        credentials,
        status: 'active'
      }
    ]);
  
  return { data, error };
};

export const getPlatformConnections = async (userId: string) => {
  const { data, error } = await supabase
    .from('platform_connections')
    .select('*')
    .eq('user_id', userId);
  
  return { data, error };
};

// Campaign functions
export const getCampaigns = async (userId: string, platform?: string) => {
  let query = supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', userId);
  
  if (platform) {
    query = query.eq('platform', platform);
  }
  
  const { data, error } = await query;
  return { data, error };
};

export const createCampaign = async (userId: string, campaignData: any) => {
  const { data, error } = await supabase
    .from('campaigns')
    .insert([
      { 
        user_id: userId,
        ...campaignData
      }
    ]);
  
  return { data, error };
};

// Creative assets functions
export const getCreativeAssets = async (userId: string, filters?: any) => {
  let query = supabase
    .from('creative_assets')
    .select('*')
    .eq('user_id', userId);
  
  if (filters?.platform) {
    query = query.eq('platform', filters.platform);
  }
  
  if (filters?.type) {
    query = query.eq('type', filters.type);
  }
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  
  const { data, error } = await query;
  return { data, error };
};

export const createCreativeAsset = async (userId: string, assetData: any) => {
  const { data, error } = await supabase
    .from('creative_assets')
    .insert([
      { 
        user_id: userId,
        ...assetData
      }
    ]);
  
  return { data, error };
};

export const analyzeCreativeAsset = async (assetId: string, analysisData: any) => {
  const { data, error } = await supabase
    .from('creative_assets')
    .update({ 
      analysis: analysisData,
      date_analyzed: new Date().toISOString(),
      overall_score: analysisData.overallScore,
      status: analysisData.status
    })
    .eq('id', assetId);
  
  return { data, error };
};