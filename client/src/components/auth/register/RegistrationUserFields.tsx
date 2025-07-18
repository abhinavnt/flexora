
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { Briefcase, Clock } from "lucide-react";

const availabilityOptions = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "evenings", label: "Evenings" },
  { value: "flexible", label: "Flexible" },
  { value: "full-time", label: "Full Time" },
];

export function RegistrationUserFields({
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
          label="Skills (Optional)"
          type="text"
          value={formData.skills}
          onChange={handleInputChange("skills")}
          icon={<Briefcase className="h-4 w-4" />}
          placeholder="e.g., JavaScript, Design, Marketing"
        />
        <InputField
          label="Experience (Optional)"
          type="text"
          value={formData.experience}
          onChange={handleInputChange("experience")}
          icon={<Clock className="h-4 w-4" />}
          placeholder="e.g., 2 years, Entry level"
        />
      </div>
      <SelectField
        label="Availability (Optional)"
        value={formData.availability}
        onChange={handleInputChange("availability")}
        options={availabilityOptions}
      />
    </div>
  );
}
