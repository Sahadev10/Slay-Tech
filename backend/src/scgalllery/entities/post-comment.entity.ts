// import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
// import { Auth } from 'src/auth/entities/auth.entity';
// import { Gallery } from './scgalllery.entity';

// @Entity()
// export class PostComment {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'text' })
//   comment: string;

//   @ManyToOne(() => Gallery, (gallery) => gallery.commentsList, { onDelete: 'CASCADE' })
//   gallery: Gallery;

//   @ManyToOne(() => Auth, { onDelete: 'CASCADE' })
//   user: Auth;
// }



import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Gallery } from './scgalllery.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Entity('post_comment')
export class PostComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, default: '' }) // ✅ Ensures comment is never NULL
  comment: string;

  @ManyToOne(() => Gallery, (gallery) => gallery.comments, { onDelete: 'CASCADE' })
  gallery: Gallery;

  @ManyToOne(() => Auth, (user) => user.comments, { onDelete: 'CASCADE', eager: true  })
  user: Auth;
}



