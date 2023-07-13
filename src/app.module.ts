import { Module } from '@nestjs/common';
import { BookModule } from './book/module/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CollectionModule } from './colection/collection.module';

@Module({
  imports: [BookModule, UserModule, AuthModule, CollectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
