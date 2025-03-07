import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (!session) {
          console.error('No session found');
          throw new Error('Authentication failed. Please try again.');
        }

        // Check if this is a new user
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('id, onboarding_completed')
          .eq('id', session.user.id)
          .single();

        if (userError && userError.code !== 'PGRST116') { // PGRST116 is "not found" error
          console.error('User lookup error:', userError);
          throw userError;
        }

        if (!existingUser) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || '',
                created_at: new Date().toISOString(),
                last_sign_in: new Date().toISOString(),
                onboarding_completed: false
              }
            ]);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            throw profileError;
          }

          // New user - redirect to onboarding
          toast.success('Account created successfully!');
          navigate('/onboarding');
        } else {
          // Update last sign in for existing user
          const { error: updateError } = await supabase
            .from('users')
            .update({ last_sign_in: new Date().toISOString() })
            .eq('id', session.user.id);

          if (updateError) {
            console.error('Failed to update last sign in:', updateError);
          }

          // Check if onboarding is completed
          if (!existingUser.onboarding_completed) {
            navigate('/onboarding');
            return;
          }

          // Existing user - redirect to dashboard or original destination
          toast.success('Welcome back!');
          const from = (location.state as any)?.from || '/';
          navigate(from, { replace: true });
        }
      } catch (error: any) {
        console.error('OAuth callback error:', error);
        toast.error(error.message || 'Failed to complete sign in');
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;