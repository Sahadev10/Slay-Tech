import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VrController } from './vr.controller';
import { VrService } from './vr.service';
import { Vr } from './entities/vr.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([Vr]),],
  controllers: [VrController],
  providers: [VrService],
})
export class VrModule {}
