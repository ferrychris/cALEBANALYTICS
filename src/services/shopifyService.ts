import { supabase } from '../lib/supabase';

interface ShopifyStore {
  id: string;
  shop_domain: string;
  access_token: string;
  tracking_id: string;
}

interface TrackingInstallation {
  id: string;
  store_id: string;
  theme_id: string;
  status: 'pending' | 'completed' | 'failed';
}

export const shopifyService = {
  // Connect to Shopify store via OAuth
  async connectStore(shopDomain: string, accessToken: string) {
    try {
      const { data, error } = await supabase
        .from('shopify_stores')
        .insert({
          shop_domain: shopDomain,
          access_token: accessToken,
          tracking_id: await generateTrackingId()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error connecting Shopify store:', error);
      throw error;
    }
  },

  // Install tracking code into Shopify theme
  async installTrackingCode(storeId: string, themeId: string) {
    try {
      // 1. Create installation record
      const { data: installation, error: installError } = await supabase
        .from('shopify_tracking_installations')
        .insert({
          store_id: storeId,
          theme_id: themeId,
          status: 'pending'
        })
        .select()
        .single();

      if (installError) throw installError;

      // 2. Get store details
      const { data: store, error: storeError } = await supabase
        .from('shopify_stores')
        .select('*')
        .eq('id', storeId)
        .single();

      if (storeError) throw storeError;

      // 3. Generate tracking code
      const trackingCode = generateTrackingCodeSnippet(store.tracking_id);

      // 4. Install via Shopify API
      await installCodeToShopify(store, themeId, trackingCode);

      // 5. Update installation status
      const { error: updateError } = await supabase
        .from('shopify_tracking_installations')
        .update({ status: 'completed' })
        .eq('id', installation.id);

      if (updateError) throw updateError;

      return installation;
    } catch (error) {
      console.error('Error installing tracking code:', error);
      throw error;
    }
  }
};

// Helper function to generate tracking code snippet
function generateTrackingCodeSnippet(trackingId: string): string {
  return `
<!-- Nova Analytics Attribution Tracking -->
<script>
  window.novaAnalytics = window.novaAnalytics || [];
  window.novaAnalytics.push(['init', '${trackingId}']);
  
  (function() {
    var na = document.createElement('script');
    na.type = 'text/javascript';
    na.async = true;
    na.src = 'https://cdn.nova-analytics.com/tracking.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(na, s);
  })();
</script>
  `.trim();
}

// Helper function to install code via Shopify API
async function installCodeToShopify(store: ShopifyStore, themeId: string, trackingCode: string) {
  const shopifyAdmin = `https://${store.shop_domain}/admin/api/2024-01`;
  
  try {
    // 1. Get theme assets
    const themeResponse = await fetch(
      `${shopifyAdmin}/themes/${themeId}/assets.json`,
      {
        headers: {
          'X-Shopify-Access-Token': store.access_token,
          'Content-Type': 'application/json'
        }
      }
    );

    const themeData = await themeResponse.json();
    const layoutFile = themeData.assets.find(asset => asset.key === 'layout/theme.liquid');

    if (!layoutFile) throw new Error('Theme layout file not found');

    // 2. Get current layout content
    const layoutResponse = await fetch(
      `${shopifyAdmin}/themes/${themeId}/assets.json?asset[key]=layout/theme.liquid`,
      {
        headers: {
          'X-Shopify-Access-Token': store.access_token
        }
      }
    );

    const layoutData = await layoutResponse.json();
    const currentLayout = layoutData.asset.value;

    // 3. Insert tracking code before </head>
    const updatedLayout = currentLayout.replace(
      '</head>',
      `${trackingCode}\n</head>`
    );

    // 4. Update theme layout
    await fetch(
      `${shopifyAdmin}/themes/${themeId}/assets.json`,
      {
        method: 'PUT',
        headers: {
          'X-Shopify-Access-Token': store.access_token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          asset: {
            key: 'layout/theme.liquid',
            value: updatedLayout
          }
        })
      }
    );
  } catch (error) {
    console.error('Error installing code to Shopify:', error);
    throw error;
  }
}

// Helper function to generate tracking ID
async function generateTrackingId(): Promise<string> {
  const { data, error } = await supabase
    .rpc('generate_tracking_id');

  if (error) throw error;
  return data;
}

export default shopifyService;