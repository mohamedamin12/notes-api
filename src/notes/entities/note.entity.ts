import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Folder } from "src/folders/entities/folder.entity";
import { User } from "src/users/entities/user.entity";
import { NoteType } from "../enum/note-type";


@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column({ type: 'enum', enum: NoteType })
    type: NoteType;
    @Column({ type: 'text', nullable: true })
    text_notes: string | null;
    @Column({ type: 'json', nullable: true })
    list_notes: string[] | null;
    @ManyToOne(() => Folder, (folder) => folder.notes, { onDelete: 'CASCADE' })
    folder: Folder;
    @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
    user: User;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}