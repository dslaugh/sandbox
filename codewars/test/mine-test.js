var assert = require('chai').assert;

function isAtExit(obj1, obj2) {
  if ((obj1['x'] === obj2['x']) && (obj1['y'] === obj2['y'])) {
    return true;
  } else {
    return false;
  }
}


var solve = function(map, miner, exit) {
  var moves = [];

  // console.log(miner);
  // console.log(exit);
  if (isAtExit(miner, exit)) {
    // console.log('here');
    return moves;
  }

  var right = miner['y'] + 1;
  var left = miner['y'] - 1;
  var up = miner['x'] - 1;
  var down = miner['x'] + 1;

  // var mapRight = map[][right];
  // console.log(miner['x'] + " " + right);
  // console.log(map[0][1]);
  // console.log(map[1][0]);
  console.log(right);
  if ((right > 0) && (map[miner['x']][right] === true)) {
    moves.push('right');
    miner = {x: miner['x'], y: right};
    console.log(miner);
  } else if (1==2) {
    moves.push('left');
  }

  // console.log(miner);
  // console.log(right + ': ' + left + ': ' + up + ': ' + down);

  // console.log(miner);
  // console.log(exit);
};


describe('isAtExit', function() {
  it('should return true if two arrays contain the same values', function() {
    var obj1 = {x: 1, y: 1};
    var obj2 = {x: 1, y: 1};
    var actual = isAtExit(obj1, obj2);
    assert.ok(actual);
  });

  it('should return false if the two arrays contain different values', function() {
    var obj1 = {x: 0, y: 1};
    var obj2 = {x: 1, y: 1};
    var actual = isAtExit(obj1, obj2);
    assert.notOk(actual);
  });

  it('should return false if the two arrays contain different values', function() {
    var obj1 = {x: 1, y: 1};
    var obj2 = {x: 1, y: 0};
    var actual = isAtExit(obj1, obj2);
    assert.notOk(actual);
  });

});

describe('A trivial map (1x1)', function() {
  var map = [[true]];
  
  it('Should return an empty array, since we\'re already at the goal', function() {
    assert.deepEqual(solve(map, {x:0,y:0}, {x:0,y:0}), []);
  });
});

describe('A pretty simple map (2x2)', function() {
  // var map = [[true, false],
  //   [true, true]];
  var map = [
              ['OO', '01'],
              ['10', '11']
            ];
   
  it('Should return the only correct move', function() {
    assert.deepEqual(solve(map, {x:0,y:0}, {x:1,y:0}), ['right']);
  });
  
  // it('Should return the only moves necessary', function() {
  //   assert.deepEqual(solve(map, {x:0,y:0}, {x:1,y:1}), ['right', 'down']);
  // });
});

// describe('A linear map(1x4)', function() {
//   var map = [[true], [true], [true], [true]];
  
//   it('Should return a chain of moves to the right', function() {
//     assert.deepEqual(solve(map, {x:0,y:0}, {x:3,y:0}), ['right', 'right', 'right']);
//   });
  
//   it('Should return a chain of moves to the left', function() {
//      assert.deepEqual(solve(map, {x:3,y:0}, {x:0,y:0}), ['left', 'left', 'left']);
//   });
// });

// describe('Should walk around an obstacle (3x3 map)', function() {
//   var map = [[true, true, true],
//   [false, false, true],
//   [true, true, true]];
  
//   it('Should return the right sequence of moves', function() {
//     assert.deepEqual(solve(map, {x:0,y:0}, {x:2,y:0}), ['down', 'down', 'right', 'right', 'up', 'up']);
//   });
// });

// describe('Should be able to change directions multiple times (5x5 map)', function() {
//   var map = [[true, true, false, false, false],
//     [false, true, true, false, false],
//     [false, false, true, true, false],
//     [false, false, false, true, true],
//     [false, false, false, false, true]];
    
//     it('Should return a step sequence of moves', function() {
//       assert.deepEqual(solve(map, {x:0,y:0}, {x:4,y:4}),
//         ['down', 'right', 'down', 'right', 'down', 'right', 'down', 'right']);
//     });
// });

// describe('Should avoid dead-ends (5x5 map)', function() {
//   var map = [[true, true, true, false, true],
//     [false, false, true, false, true],
//     [true, true, true, true, true],
//     [true, false, true, false, false],
//     [false, true, true, true, true]];
  
//   it('Should return the right moves', function() {
//     assert.deepEqual(solve(map, {x:0,y:0}, {x:4,y:4}), ['down', 'down', 'right', 'right', 'right', 'right', 'down', 'down'])
//   });
// });