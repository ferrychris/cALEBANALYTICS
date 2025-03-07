import { supabase } from '../lib/supabase';

export const platformService = {
  // Connect platform
  async connectPlatform(platform: string, credentials: any) {
    try {
      const { data, error } = await supabase
        .from('platform_connections')
        .insert({
          platform_name: platform,
          credentials,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error connecting platform:', error);
      throw error;
    }
  },

  // Get platform connections
  async getPlatformConnections() {
    try {
      const { data, error } = await supabase
        .from('platform_connections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching platform connections:', error);
      throw error;
    }
  },

  // Disconnect platform
  async disconnectPlatform(id: string) {
    try {
      const { error } = await supabase
        .from('platform_connections')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error disconnecting platform:', error);
      throw error;
    }
  }
};

export default platformService;