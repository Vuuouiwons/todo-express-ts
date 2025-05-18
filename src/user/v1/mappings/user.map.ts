import { User } from "../../../database/entities/user.entity";

const userMap = (user: User) => {
    const username = user.username;
    const createdAt = user.createdAt;
    const updatedAt = user.updatedAt;

    return {
        username,
        createdAt,
        updatedAt
    }
}

export { userMap };