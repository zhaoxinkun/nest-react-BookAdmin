import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
    type: 'mysql', //什么类型的数据库
    host: 'localhost', //端口ip
    port: 3306, //端口
    username: 'root', //用户名
    password: 'root', //密码
    database: 'book-end', //操作的数据库
    entities: [User], //注入那些实体
    synchronize: true, //同步构建数据库,真实开发千万别开
    logging: true, //日志打印等级
  } as TypeOrmModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
