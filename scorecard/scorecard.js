var Scorecard = function() {
	var id;
	var holes = [];

	return {
		setId: function(id) {
			id = id;
		},
		getId: function() {
			return id;
		},
		addHole: function(hole) {
			this.holes.push(hole);
		},
		getHole: function(hole_id) {
			return this.holes;
		},
		getAllHoles: function() {
			return this.holes;
		}
	};
};

var Hole = function() {
	var scorecard_id;
	var number;
	var par;
	var white_tees;
	var blue_tees;

	return {
		setScorecardId: function(scorecard_id) {
			scorecard_id = scorecard_id;
		},
		getScorecardId: function() {
			return scorecard_id;
		}
	};
}

var sagebrush = Scorecard();
sagebrush.setId(1);

var hole1 = Hole();
hole1.setScorecardId(1);
hole1.setNumber(1);

sagebrush.addHole(hole1);