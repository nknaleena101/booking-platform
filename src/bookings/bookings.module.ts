import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity'; 
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Service]), // Register both entities here
    AuthModule, // Used for Guarding specific endpoints
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}