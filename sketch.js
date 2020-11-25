 var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var monkey, monkey_running
var banana, bananaImage, obstacle2,obstacle1, obstacleImage
var FoodGroup, obstacleGroup
var score =0
var survivaltime = 0
var ground,invisibleground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
 
monkey.setCollider("Rectangle",0,0,monkey.width ,monkey.height);
monkey.debug = true;


  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2
  
  obstacleGroup = new Group();
  bananaGroup   = new Group();

}


function draw() {

  createCanvas(800, 400)
  background("180")
  stroke("white");
  textSize(20);
  fill("white")
  text("score:" + score, 500, 50);


  stroke("black");
  textSize(20);
  fill("black");
  //survivaltime = Math.ciel(frameCount/framerate())
  text("survivaltime:" + survivaltime, 100, 50);


  
  if(gameState === PLAY){
 text("score:" + score, 500, 50);
  score = score + Math.round(getFrameRate()/60);

    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
   
  
     if (ground.x < 400){
      ground.x = ground.width/2;
    }
  
   if (monkey.isTouching(bananaGroup)){
      survivaltime = survivaltime+1;
      bananaGroup.destroyEach();
     
   }
    
     if (monkey.isTouching(obstacleGroup)){
     
      gameState = END;}
      obstacles();
      banana()
}
  
if(gameState === END){
  
  ground.velocityX = 0;
  obstacleGroup.setVelocityEach = 0;
  bananaGroup.setVelocityEach = 0;
  obstacleGroup.setLifetime = -1;
  bananaGroup.setLifetime = -1;
  
  
fill("red");
stroke("black");
textSize(30);
text(("GAMEOVER!!"),200,200);
fill("black");
textSize(20);
text("Press r to play Again!!!!!",200,300); 
  
  
if(keyDown ("r")){
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
  survivaltime = 0;
  gameState = PLAY;
}
}
 
monkey.collide(ground);

  drawSprites();
}


function obstacles() {
  if (frameCount % 90 === 0) {
    var obstacle = createSprite(650, 315, 20, 20)
    obstacle.velocityX = -6
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.1
    obstacleGroup.add(obstacle);
   }
}


function banana(){
  if (frameCount %50 === 0) {
    var banana = createSprite(700,250,20,20)
    banana.velocityX = -6
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }
  
  
}


