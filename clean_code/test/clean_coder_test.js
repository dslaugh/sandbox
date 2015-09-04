var expect = require('chai').expect;
describe('Clean Coder', function() {

	describe('Chapter 2: Meaningful names', function() {
		describe('Use Intention-Revealing Names', function() {
			var testArray = [
				[1,1],
				[4,2],
				[1,3],
				[4,4],
			];
			// Original
			var getThem = function(arr) {
				var list1 = [];
				for (var i=0; i < arr.length; i++) {
					if (arr[i][0] === 4) {
						list1.push(arr[i]);
					}
				}
				return list1;
			};

			// Refactor 1
			var getFlaggedCells = function(gameBoard) {
				var STATUS_VALUE = 0;
				var FLAGGED = 4;
				var flaggedCells = [];
				gameBoard.forEach(function(cell) {
					if (cell[STATUS_VALUE] === FLAGGED) {
						flaggedCells.push(cell);
					}
				});
				return flaggedCells;
			};

			// Refactor 2
			var getFlaggedCells2 = function(gameBoard) {
				return gameBoard.filter(isFlagged);
				
				function isFlagged(cell) {
					var STATUS_VALUE = 0;
					var FLAGGED = 4;
					return cell[STATUS_VALUE] === FLAGGED;
				}
			}


			it('should return the second and fourth items.', function() {
				var expected = [
					[4,2],
					[4,4]
				];
				expect(getThem(testArray)).to.eql(expected);
				expect(getFlaggedCells(testArray)).to.eql(expected);
				expect(getFlaggedCells2(testArray)).to.eql(expected);

			});
		});

		describe('Make Meaningful Distinctions', function() {
			var testArray1 = ['a', 'b', 'c'];
			var testArray2 = ['d', 'e', 'f', 'g'];

			// Original
			function copyChars(arr1, arr2) {
				for(var i=0; i < arr1.length; i++) {
					arr2[i] = arr1[i];
				}
			}

			// Refactor 1
			function copyChars2(source, destination) {
				for(var i=0; i < source.length; i++) {
					destination[i] = source[i];
				}				
			}

			it('should copy the chars from one array to another', function() {
				var expected = ['a', 'b', 'c', 'g'];
				// copyChars(testArray1, testArray2);
				copyChars2(testArray1, testArray2);
				expect(testArray2).to.eql(expected);
			});
		});
	});


});