import { Repository } from "typeorm";

import { AppDataSource } from "../index";
import { User } from "../models/user.model";

const userRepository = AppDataSource.getRepository(User);

export interface UserRepoInterface {
    findUserByUsername(username: string): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
}

export class UserRepo implements UserRepoInterface {
    private userRepository: Repository<User>;

    constructor(userRepositoryInject: Repository<User> | null = null) {
        this.userRepository = userRepositoryInject ? userRepositoryInject : AppDataSource.getRepository(User);
    }

    public async findUserByUsername(username: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOneBy({ username: username });
            return user;

        } catch (e) {
            throw e;
        }
    }

    public async createUser(userData: Partial<User>): Promise<User> {
        try {
            const user = await this.userRepository.save(userData);
            return user;
        } catch (e) {
            throw e;
        }
    }
}
