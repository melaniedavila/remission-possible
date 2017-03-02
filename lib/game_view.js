export default class GameView {
  constructor(game) {
    this.game = game;
    this.stage = this.game.stage;
  }

  addObjectsToStage() {
    this.game.forEachObject(function (obj) {
      this.stage.addChild(obj.shape);
      this.stage.update();
    }.bind(this));
  }

  addEventListenersToObjects() {
    this.game.forEachObject(function (obj) {
      for (var eventListenerType in obj.eventListeners) {
        createjs.Ticker.addEventListener(
          eventListenerType,
          obj.eventListeners[eventListenerType]
        );
      }
    }.bind(this));
  }

  start(){
    this.addObjectsToStage();
    this.addEventListenersToObjects();
  }
}
