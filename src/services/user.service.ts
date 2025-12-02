import User from "../models/user_model";

export default class userService {
    public async getAllUsers(): Promise<User[]> {
        return await User.findAll();
    }
}