// measurements.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './entities/measurement.entity'

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurement)
    private measurementsRepository: Repository<Measurement>,
  ) {}

  async saveMeasurement(measurementData: Partial<Measurement>): Promise<Measurement> {
    const measurement = this.measurementsRepository.create(measurementData);
    return await this.measurementsRepository.save(measurement);
  }
}
