/// measurement.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  heightCm: number;

  @Column({ nullable: true,type: 'float' })
  waistCircumferenceCm: number;

  @Column({ nullable: true , type: 'float' })
  shoulderwidth: number;

  @Column({ nullable: true,type: 'float' })
  hipcircumference: number;

  @Column({ nullable: true,type: 'float' })
  torsolength: number;

  @Column({ nullable: true ,type: 'float'})
  fullarmlength: number;

  // ✅ Foreign key: userId
  @ManyToOne(() => Auth, (auth) => auth.measurements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @Column()
  userId: string;
}

