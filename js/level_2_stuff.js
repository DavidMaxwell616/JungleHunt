function createLevel2Stuff() {
  level2bkgd2 = game.add.image(0, 0, 'level 2 layer2');
  level2bkgd2.width = game.width * 3.5;
  level2bkgd2.height = game.height * 0.7;
  level2bkgd2.visible = false;

  level2bkgd3 = game.add.image(0, 0, 'level 2 layer3');
  level2bkgd3.width = game.width * 3.5;
  // level2bkgd3.height = game.height;
  level2bkgd3.visible = false;

  level2bkgd1 = game.add.sprite(0, 0, 'level 2 layer1');
  level2bkgd1.width = game.width * 3.5;
  level2bkgd1.visible = false;

  for (let index = 0; index < MAX_AIR; index++) {
    air[index] = game.add.sprite(0, 0, 'air');
    air[index].visible = false;
    air[index].anchor.setTo(0.5, 0.5);
    air[index].state = DEAD;
    const breath = air[index].animations.add('breathe');
    breath.onComplete.add(takeBreath, this);
  }

  airLabel = game.add.sprite(0, 0, 'airLabel');
  airLabel.visible = false;
}

function touchBottom(){
if(hunter.body.y<=game.height/2){
  if (levelOver)
    return;
  hunter.frame = 0;
  hunter.rotation = 0;
  hunter.body.velocity.x = JUMP_VELOCITY_X / 2;
  hunter.body.velocity.y = JUMP_VELOCITY_Y * 1.5;
  game.physics.box2d.gravity.y = 500;
  levelOver = true;
}
}

function buildLevel2() {
  for (let i = 0; i < MAX_AIR; i++) {
    air[i].reset(game.width * 0.85 + i * 16, 100);
    //console.log(i, air[i]);
  }
  airLabel.reset(game.width * 0.77, 92);
  amountCrocs = curLevel * 2;
  game.stage.backgroundColor = '#B0DAFF';
  level2bkgd1.reset(0, game.height * 0.69);
  level2bkgd3.reset(0, game.height * 0.65);
  level2bkgd2.reset(0, game.height * 0.4);
  game.physics.box2d.enable(level2bkgd1);
  level2bkgd1.body.static = true;
  level2bkgd1.visible = true;
  level2bkgd1.body.clearFixtures();
  level2bkgd1.body.loadPolygon('physicsData', 'riverBed', level2bkgd1);
  level2bkgd1.body.x+=1600;
  level2bkgd1.body.friction = 1;
  hunter.reset(145, 350);
  hunter.swimCount = 0;
  hunter.frame = 4;
  hunter.body.rotation = 0;
  hunter.body.rotation.toFixed();
  hunter.body.velocity.y = 1;
  hunter.body.velocity.x = 1;
  hunter.body.setBodyContactCallback(
    level2bkgd1,
    touchBottom,
    this,
  );
    game.physics.box2d.gravity.y = 0;
  levelWidth = game.width;
  levelHeight = game.height;
}

function updateLevel2() {
  if (level2bkgd1.x > -600) {
  game.world.bringToTop(crocs);
  game.world.bringToTop(bubbles);
  if (
        game.rnd.integerInRange(1, 200) === 1 &&
        crocs.children.length<maxCrocs &&
        level2bkgd1.x > 30
      ) {
       spawnCroc();
      }

if(level2bkgd1.x > 30 && hunter.body.y<game.height/2)
hunter.body.y++;

    if (levelOver && levelOverTimer < 60) {
      {
        hunter.body.rotation = 90;
        hunter.body.rotation.toFixed();
        levelOverTimer++;
      }
    } else if (levelOver) {
      levelOver = false
      showintro = true;
      curLevel++;
      levelOverTimer = 0;
      killObjects2();
      buildLevel();
    }
    if(game.rnd.integerInRange(1, 200) === 1 && level2bkgd1.x > 30) 
      spawnBubbles();
 
    arrows.forEach(arrow => {
      arrow.events.onInputDown.add(arrowClick, this);
    });
  
    moveCrocs();
    drawScore();
    drawLives();
    moveBubbles();
    
    arrows.forEach(arrow => {
      arrow.visible = true;
      arrow.x = arrow.width*.25+40+arrow.xOffset+game.camera.x;
     });
    hunter.swimCount++;
    hunter.body.rotation = 30;
    
    if (hunter.swimCount > 50 && !levelOver) {
      hunter.frame = hunter.frame === 4 ? 5 : 4;
      hunter.swimCount = 0;
      if (Math.floor(hunter.body.y) > game.height / 2) 
        breathe();
      else 
         resetAir();
    }

    level2bkgd3.x -= 0.5;
    level2bkgd1.body.x -= 1;
    level2bkgd2.x -= 1;
    hunter.rotation.toFixed();

    if (hunter.x > game.width * .7 && !levelOver)
      hunter.body.velocity.x = 0;
    if (game.cursors.right.isDown && hunter.x < game.width / 2) {
      hunter.body.velocity.x++;
    } else if (game.cursors.left.isDown && hunter.x > 20) {
      hunter.body.velocity.x -= 1;
    } else if (game.cursors.down.isDown && hunter.y < game.height) {
      hunter.body.velocity.y++;
    } else if (game.cursors.up.isDown && hunter.y > game.height / 2) {
      hunter.body.velocity.y -= 1;
    } else if (game.fireButton.isDown) {
      hunter.frame = 6;
    }
    if (hunter.body.y < game.height / 2 && hunter.body.velocity.y < 0 && !levelOver) {
      hunter.body.velocity.y = 0;
    }
  } else {
    if(!levelOver)
    hunter.body.x+=2;
    game.camera.target = null;
  }

}

