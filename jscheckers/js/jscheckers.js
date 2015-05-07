function board() {
	var squares = [];

	return {
		addSquare: function(square) {
			squares.push(square);
		},
		getSquares: function() {
			return squares;
		}
	}
}

var boardOne = board();
var playerTurn = 0;
var selectedSquare;

function square(x, y) {
	var xPos = x, 
		yPos = y,
		ownedBy = -1,
		isCrowned = 0,
		elem = document.createElement('div');

	elem.className = 'board-square';
	elem.setAttribute('data-x', xPos);
	elem.setAttribute('data-y', yPos);
	elem.innerHTML = xPos + ' ' + yPos;


	function bindEvents() {
		elem.onclick = function() {
			console.log('Square at ' + xPos + ',' + yPos + ' clicked');
			if (ownedBy !== -1) {
				var color = ownedBy === 0 ? 'red' : 'black'
				console.log('There is a ' + color + ' checker on this square.');
			} else {
				console.log('There is no checker on this square');
			}
			selectedSquare = this;
			console.log(getPossibleMoves());
		}
		elem.onmouseover = function() {
			if (ownedBy === playerTurn) {
				console.log('This is your checker');
			}
		}
		elem.onmouseout = function() {
			
		}
	}

	function addClass(className) {
		var classes = elem.className.split(' ');
		if (classes.indexOf(className) === -1) {
			elem.className += ' ' + className;
		}
	}

	function removeClass(className) {
		var classes = elem.className.split(' ');
		var ind = classes.indexOf(className);
		if (ind !== -1) {
			classes.splice(ind, 1);
		}
		elem.className = classes.join(' ');
	}

	function getPos() {
		return [xPos, yPos];
	}

	function getElem() {
		return elem;
	}

	function setOwnedBy(who) {
		ownedBy = who;
	}

	function getOwnedBy() {
		return ownedBy;
	}

	function moveIsOnTheBoard(x, y) {
		if (x < 0 || x > 7) {
			return false;
		}
		if (y < 0 || y > 7) {
			return false;
		}
		return true;
	}

	function squareIsOccupied(x, y) {
		var test = getSquareByPos(x, y);
		return test.getOwnedBy();
	}

	function getPossibleMoves() {
		var possibleMoves = [];
		var redMove1x = x - 1;
		var redMove1y = y + 1;
		var redMove2x = x + 1;
		var redMove2y = y + 1;
		if (ownedBy === 0) {
			if (moveIsOnTheBoard(redMove1x, redMove1y)) {
				console.log('occ', squareIsOccupied(redMove1x, redMove1y));
				possibleMoves.push({x: x - 1, y: y + 1});
			}
			if (moveIsOnTheBoard(redMove1x, redMove1y)) {
				possibleMoves.push({x: x + 1, y: y + 1});
			}
		} else if (ownedBy === 1) {
			if (moveIsOnTheBoard(x - 1, y - 1)) {
				possibleMoves.push({x: x - 1, y: y - 1});
			}
			if (moveIsOnTheBoard(x + 1, y - 1)) {
				possibleMoves.push({x: x + 1, y: y - 1});
			}
		}
		return possibleMoves;
	}

	bindEvents();
	return {
		addClass: addClass,
		removeClass: removeClass,
		getElem: getElem,
		getPos: getPos,
		setOwnedBy: setOwnedBy,
		getOwnedBy: getOwnedBy
	};

}

var checkerBoard = document.querySelector('#CheckerBoard');
function setupSquares() {
	var sq,
		squareClass,
		squares = [],
		x = 0,
		y = 0
		redSquares = [
			[0,0],
			[2,0],
			[4,0],
			[6,0],
			[1,1],
			[3,1],
			[5,1],
			[7,1]
		],
		blackSquares = [
			[0,6],
			[2,6],
			[4,6],
			[6,6],
			[1,7],
			[3,7],
			[5,7],
			[7,7]
		];

	function shouldHaveSquare(arr, x, y) {
		return arr.some(function(pos) {
			return pos[0] === x && pos[1] === y;
		});
	}

	for (; y < 8; y++) {
		x = 0;
		for(; x < 8; x++) {
			if (x % 2 === 1) {
				if (y % 2 == 1) {
					squareClass = 'gray';
				} else {
					squareClass = 'white'
				}
			} else {
				if (y % 2 == 1) {
					squareClass = 'white'
				} else {
					squareClass = 'gray';
				}
			}
			sq = square(x, y);
			sq.addClass(squareClass);
			if (shouldHaveSquare(redSquares, x, y)) {
				sq.setOwnedBy(0);
				sq.addClass('red-checker');
			}
			if (shouldHaveSquare(blackSquares, x, y)) {
				sq.setOwnedBy(1);
				sq.addClass('black-checker');
			}

			squares.push(sq);
		}
	}
	return squares;
}

function getSquareByPos(x, y) {
	var ass;
	squares.forEach(function(square, i) {
		var pos = square.getPos();
		if (pos[0] === x && pos[1] === y) {
			ass = square;
		}
	});
	return ass;
}


var squares = setupSquares();
squares.forEach(function(sq) {
	checkerBoard.appendChild(sq.getElem());
	
});
// var test = getSquareByPos(6, 0);
// console.log(test);
