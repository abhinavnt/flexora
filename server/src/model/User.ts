import mongoose, { Schema, Document, Types } from 'mongoose';

export type UserRole = 'admin' | 'employer' | 'user';

export interface IUser extends Document {
  email: string;
  password: string;
  userId:string
  name: string;
  role: UserRole;
  phone?: string;
  isVerified: boolean;
  location?: {
    state?: string;
    city?: string;
    pincode?: string;
    latitude?: number;   // for geolocation filter
    longitude?: number;
  };
  skills?: string[];          // for job seekers
  experience?: string;        // e.g. "2 years in catering"
  availability?: string;      // e.g. "Weekends", "Evenings"
  businessDetails?: {         // for employers
    shopName?: string;
    businessType?: string;    // e.g. catering, retail, etc.
  };
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    linkedIn?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
     userId: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employer', 'user'], required: true },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },

    location: {
      state: { type: String },
      city: { type: String },
      pincode: { type: String },
      latitude: { type: Number },
      longitude: { type: Number }
    },

    // Job seeker-specific fields
    skills: [{ type: String }],
    experience: { type: String },
    availability: { type: String },

    // Employer-specific fields
    businessDetails: {
      shopName: { type: String },
      businessType: { type: String }
    },

    socialMediaLinks: {
      facebook: { type: String },
      instagram: { type: String },
      linkedIn: { type: String }
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
