import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // 1. Create Booking with Rules applied
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { serviceId, bookingDate, bookingTime } = createBookingDto;

    // Rule 1: Validate if the service actually exists
    const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${serviceId} does not exist`);
    }

    // Rule 2: Booking dates cannot be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    const inputDate = new Date(bookingDate);
    if (inputDate < today) {
      throw new BadRequestException('Booking date cannot be in the past');
    }

    // Bonus Feature: Prevent duplicate bookings for the same service, date, and time
    const duplicate = await this.bookingRepository.findOne({
      where: { serviceId, bookingDate, bookingTime },
    });
    if (duplicate) {
      throw new ConflictException('This service is already booked for the selected date and time');
    }

    // Create and save booking
    const newBooking = this.bookingRepository.create(createBookingDto);
    return await this.bookingRepository.save(newBooking);
  }

  // 2. Get All Bookings (Admin feature)
  async findAll(): Promise<Booking[]> {
    // Changed from ['service'] to object format { service: true } for strict type safety
    return await this.bookingRepository.find({ relations: { service: true } });
  }

  // 3. Get Booking by ID
  async findOne(id: string): Promise<Booking> {
    // Changed from ['service'] to object format { service: true }
    const booking = await this.bookingRepository.findOne({ 
      where: { id }, 
      relations: { service: true } 
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  // 4. Update Booking Status with Rules
  async updateStatus(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);
    const newStatus = updateBookingDto.status;

    // Rule 3: Cancelled bookings cannot be marked as completed
    if (booking.status === BookingStatus.CANCELLED && newStatus === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cancelled bookings cannot be marked as completed');
    }

    booking.status = newStatus;
    return await this.bookingRepository.save(booking);
  }

  // 5. Cancel Booking (Helper shortcut endpoint)
  async cancel(id: string): Promise<Booking> {
    return this.updateStatus(id, { status: BookingStatus.CANCELLED });
  }
}