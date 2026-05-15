import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../common/entities/employee.entity';
import { AdminEmployeesController } from './admin-employees.controller';
import { AdminEmployeesService } from './admin-employees.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [AdminEmployeesController],
  providers: [AdminEmployeesService],
  exports: [AdminEmployeesService],
})
export class AdminEmployeesModule {}

