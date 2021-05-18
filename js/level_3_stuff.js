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
}

function onGroundCallback(){
isJumping=false;
}

function onHitRock(){
hitByRock=true;
}

function updateLevel3() {
    if (game.rnd.integerInRange(1, 50000) ==1) 
       spawnRock();

    if (hunter.x < 200 && !hitByRock) {
      hunter.body.x = 200;
    }
    moveRocks();
    drawScore();
    drawLives();  
    hunter.body.rotation = 0;

    if (hunter.x < 20) {
      currLives -= 1;
      showintro = 1;
      buildLevel3();
    }
 
    if(level3bkgd1.x>-1400)
  {
   level3bkgd2.x -= .5;
   level3bkgd3.x -= 1;
   level3bkgd1.body.x -= 1;
   }
   else
   {
        if(!levelOver)
        {hunter.body.velocity.x = JUMP_VELOCITY_X / 2;
        hunter.body.velocity.y = JUMP_VELOCITY_Y;
              }
        levelOver = true;
        if (hunter.x > 435) {
          showintro = true;
          curLevel++;
          killObjects3();
          buildLevel();
        }
   }
    if (game.fireButton.isDown && !hunter.isJumping) {
      hunter.body.velocity.y = -250;
      hunter.isJumping = true;
    }
    if (game.time.now > runTime) {
      hunter.frame++;
      runTime = game.time.now + 150;
    }
    if (hunter.frame > 9) {
      hunter.frame = 7;
    }
 
  }

function killObjects3() {
  for (let index = 0; index < rocks.length; index++) {
    rocks[index].destroy();
  }
  level3bkgd1.destroy();
  bigRock.destroy();
}

function spawnRock() {
  var rock = game.add.sprite(0, 0, 'rock');
  rock.anchor.setTo(0.5, 0.5);
  rock.x = game.width + game.camera.x;
  rock.y =game.height *.3;
  const rand = game.rnd.integerInRange(1, 3);
  rock.scale.setTo(rand, rand);
  game.physics.box2d.enable(rock);
  rock.body.velocity.x = -209;
  rock.body.setCircle(rock.width / 2);
  rock.body.restitution = 0.2;
  rock.radius = rock.width/2;
  rock.body.mass=100;
  hunter.body.setBodyContactCallback(
    rock.body,
    onHitRock,
    this,
  );
  rocks.add(rock);
}

function moveRocks() {
rocks.forEach(rock => {
      rock.rotation -= 60;
      // if (game.rnd.integerInRange(1, 500) === 1) {
      //   rock.body.velocity.y = -200;
      // }
      //rock.body.velocity.x = -209;
      if (rock.x-rock.radius < game.camera.x+rock.radius) {
        curScore+=100;
        rock.destroy();
        //spawnRock();
      }
});
}