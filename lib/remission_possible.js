import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function () {
  // const circle1 = new createjs.Shape();
  // const circle2 = new createjs.Shape();
  // circle1.graphics.beginFill("rgb(162, 216, 255)");
  // circle1.graphics.drawCircle(20, 20, 20);
  // circle2.graphics.beginFill("rgb(0, 255, 0)");
  // circle2.graphics.drawCircle(20, 20, 20);

  // stage.addChild(circle1);
  // stage.addChild(circle2);
  // stage.update();

  // NB: makes circle (yoko) follow mouse
  // createjs.Ticker.addEventListener('tick', cursor);
  // createjs.Ticker.setFPS(60);
  //
  // function cursor() {
  //   var difX = stage.mouseX - circle1.x;
  //   var difY = stage.mouseY - circle1.y;
  //
  //   circle1.x += difX;
  //   circle1.y += difY;
  //   stage.update();
  // }

  // NB: random cancer cell movement
    // let tickCount = 0;
    // let prevX = 200;
    // let prevY = 200;
    // let targetX = 500;
    // let targetY = 500;
    // createjs.Ticker.addEventListener('tick', handleTick);
    // createjs.Ticker.setFPS(60);
    // function handleTick() {
    //   // smaller number below causes circle to stay within smaller vicinity
    //   if(tickCount > 60) {
    //     targetX = Math.ceil(Math.random()*800) + 100;
    //     targetY = Math.ceil(Math.random()*500) + 100;
    //     tickCount = 0;
    //   }
    //   tickCount++;
    //
    //   prevX += (targetX - prevX)/15;
    //   prevY += (targetY - prevY)/15;
    //
    //   circle2.x += (prevX - circle2.x)/1000;
    //   circle2.y += (prevY - circle2.y)/1000;
    //   stage.update();
    // }

  const stage = new createjs.Stage(canvas);
  const game = new Game(stage); // TODO: add arguments as needed
  new GameView(game).start(); // TODO: add arguments to GameView as needed. add start fn to GameView
});
