import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

interface ProtectedRouteProps {
  allowedRole: 'user' | 'employer' | 'admin';
  children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRole, children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== allowedRole) {
    let redirectTo = '/';
    if (user?.role === 'employer') {
      redirectTo = '/employer';
    } else if (user?.role === 'admin') {
      redirectTo = '/admin';
    }
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};