import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './entities/user.entity';
import { PersonalInfo } from './entities/personal-info.entity';
import { Test } from './entities/test.entity';
import { Question } from './entities/question.entity';
import { TestResults } from './entities/test-results.entity';
import { TestsModule } from './tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'lms',
      entities: [User, PersonalInfo, Test, Question, TestResults],
      synchronize: true, 
    }),
    AuthModule,
    TestsModule,
    UsersModule
  ],
})
export class AppModule {}
