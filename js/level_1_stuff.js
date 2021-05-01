function createLevel1Stuff() {
  level1bkgd3 = game.add.image(0, 0, 'level 1 layer3');
  level1bkgd3.width = game.width * 3;
  level1bkgd3.height = game.height;
  level1bkgd3.visible = false;

  tree = game.add.sprite(0, 0, 'tree');
  tree.anchor.set(0.5, 0.5);
  tree.height = game.height;
  tree.visible = false;

  level1bkgd2 = game.add.image(0, 0, 'level 1 layer2');
  level1bkgd2.width = game.width * 3;
  level1bkgd2.height = game.height;
  level1bkgd2.visible = false;
if(curLevel>1)
{  for (let index = 0; index < MAX_MONKEYS; index++) {
    monkeys[index] = game.add.sprite(0, 0, 'monkey');
    game.physics.box2d.enable(monkeys[index]);
    monkeys[index].visible = false;
    monkeys[index].anchor.setTo(.5, .5);
    monkeys[index].state = DEAD;
  }
  }
}

function buildLevel1() {
  game.stage.backgroundColor = '#4F8ADA';
  game.physics.box2d.enable(tree);
  tree.body.static = true;
  tree.visible = false;
  curVine = 0;
  tree.body.clearFixtures();
  tree.body.loadPolygon('physicsData', 'tree', tree);
  hunter.reset(160, 250);
  hunter.anchor.set(0.5, 0.5);
  hunter.body.velocity.x = 0;
  hunter.body.velocity.y = 0;
  hunter.body.mass = 20;
  hunter.frame = 0;
  hunter.swimCount = 0;
  falling = false;
  readyToJump = false;
  isJumping = false;
  hunterOnRope = false;
  showintro = 1;
  overWater = false;
  onGround = false;
  tree.reset(80, 310);
  level1bkgd3.reset(0, 0);
  level1bkgd2.reset(0, 0);
  killVines();
  for (let i = 0; i < NUM_VINES; i ++) {
    vines[i] = createVines(
      i,
      NUM_VINE_SEGMENTS,
      'vine',
      (i + 1) * 500,
      100,
    );
  }
  spawnMonkeys();
  levelWidth = game.width * 3;
  levelHeight = game.height;
  lives.forEach(element => {
    element.visible = true;
  });
}

function spawnMonkeys() {
  if (curLevel > 1) {
    monkeys[0].reset(0, 0);
    monkeys[0].frame = 0;
    j2 = game.physics.box2d.revoluteJoint(monkeys[0], vines[0][9]);
  }
}


