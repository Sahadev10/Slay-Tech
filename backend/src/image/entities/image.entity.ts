import { Auth } from "src/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Image {
//     @PrimaryGeneratedColumn()
//     image_id:string;

//     @Column()
//     id:string;

//     @ManyToOne(() => Auth,(auth)=>auth.images)
//     @JoinColumn({name:'id'})
//     auth:Auth;

//     @Column({type:"varchar",length:255})
//     image_url:string;
    

// }


@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    image_id: string;

    @ManyToOne(() => Auth, (auth) => auth.images)
    @JoinColumn({ name: 'auth_id' })
    auth: Auth;

    @Column({ type: 'varchar', length: 255 })
    image_url: string;

    
}
