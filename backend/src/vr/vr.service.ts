// src/image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vr } from './entities/vr.entity';

@Injectable()
export class VrService {
  constructor(@InjectRepository(Vr) private vrRepo: Repository<Vr>) {}



  async saveImage(user_id: number, imageUrl: string): Promise<Vr> {
    const image = this.vrRepo.create({
        auth: { id: user_id },
        image_url: imageUrl,
    });
    return this.vrRepo.save(image);
}

async getImageById(image_id: string): Promise<Vr> {
    const image = await this.vrRepo.findOne({
        where: { image_id },
        relations: ['auth'],
    });
    if (!image) throw new NotFoundException('Image not found');
    return image;
}

async getImagesByUserId(user_id: number): Promise<Vr[]> {
    return this.vrRepo.find({
        where: { auth: { id: user_id } },
        relations: ['auth'],
    });
}


  async deleteImage(image_id: string): Promise<void> {
    const image = await this.getImageById(image_id);
    await this.vrRepo.remove(image);
  }
}
