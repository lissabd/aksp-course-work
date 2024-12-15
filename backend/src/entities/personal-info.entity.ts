import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PersonalInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  patronymic: string;
}
