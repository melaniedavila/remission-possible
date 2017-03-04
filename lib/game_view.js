export default class GameView {
  constructor(game) {
    this.game = game;
    this.stage = this.game.stage;
  }

  addObjectsToStage() {
    this.game.forEachObject(function (obj) {
      this.stage.addChild(obj.shape);
      // console.log('addingObjectToStage', obj);
      // this.stage.update();
    }.bind(this));
  }

  addEventListenersToObjects() {
    this.game.forEachObject(function (obj) {
      // debugger
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
        createjs.Ticker.addEventListener(
          eventListenerType,
          obj.eventListeners[eventListenerType]
        );
      }
    }.bind(this));
  }

  addCollisionListener() {
    createjs.Ticker.addEventListener("tick", this.game.checkForCollisions.bind(this.game));
  }

  listenForGameStartClick(){
    $('.start-button').on('click', this.closeModalAndStartGame.bind(this));
  }

  closeModalAndStartGame(e) {
    e.preventDefault();
    $('.start-modal').addClass('hidden');
    this.start();
  }

  start(){
    this.addObjectsToStage();
    this.addEventListenersToObjects();
    this.addCollisionListener();
    this.stage.update();
  }
}
