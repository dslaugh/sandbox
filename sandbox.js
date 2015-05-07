if (typeof exports !== 'undefined') {
	var q = require('q');
	var knex = require('knex')({
		client: 'mysql',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'rightintel',
			charset: 'utf8'
		},
		debug: false
	});
}



(function(exports) {
	exports.sandbox = {
		getDomainFromUrl: function(url) {
			var re = new RegExp('(?:https?:\/\/)?(?:www\.)?(.*?)([\/\?#]|$)', 'i');
			var matches = re.exec(url);
			return matches[1];
		},
		speed: function(distance, minutes) {
			return (distance / minutes) * 60;
		},
		distance: function(speed, minutes) {
			return (speed * minutes) / 60;
		},
		minutes: function(distance, speed) {
			return (distance / speed) * 60;
		},
		pluck: function(key, arr) {
			if (arguments.length === 1) {
				var curriedKey = key;
				return function(arr) {
					return arr.map(function(obj) {
						return obj[curriedKey];
					});
				};
			} else {
				return arr.map(function(obj) {
					return obj[key];
				});
			}
		},
		isDirectionICanMove: function(dir) {
	        return ['North','South','East','West'].indexOf(dir) !== -1;
	    },
	    inDirectionICanMove: function(arr) {
	        return arr.filter(this.isDirectionICanMove);
	    },	
	    getLowestEnemyHealthDir: function(enemyDirs) {
			var whatsAround = {
				NorthWest: { 
					type: 'Unoccupied',
					subType: 'Unoccupied',
					distanceFromTop: 0,
					distanceFromLeft: 1 
				},
				North: { 
					type: 'Unoccupied',
					subType: 'Unoccupied',
					distanceFromTop: 0,
					distanceFromLeft: 2 
				},
				NorthEast: { 
					type: 'Unoccupied',
					subType: 'Unoccupied',
					distanceFromTop: 0,
					distanceFromLeft: 3 
				},
				East: { 
					id: 1,
					distanceFromTop: 3,
					distanceFromLeft: 4,
					minesOwned: {},
					mineCount: 0,
					minesCaptured: 0,
					health: 50,
					dead: false,
					diamondsEarned: 0,
					damageDone: 20,
					heroesKilled: [],
					lastActiveTurn: 11,
					gravesRobbed: 0,
					healthRecovered: 0,
					healthGiven: 0,
					won: false,
					type: 'Hero',
					subType: 'Adventurer',
					team: 1,
					name: 'Enemy',
					direction: 'South',
					distance: 3,
					coords: [ 3, 3 ] 
				},
				SouthEast: { 
					id: 1,
					distanceFromTop: 2,
					distanceFromLeft: 3,
					type: 'DiamondMine',
					subType: 'DiamondMine',
					owner: undefined 
				},
				South: {
					id: 1,
					distanceFromTop: 3,
					distanceFromLeft: 4,
					minesOwned: {},
					mineCount: 0,
					minesCaptured: 0,
					health: 100,
					dead: false,
					diamondsEarned: 0,
					damageDone: 20,
					heroesKilled: [],
					lastActiveTurn: 11,
					gravesRobbed: 0,
					healthRecovered: 0,
					healthGiven: 0,
					won: false,
					type: 'Hero',
					subType: 'Adventurer',
					team: 1,
					name: 'Enemy',
					direction: 'South',
					distance: 3,
					coords: [ 3, 3 ] 
				},
				SouthWest: { 
					type: 'Unoccupied',
					subType: 'Unoccupied',
					distanceFromTop: 0,
					distanceFromLeft: 1 
				},
				West: { 
					type: 'Unoccupied',
					subType: 'Unoccupied',
					distanceFromTop: 1,
					distanceFromLeft: 1 
				} 
			};

			if (enemyDirs.length < 1) {
				return false;
			}

			var lowestHealth = 100;
			var lowestHealthDir;
			enemyDirs.forEach(function(dir) {
				if (whatsAround[dir].health <= lowestHealth) {
					lowestHealth = whatsAround[dir].health;
					lowestHealthDir = dir;
				}
			});

			return lowestHealthDir;
	    },
	    testPromise: function() {
	    	var defer = q.defer();
	    	setTimeout(function() {
		    	defer.resolve('hello');
	    	}, 1000);
	    	return defer.promise
	    },
	    testKnex: function() {
			return knex.select()
			.from('users')
			.where('id', 1)
			.then(function(user) {
				return user[0].fname;
			});
	    },
	    toArray: function(arrayLikeObject) {
	    	var args = [], i=0, len = arrayLikeObject.length;
	    	for (; i < len; i++) {
	    		args.push()
	    	}
	    	return Array.prototype.slice.call(arrayLikeObject);
	    },
	    curry: function(fn) {
	    	return function() {
	    		var args = Array.prototype.slice.call(arguments, 0);
	    		if (args.length < 1) {
	    			throw new Error('No arguments passed in');
	    		} else if (args.length === 1) {
		    		return function() {
		    			var newArgs = Array.prototype.slice.call(arguments);
		    			var allArgs = args.concat(newArgs);
		    			return fn.apply(null, allArgs);
		    		};
	    		} else {
	    			return fn.apply(null, args);
	    		}
	    	};
	    },
	    compose: function() {
	    	var fns = Array.prototype.slice.call(arguments);
	    	return function(initialArg) {
	    		return fns.reduce(function(prev, curr) {
	    			return curr(prev);
	    		}, initialArg);
	    	};
	    },
	    flip: function(fn) {
	    	return function() {
		    	var reversedArgs = Array.prototype.slice.call(arguments).reverse();
		    	return fn.apply(this, reversedArgs);
	    	};
	    },
	    removeItemFromQueryString: function(querystring, item) {
	    	var re = new RegExp('[?&]+?'+item+'=.*?(?=&|$)', 'i');
	    	var newQueryString = querystring.replace(re, '');
	    	return newQueryString.replace(/^&+/, '?');
	    },
		sortElementsByAttribute: function(attributeName, direction, dataType) {
			direction = direction || 'asc';
			dataType = dataType || 'int';
			var elements = document.querySelectorAll('*['+attributeName+']');
			var elementsArray = Array.prototype.slice.call(elements, 0);
			var parent = elementsArray[0].parentNode;
			
			var sortedElements = elementsArray.sort(function(a, b) {
				a = a.getAttribute(attributeName);
				b = b.getAttribute(attributeName);

				if (dataType === 'int') {
					if (direction === 'asc') {
						return a - b;
					} else {
						return b - a;
					}
				} else {
					var ret = 0;
					if (direction === 'asc') {
						ret = (a > b) ?  1 : -1;
					} else {
						ret (a > b) ? -1 : 1;
					}
					return ret;
				}
				
			});
			
			sortedElements.forEach(function(elem) {
				parent.appendChild(elem);
			});
		}


	};

})(typeof exports === 'undefined' ? this['sandbox']={} : exports);