class BaseState {
	constructor(target) {
		this.target = target;
	}
	execute() {
		console.log('Execute method needs to be implemented');
	}

	walk() {
		this.target.changeState(this.target.states.walking);
	}

	attack() {
		this.target.changeState(this.target.states.attacking);
	}

	rest() {
		this.target.changeState(this.target.states.resting);
	}

	rescue() {
		this.target.changeState(this.target.states.rescuing);
	}

	pivot() {
		this.target.changeState(this.target.states.pivoting);
	}

	shoot() {
		this.target.changeState(this.target.states.shooting);
	}
}

class WalkingState extends BaseState {
	execute() {
		this.target.warrior.walk(this.target.direction);
	}

	walk() {
		this.execute();
	}
}

class AttackingState extends BaseState {
	execute() {
		this.target.warrior.attack(this.target.direction);
	}

	attack() {
		this.execute();
	}
}

class RestingState extends BaseState {
	execute() {
		this.target.warrior.walk('backward');
	}

	walk() {
		if (this.target.warrior.health() < this.target.RESTED_ENOUGH) {
			this.target.warrior.rest();
		} else {
			this.target.changeState(this.target.states.walking);
		}
	}

	attack() {
		if (this.target.warrior.health() < this.target.RESTED_ENOUGH) {
			this.target.warrior.rest();
		} else {
			this.target.changeState(this.target.states.attacking);
		}
	}

	rest () {
		if (this.target.warrior.health() < this.target.lastRoundHealth) {
			this.execute();
		} else {
			this.target.warrior.rest();
		}
	}
}

class RescuingState extends BaseState {
	execute() {
		this.target.warrior.rescue(this.target.direction);
	}

	rescue() {
		this.execute();
	}
}

class PivotingState extends BaseState {
	execute() {
		this.target.warrior.pivot();
	}

	pivot() {
		this.execute();
	}
}

class ShootingState extends BaseState {
	execute() {
		this.target.warrior.shoot();
	}

	shoot() {
		this.execute();
	}
}

class Player {
	constructor() {
		this.turn = 1;
		this.NEEDS_REST_LEVEL = 8;
		this.RESTED_ENOUGH = 16;
		this.states = {
			walking: new WalkingState(this),
			attacking: new AttackingState(this),
			resting: new RestingState(this),
			rescuing: new RescuingState(this),
			pivoting: new PivotingState(this),
			shooting: new ShootingState(this),
		};
		this.state = this.states.resting;
		this.warrior = undefined;
		this.health = 20;
		this.lastRoundHealth = 20;
		this.direction = 'forward';
	}

	walk() {
		this.warrior.think('player->walk()');
		this.state.walk();
	}

	attack() {
		this.warrior.think('player->attack()');
		this.state.attack();
	}

	rest() {
		this.warrior.think('player->rest()');
		this.state.rest();
	}

	rescue() {
		this.warrior.think('player->rescue()');
		this.state.rescue();
	}

	pivot() {
		this.warrior.think('player->pivot()');
		this.state.pivot();
	}

	shoot() {
		this.warrior.think('player->shoot()');
		this.state.shoot();
	}

	changeState(state) {
		this.state = state;
		this.state.execute();
	}

	isEnemy(space) {
		return space.isUnit() && space.getUnit().isEnemy();
	}

	isBound(space) {
		return space.isUnit() && space.getUnit().isBound();
	}

	getSpaceWithNearestUnit(look) {
		let spaceWithUnit = look.find((l) => {
			return l.isUnit();
		});

		if (spaceWithUnit) {
			return spaceWithUnit.getUnit();
		}
		return false;
	}

	playTurn(warrior) {
		this.warrior = warrior;
		const space = warrior.feel(this.direction);
		const look = warrior.look(this.direction);
		const nearestUnit = this.getSpaceWithNearestUnit(look);

		if (this.turn === 1) {
			this.walk();
		} else {

			if (warrior.health() < this.NEEDS_REST_LEVEL) {
				this.rest();
			} else if (space.isEmpty()) {
				if (nearestUnit && nearestUnit.isEnemy()) {
					this.shoot();
				} else {
					this.walk();
				}
			} else if (space.isWall()) {
				this.pivot();
			} else if (this.isEnemy(space)) {
				this.attack();
			} else if (this.isBound(space)) {
				this.rescue();
			}
		}

		this.lastRoundHealth = this.warrior.health();
		this.turn += 1;
	}
}
