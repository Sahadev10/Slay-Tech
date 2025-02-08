// measurement.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  heightCm: number;

  @Column({ nullable: true })
  shoulderWidthCm: number;

  @Column({ nullable: true })
  leftArmLengthCm: number;

  @Column({ nullable: true })
  rightArmLengthCm: number;

  @Column({ nullable: true })
  leftLegLengthCm: number;

  @Column({ nullable: true })
  rightLegLengthCm: number;

  @Column({ nullable: true })
  hipWidthCm: number;

  @Column({ nullable: true })
  chestCircumferenceCm: number;

  @Column({ nullable: true })
  neckCircumferenceCm: number;

  @Column({ nullable: true })
  waistCircumferenceCm: number;

  @Column({ nullable: true })
  backLengthCm: number;
}
