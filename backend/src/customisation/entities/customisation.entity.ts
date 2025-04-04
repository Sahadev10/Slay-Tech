import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "src/auth/entities/auth.entity";
@Entity()
export class Customisation {
@PrimaryGeneratedColumn('uuid')
cus_img_id:string;

@Column({type:'varchar',length:255})
cus_image_url:string;

@ManyToOne(()=>Auth,(auth)=>auth.cus_images)
@JoinColumn({name:'cus_image'})
auth:Auth





}
