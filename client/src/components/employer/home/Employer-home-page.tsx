"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { JobCard } from "./My-job-card";
import { Link } from "react-router-dom";

type Job = {
  id: string;
  title: string;
  applicants: number;
  status: "Active" | "Closed";
};

// Unchanged: Mock data
const mockJobs: Job[] = [
  { id: "1", title: "Evening Shift Cook", applicants: 12, status: "Active" },
  { id: "2", title: "Weekend Event Staff", applicants: 8, status: "Active" },
  { id: "3", title: "Delivery Driver (Part-time)", applicants: 25, status: "Closed" },
  { id: "4", title: "Dishwasher", applicants: 5, status: "Active" },
  { id: "5", title: "Catering Assistant", applicants: 18, status: "Active" },
];

export default function EmployerHomePage() {
  // Changed: Removed isLocationModalOpen, currentLocation, and handleLocationChange

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    // Changed: Removed Header, Footer, and LocationModal as they are in Layout
    <div className="flex flex-col">
      <main className="flex-1 container py-8 px-4 md:px-6">
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

        <section className="relative pb-20 md:pb-0">
          <h2 className="text-2xl font-semibold mb-6">Your Posted Jobs</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {mockJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>

          <div className="fixed bottom-4 right-4 md:static md:mt-8 md:flex md:justify-center">
            <Link to='postjob'>
            <Button size="lg" className="w-auto px-6 py-3 text-lg shadow-lg md:w-fit">
              <Plus className="h-5 w-5 mr-2" />
              Post a Job
            </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}