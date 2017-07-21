function Nothing() {
	this.value = null;
}
Nothing.of = function() {
	return new Nothing();
}

function Some(value) {
	this.value = value;
}

Some.of = function(value) {
	return new Some(value);
};

Some.prototype.map = function(fn) {
	return Some.of(fn(this.value));
};

Some.prototype.flatMap = function(fn) {
	console.log('hi', this.value);
	if (Maybe.isNothing(this.value)) {
		return Nothing();
	}
	return fn(this.value);
}

function Maybe(value) {
	this.value = value;
}

Maybe.of = function(value) {
	return new Maybe(value);
};

Maybe.prototype.isNothing = function(value) {
	return value === undefined || value === null;
}

Maybe.prototype.map = function(fn) {
	if (this.isNothing()) {
		return Nothing.of(null);
	}
	return Some.of(fn(this.value));
};

const testUser = { id: 1, name: 'Dave' };

const user = Maybe.of(testUser);

console.log(user);