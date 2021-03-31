function createLevel3Stuff() {
  level3bkgd1 = game.add.sprite(0, 0, 'level 3 layer1');
  level3bkgd1.width = game.width * 3.4;
  level3bkgd1.visible = false;
  // level2bkgd3.height = game.height;

  level3bkgd2 = game.add.image(0, 0, 'level 3 layer2');
  level3bkgd2.width = game.width * 3;
  // level2bkgd1.height = game.height;
  level3bkgd2.visible = false;

  level3bkgd3 = game.add.image(0, 0, 'level 3 layer3');
  level3bkgd3.width = game.width * 3;
  // level2bkgd1.height = game.height;
  level3bkgd3.visible = false;

  for (let index = 0; index < MAX_ROCKS; index += 1) {
    rocks[index] = game.add.sprite(0, 0, 'rock');
    rocks[index].visible = false;
    rocks[index].anchor.setTo(0.5, 0.5);
    rocks[index].state = DEAD;
  }
  bigRock = game.add.sprite(0, 0, 'rock');
  bigRock.visible = false;
  bigRock.anchor.setTo(0.5, 0.5);
  bigRock.state = DEAD;
}

function buildLevel3() {
  amountRocks = curLevel;
  game.stage.backgroundColor = '#008ADA';

  level3bkgd1.reset(0, game.height * 0.95);
  level3bkgd2.reset(0, 0);
  level3bkgd3.reset(0, 0);
  hunter.reset(145, 500);
  hunter.frame = 7;
  game.physics.box2d.enable(level3bkgd1);
  level3bkgd1.body.static = true;
  level3bkgd1.body.clearFixtures();
  level3bkgd1.body.loadPolygon('physicsData', 'hill', level3bkgd1);
  hunter.body.setBodyContactCallback(
    level3bkgd1.body,
    onGroundCallback,
    this,
  );

  for (let index = 0; index < amountRocks; index += 1) {
    rocks[index].reset(0, 0);
  }

  bigRock.reset(1500, 200);
  bigRock.scale.setTo(7, 7);
  game.physics.box2d.enable(bigRock);

  levelWidth = game.width * 2;
  levelHeight = game.height;
}

function updateLevel3() {
  if (hunter.x < 1190) {
    for (let index = 0; index < amountRocks; index += 1) {
      if (
        game.rnd.integerInRange(1, 200) === 1 &&
        rocks[index].state === DEAD
      ) {
        spawnRock(index);
      }
    }

    if (hunter.x < 20) {
      currLives -= 1;
      showintro = 1;
      buildLevel3();
    }

    moveRocks();
    drawScore();
    drawLives();
    hunter.body.rotation = 0;
    level3bkgd2.x = game.camera.x * 0.05;
    game.camera.follow(hunter);

    hunter.rotation.toFixed();
    if (game.cursors.right.isDown) {
      hunter.body.velocity.x += 3;
      hunter.body.velocity.y -= 3;
    }
    if (game.fireButton.isDown && !hunter.isJumping) {
      hunter.body.velocity.y = -250;
      hunter.isJumping = true;
    }
    if (hunter.y < game.height / 2 && hunter.body.velocity.y < 0) {
      hunter.body.velocity.y = 0;
    }
    if (game.time.now > runTime) {
      hunter.frame += 1;
      runTime = game.time.now + 150;
    }
    if (hunter.frame > 9) {
      hunter.frame = 7;
    }
  } else {
    if (!hunter.isJumping) {
      hunter.body.velocity.y = -500;
      if (hunter.body.velocity.x < 50)
        hunter.body.velocity.x = 50;
    }
    hunter.isJumping = true;
    game.camera.target = null;
    if (hunter.x > 1600) {
      showintro = 1;
      curLevel += 1;
      killObjects3();
      buildLevel();
    }
  }

}

function killObjects3() {
  for (let index = 0; index < amountRocks; index += 1) {
    rocks[index].destroy();
  }
  level3bkgd1.destroy();
  bigRock.destroy();
}

function spawnRock(index) {
  rocks[index].reset(game.width + game.camera.x, game.height / 2);
  rocks[index].state = ALIVE;
  const rand = game.rnd.realInRange(1, 3);
  rocks[index].scale.setTo(rand, rand);
  game.physics.box2d.enable(rocks[index]);
  rocks[index].body.velocity.x = -20;
  rocks[index].body.restitution = 0.7;
}

function moveRocks() {
  for (let index = 0; index < amountRocks; index += 1) {
    if (rocks[index].state === ALIVE) {
      // if (collisionTest(rocks[index], hunter)) {
      //        currLives -= 1;
      //        hunter.state = DEAD;
      //        hunter.visible = false;
      // }
      rocks[index].rotation -= 60;
      if (game.rnd.integerInRange(1, 200) === 1) {
        rocks[index].body.velocity.y = -200;
      }
      // console.log(`${index} - ${rocks[index].body.mass} - ${rocks[index].width}`);
      if (rocks[index].x < game.camera.x) {
        curScore += 100;
        spawnRock(index);
      }
    }
  }
}