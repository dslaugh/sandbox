//http://robdodson.me/take-control-of-your-app-with-the-javascript-state-patten/

// const player = {
// 	state: undefined,
// 	states: {
// 		playing: {
// 			initialize: function (target) {
// 				this.target = target;
// 			},
// 			enter: function () {
// 				console.log('setting up the playing state');
// 			},
// 			execute: function () {
// 				console.log('playing!');
// 			},
// 			play: function () {
// 				console.log('already playing');
// 			},
// 			stop: function () {
// 				this.target.changeState(this.target.states.stopping);
// 			},
// 			pause: function () {
// 				this.target.changeState(this.target.states.pausing);
// 			},
// 			exit: function () {
// 				console.log('tearing down the playing state');
// 			},
// 		},
// 		stopping: {
// 			initialize: function (target) {
// 				this.target = target;
// 			},
// 			enter: function () {
// 				console.log('setting up the stopping state');
// 			},
// 			execute: function () {
// 				console.log('stopping!');
// 			},
// 			play: function () {
// 				this.target.changeState(this.target.states.playing);
// 			},
// 			stop: function () {
// 				console.log('already stopped');
// 			},
// 			pause: function () {
// 				this.target.changeState(this.target.state.pausing);
// 			},
// 			exit: function () {
// 				console.log('tearing down the stopping state');
// 			},
// 		},
// 		pausing: {
// 			initialize: function (target) {
// 				this.target = target;
// 			},
// 			enter: function () {
// 				console.log('setting up the pausing state');
// 			},
// 			execute: function () {
// 				console.log('pausing!');
// 			},
// 			play: function () {
// 				this.target.changeState(this.target.states.playing);
// 			},
// 			stop: function () {
// 				this.target.changeState(this.target.state.stopping);
// 			},
// 			pause: function () {
// 				console.log('already paused');
// 			},
// 			exit: function () {
// 				console.log('tearing down the pausing state');
// 			},
// 		},
// 	},
// 	initialize: function () {
// 		this.states.playing.initialize(this);
// 		this.states.stopping.initialize(this);
// 		this.states.pausing.initialize(this);
// 		this.state = this.states.stopping;
// 	},
// 	play: function () {
// 		this.state.play();
// 	},
// 	stop: function () {
// 		this.state.stop();
// 	},
// 	pause: function () {
// 		this.state.pause();
// 	},
// 	changeState: function(state) {
// 		if (this.state !== state) {
// 			this.state.exit();
// 			this.state = state;
// 			this.state.enter();
// 			this.state.execute();
// 		}
// 	},
// };

// const basePlayerState = {
// 	initialize: function(target, stateName) {
// 		this.target = target;
// 		this.stateName = stateName;
// 	},
// 	enter: function () {
// 		console.log(`setting up the ${this.stateName} state`);
// 	},
// 	execute: function () {
// 		console.log(`${this.stateName}!`);
// 	},
// 	play: function () {
// 		this.target.changeState(this.target.states.playing);
// 	},
// 	stop: function () {
// 		this.target.changeState(this.target.states.stopping);
// 	},
// 	pause: function () {
// 		this.target.changeState(this.target.states.pausing);
// 	},
// 	exit: function () {
// 		console.log(`tearing down the ${this.stateName} state`);
// 	},
// };
//
// const player = {
// 	state: undefined,
// 	initialize: function() {
// 		this.states.playing.initialize(this, 'playing');
// 		this.states.stopping.initialize(this, 'stopping');
// 		this.states.pausing.initialize(this, 'pausing');
// 		this.state = this.states.stopping;
// 	},
// 	play: function () {
// 		this.state.play();
// 	},
// 	stop: function () {
// 		this.state.stop();
// 	},
// 	pause: function () {
// 		this.state.pause();
// 	},
// 	changeState: function (state) {
// 		if (this.state !== state) {
// 			this.state.exit();
// 			this.state = state;
// 			this.state.enter();
// 			this.state.execute();
// 		}
// 	},
// 	states: {
// 		playing: Object.assign({}, basePlayerState, {
// 			play: function () {
// 				console.log('Already playing');
// 			}
// 		}),
// 		stopping: Object.assign({}, basePlayerState, {
// 			stop: function () {
// 				console.log('Already stopped');
// 			}
// 		}),
// 		pausing: Object.assign({}, basePlayerState, {
// 			pause: function () {
// 				console.log('Already paused');
// 			}
// 		}),
// 	},
// };
//
// player.initialize();
// player.stop();
// player.play();
// player.pause();
// player.pause();
// player.pause();
// player.play();



x.initialize();
x.act();
x.rest();
x.rest();