"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  currentLocation: string;
}

// Unchanged: Dummy data
const dummyLocations = [
  "Kochi, Kerala",
  "Thiruvananthapuram, Kerala",
  "Kozhikode, Kerala",
  "Thrissur, Kerala",
  "Kannur, Kerala",
  "Alappuzha, Kerala",
  "Kottayam, Kerala",
  "Palakkad, Kerala",
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bengaluru, Karnataka",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Chandigarh, Punjab",
];

// Changed: No significant logic changes, just ensuring it works with Layout
export function LocationModal({ isOpen, onClose, onLocationSelect, currentLocation }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [locations, setLocations] = useState<string[]>(dummyLocations);

  useEffect(() => {
    if (isOpen) {
      setLocations(dummyLocations.filter((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [isOpen, searchQuery]);

  const handleConfirm = () => {
    onLocationSelect(selectedLocation);
    onClose();
  };

  // Unchanged: Rest of the component logic
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>Change Location</DialogTitle>
          <DialogDescription>Select a new location or search for one.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
            {locations.length > 0 ? (
              locations.map((loc) => (
                <Badge
                  key={loc}
                  variant={selectedLocation === loc ? "default" : "secondary"}
                  className="cursor-pointer px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedLocation(loc)}
                >
                  {loc}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No locations found.</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedLocation}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}