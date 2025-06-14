import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {

  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码最少 4 位'})
  password: string;
}
