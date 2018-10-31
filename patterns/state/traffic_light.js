/*
States:
	NS			EW
	Green		Red
	Yellow	Red
	Red			Green
	Red			Yellow

Actions:
	change
 */

class TrafficLight {
	constructor() {
		this.NS_GREEN_EW_RED = 0;
		this.NS_YELLOW_EW_RED = 1;
		this.NS_RED_EW_GREEN = 2;
		this.NS_RED_EW_YELLOW = 3;
		this.GREEN_DURATION = 3000;
		this.YELLOW_DURATION = 1000;
		this.state = this.NS_GREEN_EW_RED;
		this.duration = this.GREEN_DURATION;

		this.lights = {
			'north_red': document.querySelector('#north_red'),
			'north_yellow': document.querySelector('#north_yellow'),
			'north_green': document.querySelector('#north_green'),
			'south_red': document.querySelector('#south_red'),
			'south_yellow': document.querySelector('#south_yellow'),
			'south_green': document.querySelector('#south_green'),
			'east_red': document.querySelector('#east_red'),
			'east_yellow': document.querySelector('#east_yellow'),
			'east_green': document.querySelector('#east_green'),
			'west_red': document.querySelector('#west_red'),
			'west_yellow': document.querySelector('#west_yellow'),
			'west_green': document.querySelector('#west_green'),
		}
	}

	run() {
		setTimeout(() => {
			trafficLight.change();
			this.run();
		}, this.duration);
	}

	resetAllLights() {
		Object.keys(this.lights).forEach((light) => {
			this.lights[light].className = 'light black';
		});
	}

	render() {
		switch (this.state) {
			case this.NS_GREEN_EW_RED:
				this.resetAllLights();
				this.lights['north_green'].className = 'light green';
				this.lights['south_green'].className = 'light green';
				this.lights['east_red'].className = 'light red';
				this.lights['west_red'].className = 'light red';
				this.duration = this.GREEN_DURATION;
				break;
			case this.NS_YELLOW_EW_RED:
				this.resetAllLights();
				this.lights['north_yellow'].className = 'light yellow';
				this.lights['south_yellow'].className = 'light yellow';
				this.lights['east_red'].className = 'light red';
				this.lights['west_red'].className = 'light red';
				this.duration = this.YELLOW_DURATION;
				break;
			case this.NS_RED_EW_GREEN:
				this.resetAllLights();
				this.lights['north_red'].className = 'light red';
				this.lights['south_red'].className = 'light red';
				this.lights['east_green'].className = 'light green';
				this.lights['west_green'].className = 'light green';
				this.duration = this.GREEN_DURATION;
				break;
			case this.NS_RED_EW_YELLOW:
				this.resetAllLights();
				this.lights['north_red'].className = 'light red';
				this.lights['south_red'].className = 'light red';
				this.lights['east_yellow'].className = 'light yellow';
				this.lights['west_yellow'].className = 'light yellow';
				this.duration = this.YELLOW_DURATION;
				break;
			default:
				console.log('Can not render, unknown state:', this.state);
		}
	}

	change() {
		switch (this.state) {
			case this.NS_GREEN_EW_RED:
				this.state = this.NS_YELLOW_EW_RED;
				this.render();
				break;
			case this.NS_YELLOW_EW_RED:
				this.state = this.NS_RED_EW_GREEN;
				this.render();
				break;
			case this.NS_RED_EW_GREEN:
				this.state = this.NS_RED_EW_YELLOW;
				this.render();
				break;
			case this.NS_RED_EW_YELLOW:
				this.state = this.NS_GREEN_EW_RED;
				this.render();
				break;
			default:
				console.log('Error, unknown state');
		}
	}
}
