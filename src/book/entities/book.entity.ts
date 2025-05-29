import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookName: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column()
  cover: string;

}
