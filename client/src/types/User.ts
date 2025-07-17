export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string; 
  updatedAt: string;  

  // Common User Fields
  skills?: string[];
  experience?: string;
  availability?: string;
  phone?: string;
  location?: {
    state?: string;
    city?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
  };

  // Employer Specific Fields (Optional)
  businessDetails?: {
    shopName?: string;
    businessType?: string;
  };
}
