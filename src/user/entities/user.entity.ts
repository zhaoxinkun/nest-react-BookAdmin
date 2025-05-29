import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // 定义自增的主键
  @PrimaryGeneratedColumn()
  id: number;

  // 定义其他特殊列
  @Column()
  username: string;

  @Column()
  password: string;
}
