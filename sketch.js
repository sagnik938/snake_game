//created by sagnik sinha on 16th may 2020

class snake {
  constructor(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.total = 0;
    this.tail = [];
  }
  update() {
    var i;
    if (this.total == this.tail.length) {
      for (i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);

  }
  show() {
    fill(0, 255, 255);
    textSize(20);
    text("YOUR SCORE IS", 400, 50);
    text(this.total, 530, 70);
    var i;
    fill(0, 255, 255);
    for (i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    fill(0, 0, 255);
    rect(this.x, this.y, scl, scl);
  }
  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  eat(food) {
    if (dist(food.x, food.y, d.x, d.y) == 0) {
      loader();
      this.total++;
      fps += 0.25;
    }
  }

  gameover() {
    var i;
    for (i = 0; i < this.tail.length; i++) {
      if (dist(this.x, this.y, this.tail[i].x, this.tail[i].y) <= 1) {
        fill(255, 0, 0);
        textSize(50);
        text("GAME OVER", 120, 300);
        noLoop();
      }
    }
  }
}


var d, scl = 20,
  food, cols, row, fps = 3;

var up,down,right,left;

function loader() {
  cols = int(600 / scl);
  row = int(600 / scl);
  food = createVector(int(random(cols)), int(random(row)));
  food.mult(scl);
}

function setup() {
  k = createDiv("TAP ANYWHERE TO START GAME");
  k.size(400, 50);
  k = createDiv("USE ARROW KEYS OR BUTTONS TO CONTROL THE SNAKE");
  k.size(400, 50);
  createCanvas(600, 600);
  
  up=createButton("UP");
  up.position(width/2-50,710);
  up.style('background-color',color(0,0,255,100));
  up.size(150,100);
  
  down=createButton("DOWN");
  down.position(width/2-50,850);
  down.style('background-color',color(0,0,255,100));
  down.size(150,100);
  
  right=createButton("RIGHT");
  right.position(width/2+110,750);
  right.style('background-color',color(0,0,255,100));
  right.size(100,150);
  
  left=createButton("LEFT");
  left.position(width/2-160,750);
  left.style('background-color',color(0,0,255,100));
  left.size(100,150);
  
  k=createDiv("MADE BY SAGNIK SINHA");
  k=createDiv("ON 16th MAY 2020");
  d = (new snake(0, 0, 1, 0));
  loader();
}

function draw() {
  frameRate(fps);
  background(0);
  
  up.mousePressed(setdir_up);
  down.mousePressed(setdir_down);
  right.mousePressed(setdir_right);
  left.mousePressed(setdir_left);
  
  d.gameover();
  d.update();
  d.show();
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
  d.eat(food);
}

function keyPressed() {
  if (keyCode == UP_ARROW && d.yspeed <= 0) {
    d.dir(0, -1)
  }
  if (keyCode == DOWN_ARROW && d.yspeed >= 0) {
    d.dir(0, 1)
  }
  if (keyCode == LEFT_ARROW && d.xspeed <= 0) {
    d.dir(-1, 0)
  }
  if (keyCode == RIGHT_ARROW && d.xspeed >= 0) {
    d.dir(1, -0)
  }
}


function setdir_up(){
  if(d.yspeed <= 0){
    d.dir(0,-1);
  }
}

function setdir_down(){
  if(d.yspeed >= 0){
    d.dir(0,1);
  }
}

function setdir_left(){
  if(d.xspeed <= 0){
    d.dir(-1,0);
  }
}

function setdir_right(){
  if(d.xspeed >= 0){
    d.dir(1,0);
  }
}