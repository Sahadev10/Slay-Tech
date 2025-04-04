// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Auth } from 'src/auth/entities/auth.entity'; // Correct import for Auth entity

// @Entity()
// export class Gallery {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'text' })
//   imageUrl: string;

//   @Column({ type:'number' })
//   likes: number;

//   @Column({ type:'number' })
//   comments: number;

//   @Column({ type: 'text', nullable: true })
//   caption: string;

//   @ManyToOne(() => Auth, (auth) => auth.images, { onDelete: 'CASCADE' }) // Correct reference
//   user: Auth;
// }


// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Auth } from 'src/auth/entities/auth.entity';
// import { PostLike } from './post-like.entity';
// import { PostComment } from './post-comment.entity';

// @Entity()
// export class Gallery {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'text' })
//   imageUrl: string;

//   @Column({ type: 'int', default: 0 })
//   likes: number;

//   @Column({ type: 'int', default: 0 })
//   comments: number;

//   @Column({ type: 'text', nullable: true })
//   caption: string;

//   @ManyToOne(() => Auth, (auth) => auth.images, { onDelete: 'CASCADE' })
//   user: Auth;

//   @OneToMany(() => PostLike, (like) => like.gallery)
//   likedby: PostLike[];

//   @OneToMany(() => PostComment, (comment) => comment.gallery)
//   commentsList: PostComment[];
// }


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { PostLike } from './post-like.entity';
import { PostComment } from './post-comment.entity';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ nullable: true })
  caption?: string;

  @ManyToOne(() => Auth, (user) => user.gallery)
  user: Auth;

  @OneToMany(() => PostLike, (like) => like.gallery, { cascade: true })
  likes: PostLike[];

  @OneToMany(() => PostComment, (comment) => comment.gallery, { cascade: true })
  comments: PostComment[];
}
