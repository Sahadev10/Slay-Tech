
import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  
} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:user_id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './GANuploads', // Save in a local folder named 'uploads'
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Get file extension (e.g., .jpg)
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('user_id') user_id: number,
  ) {
    // Generate a public URL to access the file
    const imageUrl = `${process.env.BASE_URL}/GANuploads/${file.filename}`;
  
    // Save the user ID and image URL to the database
    return this.imageService.saveImage(user_id, imageUrl);
  }
  

  @Get(':image_id')
  async getImageById(@Param('image_id') image_id: string) {
    return this.imageService.getImageById(image_id);
  }

  @Get('user/:user_id')
  async getImagesByUserId(@Param('user_id') user_id: number) {
    console.log("jhgg")
    return this.imageService.getImagesByUserId(user_id);
  }

  @Delete(':image_id')
  async deleteImage(@Param('image_id') image_id: string) {
    return this.imageService.deleteImage(image_id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('gen/dress')
  async getStylemixRedirect(@Req() req: Request) {
    const user = (req as any).user; // cast needed to access user field
  
    if (!user || !user.id) {
      return { message: 'User ID not found in token' };
    }
    console.log("ggggg")
    console.log(user.id);
  
    const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/Dress_model?user_id=${user.id}`;
    return { redirectUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Get('gen/top')
  async getStylemixRedirecttop(@Req() req: Request) {
    const user = (req as any).user; // cast needed to access user field
  
    if (!user || !user.id) {
      return { message: 'User ID not found in token' };
    }
    console.log("ggggg")
    console.log(user.id);
  
    const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/top_model?user_id=${user.id}`;
    return { redirectUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Get('gen/blazer')
  async getStylemixRedirectblazer(@Req() req: Request) {
    const user = (req as any).user; // cast needed to access user field
  
    if (!user || !user.id) {
      return { message: 'User ID not found in token' };
    }
    console.log("ggggg")
    console.log(user.id);
  
    const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/blazer_model?user_id=${user.id}`;
    return { redirectUrl };
  }


}
