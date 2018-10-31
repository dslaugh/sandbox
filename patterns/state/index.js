//https://www.smashingmagazine.com/2018/01/rise-state-machines/

const service = {
	getData() {
		const data = [{ id: 1, name: 'Dave' }];
		// return Promise.resolve(data);
		return Promise.reject(new Error('It broke'));
	},
};

const machine = {
	dispatch(actionName, ...payload) {
		console.log('Dispatching', actionName, payload);
		const action = this.transitions[this.state][actionName];

		if (action) {
			action.apply(machine, ...payload);
		}
	},
	changeStateTo(newState) {
		this.state = newState;
	},
	state: 'idle',
	transitions: {
		'idle': {
			click: function () {
				this.changeStateTo('fetching');
				service.getData()
					.then((data) => {
						try {
							this.dispatch('success', data);
						} catch (error) {
							this.dispatch('failure', error);
						}
					},
					(error) => {
						this.dispatch('failure', error)
					});
			},
		},
		'fetching': {
			success: function (data) {
				console.log('Success! data received: ', data);
				this.changeStateTo('idle');
			},
			failure: function (error) {
				console.log('There was an error', error.message);
				this.changeStateTo('error');
			},
		},
		'error': {
			retry: function () {
				this.changeStateTo('idle');
				this.dispatch('click');
			},
		},
	},
};

machine.dispatch('click');