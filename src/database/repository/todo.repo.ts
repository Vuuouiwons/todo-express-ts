import { AppDataSource } from "../index";
import { User } from "../models/user.model";
import { Todolist } from "../models/todolist.model";
import { Todo } from '../models/todo.model';

const todolistRepository = AppDataSource.getRepository(Todo);

