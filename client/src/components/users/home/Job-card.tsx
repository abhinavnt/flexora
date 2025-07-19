"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, MapPin, Calendar, ArrowRight } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { Link } from "react-router-dom"

interface Job {
  id: string
  title: string
  employer: string
  pay: string
  location: string
  dateTime: string
  category: string
  payRange: string
}

interface JobCardProps {
  job: Job
  variants: Variants
}

export function JobCard({ job, variants }: JobCardProps) {
  return (
    <motion.div variants={variants}>
      <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
          <CardDescription className="text-muted-foreground">{job.employer}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{job.pay}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{job.dateTime}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link to={`/jobs/${job.id}`}>
              View Details
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
