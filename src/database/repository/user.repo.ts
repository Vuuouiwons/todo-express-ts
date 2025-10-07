import { AppDataSource } from "../index";
import { User } from "../models/user.model";

const userRepository = AppDataSource.getRepository(User);

const findUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const user = await userRepository.findOneBy({ username: username });
        return user;

    } catch (e) {
        throw e;
    }

};

const createUser = async (userData: Partial<User>): Promise<User> => {
    try {
        const user = await userRepository.save(userData);
        return user;
    } catch (e) {
        throw e;
    }
}

export { findUserByUsername, createUser }