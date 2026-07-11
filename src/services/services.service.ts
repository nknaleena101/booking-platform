import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // 1. Create a new Service
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(newService);
  }

  // 2. Get All Services
  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  // 3. Get Service by ID
  async findOne(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  // 4. Update Service
  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id); // Throws NotFoundException if it doesn't exist
    
    // Merge updates into the existing service entity
    const updatedService = this.serviceRepository.merge(service, updateServiceDto);
    return await this.serviceRepository.save(updatedService);
  }

  // 5. Delete Service
  async remove(id: string): Promise<{ message: string }> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
    return { message: `Service with ID ${id} successfully deleted` };
  }
}