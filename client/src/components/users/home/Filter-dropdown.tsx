"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal } from "lucide-react"
import { Label } from "@/components/ui/label"

interface FilterDropdownProps {
  selectedCategories: string[]
  selectedPayRanges: string[]
  onSelectCategory: (category: string) => void
  onSelectPayRange: (range: string) => void
  onClearFilters: () => void
}

const categories = [
  "Retail",
  "Food Service",
  "Logistics",
  "Customer Service",
  "Events",
  "Pet Care",
  "Admin",
  "Education",
  "Design",
]
const payRanges = ["₹100-200/day", "₹200-300/day", "₹100-200/hour", "₹200-300/hour"]

export function FilterDropdown({
  selectedCategories,
  selectedPayRanges,
  onSelectCategory,
  onSelectPayRange,
  onClearFilters,
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto bg-transparent">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {(selectedCategories.length > 0 || selectedPayRanges.length > 0) && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              {selectedCategories.length + selectedPayRanges.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-4">
        <DropdownMenuLabel className="text-lg font-semibold mb-2">Filter Jobs</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="mt-4">
          <DropdownMenuLabel className="text-base font-medium mb-2">Category</DropdownMenuLabel>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onSelectCategory(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <DropdownMenuSeparator className="my-4" />

        <div>
          <DropdownMenuLabel className="text-base font-medium mb-2">Pay Range</DropdownMenuLabel>
          <div className="grid grid-cols-1 gap-2">
            {payRanges.map((range) => (
              <div key={range} className="flex items-center space-x-2">
                <Checkbox
                  id={`pay-range-${range}`}
                  checked={selectedPayRanges.includes(range)}
                  onCheckedChange={() => onSelectPayRange(range)}
                />
                <Label htmlFor={`pay-range-${range}`} className="text-sm cursor-pointer">
                  {range}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <DropdownMenuSeparator className="my-4" />

        <Button variant="outline" onClick={onClearFilters} className="w-full text-sm bg-transparent">
          Reset Filters
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
