var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;

var foodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;

function preload(){
  
  backImage=loadImage("Images/jungle2.jpg");
  monkey_running = loadAnimation("Images/Monkey_01.png","Images/Monkey_02.png","Images/Monkey_03.png","Images/Monkey_04.png","Images/Monkey_05.png","Images/Monkey_06.png","Images/Monkey_07.png","Images/Monkey_08.png","Images/Monkey_09.png","Images/Monkey_10.png");
  
  

  bananaImage = loadImage("Images/banana.png");
  obstacle_img = loadImage("Images/stone.png");
}



function setup() {
  
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}


function draw() {
  
  background (255);

   if(ground.x<0) {
    ground.x=ground.width/2;
  }  
  
  if(backgr.x <100){
    backgr.x = backgr.width/2;
  }

  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score= score+2;
  }
  
  switch(score){
      case 10 : monkey.scale= 0.12;
            break;
      case 20 : monkey.scale= 0.14;
            break;
      case 30 : monkey.scale= 0.16;
            break;
      case 40 : monkey.scale= 0.18;
            break;
      default: break;

  }
  
   if(keyDown("space")) {
    monkey.velocityY = -12;
   } 
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
 
  spawnObstacles();
  banana();
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.08;
    //ground.velocityX=0;
    //monkey.velocityY=0;
    //obstaclesGroup.setVelocityXEach(0);
    //foodGroup.setVelocityXEach(0);
    
    //foodGroup.setLifetimeEach(-1);
    //obstaclesGroup.setLifetimeEach(-1);
  }

  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score,camera.position.x/4 , camera.position.y/2);
}

function spawnObstacles(){
  if(frameCount % 300===0){
    var obstacle = createSprite(800,330,10,40);
    obstacle.velocityX= -6;
    obstacle.addImage(obstacle_img);
    obstacle.scale=0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function banana(){
  if(frameCount % 160===0){
    var food = createSprite(600,250,40,10);
    food.y= Math.round(random(20,200));
    food.velocityX= -4;
    food.addImage(bananaImage);
    foodGroup.add(food);
    food.scale=0.05; 
   food.lifetime = 300;
  }
}