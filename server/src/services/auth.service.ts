import { inject, injectable } from "inversify";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { TYPES } from "../di/types";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { UserRegistrationRequestDto } from "../dto/request/UserRegistrationRequest";
import bcrypt, { hash } from "bcryptjs";
import { RedisClient } from "../config/redis";
import { sendOtpEmail } from "../utils/emailService";
import { UserResponseDto,  EmployerResponseDto } from "../dto/response/UserRegisterResponse";
import { IUser } from "../model/User";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/tokenService";
import { HttpError } from "../types/HttpError";
import { EmployerRegistrationRequestDto } from "../dto/request/OrganizerRegistrationRequest";

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}




  //register 
async register(data: EmployerRegistrationRequestDto | UserRegistrationRequestDto): Promise<void> {
  const existingUser = await this.userRepository.findByEmail(data.email);
  if (existingUser) {
    throw new HttpError(400, "Email already exists");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await sendOtpEmail(data.email, otp);
  await RedisClient.setex(`otp:${data.email}`, 150, JSON.stringify({ otp }));

  const sessionData: Record<string, any> = {
    name: data.name,
    email: data.email,
    hashedPassword,
    role: data.role,
    phone: data.phone,
    location: data.location,
  };

  if (data instanceof EmployerRegistrationRequestDto) {
    sessionData.businessDetails = data.businessDetails;
  } else if (data instanceof UserRegistrationRequestDto) {
    sessionData.skills = data.skills;
    sessionData.experience = data.experience;
    sessionData.availability = data.availability;
  }

  await RedisClient.setex(`user_session:${data.email}`, 600, JSON.stringify(sessionData));
}





  //verify otp
async verifyOtp(email: string, otp: string): Promise<{ accessToken: string; refreshToken: string; user: UserResponseDto | EmployerResponseDto }> {
  const otpData = await RedisClient.get(`otp:${email}`);
  if (!otpData) throw new HttpError(400, "OTP expired or invalid");

  const { otp: storedOtp } = JSON.parse(otpData);
  if (otp !== storedOtp) throw new HttpError(400, "Invalid OTP");

  const userData = await RedisClient.get(`user_session:${email}`);
  if (!userData) throw new HttpError(400, "User data not found. Please register again");

  const parsedData = JSON.parse(userData);
  const userId = uuidv4();

  let userCreateData: Partial<IUser>;

  if (parsedData.role === "employer") {
    userCreateData = {
      email: parsedData.email,
      password: parsedData.hashedPassword,
      name: parsedData.name,
      role: "employer",
      userId,
      businessDetails: parsedData.businessDetails,
      phone: parsedData.phone,
      location: parsedData.location,
    };
  } else if (parsedData.role === "user") {
    userCreateData = {
      email: parsedData.email,
      password: parsedData.hashedPassword,
      name: parsedData.name,
      role: "user",
      userId,
      skills: parsedData.skills,
      experience: parsedData.experience,
      availability: parsedData.availability,
      phone: parsedData.phone,
      location: parsedData.location,
    };
  } else {
    throw new HttpError(400, "Invalid role in session data");
  }

  const user = await this.userRepository.create(userCreateData);
  if (!user) throw new HttpError(500, "Cannot create user. Please register again");

  const accessToken = generateToken({ userId: user.userId, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");
  const refreshToken = generateToken({ userId: user.userId, role: user.role }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", "7d");

  await RedisClient.del(`otp:${email}`);
  await RedisClient.del(`user_session:${email}`);

  let userDto: UserResponseDto | EmployerResponseDto;
  if (user.role === "employer") {
    userDto = new EmployerResponseDto(user);
  } else {
    userDto = new UserResponseDto(user);
  }

  return { accessToken, refreshToken, user: userDto };
}




//resed otp 
  async resendOtp(email: string): Promise<void> {
    const user = await RedisClient.get(`user_session:${email}`);
    if (!user) throw new HttpError(400,"user session expired please register again");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOtpEmail(email, otp);

    await RedisClient.setex(`otp:${email}`, 120, JSON.stringify({ otp }));
  }



  //login service
  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: UserResponseDto | EmployerResponseDto }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpError(400,"User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(400,"Invalid password");
    }

    const accessToken = generateToken({ userId: user.userId, role: user.role }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");

    const refreshToken = generateToken({ userId: user.userId, role: user.role }, process.env.REFRESH_TOKEN_SECRET || "refresh_secret", "7d");

    // Create appropriate response DTO based on role
    let userDto: UserResponseDto | EmployerResponseDto;
    if (user.role === "employer") {
      userDto = new EmployerResponseDto(user);
    } else {
      userDto = new UserResponseDto(user);
    }

    return { accessToken, refreshToken, user: userDto };
  }




  //refresh token
  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; user: UserResponseDto | EmployerResponseDto }> {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
      userId: string;
      role: string;
    };

    const userId = decoded.userId;
    const userRole = decoded.role;

   

    
    const user = await this.userRepository.findByUserId(decoded.userId);

    if (!user) {
      throw new Error("cannot find user please try again");
    }

    const accessToken = generateToken({ userId, userRole }, process.env.ACCESS_TOKEN_SECRET || "secret", "60m");


    let userDto: UserResponseDto | EmployerResponseDto;
    if (user.role === "employer") {
      userDto = new EmployerResponseDto(user);
    } else {
      userDto = new UserResponseDto(user);
    }

    return { accessToken, user: userDto };
  }
}
