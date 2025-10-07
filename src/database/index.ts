import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Todolist } from "./models/todolist.model";
import { Todo } from "./models/todo.model";
import {
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE
} from '../config/config'

export const AppDataSource: DataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
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
        console.error(error);
    });
