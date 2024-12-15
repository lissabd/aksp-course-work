import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionText: string;

  @Column('simple-json')
  answers: { text: string; isCorrect: boolean }[];

  @ManyToOne(() => Test, (test) => test.questions)
  test: Test;
}
