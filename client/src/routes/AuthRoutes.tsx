import AuthPage from '@/pages/Auth/AuthPage';
import OtpPage from '@/pages/Auth/OTP-page';
import { Route } from 'react-router-dom';

export const AuthRoutes = (
  <>
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/otp" element={<OtpPage />} />
  </>
);