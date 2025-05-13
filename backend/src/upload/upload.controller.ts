// // import {
// //   Controller,
// //   Post,
// //   UseInterceptors,
// //   UploadedFile,
// //   Res,
// //   Body,
// //   Req,
// //   UseGuards,
// // } from '@nestjs/common';
// // import { FileInterceptor } from '@nestjs/platform-express';
// // import { diskStorage } from 'multer';
// // import { Response } from 'express';
// // import { v4 as uuidv4 } from 'uuid';
// // import * as path from 'path';
// // import { MeasurementsService } from './measurement.service';
// // import { exec } from 'child_process';
// // import { promisify } from 'util';
// // import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Import your JWT guard
// // import { AuthenticatedRequest } from 'src/auth/request.interface';

// // const execAsync = promisify(exec);

// // @Controller('upload')
// // export class UploadController {
// //   constructor(private readonly measurementsService: MeasurementsService) {}

// //   @UseGuards(JwtAuthGuard) // Protect route
// //   @Post()
// //   @UseInterceptors(
// //     FileInterceptor('image', {
// //       storage: diskStorage({
// //         destination: './uploads',
// //         filename: (req, file, cb) => {
// //           const uniqueSuffix = uuidv4() + path.extname(file.originalname);
// //           cb(null, uniqueSuffix);
// //         },
// //       }),
// //     }),
// //   )
// //   async uploadFile(
// //     @UploadedFile() file: Express.Multer.File,
// //     @Body('heightCm') heightCm: number,
// //     @Req() req: AuthenticatedRequest,  // Use the custom request type here
// //     @Res() res: Response,
// //   ) {
// //     if (!file || !heightCm) {
// //       return res
// //         .status(400)
// //         .json({ message: 'Image and height are required.' });
// //     }

// //     const userId = req.user?.userId; // Safely extract userId from JWT payload

// //     if (!userId) {
// //       return res.status(401).json({ message: 'User not authenticated.' });
// //     }

// //     const imagePath = path.join(__dirname, '..', 'uploads', file.filename);

// //     try {
// //       const { stdout } = await execAsync(
// //         `python3 /home/dell/Desktop/git_projects/Slay-Tech/backend/src/upload/measurement.py "${imagePath}" ${heightCm}`,
// //       );

// //       const measurements = JSON.parse(stdout);

// //       if (measurements.error) {
// //         return res.status(400).json({ message: measurements.error });
// //       }

// //       const measurementData = {
// //         imageUrl: file.filename,
// //         heightCm,
// //         waistCircumferenceCm: measurements.waistCircumferenceCm,
// //         shoulderwidth: measurements.shoulderwidth,
// //         hipcircumference: measurements.hipcircumference,
// //         torsolength: measurements.torsolength,
// //         fullarmlength: measurements.fullarmlength,
// //         userId, // Set userId from JWT
// //       };

// //       await this.measurementsService.saveMeasurement(measurementData);

// //       return res.json({
// //         message: 'Image uploaded and measurements saved successfully!',
// //         data: measurementData,
// //       });
// //     } catch (error) {
// //       console.error('Error processing measurements:', error);
// //       return res
// //         .status(500)
// //         .json({ message: 'Error processing measurements.' });
// //     }
// //   }
// // }


// import {
//   Controller,
//   Post,
//   Get,
//   Body,
//   Res,
//   Req,
//   UseGuards,
// } from '@nestjs/common';
// import { Response } from 'express';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Import your JWT guard
// import { MeasurementsService } from './measurement.service';
// import { AuthenticatedRequest } from 'src/auth/request.interface';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as base64 from 'base64-arraybuffer';

// @Controller('upload')
// export class UploadController {
//   constructor(private readonly measurementsService: MeasurementsService) {}

//   @UseGuards(JwtAuthGuard) // Protect route
//   @Post(':user_id')
//   async uploadFile(
//     @Body() body: any,
//     @Req() req: AuthenticatedRequest,  // Use the custom request type here
//     @Res() res: Response,
//   ) {
//     const { imageBase64, heightCm, waistCircumferenceCm, shoulderwidth, hipcircumference, torsolength, fullarmlength } = body;

//     if (!imageBase64 || !heightCm) {
//       return res
//         .status(400)
//         .json({ message: 'Image and height are required.' });
//     }

//     const userId = req.user?.userId; // Safely extract userId from JWT payload

//     if (!userId) {
//       return res.status(401).json({ message: 'User not authenticated.' });
//     }

//     // Decode the base64 image data
//     const imageBuffer = Buffer.from(imageBase64, 'base64');

//     // Save the image to disk
//     const uniqueFilename = `${userId}-${Date.now()}.jpg`;
//     const imagePath = path.join(__dirname, '..', 'uploads', uniqueFilename);
    
//     try {
//       fs.writeFileSync(imagePath, imageBuffer); // Save the image file

//       // Save the measurements data
//       const measurementData = {
//         imageUrl: uniqueFilename,
//         heightCm,
//         waistCircumferenceCm,
//         shoulderwidth,
//         hipcircumference,
//         torsolength,
//         fullarmlength,
//         userId, // Set userId from JWT
//       };

