class GumballStateMachine {
	constructor(count=0) {
		this.count = count;
		this.SOLD_OUT = 0;
		this.NO_QUARTER = 1;
		this.HAS_QUARTER = 2;
		this.SOLD = 3;

		this.state = count > 0 ? this.NO_QUARTER : this.SOLD_OUT;
	}

	insertQuarter() {
		switch (this.state) {
			case this.HAS_QUARTER:
				console.log('You cannot insert another quarter');
				break;
			case this.SOLD_OUT:
				console.log('You cannot insert a quarter, the machine is sold out');
				break;
			case this.NO_QUARTER:
				this.state = this.HAS_QUARTER;
				console.log('You inserted a quarter. Turn crank to receive gumball');
				break;
			case this.SOLD:
				console.log('Please wait, gumball is on the way');
				break;
			default:
				console.log('Unknown state');
		}
	}

	turnCrank() {
		switch (this.state) {
			case this.HAS_QUARTER:
				console.log('Crank is turning...');
				this.state = this.SOLD;
				this.dispense();
				break;
			case this.SOLD_OUT:
				console.log('You turn the crank but the machine is sold out');
				break;
			case this.NO_QUARTER:
				console.log('You turned the crank but there is no quarter');
				break;
			case this.SOLD:
				console.log('You turned the crank but you already got your gumball');
				break;
			default:
				console.log('Unknown state');
		}
	}

	ejectQuarter() {
		switch (this.state) {
			case this.HAS_QUARTER:
				console.log('Quarter returned');
				this.state = this.NO_QUARTER;
				break;
			case this.SOLD_OUT:
				console.log('You cannot eject, you have not inserted a quarter');
				break;
			case this.NO_QUARTER:
				console.log('You cannot eject, you have not inserted a quarter');
				break;
			case this.SOLD:
				console.log('Sorry, you already turned the crank');
				break;
			default:
				console.log('Unknown state');
		}
	}

	dispense() {
		switch (this.state) {
			case this.SOLD:
				console.log('A gumball comes rolling out of the slot');
				this.count -= 1;
				if (this.count <= 0) {
					console.log('Machine is now out of gumballs');
					this.state = this.SOLD_OUT;
				} else {
					console.log(`${this.count} gumballs remaining`);
					this.state = this.NO_QUARTER;
				}
				break;
			case this.NO_QUARTER:
				console.log('You must insert a quarter first');
				break;
			case this.SOLD_OUT:
				console.log('No gumball dispensed, the machine is empty');
				break;
			case this.HAS_QUARTER:
				console.log('No gumball dispensed');
				break;
			default:
				console.log('Unknown state');
		}
	}

	addGumballs(count) {
		this.count += count;
		switch (this.state) {
			case this.SOLD_OUT:
				console.log(`You added ${count} gumballs, total gumballs: ${this.count}`);
				this.state = this.NO_QUARTER;
				break;
			case this.SOLD:
			case this.NO_QUARTER:
			case this.HAS_QUARTER:
				console.log(`You added ${count} gumballs, total gumballs: ${this.count}`);
				break;
			default:
				console.log('Unknown state');
		}
	}
}

const machine = new GumballStateMachine(1);
console.log(machine);
machine.insertQuarter();
machine.turnCrank();

machine.turnCrank();
machine.ejectQuarter();
machine.dispense();

machine.insertQuarter();
machine.insertQuarter();
machine.turnCrank();
machine.turnCrank();

machine.addGumballs(3);
machine.turnCrank();
machine.insertQuarter();
machine.turnCrank();