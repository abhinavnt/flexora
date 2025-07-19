
// const queryClient = new QueryClient();

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../client/src/hooks/ThemeProvider";
import AuthPage from "./pages/Auth/AuthPage";
import OtpPage from "./pages/Auth/OTP-page";
import JobSeekerHomePage from "./components/users/home/Seeker-home";

const App = () => (
  // <QueryClientProvider client={queryClient}>
  <ThemeProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/otp" element={<OtpPage/>}/>
        <Route path="/" element={<JobSeekerHomePage/>}/>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  // </QueryClientProvider>
);

export default App;