//       await this.measurementsService.saveMeasurement(measurementData);

//       return res.json({
//         message: 'Image uploaded and measurements saved successfully!',
//         data: measurementData,
//       });
//     } catch (error) {
//       console.error('Error processing the image or measurements:', error);
//       return res.status(500).json({ message: 'Error processing the image or measurements.' });
//     }
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('measure')
//   async getStylemixRedirect(@Req() req: Request) {
//     const user = (req as any).user; // cast needed to access user field
  
//     if (!user || !user.id) {
//       return { message: 'User ID not found in token' };
//     }
//     console.log("ggggg")
//     console.log(user.id);
  
//     const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/BodyMeasurement?user_id=${user.id}`;
//     return { redirectUrl };
//   }
// }


// import {
//   Controller,
//   Post,
//   Get,
//   Body,
//   Res,
//   Req,
//   UseGuards,
//   Param,
// } from '@nestjs/common';
// import { Response } from 'express';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { MeasurementsService } from './measurement.service';
// import * as fs from 'fs';
// import * as path from 'path';

// @Controller('upload')
// export class UploadController {
//   constructor(private readonly measurementsService: MeasurementsService) {}

//   @Post(':userId')
//   async uploadFile(
//     @Param('userId') userId: string,
//     @Body() body: any,
//     @Res() res: Response,
//   ) {
//     const {
//       imageBase64,
//       heightCm,
//       waistCircumferenceCm,
//       shoulderwidth,
//       hipcircumference,
//       torsolength,
//       fullarmlength,
//     } = body;

//     if (!imageBase64 || !heightCm) {
//       return res
//         .status(400)
//         .json({ message: 'Image and height are required.' });
//     }

//     try {
//       // ✅ Ensure 'uploads' directory exists
//       const uploadsDir = path.resolve(__dirname, '..', 'uploads');
//       if (!fs.existsSync(uploadsDir)) {
//         fs.mkdirSync(uploadsDir, { recursive: true });
//       }

//       // ✅ Save the image
//       const uniqueFilename = `${userId}-${Date.now()}.jpg`;
//       const imagePath = path.join(uploadsDir, uniqueFilename);
//       const imageBuffer = Buffer.from(imageBase64, 'base64');

//       fs.writeFileSync(imagePath, imageBuffer);

//       // ✅ Store data
//       const measurementData = {
//         imageUrl: uniqueFilename,
//         heightCm,
//         waistCircumferenceCm,
//         shoulderwidth,
//         hipcircumference,
//         torsolength,
//         fullarmlength,
//         userId,
//       };

//       await this.measurementsService.saveMeasurement(measurementData);

//       return res.json({
//         message: 'Image uploaded and measurements saved successfully!',
//         data: measurementData,
//       });
//     } catch (error) {
//       console.error('Error processing the image or measurements:', error);
//       return res
//         .status(500)
//         .json({ message: 'Error processing the image or measurements.' });
//     }
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get('measure')
//   async getStylemixRedirect(@Req() req: any) {
//     const userId = req.user?.id;

//     if (!userId) {
//       return { message: 'User ID not found in token' };
//     }

//     const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/BodyMeasurement?user_id=${userId}`;
//     return { redirectUrl };
//   }
// }




import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MeasurementsService } from './measurement.service';
import * as fs from 'fs';
import * as path from 'path';
// import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly measurementsService: MeasurementsService,
    // private readonly configService: ConfigService
  ) {}

  @Post(':userId')
  async uploadFile(
    @Param('userId') userId: string,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const {
      imageBase64,
      heightCm,
      waistCircumferenceCm,
      shoulderwidth,
      hipcircumference,
      torsolength,
      fullarmlength,
    } = body;

    if (!imageBase64 || !heightCm) {
      return res
        .status(400)
        .json({ message: 'Image and height are required.' });
    }

    try {
      const uploadsDir = path.resolve(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const uniqueFilename = `${userId}-${Date.now()}.jpg`;
      const imagePath = path.join(uploadsDir, uniqueFilename);
      const imageBuffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(imagePath, imageBuffer);

      const imageUrl = `${process.env.BASE_URL}/uploads/${uniqueFilename}`;

      const measurementData = {
        imageUrl,
        heightCm,
        waistCircumferenceCm,
        shoulderwidth,
        hipcircumference,
        torsolength,
        fullarmlength,
        userId,
      };

      await this.measurementsService.saveMeasurement(measurementData);

      return res.status(201).json({
        message: 'Image uploaded and measurements saved successfully!',
        data: measurementData,
      });
    } catch (error) {
      console.error('Error processing the image or measurements:', error);
      return res
        .status(500)
        .json({ message: 'Error processing the image or measurements.' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('measure')
  async getStylemixRedirect(@Req() req: any) {
    const userId = req.user?.id;

    if (!userId) {
      return { message: 'User ID not found in token' };
    }

    const redirectUrl = `https://huggingface.co/spaces/SLAYTECH/BodyMeasurement?user_id=${userId}`;
    return { redirectUrl };
  }
}
