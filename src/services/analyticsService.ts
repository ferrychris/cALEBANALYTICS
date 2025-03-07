import { supabase } from '../lib/supabase';

export const analyticsService = {
  // Get campaign performance data
  async getCampaignPerformance(dateRange: string) {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching campaign performance:', error);
      throw error;
    }
  },

  // Get audience insights
  async getAudienceInsights() {
    try {
      const { data, error } = await supabase
        .from('audience_insights')
        .select('*')
        .order('date', { ascending: false })
        .limit(1);

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error fetching audience insights:', error);
      throw error;
    }
  },

  // Get platform performance
  async getPlatformPerformance() {
    try {
      const { data, error } = await supabase
        .from('platform_performance')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching platform performance:', error);
      throw error;
    }
  }
};

export default analyticsService;