import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Header } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { RootState } from '@/redux/store';
import { setCurrentLocation } from '@/redux/features/LocationSlice';
import { LocationModal } from '../users/home/Location-modal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const dispatch = useDispatch();

  const handleLocationSelect = (location: string) => {
    dispatch(setCurrentLocation(location));
    setIsLocationModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsLocationModalOpen={setIsLocationModalOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={currentLocation}
      />
    </div>
  );
};