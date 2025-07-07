import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { VrService } from './vr.service';
import { Get } from '@nestjs/common';

// @Controller('image')
// export class VrController {
//   constructor(private readonly vrService: VrService) {}
//   @Post('save')
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: (req, file, cb) => {
//           console.log('🗂️ Setting upload destination...');
//           cb(null, './uploads');
//         },
//         filename: (req, file, cb) => {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//           const ext = extname(file.originalname);
//           const finalName = uniqueSuffix + ext;
//           console.log(`📛 Generated filename: ${finalName}`);
//           cb(null, finalName);
//         },
//       }),
//     }),
//   )
//   async uploadImage(
//     @UploadedFile() file: Express.Multer.File,
//     @Query('user_id') userId: number,
//   ) {
//     console.log('📥 Received POST request to /image/save');
//     console.log('➡️ Query user_id:', userId);
//     console.log('➡️ Uploaded file:', file);

//     if (!file) {
//       console.error('❌ No file uploaded');
//       throw new BadRequestException('No image received');
//     }

//     const imageUrl = `${process.env.BASE_URL}/GANuploads/${file.filename}`;
  
//     // Save the user ID and image URL to the database
//     return this.vrService.saveImage(userId, imageUrl);
//   }
// }

@Controller('image')
export class VrController {
  constructor(private readonly vrService: VrService) {}

  @Post('save')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('user_id') userId: number,
  ) {
    if (!file) throw new BadRequestException('No image received');
    const imageUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;
    return this.vrService.saveImage(userId, imageUrl);
  }

  @Get('user')
  async getImagesByUserId(@Query('user_id') userId: number) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.vrService.getImagesByUserId(userId);
  }
}




// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('image')
// export class VrController {
//   @Post('save')
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, cb) => {
//           const uniqueName = Date.now() + extname(file.originalname);
//           cb(null, uniqueName);
//         },
//       }),
//     }),
//   )
//   uploadImage(@UploadedFile() file: Express.Multer.File) {
//     console.log('File uploaded:', file.originalname);
//     return { message: 'File uploaded', filename: file.filename };
//   }
// }
