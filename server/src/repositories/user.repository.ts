import { BaseRepository } from "../core/abstracts/base.repository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { IUser, User } from "../model/User";




export class UserRepository extends BaseRepository<IUser> implements IUserRepository{
   constructor(){
    super(User)
   }

   create(data: Partial<IUser>): Promise<IUser> {
       return this.model.create(data)
   }

   findByEmail(email: string): Promise<IUser | null> {
       return this.model.findOne({email})
   }

   findByUserId(userId: string): Promise<IUser | null> {
       return this.model.findOne({userId})
   }

   updateUser(userId: string, data: Partial<IUser>): Promise<IUser | null> {
        return this.model.findOneAndUpdate({ userId },     
    data,
    { new: true } )
   }

}