import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import EmployerHomePage from '@/components/employer/home/Employer-home-page';
import { Layout } from '@/components/layout/Layout';
import { Route } from 'react-router-dom';

export const EmployerRoutes = (
  <Route
    path="/employer"
    element={
      <ProtectedRoute allowedRole="employer">
        <Layout>
          <EmployerHomePage />
        </Layout>
      </ProtectedRoute>
    }
  />
);