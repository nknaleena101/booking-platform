import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from '../../services/entities/service.entity';

// Define the Booking Status Enum as requested
export enum BookingStatus {
  PENDING = 'PENDING', 
  CONFIRMED = 'CONFIRMED', 
  CANCELLED = 'CANCELLED', 
  COMPLETED = 'COMPLETED', 
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customerName!: string; 

  @Column()
  customerEmail!: string; 

  @Column()
  customerPhone!: string;

  // Establish Relationship: Many bookings can belong to one Service
  @ManyToOne(() => Service, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' }) // Custom foreign key column name
  service!: Service;

  @Column()
  serviceId!: string; 

  @Column('date') // Stores only YYYY-MM-DD
  bookingDate!: string; 

  @Column('time') // Stores HH:MM:SS
  bookingTime!: string; 

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING, // Default status when created
  })
  status!: BookingStatus;

  @Column({ type: 'text', nullable: true })
  notes!: string;

  @CreateDateColumn()
  createdAt!: Date;
}