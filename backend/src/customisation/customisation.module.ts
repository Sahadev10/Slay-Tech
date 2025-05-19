import { Module } from '@nestjs/common';
import { CustomisationService } from './customisation.service';
import { CustomisationController } from './customisation.controller';
import { Customisation } from './entities/customisation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Auth } from 'src/auth/entities/auth.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Customisation,Auth])
  ,  AuthModule,],
  controllers: [CustomisationController],
  providers: [CustomisationService],
})
export class CustomisationModule {}
