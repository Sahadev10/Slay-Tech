import { UUID } from "crypto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "src/image/entities/image.entity";

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
    
}
