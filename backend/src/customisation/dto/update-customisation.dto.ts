import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomisationDto } from './create-customisation.dto';

export class UpdateCustomisationDto extends PartialType(CreateCustomisationDto) {}
