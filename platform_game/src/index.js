const DOMDisplay = require('./DOMDisplay');
const CanvasDisplay = require('./CanvasDisplay');
const Level = require('./Level');
const State = require('./State');
const gameLevels = require('./gameLevels');
const {	trackKeys, runAnimation } = require('./helpers');

const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

function runLevel(level, Display) {
	let display = new Display(document.body, level);
	let state = State.start(level);
	let ending = 1;
	return new Promise(resolve => {
		runAnimation(time => {
			state = state.update(time, arrowKeys);
			display.syncState(state);
			if (state.status === 'playing') {
				return true;
			} else if (ending > 0) {
				ending -= time;
				return true;
			} else {
				display.clear();
				resolve(state.status);
				return false;
			}
		});
	});
}

async function runGame(plans, Display) {
	for (let level = 0; level < plans.length;) {
		let status = await runLevel(new Level(plans[level]), Display);
		if (status === 'won') {
			level++;
		}
	}
	console.log('You won!');
}


runGame(gameLevels, CanvasDisplay).then(() => {
	console.log('Game over');
});
