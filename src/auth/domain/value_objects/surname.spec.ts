import { faker } from '@faker-js/faker';
import { Surname } from './surname';

describe('Surname', () => {
  test('must create an surnme with two names', () => {
    const surname = faker.person.middleName() + faker.person.lastName();
    const sut = new Surname(surname);
    expect(sut.value).toBe(surname);
  });

  test('must create an surnme with one name', () => {
    const surname = faker.person.middleName();
    const sut = new Surname(surname);
    expect(sut.value).toBe(surname);
  });

  test('must create an surname with symbol', () => {
    const surname = 'çáêã';
    const sut = new Surname(surname);
    expect(sut.value).toBe(surname);
  });

  test('should fail when trying to create an short name', () => {
    const name = 'n';
    expect(() => new Surname(name)).toThrow(new Error('Invalid Surname'));
  });

  test('should fail when trying to create an empty name', () => {
    const name = '';
    expect(() => new Surname(name)).toThrow(new Error('Invalid Surname'));
  });
});
