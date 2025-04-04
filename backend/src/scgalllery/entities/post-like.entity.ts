// import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Auth } from 'src/auth/entities/auth.entity';
// import { Gallery } from './scgalllery.entity';

// @Entity()
// export class PostLike {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Gallery, (gallery) => gallery.likedBy, { onDelete: 'CASCADE' })
//   gallery: Gallery;

//   @ManyToOne(() => Auth, { onDelete: 'CASCADE' })
//   user: Auth;
// }


import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Gallery } from './scgalllery.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Entity('post_like')
export class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Gallery, (gallery) => gallery.likes, { onDelete: 'CASCADE' })
  gallery: Gallery;

  @ManyToOne(() => Auth, (user) => user.likes, { onDelete: 'CASCADE' })
  user: Auth;
}
