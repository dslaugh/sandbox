/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Coin.js":
/*!*********************!*\
  !*** ./src/Coin.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vec = __webpack_require__(/*! ./Vec */ \"./src/Vec.js\");\r\nconst State = __webpack_require__(/*! ./State */ \"./src/State.js\");\r\nconst { coinWobbleSpeed, coinWobbleDist } = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\r\n\r\nclass Coin {\r\n\tconstructor(pos, basePos, wobble) {\r\n\t\tthis.pos = pos;\r\n\t\tthis.basePos = basePos;\r\n\t\tthis.wobble = wobble;\r\n\t}\r\n\r\n\tget type() {\r\n\t\treturn 'coin';\r\n\t}\r\n\r\n\tstatic create(pos) {\r\n\t\tlet basePos = pos.plus(new Vec(0.2, 0.1));\r\n\t\treturn new Coin(basePos, basePos, Math.random() * Math.PI * 2);\r\n\t}\r\n}\r\nCoin.prototype.size = new Vec(0.6, 0.6);\r\n\r\nCoin.prototype.collide = function(state) {\r\n\tlet filtered = state.actors.filter(a => a !== this);\r\n\tlet status = state.status;\r\n\tif (!filtered.some(a => a.type === 'coin')) {\r\n\t\tstatus = 'won';\r\n\t}\r\n\treturn new State(state.level, filtered, status);\r\n};\r\n\r\nCoin.prototype.update = function(time) {\r\n\tlet wobble = this.wobble + time * coinWobbleSpeed;\r\n\tlet wobblePos = Math.sin(wobble) * coinWobbleDist;\r\n\treturn new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);\r\n};\r\n\r\n\r\nmodule.exports = Coin;\r\n\n\n//# sourceURL=webpack:///./src/Coin.js?");

/***/ }),

/***/ "./src/DOMDisplay.js":
/*!***************************!*\
  !*** ./src/DOMDisplay.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { elt, drawActors, drawGrid } = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\r\nconst { scale } = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\r\n\r\nclass DOMDisplay {\r\n\tconstructor(parent, level) {\r\n\t\tthis.dom = elt('div', { class: 'game' }, drawGrid(level));\r\n\t\tthis.actorLayer = null;\r\n\t\tparent.appendChild(this.dom);\r\n\t}\r\n\r\n\tclear() {\r\n\t\tthis.dom.remove();\r\n\t}\r\n}\r\n\r\nDOMDisplay.prototype.syncState = function(state) {\r\n\tif (this.actorLayer) {\r\n\t\tthis.actorLayer.remove();\r\n\t}\r\n\r\n\tthis.actorLayer = drawActors(state.actors);\r\n\tthis.dom.appendChild(this.actorLayer);\r\n\tthis.dom.className = `game ${state.status}`;\r\n\tthis.scrollPlayerIntoView(state);\r\n};\r\n\r\nDOMDisplay.prototype.scrollPlayerIntoView = function(state) {\r\n\tlet width = this.dom.clientWidth;\r\n\tlet height = this.dom.scrollHeight;\r\n\tlet margin = width / 3;\r\n\r\n\tlet left = this.dom.scrollLeft;\r\n\tlet right = left + width;\r\n\tlet top = this.dom.scrollTop;\r\n\tlet bottom = top + height;\r\n\r\n\tlet player = state.player;\r\n\tlet center = player.pos.plus(player.size.times(0.5)).times(scale);\r\n\r\n\tif (center.x < (left + margin)) {\r\n\t\tthis.dom.scrollLeft = center.x - margin;\r\n\t} else if (center.x > (right - margin)) {\r\n\t\tthis.dom.scrollLeft = center.x + margin - width;\r\n\t}\r\n\r\n\tif (center.y < (top + margin)) {\r\n\t\tthis.dom.scrollTop = center.y - margin;\r\n\t} else if (center.y > (bottom - margin)) {\r\n\t\tthis.dom.scrollTop = center.y + margin - height;\r\n\t}\r\n};\r\n\r\nmodule.exports = DOMDisplay;\r\n\n\n//# sourceURL=webpack:///./src/DOMDisplay.js?");

/***/ }),

