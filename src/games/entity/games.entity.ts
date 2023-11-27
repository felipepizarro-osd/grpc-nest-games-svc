import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  backgroundImages: string;

  @Column()
  description: string;

  @Column()
  released: string;

  @Column()
  metacritic: string;
}
