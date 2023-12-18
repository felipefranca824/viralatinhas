import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { Hasher } from 'src/auth/domain/services/hasher';
import { RegisterUserInput } from './register.user.input';

export class RegisterUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: RegisterUserInput): Promise<void> {
    const { firstName, surname, email, password } = input;
    const passwordHashed = await this.hasher.hash(password);
    const user = new UserEntity(firstName, surname, email, passwordHashed);

    await this.userRepository.save(user);
  }
}
