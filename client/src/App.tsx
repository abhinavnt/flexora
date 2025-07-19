
// const queryClient = new QueryClient();

import { BrowserRouter, Routes } from "react-router-dom";
import { ThemeProvider } from "../../client/src/hooks/ThemeProvider";

import { AuthRoutes } from "./routes/AuthRoutes";
import { JobSeekerRoutes } from "./routes/JobSeekerRoutes";
import { EmployerRoutes } from "./routes/EmployerRoutes";
import { refreshToken } from "./services/authService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./redux/store";

function App (){
const [loading, setLoading] = useState<boolean>(true);
const dispatch = useDispatch();
const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

   useEffect(() => {
    const fetchUser = async () => {
      
      // const urlParams = new URLSearchParams(window.location.search);
      // const authStatus = urlParams.get('auth');

      // if (authStatus === 'success') {
      //   localStorage.setItem("isAuthenticated", "true");
      //   window.history.replaceState({}, document.title, window.location.pathname);
      // }

      const storedAuth = localStorage.getItem("isAuthenticated");
      if (storedAuth) {
        try {
          await refreshToken(dispatch);
        } catch (error) {
          console.error("Error during token refresh", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, isAuthenticated]);


 if (loading) {
  return (
    <div className="flex bg-black items-center justify-center h-screen">
      {/* <Loading variant="ripple"  /> */}
    </div>
  );
}


  return (
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

} 

export default App;
