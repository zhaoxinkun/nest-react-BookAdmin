import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';


@Controller('user')
export class UserController {
  // 注入user服务
  constructor(
    private readonly userService: UserService) {
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  // post请求
  @Post('register')
  // 使用接收body数据  ,数据必须符合registerUserDto的结构
  create(@Body() registerUserDto: RegisterUserDto) {

    return this.userService.create(registerUserDto)
  }
}
