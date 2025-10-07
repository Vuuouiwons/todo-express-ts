import bcrypt from "bcryptjs";

import { } from '../../database/repository/user.repo';
import { User } from '../../database/models/user.model';
import { UsernameExistsError, UsernameDoesNotExistsError, CredentialError } from "../../errors/400";
import { DatabaseError } from "../../errors/500";
import { generateJWT } from '../../helper/jwt';
import { UserRepo, UserRepoInterface } from "../../database/repository/user.repo";

export interface AuthServiceInterface {
    register(username: string, password: string): Promise<null>
    login(username: string, password: string): Promise<string>
}

export class AuthService implements AuthServiceInterface {
    private userRepo: UserRepoInterface

    constructor(userRepoInject: UserRepo | null = null) {
        this.userRepo = userRepoInject ? userRepoInject : new UserRepo()
    }

    public async register(username: string, password: string): Promise<null> {
        const user: User | null = await this.userRepo.findUserByUsername(username);

        if (user != null) {
            throw new UsernameExistsError('username exist');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const userData = {
            username,
            'password': hashedPassword
        }

        try {
            await this.userRepo.createUser(userData);
        } catch (error) {
            throw new DatabaseError('something went wrong while writing to database');
        }

        return null;
    }

    public async login(username: string, password: string): Promise<string> {
        const user: User | null = await this.userRepo.findUserByUsername(username);

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
}