import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 64 })
    ip!: string;

    @Column({ type: 'varchar', length: 64 })
    arch!: string;

    @Column({ type: 'varchar', length: 64 })
    family!: string;

    @Column({ type: 'varchar', length: 64 })
    hostname!: string;

    @Column({ type: 'varchar', length: 64 })
    locale!: string;

    @Column({ type: 'varchar', length: 64 })
    platform!: string;

    @Column({ type: 'varchar', length: 64 })
    type!: string;

    @Column({ type: 'varchar', length: 64 })
    version!: string;

    @CreateDateColumn()
    created_at!: Date;
}
