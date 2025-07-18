"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { LoginForm } from "@/components/auth/LoginForm"
import { registerUser } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import type { RegistrationFormData } from "@/hooks/auth/useRegistrationForm"
import { RegistrationForm } from "@/components/auth/RegistrationForm"

type AuthMode = "login" | "register"

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const navigate=useNavigate()

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Login data:", data)
      // Handle successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegistration = async (data: RegistrationFormData) => {
    console.log("data from the register",data);
    
    setLoading(true)
    setError("")

    try {
      // Simulate API call
     const response= await registerUser(data)

      if (response?.status == 201) {
        navigate('/otp', {
          state: {
            email: data.email,
            // userType: userType
          }
        });
      }
      // Navigate to OTP verification page with email
      console.log(response,"rspon");

      if(response==undefined){

        setError("something went wrong please try later")
      }
      
      setError(response.data.message)
     console.log("response",response);
     
      console.log("Registration data:", data)
      // Handle successful registration
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-black dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-50 dark:bg-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-blue-50/20 to-transparent dark:from-transparent dark:via-blue-900/10 dark:to-transparent"></div>
        </div>
      </div>

      <motion.div
        className="absolute top-10 right-10 w-72 h-72 bg-gray-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-10 left-10 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-gray-100 dark:bg-black backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-full p-1 shadow-lg">
              {(["login", "register"] as const).map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => switchMode(mode)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    authMode === mode
                      ? "bg-black text-white shadow-md dark:bg-white dark:text-black"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mode === "login" ? "Sign In" : "Sign Up"}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Form Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={authMode}
              initial={{ opacity: 0, x: authMode === "login" ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: authMode === "login" ? 100 : -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex justify-center"
            >
              {authMode === "login" ? (
                <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
              ) : (
                <RegistrationForm onSubmit={handleRegistration} loading={loading} error={error} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Additional Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
              <motion.button
                onClick={() => switchMode(authMode === "login" ? "register" : "login")}
                className="text-black hover:underline font-medium dark:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {authMode === "login" ? "Sign up" : "Sign in"}
              </motion.button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
