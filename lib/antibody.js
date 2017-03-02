// TODO: figure out how to wrap around antibodies on screen or make them stop
// when they hit a wall or slow down progressively to make esier to grab

export default class Antibody {
  constructor(stage){
    this.shape = this.createAntibodyShape();
    this.stage = stage;
    // this.eventListeners = {
    //   pressmove: function (evt) {
    //     this.shape.prevX = this.shape.x;
    //     this.shape.prevY = this.shape.y;
    //     this.shape.x = evt.stageX;
    //     this.shape.y = evt.stageY;
    //     console.log('this.shape.x', this.shape.x);
    //     console.log('this.shape.y', this.shape.y);
    //     this.stage.update();
    //   }.bind(this),
    //   pressup: function (evt) {
    //     const dx = this.shape.x - this.shape.prevX;
    //     const dy = this.shape.y - this.shape.prevY;
    //     if (antibodyEventListener) {
    //       createjs.Ticker.removeEventListener('tick', antibodyEventListener);
    //     }
    //
    //     antibodyEventListener = function () {
    //       this.shape.x += dx / 4;
    //       this.shape.y += dy / 4;
    //       this.stage.update();
    //     }.bind(this);
    //
    //     createjs.Ticker.addEventListener('tick', antibodyEventListener);
    //   }.bind(this)
    // }
    this.addEventListeners = this.addEventListeners.bind(this);
    this.addEventListeners();
    this.addToStage();
  }

  // blue
  createAntibodyShape(){
    const circle = new createjs.Shape();
    circle.graphics.beginFill("rgb(162, 216, 255)");
    circle.graphics.drawCircle(20, 20, 20);
    return circle;
  }

  addEventListeners(){
    var antibodyEventListener;
    debugger
    this.shape.on('pressmove', function (evt) {
      debugger
      this.shape.prevX = this.shape.x;
      this.shape.prevY = this.shape.y;
      this.shape.x = evt.stageX;
      this.shape.y = evt.stageY;
      this.stage.update();
    }.bind(this)).bind(this);


      this.shape.on("pressup", function(evt) {
        const dx = this.shape.x - this.shape.prevX;
        const dy = this.shape.y - this.shape.prevY;

        // removeEventListener for smoother motion
        if (antibodyEventListener) {
          createjs.Ticker.removeEventListener('tick', antibodyEventListener);
        }

        antibodyEventListener = function () {
          this.shape.x += dx/4;
          this.shape.y += dy/4;
          this.stage.update();
        }.bind(this);

        createjs.Ticker.addEventListener('tick', antibodyEventListener);
      }.bind(this));
  }

  addToStage(){
    this.stage.addChild(this.shape);
  }
}


// NB: antibody movement
// click and drag, then release and will move in direction
// var circleEventListener;
// circle.on('pressmove', function (evt) {
//   circle.prevX = circle.x;
//   circle.prevY = circle.y;
//   circle.x = evt.stageX;
//   circle.y = evt.stageY;
//   stage.update();
// });
//
  //
  // circle.on("pressup", function(evt) {
  //   const dx = circle.x - circle.prevX;
  //   const dy = circle.y - circle.prevY;
  //
  //   // removeEventListener for smoother motion
  //   if (circleEventListener) {
  //     createjs.Ticker.removeEventListener('tick', circleEventListener);
  //   }
  //
  //   circleEventListener = function () {
  //     circle.x += dx/4;
  //     circle.y += dy/4;
  //     stage.update();
  //   };
  //
  //   createjs.Ticker.addEventListener('tick', circleEventListener);
  // });
