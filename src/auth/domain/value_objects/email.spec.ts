import { faker } from '@faker-js/faker';
import { Email } from './email';

describe('Email', () => {
  test('must create an email', () => {
    const email = faker.internet.email();
    const sut = new Email(email);
    expect(sut.value).toBe(email);
  });

  test('should fail when trying to create an invalid email', () => {
    const email = 'any_email_invalid';
    expect(() => new Email(email)).toThrow(new Error('Invalid Email'));
  });
});
