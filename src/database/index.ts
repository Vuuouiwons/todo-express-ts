import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../v1/user/entity/user.entity"
import { Todolist } from "../v1/todolist/entity/todolist.entity";
import { Todo } from "../v1/todo/entity/todo.entity";

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: `${process.env.DB_HOST}`,
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
        console.log("Database Initalization OK!");
    })
    .catch((error) => {
        console.log(error);
    });