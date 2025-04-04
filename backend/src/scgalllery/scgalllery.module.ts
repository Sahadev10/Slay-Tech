import { Module } from '@nestjs/common';
import { GalleryService } from './scgalllery.service';
import { GalleryController } from './scgalllery.controller';
import { Gallery } from './entities/scgalllery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostLike } from './entities/post-like.entity';
import { PostComment } from './entities/post-comment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Gallery,PostLike, PostComment])
,  AuthModule,],
  controllers: [GalleryController],
  providers: [GalleryService],

})
export class ScgallleryModule {}
