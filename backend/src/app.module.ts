import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Auth } from './auth/entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { CustomisationModule } from './customisation/customisation.module';
import { ScgallleryModule } from './scgalllery/scgalllery.module';
import { VrModule } from './vr/vr.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (ConfigService:ConfigService) => ({
        type:'postgres',
        host:ConfigService.get('DB_HOST'),
        port:+ConfigService.get('DB_PORT'),
        username:ConfigService.get('DB_USERNAME'),
        password:ConfigService.get('DB_PASSWORD'),
        database:ConfigService.get('DB_NAME'),
        entities:[join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize:true,
      }),
    }),
    PassportModule,
    AuthModule,
    ImageModule,
    UserModule,
    UploadModule,
    CustomisationModule,
    ScgallleryModule,
    VrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
