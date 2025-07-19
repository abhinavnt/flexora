"use client";

import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/ThemeProvider";
import { Briefcase, MapPin, User, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import type { RootState } from '@/redux/store';

interface HeaderProps {
  setIsLocationModalOpen: (isOpen: boolean) => void;
}

export function Header({ setIsLocationModalOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm px-4 md:px-6 py-3 flex items-center justify-between">
      <Link to='' className="flex items-center gap-2 font-bold text-lg md:text-xl">
        <Briefcase className="h-6 w-6 text-primary" />
        <span>Flexora</span>
      </Link>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => setIsLocationModalOpen(true)}
        >
          <MapPin className="h-4 w-4 mr-2" />
          {currentLocation}
        </Button>
        <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setIsLocationModalOpen(true)}>
          <MapPin className="h-5 w-5" />
          <span className="sr-only">Change Location</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}