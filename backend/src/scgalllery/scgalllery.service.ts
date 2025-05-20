

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Gallery } from './entities/scgalllery.entity';
// import { Auth } from 'src/auth/entities/auth.entity';
// import { PostLike } from './entities/post-like.entity';
// import { PostComment } from './entities/post-comment.entity';
// import { CreateLikeDto } from './dto/create-like.dto';
// import { CreateCommentDto } from './dto/create-comment.dto';

// @Injectable()
// export class GalleryService {
//   constructor(
//     @InjectRepository(Gallery)
//     private galleryRepository: Repository<Gallery>,
//     @InjectRepository(Auth)
//     private authRepository: Repository<Auth>,
//     @InjectRepository(PostLike) private likeRepo: Repository<PostLike>,
//     @InjectRepository(PostComment) private commentRepo: Repository<PostComment>,

//   ) {}

//   async getAllImages(): Promise<Gallery[]> {
//     return this.galleryRepository.find({ relations: ['user'] });
//   }

//   async getUserGallery(userId: string): Promise<Gallery[]> {
//     return this.galleryRepository.find({
//       where: { user: { id: userId } },
//       relations: ['user'],
//     });
//   }

//   async addImage(userId: string, imageUrl: string, caption?: string): Promise<Gallery> {
//     const user = await this.authRepository.findOne({ where: { id: userId } });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const newImage = this.galleryRepository.create({
//       imageUrl,
//       caption,
//       user,
//     });

//     return this.galleryRepository.save(newImage);
//   }

//   async likePost(dto: CreateLikeDto) {
//     const gallery = await this.galleryRepository.findOne({ where: { id: dto.galleryId } });
//     if (!gallery) {
//       throw new Error('Gallery post not found');
//     }
  
//     const user = await this.authRepository.findOne({ where: { id: dto.userId } });
//     if (!user) {
//       throw new Error('User not found');
//     }
  
//     const existingLike = await this.likeRepo.findOne({
//       where: { gallery: { id: dto.galleryId }, user: { id: dto.userId } },
//     });
  
//     if (existingLike) {
//       await this.likeRepo.remove(existingLike);
//       gallery.likes -= 1;
//     } else {
//       const newLike = this.likeRepo.create({ gallery, user });
//       await this.likeRepo.save(newLike);
//       gallery.likes += 1;
//     }
  
//     await this.galleryRepository.save(gallery);
//     return { message: existingLike ? 'Like removed' : 'Post liked' };
//   }
  
//   async addComment(dto: CreateCommentDto) {
//     const gallery = await this.galleryRepository.findOne({ where: { id: dto.galleryId } });
//     if (!gallery) {
//       throw new Error('Gallery post not found');
//     }
  
//     const user = await this.authRepository.findOne({ where: { id: dto.userId } });
//     if (!user) {
//       throw new Error('User not found');
//     }
  
//     const comment = this.commentRepo.create({
//       gallery,
//       user,
//       comment: dto.text,
//     });
  
//     await this.commentRepo.save(comment);
//     gallery.comments += 1;
//     await this.galleryRepository.save(gallery);
  
//     return { message: 'Comment added' };
//   }
  

//   async getLikes(postId: number) {
//     return this.likeRepo.count({ where: { gallery: { id: postId } } });
//   }

//   async getComments(postId: number) {
//     return this.commentRepo.find({ where: { gallery: { id: postId } }, relations: ['user'] });
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/scgalllery.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { PostLike } from './entities/post-like.entity';
import { PostComment } from './entities/post-comment.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(PostLike)
    private likeRepository: Repository<PostLike>,
    @InjectRepository(PostComment)
    private commentRepository: Repository<PostComment>,
  ) {}

  async getAllImages(): Promise<Gallery[]> {
    return this.galleryRepository.find({
      relations: ['user', 'likes', 'likes.user', 'comments', 'comments.user'],
    });
  }

    async addImage(userId: number, imageUrl: string, caption?: string): Promise<Gallery> {
    const user = await this.authRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const newImage = this.galleryRepository.create({
      imageUrl,
      caption,
      user,
    });

    return this.galleryRepository.save(newImage);
  }

  async likePost(user: Auth, galleryId: string) {
    if (!user) throw new UnauthorizedException('User must be logged in');

    const gallery = await this.galleryRepository.findOne({ where: { id: galleryId }, relations: ['likes', 'likes.user'] });
    if (!gallery) throw new Error('Gallery post not found');

    const existingLike = await this.likeRepository.findOne({
      where: { gallery: { id: galleryId }, user: { id: user.id } },
    });
    console.log(existingLike)

    if (existingLike) {
      await this.likeRepository.remove(existingLike);
    } else {
      const newLike = this.likeRepository.create({ gallery, user });
    
      console.log("Saving new like:", newLike);
      
      await this.likeRepository.insert(newLike); // Use insert instead of save
    }
    


    return this.galleryRepository.findOne({ where: { id: galleryId }, relations: ['likes', 'likes.user'] });
  }

  // async addComment(user: Auth, galleryId: string, text: string) {
  //   if (!user) throw new UnauthorizedException('User must be logged in');

  //   const gallery = await this.galleryRepository.findOne({ where: { id: galleryId }, relations: ['comments', 'comments.user'] });
  //   if (!gallery) throw new Error('Gallery post not found');

  //   const comment = this.commentRepository.create({ gallery, user, comment: text });
  //   await this.commentRepository.insert(comment);

  //   return this.galleryRepository.findOne({ where: { id: galleryId }, relations: ['comments', 'comments.user'] });
  // }
  async addComment(galleryId: string, text: string, user: Auth) {
    const gallery = await this.galleryRepository.findOne({
      where: { id: galleryId },
      relations: ['comments', 'comments.user'], // Ensure user relation is loaded
    });
  
    if (!gallery) throw new NotFoundException("Gallery not found");
  
    const newComment = this.commentRepository.create({ comment: text, user, gallery });
    await this.commentRepository.insert(newComment);
  
    console.log("Comment saved:", newComment);
  
    return newComment;
  }


  async getUserGallery(userId: number) {
    console.log("user gallery", userId);
    return this.galleryRepository.find({
      where: { user: { id: userId } },
    });
  }
  
  
  
}
