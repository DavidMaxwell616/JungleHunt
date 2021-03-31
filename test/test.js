const MAX_AIR = 6;
let airLeftBlock = MAX_AIR - 1;
const air = [];
let hunter_body_y = 319;

const game = new Phaser.Game(1000, 640, Phaser.BOX2D, 'game', {
  preload,
  create,
  update,
});

function preload() {
  game.load.spritesheet('air', '../assets/images/airCount.png', 16, 16);

}

function create() {
  for (let index = 0; index < MAX_AIR; index += 1) {
    air[index] = game.add.sprite(0, 0, 'air');
    air[index].visible = false;
    air[index].anchor.setTo(0.5, 0.5);
    const breath = air[index].animations.add('breathe');
    breath.onComplete.add(takeBreath, this);
  }
  for (let i = 0; i < MAX_AIR; i += 1) {
    air[i].reset(game.width * 0.85 + i * 16, 100);
  }
}

function breathe() {
  const i = airLeftBlock;
  air[i].animations.play('breathe', 2, false);
}

function resetAir() {
  airLeftBlock = MAX_AIR - 1;
  for (let i = 0; i < MAX_AIR; i += 1) {
    //console.log(air[i].animations.currentFrame);
    air[i].frame = 0;
  }
}

function takeBreath() {
  if (airLeftBlock > 0) airLeftBlock -= 1;
  else {
    console.log('you drowned!');
    resetAir()
  }
}

function update() {
  breathe();
  // if (hunter_body_y > 320) breathe();
  // else {
  //   air[airLeftBlock] = MAX_AIR - 1;
  //   for (let i = 0; i < MAX_AIR; i += 1) {
  //     air[i].animations.currentAnim.stop();
  //     air[i].animations.currentFrame = 0;
  //   }
  // }
}