import { useEffect } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
});

function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.history.push('/parent/dashboard');
      }
    });
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Загрузка...</h1>
        <p className="text-muted-foreground">Пожалуйста, подождите.</p>
      </div>
    </div>
  );
}