function arrowClick(gameObject)
{
     switch (gameObject.name) {
    case 'right':
      hunter.body.velocity.x++;
    break;
    case 'left':
      hunter.body.velocity.x -= 1;
    break;
    case 'up':
      hunter.body.velocity.y -= 1;
    break;
    case 'down':
      hunter.body.velocity.y++;
      break;
    default:
      break;
  } 
  }


function killObjects2() {
  level2bkgd1.destroy();
  level2bkgd2.destroy();
  level2bkgd3.destroy();
  crocs.forEach(croc => {
    croc.destroy();
  }); 
  for (let i = 0; i < MAX_AIR; i++) {
    air[i].destroy();
  }
  airLabel.destroy();
  bubbles.forEach(bubble => {
    bubble.destroy();
  }); 
}

function moveCrocs() {
  crocs.forEach(croc => {
      if (collisionTest(croc, hunter)) {
        if (hunter.frame === 6) {
          drawInfoText(
            '100',
            croc.x,
            croc.y,
            16,
            'rgb(255,255,255)',
            'Impact',
            2000,
          );
          croc.destroy();
          curScore+=100;
          if (level2bkgd1.x > 0)
            spawnCroc();
            return;
        } else {
          currLives -= 1;
          showintro = true;
          buildLevel2();
        }
      }
      if (croc.animations.currentAnim.frame === 3) {
        croc.animations.currentAnim.frame = 0;
      }
      if (croc.animations.currentAnim.frame === 7) {
        croc.animations.currentAnim.frame = 4;
      }
      const x = game.rnd.integerInRange(1, 5);
      if (hunter.y > croc.y && x === 1) {
        croc.y++;
      } else if (hunter.y < croc.y && x === 1) {
        croc.y -= curLevel;
      }
      croc.x -= curLevel;
      if (croc.x < 0) {
        croc.x = game.width;
        const crocSize = game.rnd.integerInRange(50, 300);
        croc.y = game.height - crocSize;
      }
  }); 
}

function moveBubbles() {
bubbles.children.forEach(bubble => {
  bubble.body.velocity.y = -25;
  bubble.body.velocity.x = -55;
  if (bubble.y < game.height / 2) 
    bubble.destroy();
  if (collisionTest(hunter, bubble) && hunter.frame === 6) 
    bubble.destroy();
});

}

function spawnCroc() {
  var croc = game.add.sprite(0, 0, 'croc');
  croc.anchor.setTo(0.5, 0.5);
  croc.burnCount = 0;
  croc.animations.add('bite');
  croc.x = game.width
  croc.y = game.height - game.rnd.integerInRange(50, 250);
  const x = game.rnd.integerInRange(1, 2);
  if (x === 1) {
    croc.frame = 0;
  } else {
    croc.frame = 4;
  }
croc.animations.play('bite', 10, true);
crocs.add(croc);
}

function spawnBubbles() {
  var bubble = game.add.sprite(game.width+game.camera.x, game.height, 'bubbles');
  bubble.animations.add('bubble');
  game.physics.box2d.enable(bubble);

  bubble.animations.play('bubble', 10, true);
  bubbles.add(bubble);
}

function breathe() {
  const i = airLeftBlock;
  air[i].animations.play('breathe', 2, false);
}

function takeBreath() {
  if (airLeftBlock > 0) airLeftBlock -= 1;
  else {
    currLives -= 1;
    showintro = true;
    resetAir();
    buildLevel2();
  }
}

function resetAir() {
  airLeftBlock = MAX_AIR - 1;
  for (let i = 0; i < MAX_AIR; i++) {
    air[i].frame = 0;
  }
}

