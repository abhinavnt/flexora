
// const queryClient = new QueryClient();

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../client/src/hooks/ThemeProvider";
import AuthPage from "./pages/Auth/AuthPage";

const App = () => (
  // <QueryClientProvider client={queryClient}>
  <ThemeProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  // </QueryClientProvider>
);

export default App;
