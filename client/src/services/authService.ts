import type { RegistrationFormData } from "@/components/auth/RegistrationForm";
import { setCredentials } from "@/redux/features/auth/AuthSlice";
import type { AppDispatch } from "@/redux/store";
import axiosInstance from "@/utils/axiosInstance";

export const registerUser = async (data: RegistrationFormData) => {
  try {
    console.log("registerUser service", data);
    const response = await axiosInstance.post(`/auth/register?role=${data.role}`, { data }, { withCredentials: true });
    console.log(response, "response");
    return response;
  } catch (error: any) {
    console.log(error);

    return error.response;
  }
};

export const login = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });

    dispatch(
      setCredentials({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );

    localStorage.clear();
    localStorage.setItem("isAuthenticated", "true");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const verifyOtp = async (email: string, otp: string, dispatch: AppDispatch) => {
  try {
    const response = await axiosInstance.post("/auth/otpverify", { email, otp }, { withCredentials: true });

    dispatch(setCredentials({ accessToken: response.data.accessToken, user: response.data.user }));
    localStorage.setItem("isAuthenticated", "true");
    return response;
  } catch (error: any) {
    console.log(error);

    return error.response;
  }
};

export const resendOtp = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auth/resend-otp", { email }, { withCredentials: true });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (dispatch: AppDispatch) => {
  try {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    // const isAdmin = localStorage.getItem("adminLoggedIn");

    // let data = { role: "user" };

    if (isAuthenticated === "true") {
      // if (isAdmin === "true") {
      //   data = { role: "admin" };
      // }

      const response = await axiosInstance.post(`/auth/refresh-token`, {}, { withCredentials: true });

      dispatch(setCredentials({ accessToken: response.data.accessToken, user: response.data.user }));
      return response.data.accessToken;
    }
    throw new Error("Session expired. Please log in again");
  } catch (error) {
    console.log(error);
    //   dispatch(logout());
    throw new Error("Session expired. Please log in again.");
  }
};