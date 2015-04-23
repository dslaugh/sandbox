var fart = require('./test.js');

console.log(fart.x.test1());

// var rt = require('./ramda_testing');
// var Utils = require('./sandbox.js');
// var R = require('ramda');

// var knex = require('knex')({
// 	client: 'mysql',
// 	connection: {
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password: '',
// 		database: 'rightintel'
// 	}
// });

// var str = 'david slaugh';

// for (var i=0; i<100; i++) {
// 	console.log(rt.randomizeString(str));
// }


// var makeFullname = function(user) {
// 	return user.fname + ' ' + user.lname;
// };

// knex.select()
// .from('users')
// .then(function(users) {
// 	var fullnames = R.map(makeFullname, users);
// 	console.log(fullnames);
// });

// knex('users')
// .update({lname: 'Slaugh'})
// .where('id', '=', 1)
// .then(function(status) {
// 	console.log(status);
// });

// var curry2 = function curry(fn) {
// 	return function() {
// 		var x = fn.length;
// 		var argsLength = arguments.length;
// 		if (argsLength === x) {
// 			return fn.apply(this, arguments);
// 		} else {
// 			return function
// 		}
// 	};
// };

// var curry = function(fn) {
// 	return function() {
// 		var fnLength = fn.length;
// 		var passedArgsLength = 0;
// 		var args = Array.prototype.slice.call(arguments, 0);
// 		passedArgsLength = args.length;


// 		if (fnLength === passedArgsLength) {
// 			return fn.apply(this, args);
// 		} else {
// 			return function() {
// 				console.log('fnLength ' + fnLength);
// 				console.log('passedArgsLength ' + passedArgsLength);
// 				var newArgs = Array.prototype.slice.call(arguments, 0);
// 				return fn.apply(this, args.concat(newArgs));
// 			}
// 		}

// 	}
// };

// var add = function add(a,b,c) {
// 	return a + b + c;
// };

// var adder = curry(add);
// var addOne = adder(1);

// var three = addOne(2);


// console.log(typeof three);


// var divide = R.curry(function divide(a,b) {
// 	return a/b;
// });

// var multiply = R.curry(function multiply(a,b) {
// 	return a * b;
// });

// // 1/2 hour in 3 miles


// var speed = function speed(minutes, distance) {
// 	var hours = minutes / 60;
// 	var x = divide(distance);
// 	return x(hours);
// };

// var rDivide = R.flip(divide);
// var minutesToHours = rDivide(60);
// var x = minutesToHours(120)
// console.log(x);
// var x = divide(6);
// var y = x();
// console.log(y);

// console.log(speed(60, 6));
