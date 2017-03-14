# (Re)Mission Possible
(Re)Mission Possible is an antibody-flinging, cancer butt-kicking game inspired by the neuroblastoma team and pediatric oncology patients at Memorial Sloan Kettering Cancer Center.

[Live Version](http://melaniedavila.com/remission-possible/)

![screenshot_img][screenshot]

## Instructions
In this one-player game, the player controls a friendly mouse ninja named Yoko Hama with their mouse. Together, Yoko Hama and the player must complete 3 levels. In order to beat a level, the player must attach an antibody to every cancer cell by picking up an antibody with their mouse and flinging it towards the cancer cell. Once this has been complete, immune system cells will come to wipe away the cancer cells and the player will advance to the next level.

## Architecture & Technologies

The [Easel.js](http://www.createjs.com/easeljs) component of the Create.js library was used to facilitate DOM manipulation and rendering. All moving objects (antibodies, cancer cells, immune system cells, Yoko Hama) include a create.js Bitmap object as a representation of their shape.

``` javascript
  createCancerCellShape() {
    const cancerCellBitmap = new createjs.Bitmap(cancerCellImagePath);
    cancerCellBitmap.radius = this.radius;
    cancerCellBitmap.prevX = cancerCellBitmap.x;
    cancerCellBitmap.prevY = cancerCellBitmap.y;
    return cancerCellBitmap;
  }
```

## Features & Implementation

### Collision Detection
All moving objects of the have bitmap components representing their shape as bitmap object with a radius attribute. Because of this, three different types of collisions implement the same collision logic:
- Antibody- Cancer Cell
- Yoko Hama- Cancer Cell
- Immune System Cell- Cancer Cell

``` javascript
areCollided(obj1, obj2) {
  const dx = obj1.shape.x - obj2.shape.x;
  const dy = obj1.shape.y - obj2.shape.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < obj1.radius + obj2.radius;
}
```

### Correlation of Antibody Velocity with Mouse Release Velocity
Event listeners are bound to the createjs.Ticker upon both mouse click and release. Velocity calculations are implemented in the 'pressup' (mouse release) event listener to ensure that the antibody velocity is correlated to the velocity of the mouse movement upon click release.

``` javascript
addEventListeners() {
  this.shape.on('pressmove', function (evt) {
    if (this.boundTickEventListener) {
      createjs.Ticker.removeEventListener('tick', this.boundTickEventListener);
      this.boundTickEventListener = null;
    }

    this.shape.prevX = this.shape.x;
    this.shape.prevY = this.shape.y;
    this.shape.x = evt.stageX % 800;
    this.shape.y = evt.stageY % 600;
  }.bind(this)).bind(this);

  this.shape.on("pressup", function(evt) {
    this.dx = this.shape.x - this.shape.prevX;
    this.dy = this.shape.y - this.shape.prevY;
    this.flung = true;

    if (!this.boundTickEventListener) {
      this.boundTickEventListener = this.tickEventListener.bind(this)
      createjs.Ticker.addEventListener('tick', this.boundTickEventListener);
    }

  }.bind(this));
}

tickEventListener() {
  this.shape.x = moduloWrap(this.shape.x + this.dx/4, 800);
  this.shape.y = moduloWrap(this.shape.y + this.dy/4, 600);

  if (this.shape.rotation === 359) {
    this.shape.rotation = 0
  } else {
    this.shape.rotation += 1
  }
}
```


### Styling
The game's meters, header, modals, and footer were styled using vanilla CSS. HTML DOM elements were manipulated with the HTML DOM's native functions in order to avoid extra bulk from using jQuery.

Below, Yoko Hama's health bar is updated when she takes damage.

``` javascript
updateHealthMeter() {
  document.getElementById('health-level').style.width = `${ this.yoko.health / 10 }px`;
}
```


### Music & Sound Effects
The game's music and sound effects were implemented via JavaScript's native Audio class.

Below is an example from the GameView class:

``` javascript
setUpMusic() {
  this.music = new Audio('./assets/sounds/background.mp3');
  this.music.loop = true;
  this.playMusic();
}
```


## Future Directions for the Project
- [X] Music and sound effects
- [ ] Addition of more levels
- [ ] Options for difficulty level

[screenshot]: docs/screenshots/level_2.png
