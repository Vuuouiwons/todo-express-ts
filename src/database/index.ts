import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/user"
import { Todolist } from "./entities/todolist";
import { Todo } from "./entities/todo";

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    synchronize: true,
    logging: true,
    entities: [User, Todolist, Todo],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("OK");
    })
    .catch((error) => {
        console.log(error);
    });