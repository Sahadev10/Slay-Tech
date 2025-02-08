import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { MeasurementsService } from './measurement.service';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Controller('upload')
export class UploadController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      return res.status(400).json({ message: 'File upload failed.' });
    }

    // Replace this with the actual path to your Python script and the method to extract measurements.
    const imagePath = path.join(__dirname, '..', 'uploads', file.filename);
    
    try {
      // Call the Python script and get measurements
      const { stdout } = await execAsync(`python3 /home/dell/Desktop/git_projects/Slay-Tech/backend/src/upload/measurement.py ${imagePath}`);

      // Assuming stdout contains the measurements in JSON format
      const measurements = JSON.parse(stdout);

      // Save measurements to the database
      const measurementData = {
        imageUrl: file.filename,
        heightCm: measurements.heightCm,
        shoulderWidthCm: measurements.shoulderWidthCm,
        leftArmLengthCm: measurements.leftArmLengthCm,
        rightArmLengthCm: measurements.rightArmLengthCm,
        leftLegLengthCm: measurements.leftLegLengthCm,
        rightLegLengthCm: measurements.rightLegLengthCm,
        hipWidthCm: measurements.hipWidthCm,
        chestCircumferenceCm: measurements.chestCircumferenceCm,
        neckCircumferenceCm: measurements.neckCircumferenceCm,
        waistCircumferenceCm: measurements.waistCircumferenceCm,
        backLengthCm: measurements.backLengthCm,
      };

      await this.measurementsService.saveMeasurement(measurementData);

      return res.json({ message: 'Image uploaded and measurements saved successfully!', file: file.filename });
    } catch (error) {
      console.error('Error processing measurements:', error);
      return res.status(500).json({ message: 'Error processing measurements.' });
    }
  }
}
