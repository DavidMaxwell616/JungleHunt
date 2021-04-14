function createLevel3Stuff() {
  level3bkgd1 = game.add.sprite(0, 0, 'level 3 layer1');
  level3bkgd1.width = game.width * 3.5;
  level3bkgd1.visible = false;
  
  level3bkgd2 = game.add.image(0, 0, 'level 3 layer2');
  level3bkgd2.width = game.width * 3;
  level3bkgd2.visible = false;

  level3bkgd3 = game.add.image(0, 0, 'level 3 layer3');
  level3bkgd3.width = game.width * 3;
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
  //level3bkgd1.anchor.y=1;
 
  level3bkgd1.reset(0, game.height+level3bkgd1.height/2-20);
  game.physics.box2d.enable(level3bkgd1);
  level3bkgd1.body.rotation = 25;
  level3bkgd1.body.static = true;
  //level3bkgd1.body.clearFixtures();
  //level3bkgd1.body.loadPolygon('physicsData', 'hill', level3bkgd1);
  // // hunter.body.setBodyContactCallback(
  //   level3bkgd1.body,
  //   onGroundCallback,
  //   this,
  // );

  hunter.reset(145, 400);
  hunter.frame = 7;
  hunter.body.friction = 0;
    levelWidth = game.width * 2;
  levelHeight = game.height;
}

function updateLevel3() {
  if (hunter.x < 1190) {
     if (game.rnd.integerInRange(1, 2000) === 1) 
        spawnRock();
  }
    if (hunter.x < 20) {
      hunter.body.x = 20;
    }
    
    moveRocks();
    drawScore();
    drawLives();  
    hunter.body.rotation = 0;
    game.camera.follow(hunter);
   level3bkgd2.x = game.camera.x * 0.05;
 
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

function killObjects3() {
  for (let index = 0; index < amountRocks; index += 1) {
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
        curScore += 100;
        rock.destroy();
      //  spawnRock();
      }
});
}