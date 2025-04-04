import { Injectable } from '@nestjs/common';
import { CreateCustomisationDto } from './dto/create-customisation.dto';
import { UpdateCustomisationDto } from './dto/update-customisation.dto';
import { Customisation } from './entities/customisation.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomisationService {
  constructor(@InjectRepository(Customisation) private cusRepo: Repository<Customisation>) {}



  async saveImage(user_id: string, imageUrl: string): Promise<Customisation> {
    const image = this.cusRepo.create({
        auth: { id: user_id },
        cus_image_url: imageUrl,
    });
    return this.cusRepo.save(image);
}

async getImageById(image_id: string): Promise<Customisation> {
    const image = await this.cusRepo.findOne({
        where: { cus_img_id:image_id },
        relations: ['auth'],
    });
    if (!image) throw new NotFoundException('Image not found');
    return image;
}

async getImagesByUserId(user_id: string): Promise<Customisation[]> {
    return this.cusRepo.find({
        where: { auth: { id: user_id } },
        relations: ['auth'],
    });
}


  async deleteImage(image_id: string): Promise<void> {
    const image = await this.getImageById(image_id);
    await this.cusRepo.remove(image);
  }
}