function updateLevel1() {
  // console.log(hunter.x);
  hunter.body.rotation = 0;
  if (hunter.x > JUNGLE_WIDTH) {
    overWater = true;
  }
  if (hunter.y > JUNGLE_GROUND) {
    onGround = true;
  }

  if (overWater && hunter.y < 500) {
    // hunter.frame = 3;
    hunter.body.rotation+=15;
  }
  if (onGround) {
    showintro = 1;
    if (overWater) {
      curLevel++;
      killObjects1();
    } else currLives -= 1;
    overWater = false;
    onGround = false;
    buildLevel();
  }
  drawScore();
  drawLives();
  arrows.forEach(arrow => {
    arrow.visible = true;
    arrow.x = arrow.width*.25+40+arrow.xOffset+game.camera.x;
   });
   // physics.arcade.collide(hunter, level1bkgd1);
  if (game.cursors.right.isDown && !readyToJump && !falling && !isJumping) {
    hunter.frame = 2;
    readyToJump = true;
    hunterOnRope = false;
  }
  if (game.cursors.right.isDown && hunterOnRope) {
    if (hunter.body.velocity.x > 0) {
      hunter.body.velocity.x+=10;
    }
  }
  if (game.cursors.left.isDown && hunterOnRope) {
    if (hunter.body.velocity.x < 0) {
      hunter.body.velocity.x -= 10;
    }
  }

  arrows.forEach(arrow => {
    arrow.events.onInputDown.add(arrowClick, this);
  });

  hunter.rotation.toFixed();
  level1bkgd3.x = game.camera.x * 0.05;
  if (game.fireButton.isDown ||(mouseDown && !arrowDown)) {
    hunterOnRope = false;
    if (j) {
      game.physics.box2d.world.DestroyJoint(j); // destroy the above joint
      j = null;
    }
    if (readyToJump) {
      const jumpSpeed = hunterOnRope ?
        JUMP_VELOCITY_X :
        JUMP_VELOCITY_X + 70;
      hunter.body.velocity.x = jumpSpeed;
      hunter.body.velocity.y = JUMP_VELOCITY_Y;
      curVine++;
      isJumping = true;
      readyToJump = false;
    }
  }

  if (hunterOnRope && isJumping) {
    isJumping = false;
    falling = false;
    hunter.anchor.set(0.5, 0);
    // bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled,
    // lowerLimit, upperLimit, limitEnabled
    // console.log(vineSegment.sprite.name+' '+curVine+1);
    if (vineSegment.sprite.name < curVine + 1) {
      j = game.physics.box2d.revoluteJoint(hunter, vineSegment);
    }
    curScore+=100;
    // console.log(vineSegment.sprite.name);
    // hunter.body.x = vines[0,vineSegment].body.x;
    // hunter.body.velocity.y = vines[0,vineSegment].body.y;
  }

}
function arrowClick(gameObject)
{
  switch (gameObject.name) {
    case 'right':
      if (!readyToJump && !falling && !isJumping) {
        hunter.frame = 2;
        readyToJump = true;
        hunterOnRope = false;
      }
      if (hunterOnRope) {
        if (hunter.body.velocity.x > 0) {
          hunter.body.velocity.x+=10;
        }
      }
    break;
    case 'left':
      if (hunterOnRope) {
        if (hunter.body.velocity.x < 0) {
          hunter.body.velocity.x -= 10;
        }
      }
    break;
    case 'up':
    break;
    case 'down':
      break;
    default:
      break;
  } 
  }


function killObjects1() {
  tree.destroy();
  if (tree.body != null) {
    tree.body.destroy();
  }
  level1bkgd3.destroy();
  level1bkgd2.destroy();
  killVines();
}

function onGroundCallback() {
  hunter.isJumping = false;
}

function createVines(vineNum, length, name, xAnchor, yAnchor) {
  let lastRect; // if we created our first rect this will contain it
  const height = 12; // height for the physics body - your image height is 8px
  // const maxForce = 50000; // the force that holds the rectangles together
  const vineSegments = [];

  for (let i = 0; i < length; i++) {
    const x = xAnchor;
    const y = yAnchor + i * height;
    vineSegments[i] = game.add.sprite(x, y, name, 0);
    game.physics.box2d.enable(vineSegments[i], false);
    hunter.body.setBodyContactCallback(
      vineSegments[i].body,
      vineCallback,
      this,
    );

    if (i === 0) {
      vineSegments[i].body.static = true;
    } else {
      vineSegments[i].body.velocity.x = 250;
      // make bodies toward the end of the chain lighter to improve stability
      vineSegments[i].body.mass = length / i;
    }

    //  After the first rectangle is created we can add the constraint
    if (lastRect) {
      // bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled,
      // lowerLimit, upperLimit, limitEnabled
      // physics.box2d.revoluteJoint(lastRect, vines[index], 0, 10, 0, -10);
      game.physics.box2d.revoluteJoint(
        lastRect,
        vineSegments[i],
        0,
        10,
        0,
        -10,
      );
      // 0, 10, 0, -20,true);
    }
    vineSegments[i].name = vineNum;
    lastRect = vineSegments[i];
  }
  return vineSegments;
}

function killVines() {
  for (let i = 0; i < NUM_VINES; i++) {
    const arr = vines[i];
    if (arr != null) {
      for (let index = 0; index < arr.length; index++) {
        arr[index].destroy();
      }
    }
  }
}

// This function will be triggered when the ship begins or ends touching the enemy.
// This callback is also called for EndContact events.
function vineCallback(body1, body2, fixture1, fixture2, begin) {
  if (!begin || hunter.body.rotation!=0) {
    return;
  }
  vineSegment = body2;
  hunter.frame = 1;
   hunterOnRope = true;
}