/***/ "./src/Lava.js":
/*!*********************!*\
  !*** ./src/Lava.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vec = __webpack_require__(/*! ./Vec */ \"./src/Vec.js\");\r\nconst State = __webpack_require__(/*! ./State */ \"./src/State.js\");\r\n\r\nclass Lava {\r\n\tconstructor(pos, speed, reset) {\r\n\t\tthis.pos = pos;\r\n\t\tthis.speed = speed;\r\n\t\tthis.reset = reset;\r\n\t}\r\n\r\n\tget type() {\r\n\t\treturn 'lava';\r\n\t}\r\n\r\n\tstatic create(pos, ch) {\r\n\t\tif (ch === '=') {\r\n\t\t\treturn new Lava(pos, new Vec(2, 0));\r\n\t\t} else if (ch === '|') {\r\n\t\t\treturn new Lava(pos, new Vec(0, 2));\r\n\t\t} else if (ch === 'v') {\r\n\t\t\treturn new Lava(pos, new Vec(0, 3));\r\n\t\t} else {\r\n\t\t\tthrow new Error('Lava character not recognized '+ch);\r\n\t\t}\r\n\t}\r\n}\r\nLava.prototype.size = new Vec(1, 1);\r\nLava.prototype.collide = function(state) {\r\n\treturn new State(state.level, state.actors, 'lost');\r\n};\r\nLava.prototype.update = function(time, state) {\r\n\tlet newPos = this.pos.plus(this.speed.times(time));\r\n\tif (!state.level.touches(newPos, this.size, 'wall')) {\r\n\t\treturn new Lava(newPos, this.speed, this.reset);\r\n\t} else if (this.reset) {\r\n\t\treturn new Lava(this.reset, this.speed, this.reset);\r\n\t} else {\r\n\t\treturn new Lava(this.pos, this.speed.times(-1));\r\n\t}\r\n};\r\n\r\nmodule.exports = Lava;\r\n\n\n//# sourceURL=webpack:///./src/Lava.js?");

/***/ }),

