import { Container } from "inversify"
import { UserRepository } from "../repositories/user.repository"
import { TYPES } from "./types"
import { IUserRepository } from "../core/interfaces/repository/IUserRepository"
import { IAuthService } from "../core/interfaces/services/IAuthService"
import { AuthService } from "../services/auth.service"
import { IAuthController } from "../core/interfaces/controllers/IAuthController"
import { AuthController } from "../controllers/auth.controller"















const container=new Container()

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(TYPES.AuthController).to(AuthController)



export default container