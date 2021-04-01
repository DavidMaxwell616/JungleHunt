var loadText;
var progress=0;
function preload() {
   game.load.crossOrigin = 'anonymous';
  // game.scale.pageAlignHorizontally = true;
  // game.scale.pageAlignVertically = true;
  game.scale.refresh();
  
  game.load.onLoadStart.add(loadStart, this);
  game.load.onLoadComplete.add(loadComplete, this);
  game.load.onFileComplete.add(fileComplete, this);
   loadText = game.add.text(32, 32, '', {
    fill: '#ffffff',
  });
 this.load.image('arrow', 'assets/images/arrow.png');
 
  game.load.image('splash1', 'assets/images/splash.part.1.png');
  game.load.image('splash2', 'assets/images/splash.part.2.png');
  game.load.image('splash3', 'assets/images/splash.part.3.png');
  game.load.image('splash4', 'assets/images/splash.part.4.png');
  game.load.image('splash5', 'assets/images/splash.part.5.png');
  // game.load.spritesheet('text', 'assets/images/text.png',38, 44);
  game.load.image('tree', 'assets/images/tree.png');
  game.load.image(
    'level 1 layer2',
    'assets/images/Level1.Main.Background.2.png',
  );
  game.load.image(
    'level 1 layer3',
    'assets/images/Level1.Main.Background.3.png',
  );
  game.load.image(
    'level 2 layer1',
    'assets/images/Level2.Main.Background.1.png',
  );
  game.load.image(
    'level 2 layer2',
    'assets/images/Level2.Main.Background.2.png',
  );
  game.load.image(
    'level 2 layer3',
    'assets/images/Level2.Main.Background.3.png',
  );
  game.load.image(
    'level 3 layer1',
    'assets/images/Level3.Main.Background.1.png',
  );
  game.load.image(
    'level 3 layer2',
    'assets/images/Level3.Main.Background.2.png',
  );
  game.load.image(
    'level 3 layer3',
    'assets/images/Level3.Main.Background.3.png',
  );
  game.load.image(
    'level 4 layer1',
    'assets/images/Level4.Main.Background.1.png',
  );
  game.load.image('rock', 'assets/images/rock.png');
  game.load.spritesheet('hunter', 'assets/images/hunter.png', 34, 68);
  game.load.spritesheet('vine', 'assets/images/vine.png', 8, 26);
  game.load.spritesheet('vine2', 'assets/images/vine2.png', 8, 26);
  game.load.spritesheet('text', 'assets/images/text.png', 45, 45);
  game.load.spritesheet('croc', 'assets/images/crocs.png', 70, 40);
  game.load.image('maxxdaddy', 'assets/images/maxxdaddy.gif');
  game.load.spritesheet('tribesman', 'assets/images/tribesman.png', 40, 90);
  game.load.spritesheet('cauldron', 'assets/images/cauldron.png', 71, 70);
  game.load.spritesheet('girl', 'assets/images/girl.png');
  game.load.image('crocKill', 'assets/images/crocKill.png');
  game.load.image('airLabel', 'assets/images/airLabel.png');
  game.load.spritesheet('air', 'assets/images/airCount.png', 16, 16);
  game.load.spritesheet('bubbles', 'assets/images/bubbles.png', 37, 33);
  game.load.spritesheet('monkey', 'assets/images/monkeys.png', 51, 100);
  game.load.physics('physicsData', 'assets/physics/sprites.json');
}

function loadStart() {
  loadText.setText('Loading ...');
}
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
  loadText.setText('Loading ...'+ progress + "%");
}

function loadComplete() {
  loadText.setText('Load Complete');
  loadText.destroy();
}
