/*
  # Shopify Integration Schema

  1. New Tables
    - `shopify_stores`
      - Store configuration and OAuth tokens
    - `shopify_tracking_installations`
      - Tracks where the Nova tracking code is installed
    - `shopify_events`
      - Stores tracked events from Shopify stores

  2. Functions
    - `install_tracking_code`
      - Handles automatic injection of tracking code
    - `generate_tracking_id`
      - Creates unique tracking IDs for stores

  3. Security
    - RLS policies for all tables
    - Secure token storage
*/

-- Create shopify_stores table
CREATE TABLE IF NOT EXISTS shopify_stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shop_domain TEXT NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  tracking_id TEXT NOT NULL UNIQUE,
  installed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create shopify_tracking_installations table
CREATE TABLE IF NOT EXISTS shopify_tracking_installations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES shopify_stores(id) ON DELETE CASCADE,
  theme_id TEXT NOT NULL,
  status TEXT NOT NULL,
  installed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create shopify_events table
CREATE TABLE IF NOT EXISTS shopify_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES shopify_stores(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE shopify_stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopify_tracking_installations ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopify_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own Shopify stores"
  ON shopify_stores
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own Shopify stores"
  ON shopify_stores
  FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own tracking installations"
  ON shopify_tracking_installations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM shopify_stores
      WHERE id = shopify_tracking_installations.store_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own store events"
  ON shopify_events
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM shopify_stores
      WHERE id = shopify_events.store_id
      AND user_id = auth.uid()
    )
  );

-- Create function to generate tracking ID
CREATE OR REPLACE FUNCTION generate_tracking_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'nova_' || encode(gen_random_bytes(16), 'hex');
END;
$$;

-- Create function to install tracking code
CREATE OR REPLACE FUNCTION install_tracking_code(store_id UUID, theme_id TEXT)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  installation_id UUID;
BEGIN
  INSERT INTO shopify_tracking_installations (store_id, theme_id, status)
  VALUES (store_id, theme_id, 'pending')
  RETURNING id INTO installation_id;
  
  RETURN installation_id;
END;
$$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_shopify_stores_updated_at
  BEFORE UPDATE ON shopify_stores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopify_tracking_installations_updated_at
  BEFORE UPDATE ON shopify_tracking_installations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();