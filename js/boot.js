const DEAD = 0;
const ALIVE = 1;
const HEIGHT = 480;
const NUM_VINES = 5;
const NUM_VINE_SEGMENTS = 10;
const COLOR_WHITE = 'rgb(255,255,255)';
const GAME_FONT = 'Impact';
const JUMP_VELOCITY_X = 300;
const JUMP_VELOCITY_Y = -250;
const JUNGLE_WIDTH = 4000;
const JUNGLE_GROUND = HEIGHT-40;
const MAX_AIR = 6;
const HUNTER_MASS = 30;

let maxRocks = 10;
let maxMonkeys = 3;
let maxTribesmen = 2;
let maxCrocs = 3;
let j;
let j2;
let splash1;
let splash2;
let splash3;
let splash4;
let splash5;
let maxxdaddy;
let currLives = 3;
let curLevel = 1;
let curVine = 0;
let curSegment = 0;
let textTimer;
let levelWidth = 0;
let levelHeight = 0;
let curScore = 0;
const vines = [];
let crocs;
let rocks;
let bigRock;
const air = [];
const tribesmen = [];
const monkeys = [];
let falling = false;
let readyToJump = false;
let isJumping = false;
let hunterOnRope = false;
let showintro = 1;
let overWater = false;
let onGround = false;
let gameOver = false;
let vineSegment;
let activeVineSegment;
let amountRocks;
let infoText;

let airLeftBlock = MAX_AIR - 1;
let splashTick = 0;
let splashPhase = 0;
let level1bkgd3;
let tree;
let level1bkgd2;
let level2bkgd2;
let level2bkgd3;
let level2bkgd1;
let level3bkgd1;
let level3bkgd2;
let level3bkgd3;
let level4bkgd1;
let airLabel;
let hunter;
let cauldron;
let girl;
let amountCrocs;
let runTime = 0;
let startGame = false;
let bubbles;
let textTiles;
let lives = [];
let levelOver = false;
let levelOverTimer = 0;
const textFrames = {
  ')': 8,
  '(': 9,
  '=': 10,
  '-': 11,
  '?': 12,
  '!!': 13,
  '!': 14,
  Z: 15,
  Y: 16,
  X: 17,
  W: 18,
  V: 19,
  U: 20,
  T: 21,
  S: 22,
  R: 23,
  Q: 24,
  P: 25,
  O: 26,
  N: 27,
  M: 28,
  L: 29,
  K: 30,
  J: 31,
  I: 32,
  H: 33,
  G: 34,
  F: 35,
  E: 36,
  D: 37,
  C: 38,
  B: 39,
  A: 40,
  9: 41,
  8: 42,
  7: 43,
  6: 44,
  5: 45,
  4: 46,
  3: 47,
  2: 48,
  1: 49,
  0: 50,
};
var mouseDown;
var arrows =new Array(4);
var arrowStats = [
  {
    angle: 0,
  yOffset: 0,
  xOffset: 30,
  direction:'right',
  },
  {
    angle: 90,
  yOffset: 30,
  xOffset: 0,
  direction:'down',
  }  ,
  {
    angle: 180,
  yOffset: 0,
  xOffset: -30,
  direction:'left',
  }  ,
  {
    angle: 270,
  yOffset: -30,
  xOffset: 0,
  direction:'up',
  }  
  ];
  var arrowDown=false;
