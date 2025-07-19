
// const queryClient = new QueryClient();

import { BrowserRouter, Routes } from "react-router-dom";
import { ThemeProvider } from "../../client/src/hooks/ThemeProvider";

import { AuthRoutes } from "./routes/AuthRoutes";
import { JobSeekerRoutes } from "./routes/JobSeekerRoutes";
import { EmployerRoutes } from "./routes/EmployerRoutes";

const App = () => (
  // <QueryClientProvider client={queryClient}>
  <ThemeProvider>

    <BrowserRouter>
      <Routes>
        {AuthRoutes}
        {JobSeekerRoutes}
        {EmployerRoutes}
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  // </QueryClientProvider>
);

export default App;
