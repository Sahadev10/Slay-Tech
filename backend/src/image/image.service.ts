// src/image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>) {}



  async saveImage(user_id: number, imageUrl: string): Promise<Image> {
    const image = this.imageRepo.create({
        auth: { id: user_id },
        image_url: imageUrl,
    });
    return this.imageRepo.save(image);
}

async getImageById(image_id: string): Promise<Image> {
    const image = await this.imageRepo.findOne({
        where: { image_id },
        relations: ['auth'],
    });
    if (!image) throw new NotFoundException('Image not found');
    return image;
}

async getImagesByUserId(user_id: number): Promise<Image[]> {
    return this.imageRepo.find({
        where: { auth: { id: user_id } },
        relations: ['auth'],
    });
}


  async deleteImage(image_id: string): Promise<void> {
    const image = await this.getImageById(image_id);
    await this.imageRepo.remove(image);
  }
}
