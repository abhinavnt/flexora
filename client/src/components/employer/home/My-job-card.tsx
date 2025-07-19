"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

type Job = {
  id: string
  title: string
  applicants: number
  status: "Active" | "Closed"
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          {job.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Applicants: {job.applicants}</span>
        </div>
        <div
          className={`text-sm font-medium ${job.status === "Active" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          Status: {job.status}
        </div>
        <Button
          asChild
          variant="outline"
          className="w-full mt-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors bg-transparent"
        >
          <Link to={`/jobs/${job.id}/manage`} className="flex items-center justify-center gap-2">
            Manage <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
