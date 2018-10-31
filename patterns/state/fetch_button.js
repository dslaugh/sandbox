class ReadyState {
	constructor(target) {
		this.name = 'ReadyState';
		this.target = target;
	}

	fetch(url) {
		console.log('Fetching...');
		this.target.changeState(this.target.states.disabled);
		return fetch(url);
	}
}

class DisabledState {
	constructor(target) {
		this.name = 'DisabledState';
		this.target = target;
	}

	fetch() {
		return Promise.reject('Action is disabled');
	}
}

class FetchButton {
	constructor() {
		this.states = {
			ready: new ReadyState(this),
			disabled: new DisabledState(this),
		};
		this.state = this.states.ready;
	}

	changeState(state) {
		this.state = state;
	}

	fetch(url) {
		return this.state.fetch(url)
			.then((result) => {
				this.changeState(this.states.ready);
				return result;
			})
			.catch((error) => {
				throw error;
			});
	}
}
