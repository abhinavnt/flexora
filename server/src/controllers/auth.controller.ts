import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";
import { IAuthService } from "../core/interfaces/services/IAuthService";
import { TYPES } from "../di/types";
import { inject, injectable } from "inversify";
import { IAuthController } from "../core/interfaces/controllers/IAuthController";
import { UserRegistrationRequestDto } from "../dto/request/UserRegistrationRequest";
import { EmployerRegistrationRequestDto } from "../dto/request/OrganizerRegistrationRequest";

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {}

  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { role } = req.query;
    let dto: EmployerRegistrationRequestDto | UserRegistrationRequestDto;
     console.log(req.body,"body from the controller");
     
    if (role === "employer") {
      dto = new EmployerRegistrationRequestDto(req.body);
    } else if (role === "user") {
      dto = new UserRegistrationRequestDto(req.body);
    } else {
      throw new Error("Invalid role specified");
    }

    await this.authService.register(dto);
    res.status(201).json({ message: "Registration initiated, OTP sent" });
    res.status(200).json();
  });

  verifyOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new Error("Email and OTP are required");
    }

    const response = await this.authService.verifyOtp(email, otp);

    const { refreshToken, ...newUser } = response;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json(newUser);
  });

  resendOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    await this.authService.resendOtp(email);

    res.status(200).json({ message: "otp resend to your email" });
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const { refreshToken, ...user } = await this.authService.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json(user);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) res.status(403).json({ error: "Refresh tokekn required" });
    const { accessToken, user } = await this.authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken, user });
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  });
}
