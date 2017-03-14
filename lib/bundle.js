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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

var _immune_system_cell = __webpack_require__(4);

var _immune_system_cell2 = _interopRequireDefault(_immune_system_cell);

var _yoko = __webpack_require__(6);

var _yoko2 = _interopRequireDefault(_yoko);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(stage, level) {
    _classCallCheck(this, Game);

    this.stage = stage;
    this.level = level;
    this.antibodies = [];
    this.cancerCells = [];
    this.immuneSystemCells = [];
    this.addObjects();
  }

  _createClass(Game, [{
    key: 'addAntibodies',
    value: function addAntibodies() {
      for (var i = 0; i < this.level * 5; i++) {
        this.antibodies.push(new _antibody2.default());
      }
    }
  }, {
    key: 'addCancerCells',
    value: function addCancerCells() {
      for (var i = 0; i < this.level * 5; i++) {
        this.cancerCells.push(new _cancer_cell2.default());
      }
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
  }, {
    key: 'addImmuneSystemCells',
    value: function addImmuneSystemCells() {
      var _this = this;

      var immuneSystemCell;
      this.cancerCells.forEach(function (cancerCell) {
        immuneSystemCell = new _immune_system_cell2.default(cancerCell);
        _this.stage.addChild(immuneSystemCell.shape);
        _this.immuneSystemCells.push(immuneSystemCell);
      });
    }
  }, {
    key: 'addLevelWonListener',
    value: function addLevelWonListener() {
      createjs.Ticker.addEventListener("tick", this.handleLevelWon.bind(this));
    }
  }, {
    key: 'addObjectEventListenersToTicker',
    value: function addObjectEventListenersToTicker() {
      this.forEachObject(function (obj) {
        for (var eventListenerType in obj.eventListeners) {
          createjs.Ticker.addEventListener(eventListenerType, obj.eventListeners[eventListenerType]);
        }
      }.bind(this));
    }
  }, {
    key: 'addObjects',
    value: function addObjects() {
      this.addAntibodies();
      this.addCancerCells();
      this.addYoko();
    }
  }, {
    key: 'addObjectsToStage',
    value: function addObjectsToStage() {
      this.forEachObject(function (obj) {
        this.stage.addChild(obj.shape);
      }.bind(this));
    }
  }, {
    key: 'addYoko',
    value: function addYoko() {
      this.yoko = new _yoko2.default(this.stage);
    }
  }, {
    key: 'addYokoHealthDepletedListener',
    value: function addYokoHealthDepletedListener() {
      createjs.Ticker.addEventListener("tick", this.handleYokoHealthDepletion.bind(this));
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
      // Gives user a visual cue that antibody has successfully attached
      antibody.changeColorUponCancerCellAttachment();
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
          var antibody = antibodies[i];
          var cancerCell = cancerCells[j];

          // Only attach antibody to cancerCell if cancerCell is free of attachments
          if (this.areNotAttached(antibody, cancerCell) && this.areCollided(antibody, cancerCell)) {
            this.attachAntibodyToCancerCell(antibody, cancerCell);
          }
        }
      }
    }
  }, {
    key: 'checkForCollisions',
    value: function checkForCollisions() {
      this.checkForAntibodyCancerCellCollisions();
      this.checkForYokoCancerCellCollisions();
    }
  }, {
    key: 'checkForYokoCancerCellCollisions',
    value: function checkForYokoCancerCellCollisions() {
      var yoko = this.yoko;
      var cancerCells = this.cancerCells;
      for (var i = 0; i < cancerCells.length; i++) {
        if (this.areCollided(yoko, cancerCells[i])) {
          yoko.health -= 3;
          this.updateHealthMeter();
        }
      }
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
    key: 'forEachObject',
    value: function forEachObject(callback) {
      this.antibodies.forEach(callback);
      this.cancerCells.forEach(callback);
      this.immuneSystemCells.forEach(callback);
      callback(this.yoko);
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
        this.transitionining = true;
        this.removeTickListeners();
        // Remove all tick listeners, but then reattach the one that
        // updates the stage
        this.renderOnTick();
        this.listenForFinalCancerCellsNeutralized();
        this.addImmuneSystemCells();
      }
    }
  }, {
    key: 'handleLevelWon',
    value: function handleLevelWon() {
      if (this.isLevelWon() && this.level < 3) {
        this.transitionining = true;
        this.removeTickListeners();
        // Remove all tick listeners, but then reattach the one that
        // updates the stage
        this.renderOnTick();
        this.listenForAllCancerCellsNeutralized();
        this.addImmuneSystemCells();
      }
    }
  }, {
    key: 'isGameWon',
    value: function isGameWon() {
      return this.level === 3 && this.isLevelWon();
    }
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
  }, {
    key: 'listenForAllCancerCellsNeutralized',
    value: function listenForAllCancerCellsNeutralized() {
      var _this2 = this;

      createjs.Ticker.addEventListener('tick', function () {
        if (_this2.cancerCells.every(function (cancerCell) {
          return cancerCell.neutralized;
        })) {
          _this2.prepareForNextLevel();
          _this2.startLevel();
        }
      });
    }
  }, {
    key: 'listenForFinalCancerCellsNeutralized',
    value: function listenForFinalCancerCellsNeutralized() {
      var _this3 = this;

      createjs.Ticker.addEventListener('tick', function () {
        if (_this3.cancerCells.every(function (cancerCell) {
          return cancerCell.neutralized;
        })) {
          document.getElementById('winner-modal').classList.remove('hidden');
        }
      });
    }
  }, {
    key: 'prepareForNextLevel',
    value: function prepareForNextLevel() {
      this.level++;
      this.stage.removeAllChildren();
      this.removeObjects();
      this.addObjects();
      this.updateHealthMeter();
      this.updateLevelIndicator();
    }
  }, {
    key: 'removeObjects',
    value: function removeObjects() {
      this.antibodies = [];
      this.cancerCells = [];
      this.yoko = null;
    }
  }, {
    key: 'renderOnTick',
    value: function renderOnTick() {
      var _this4 = this;

      createjs.Ticker.addEventListener('tick', function () {
        _this4.stage.update();
      });
    }
  }, {
    key: 'removeTickListeners',
    value: function removeTickListeners() {
      createjs.Ticker.removeAllEventListeners();
    }
  }, {
    key: 'startLevel',
    value: function startLevel() {
      this.addObjectsToStage();
      this.addObjectEventListenersToTicker();
      this.addCollisionListener();
      this.addGameProgressListeners();
      this.renderOnTick();
    }
  }, {
    key: 'updateHealthMeter',
    value: function updateHealthMeter() {
      document.getElementById('health-level').style.width = this.yoko.health / 10 + 'px';
    }
  }, {
    key: 'updateLevelIndicator',
    value: function updateLevelIndicator() {
      document.getElementById("level").textContent = 'Level ' + this.level;
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
    this.setUpMusic();
  }

  _createClass(GameView, [{
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
    key: 'listenForGameStartAndMusicToggleClicks',
    value: function listenForGameStartAndMusicToggleClicks() {
      this.listenForGameStartClick();
      this.listenForPauseMusicClick();
      this.listenForPlayMusicClick();
    }
  }, {
    key: 'listenForGameStartClick',
    value: function listenForGameStartClick() {
      document.getElementById('start-button').addEventListener('click', this.closeModalAndStartGame.bind(this));
    }
  }, {
    key: 'listenForPauseMusicClick',
    value: function listenForPauseMusicClick() {
      document.getElementById('music-playing-icon').addEventListener('click', this.pauseMusic.bind(this));
    }
  }, {
    key: 'listenForPlayMusicClick',
    value: function listenForPlayMusicClick() {
      document.getElementById('music-paused-icon').addEventListener('click', this.playMusic.bind(this));
    }
  }, {
    key: 'pauseMusic',
    value: function pauseMusic() {
      document.getElementById('music-playing-icon').classList.add('hidden');
      document.getElementById('music-paused-icon').classList.remove('hidden');
      this.music.pause();
    }
  }, {
    key: 'playMusic',
    value: function playMusic() {
      document.getElementById('music-paused-icon').classList.add('hidden');
      document.getElementById('music-playing-icon').classList.remove('hidden');
      this.music.play();
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
    key: 'setUpMusic',
    value: function setUpMusic() {
      this.music = new Audio('./assets/sounds/background.mp3');
      this.music.loop = true;
      this.playMusic();
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(5);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var antibodyImagePath = './assets/images/antibody.png';
var attachedAntibodyImagePath = './assets/images/attached_antibody.png';

var Antibody = function () {
  function Antibody() {
    _classCallCheck(this, Antibody);

    this.attachedCancerCell = null;
    this.flung = false;
    this.radius = 25;
    this.shape = this.createAntibodyShape();
    this.addEventListeners = this.addEventListeners.bind(this);
    this.addEventListeners();
  }

  _createClass(Antibody, [{
    key: 'addEventListeners',
    value: function addEventListeners() {
      // Gives user a visual cue that the antibody has successfully been
      // picked up:
      this.shape.on('mousedown', function (evt) {
        // Removing event listener ensures that antibody ceases to move upon
        // mousedown.
        if (this.boundTickEventListener) {
          createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
          this.boundTickEventListener = null;
        }

        this.shape.rotation += 45;
      }.bind(this));

      this.shape.on('pressmove', function (evt) {
        // Remove event listener for smoother motion
        if (this.boundTickEventListener) {
          createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
          this.boundTickEventListener = null;
        }

        this.shape.prevX = this.shape.x;
        this.shape.prevY = this.shape.y;
        this.shape.x = evt.stageX % 800;
        this.shape.y = evt.stageY % 600;
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
    key: 'changeColorUponCancerCellAttachment',
    value: function changeColorUponCancerCellAttachment() {
      this.shape.image = document.createElement("img");
      this.shape.image.src = attachedAntibodyImagePath;
    }
  }, {
    key: 'createAntibodyShape',
    value: function createAntibodyShape() {
      var antibodyBitmap = new createjs.Bitmap(antibodyImagePath);
      antibodyBitmap.radius = this.radius;

      // Lines 21 & 22 greatly help collision detection & enable rotation
      // about antibody center
      antibodyBitmap.regX = 25;
      antibodyBitmap.regY = 25;

      antibodyBitmap.x = Math.ceil(Math.random() * 750 + 10);
      antibodyBitmap.y = Math.ceil(Math.random() * 500 + 10);

      // Without below, prevX & prevY start out as undefined. Any math done
      // with these values will result in NaN which results in buggy antibody behavior
      antibodyBitmap.prevX = antibodyBitmap.x;
      antibodyBitmap.prevY = antibodyBitmap.y;
      return antibodyBitmap;
    }
  }, {
    key: 'removeTickEventListener',
    value: function removeTickEventListener() {
      createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
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
var CANVAS_XDIM = 800;

var CancerCell = function () {
  function CancerCell() {
    _classCallCheck(this, CancerCell);

    this.attachedAntibody = null;
    this.radius = 25;
    this.shape = this.createCancerCellShape();
    this.shape.x = Math.ceil(Math.random() * CANVAS_XDIM);
    this.shape.y = Math.ceil(Math.random() * 500);
    // Lines 13 & 14 greatly help collision detection
    this.shape.regX = 36;
    this.shape.regY = 33;
    this.tickCount = 0;
    this.prevX = this.shape.x;
    this.prevY = this.shape.y;
    this.targetX = Math.ceil(Math.random() * CANVAS_XDIM);
    this.targetY = Math.ceil(Math.random() * 500) + 100;

    this.eventListeners = {
      tick: function () {
        if (this.tickCount > 450) {
          this.targetX = Math.ceil(Math.random() * CANVAS_XDIM) + 100;
          this.targetY = Math.ceil(Math.random() * 500) + 100;

          this.tickCount = 0;
        }
        this.tickCount++;

        this.prevX += (this.targetX - this.prevX) / 15;
        this.prevY += (this.targetY - this.prevY) / 15;

        var dx = (this.prevX - this.shape.x) / 400;
        var dy = (this.prevY - this.shape.y) / 400;

        this.updateXY(dx, dy);
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
  }, {
    key: 'updateXY',
    value: function updateXY(dx, dy) {
      this.shape.x += dx;
      this.shape.y += dy;

      if (this.attachedAntibody) {
        this.attachedAntibody.shape.x += dx;
        this.attachedAntibody.shape.y += dy;
      }
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var immuneSystemCellImagePath = './assets/images/immune_system_cell.png';

var ImmuneSystemCell = function () {
  function ImmuneSystemCell(cancerCell) {
    _classCallCheck(this, ImmuneSystemCell);

    this.cancerCell = cancerCell;
    this.originalX = Math.ceil(Math.random() * 100 + 900);
    this.originalY = Math.ceil(Math.random() * 100 + 600);
    this.shape = this.createShape();
    this.seekingCancerCell = true;
    this.radius = 38;

    createjs.Ticker.addEventListener('tick', this.move.bind(this));

    this.boundCheckIfFoundCancerCell = this.checkIfFoundCancerCell.bind(this);

    createjs.Ticker.addEventListener('tick', this.boundCheckIfFoundCancerCell);
  }

  _createClass(ImmuneSystemCell, [{
    key: 'checkIfFoundCancerCell',
    value: function checkIfFoundCancerCell() {
      if (this.collided()) {
        this.seekingCancerCell = false;
        createjs.Ticker.removeEventListener('tick', this.boundCheckIfFoundCancerCell);

        createjs.Ticker.addEventListener('tick', this.neutralizeCancerCellWhenOffScreen.bind(this));
      }
    }
  }, {
    key: 'collided',
    value: function collided() {
      var dx = this.shape.x - this.cancerCell.shape.x;
      var dy = this.shape.y - this.cancerCell.shape.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      return distance < this.radius + this.cancerCell.shape.radius;
    }
  }, {
    key: 'createShape',
    value: function createShape() {
      var bitmap = new createjs.Bitmap(immuneSystemCellImagePath);
      bitmap.radius = this.radius;
      bitmap.x = this.originalX;
      bitmap.y = this.originalY;
      bitmap.prevX = bitmap.x;
      bitmap.prevY = bitmap.y;
      bitmap.regX = 50;
      bitmap.regY = 50;
      return bitmap;
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.seekingCancerCell) {
        this.moveTowardsCancerCell();
      } else {
        this.moveOffScreen();
      }
    }
  }, {
    key: 'moveOffScreen',
    value: function moveOffScreen() {
      var dx = (this.originalX - this.shape.x) / 25;
      var dy = (this.originalY - this.shape.y) / 25;
      this.shape.x += dx;
      this.shape.y += dy;
      this.cancerCell.updateXY(dx, dy);
    }
  }, {
    key: 'moveTowardsCancerCell',
    value: function moveTowardsCancerCell() {
      var dx = (this.cancerCell.shape.x - this.shape.x) / 25;
      var dy = (this.cancerCell.shape.y - this.shape.y) / 25;

      this.shape.x += dx;
      this.shape.y += dy;
    }
  }, {
    key: 'neutralizeCancerCellWhenOffScreen',
    value: function neutralizeCancerCellWhenOffScreen() {
      if (this.offscreen()) {
        this.cancerCell.neutralized = true;
      }
    }
  }, {
    key: 'offscreen',
    value: function offscreen() {
      return (this.shape.x > 800 || this.shape.x < 0) && (this.shape.y > 600 || this.shape.y < 0);
    }
  }]);

  return ImmuneSystemCell;
}();

exports.default = ImmuneSystemCell;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var moduloWrap = function moduloWrap(value, modulo) {
  // If we just do `value % modulo` we run the risk of getting a negative number
  return (value % modulo + modulo) % modulo;
};

exports.default = moduloWrap;

/***/ }),
/* 6 */
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
/* 7 */
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
  var gameView = new _game_view2.default(game);
  gameView.listenForGameStartAndMusicToggleClicks();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map