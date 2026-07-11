import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users') // Database table name
export class User {
  @PrimaryGeneratedColumn('uuid') // Generates a unique UUID for each user
  id!: string;

  @Column({ unique: true }) // Email must be unique
  email!: string;

  @Column()
  password?: string; // Optional character because we might hide it in responses

  @CreateDateColumn()
  createdAt!: Date;
}