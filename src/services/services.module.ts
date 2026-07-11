import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service } from './entities/service.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Service])], // Register Service entity for repository injection
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [TypeOrmModule], 
})
export class ServicesModule {}