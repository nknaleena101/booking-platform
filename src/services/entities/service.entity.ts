import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string; 

  @Column('text')
  description!: string;

  @Column('int') // Duration in minutes
  duration!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Suitable for currency (e.g., 99.99)
  price!: number; 

  @Column({ default: true })
  isActive!: boolean; 

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}