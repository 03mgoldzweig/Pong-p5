let paddle1, paddle2, ball;

function setup() {
  createCanvas(400, 400);
  paddle1 = new Paddle(20, height / 2 - 40);
  paddle2 = new Paddle(width - 30, height / 2 - 40);
  ball = new Ball();
}

function draw() {
  background(0);
  // W and S keys
  paddle1.update(87, 83);
  paddle2.update(UP_ARROW, DOWN_ARROW);
  ball.update();
  paddle1.display();
  paddle2.display();
  ball.display();
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.height = 80;
    this.width = 10;
  }

  update(upKey, downKey) {
    if (keyIsDown(upKey) && this.y > 0) {
      this.y -= this.speed;
    }
    if (keyIsDown(downKey) && this.y < height - this.height) {
      this.y += this.speed;
    }
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 5;
    this.ySpeed = 3;
    this.size = 10;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Check collision with walls
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.ySpeed *= -1;
    }
    
    // Check collision with paddle1
    if (
      this.x - this.size / 2 < paddle1.x + paddle1.width &&
      this.x + this.size / 2 > paddle1.x &&
      this.y - this.size / 2 < paddle1.y + paddle1.height &&
      this.y + this.size / 2 > paddle1.y
    ) {
      this.xSpeed *= -1;
    }

    // Check collision with paddle2
    if (
      this.x - this.size / 2 < paddle2.x + paddle2.width &&
      this.x + this.size / 2 > paddle2.x &&
      this.y - this.size / 2 < paddle2.y + paddle2.height &&
      this.y + this.size / 2 > paddle2.y
    ) {
      this.xSpeed *= -1;
    }


    // Check if the ball goes out of bounds
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.reset();
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    // Set a random initial direction for the ball
    let angle = random(TWO_PI);
    this.xSpeed = 5 * cos(angle);
    this.ySpeed = 5 * sin(angle);
  }
}
