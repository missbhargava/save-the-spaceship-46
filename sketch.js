// variables
var bgImg;
var bgImg1;
var spaceshipImg;
var ship1
var obstacleImg;
var obstacle;

var END =0;
var PLAY =1;
var gameState = PLAY;
shipHealth=3;
var attImg;
var attack;
var score=0;



function preload(){
  bgImg=loadImage("bg.png")
  bgImg1=loadImage("g.png")
  spaceshipImg=loadImage("ship2.png")
  obstacleImg=loadImage("obs.png")
  attImg=loadImage("att.png");

}
function setup() {
  createCanvas(800,400);

  ship1=createSprite(400,320,20,20);
  ship1.addImage(spaceshipImg);
  ship1.scale=0.6;

 // backgr=createSprite(0,0,800,400);
 // backgr.addImage(bgImg);
 // backgr.scale=1.5;
 // backgr.x=backgr.width/2;
 // backgr.velocityY=5;


  obstaclesGroup=createGroup();
  attackGroup=createGroup();


}

function draw() {
  background(bgImg);  

   

 

 // ship1.depth=backgr.depth+1;

  if(gameState===PLAY){
    spawnObstacles();
    spawnFire();
    fill("black");
    textSize(25);
    text("Ships Health="+shipHealth,40,50);
    text("Score "+score,670,50);
    text(mouseX + "," + mouseY,mouseX,mouseY);
    textSize(20);
    text("Press A to attack",320,40);
    if (keyDown(RIGHT_ARROW)){
      ship1.x+=5
      
    }
    if (keyDown(LEFT_ARROW)){
      ship1.x-=5;
    } 

  }

   if(ship1.isTouching(obstaclesGroup))
   {

      shipHealth-=1;
      obstaclesGroup.destroyEach();
     //fill("white");
     //textSize(25);
     //text("YOU LOSE!!!",20,20);
   }
   if(attackGroup.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
    score+=1;
   }
 if(shipHealth===0){
   gameState=0;
 }

  if(gameState===END){
    obstaclesGroup.destroyEach();
    background(bgImg1);
     
    //backgr.depth=obstacle.depth+1;

    obstaclesGroup.setVelocityYEach(0);
    
    backgr.velocityY=0;
    backgr.x=250;
    backgr.y=250;
    backgr.scale=0.5;

    ship1.visible=false;
    obstacle.visible=false;
    obstacle.velocityY = 0;

  }

 
  

  drawSprites();
}



function spawnObstacles()
{
  if (frameCount %30 === 0)
  {
    obstacle = createSprite(40,52,22,22); 
    obstacle.x=random(30,800);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityY = 8;
    
    obstacle.lifetime = 250;
    obstacle.depth=ship1.depth+1;
    obstaclesGroup.add(obstacle);

  }
}

function spawnFire()
{
  if (keyWentDown("A"))
  {
    attack = createSprite(40,300,22,22); 
    attack.x=ship1.x;
    attack.addImage(attImg);
    attack.scale = 0.5;
    attack.velocityY = -2;
    
    attack.lifetime = 250;
    attack.depth=ship1.depth+1;
    attackGroup.add(attack);

  }
}