var Scorecard = function(data) {
	var id;
	var name;
	var holes = [];

	return {
		getId: function() {
			return id;
		},
		setId: function(id) {
			id = id;
		},
		getName: function() {
			return name;
		},
		setName: function(name) {
			name = name;
		},
		addHole: function(hole) {
			holes.push(hole);
		},
		getHole: function(hole_id) {
			return holes.filter(function(hole) {
				return hole.id = hole_id;
			});
		},
		getAllHoles: function() {
			return holes;
		}
	};
};

var Hole = function(data) {
	var score;
	return {
		get number() {
			return data.id;
		},
		set number(val) {
			data.number = val;
		},
		get par() {
			return data.par;
		},
		set par(val) {
			data.par = val;
		},
		get score() {
			return score;
		},
		set score(val) {
			score = val;
		}
	};
}

var Par3Hole = function(data) {
	var obj = Hole(data);
	obj.addScore = function(score) {
		obj.score = score;
		var scoreString;
		if (score === 1) {
			scoreString = 'hole in one';
		} else if (score === 2) {
			scoreString = 'birdie';
		} else if (score === 3) {
			scoreString = 'par';
		} else if (score === 4) {
			scoreString = 'bogey';
		} else {
			scoreString = 'something higher';
		}
		console.log('You scored a ' + scoreString + ' on this hole');
	}
	return obj;
};

var Par4Hole = function(data) {
	var obj = Hole(data);
	obj.addScore = function(score) {
		obj.score = score;
		var scoreString;
		if (score === 1) {
			scoreString = 'hole in one';
		} else if (score === 2) {
			scoreString = 'eagle';
		} else if (score === 3) {
			scoreString = 'birdie';
		} else if (score === 4) {
			scoreString = 'par';
		} else if (score === 5) {
			scoreString = 'bogey';
		} else {
			scoreString = 'something higher';
		}
		console.log('You scored a ' + scoreString + ' on this hole');
	}
	return obj;
}

var hole1 = Par3Hole({number: 1, par: 3});
hole1.addScore(5);

var hole2 = Par4Hole({number: 2, par: 4});
hole2.addScore(3);
