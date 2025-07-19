// src/hooks/useRegistrationForm.ts

import { useEffect, useState } from "react";
import { useFormValidation, type ValidationRules } from "../useFormValidation";
import { useLocation } from "../useLocation";
import type { RegistrationFormData, UserType } from "@/types/auth";




const validationRules: ValidationRules = {
  name: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { required: true, minLength: 6 },
};

export function useRegistrationForm(onSubmit: (data: RegistrationFormData & { userType: UserType }) => Promise<void>) {
  const [userType, setUserType] = useState<UserType>("user");

  const { latitude, longitude, error: locationError } = useLocation();
  const { errors, validateForm, handleFieldChange, handleFieldBlur } = useFormValidation(validationRules);

  const [formData, setFormData] = useState<RegistrationFormData>(() =>
    getInitialFormData(userType, latitude, longitude)
  );

  useEffect(() => {
    if (latitude && longitude) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          latitude,
          longitude,
        },
      }));
    }
  }, [latitude, longitude]);

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;

      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: value,
          },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }

      if (["name", "email", "password"].includes(field)) {
        handleFieldChange(field, value);
      }
    };

  const handleInputBlur =
    (field: string) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (["name", "email", "password"].includes(field)) {
        handleFieldBlur(field, e.target.value);
      }
    };

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setFormData(getInitialFormData(type, latitude, longitude));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData as { [key: string]: string })) {
      await onSubmit({ ...formData, userType });
    }
  };

  return {
    formData,
    userType,
    errors,
    locationError,
    handleSubmit,
    handleInputChange,
    handleInputBlur,
    handleUserTypeChange,
  };
}

function getInitialFormData(userType: UserType, latitude: number | null, longitude: number | null): RegistrationFormData {
  const base = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: userType,
  };

  const location = { state: "", city: "", pincode: "", latitude, longitude };

  if (userType === "user") {
    return {
      ...base,
      skills: "",
      experience: "",
      availability: "",
      location,
    };
  } else {
    return {
      ...base,
      businessDetails: { shopName: "", businessType: "" },
      location,
    };
  }
}
