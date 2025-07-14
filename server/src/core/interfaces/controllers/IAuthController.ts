import { RequestHandler } from "express";


export interface IAuthController{
    register:RequestHandler
    verifyOtp:RequestHandler
    resendOtp:RequestHandler
    login:RequestHandler
    refreshToken:RequestHandler
    logout:RequestHandler
}