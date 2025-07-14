import { IUser } from "../../../model/User";


export interface IUserRepository {
  create(data: Partial<IUser>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
//   findByPhone(phone: string): Promise<IUser | null>;
  findByUserId(userId: string): Promise<IUser | null>;
  updateUser(userId: string, data: Partial<IUser>): Promise<IUser | null>
}