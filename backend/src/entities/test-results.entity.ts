import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Test } from './test.entity';

@Entity()
export class TestResults {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Test)
  test: Test;

  @Column()
  score: number;

  @Column()
  completedAt: Date;
}
