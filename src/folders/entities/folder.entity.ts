import { Note } from "src/notes/entities/note.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Folder {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column({nullable: true})
    description: string;
    @OneToMany(() => Note, (note) => note.folder,{cascade: true})
    notes: Note[];
    @ManyToOne(() => User, (user) => user.folders, { onDelete: 'CASCADE' })
    user: User;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}