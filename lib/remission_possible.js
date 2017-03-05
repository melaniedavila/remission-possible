import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function () {
  createjs.Ticker.setFPS(60);
  const stage = new createjs.Stage(canvas);
  const level = 1;
  const game = new Game(stage, level);
  window.gv = new GameView(game);
  window.gv.listenForGameStartClick();
});
