import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "src/auth/entities/auth.entity";
@Entity()
export class Customisation {
@PrimaryGeneratedColumn()
cus_img_id:number;

@Column({type:'varchar',length:255})
cus_image_url:string;

// @ManyToOne(()=>Auth,(auth)=>auth.cus_images)
// @JoinColumn({name:'cus_image'})
// auth:Auth

@ManyToOne(() => Auth, (auth) => auth.cus_images)
@JoinColumn({ name: 'auth_id' })  // FK column name in customisation table
auth: Auth;




}
