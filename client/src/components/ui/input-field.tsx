"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className = "", label, error, icon, ...props }, ref) => {
    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
          <input
            className={`
              w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-800 rounded-lg
              bg-white dark:bg-black text-black dark:text-white
              focus:ring-2 focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white
              transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
              ${className}
            `}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    )
  },
)

InputField.displayName = "InputField"
export { InputField }
