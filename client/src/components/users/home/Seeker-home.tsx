"use client";

import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, ChevronDown, ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ThemeProvider } from "@/hooks/ThemeProvider";
import { JobCard } from "./Job-card";
import { Link } from "react-router-dom";
import type { RootState } from '@/redux/store';

// Unchanged: Mock Job Data
const mockJobs = [
  {
    id: "1",
    title: "Retail Sales Associate",
    employer: "Fashion Hub",
    pay: "₹150/hour",
    location: "Kochi, Kerala",
    dateTime: "Full-time, Mon-Fri",
    category: "Retail",
    payRange: "₹100-200/hour",
  },
  {
    id: "2",
    title: "Barista",
    employer: "Coffee Corner",
    pay: "₹1200/day",
    location: "Thiruvananthapuram, Kerala",
    dateTime: "Part-time, Weekends",
    category: "Food Service",
    payRange: "₹1000-2000/day",
  },
  {
    id: "3",
    title: "Delivery Driver",
    employer: "Quick Eats",
    pay: "₹200/hour + tips",
    location: "Kozhikode, Kerala",
    dateTime: "Flexible hours",
    category: "Logistics",
    payRange: "₹200-300/hour",
  },
  {
    id: "4",
    title: "Customer Service Rep",
    employer: "Tech Support Inc.",
    pay: "₹180/hour",
    location: "Remote (India)",
    dateTime: "Part-time, Evenings",
    category: "Customer Service",
    payRange: "₹100-200/hour",
  },
  {
    id: "5",
    title: "Event Staff",
    employer: "City Events Co.",
    pay: "₹1500/event",
    location: "Thrissur, Kerala",
    dateTime: "Weekends, On-call",
    category: "Events",
    payRange: "₹1000-2000/day",
  },
  {
    id: "6",
    title: "Dog Walker",
    employer: "Paws & Claws",
    pay: "₹250/walk",
    location: "Alappuzha, Kerala",
    dateTime: "Flexible, Mornings",
    category: "Pet Care",
    payRange: "₹200-300/hour",
  },
  {
    id: "7",
    title: "Data Entry Clerk",
    employer: "Data Solutions",
    pay: "₹160/hour",
    location: "Remote (India)",
    dateTime: "Part-time, Weekdays",
    category: "Admin",
    payRange: "₹100-200/hour",
  },
  {
    id: "8",
    title: "Tutor",
    employer: "LearnSmart",
    pay: "₹300/hour",
    location: "Online (India)",
    dateTime: "Flexible",
    category: "Education",
    payRange: "₹200-300/hour",
  },
  {
    id: "9",
    title: "Housekeeping Staff",
    employer: "Clean Homes",
    pay: "₹1000/day",
    location: "Kochi, Kerala",
    dateTime: "Full-time, Mon-Sat",
    category: "Food Service",
    payRange: "₹1000-2000/day",
  },
  {
    id: "10",
    title: "Graphic Designer",
    employer: "Creative Minds",
    pay: "₹250/hour",
    location: "Thiruvananthapuram, Kerala",
    dateTime: "Part-time, Project-based",
    category: "Design",
    payRange: "₹200-300/hour",
  },
];

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
];
const payRanges = ["₹100-200/day", "₹200-300/day", "₹100-200/hour", "₹200-300/hour"];

export default function JobSeekerHomePage() {
  return (
    <ThemeProvider>
      <JobSeekerHomeContent />
    </ThemeProvider>
  );
}

function JobSeekerHomeContent() {
  const userName = "John";
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPayRanges, setSelectedPayRanges] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSelectPayRange = (range: string) => {
    setSelectedPayRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedPayRanges([]);
  };

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.employer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);
      const matchesPayRange = selectedPayRanges.length === 0 || selectedPayRanges.includes(job.payRange);
      const matchesLocation = job.location.includes(currentLocation) || job.location.includes("Remote (India)");

      return matchesSearch && matchesCategory && matchesPayRange && matchesLocation;
    });
  }, [searchQuery, selectedCategories, selectedPayRanges, currentLocation]);

  // Unchanged: Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 text-center bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 dark:opacity-5"
            style={{
              backgroundImage: `url("/placeholder.svg?height=200&width=200")`,
              backgroundSize: "100px 100px",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-balance"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi {userName}!
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Find part-time jobs near you.
            </motion.p>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-muted/50 dark:bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <div className="relative flex-1 w-full md:max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by job title, employer, or location..."
                  className="w-full pl-10 pr-4 py-2 rounded-md shadow-sm focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Collapsible
                open={isMobileFiltersOpen}
                onOpenChange={setIsMobileFiltersOpen}
                className="w-full md:hidden"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {(selectedCategories.length > 0 || selectedPayRanges.length > 0) && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                        {selectedCategories.length + selectedPayRanges.length}
                      </span>
                    )}
                    <ChevronDown
                      className={`h-4 w-4 ml-2 transition-transform ${isMobileFiltersOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 bg-background border rounded-md shadow-lg p-4 z-10">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-base mb-2">Category</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge
                            key={category}
                            variant={selectedCategories.includes(category) ? "default" : "secondary"}
                            className="cursor-pointer px-3 py-1.5 hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleSelectCategory(category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-2">Pay Range</h3>
                      <div className="flex flex-wrap gap-2">
                        {payRanges.map((range) => (
                          <Badge
                            key={range}
                            variant={selectedPayRanges.includes(range) ? "default" : "secondary"}
                            className="cursor-pointer px-3 py-1.5 hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleSelectPayRange(range)}
                          >
                            {range}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleClearFilters} className="w-full bg-transparent">
                      Reset Filters
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-8">
            <div className="hidden md:block sticky top-24 h-fit p-4 border rounded-lg shadow-sm bg-background">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-base mb-2">Category</h3>
                  <div className="grid gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`desktop-category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleSelectCategory(category)}
                        />
                        <Label htmlFor={`desktop-category-${category}`} className="text-sm cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">Pay Range</h3>
                  <div className="grid gap-2">
                    {payRanges.map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox
                          id={`desktop-pay-range-${range}`}
                          checked={selectedPayRanges.includes(range)}
                          onCheckedChange={() => handleSelectPayRange(range)}
                        />
                        <Label htmlFor={`desktop-pay-range-${range}`} className="text-sm cursor-pointer">
                          {range}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline" onClick={handleClearFilters} className="w-full bg-transparent">
                  Reset Filters
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Available Jobs</h2>
              {filteredJobs.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {filteredJobs.slice(0, 6).map((job) => (
                    <JobCard key={job.id} job={job} variants={itemVariants} />
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-muted-foreground text-lg">No jobs found matching your criteria.</p>
              )}
              {filteredJobs.length > 6 && (
                <div className="flex justify-center mt-8">
                  <Button asChild variant="outline" size="lg">
                    <Link to="/jobs">
                      Explore All Jobs
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}