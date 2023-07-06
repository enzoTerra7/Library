import { Module } from '@nestjs/common';
import { BookModule } from './book/module/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BookModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
