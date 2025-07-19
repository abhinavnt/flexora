
import { useState } from "react"
import { useFormValidation, type ValidationRules } from "../../hooks/useFormValidation"
import type { LoginFormData } from "@/types/auth"

const validationRules: ValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
}



export function useLoginForm(onSubmit: (data: LoginFormData) => Promise<void>) {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" })
  const { errors, validateForm, handleFieldChange, handleFieldBlur } = useFormValidation(validationRules)

  const handleInputChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
    handleFieldChange(field, value)
  }

  const handleInputBlur = (field: keyof LoginFormData) => (e: React.FocusEvent<HTMLInputElement>) => {
    handleFieldBlur(field, e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm({ ...formData })) {
      await onSubmit(formData)
    }
  }

  return {
    formData,
    errors,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
  }
}
