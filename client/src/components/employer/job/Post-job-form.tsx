"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { InputField } from "@/components/ui/input-field"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, DollarSign, Hash, MapPin, Phone, Briefcase } from "lucide-react" // Ensure all icons are imported
import { motion, type Variants } from "framer-motion"
import { useLocation } from "@/hooks/useLocation"

type FormData = {
  jobTitle: string
  jobDescription: string
  category: string
  payAmount: string
  payType: string
  jobDateTime: string
  jobLocation: string
  numberOfPositions: string
  additionalNotes: string
  contactPhoneEmail: string
}

export function PostJobForm() {
  const { latitude, longitude, loading: locationLoading, error: locationError } = useLocation()
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    jobDescription: "",
    category: "",
    payAmount: "",
    payType: "",
    jobDateTime: "",
    jobLocation: "",
    numberOfPositions: "",
    additionalNotes: "",
    contactPhoneEmail: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "jobTitle":
        return value.trim() === "" ? "Job Title is required." : ""
      case "jobDescription":
        return value.trim() === "" ? "Job Description is required." : ""
      case "category":
        return value.trim() === "" ? "Category is required." : ""
      case "payAmount":
        return value.trim() === "" || isNaN(Number(value)) ? "Pay Amount is required and must be a number." : ""
      case "payType":
        return value.trim() === "" ? "Pay Type is required." : ""
      case "jobDateTime":
        return value.trim() === "" ? "Job Date/Time is required." : ""
      case "jobLocation":
        return value.trim() === "" ? "Job Location is required." : ""
      case "numberOfPositions":
        return value.trim() === "" || isNaN(Number(value)) || Number(value) <= 0
          ? "Number of Positions is required and must be a positive number."
          : ""
      case "contactPhoneEmail":
        return value.trim() === "" ? "Contact Phone/Email is required." : ""
      default:
        return ""
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormData, value) }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const error = validateField(key as keyof FormData, formData[key as keyof FormData])
        if (error) {
          newErrors[key] = error
          isValid = false
        }
      }
    }
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    const jobData = {
      ...formData,
      latitude,
      longitude,
    }
    console.log("Submitting Job Data:", jobData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    alert("Job Posted Successfully! (Check console for data)")
    // Optionally reset form or redirect
    setFormData({
      jobTitle: "",
      jobDescription: "",
      category: "",
      payAmount: "",
      payType: "",
      jobDateTime: "",
      jobLocation: "",
      numberOfPositions: "",
      additionalNotes: "",
      contactPhoneEmail: "",
    })
    setErrors({}) // Clear errors on successful submission
  }

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 md:px-6">
      <motion.div
        className="w-full max-w-3xl bg-card p-6 rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Post a New Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants}>
            <InputField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              error={errors.jobTitle}
              icon={<Briefcase className="h-5 w-5" />}
              aria-required={true} // Indicate required for accessibility
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 ${errors.jobDescription ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-800"}`}
              rows={5}
              placeholder="Describe the job role and duties..."
              aria-required={true}
            />
            {errors.jobDescription && <p className="text-sm text-red-500 mt-1">{errors.jobDescription}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category / Job Type <span className="text-red-500 ml-1">*</span>
            </label>
            <Select
              name="category"
              value={formData.category}
              onValueChange={(val) => handleSelectChange("category", val)}
              aria-required={true}
            >
              <SelectTrigger
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white transition-all duration-200 ${errors.category ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-800"}`}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="catering">Catering</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="helper">Helper</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <InputField
                label="Pay Amount"
                name="payAmount"
                type="number"
                value={formData.payAmount}
                onChange={handleChange}
                error={errors.payAmount}
                icon={<DollarSign className="h-5 w-5" />}
                aria-required={true}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pay Type <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                name="payType"
                value={formData.payType}
                onValueChange={(val) => handleSelectChange("payType", val)}
                aria-required={true}
              >
                <SelectTrigger
                  className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white transition-all duration-200 ${errors.payType ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-800"}`}
                >
                  <SelectValue placeholder="Select pay type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_hour">Per Hour</SelectItem>
                  <SelectItem value="per_day">Per Day</SelectItem>
                  <SelectItem value="per_job">Per Job</SelectItem>
                </SelectContent>
              </Select>
              {errors.payType && <p className="text-sm text-red-500 mt-1">{errors.payType}</p>}
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <InputField
              label="Job Date / Time"
              name="jobDateTime"
              type="datetime-local"
              value={formData.jobDateTime}
              onChange={handleChange}
              error={errors.jobDateTime}
              icon={<Calendar className="h-5 w-5" />}
              aria-required={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <InputField
              label="Job Location"
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
              error={errors.jobLocation}
              icon={<MapPin className="h-5 w-5" />}
              aria-required={true}
            />
            {locationLoading && <p className="text-sm text-muted-foreground mt-1">Fetching current location...</p>}
            {locationError && <p className="text-sm text-red-500 mt-1">{locationError}</p>}
            {latitude && longitude && (
              <p className="text-xs text-muted-foreground mt-1">
                Auto-detected: Lat: {latitude.toFixed(4)}, Lon: {longitude.toFixed(4)}
              </p>
            )}
            <input type="hidden" name="latitude" value={latitude || ""} />
            <input type="hidden" name="longitude" value={longitude || ""} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <InputField
              label="Number of Positions"
              name="numberOfPositions"
              type="number"
              value={formData.numberOfPositions}
              onChange={handleChange}
              error={errors.numberOfPositions}
              icon={<Hash className="h-5 w-5" />}
              aria-required={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Notes</label>
            <Textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
              rows={3}
              placeholder="Any special instructions or notes..."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <InputField
              label="Contact Phone/Email"
              name="contactPhoneEmail"
              type="text" // Can be email or phone number
              value={formData.contactPhoneEmail}
              onChange={handleChange}
              error={errors.contactPhoneEmail}
              icon={<Phone className="h-5 w-5" />}
              aria-required={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full py-3 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Posting Job..." : "Post Job"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
