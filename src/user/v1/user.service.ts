import { User } from "../../database/entities/user.entity";
import { findUserByUsername, createUser } from "./user.repository";
import bcrypt from "bcryptjs";

const isUsernameAvailable = async (username: string): Promise<boolean> => {
    const foundUsername = await findUserByUsername(username);

    if (foundUsername === null) {
        return true;
    }
    return false;
};

const addUser = async (username: string, password: string): Promise<User> => {
    const user = new User();
    const hashedPassword = bcrypt.hashSync(password, 10);

    user.username = username;
    user.password = hashedPassword;

    const createUserStatus = await createUser(user);

    if (createUserStatus) {
        return user;
    } else {
        return new User;
    }
};

const getUserInformation = async (username: string): Promise<User> => {
    const foundUsername = await findUserByUsername(username);

    if (foundUsername != null) {
        return foundUsername;
    }

    return new User();
};

export { isUsernameAvailable, addUser, getUserInformation };