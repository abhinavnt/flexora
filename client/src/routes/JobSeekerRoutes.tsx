import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import JobSeekerHomePage from '@/components/users/home/Seeker-home';
import { Route } from 'react-router-dom';

export const JobSeekerRoutes = (
  <Route
    path="/"
    element={
      <ProtectedRoute allowedRole="user">
        <Layout>
          <JobSeekerHomePage />
        </Layout>
      </ProtectedRoute>
    }
  />
);