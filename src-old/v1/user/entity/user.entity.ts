import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Todolist } from "../../todolist/entity/todolist.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 24, unique: true })
    username!: string

    @Column("text")
    password!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date

    @OneToMany(type => Todolist, todolist => todolist.user)
    todolist!: Todolist[] | number
}
