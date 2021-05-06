var monkey, monkeyRunning, bananaimage, stoneimage, ground, jungle, score, gamestate, obstacleFrameCount, bananaFrameCount, stones, bananas;

function preload() {
  monkeyRunning =     loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimage = loadImage("banana.png");
  stoneimage = loadImage("stone.png");
  jungleimage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(650, 350);
  jungle = createSprite(1, 170, 1300, 350);
  jungle.addImage("jungle", jungleimage);
  jungle.scale = 0.999;
  jungle.x = jungle.width /2;
  jungle.velocityX = -3;
  
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkeyRunning);
  monkey.scale = 0.15;
  monkey.setCollider("circle", 0, 0, 200);

  ground = createSprite(200,325,400,10);
  ground.visible = false;
  
  stones = new Group();
  bananas = new Group();
  
  obstacleFrameCount = 0;
  bananaFrameCount = 0;
  gamestate = "play";
  score = 0;
  
  textSize (20);
  fill ("black");
}

function draw() {
  background("white");   
  

    if (gamestate === "play") {
      switch(score){
        case 5: monkey.scale=0.2;
          break;
        case 10: monkey.scale=0.25;
          break;
        case 15: monkey.scale=0.3;
          break;
        case 20: monkey.scale=0.35;
          break;
        default:break; 
      }
        if (jungle.x < 0){
          jungle.x = jungle.width/2;
        }
      if (((keyDown("space") || keyDown("up")) || keyDown("w")) && monkey.y>285) {
        monkey.velocityY = -15;
      }
      monkey.velocityY = monkey.velocityY + 0.75;
      monkey.collide(ground);
    }
    if (stones.isTouching(monkey)) {
      if (gamestate === "play") {
        monkey.scale= 0.15;
      }
    }
    if (bananas.isTouching(monkey)) {
      score = score + 1;
      bananas.destroyEach();
    }
    stones.setVelocityXEach(-5);
    bananas.setVelocityXEach(-5);
    if (gamestate === "play") {
      obs();
      fruits();
    }
  drawSprites();
  text("Bananas: " + score, 10, 40);
}
function obs() {
  if (World.frameCount % Math.round(random (90, 95)) === 0) {
    if (World.frameCount - obstacleFrameCount >300) {
      obstacleFrameCount = World.frameCount;
      var stone = createSprite(660, 10);
      stone.addImage("stone", stoneimage);
      stone.y = 320;
      stone.scale = 0.15;
      stone.lifetime = 150;
      stone.setCollider("circle", 0, 0, 150);
      stones.add(stone);
      }
     }
}
function fruits() {
  if (World.frameCount % Math.round(random (90, 95)) === 0) {
    if (World.frameCount - bananaFrameCount >80) {
      bananaFrameCount = World.frameCount;
      var banana = createSprite(660, 10);
      banana.y = random(290, 200);
      banana.addImage("banana", bananaimage);
      banana.scale = 0.05;
      banana.lifetime = 150;
      banana.setCollider("circle", 0, 0, 500);
      bananas.add(banana);
      }
     }
}