class User {
  static readonly minimumNameLength: number = 4;

  constructor(private _name: string, private readonly _email: string) {
    User.assertValidName(_name);
  }

  static assertValidName(name: string) {
    const nameIsValid = name.length >= User.minimumNameLength;
    if (!nameIsValid) {
      throw Error('The given name is not valid');
    }
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    User.assertValidName(newName);
    this._name = newName;
  }

  get email(): string {
    return this._email;
  }

  speak() {
    console.log(`I am ${this.name}. My email is ${this.email}.`);
  }
}

const user = new User('Groot', 'groot@grootmail.com');
user.speak();

user.name = 'Rocket'; // this works
user.name = 'R'; // throws error
