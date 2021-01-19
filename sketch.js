var bgimg;
var gameState = "play";
var reloadTime = 0;
var hit=3;
var score = 0;
var blinkTime1 = 0;

function preload(){
    bgimg = loadImage("images/bg1.jpg");
    gun1img = loadImage("images/gun1.png");
    gun2img = loadImage("images/gun2.png");
    bulletimg = loadImage("images/bullet.png");
    fireImg = loadAnimation("images/fireball1.png", "images/fireball2.png");
    gun3img = loadImage("images/gun3.png");
    gun4img = loadImage("images/gun4.png");
    bombimg = loadImage("images/bomb.png");
    health3=loadImage("images/3health.png");
    health2=loadImage("images/2health.png");
    health1=loadImage("images/1health.png");
    health0=loadImage("images/0health.png");
    gameOverImg = loadImage("images/gameOver.jpg");
    bombSound = loadSound("BombSond.mp3");
    bulletSound = loadSound("bulletSound.mp3");
    fireballSound = loadSound("fireballSound.mp3");
    gameOverSound = loadSound("gameOverSound.wav");
}

function setup(){
    createCanvas(displayWidth-20,displayHeight-180);

    gun1 = createSprite(displayWidth/2+450,displayHeight/2);
    gun1.addImage(gun2img);
    gun1.scale = 0.8;

    lives=createSprite(displayWidth/2-600,displayHeight/2-350);
    lives.addImage(health3)
    lives.scale=2;


    gameOver = createSprite(displayWidth/2-100,displayHeight/2-80);
    gameOver.addImage(gameOverImg);
    gameOver.visible= false;
    gameOver.scale = 2;


    bulletGroup = new Group();
    ballGroup = new Group();
    ballGroup1 = new Group();
    bombGroup = new Group();

}

function draw(){
    background(bgimg);
    gun1.y = mouseY;
   
    if(gameState == "play")
    {
        fireball();
        fireball1();
        fspanBomb();    
        
        if(keyDown("space")){
            var bullet=createbullet();
            bullet.addImage(bulletimg);
            bulletSound.play();
            bullet.scale=0.2;
            bullet.setCollider("rectangle",0,0,30,30);
            bullet.y=gun1.y-10;
            gameState = "reload";
        }
      
        if(ballGroup.isTouching(bulletGroup)){
            ballGroup.destroyEach();
            bulletGroup.destroyEach();
            fireballSound.play();
            score += 2;
        }
        if(ballGroup1.isTouching(bulletGroup)){
            ballGroup1.destroyEach();
            bulletGroup.destroyEach();
            fireballSound.play();
            score += 2;
        }

        if(score == 100){
            gun1.addImage(gun3img);
            gun1.scale=0.3;
        }
        if(score == 150){
            gun1.addImage(gun4img);
            gun1.scale=0.3;
        }
        if(bulletGroup.isTouching(bombGroup)){
            hit=hit-1;
            bombSound.play();
            bulletGroup.destroyEach();
            bombGroup.destroyEach();
            gameState="respawn";
        }
        for(var i = 0 ; i < 2 ; i = i + 1){
          if(hit == 2){
            lives.addImage(health2);
          }
          if(hit == 1){
            lives.addImage(health1);
          }
          if(hit == 0){
            lives.addImage(health0);
            gameState ="end";
          }
        }   
    }
    if(reloadTime == 10){
        gameState = "play";
        reloadTime = 0;
    }
    if(gameState == "end"){
        ballGroup.setVelocityYEach(0);
        ballGroup1.setVelocityYEach(0);
        bombGroup.setVelocityYEach(0);
        ballGroup.destroyEach();
        ballGroup1.destroyEach();
        bombGroup.destroyEach();
        gameOverSound.play();
        gameOver.visible= true;
        gun1.visible = false;
    }
    if(gameState == "reload"){
        if(World.frameCount % 1 == 0){
        reloadTime = reloadTime + 1;
        }
    }
   
    if(gameState == "respawn"){
        ballGroup1.destroyEach();
        ballGroup.destroyEach();
        bombGroup.destroyEach();
        gameState = "play";
    }
    
    drawSprites();
    fill("white");
    textSize(30);
    text("Score : "+score, displayWidth/2+400,displayHeight/2-300);
}

function createbullet(){
    var bullet= createSprite(displayWidth/2+460,displayHeight/2-25);
    bullet.velocityX=-10;
    console.log(bullet.x);
    bullet.depth = gun1.depth;
    bullet.depth = bullet.depth +1;
    bulletGroup.add(bullet);
    return bullet;
}
function fireball(){
    if(World.frameCount%70==0){
      var ball=createSprite(random(displayWidth/2-500,displayWidth/2+260),0);
      ball.addAnimation("fire",fireImg);
      ball.setCollider("rectangle",0,0,30,80);
      ball.velocityY=2;
      ball.scale=1.5;
      ballGroup.add(ball);
    }
}
function fireball1(){
    if(World.frameCount%100==0){
      var ball=createSprite(random(displayWidth/2-500,displayWidth/2+260),0);
      ball.addAnimation("fire",fireImg);
      ball.setCollider("rectangle",0,0,30,80);
      ball.velocityY=3;
      ball.scale=1.5;
      ballGroup1.add(ball);
    }
}

function fspanBomb(){
    if(World.frameCount%200==0){
      var bomb=createSprite(random(displayWidth/2-500,displayWidth/2+260),0);
      bomb.addImage(bombimg);
      bomb.setCollider("rectangle",0,0,180,270);
      bomb.velocityY=3;
      bomb.scale=0.3;
      bombGroup.add(bomb);
    }
}