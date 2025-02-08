import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measrement.entities'
import { MeasurementsService } from './measurement.service';
@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  controllers: [UploadController],
  providers: [UploadService,MeasurementsService]
})
export class UploadModule {}
