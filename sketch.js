//Create variables here
var dog, dogIMG, dogIMG1, database, foodS, foodStock;

function preload()
{
  //load images here
  dogIMG = loadImage("images/dogImg.png");
  dogIMG1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250, 350, 10, 60);
  dog.addImage(dogIMG);
  dog.scale = 0.2;
  
}


function draw() {  
  background("aqua");
  drawSprites();
  //add styles here
  if(foodS!== undefined){
    textsize(20);
    fill(255);
    text("Press UP ARROW key to feed", 50, 50);
    text("Food Remaining: "+foodS, 150, 150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogIMG1);
    }
    
    if(keyWentUP(UP_ARROW)){
      dog.addImage(dogIMG);
    }

    if(foodS === 0){
      foodS = 20;
    }




    drawSprites();
  }

}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}

