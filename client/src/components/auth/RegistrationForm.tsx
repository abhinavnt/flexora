"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";
import { GoogleIcon } from "../ui/GoogleIcon";
import { useRegistrationForm } from "@/hooks/auth/useRegistrationForm";
import { RegistrationCommonFields } from "./register/RegistrationCommonFields";
import { RegistrationUserFields } from "./register/RegistrationUserFields";
import { RegistrationEmployerFields } from "./register/RegistrationEmployerFields";
import { RegistrationLocationFields } from "./register/RegistrationLocationFields";

interface Props {
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export function RegistrationForm({ onSubmit, loading = false, error }: Props) {
  const {
    formData,
    userType,
    errors,
    locationError,
    handleSubmit,
    handleInputChange,
    handleInputBlur,
    handleUserTypeChange,
  } = useRegistrationForm(onSubmit);

  const handleGoogleAuth = () => {
    console.log("Google authentication clicked");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="text-center space-y-2">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
            <UserPlus className="h-12 w-12 mx-auto text-black dark:text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
          <p className="text-gray-600 dark:text-gray-400">Join our platform today</p>
        </div>

        {/* User Type Toggle */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-black p-1 rounded-lg border dark:border-gray-800">
          {(["user", "employer"] as const).map((type) => (
            <motion.button
              key={type}
              type="button"
              onClick={() => handleUserTypeChange(type)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === type ? "bg-black text-white shadow-sm dark:bg-white dark:text-black" : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {type === "user" ? "Job Seeker" : "Employer"}
            </motion.button>
          ))}
        </div>

        {/* Error Messages */}
        {error && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </motion.div>
        )}
        {locationError && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200">
            Location access: {locationError}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <RegistrationCommonFields formData={formData} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} errors={errors} />
          <AnimatePresence mode="wait">
            {userType === "user" ? (
              <motion.div key="user-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <RegistrationUserFields formData={formData} handleInputChange={handleInputChange} />
              </motion.div>
            ) : (
              <motion.div key="employer-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <RegistrationEmployerFields formData={formData} handleInputChange={handleInputChange} />
              </motion.div>
            )}
          </AnimatePresence>
          <RegistrationLocationFields formData={formData} handleInputChange={handleInputChange} latitude={formData.location?.latitude} longitude={formData.location?.longitude} />
          <motion.button type="submit" disabled={loading} className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-gray-200" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {loading ? "Creating account..." : "Create account"}
          </motion.button>
        </form>

        {/* Google Auth */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-black text-gray-500">Or continue with</span>
          </div>
        </div>
        <motion.button type="button" onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <GoogleIcon />
          <span>Continue with Google</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
