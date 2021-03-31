function createLevel2Stuff() {
  level2bkgd2 = game.add.image(0, 0, 'level 2 layer2');
  level2bkgd2.width = game.width * 3.4;
  level2bkgd2.height = game.height * 0.7;
  level2bkgd2.visible = false;

  level2bkgd3 = game.add.image(0, 0, 'level 2 layer3');
  level2bkgd3.width = game.width * 3.4;
  // level2bkgd3.height = game.height;
  level2bkgd3.visible = false;

  bubbles = game.add.sprite(0, 0, 'bubbles');
  bubbles.animations.add('bubble');
  game.physics.box2d.enable(bubbles);
  bubbles.visible = false;

  level2bkgd1 = game.add.sprite(0, 0, 'level 2 layer1');
  level2bkgd1.width = game.width * 3.4;
  level2bkgd1.visible = false;

  for (let index = 0; index < MAX_AIR; index += 1) {
    air[index] = game.add.sprite(0, 0, 'air');
    air[index].visible = false;
    air[index].anchor.setTo(0.5, 0.5);
    air[index].state = DEAD;
    const breath = air[index].animations.add('breathe');
    breath.onComplete.add(takeBreath, this);
  }

  airLabel = game.add.sprite(0, 0, 'airLabel');
  airLabel.visible = false;

  for (let index = 0; index < MAX_CROCS; index += 1) {
    crocs[index] = game.add.sprite(0, 0, 'croc');
    crocs[index].visible = false;
    crocs[index].anchor.setTo(0.5, 0.5);
    crocs[index].state = DEAD;
    crocs[index].burnCount = 0;
    crocs[index].animations.add('bite');

  }
}

function buildLevel2() {
  for (let i = 0; i < MAX_AIR; i += 1) {
    air[i].reset(game.width * 0.85 + i * 16, 100);
    //console.log(i, air[i]);
  }
  airLabel.reset(game.width * 0.77, 92);
  amountCrocs = 2 + curLevel;
  for (let index = 0; index < amountCrocs; index += 1) {
    crocs[index].reset(0, 0);
  }
  game.stage.backgroundColor = '#B0DAFF';
  level2bkgd1.reset(0, game.height * 0.69);
  level2bkgd3.reset(0, game.height * 0.65);
  level2bkgd2.reset(0, game.height * 0.4);
  game.physics.box2d.enable(level2bkgd1);
  level2bkgd1.body.static = true;
  level2bkgd1.visible = true;
  level2bkgd1.body.clearFixtures();
  level2bkgd1.body.loadPolygon('physicsData', 'riverBed', level2bkgd1);
  level2bkgd1.body.x += 1600;
  level2bkgd1.body.friction = 1;
  hunter.reset(145, 350);
  hunter.swimCount = 0;
  hunter.frame = 4;
  hunter.body.rotation = 30;
  hunter.rotation.toFixed();
  hunter.body.velocity.y = 1;
  hunter.body.velocity.x = 1;
  game.physics.box2d.gravity.y = 0;
  levelWidth = game.width;
  levelHeight = game.height;
}

function updateLevel2() {
  if (level2bkgd1.x > -600) {
    for (let index = 0; index < amountCrocs; index += 1) {
      if (
        game.rnd.integerInRange(1, 200) === 1 &&
        crocs[index].state === DEAD &&
        level2bkgd1.x > 0
      ) {
        spawnCroc(index);
      }
    }
    if (level2bkgd1.x < -534)
      touchGround();

    if (levelOver && levelOverTimer < 60) {
      {
        hunter.rotation = 90;
        levelOverTimer += 1;
      }
    } else if (levelOver) {
      levelOver = false
      showintro = 1;
      curLevel += 1;
      levelOverTimer = 0;
      killObjects2();
      buildLevel();
    }
    //if (hunter.body.x > 300) {
    // if (game.rnd.integerInRange(1, 200) === 1 && 
    if (!bubbles.active)
      spawnBubbles();
    //}

    if (curLevel === 2)
      moveCrocs();
    drawScore();
    drawLives();

    if (bubbles.active)
      moveBubbles();

    hunter.swimCount += 1;
    hunter.body.rotation = 30;
    // console.log(`${hunter.swimCount} ${hunter.frame}`);

    if (hunter.swimCount > 50 && !levelOver) {
      hunter.frame = hunter.frame === 4 ? 5 : 4;
      hunter.swimCount = 0;
      if (hunter.body.y > 320) breathe();
      else {
        resetAir();
      }
    }

    level2bkgd3.x -= 0.5;
    level2bkgd1.body.x -= 1;
    level2bkgd2.x -= 1;
    hunter.rotation.toFixed();

    if (hunter.x > game.width * .7 && !levelOver)
      hunter.body.velocity.x = 0;
    if (game.cursors.right.isDown && hunter.x < game.width / 2) {
      hunter.body.velocity.x += 1;
    } else if (game.cursors.left.isDown && hunter.x > 20) {
      hunter.body.velocity.x -= 1;
    } else if (game.cursors.down.isDown && hunter.y < game.height) {
      hunter.body.velocity.y += 1;
    } else if (game.cursors.up.isDown && hunter.y > game.height / 2) {
      hunter.body.velocity.y -= 1;
    } else if (game.fireButton.isDown) {
      hunter.frame = 6;
    }
    if (hunter.y < game.height / 2 && hunter.body.velocity.y < 0 && !levelOver) {
      hunter.body.velocity.y = 0;
    }
  } else {
    game.camera.target = null;
  }

}

