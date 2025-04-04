import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "src/image/entities/image.entity";
import { Customisation } from "src/customisation/entities/customisation.entity";
import { Gallery } from "src/scgalllery/entities/scgalllery.entity";
import { PostComment } from "src/scgalllery/entities/post-comment.entity";
import { PostLike } from "src/scgalllery/entities/post-like.entity";

@Entity({name : 'users'})
export class Auth {

    @PrimaryGeneratedColumn()
    id:string;

    @Column({type: 'text', unique:true})
    username: string;

    @Column({type: 'text'})
    email: string;

    @Column({type: 'text'})
    password: string;

    @OneToMany(()=>Image,(image)=>image.auth)
    images:Image[];

    @OneToMany(()=>Customisation,(customisation)=>customisation.auth)    
    cus_images:Customisation[];

    @OneToMany(() => Gallery, (gallery) => gallery.user, { cascade: true }) // ✅ Added relationship for Gallery
    gallery: Gallery[];

    @OneToMany(() => PostLike, (like) => like.user) // ✅ Added relationship for Likes
    likes: PostLike[];
  
    @OneToMany(() => PostComment, (comment) => comment.user) // ✅ Added relationship for Comments
    comments: PostComment[];

    


}
