import { User } from "../../database/entities/user";


const userMap = (user: User) => {
    let username = user.username;
    let createdAt = user.createdAt;
    let updatedAt = user.updatedAt;

    return {
        username,
        createdAt,
        updatedAt
    }
}

export { userMap };