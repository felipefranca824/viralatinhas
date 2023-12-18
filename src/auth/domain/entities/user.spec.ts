import { faker } from '@faker-js/faker';
import { UserEntity } from './user.entity';

describe('Email', () => {
  test('must create an User', () => {
    const firstName = faker.person.firstName();
    const email = faker.internet.email();
    const surname = faker.person.middleName();
    const password = faker.internet.password();
    const sut = new UserEntity(firstName, surname, email, password);
    expect(sut.email.value).toBe(email);
    expect(sut.firstName.value).toBe(firstName);
    expect(sut.surname.value).toBe(surname);
    expect(sut.passwordHashed).toBe(password);
  });
});
