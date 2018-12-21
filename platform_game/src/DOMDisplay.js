const { elt, drawActors, drawGrid } = require('./helpers');
const { scale } = require('./constants');

class DOMDisplay {
	constructor(parent, level) {
		this.dom = elt('div', { class: 'game' }, drawGrid(level));
		this.actorLayer = null;
		parent.appendChild(this.dom);
	}

	clear() {
		this.dom.remove();
	}
}

DOMDisplay.prototype.syncState = function(state) {
	if (this.actorLayer) {
		this.actorLayer.remove();
	}

	this.actorLayer = drawActors(state.actors);
	this.dom.appendChild(this.actorLayer);
	this.dom.className = `game ${state.status}`;
	this.scrollPlayerIntoView(state);
};

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
	let width = this.dom.clientWidth;
	let height = this.dom.scrollHeight;
	let margin = width / 3;

	let left = this.dom.scrollLeft;
	let right = left + width;
	let top = this.dom.scrollTop;
	let bottom = top + height;

	let player = state.player;
	let center = player.pos.plus(player.size.times(0.5)).times(scale);

	if (center.x < (left + margin)) {
		this.dom.scrollLeft = center.x - margin;
	} else if (center.x > (right - margin)) {
		this.dom.scrollLeft = center.x + margin - width;
	}

	if (center.y < (top + margin)) {
		this.dom.scrollTop = center.y - margin;
	} else if (center.y > (bottom - margin)) {
		this.dom.scrollTop = center.y + margin - height;
	}
};

module.exports = DOMDisplay;
