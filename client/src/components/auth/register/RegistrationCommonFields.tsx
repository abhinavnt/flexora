import { InputField } from "@/components/ui/input-field";
import { Mail, Lock, User, Phone } from "lucide-react";

export function RegistrationCommonFields({
  formData,
  handleInputChange,
  handleInputBlur,
  errors,
}: {
  formData: any;
  handleInputChange: (field: string) => (e: any) => void;
  handleInputBlur: (field: string) => (e: any) => void;
  errors: any;
}) {
  return (
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
  );
}
