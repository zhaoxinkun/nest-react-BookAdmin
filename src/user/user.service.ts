import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';


@Injectable()
export class UserService {

  constructor(
    // 使用仓库管理器方式,注入我们的数据库中的表
    @InjectRepository(User) private userRepository: Repository<User>) {
  }

  getAll() {
    return this.userRepository.find();
  }

  create(registerUserDto: RegisterUserDto) {
    return this.userRepository.save(registerUserDto);
  }

}
