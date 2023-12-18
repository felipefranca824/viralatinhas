import { Email } from '../value_objects/email';
import { FirstName } from '../value_objects/first.name';
import { Surname } from '../value_objects/surname';

export class UserEntity {
  firstName: FirstName;
  surname: Surname;
  email: Email;
  passwordHashed: string;

  constructor(
    firstName: string,
    surname: string,
    email: string,
    passwordHashed: string,
  ) {
    this.email = new Email(email);
    this.firstName = new FirstName(firstName);
    this.surname = new Surname(surname);
    this.passwordHashed = passwordHashed;
  }
}