function killObjects2() {
  level2bkgd1.destroy();
  level2bkgd2.destroy();
  level2bkgd3.destroy();
  for (let index = 0; index < amountCrocs; index += 1) {
    crocs[index].destroy();
  }
  for (let i = 0; i < MAX_AIR; i += 1) {
    air[i].destroy();
  }
  airLabel.destroy();
  bubbles.destroy();
}

function moveCrocs() {
  for (let index = 0; index < amountCrocs; index += 1) {
    if (crocs[index].state === ALIVE) {
      if (collisionTest(crocs[index], hunter)) {
        //console.log(crocs[index].x, crocs[index].y, hunter.x, hunter.y);
        if (hunter.frame === 6) {
          crocs[index].visible = false;
          crocs[index].state = DEAD;
          drawInfoText(
            '100',
            crocs[index].x,
            crocs[index].y,
            16,
            'rgb(255,255,255)',
            'Impact',
            2000,
          );
          curScore += 100;
          if (level2bkgd1.x > 0)
            spawnCroc(index);
        } else {
          currLives -= 1;
          showintro = 1;
          buildLevel2();
        }
      }
      if (crocs[index].animations.currentAnim.frame === 3) {
        crocs[index].animations.currentAnim.frame = 0;
      }
      if (crocs[index].animations.currentAnim.frame === 7) {
        crocs[index].animations.currentAnim.frame = 4;
      }
      const x = game.rnd.integerInRange(1, 5);
      if (hunter.y > crocs[index].y && x === 1) {
        crocs[index].y += 1;
      } else if (hunter.y < crocs[index].y && x === 1) {
        crocs[index].y -= 1;
      }
      crocs[index].x -= 1;
      if (crocs[index].x < 0) {
        crocs[index].x = game.width;
        const crocSize = game.rnd.integerInRange(50, 300);
        crocs[index].y = game.height - crocSize;
      }
    }
  }
}

function moveBubbles() {
  bubbles.body.velocity.y = -25;
  bubbles.body.velocity.x = -25;
  if (bubbles.y < game.height / 2) {
    bubbles.active = false;
    bubbles.visible = false;
  }
  if (collisionTest(hunter, bubbles) && hunter.frame === 6) {
    bubbles.active = false;
    bubbles.visible = false;
  }

}

function spawnCroc(index) {
  crocs[index].reset(
    game.width,
    game.height - game.rnd.integerInRange(50, 300),
  );
  const x = game.rnd.integerInRange(1, 2);
  if (x === 1) {
    crocs[index].frame = 0;
  } else {
    crocs[index].frame = 4;
  }

  crocs[index].animations.play('bite', 10, true);
  crocs[index].state = ALIVE;
}

function spawnBubbles() {
  bubbles.reset(
    game.width - game.rnd.integerInRange(50, 300),
    game.height - 100,
  );
  bubbles.animations.play('bubble', 10, true);
  bubbles.active = true;
}

function breathe() {
  const i = airLeftBlock;
  air[i].animations.play('breathe', 2, false);
}

function takeBreath() {
  if (airLeftBlock > 0) airLeftBlock -= 1;
  else {
    currLives -= 1;
    showintro = 1;
    resetAir();
    buildLevel2();
  }
}

function resetAir() {
  airLeftBlock = MAX_AIR - 1;
  for (let i = 0; i < MAX_AIR; i += 1) {
    air[i].frame = 0;
  }
}

function touchGround() {
  if (levelOver)
    return;
  hunter.frame = 0;
  //  hunter.rotation = 170;
  hunter.body.velocity.x = JUMP_VELOCITY_X / 2;
  hunter.body.velocity.y = JUMP_VELOCITY_Y * 1.5;
  game.physics.box2d.gravity.y = 500;
  levelOver = true;
}