/***/ "./src/Level.js":
/*!**********************!*\
  !*** ./src/Level.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vec = __webpack_require__(/*! ./Vec */ \"./src/Vec.js\");\r\nconst levelChars = __webpack_require__(/*! ./levelChars */ \"./src/levelChars.js\");\r\n\r\nclass Level {\r\n\tconstructor(plan) {\r\n\t\tlet rows = plan.trim().split('\\n').map(l => [...l]);\r\n\r\n\t\tthis.height = rows.length;\r\n\t\tthis.width = rows[0].length;\r\n\t\tthis.startActors = [];\r\n\r\n\t\tthis.rows = rows.map((row, y) => {\r\n\t\t\treturn row.map((ch, x) => {\r\n\t\t\t\tlet type = levelChars[ch];\r\n\t\t\t\tif (typeof type === 'string') {\r\n\t\t\t\t\treturn type;\r\n\t\t\t\t}\r\n\t\t\t\tconst actor = type.create(new Vec(x, y), ch);\r\n\t\t\t\tthis.startActors.push(actor);\r\n\t\t\t\treturn 'empty';\r\n\t\t\t});\r\n\t\t});\r\n\t}\r\n}\r\nLevel.prototype.touches = function(pos, size, type) {\r\n\tconst xStart = Math.floor(pos.x);\r\n\tconst xEnd = Math.ceil(pos.x + size.x);\r\n\tconst yStart = Math.floor(pos.y);\r\n\tconst yEnd = Math.ceil(pos.y + size.y);\r\n\r\n\tfor (let y = yStart; y < yEnd; y++) {\r\n\t\tfor (let x= xStart; x < xEnd; x++) {\r\n\t\t\tlet isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;\r\n\t\t\tlet here = isOutside ? 'wall' : this.rows[y][x];\r\n\t\t\tif (here === type) {\r\n\t\t\t\treturn true;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\treturn false;\r\n};\r\n\r\nmodule.exports = Level;\r\n\n\n//# sourceURL=webpack:///./src/Level.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vec = __webpack_require__(/*! ./Vec */ \"./src/Vec.js\");\r\nconst { playerXSpeed, gravity, jumpSpeed } = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\r\n\r\nclass Player {\r\n\tconstructor(pos, speed) {\r\n\t\tthis.pos = pos;\r\n\t\tthis.speed = speed;\r\n\t}\r\n\r\n\tget type() {\r\n\t\treturn 'player';\r\n\t}\r\n\r\n\tstatic create(pos) {\r\n\t\treturn new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));\r\n\t}\r\n}\r\nPlayer.prototype.size = new Vec(0.8, 1.5);\r\nPlayer.prototype.update = function(time, state, keys) {\r\n\tlet xSpeed = 0;\r\n\tif (keys.ArrowLeft) {\r\n\t\txSpeed -= playerXSpeed;\r\n\t}\r\n\tif (keys.ArrowRight) {\r\n\t\txSpeed += playerXSpeed;\r\n\t}\r\n\r\n\tlet pos = this.pos;\r\n\tlet movedX = pos.plus(new Vec(xSpeed * time, 0));\r\n\tif (!state.level.touches(movedX, this.size, 'wall')) {\r\n\t\tpos = movedX;\r\n\t}\r\n\r\n\tlet ySpeed = this.speed.y + time * gravity;\r\n\tlet movedY = pos.plus(new Vec(0, ySpeed * time));\r\n\tif (!state.level.touches(movedY, this.size, 'wall')) {\r\n\t\tpos = movedY;\r\n\t} else if (keys.ArrowUp && ySpeed > 0) {\r\n\t\tySpeed = -jumpSpeed;\r\n\t} else {\r\n\t\tySpeed = 0;\r\n\t}\r\n\treturn new Player(pos, new Vec(xSpeed, ySpeed));\r\n};\r\n\r\nmodule.exports = Player;\r\n\n\n//# sourceURL=webpack:///./src/Player.js?");

/***/ }),

/***/ "./src/State.js":
/*!**********************!*\
  !*** ./src/State.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { overlap } = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\r\n\r\nclass State {\r\n\tconstructor(level, actors, status) {\r\n\t\tthis.level = level;\r\n\t\tthis.actors = actors;\r\n\t\tthis.status = status;\r\n\t}\r\n\r\n\tstatic start(level) {\r\n\t\treturn new State(level, level.startActors, 'playing');\r\n\t}\r\n\r\n\tget player() {\r\n\t\treturn this.actors.find(a => a.type === 'player');\r\n\t}\r\n}\r\n\r\nState.prototype.update = function(time, keys) {\r\n\tlet actors = this.actors.map(actor => actor.update(time, this, keys));\r\n\tlet newState = new State(this.level, actors, this.status);\r\n\r\n\tif (newState.status !== 'playing') {\r\n\t\treturn newState;\r\n\t}\r\n\r\n\tlet player = newState.player;\r\n\tif (this.level.touches(player.pos, player.size, 'lava')) {\r\n\t\treturn new State(this.level, actors, 'lost');\r\n\t}\r\n\r\n\tfor (let actor of actors) {\r\n\t\tif (actor !== player && overlap(actor, player)) {\r\n\t\t\tnewState = actor.collide(newState);\r\n\t\t}\r\n\t}\r\n\treturn newState;\r\n};\r\n\r\nmodule.exports = State;\r\n\n\n//# sourceURL=webpack:///./src/State.js?");

/***/ }),

