import { RegisterUser } from './register.user';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { Hasher } from 'src/auth/domain/services/hasher';
import { UserEntity } from '../../domain/entities/user.entity';
import { RegisterUserInput } from './register.user.input';

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return await Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};

const mockUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async save(user: UserEntity): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new UserRepositoryStub();
};

type SutTypes = {
  sut: RegisterUser;
  hasherStub: Hasher;
  userRepositoryStub: UserRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher();
  const userRepositoryStub = mockUserRepository();
  const sut = new RegisterUser(hasherStub, userRepositoryStub);

  return {
    sut,
    hasherStub,
    userRepositoryStub,
  };
};

const mockRegisterUserInput = (): RegisterUserInput => ({
  firstName: 'anyname',
  email: 'any_email@mail.com',
  surname: 'any surname',
  password: 'any_password',
});

describe('Register User', () => {
  test('should register an user on success', async () => {
    const { sut } = makeSut();
    const input = mockRegisterUserInput();
    await sut.execute(input);
  });

  test('should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut();

    const hashSpy = jest.spyOn(hasherStub, 'hash');
    const input = mockRegisterUserInput();
    await sut.execute(input);
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  test('should thow if Hasher thows', async () => {
    const { sut, hasherStub } = makeSut();

    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const input = mockRegisterUserInput();
    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow();
  });

  test('should thow if userRepositoryStub thows', async () => {
    const { sut, userRepositoryStub } = makeSut();

    jest.spyOn(userRepositoryStub, 'save').mockImplementationOnce(() => {
      throw new Error();
    });
    const input = mockRegisterUserInput();
    const promise = sut.execute(input);

    await expect(promise).rejects.toThrow();
  });
});
