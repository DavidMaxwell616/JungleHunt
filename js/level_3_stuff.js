function createLevel3Stuff() {
  level3bkgd1 = game.add.sprite(0, 0, 'level 3 layer1');
  level3bkgd1.width = game.width * 5.5;
  level3bkgd1.visible = false;
  level3bkgd1.anchor.setTo(0, 0);

  level3bkgd2 = game.add.image(0, 0, 'level 3 layer2');
  level3bkgd2.width = game.width * 4;
  level3bkgd2.visible = false;

  level3bkgd3 = game.add.image(0, 0, 'level 3 layer3');
  level3bkgd3.width = game.width *4;
  level3bkgd3.visible = false;

  bigRock = game.add.sprite(0, 0, 'rock');
  bigRock.visible = false;
  bigRock.anchor.setTo(0.5, 0.5);
}

function buildLevel3() {
  amountRocks = curLevel;
  game.stage.backgroundColor = '#008ADA';
  level3bkgd2.reset(0, 0);
  level3bkgd3.reset(0, 0);
  hitByRock = false;
  hunter.isJumping=true;
  level3bkgd1.reset(0, game.height-20);
  game.physics.box2d.enable(level3bkgd1);
  level3bkgd1.body.clearFixtures();
  level3bkgd1.body.loadPolygon('physicsData', 'hill', level3bkgd1);
   hunter.body.setBodyContactCallback(
    level3bkgd1.body,
    onGroundCallback,
    this,
  );
  level3bkgd1.body.friction = 1;
  level3bkgd1.body.static = true;
  game.physics.box2d.gravity.y = 500;
  hunter.reset(145,380);
  hunter.frame = 7;
  hunter.body.friction = 0.5;
  hunter.rotation.toFixed();
  // levelWidth = 100;
  // levelHeight = game.height;
}

function updateLevel3() {
  if (hunter.x < 1190) {
    // if (game.rnd.integerInRange(1, 2000) === 1) 
       // spawnRock();
  //}
    if (hunter.x < 200 && !hitByRock) {
      hunter.body.x = 200;
    }
    moveRocks();
    drawScore();
    drawLives();  
    hunter.body.rotation = 0;
  if(level3bkgd1.x>-1200)
  {
   level3bkgd2.x -= .5;
   level3bkgd3.x -= 1;
   level3bkgd1.body.x -= 1;
   }
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
      hunter.frame++;
      runTime = game.time.now + 150;
    }
    if (hunter.frame > 9) {
      hunter.frame = 7;
    }
 
    // if (!hunter.isJumping) {
    //   hunter.body.velocity.y = -500;
    //   if (hunter.body.velocity.x < 50)
    //     hunter.body.velocity.x = 50;
    // }
  //  hunter.isJumping = true;
  // game.camera.target = null;
  }
    if (hunter.x > 1600) {
      showintro = true;
      curLevel++;
      killObjects3();
      buildLevel();
    }
  }

function killObjects3() {
  for (let index = 0; index < amountRocks; index++) {
    rocks[index].destroy();
  }
  level3bkgd1.destroy();
  bigRock.destroy();
}

function spawnRock() {
  var rock = game.add.sprite(0, 0, 'rock');
  rock.anchor.setTo(0.5, 0.5);
  rock.x = game.width + game.camera.x;
  rock.y =game.height / 2;
  const rand = game.rnd.realInRange(1, 3);
  rock.scale.setTo(rand, rand);
  game.physics.box2d.enable(rock);
  rock.body.velocity.x = -20;
  rock.body.restitution = 0.7;
  rocks.add(rock);
}

function moveRocks() {
rocks.forEach(rock => {
      rock.rotation -= 60;
      if (game.rnd.integerInRange(1, 500) === 1) {
        rock.body.velocity.y = -200;
      }
      const rockRadius = rock.width/2;
      if (rock.x-rockRadius < game.camera.x+rockRadius) {
        curScore+=100;
        rock.destroy();
      //  spawnRock();
      }
});
}