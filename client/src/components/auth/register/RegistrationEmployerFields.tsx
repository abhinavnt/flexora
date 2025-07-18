
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { Building2 } from "lucide-react";

const businessTypeOptions = [
  { value: "retail", label: "Retail" },
  { value: "restaurant", label: "Restaurant" },
  { value: "service", label: "Service" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "other", label: "Other" },
];

export function RegistrationEmployerFields({
  formData,
  handleInputChange,
}: {
  formData: any;
  handleInputChange: (field: string) => (e: any) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Shop/Business Name (Optional)"
          type="text"
          value={formData.businessDetails.shopName}
          onChange={handleInputChange("businessDetails.shopName")}
          icon={<Building2 className="h-4 w-4" />}
          placeholder="Enter your business name"
        />
        <SelectField
          label="Business Type (Optional)"
          value={formData.businessDetails.businessType}
          onChange={handleInputChange("businessDetails.businessType")}
          options={businessTypeOptions}
        />
      </div>
    </div>
  );
}
