import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>){

  }

  async create(createAuthDto:CreateAuthDto): Promise<Auth>{
    const hashedPassword = await bcrypt.hash(createAuthDto.password,10);
    const newUser = this.authRepository.create({ ...createAuthDto,password:hashedPassword});
    return this.authRepository.save(newUser);
  }

  findAll(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  async findOne(id:number): Promise<Auth>{
    const user = await this.authRepository.findOne({where: {id } });
    if(!user) throw new NotFoundException('USER NOT FOUND');
    return user;
  }



  async update(id: number, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    Object.assign(user, updateAuthDto);
    return this.authRepository.save(user);
  }

  async delete(id:number): Promise<void>{
    const user = await this.authRepository.findOne({where : {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    await this.authRepository.remove(user);
  }


  


}
