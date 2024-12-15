import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '../entities/test.entity';
import { Question } from '../entities/question.entity';
import { TestResults } from '../entities/test-results.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(TestResults)
    private readonly testResultsRepository: Repository<TestResults>,
  ) {}

  async getAllTests() {
    return this.testRepository.find({ relations: ['questions'] });
  }

  async getTestById(id: number) {
    return this.testRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async createTest(testData: { title: string; category: string; questions: { questionText: string; answers: { text: string; isCorrect: boolean }[] }[] }) {
    const test = this.testRepository.create({
      title: testData.title,
      category: testData.category,
      questions: testData.questions.map((q) =>
        this.questionRepository.create({
          questionText: q.questionText,
          answers: q.answers,
        }),
      ),
    });
    return this.testRepository.save(test);
  }

  async submitTestAnswers(userId: number, testId: number, answers: { questionId: number; selectedAnswers: string[] }[]) {
    const test = await this.testRepository.findOne({ where: { id: testId }, relations: ['questions'] });
    if (!test) {
      throw new Error('Test not found');
    }

    let score = 0;

    test.questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);
      if (userAnswer) {
        const correctAnswers = question.answers.filter((a) => a.isCorrect).map((a) => a.text);
        if (JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswer.selectedAnswers.sort())) {
          score++;
        }
      }
    });

    const testResult = this.testResultsRepository.create({
      user: { id: userId },
      test: { id: testId },
      score,
      completedAt: new Date(),
    });

    return this.testResultsRepository.save(testResult);
  }

  async getUserTestResults(userId: number) {
    return this.testResultsRepository.find({
      where: { user: { id: userId } },
      relations: ['test'],
    });
  }
}
