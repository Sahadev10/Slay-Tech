import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity'
import { MeasurementsService } from './measurement.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Measurement]),AuthModule],
  controllers: [UploadController],
  providers: [UploadService,MeasurementsService]
})
export class UploadModule {}
