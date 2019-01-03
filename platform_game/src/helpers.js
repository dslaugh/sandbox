const { scale } = require('./constants');

function elt(name, attrs, ...children) {
	let dom = document.createElement(name);
	for (let attr of Object.keys(attrs)) {
		dom.setAttribute(attr, attrs[attr]);
	}

	for (let child of children) {
		dom.appendChild(child);
	}

	return dom;
}

function drawGrid(level) {
	return elt("table", {
		class: "background",
		style: `width: ${level.width * scale}px`
	}, ...level.rows.map(row =>
		elt("tr", {style: `height: ${scale}px`},
			...row.map(type => elt("td", {class: type})))
	));
}

function drawActors(actors) {
	return elt('div', {}, ...actors.map((actor) => {
		let rect = elt('div', { class: `actor ${actor.type}`});
		rect.style.width = `${actor.size.x * scale}px`;
		rect.style.height = `${actor.size.y * scale}px`;
		rect.style.left = `${actor.pos.x * scale}px`;
		rect.style.top = `${actor.pos.y * scale}px`;
		return rect;
	}));
}

function overlap(actor1, actor2) {
	return  actor1.pos.x + actor1.size.x > actor2.pos.x &&
		actor1.pos.x < actor2.pos.x + actor2.size.x &&
		actor1.pos.y + actor1.size.y > actor2.pos.y &&
		actor1.pos.y < actor2.pos.y + actor2.size.y;
}

function trackKeys(keys) {
	let down = Object.create(null);
	function track(event) {
		if (keys.includes(event.key)) {
			down[event.key] = event.type === 'keydown';
		}
	}
	window.addEventListener('keydown', track);
	window.addEventListener('keyup', track);
	return down;
}

function runAnimation(frameFunc) {
	let lastTime = null;
	function frame(time) {
		if (lastTime !== null) {
			let timeStep = Math.min(time - lastTime, 100) / 1000;
			if (frameFunc(timeStep) === false) {
				return;
			}
		}
		lastTime = time;
		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
}

function flipHorizontally(context, around) {
	context.translate(around, 0);
	context.scale(-1, 1);
	context.translate(-around, 0);
}

module.exports = {
	elt,
	drawGrid,
	drawActors,
	overlap,
	trackKeys,
	runAnimation,
	flipHorizontally,
};
