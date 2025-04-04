import { UUID } from "crypto";

export class CreateCommentDto {
  userId: UUID;
  galleryId: number;
  comment: string;
}
