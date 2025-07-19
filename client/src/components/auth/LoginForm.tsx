"use client"

import { motion } from "framer-motion"
import { Mail, Lock, LogIn } from "lucide-react"
import { InputField } from "../ui/input-field"
import { GoogleIcon } from "../ui/GoogleIcon"
import { useLoginForm, type LoginFormData } from "@/hooks/auth/useLoginForm"

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  loading?: boolean
  error?: string
}

export function LoginForm({ onSubmit, loading = false, error }: LoginFormProps) {
  const { formData, errors, handleInputChange, handleInputBlur, handleSubmit } = useLoginForm(onSubmit)

  const handleGoogleAuth = () => {
    console.log("Google authentication clicked")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="text-center space-y-2">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
            <LogIn className="h-12 w-12 mx-auto text-black dark:text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            onBlur={handleInputBlur("email")}
            error={errors.email}
            icon={<Mail className="h-4 w-4" />}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            onBlur={handleInputBlur("password")}
            error={errors.password}
            icon={<Lock className="h-4 w-4" />}
            placeholder="Enter your password"
          />

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-gray-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-black text-gray-500">Or continue with</span>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
