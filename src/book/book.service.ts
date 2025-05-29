import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {
  }


  // 使用书名查看数据库
  async findBookByName(bookName: string) {

    const findBook = await this.bookRepository.findOne({
      where: {
        bookName: bookName,
      },
    });

    if (findBook) {
      throw new HttpException(`书籍已存在`, HttpStatus.CONFLICT);
    }

    return findBook;
  }


  // 使用id查询数据库
  async findById(id: number) {
    const findBook = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findBook) {
      throw new HttpException(`图书不存在`, HttpStatus.NOT_FOUND);
    }

    return findBook;
  }


  // 新增书籍
  async create(createBookDto: CreateBookDto) {

    await this.findBookByName(createBookDto.bookName);

    const book = new Book();
    book.bookName = createBookDto.bookName;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    await this.bookRepository.save(book);

    return {
      status: HttpStatus.CREATED,
      message: '创建成功',
      book,
    };
  }

  // 查询所有
  async findAll() {
    return this.bookRepository.find();
  }


  // 更新书记
  async update(updateBookDto: UpdateBookDto) {

    const findBook = await this.bookRepository.findOne({
        where: {
          bookName: updateBookDto.bookName,
        },
      },
    );

    if (findBook) {
      findBook.author = updateBookDto.author;
      findBook.description = updateBookDto.description;
      findBook.cover = updateBookDto.cover;
      return this.bookRepository.save(findBook);
    }
    throw new HttpException(`你要修改的书籍不存在`, HttpStatus.NOT_FOUND);

  }

  // 删除书记
  async remove(id: number) {
    const findBook = await this.findById(id);

    await this.bookRepository.remove(findBook);

    return {
      status: HttpStatus.OK,
      message: '删除成功',
    };


  }
}
