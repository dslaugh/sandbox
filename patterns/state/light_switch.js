// const LightSwitch = {
// 	state: undefined,
// 	states: {
// 		on: {
// 			initialize(target) {
// 				this.target = target;
// 			},
// 			turnOn() {
// 				console.log('The light is already on');
// 			},
// 			turnOff() {
// 				this.target.changeState(this.target.states.off);
// 			},
// 			execute() {
// 				console.log('The light is now on');
// 			},
// 		},
// 		off: {
// 			initialize(target) {
// 				this.target = target;
// 			},
// 			turnOn() {
// 				this.target.changeState(this.target.states.on);
// 			},
// 			turnOff() {
// 				console.log('The light is already off');
// 			},
// 			execute() {
// 				console.log('The light is now off');
// 			},
// 		}
// 	},
// 	initialize() {
// 		this.states.on.initialize(this);
// 		this.states.off.initialize(this);
// 		this.state = this.states.off;
// 	},
// 	changeState(state) {
// 		this.state = state;
// 		this.state.execute();
// 	},
// 	turnOn() {
// 		this.state.turnOn();
// 	},
// 	turnOff() {
// 		this.state.turnOff();
// 	},
// };


// class LightSwitch {
// 	constructor() {
// 		this.states = {
// 			on: this.onState(this),
// 			off: this.offState(this),
// 		};
//
// 		this.state = this.states.off;
// 	}
//
// 	onState(target) {
// 		return {
// 			target,
// 			turnOn() {
// 				console.log('The light is already on');
// 			},
// 			turnOff() {
// 				this.target.changeState(this.target.states.off);
// 			},
// 			execute() {
// 				console.log('The light is now on');
// 			}
// 		};
// 	}
//
// 	offState(target) {
// 		return {
// 			target,
// 			turnOn() {
// 				this.target.changeState(this.target.states.on);
// 			},
// 			turnOff() {
// 				console.log('The light is already off');
// 			},
// 			execute() {
// 				console.log('The light is now off');
// 			},
// 		};
// 	}
//
// 	changeState(state) {
// 		this.state = state;
// 		this.state.execute();
// 	}
//
// 	turnOn() {
// 		this.state.turnOn();
// 	}
//
// 	turnOff() {
// 		this.state.turnOff();
// 	}
// }


class OnState {
	constructor(target) {
		this.target = target;
	}

	turnOn() {
		console.log('The light is already on');
	}

	turnOff() {
		this.target.changeState(this.target.states.off);
	}

	execute() {
		console.log('The light is now on');
	}
}

class OffState {
	constructor(target) {
		this.target = target;
	}

	turnOn() {
		this.target.changeState(this.target.states.on);
	}

	turnOff() {
		console.log('The light is already off');
	}

	execute() {
		console.log('The light is now off');
	}
}

class LightSwitch {
	constructor() {
		this.states = {
			on: new OnState(this),
			off: new OffState(this),
		};

		this.state = this.states.off;
	}

	changeState(state) {
		this.state = state;
		this.state.execute();
	}

	turnOn() {
		this.state.turnOn();
	}

	turnOff() {
		this.state.turnOff();
	}
}


// const lightSwitch = new LightSwitch();
//
// // lightSwitch.initialize();
// lightSwitch.turnOff();
// lightSwitch.turnOn();
// lightSwitch.turnOn();
// lightSwitch.turnOff();

function Test() {
	const states = {
		on: {
			execute() {
				console.log('The switch flips and the light turns on');
			},
			turnOn() {
				console.log('The light is already on');
			},
			turnOff() {
				changeState(states.off);
			},
		},
		off: {
			execute() {
				console.log('The switch flips and the light turns off');
			},
			turnOn() {
				changeState(states.on);
			},
			turnOff() {
				console.log('The light is already off');
			},
		},
	};
	let state = states.off;

	function changeState(newState) {
		state = newState;
		state.execute();
	}

	function turnOn() {
		console.log('Attempting to turn it on');
		state.turnOn();
	}

	function turnOff() {
		console.log('Attempting to turn it off');
		state.turnOff();
	}

	return {
		turnOn,
		turnOff,
	};
}

const test1 = Test();
test1.turnOn();
test1.turnOn();
test1.turnOff();
test1.turnOff();

// const test2 = Test();
// test2.turnOff();
// test2.turnOff();
// test2.turnOn();
// test2.turnOn();
