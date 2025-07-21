import { Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import EmployerHomePage from '@/components/employer/home/Employer-home-page';
import { Outlet } from 'react-router-dom';
import { PostJobForm } from '@/components/employer/job/Post-job-form';

export const EmployerRoutes = (
  <Route
    path="/employer"
    element={
      <ProtectedRoute allowedRole="employer">
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    }
  >
    <Route index element={<EmployerHomePage />} />
    <Route path="postjob" element={<PostJobForm />} />
  </Route>
);
