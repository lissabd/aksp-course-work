import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../entities/test.entity';
import { Question } from '../entities/question.entity';
import { TestResults } from '../entities/test-results.entity';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question, TestResults])],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
