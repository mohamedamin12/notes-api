import { Folder } from "src/folders/entities/folder.entity";
import { Note } from "src/notes/entities/note.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ unique: true, nullable: false, length: 30 })
    username: string;
    @Column({ unique: true, nullable: false, length: 100 })
    email: string;
    @Column({ nullable: false })
    password: string;
    @OneToMany(() => Folder, (folder) => folder.user)
    folders: Folder[];
    @OneToMany(() => Note, (note) => note.user)
    notes: Note[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
