import { faker } from '@faker-js/faker';
import { FirstName } from './first.name';

describe('FistName', () => {
  test('must create an first name', () => {
    const fistName = faker.person.firstName();
    const sut = new FirstName(fistName);
    expect(sut.value).toBe(fistName);
  });

  test('must create an first name with symbol', () => {
    const fistName = 'çáêã';
    const sut = new FirstName(fistName);
    expect(sut.value).toBe(fistName);
  });

  test('should fail when trying to create an name with space', () => {
    const name = 'name with space';
    expect(() => new FirstName(name)).toThrow(new Error('Invalid First name'));
  });

  test('should fail when trying to create an short name', () => {
    const name = 'n';
    expect(() => new FirstName(name)).toThrow(new Error('Invalid First name'));
  });

  test('should fail when trying to create an empty name', () => {
    const name = '';
    expect(() => new FirstName(name)).toThrow(new Error('Invalid First name'));
  });
});
