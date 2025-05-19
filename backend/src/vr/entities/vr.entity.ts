import { Auth } from "src/auth/entities/auth.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vr {
    @PrimaryGeneratedColumn('uuid')
    image_id: string;

    @ManyToOne(() => Auth, (auth) => auth.vr)
    @JoinColumn({ name: 'auth_id' })
    auth: Auth;

    @Column({ type: 'varchar', length: 255 })
    image_url: string;

    
}
