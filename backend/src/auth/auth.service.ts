import { Injectable, NotFoundException ,Inject, forwardRef} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) // Use forwardRef here
    private readonly userService:UserService,private jwtService:JwtService){

  }

  // async validateUser(email:string, password:string): Promise<any> {
  //   console.log("hhhh")
  //   const user = await this.userService.findAll().then(users => users.find(u => u.email));
  //   console.log(user)
  //   if (user && (await bcrypt.compare(password,user.password))){
  //     const {password,...result} = user;
  //     return result;
      
  //   }
  //   return null;
  // }

  async validateUser(email: string, password: string): Promise<any> {
   
    
    // Fetch all users from the database
    const users = await this.userService.findAll();

   
   
    // Find the user with the matching email
    const user = users.find(u => u.email === email); // Check if the user's email matches
  
   
    
    // If user exists and the password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude the password from the result
      return result; // Return the user data without the password
    }
    
    return null; // Return null if no match found
  }
  

  async login(user:any): Promise<{ accessToken:string}> {
    const payload = { username:user.email,sub:user.id};
    return { accessToken: this.jwtService.sign(payload)};
  }
  // async login(user:any): Promise<{ accessToken:string}> {
  //   const payload = { username:user.username,sub:user.id};
  //   return { accessToken: this.jwtService.sign(payload)};
  // }

  

}
