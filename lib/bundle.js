/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _antibody = __webpack_require__(2);

var _antibody2 = _interopRequireDefault(_antibody);

var _cancer_cell = __webpack_require__(3);

var _cancer_cell2 = _interopRequireDefault(_cancer_cell);

var _game_view = __webpack_require__(1);

var _game_view2 = _interopRequireDefault(_game_view);

var _yoko = __webpack_require__(5);

var _yoko2 = _interopRequireDefault(_yoko);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(stage, level) {
    _classCallCheck(this, Game);

    // TODO: find most efficient way to pass stage. ATM, both GameView & Game know about it
    this.stage = stage;
    this.level = level;
    this.antibodies = [];
    this.cancerCells = [];
    this.addObjects();
  }

  _createClass(Game, [{
    key: 'addObjects',
    value: function addObjects() {
      this.addAntibodies();
      this.addCancerCells();
      this.addYoko();
    }
  }, {
    key: 'forEachObject',
    value: function forEachObject(callback) {
      this.antibodies.forEach(callback);
      this.cancerCells.forEach(callback);
      callback(this.yoko);
    }
  }, {
    key: 'forEachAntibody',
    value: function forEachAntibody(callback) {
      this.antibodies.forEach(callback);
    }
  }, {
    key: 'forEachCancerCell',
    value: function forEachCancerCell(callback) {
      this.cancerCells.forEach(callback);
    }
  }, {
    key: 'addAntibodies',
    value: function addAntibodies() {
      for (var i = 0; i < this.level * 5; i++) {
        this.antibodies.push(new _antibody2.default(this.stage));
      }
    }
  }, {
    key: 'addCancerCells',
    value: function addCancerCells() {
      for (var i = 0; i < this.level * 5; i++) {
        this.cancerCells.push(new _cancer_cell2.default(this.stage));
      }
    }
  }, {
    key: 'addYoko',
    value: function addYoko() {
      this.yoko = new _yoko2.default(this.stage);
    }
  }, {
    key: 'checkForCollisions',
    value: function checkForCollisions() {
      this.checkForAntibodyCancerCellCollisions();
      this.checkForYokoCancerCellCollisions();
    }
  }, {
    key: 'checkForAntibodyCancerCellCollisions',
    value: function checkForAntibodyCancerCellCollisions() {
      var antibodies = this.antibodies.filter(function (antibody) {
        return antibody.flung === true;
      });
      var cancerCells = this.cancerCells;
      for (var i = 0; i < antibodies.length; i++) {
        for (var j = 0; j < cancerCells.length; j++) {
          // only attach antibody to cancerCell if cancerCell is free of attachments
          var antibody = antibodies[i];
          var cancerCell = cancerCells[j];

          if (this.areNotAttached(antibody, cancerCell) && this.areCollided(antibody, cancerCell)) {
            this.attachAntibodyToCancerCell(antibody, cancerCell);
          }
        }
      }
    }
  }, {
    key: 'areNotAttached',
    value: function areNotAttached(antibody, cancerCell) {
      return !cancerCell.attachedAntibody && !antibody.attachedCancerCell;
    }
  }, {
    key: 'attachAntibodyToCancerCell',
    value: function attachAntibodyToCancerCell(antibody, cancerCell) {
      antibody.removeTickEventListener();
      antibody.shape.removeAllEventListeners();
      cancerCell.attachedAntibody = antibody;
      antibody.attachedCancerCell = cancerCell;
    }
  }, {
    key: 'checkForYokoCancerCellCollisions',
    value: function checkForYokoCancerCellCollisions() {
      var yoko = this.yoko;
      var cancerCells = this.cancerCells;
      for (var i = 0; i < cancerCells.length; i++) {
        if (this.areCollided(yoko, cancerCells[i])) {
          yoko.health -= 5;
          this.updateHealthMeter();
        }
      }
    }
  }, {
    key: 'updateHealthMeter',
    value: function updateHealthMeter() {
      document.getElementById('health-level').style.width = this.yoko.health / 10 + 'px';
    }
  }, {
    key: 'areCollided',
    value: function areCollided(obj1, obj2) {
      var dx = obj1.shape.x - obj2.shape.x;
      var dy = obj1.shape.y - obj2.shape.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      return distance < obj1.radius + obj2.radius;
    }
  }, {
    key: 'drawHitbox',
    value: function drawHitbox(obj) {
      var hitbox = new createjs.Shape();
      hitbox.graphics.beginFill(obj.color);
      hitbox.graphics.drawCircle(obj.shape.x, obj.shape.y, obj.shape.radius);
      this.stage.addChild(hitbox);
      this.stage.update();
    }
  }, {
    key: 'handleYokoHealthDepletion',
    value: function handleYokoHealthDepletion() {
      if (this.isYokoHealthDepleted()) {
        document.getElementById('try-again-modal').classList.remove('hidden');
      }
    }
  }, {
    key: 'handleGameWon',
    value: function handleGameWon() {
      if (this.isGameWon()) {
        // TODO: (Re)Mission Complete modal
        // consider play again button
        // immune system animation
        document.getElementById('winner-modal').classList.remove('hidden');
      }
    }
  }, {
    key: 'handleLevelWon',
    value: function handleLevelWon() {
      if (this.isLevelWon() && this.level < 3) {
        // immune system wipes away cancer and you move to next level
        // create white cells off screen
        // each white cell targets one cancer-antibody pair
        // each white cell moves quickly towards the pair
        // then, maybe, we do something similar to cancer-antibody attachment
        // where the pair's movement becomes dependent on the white cell
        // then the white cell moves offscreen
        this.prepareForNextLevel();
        this.startLevel();
      }
    }
  }, {
    key: 'prepareForNextLevel',
    value: function prepareForNextLevel() {
      this.level++;
      // remove listeners
      createjs.Ticker.removeAllEventListeners();
      // remove objects from stage
      this.stage.removeAllChildren();
      this.removeObjects();
      this.addObjects();
      this.updateHealthMeter();
      this.updateLevelIndicator();
    }
  }, {
    key: 'updateLevelIndicator',
    value: function updateLevelIndicator() {
      document.getElementById("level").textContent = 'Level ' + this.level;
    }

    // !!!!!!!!!!!!!!!!

  }, {
    key: 'startLevel',
    value: function startLevel() {
      this.addObjectsToStage();
      this.addObjectEventListenersToTicker();
      this.addCollisionListener();
      this.addGameProgressListeners();
      this.stage.update();
    }
  }, {
    key: 'addObjectsToStage',
    value: function addObjectsToStage() {
      this.forEachObject(function (obj) {
        this.stage.addChild(obj.shape);
      }.bind(this));
    }
  }, {
    key: 'addObjectEventListenersToTicker',
    value: function addObjectEventListenersToTicker() {
      this.forEachObject(function (obj) {
        // console.log('forEachObject obj:', obj) //=> Antibody {shape: a, stage: a, eventListeners: Object}
        for (var eventListenerType in obj.eventListeners) {
          // console.log('eventListenerType', eventListenerType); //=> pressmove
          // console.log('obj.eventListeners', obj.eventListeners); //=> Object {}
          // console.log('obj.eventListeners[eventListenerType]', obj.eventListeners[eventListenerType]);
          // => function (evt) {
          // var dx = this.shape.x - this.shape.prevX;
          // var dy = this.shape.y - this.shape.prevY;
          // if (antibodyEventListener) {
          //   createjs.Ticker.removeEventListener(…
          createjs.Ticker.addEventListener(eventListenerType, obj.eventListeners[eventListenerType]);
        }
      }.bind(this));
    }
  }, {
    key: 'addCollisionListener',
    value: function addCollisionListener() {
      createjs.Ticker.addEventListener("tick", this.checkForCollisions.bind(this));
    }
  }, {
    key: 'addGameProgressListeners',
    value: function addGameProgressListeners() {
      this.addGameWonListener();
      this.addYokoHealthDepletedListener();
      this.addLevelWonListener();
    }
  }, {
    key: 'addGameWonListener',
    value: function addGameWonListener() {
      createjs.Ticker.addEventListener("tick", this.handleGameWon.bind(this));
    }

    // renders appropriate modal and registers listeners on the modals

  }, {
    key: 'addYokoHealthDepletedListener',
    value: function addYokoHealthDepletedListener() {
      createjs.Ticker.addEventListener("tick", this.handleYokoHealthDepletion.bind(this));
    }
  }, {
    key: 'addLevelWonListener',
    value: function addLevelWonListener() {
      createjs.Ticker.addEventListener("tick", this.handleLevelWon.bind(this));
    }
  }, {
    key: 'removeObjects',
    value: function removeObjects() {
      this.antibodies = [];
      this.cancerCells = [];
      this.yoko = null;
    }

    // returns true if all cancer cells have attached antibodies

  }, {
    key: 'isLevelWon',
    value: function isLevelWon() {
      return this.cancerCells.every(function (cancerCell) {
        return cancerCell.attachedAntibody;
      });
    }
  }, {
    key: 'isYokoHealthDepleted',
    value: function isYokoHealthDepleted() {
      return this.yoko.health <= 0;
    }

    // assumes we only have 3 levels

  }, {
    key: 'isGameWon',
    value: function isGameWon() {
      return this.level === 3 && this.isLevelWon();
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game) {
    _classCallCheck(this, GameView);

    this.game = game;
    this.stage = this.game.stage;
  }

  _createClass(GameView, [{
    key: 'listenForGameStartClick',
    value: function listenForGameStartClick() {
      document.getElementById('start-button').addEventListener('click', this.closeModalAndStartGame.bind(this));
    }
  }, {
    key: 'closeModalAndRestartLevel',
    value: function closeModalAndRestartLevel(e) {
      e.preventDefault();
      document.getElementById('try-again-modal').className = 'hidden';
      this.restartLevel();
    }
  }, {
    key: 'closeModalAndStartGame',
    value: function closeModalAndStartGame(e) {
      e.preventDefault();
      document.getElementById('start-modal').className = 'hidden';
      this.startGame();
    }
  }, {
    key: 'restartLevel',
    value: function restartLevel() {
      createjs.Ticker.removeAllEventListeners();
      this.stage.removeAllChildren();
      var stage = this.stage;
      var level = this.game.level;
      this.game = new _game2.default(stage, level);
      this.game.updateHealthMeter();
      this.game.startLevel();
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      document.getElementById('try-again-button').addEventListener('click', this.closeModalAndRestartLevel.bind(this));
      this.game.level = 1;
      this.game.startLevel();
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // TODO: figure out how to slow down progressively to make esier to grab

var _util = __webpack_require__(4);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var antibodyImagePath = './assets/images/antibody.png';

var Antibody = function () {
  function Antibody(stage) {
    _classCallCheck(this, Antibody);

    this.attachedCancerCell = null;
    this.flung = false;
    this.radius = 25;
    this.shape = this.createAntibodyShape();
    this.stage = stage;
    this.addEventListeners = this.addEventListeners.bind(this);
    this.addEventListeners();
    this.addToStage();
  }

  _createClass(Antibody, [{
    key: 'createAntibodyShape',
    value: function createAntibodyShape() {
      var antibodyBitmap = new createjs.Bitmap(antibodyImagePath);
      antibodyBitmap.radius = this.radius;

      // greatly helps collision detection
      // as well enables rotation about center
      antibodyBitmap.regX = 25;
      antibodyBitmap.regY = 25;
      antibodyBitmap.x = Math.ceil(Math.random() * 750 + 10);
      antibodyBitmap.y = Math.ceil(Math.random() * 500 + 10);

      // Without below, prevX & prevY start out as undefined. any math done
      // with these values will result in NaN which results in buggy antibody behavior
      antibodyBitmap.prevX = antibodyBitmap.x;
      antibodyBitmap.prevY = antibodyBitmap.y;
      return antibodyBitmap;
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      this.shape.on('pressmove', function (evt) {
        // removeEventListener for smoother motion
        if (this.boundTickEventListener) {
          createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
          this.boundTickEventListener = null;
        }

        this.shape.prevX = this.shape.x;
        this.shape.prevY = this.shape.y;
        this.shape.x = evt.stageX % 800;
        this.shape.y = evt.stageY % 600;
        this.stage.update();
      }.bind(this)).bind(this);

      this.shape.on("pressup", function (evt) {
        this.dx = this.shape.x - this.shape.prevX;
        this.dy = this.shape.y - this.shape.prevY;
        this.flung = true;

        if (!this.boundTickEventListener) {
          this.boundTickEventListener = this.tickEventListener.bind(this);
          createjs.Ticker.addEventListener('tick', this.boundTickEventListener);
        }
      }.bind(this));
    }
  }, {
    key: 'tickEventListener',
    value: function tickEventListener() {
      this.shape.x = (0, _util2.default)(this.shape.x + this.dx / 4, 800);
      this.shape.y = (0, _util2.default)(this.shape.y + this.dy / 4, 600);

      if (this.shape.rotation === 359) {
        this.shape.rotation = 0;
      } else {
        this.shape.rotation += 1;
      }
      this.stage.update();
    }
  }, {
    key: 'removeTickEventListener',
    value: function removeTickEventListener() {
      createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
    }
  }, {
    key: 'addToStage',
    value: function addToStage() {
      this.stage.addChild(this.shape);
    }
  }]);

  return Antibody;
}();

exports.default = Antibody;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cancerCellImagePath = './assets/images/cancer_cell.png';

var CancerCell = function () {
  function CancerCell(stage) {
    _classCallCheck(this, CancerCell);

    this.attachedAntibody = null;
    this.radius = 25;
    this.stage = stage;
    this.shape = this.createCancerCellShape();
    this.shape.x = Math.ceil(Math.random() * 800);
    this.shape.y = Math.ceil(Math.random() * 500);
    // greatly helps collision detection
    this.shape.regX = 36;
    this.shape.regY = 33;
    this.tickCount = 0;
    this.prevX = this.shape.x;
    this.prevY = this.shape.y;
    this.targetX = Math.ceil(Math.random() * 800) + 100;
    this.targetY = Math.ceil(Math.random() * 500) + 100;

    this.eventListeners = {
      tick: function () {
        if (this.tickCount > 100) {
          this.targetX = Math.ceil(Math.random() * 800) + 100;
          this.targetY = Math.ceil(Math.random() * 500) + 100;
          this.tickCount = 0;
        }
        this.tickCount++;

        this.prevX += (this.targetX - this.prevX) / 15;
        this.prevY += (this.targetY - this.prevY) / 15;

        var dx = (this.prevX - this.shape.x) / 1000;
        var dy = (this.prevY - this.shape.y) / 1000;

        this.shape.x += dx;
        this.shape.y += dy;

        if (this.attachedAntibody) {
          this.attachedAntibody.shape.x += dx;
          this.attachedAntibody.shape.y += dy;
        }

        this.stage.update();
      }.bind(this)
    };
  }

  _createClass(CancerCell, [{
    key: 'createCancerCellShape',
    value: function createCancerCellShape() {
      var cancerCellBitmap = new createjs.Bitmap(cancerCellImagePath);
      cancerCellBitmap.radius = this.radius;
      cancerCellBitmap.prevX = cancerCellBitmap.x;
      cancerCellBitmap.prevY = cancerCellBitmap.y;
      return cancerCellBitmap;
    }
  }]);

  return CancerCell;
}();

exports.default = CancerCell;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var moduloWrap = function moduloWrap(value, modulo) {
  // if we just do `value % modulo` we run the risk of getting a negative number
  return (value % modulo + modulo) % modulo;
};

exports.default = moduloWrap;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var yokoImagePath = './assets/images/yoko.png';

var Yoko = function () {
  function Yoko(stage) {
    _classCallCheck(this, Yoko);

    this.radius = 50;
    this.shape = this.createYokoShape();
    this.stage = stage;
    this.eventListeners = {
      tick: function () {
        this.shape.x = this.stage.mouseX + 19;
        this.shape.y = this.stage.mouseY - 16;
        this.stage.update();
      }.bind(this)
    };
    this.health = 2500;
  }

  _createClass(Yoko, [{
    key: 'createYokoShape',
    value: function createYokoShape() {
      var yokoBitmap = new createjs.Bitmap(yokoImagePath);
      yokoBitmap.radius = this.radius;
      yokoBitmap.regX = 34;
      yokoBitmap.regY = 49;
      yokoBitmap.prevX = yokoBitmap.x;
      yokoBitmap.prevY = yokoBitmap.y;
      return yokoBitmap;
    }
  }]);

  return Yoko;
}();

exports.default = Yoko;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _game_view = __webpack_require__(1);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  createjs.Ticker.setFPS(60);
  var stage = new createjs.Stage(canvas);
  var level = 1;
  var game = new _game2.default(stage, level);
  window.gv = new _game_view2.default(game);
  window.gv.listenForGameStartClick();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map