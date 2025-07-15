"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, User, Phone, Building2, MapPin, Clock, Briefcase, UserPlus } from "lucide-react"
import { useFormValidation, type ValidationRules } from "../../hooks/useFormValidation"
import { useLocation } from "../../hooks/useLocation"
import { InputField } from "../ui/input-field"
import { SelectField } from "../ui/select-field"
import { GoogleIcon } from "../ui/GoogleIcon"

type UserType = "user" | "employer"

interface BaseFormData {
  name: string
  email: string
  password: string
  phone: string
}

interface UserFormData extends BaseFormData {
  skills: string
  experience: string
  availability: string
  location: {
    state: string
    city: string
    pincode: string
    latitude: number | null
    longitude: number | null
  }
}

interface EmployerFormData extends BaseFormData {
  businessDetails: {
    shopName: string
    businessType: string
  }
  location: {
    state: string
    city: string
    pincode: string
    latitude: number | null
    longitude: number | null
  }
}

type RegistrationFormData = UserFormData | EmployerFormData

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData & { userType: UserType }) => Promise<void>
  loading?: boolean
  error?: string
}

const validationRules: ValidationRules = {
  name: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { required: true, minLength: 6 },
}

const availabilityOptions = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "evenings", label: "Evenings" },
  { value: "flexible", label: "Flexible" },
  { value: "full-time", label: "Full Time" },
]

const businessTypeOptions = [
  { value: "retail", label: "Retail" },
  { value: "restaurant", label: "Restaurant" },
  { value: "service", label: "Service" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "other", label: "Other" },
]

export function RegistrationForm({ onSubmit, loading = false, error }: RegistrationFormProps) {
  const [userType, setUserType] = useState<UserType>("user")
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    ...(userType === "user"
      ? {
          skills: "",
          experience: "",
          availability: "",
          location: { state: "", city: "", pincode: "", latitude: null, longitude: null },
        }
      : {
          businessDetails: { shopName: "", businessType: "" },
          location: { state: "", city: "", pincode: "", latitude: null, longitude: null },
        }),
  })

  const { latitude, longitude, error: locationError } = useLocation()
  const { errors, validateForm, handleFieldChange, handleFieldBlur } = useFormValidation(validationRules)

  React.useEffect(() => {
    if (latitude && longitude) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          latitude,
          longitude,
        },
      }))
    }
  }, [latitude, longitude])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm(formData as unknown as { [key: string]: string })) {
      await onSubmit({ ...formData, userType })
    }
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value

    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    if (["name", "email", "password"].includes(field)) {
      handleFieldChange(field, value)
    }
  }

  const handleInputBlur = (field: string) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (["name", "email", "password"].includes(field)) {
      handleFieldBlur(field, e.target.value)
    }
  }

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type)
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      ...(type === "user"
        ? {
            skills: "",
            experience: "",
            availability: "",
            location: { state: "", city: "", pincode: "", latitude, longitude },
          }
        : {
            businessDetails: { shopName: "", businessType: "" },
            location: { state: "", city: "", pincode: "", latitude, longitude },
          }),
    })
  }

  const handleGoogleAuth = () => {
    console.log("Google authentication clicked")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <UserPlus className="h-12 w-12 mx-auto text-black dark:text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
          <p className="text-gray-600 dark:text-gray-400">Join our platform today</p>
        </div>

        {/* User Type Selection */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-black p-1 rounded-lg border dark:border-gray-800">
          {(["user", "employer"] as const).map((type) => (
            <motion.button
              key={type}
              type="button"
              onClick={() => handleUserTypeChange(type)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === type
                  ? "bg-black text-white shadow-sm dark:bg-white dark:text-black"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {type === "user" ? "Job Seeker" : "Employer"}
            </motion.button>
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.div>
        )}

        {locationError && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200"
          >
            Location access: {locationError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              onBlur={handleInputBlur("name")}
              error={errors.name}
              icon={<User className="h-4 w-4" />}
              placeholder="Enter your full name"
            />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              onBlur={handleInputBlur("password")}
              error={errors.password}
              icon={<Lock className="h-4 w-4" />}
              placeholder="Create a password"
            />
            <InputField
              label="Phone (Optional)"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              icon={<Phone className="h-4 w-4" />}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Type-specific Fields */}
          <AnimatePresence mode="wait">
            {userType === "user" && (
              <motion.div
                key="user-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Skills (Optional)"
                    type="text"
                    value={(formData as UserFormData).skills}
                    onChange={handleInputChange("skills")}
                    icon={<Briefcase className="h-4 w-4" />}
                    placeholder="e.g., JavaScript, Design, Marketing"
                  />
                  <InputField
                    label="Experience (Optional)"
                    type="text"
                    value={(formData as UserFormData).experience}
                    onChange={handleInputChange("experience")}
                    icon={<Clock className="h-4 w-4" />}
                    placeholder="e.g., 2 years, Entry level"
                  />
                </div>
                <SelectField
                  label="Availability (Optional)"
                  value={(formData as UserFormData).availability}
                  onChange={handleInputChange("availability")}
                  options={availabilityOptions}
                />
              </motion.div>
            )}

            {userType === "employer" && (
              <motion.div
                key="employer-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Shop/Business Name (Optional)"
                    type="text"
                    value={(formData as EmployerFormData).businessDetails.shopName}
                    onChange={handleInputChange("businessDetails.shopName")}
                    icon={<Building2 className="h-4 w-4" />}
                    placeholder="Enter your business name"
                  />
                  <SelectField
                    label="Business Type (Optional)"
                    value={(formData as EmployerFormData).businessDetails.businessType}
                    onChange={handleInputChange("businessDetails.businessType")}
                    options={businessTypeOptions}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Location Fields */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-white">
              <MapPin className="h-4 w-4" />
              <span>Location (Optional)</span>
              {latitude && longitude && <span className="text-green-600 text-xs">📍 Location detected</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="State"
                type="text"
                value={formData.location.state}
                onChange={handleInputChange("location.state")}
                placeholder="e.g., California"
              />
              <InputField
                label="City"
                type="text"
                value={formData.location.city}
                onChange={handleInputChange("location.city")}
                placeholder="e.g., San Francisco"
              />
              <InputField
                label="PIN Code"
                type="text"
                value={formData.location.pincode}
                onChange={handleInputChange("location.pincode")}
                placeholder="e.g., 94105"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-gray-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Creating account..." : "Create account"}
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
