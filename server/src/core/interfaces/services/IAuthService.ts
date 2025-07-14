import { OrganizerRegistrationRequestDto } from "../../../dto/request/OrganizerRegistrationRequest";
import { UserRegistrationRequestDto } from "../../../dto/request/UserRegistrationRequest";
import { OrganizerResponseDto, UserResponseDto } from "../../../dto/response/UserRegisterResponse";

export interface IAuthService {
  register(data: OrganizerRegistrationRequestDto | UserRegistrationRequestDto): Promise<void>;
  verifyOtp(
    email: string,
    otp: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponseDto | OrganizerResponseDto;
  }>;
  resendOtp(email: string):Promise<void>
  login(email: string, password: string):Promise<{ accessToken: string; refreshToken: string; user: UserResponseDto|OrganizerResponseDto }>
  refreshAccessToken(refreshToken: string):Promise<{ accessToken: string;user: UserResponseDto|OrganizerResponseDto }>
  // sendMagicLink(email: string):Promise<void>
  // resetPassword(token: string, newPassword: string):Promise<void>
  // handleGoogleUser(googleData: {googleId: string;email: string;name: string;profilepic: string;}): Promise<verifiedUer>;
}
