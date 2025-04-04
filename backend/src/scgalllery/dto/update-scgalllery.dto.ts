import { PartialType } from '@nestjs/mapped-types';
import { CreateGalleryDto } from './create-scgalllery.dto';

export class UpdateScgallleryDto extends PartialType(CreateGalleryDto) {}
