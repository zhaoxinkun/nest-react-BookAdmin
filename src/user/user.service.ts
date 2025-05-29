import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class UserService {

  constructor(
    // 使用仓库管理器方式,注入我们的数据库中的表
    @InjectRepository(User) private userRepository: Repository<User>) {
  }


  // 写一个查询用户是否存在的公共逻辑
  async findUser(registerUserDto: RegisterUserDto): Promise<boolean> {

    // 先查询用户是否存在
    const findUser = await this.userRepository.findOne({
      where: {
        username: registerUserDto.username,
      },
    });

    // 存在报错
    if (findUser) {
      throw new HttpException(`用户已存在了`, HttpStatus.CONFLICT);
    }

    return false;

  }

  // 查询所有用户
  getAll() {
    return this.userRepository.find();
  }

  // 创建用户
  async create(registerUserDto: RegisterUserDto) {

    // 看看存在不
    await this.findUser(registerUserDto);

    // 不存在的处理
    const user = new User();
    // 这里不用搞id,因为在实体里,id是自增量的主键
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;

    // 写入数据库
    await this.userRepository.save(user);

    return {
      status: HttpStatus.CREATED,
      message: '用户创建成功',
      user,
    };
  }


  async login(loginUserDto: LoginUserDto) {

    const user = await this.userRepository.findOne({
      where: {
        username: loginUserDto.username,
      },
    });

    // 用户不存在
    if (!user) {
      throw new HttpException(`用户不存在`, HttpStatus.NOT_FOUND);
    }

    // 校验密码
    const isPasswordValid = user.password === loginUserDto.password;
    if (!isPasswordValid) {
      throw new HttpException(`密码错误`, HttpStatus.UNAUTHORIZED);
    }

    return {
      status: HttpStatus.OK,
      message: '登录成功',
      user,
    };

  }

}
