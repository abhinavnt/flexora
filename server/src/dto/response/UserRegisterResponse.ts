export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
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

  constructor(data: any) {
    this.id = data.userId;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.skills = data.skills || [];
    this.experience = data.experience;
    this.availability = data.availability;
    this.phone = data.phone;
    this.location = data.location || {};
  }
}


export class EmployerResponseDto extends UserResponseDto {
  businessDetails?: {
    shopName?: string;
    businessType?: string;
  };

  constructor(data: any) {
    super(data);
    this.businessDetails = data.businessDetails || {};
  }
}