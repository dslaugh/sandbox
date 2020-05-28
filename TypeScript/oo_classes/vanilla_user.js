class User {
	constructor(name) {
		this.assertValidName(name);
		this.name = name;
	}

	assertValidName(name) {
		const nameIsValid = name.length > 3;
		if (!nameIsValid) {
			throw Error('The given name is not valid');
		}
	}

	speak() {
		console.log(`I am ${this.name}`);
	}
}

//new User('G');

const user = new User('Groot');
user.speak();

user.name = 'G';
user.speak();

const anotherUser = new User(['A', 'B', 'C', 'D']);
anotherUser.speak();