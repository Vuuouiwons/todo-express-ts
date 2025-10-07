import bcrypt from "bcryptjs";

import { findUserByUsername, createUser } from '../../database/repository/user.repo';
import { User } from '../../database/models/user.model';
import { UsernameExistsError, UsernameDoesNotExistsError, CredentialError } from "../../errors/400";
import { DatabaseError } from "../../errors/500";
import { generateJWT } from '../../helper/jwt';

export async function register(username: string, password: string): Promise<null> {
    const user: User | null = await findUserByUsername(username);

    if (user != null) {
        throw new UsernameExistsError('username exist');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userData = {
        username,
        'password': hashedPassword
    }

    try {
        await createUser(userData);
    } catch (error) {
        throw new DatabaseError('something went wrong while writing to database');
    }

    return null;
}

export async function login(username: string, password: string): Promise<string> {
    const user: User | null = await findUserByUsername(username);

    if (user == null) {
        throw new CredentialError('username or password invalid');
    }

    const hashedPassword: string = user.password;

    if (!bcrypt.compareSync(password, hashedPassword)) {
        throw new CredentialError('username or password invalid');
    }

    const userId = user.id;
    const token = generateJWT(userId);

    return token;
}