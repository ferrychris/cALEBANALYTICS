import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { PlatformProvider } from './context/PlatformContext';
import { CreativeProvider } from './context/CreativeContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';
import Recommendations from './pages/Recommendations';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import OAuthCallback from './pages/OAuthCallback';
import AllPlatforms from './pages/platforms/AllPlatforms';
import GoogleAds from './pages/platforms/GoogleAds';
import FacebookAds from './pages/platforms/FacebookAds';
import TikTokAds from './pages/platforms/TikTokAds';
import SnapchatAds from './pages/platforms/SnapchatAds';
import Attribution from './pages/Attribution';
import Ratings from './pages/Ratings';
import Invoicing from './pages/Invoicing';

function App() {
  return (
    <AuthProvider>
      <PlatformProvider>
        <CreativeProvider>
          <Router>
            <Toaster position="top-right" richColors />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/oauth/callback" element={<OAuthCallback />} />
              <Route path="/auth/callback" element={<OAuthCallback />} />
              
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="recommendations" element={<Recommendations />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="attribution" element={<Attribution />} />
                <Route path="ratings" element={<Ratings />} />
                <Route path="invoicing" element={<Invoicing />} />
                
                {/* Platform Routes */}
                <Route path="platforms/all" element={<AllPlatforms />} />
                <Route path="platforms/google" element={<GoogleAds />} />
                <Route path="platforms/facebook" element={<FacebookAds />} />
                <Route path="platforms/tiktok" element={<TikTokAds />} />
                <Route path="platforms/snapchat" element={<SnapchatAds />} />
              </Route>
            </Routes>
          </Router>
        </CreativeProvider>
      </PlatformProvider>
    </AuthProvider>
  );
}

export default App;