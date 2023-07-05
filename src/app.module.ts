import { Module } from '@nestjs/common';
import { BookModule } from './book/module/book.module';

@Module({
  imports: [BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
