import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VrController } from './vr.controller';

@Module({
  imports: [HttpModule],
  controllers: [VrController],
  providers: [],
})
export class AppModule {}
