var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var state,evol;
var wolfImg;

function preload(){
   dogImg=loadImage("Images/Gabumon_t.gif");
   dogImg1=loadImage("Images/Gabumon.jpg");
   wolfImg=loadImage("Images/Garurumon.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.40;


  evol = database.ref('evolveState');
  evol.on("value",knowState);
  textSize(20)
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(0,0,255);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  if (keyWentDown(DOWN_ARROW)&& state === 0){
    reStock(foodS);
    dog.addImage(dogImg1);
  }
  if(keyWentDown(DOWN_ARROW)&& state === 1){
    reStock_e2(foodS);
  }
  if(foodS === 0 || foodS === 60 &&state === 0){
    dog.addImage(dogImg);
  }
  if(state === 1){
    dog.addImage(wolfImg);
  }

  if(state === 0&& foodS === 0){
    fill (255,255,254)
    text("press the right arrow to evolve", 170, 100)
  }
  if(state === 0&& foodS === 0&& keyWentDown(RIGHT_ARROW)){
    changeState(state);
  }
  
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Wolfy Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
function knowState(data){
  state = data.val();
}
function changeState(z){
  if(z<=0){
    z=z+1
  }else{
    z=1
  }
  database.ref('/').update({
    evolveState:z
  })
}

function reStock(y){
  if(y>=60){
    y=60;
  }else{
    y=y+1;
  }
  
  database.ref('/').update({
    Food:y
  })
}
function reStock_e2(y){
  if(y>=80){
    y=80;
  }else{
    y=y+1;
  }
  
  database.ref('/').update({
    Food:y
  })
}
