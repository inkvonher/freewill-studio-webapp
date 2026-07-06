import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-paper">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
}
