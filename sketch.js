var tower, towerImg;
var ghost, ghostImg;
var climber, climberImg, climbersGrp;
var invBlock, invBlockGrp;
var PLAY=1;
var END = 0;
var gameState = PLAY;
var spookySound;
var door, doorImg, doorGrp;

function preload(){
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
  
  
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
tower = createSprite(300,300);
  tower.velocityY=1;
  tower.addImage(towerImg);
  
 ghost = createSprite(300,400,20,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
    doorGrp = new Group();
   invBlockGrp = new Group();
   climbersGrp = new Group();

}

function draw(){

  background(0);
  

  
  if(gameState===PLAY){
    
      if(tower.y > 500){
    tower.y = 300;
  }
    
    if(keyDown("space")){
      
      ghost.velocityY = -10;
          }
    ghost.velocityY = ghost.velocityY+0.8;
    
    if(keyDown("left_arrow")){
      
      ghost.x = ghost.x-10;
    }
    
       if(keyDown("right_arrow")){
      
      ghost.x = ghost.x+10;
    }
      spawnDoors();
    if(ghost.isTouching(climbersGrp)){
      ghost.velocityY = 0;
    }
      if(ghost.isTouching(invBlockGrp)||ghost.y>600){
      ghost.destroy();
        gameState= END;
    }
    drawSprites();
  }

  if(gameState===END){
   fill("yellow");
    textSize(30);
    text("GAME OVER",300,300);
    
    
  }



}

function spawnDoors(){
  if(frameCount%240===0){
    
   var door = createSprite(200,-50);
    var invBlock = createSprite(200,15)
    invBlock.visible = true
    invBlock.height = 2;
    var climber = createSprite(200,10);
    door.addImage(doorImg);
    climber.addImage(climberImg)
  invBlock.width = climber.width;
door.x=  Math.round(random(120,400));
    climber.x=  door.x;
     invBlock.x=  climber.x;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invBlock.velocityY = 1;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    
     door.lifetime = 800;
    climber.lifetime = 800;
    invBlock.lifetime = 800;
    
      doorGrp.add(door);
    invBlockGrp.add(invBlock);
    climbersGrp.add(climber);
    
  }
  
}