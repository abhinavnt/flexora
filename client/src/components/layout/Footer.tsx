"use client"

import { Link } from "react-router-dom"


export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t bg-background text-muted-foreground">
      <p className="text-sm">&copy; {new Date().getFullYear()} Flexora. All rights reserved.</p>
      <nav className="flex gap-4 text-sm">
        <Link to='' className="hover:underline underline-offset-4">
          Contact
        </Link>
        <Link to='' className="hover:underline underline-offset-4">
          About
        </Link>
        <Link to='' className="hover:underline underline-offset-4">
          Privacy
        </Link>
      </nav>
    </footer>
  )
}
