import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { adminLogin, getAdminSession } from '@/lib/api';

function AdminLoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        await getAdminSession();
        if (mounted) {
          navigate('/admin/projects', { replace: true });
        }
      } catch {
        if (mounted) {
          setIsCheckingSession(false);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await adminLogin(email, password);
      toast({
        title: 'Connexion reussie',
        description: 'Bienvenue dans l espace administrateur.',
      });
      navigate('/admin/projects', { replace: true });
    } catch (error) {
      toast({
        title: 'Connexion echouee',
        description: error.message || 'Email ou mot de passe invalide.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <p className="text-slate-700 font-medium">Verification de la session...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | Lapi Renov</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-amber-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Login</h1>
          <p className="text-slate-600 mb-6">Connectez-vous pour gerer vos projets.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-800 mb-1">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="owner@lapirenov.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-800 mb-1">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="********"
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg"
            >
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;

