


// import { Controller, Get, Post,Patch, Body, Param } from '@nestjs/common';
// import { CreateGalleryDto } from './dto/create-scgalllery.dto';
// import { GalleryService } from './scgalllery.service';

// import { CreateLikeDto } from './dto/create-like.dto';
// import { CreateCommentDto } from './dto/create-comment.dto'

// @Controller('gallery')
// export class GalleryController {
//   constructor(private readonly galleryService: GalleryService) {}

//   @Get()
//   async getAllImages() {
//     return this.galleryService.getAllImages();
//   }

//   @Get(':userId')
//   async getUserGallery(@Param('userId') userId: string) {
//     return this.galleryService.getUserGallery(userId);
//   }

//   @Post(':userId/add')
//   async addImageToGallery(
//     @Param('userId') userId: string,
//     @Body() createGalleryDto: CreateGalleryDto,
//   ) {
//     return this.galleryService.addImage(userId, createGalleryDto.imageUrl, createGalleryDto.caption);
//   }

//   @Patch('like')
//   async likePost(@Body() likeDto: CreateLikeDto) {
//     return this.galleryService.likePost(likeDto);
//   }

//   @Post('comment')
//   async addComment(@Body() commentDto: CreateCommentDto) {
//     return this.galleryService.addComment(commentDto);
//   }

//   @Get(':id/likes')
//   async getLikes(@Param('id') postId: number) {
//     return this.galleryService.getLikes(postId);
//   }

//   @Get(':id/comments')
//   async getComments(@Param('id') postId: number) {
//     return this.galleryService.getComments(postId);
//   }
// }


// ;
import { Controller, Get, Patch, Post, Body, Req, UseGuards } from '@nestjs/common';
import { GalleryService } from './scgalllery.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/request.interface';
import { CreateGalleryDto } from './dto/create-scgalllery.dto';
import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
    async getAllImages() {
      return this.galleryService.getAllImages();
    }

    @Post(':userId/add')
  async addImageToGallery(
    @Param('userId') userId: number,
    @Body() createGalleryDto: CreateGalleryDto,
  ) {
    return this.galleryService.addImage(userId, createGalleryDto.imageUrl, createGalleryDto.caption);
  }

  @UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  @Patch('like')
  async likePost(@Req() req: AuthenticatedRequest, @Body() { galleryId }: { galleryId: string }) {
    if (!req.user) throw new Error('Unauthorized');
    return this.galleryService.likePost(req.user, galleryId);
  }

  @UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  @Post('comment')
  async addComment(@Req() req: AuthenticatedRequest, @Body() { galleryId, text }: { galleryId: string; text: string }) {
    if (!req.user) throw new Error('Unauthorized');
    return this.galleryService.addComment( galleryId, text,req.user);
  }

//   @UseGuards(JwtAuthGuard)
// @Get('me')
// async getMyImages(@Req() req: AuthenticatedRequest) {
//   if (!req.user) throw new Error('Unauthorized');
//   console.log("aaa",req.user.userId);
//   return this.galleryService.getUserGallery(req.user.userId);
// }

@UseGuards(JwtAuthGuard)
@Get('me')
async getMyImages(@Query('userId') userId: string) {
  if (!userId) throw new Error('Unauthorized');
  const numericId = parseInt(userId, 10);
  console.log("User ID:", numericId);
  return this.galleryService.getUserGallery(numericId);
}
}
