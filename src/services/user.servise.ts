import User from "../models/user_model";

export class userService {
    public async getAllUsers(): Promise <User[]> {
        return await User.findAll();
    }
}