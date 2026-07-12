import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsBoolean, IsOptional } from 'class-validator'; // Changed IsMin to Min

export class CreateServiceDto {
  @ApiProperty({ example: 'Full Body Massage', description: 'The title of the service' })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @ApiProperty({ example: 'A relaxing 60-minute full body massage.', description: 'Detailed description' })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description!: string;

  @ApiProperty({ example: 60, description: 'Duration of the service in minutes' })
  @IsNumber()
  @Min(1, { message: 'Duration must be at least 1 minute' }) // Changed here
  duration!: number;

  @ApiProperty({ example: 50.00, description: 'Price of the service' })
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' }) // Changed here
  price!: number;

  @ApiProperty({ example: true, description: 'Is the service active and available', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}