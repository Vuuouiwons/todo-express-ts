import { promises } from "dns";
import { AppDataSource } from "../database";
import { User } from "../database/entities/user";

const userRepository = AppDataSource.getRepository(User);

const findUserByUsername = async (username: string): Promise<User | null> => {
    const user = await userRepository.findOneBy({ username: username });

    return user;
};

const createUser = async (userData: Partial<User>): Promise<boolean> => {
    const user = await userRepository.save(userData);

    if (user.id != undefined) {
        return true;
    }

    return false;
}

export { findUserByUsername, createUser }