import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'account' })
export class Account
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'float64', default: 0 })
    usdt!: number;

    @Column({ type: 'varchar', length: 256 })
    email!: string;

    @Column({ type: 'varchar', length: 64 })
    password!: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    fname!: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    lname!: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    referral!: string;

    @CreateDateColumn()
    created_at!: Date;
}

@Entity({ name: 'account_session' })
export class AccountSession
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    account_id!: number;

    @Column({ type: 'varchar', length: 512 })
    token!: string;

    @Column({ type: 'varchar', length: 512 })
    device!: string;

    @Column({ type: 'int' })
    expires_at!: number;

    @Column({ type: 'int', default: 0 })
    revoked_at!: number;

    @CreateDateColumn()
    created_at!: Date;
}

@Entity({ name: 'account_history' })
export class AccountHistory
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 256 })
    tag!: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    value1!: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    value2!: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    value3!: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    value4!: string;

    @Column({ type: 'varchar', length: 128 })
    ip!: string;

    @CreateDateColumn()
    created_at!: Date;
}
