
let dots = [];

function setup() {
 // put setup code here
 createCanvas(600,400);
 colorMode(HSB);
 frameRate(60); 
 noStroke();  // Turns off borders
 for (let i = 0; i < 500; i++) {
  dot = new Dot(width/2, height/2, i)
  dots.push(dot)
 }
}

function draw() {
  // put drawing code here
  background(0,0,0);
  for (let dot of dots) {
    dot.draw();
  }
}

class Dot {
  constructor(index, x, y) {
    this.index = index
    this.x = x;
    this.y = y;
    this.radius = dots.length - this.index;
    this.hue = Math.random() * 360;
    this.velocityX = random(-1, 1);
    this.velocityY = random(-1, 1);
  }

  draw() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.x > width || this.x < 0);
      this.velocityX *= -1;
    if (this.y > height || this.y < 0);
      this.velocityY *= -1;
    this.velocityX *= 0.99;
    this.velocityY *= 0.99;
    fill(this.hue, 60, 100);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}