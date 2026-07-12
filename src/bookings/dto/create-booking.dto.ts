import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'Nimal Perera' })
  @IsString()
  @IsNotEmpty({ message: 'Customer name is required' })
  customerName!: string;

  @ApiProperty({ example: 'nimal@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Customer email is required' })
  customerEmail!: string;

  @ApiProperty({ example: '+94771234567' })
  @IsString()
  @IsNotEmpty({ message: 'Customer phone number is required' })
  customerPhone!: string;

  @ApiProperty({ example: 'paste-your-service-uuid-here', description: 'Valid Service UUID from database' })
  @IsUUID('4', { message: 'Invalid Service ID format' })
  @IsNotEmpty({ message: 'Service ID is required' })
  serviceId!: string;

  @ApiProperty({ example: '2026-08-15', description: 'Format: YYYY-MM-DD' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Booking date must be in YYYY-MM-DD format' })
  @IsNotEmpty({ message: 'Booking date is required' })
  bookingDate!: string;

  @ApiProperty({ example: '14:30:00', description: 'Format: HH:MM:SS (24-hour)' })
  @Matches(/^\d{2}:\d{2}:\d{2}$/, { message: 'Booking time must be in HH:MM:SS format' })
  @IsNotEmpty({ message: 'Booking time is required' })
  bookingTime!: string;

  @ApiProperty({ example: 'Please provide a window seat if applicable.', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}