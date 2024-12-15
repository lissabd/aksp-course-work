import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PersonalInfo } from '../entities/personal-info.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PersonalInfo)
    private readonly personalInfoRepository: Repository<PersonalInfo>,
  ) {}

  async findAll() {
    return this.userRepository.find({ relations: ['personalInfo'] });
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['personalInfo'] });
  }

  async blockUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.role = 'blocked';
    return this.userRepository.save(user);
  }
}
