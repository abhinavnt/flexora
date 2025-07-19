"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { motion, type Variants } from "framer-motion" // Import motion from framer-motion
import { Header } from "@/components/layout/Navbar"
import { JobCard } from "./My-job-card"
import { Footer } from "@/components/layout/Footer"

type Job = {
  id: string
  title: string
  applicants: number
  status: "Active" | "Closed"
}

const mockJobs: Job[] = [
  { id: "1", title: "Evening Shift Cook", applicants: 12, status: "Active" },
  { id: "2", title: "Weekend Event Staff", applicants: 8, status: "Active" },
  { id: "3", title: "Delivery Driver (Part-time)", applicants: 25, status: "Closed" },
  { id: "4", title: "Dishwasher", applicants: 5, status: "Active" },
  { id: "5", title: "Catering Assistant", applicants: 18, status: "Active" },
]

export default function EmployerHomePage() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("New York, NY") // Example state for location

  // Dummy function for location modal, replace with actual modal logic
  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation)
    setIsLocationModalOpen(false)
  }

  // Animation variants for staggered appearance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header currentLocation={currentLocation} setIsLocationModalOpen={setIsLocationModalOpen} />

      <main className="flex-1 container py-8 px-4 md:px-6">
        {/* Hero Section with animation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 md:py-20"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Welcome, Acme Corp!</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Post and manage your part-time jobs easily.
          </p>
        </motion.section>

        {/* Job Management Section with staggered animation */}
        <section className="relative pb-20 md:pb-0">
          <h2 className="text-2xl font-semibold mb-6">Your Posted Jobs</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Animate when 30% of the element is in view
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {mockJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>

          {/* Post a Job Button (Floating on Mobile) */}
          <div className="fixed bottom-4 right-4 md:static md:mt-8 md:flex md:justify-center">
            <Button size="lg" className="w-auto px-6 py-3 text-lg shadow-lg md:w-fit">
              <Plus className="h-5 w-5 mr-2" />
              Post a Job
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Example Location Modal (can be replaced with shadcn/ui Dialog) */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Change Location</h3>
            <p>Location modal content goes here.</p>
            <Button onClick={() => handleLocationChange("New Location")}>Save</Button>
            <Button variant="ghost" onClick={() => setIsLocationModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
