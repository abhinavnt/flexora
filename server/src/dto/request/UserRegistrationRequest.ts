export class UserRegistrationRequestDto {
  email: string;
  password: string;
  role: string = "user";
  name: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  availability?: string;
  location?: {
    state?: string;
    city?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
  };

  constructor(dto: any) {
    if (!dto.data.email || !dto.data.password || !dto.data.name) {
      throw new Error("Missing required fields");
    }
    this.email = dto.data.email;
    this.password = dto.data.password;
    this.name = dto.data.name;
    this.phone = dto.data.phone;
    this.skills = dto.data.skills;
    this.experience = dto.data.experience;
    this.availability = dto.data.availability;
    this.location = dto.data.location;
  }
}