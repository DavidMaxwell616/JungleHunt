function createLevel4Stuff() {
  level4bkgd1 = game.add.sprite(0, 0, 'level 4 layer1');
  level4bkgd1.width = game.width;
  level4bkgd1.visible = false;
  level4bkgd1.anchor.set(0, 0);

  cauldron = game.add.sprite(0, 0, 'cauldron');
  cauldron.animations.add('cauldron');
  cauldron.visible = false;

  girl = game.add.sprite(0, 0, 'girl');
  girl.visible = false;

  for (let index = 0; index < maxTribesmen; index++) {
    tribesmen[index] = game.add.sprite(0, 0, 'tribesman');
    tribesmen[index].visible = false;
    tribesmen[index].anchor.setTo(0.5, 0.5);
    tribesmen[index].state = DEAD;
    tribesmen[index].animations.add('dance');
  }
  levelWidth = game.width;
  levelHeight = game.height;
}

function buildLevel4() {
  game.stage.backgroundColor = '#4F8ADA';
  level4bkgd1.reset(game.width / 2, game.height / 2);
  game.physics.box2d.enable(level4bkgd1);
  level4bkgd1.body.static = true;
  level4bkgd1.body.clearFixtures();
  level4bkgd1.body.loadPolygon('physicsData', 'ground', level4bkgd1);
  level4bkgd1.visible = true;
  spawnTribesmen();
  cauldron.reset(680, 540);
  game.physics.box2d.enable(cauldron);
  cauldron.animations.play('cauldron', 8, true);
  cauldron.body.static = true;
  vines[0] = createVines(0, 15, 'vine2', 660, 125);
  girl.reset(500, 250);
  game.physics.box2d.enable(girl);
  j = game.physics.box2d.revoluteJoint(vines[0][14], girl);
  girl.body.rotation = 90;
  girl.bringToTop();
  hunter.reset(50, 550);
  hunter.frame = 11;
  levelOver = false;
  hunter.body.setBodyContactCallback(
    level4bkgd1.body,
    onGroundCallback,
    this,
  );
  hunter.body.setBodyContactCallback(
    girl,
    kiss,
    this,
  );
  levelOverTimer = 0;
  hunter.isJumping = false;
  game.fireButton.isDown = false;
}

function updateLevel4() {
  moveTribesmen();

  if (levelOver) {
    j2 = game.physics.box2d.revoluteJoint(hunter, girl);
    levelOverTimer++;
  }

  drawScore();
  drawLives();
  hunter.body.rotation = 0;
  hunter.rotation.toFixed();

  if (levelOverTimer > 100) {
    drawInfoText('YOU GOT THE GIRL!', 520, 100, 32, 'rgb(255,255,0)', 'Impact', 5000);
    showintro = true;
    curLevel++;
    curScore += 500;
    killObjects4();
    buildLevel();
  }

  if (game.cursors.right.isDown) {
    hunter.body.velocity.x = 100;
  }
  if (game.cursors.left.isDown) {
    hunter.body.velocity.x = -100;
  }
  if (game.fireButton.isDown && !hunter.isJumping) {
    hunter.isJumping = true;
    hunter.body.velocity.y = -350;
  }
  if (hunter.y < game.height / 2 && hunter.body.velocity.y < 0) {
    hunter.body.velocity.y = 0;
  }
  if (game.time.now > runTime && !levelOver) {
    hunter.frame++;
    runTime = game.time.now + 150;
  }
  if (hunter.frame > 12) {
    hunter.frame = 11;
  }

}

function killObjects4() {
  level4bkgd1.destroy();
  cauldron.destroy();
  girl.destroy();
  for (let index = 0; index < MAX_TRIBESMEN; index++) {
    tribesmen[index].destroy();
  }
}

function onGroundCallback() {
  hunter.isJumping = false;
}

function kiss() {
  levelOver = true;
}

function spawnTribesmen() {
  for (let index = 0; index < MAX_TRIBESMEN; index++) {
    tribesmen[index].reset((index + 1) * 200, 520);
    tribesmen[index].animations.play('dance', 10, true);
    tribesmen[index].state = ALIVE;
    game.physics.box2d.enable(tribesmen[index]);
    tribesmen[index].walkingSpeed = -1;
  }
}

function moveTribesmen() {
  for (let index = 0; index < MAX_TRIBESMEN; index++) {
    tribesmen[index].x += tribesmen[index].walkingSpeed;
    if (tribesmen[index].x < 10 || tribesmen[index].x > 450) {
      tribesmen[index].walkingSpeed *= -1;
    }
  }
}