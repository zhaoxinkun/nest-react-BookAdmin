import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {
  }


  // 查询list
  @Get('list')
  findAll() {
    return this.bookService.findAll();
  }

  // 查id
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.bookService.findOne(+id);
  }

  // 新增书记
  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  // 更新书记
  @Put('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
