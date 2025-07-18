import { InputField } from "@/components/ui/input-field";
import { MapPin } from "lucide-react";

export function RegistrationLocationFields({
  formData,
  handleInputChange,
  latitude,
  longitude,
}: {
  formData: any;
  handleInputChange: (field: string) => (e: any) => void;
  latitude: number | null;
  longitude: number | null;
}) {
  return (
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
  );
}
