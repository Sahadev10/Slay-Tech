import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomisationService } from './customisation.service';
import { CreateCustomisationDto } from './dto/create-customisation.dto';
import { UpdateCustomisationDto } from './dto/update-customisation.dto';
import { ParseIntPipe } from '@nestjs/common';
import {

  UploadedFile,
  UseInterceptors,
  
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Req,Res } from '@nestjs/common';

@Controller('customisation')
export class CustomisationController {
  constructor(private readonly customisationService: CustomisationService) {}

  @Post('upload/:user_id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './CUSuploads', // Save in a local folder named 'uploads'
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
    // @Param('user_id') user_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,

  ) {

    // Generate a public URL to access the file
    const imageUrl = `${process.env.BASE_URL}/CUSuploads/${file.filename}`;
    console.log(user_id);
  
    // Save the user ID and image URL to the database
    return this.customisationService.saveImage(user_id, imageUrl);
  }
  

  @Get(':image_id')
  async getImageById(@Param('image_id') image_id: number) {
    return this.customisationService.getImageById(image_id);
  }

  @Get('user/:user_id')
  async getImagesByUserId(@Param('user_id') user_id: number) {
    return this.customisationService.getImagesByUserId(user_id);
  }

  @Delete(':image_id')
  async deleteImage(@Param('image_id') image_id: number) {
    return this.customisationService.deleteImage(image_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('style/stylemix-redirect')
  async getStylemixRedirect(@Req() req: Request) {
    const user = (req as any).user; // cast needed to access user field
  
    if (!user || !user.id) {
      return { message: 'User ID not found in token' };
    }
    console.log("ggggg")
    console.log(user.id);
  
    const redirectUrl = `https://huggingface.co/spaces/uhdessai/StyleMixing?user_id=${user.id}`;
    return { redirectUrl };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cust/image')
  async customize(@Req() req: any) {
    const userId = req.user?.id;

    if (!userId) {
      return { message: 'User ID not found in token' };
    }

    const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/LaatenSpaceManipulation?user_id=${userId}`;
    return { redirectUrl };
  }


  @UseGuards(JwtAuthGuard)
  @Get('/cust2/image')
  async customizeother(@Req() req: any) {
    const userId = req.user?.id;

    if (!userId) {
      return { message: 'User ID not found in token' };
    }

    const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/LatenSpaceManipulationDress?user_id=${userId}`;
    return { redirectUrl };
  }
  

}
