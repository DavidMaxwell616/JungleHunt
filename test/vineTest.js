const NUM_VINE_SEGMENTS = 10;

const game = new Phaser.Game(800, 600, Phaser.BOX2D, 'game', {
  preload,
  create,
  update,
  render,
});

function preload() {
  game.load.spritesheet('vine', '../assets/images/vine.png', 8, 26);
  
}

function create() {
  game.physics.startSystem(Phaser.Physics.BOX2D);
  game.physics.box2d.gravity.y = 500;
  game.stage.backgroundColor = '#4F8ADA';
    vine = createVine(
      NUM_VINE_SEGMENTS,
      'vine',
      200,
      200,
    );
  }

function createVine(length, name, xAnchor, yAnchor) {
  let lastRect; // if we created our first rect this will contain it
  const height = 12; // height for the physics body - your image height is 8px
  const vineSegments = [];

  for (let i = 0; i < length; i++) {
    const x = xAnchor;
    const y = yAnchor + i * height;
    vineSegments[i] = game.add.sprite(x, y, name, 0);
    game.physics.box2d.enable(vineSegments[i], false);
    vineSegments[i].segment = i;
 
    if (i === 0) {
      vineSegments[i].body.static = true;
    } else {
      vineSegments[i].body.velocity.x = 250;
      // make bodies toward the end of the chain lighter to improve stability
      //vineSegments[i].body.mass = length * i;
    }

    //  After the first rectangle is created we can add the constraint
    if (lastRect) {
      // bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled,
      // lowerLimit, upperLimit, limitEnabled
      // physics.box2d.revoluteJoint(lastRect, vines[index], 0, 10, 0, -10);
     game.physics.box2d.revoluteJoint(
        lastRect,//bodyA
        vineSegments[i],//bodyB
        0,//ax
        10,//ay
        0,//bx
        -10,//by
        0,//motorSpeed
        0, // motorTorque
        true, //motorEnabled
        0, //lowerLimit
        -20, //upperLimit
        true //limitEnabled
      );
      // 0, 10, 0, -20,true);
    }
    lastRect = vineSegments[i];
  }
  return vineSegments;
}

function update() {
}

function render() {
  game.debug.inputInfo(32, 32);
}