/***/ "./src/Vec.js":
/*!********************!*\
  !*** ./src/Vec.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Vec {\r\n\tconstructor(x, y) {\r\n\t\tthis.x = x;\r\n\t\tthis.y = y;\r\n\t}\r\n\r\n\tplus(other) {\r\n\t\treturn new Vec(this.x + other.x, this.y + other.y);\r\n\t}\r\n\r\n\ttimes(factor) {\r\n\t\treturn new Vec(this.x * factor, this.y * factor);\r\n\t}\r\n}\r\n\r\nmodule.exports = Vec;\r\n\n\n//# sourceURL=webpack:///./src/Vec.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n\tscale: 20,\r\n\tplayerXSpeed: 7,\r\n\tgravity: 30,\r\n\tjumpSpeed: 17,\r\n\tcoinWobbleSpeed: 8,\r\n\tcoinWobbleDist: 0.07,\r\n};\r\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/gameLevels.js":
/*!***************************!*\
  !*** ./src/gameLevels.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = [`\r\n................................................................................\r\n................................................................................\r\n................................................................................\r\n................................................................................\r\n................................................................................\r\n................................................................................\r\n..................................................................###...........\r\n...................................................##......##....##+##..........\r\n....................................o.o......##..................#+++#..........\r\n.................................................................##+##..........\r\n...................................#####..........................#v#...........\r\n............................................................................##..\r\n..##......................................o.o................................#..\r\n..#.....................o....................................................#..\r\n..#......................................#####.............................o.#..\r\n..#..........####.......o....................................................#..\r\n..#..@.......#..#................................................#####.......#..\r\n..############..###############...####################.....#######...#########..\r\n..............................#...#..................#.....#....................\r\n..............................#+++#..................#+++++#....................\r\n..............................#+++#..................#+++++#....................\r\n..............................#####..................#######....................\r\n................................................................................\r\n................................................................................\r\n`,`\r\n................................................................................\r\n................................................................................\r\n....###############################.............................................\r\n...##.............................##########################################....\r\n...#.......................................................................##...\r\n...#....o...................................................................#...\r\n...#................................................=.......................#...\r\n...#.o........################...................o..o...........|........o..#...\r\n...#.........................#..............................................#...\r\n...#....o....................##########.....###################....##########...\r\n...#..................................#+++++#.................#....#............\r\n...###############....oo......=o.o.o..#######.###############.#....#............\r\n.....#...............o..o.............#.......#......#........#....#............\r\n.....#....................#############..######.####.#.########....########.....\r\n.....#.............########..............#...........#.#..................#.....\r\n.....#..........####......####...#####################.#..................#.....\r\n.....#........###............###.......................########....########.....\r\n.....#.......##................#########################......#....#............\r\n.....#.......#................................................#....#............\r\n.....###......................................................#....#............\r\n.......#...............o...........................................#............\r\n.......#...............................................o...........#............\r\n.......#########......###.....############.........................##...........\r\n.............#..................#........#####....#######.o.........########....\r\n.............#++++++++++++++++++#............#....#.....#..................#....\r\n.............#++++++++++++++++++#..........###....###...####.o.............#....\r\n.............####################..........#........#......#.....|.........#....\r\n...........................................#++++++++#......####............#....\r\n...........................................#++++++++#.........#........@...#....\r\n...........................................#++++++++#.........##############....\r\n...........................................##########...........................\r\n................................................................................\r\n`,`\r\n......................................#++#........................#######....................................#+#..\r\n......................................#++#.....................####.....####.................................#+#..\r\n......................................#++##########...........##...........##................................#+#..\r\n......................................##++++++++++##.........##.............##...............................#+#..\r\n.......................................##########++#.........#....................................o...o...o..#+#..\r\n................................................##+#.........#.....o...o....................................##+#..\r\n.................................................#+#.........#................................###############++#..\r\n.................................................#v#.........#.....#...#........................++++++++++++++##..\r\n.............................................................##..|...|...|..##............#####################...\r\n..............................................................##+++++++++++##............v........................\r\n...............................................................####+++++####......................................\r\n...............................................#.....#............#######........###.........###..................\r\n...............................................#.....#...........................#.#.........#.#..................\r\n...............................................#.....#.............................#.........#....................\r\n...............................................#.....#.............................##........#....................\r\n...............................................##....#.............................#.........#....................\r\n...............................................#.....#......o..o.....#...#.........#.........#....................\r\n...............#######........###...###........#.....#...............#...#.........#.........#....................\r\n..............##.....##.........#...#..........#.....#.....######....#...#...#########.......#....................\r\n.............##.......##........#.o.#..........#....##...............#...#...#...............#....................\r\n.....@.......#.........#........#...#..........#.....#...............#...#...#...............#....................\r\n....###......#.........#........#...#..........#.....#...............#...#####...######......#....................\r\n....#.#......#.........#.......##.o.##.........#.....#...............#.....o.....#.#.........#....................\r\n++++#.#++++++#.........#++++++##.....##++++++++##....#++++++++++.....#.....=.....#.#.........#....................\r\n++++#.#++++++#.........#+++++##.......##########.....#+++++++##+.....#############.##..o.o..##....................\r\n++++#.#++++++#.........#+++++#....o.................##++++++##.+....................##.....##.....................\r\n++++#.#++++++#.........#+++++#.....................##++++++##..+.....................#######......................\r\n++++#.#++++++#.........#+++++##.......##############++++++##...+..................................................\r\n++++#.#++++++#.........#++++++#########++++++++++++++++++##....+..................................................\r\n++++#.#++++++#.........#++++++++++++++++++++++++++++++++##.....+..................................................\r\n`,`\r\n..............................................................................................................\r\n..............................................................................................................\r\n..............................................................................................................\r\n..............................................................................................................\r\n..............................................................................................................\r\n........................................o.....................................................................\r\n..............................................................................................................\r\n........................................#.....................................................................\r\n........................................#.....................................................................\r\n........................................#.....................................................................\r\n........................................#.....................................................................\r\n.......................................###....................................................................\r\n.......................................#.#.................+++........+++..###................................\r\n.......................................#.#.................+#+........+#+.....................................\r\n.....................................###.###................#..........#......................................\r\n......................................#...#.................#...oooo...#.......###............................\r\n......................................#...#.................#..........#......#+++#...........................\r\n......................................#...#.................############.......###............................\r\n.....................................##...##......#...#......#................................................\r\n......................................#...#########...########..............#.#...............................\r\n......................................#...#...........#....................#+++#..............................\r\n......................................#...#...........#.....................###...............................\r\n.....................................##...##..........#.......................................................\r\n......................................#...#=.=.=.=....#............###........................................\r\n......................................#...#...........#...........#+++#.......................................\r\n......................................#...#....=.=.=.=#.....o......###.......###..............................\r\n.....................................##...##..........#.....................#+++#.............................\r\n..............................o...o...#...#...........#.....#................##v........###...................\r\n......................................#...#...........#..............#.................#+++#..................\r\n.............................###.###.###.###.....o.o..#++++++++++++++#...................v#...................\r\n.............................#.###.#.#.###.#..........#++++++++++++++#........................................\r\n.............................#.............#...#######################........................................\r\n.............................##...........##.........................................###......................\r\n..###.........................#.....#.....#.........................................#+++#................###..\r\n..#.#.........................#....###....#..........................................###.................#.#..\r\n..#...........................#....###....#######........................#####.............................#..\r\n..#...........................#...........#..............................#...#.............................#..\r\n..#...........................##..........#..............................#.#.#.............................#..\r\n..#.......................................#.......|####|....|####|.....###.###.............................#..\r\n..#................###.............o.o....#..............................#.........###.....................#..\r\n..#...............#####.......##..........#.............................###.......#+++#..........#.........#..\r\n..#...............o###o.......#....###....#.............................#.#........###..........###........#..\r\n..#................###........#############..#.oo.#....#.oo.#....#.oo..##.##....................###........#..\r\n..#......@..........#.........#...........#++#....#++++#....#++++#....##...##....................#.........#..\r\n..#############################...........#############################.....################################..\r\n..............................................................................................................\r\n..............................................................................................................\r\n`,`\r\n..................................................................................................###.#.......\r\n......................................................................................................#.......\r\n..................................................................................................#####.......\r\n..................................................................................................#...........\r\n..................................................................................................#.###.......\r\n..........................o.......................................................................#.#.#.......\r\n.............................................................................................o.o.o###.#.......\r\n...................###................................................................................#.......\r\n.......+..o..+................................................#####.#####.#####.#####.#####.#####.#####.......\r\n.......#.....#................................................#...#.#...#.#...#.#...#.#...#.#...#.#...........\r\n.......#=.o..#............#...................................###.#.###.#.###.#.###.#.###.#.###.#.#####.......\r\n.......#.....#..................................................#.#...#.#...#.#...#.#...#.#...#.#.....#.......\r\n.......+..o..+............o..................................####.#####.#####.#####.#####.#####.#######.......\r\n..............................................................................................................\r\n..........o..............###..............................##..................................................\r\n..............................................................................................................\r\n..............................................................................................................\r\n......................................................##......................................................\r\n...................###.........###............................................................................\r\n..............................................................................................................\r\n..........................o.....................................................#......#......................\r\n..........................................................##.....##...........................................\r\n.............###.........###.........###.................................#..................#.................\r\n..............................................................................................................\r\n.................................................................||...........................................\r\n..###########.................................................................................................\r\n..#.........#.o.#########.o.#########.o.##................................................#...................\r\n..#.........#...#.......#...#.......#...#.................||..................#.....#.........................\r\n..#..@......#####...o...#####...o...#####.....................................................................\r\n..#######.....................................#####.......##.....##.....###...................................\r\n........#=..................=................=#...#.....................###...................................\r\n........#######################################...#+++++++++++++++++++++###+++++++++++++++++++++++++++++++++++\r\n..................................................############################################################\r\n..............................................................................................................\r\n`];\r\n\n\n//# sourceURL=webpack:///./src/gameLevels.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { scale } = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\r\n\r\nfunction elt(name, attrs, ...children) {\r\n\tlet dom = document.createElement(name);\r\n\tfor (let attr of Object.keys(attrs)) {\r\n\t\tdom.setAttribute(attr, attrs[attr]);\r\n\t}\r\n\r\n\tfor (let child of children) {\r\n\t\tdom.appendChild(child);\r\n\t}\r\n\r\n\treturn dom;\r\n}\r\n\r\nfunction drawGrid(level) {\r\n\treturn elt(\"table\", {\r\n\t\tclass: \"background\",\r\n\t\tstyle: `width: ${level.width * scale}px`\r\n\t}, ...level.rows.map(row =>\r\n\t\telt(\"tr\", {style: `height: ${scale}px`},\r\n\t\t\t...row.map(type => elt(\"td\", {class: type})))\r\n\t));\r\n}\r\n\r\nfunction drawActors(actors) {\r\n\treturn elt('div', {}, ...actors.map((actor) => {\r\n\t\tlet rect = elt('div', { class: `actor ${actor.type}`});\r\n\t\trect.style.width = `${actor.size.x * scale}px`;\r\n\t\trect.style.height = `${actor.size.y * scale}px`;\r\n\t\trect.style.left = `${actor.pos.x * scale}px`;\r\n\t\trect.style.top = `${actor.pos.y * scale}px`;\r\n\t\treturn rect;\r\n\t}));\r\n}\r\n\r\nfunction overlap(actor1, actor2) {\r\n\treturn  actor1.pos.x + actor1.size.x > actor2.pos.x &&\r\n\t\tactor1.pos.x < actor2.pos.x + actor2.size.x &&\r\n\t\tactor1.pos.y + actor1.size.y > actor2.pos.y &&\r\n\t\tactor1.pos.y < actor2.pos.y + actor2.size.y;\r\n}\r\n\r\nfunction trackKeys(keys) {\r\n\tlet down = Object.create(null);\r\n\tfunction track(event) {\r\n\t\tif (keys.includes(event.key)) {\r\n\t\t\tdown[event.key] = event.type === 'keydown';\r\n\t\t}\r\n\t}\r\n\twindow.addEventListener('keydown', track);\r\n\twindow.addEventListener('keyup', track);\r\n\treturn down;\r\n}\r\n\r\nfunction runAnimation(frameFunc) {\r\n\tlet lastTime = null;\r\n\tfunction frame(time) {\r\n\t\tif (lastTime !== null) {\r\n\t\t\tlet timeStep = Math.min(time - lastTime, 100) / 1000;\r\n\t\t\tif (frameFunc(timeStep) === false) {\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t}\r\n\t\tlastTime = time;\r\n\t\trequestAnimationFrame(frame);\r\n\t}\r\n\trequestAnimationFrame(frame);\r\n}\r\n\r\nmodule.exports = {\r\n\telt,\r\n\tdrawGrid,\r\n\tdrawActors,\r\n\toverlap,\r\n\ttrackKeys,\r\n\trunAnimation,\r\n};\r\n\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMDisplay = __webpack_require__(/*! ./DOMDisplay */ \"./src/DOMDisplay.js\");\r\nconst Level = __webpack_require__(/*! ./Level */ \"./src/Level.js\");\r\nconst State = __webpack_require__(/*! ./State */ \"./src/State.js\");\r\nconst gameLevels = __webpack_require__(/*! ./gameLevels */ \"./src/gameLevels.js\");\r\nconst {\ttrackKeys, runAnimation } = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\r\n\r\nconst arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);\r\n\r\nfunction runLevel(level, Display) {\r\n\tlet display = new Display(document.body, level);\r\n\tlet state = State.start(level);\r\n\tlet ending = 1;\r\n\treturn new Promise(resolve => {\r\n\t\trunAnimation(time => {\r\n\t\t\tstate = state.update(time, arrowKeys);\r\n\t\t\tdisplay.syncState(state);\r\n\t\t\tif (state.status === 'playing') {\r\n\t\t\t\treturn true;\r\n\t\t\t} else if (ending > 0) {\r\n\t\t\t\tending -= time;\r\n\t\t\t\treturn true;\r\n\t\t\t} else {\r\n\t\t\t\tdisplay.clear();\r\n\t\t\t\tresolve(state.status);\r\n\t\t\t\treturn false;\r\n\t\t\t}\r\n\t\t});\r\n\t});\r\n}\r\n\r\nasync function runGame(plans, Display) {\r\n\tfor (let level = 0; level < plans.length;) {\r\n\t\tlet status = await runLevel(new Level(plans[level]), Display);\r\n\t\tif (status === 'won') {\r\n\t\t\tlevel++;\r\n\t\t}\r\n\t}\r\n\tconsole.log('You won!');\r\n}\r\n\r\n\r\nrunGame(gameLevels, DOMDisplay).then(() => {\r\n\tconsole.log('Game over');\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/levelChars.js":
/*!***************************!*\
  !*** ./src/levelChars.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\r\nconst Lava = __webpack_require__(/*! ./Lava */ \"./src/Lava.js\");\r\nconst Coin = __webpack_require__(/*! ./Coin */ \"./src/Coin.js\");\r\n\r\nconst levelChars = {\r\n\t'.': 'empty',\r\n\t'#': 'wall',\r\n\t'+': 'lava',\r\n\t'@': Player,\r\n\t'o': Coin,\r\n\t'=': Lava,\r\n\t'|': Lava,\r\n\t'v': Lava,\r\n};\r\n\r\nmodule.exports = levelChars;\r\n\n\n//# sourceURL=webpack:///./src/levelChars.js?");

/***/ })

/******/ });