export class FirstName {
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid First name');
    this.value = value;
  }

  validate(value: string): boolean {
    const minLenght = 2;
    if (value.length < minLenght) return false;
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(value)) return false;
    return true;
  }
}
