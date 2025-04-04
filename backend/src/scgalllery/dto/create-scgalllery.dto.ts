import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  caption?: string;
}
