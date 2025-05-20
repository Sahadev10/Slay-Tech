// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UserService } from './user.service';
// import { JwtModule } from '@nestjs/jwt';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Auth } from './entities/auth.entity';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: 'secretkey',
//       signOptions: { expiresIn: '1h' }, // Token expiration time
//     }),
//     TypeOrmModule.forFeature([Auth]),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService,UserService,JwtAuthGuard,JwtStrategy],
//   exports: [TypeOrmModule,JwtModule,JwtAuthGuard,], 
// })
// export class AuthModule {}



import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ✅ Import ConfigModule & ConfigService

@Module({
  imports: [
    ConfigModule, // ✅ Make ConfigService available
    JwtModule.registerAsync({ // ✅ Use async config to inject ConfigService
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secretkey',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Auth]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtAuthGuard, JwtStrategy],
  exports: [TypeOrmModule, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
