import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException,UseGuards,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticatedRequest } from './request.interface'; 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly userservice:UserService) {}

  @Post('register')
  async register(@Body() createAuthDto:CreateAuthDto){
    
    // return this.userservice.create(createAuthDto);
    const val = await this.userservice.create(createAuthDto)

    return this.authService.login(val);
  }




  @Post('login')
  async login(@Body() body: {email:string; password:string}){
    console.log("hello started");
    console.log(body.email)
    const user = await this.authService.validateUser(body.email,body.password);
    if(!user) throw new UnauthorizedException('invalid credentials');
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard) // Requires authentication
  @Get('me')
  getProfile(@Req() req:AuthenticatedRequest) {
    return req.user; // The authenticated user data
  }
  

  // @UseGuards(JwtAuthGuard)
  // @Post('protected')
  // getProtected(@Req() req) {
  //   return req.user;
  // }

  // ✅ Protected route to get user details



}
