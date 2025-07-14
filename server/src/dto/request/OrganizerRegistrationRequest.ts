import { HttpError } from "../../types/HttpError";

export class EmployerRegistrationRequestDto {
  email: string;
  password: string;
  name: string;
  role: string = "employer";
  phone?: string;
  businessDetails?: {
    shopName?: string;
    businessType?: string;
  };
  location?: {
    state?: string;
    city?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
  };

  constructor(data: any) {
    if (!data.data.email || !data.data.password || !data.data.name) {
      throw new HttpError(400, "Missing required fields");
    }
    this.email = data.data.email;
    this.password = data.data.password;
    this.name = data.data.name;
    this.phone = data.data.phone;
    this.businessDetails = data.data.businessDetails;
    this.location = data.data.location;
  }
}