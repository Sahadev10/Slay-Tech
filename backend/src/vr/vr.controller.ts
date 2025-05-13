import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Controller('image')
  export class VrController {
    @Post('save')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads', // Make sure this folder exists
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      }),
    )
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
      console.log('📥 Received image file:', file.originalname);
      return {
        message: 'Image saved successfully',
        filename: file.filename,
      };
    }
  }
  