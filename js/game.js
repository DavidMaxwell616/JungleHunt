const game = new Phaser.Game(800, 480, Phaser.BOX2D, 'game', {
  preload,
  create,
  update,
  render,
});

function create() {
  if (!startGame) mainMenuCreate();
  else gameCreate();
}

function gameCreate() {
  splash1.destroy();
  splash2.destroy();
  splash3.destroy();
  splash4.destroy();
  splash5.destroy();
  maxxdaddy.destroy();

  game.stage.backgroundColor = '#258A00';

   game.physics.startSystem(Phaser.Physics.BOX2D);
  game.physics.box2d.gravity.y = 500;
  game.physics.box2d.setBoundsToWorld();
  game.physics.box2d.friction = 1;
  game.physics.box2d.restitution = 0.1;
  game.physics.box2d.debugDraw.joints = true;

  //createLevel1Stuff();

  // crocs = game.add.group();
  // bubbles = game.add.group();
  // createLevel2Stuff();

  rocks = game.add.group();
  createLevel3Stuff();

  createLevel4Stuff();

  hunter = game.add.sprite(0, 0, 'hunter');
  game.physics.box2d.enable(hunter);
  hunter.visible = false;

  textTiles = game.add.group();
  textTiles.createMultiple(150, 'text');
  textTiles.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
  setUpArrows();
 
  game.input.onDown.add(function(){mouseDown=true;}, this);
  game.input.onUp.add(function(){arrowDown=false;mouseDown=false;}, this);
  game.cursors = game.input.keyboard.createCursorKeys();
  game.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function setUpArrows(){
  for (let index = 0; index < arrows.length; index++) {
   var arrow = arrowStats[index];
   arrows[index] = game.add.image(0,0,'arrow');
    arrows[index].scale.setTo(.25);
    arrows[index].anchor.setTo(0.5, 0.5);
    arrows[index].xOffset = arrow.xOffset;  
    arrows[index].yOffSet = arrow.yOffset;  
   arrows[index].x = arrows[index].width*.25+40+arrow.xOffset;
   arrows[index].y =levelHeight -arrows[index].width*.25+-40+arrow.yOffset;
   arrows[index].visible = false;
   arrows[index].name= arrow.direction;
   arrows[index].inputEnabled = true;
   arrows[index].angle =arrow.angle;  
  }
}

function doIntro() {
  const level = curLevel % 4 === 0 ? 4 : curLevel % 4;
  drawInfoText(
    `LEVEL: ${curLevel}`,
    game.width / 2,
    200,
    32,
    COLOR_WHITE,
    GAME_FONT,
    5000,
  );
  drawInfoText(
    `SCORE: ${curScore}`,
    game.width / 2,
    250,
    32,
    COLOR_WHITE,
    GAME_FONT,
    5000,
  );
  const levelDescription = [
    'GET TO THE RIVER!',
    'CROSS THE RIVER!',
    'CLIMB THE HILL!',
    'SAVE THE GIRL!',
  ];
  drawInfoText(
    levelDescription[level - 1],
    game.width / 2,
    300,
    32,
    COLOR_WHITE,
    GAME_FONT,
    5000,
  );
} // end Do_Intro

function drawInfoText(text, x, y, size, color, font, delay) {
  infoText = game.add.text(x, y, text, {
    fill: color,
    font: `${size}pt ${font}`,
  });
  infoText.updateText();
  // infoText.anchor.setTo(0.5, 0.5);
  textTimer = game.time.events.add(delay, infoText.destroy, infoText);
  infoText.anchor.setTo(0.5);
}

function buildLevel() {
  const level = curLevel % 4 === 0 ? 4 : curLevel % 4;
  switch (level) {
    case 1:
      buildLevel1();
      break;
    case 2:
      buildLevel2();
      break;
    case 3:
      buildLevel3();
      break;
    case 4:
      buildLevel4();
      break;
    default:
      break;
  }

  game.world.setBounds(0, 0, levelWidth, levelHeight);
  game.camera.follow(hunter);

  if (showintro === 1 && currLives > 0) {
    doIntro();
    showintro = 0;
  }
}

function collisionTest(object1, object2) {
  const rect1 = {
    x: object1.x - object1.width / 2,
    y: object1.y + object1.height / 2,
    width: object1.width,
    height: object1.height,
  };
  const rect2 = {
    x: object2.x - object2.width / 2,
    y: object2.y + object2.height / 2,
    width: object2.width,
    height: object2.height,
  };

  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y > rect2.y - rect1.height
  ) {
    return true;
    // collision detected!
  }
  return false;
} // end collisionTest
// //////////////////////////////////////////////////////////

function update() {
  if (!startGame) {
    mainMenuUpdate();
    return;
  }
  if (currLives === 0) {
    gameOver = true;
    // draw text
    drawInfoText(
      'G A M E    O V E R',
      520,
      200,
      32,
      'rgb(255,0,0)',
      'Impact',
      1000,
    );
    drawInfoText(
      'Press spacebar play again',
      520,
      280,
      32,
      'rgb(255,0,0)',
      'Impact',
      1000,
    );
    if (game.fireButton.isDown) {
      currLives = 3;
      gameOver = false;
      curLevel = 1;
      curScore = 0;
    }
    return;
  } // end if

  const level = curLevel % 4 === 0 ? 4 : curLevel % 4;

  switch (level) {
    case 1:
      updateLevel1();
      break;
    case 2:
      updateLevel2();
      break;
    case 3:
      updateLevel3();
      break;
    case 4:
      updateLevel4();
      break;
    default:
      break;
  }
}

function drawScore() {
  drawText(
    game.camera.x + 40,
    20,
    `PLAYER 1 - ${`000000${curScore}`.slice(-7)}`,
    1,
  );
}

function drawLives() {
  let x = game.width + game.camera.x - 90;
  const y = game.height - 20;
  for (let i = 0; i < currLives; i += 1) {
    const letter = textTiles.children[i + 20];
    letter.x = x;
    letter.y = y;
    letter.alive = true;
    letter.visible = true;
    letter.frame = 4;
    x += 32;
  }
}

// function drawLevel() {
//   drawText(850, 20, `LEVEL ${`00${curLevel}`.slice(-3)}`, 20);
// }

function drawText(x, y, str) {
  let newX = x;
  const text = str.toUpperCase();
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charAt(i);
    const frame = textFrames[code];
    const letter = textTiles.children[i];
    // console.log(letter);
    if (typeof frame !== 'undefined') {
      letter.x = newX;
      letter.y = y;
      letter.alive = true;
      letter.visible = true;
      letter.frame = frame;
      newX += 38;
    } else {
      newX += 20;
    }
  }
}

function render() {
   if (level3bkgd1 != null){
    game.debug.body(level3bkgd1);
  game.debug.box2dWorld();
   }
  // if (hunter != null)
  //   game.debug.body(hunter);
  // for (let index = 0; index < amountCrocs; index += 1) {
  //   var rect = new Phaser.Rectangle(crocs[index].x - (crocs[index].width / 2), crocs[index].y - (crocs[index].height / 2), crocs[index].width, crocs[index].height);
  //   game.debug.geom(rect, 'rgba(255,0,0,.5)');
  // }
}