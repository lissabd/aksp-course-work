import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  async getAllTests() {
    return this.testsService.getAllTests();
  }

  @Get(':id')
  async getTestById(@Param('id') id: number) {
    return this.testsService.getTestById(id);
  }

  @Post()
  async createTest(@Body() testData:
   { title: string;
     category: string;
      questions: { questionText: string; answers: { text: string; isCorrect: boolean }[] }[] }) {
    return this.testsService.createTest(testData);
  }

  @Post(':id/submit')
  async submitTestAnswers(
    @Param('id') testId: number,
    @Body() { userId, answers }: { userId: number; answers: { questionId: number; selectedAnswers: string[] }[] },
  ) {
    return this.testsService.submitTestAnswers(userId, testId, answers);
  }

  @Get('results/:userId')
  async getUserTestResults(@Param('userId') userId: number) {
    return this.testsService.getUserTestResults(userId);
  }
}
