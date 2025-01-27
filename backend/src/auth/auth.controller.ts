import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly userservice:UserService) {}

  @Post('register')
  async register(@Body() createAuthDto:CreateAuthDto){
    console.log("hello started");
    return this.userservice.create(createAuthDto);
  }

  @Post('login')
  async login(@Body() body: {email:string; password:string}){
    const user = await this.authService.validateUser(body.email,body.password);
    if(!user) throw new UnauthorizedException('invalid credentials');
    return this
    
    .authService.login(user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('protected')
  // getProtected(@Req() req) {
  //   return req.user;
  // }


}
