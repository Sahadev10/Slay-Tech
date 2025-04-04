import { Module } from '@nestjs/common';
import { CustomisationService } from './customisation.service';
import { CustomisationController } from './customisation.controller';
import { Customisation } from './entities/customisation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Customisation])],
  controllers: [CustomisationController],
  providers: [CustomisationService],
})
export class CustomisationModule {}
