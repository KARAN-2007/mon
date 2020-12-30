var survivaltime=0;
var playIcon,pI;
var pause ,pauseIcon;
var play=1;
var PAUSE=0;
var gamestate=play;
var gameover,gOI,restart,rI;
var ground_image,ground,invisibleG;
var monkey , monkey_running,monkey_dead;
var banana ,bananaImage, obstacle, obstacleImage,oI1,oI2;
var bananaGroup, obstacleGroup;
var score;
var bgImage,bg;
var foodtaken=0;
function preload(){
  pauseIcon=loadImage("pause.png")
  pI=loadImage("play.png");
  
  
  
  ground_image=
    loadImage("1.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_dead=loadAnimation("download (1).png");
  bananaImage = loadImage("banana.png");
  obstacelImage = loadImage("obstacle.png");
  oI1=loadImage("r.png");
  oI2=loadImage("rock.png");
  bgImage=loadImage("1 - Copy.jpg")
  gOI=loadImage("GAMEOVER.png");
  rI=loadImage("re.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  obstacleGroup=createGroup(); 
  bg=createSprite(width-300,height-300);
  bg.addImage(bgImage);
  
  bg.scale=2;
  
  
  ground=createSprite(width-300,height-20,600,5)
  ground.addImage(ground_image);
  
  ground.scale=2;
  
  monkey=createSprite(50,height-100,5,5);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  //monkey.debug=true;
  pause=createSprite(20,20,55,5)
  pause.addImage(pauseIcon);
  pause.scale=0.03;

  invisibleG=createSprite(50,height-65,width/2,5);
  bananaGroup=new Group();
  playIcon=createSprite(50,20,5,5)
      playIcon.addImage(pI);
      playIcon.scale=0.03;
     

  
  
}


function draw() {
   background("white");
  if(gamestate===play){
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      foodtaken=foodtaken+1;
    }
    obstacleGroup.setVelocityXEach(-(4+survivaltime/20)); 
    bg.velocityX=-(4+survivaltime/20); 
    
    if(bg.x<0){
      bg.x=width/2;
    }
    ground.velocityX=-(4+survivaltime/20);
    if(ground.x<0){
      ground.x=width/2;
    }
    if(touches.length>0||keyDown("space")&&monkey.y>100){
      monkey.velocityY=-15;
      touches=[];
    }
    monkey.velocityY=monkey.velocityY+0.5;
  
  spawnObstacles();
  
  createBanana();

   switch(survivaltime){
     case 10:
       monkey.scale=0.115;
       break;
          case 20:
       monkey.scale=0.125;
       break;
          case 30:
       monkey.scale=0.135;
       break;
          case 40:
       monkey.scale=0.145;
       break;
          case 50:
       monkey.scale=0.155;
       break;
          case 60:
       monkey.scale=0.165;
       break;
          case 70:
       monkey.scale=0.175;
       break; 
         case 80:
       monkey.scale=0.185;
       break;
         case 90:
       monkey.scale=0.195;
       break;     
         case 100:
       monkey.scale=0.2;
       break;
       
   }
  
     if(monkey.isTouching(obstacleGroup)){
        monkey.scale=0.1;
        survivaltime=0;
        frameCount=0;
        
      }
    
    
    
    
    
   if(touches.length>0||mousePressedOver(pause)){
     gamestate=PAUSE;
     touches=[];
    }
  survivaltime=Math.ceil(frameCount/frameRate());
    
    
  }
   else if(gamestate===PAUSE){
      obstacleGroup.setVelocityXEach(0);
     bg.velocityX=0;
     ground.velocityX=0;
    bananaGroup.setVelocityXEach(0);
     bananaGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
     
     if(touches.length>0||mousePressedOver(playIcon)){
       touches=[];
       gamestate=play;
  
       bananaGroup.setVelocityXEach(-(5+survivaltime/20))
       obstacleGroup.setVelocityXEach(-(4+survivaltime/20))
            
     }
     
   }
 
  
  
   

  
  

  
  
  
  
 
  
  monkey.collide(invisibleG);
  
  invisibleG.visible=false;
  

  drawSprites();
  textSize(15);
  fill("red");
  text("FoodTaken:"+foodtaken,width-100,45);
  text("SurvivalTime:"+survivaltime,width-220,45);
}

function spawnObstacles(){
  if (frameCount%150===0){
  obstacle=createSprite(width,ground.y-60,5,5);
    
    obstacle.scale=0.205;
    var p=Math.round(random(1,3))
    switch(p){
      case 1:
        obstacle.addImage(obstacelImage);
        break;
        case 2:
         obstacle.addImage(oI1);
         break;
         case 3:
          obstacle.addImage(oI2);
          break;
      default:break;
        
    }
  obstacle.setCollider("rectangle",0,0,450,450);
  //obstacle.debug=true;
  obstacle.lifetime=210;
    
    console.log(obstacle.y);
    obstacleGroup.add(obstacle);
    }
}
function createBanana(){
  if(frameCount%120===0){
    
    
    
  
    banana=createSprite(width,height/2,5,5);
    banana.addImage(bananaImage);
    banana.scale=0.07;
    banana.velocityX=-(5+survivaltime/20);
    banana.y=Math.round(random(10,height/2));
    banana.lifetime=210;
    

    bananaGroup.add(banana);
    
  }
}