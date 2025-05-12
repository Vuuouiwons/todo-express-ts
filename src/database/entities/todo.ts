import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Todolist } from "./todolist"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("text")
    description!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date

    @ManyToOne(type => Todolist, todolist => todolist.todo)
    todolist!: Todolist
}