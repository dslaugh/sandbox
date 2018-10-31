// https://www.crondose.com/2016/08/when-to-use-the-decorator-pattern-in-development/

class User {
	constructor(name) {
		this.name = name;
	}

	greeting() {
		console.log('Welcome regular user,', this.name);
	}
}

class Admin extends User {
	greeting() {
		console.log('Welcome admin user,', this.name);
	}
}

class TrialUserDecorator {
	constructor(user) {
		this.user = user;
	}

	greeting() {
		console.log('You are a trial user,', this.user.name);
	}
}

const dave = new User('Dave');
dave.greeting();

const adminBob = new Admin('Bob');
adminBob.greeting();

const trialUserDave = new TrialUserDecorator(dave);
trialUserDave.greeting();