import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ username, email, password: hashedPassword });
    return this.usersRepository.save(user);
  }
}
