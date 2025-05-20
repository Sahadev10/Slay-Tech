import { Injectable } from '@nestjs/common';
import { CreateCustomisationDto } from './dto/create-customisation.dto';
import { UpdateCustomisationDto } from './dto/update-customisation.dto';
import { Customisation } from './entities/customisation.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class CustomisationService {
  constructor(@InjectRepository(Customisation) private cusRepo: Repository<Customisation>,
  @InjectRepository(Auth)
  private readonly authRepository: Repository<Auth>) {}



//   async saveImage(user_id: string, imageUrl: string): Promise<Customisation> {
//     const image = this.cusRepo.create({
//         auth: { id: user_id },
//         cus_image_url: imageUrl,
//     });
//     return this.cusRepo.save(image);
// }


// async saveImage(user_id: number, imageUrl: string): Promise<Customisation> {
//   const user = await this.authRepository.findOne({ where: { id: user_id } });

//   if (!user) {
//     throw new Error('User not found');
//   }

//   const image = this.cusRepo.create({
//     auth: user,
//     cus_image_url: imageUrl,
//   });

//   return this.cusRepo.save(image);
// }


async saveImage(user_id: number, imageUrl: string): Promise<Customisation> {
  console.log('user_id in service:', user_id);

  const user = await this.authRepository.findOne({ where: { id: user_id } });
  console.log('User from DB:', user);

  if (!user) {
    throw new Error('User not found');
  }

  const image = this.cusRepo.create({
    auth: user,
    cus_image_url: imageUrl,
  });

  return this.cusRepo.save(image);
}


async getImageById(image_id: number): Promise<Customisation> {
    const image = await this.cusRepo.findOne({
        where: { cus_img_id:image_id },
        relations: ['auth'],
    });
    if (!image) throw new NotFoundException('Image not found');
    return image;
}

async getImagesByUserId(user_id: number): Promise<Customisation[]> {
    return this.cusRepo.find({
        where: { auth: { id: user_id } },
        relations: ['auth'],
    });
}


  async deleteImage(image_id: number): Promise<void> {
    const image = await this.getImageById(image_id);
    await this.cusRepo.remove(image);
  }
}
