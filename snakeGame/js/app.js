const canvas = document.querySelector("#canvas");
canvas.width = "300";
canvas.height = "300";
let ctx = canvas.getContext("2d");

let scale = 10;
let rows = canvas.height / scale;
let column = canvas.height / scale;

let snake;

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  this.draw = function () {
    ctx.fillStyle = "#fff";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.y > canvas.height) {
      this.y = 0;
    }

    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    }
  };

  this.changeDirection = function (direction) {
    switch (direction) {
      case "Up": {
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      }
      case "Down": {
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      }
      case "Left": {
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      }
      case "Right": {
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
      }
      default: {
        //   ...
      }
    }
  };

  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      console.log("عه خورد");
      this.total++;
      return true;
    }
    return false;
  };
}

function Fruit() {
  this.x;
  this.y;

  this.pickLocation = function () {
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * column - 1) + 1) * scale;
  };

  this.draw = function () {
    ctx.fillStyle = "#f00";
    ctx.fillRect(this.x, this.y, scale, scale);
  };
}

(function () {
  snake = new Snake();
  let fruit = new Fruit();
  fruit.pickLocation();

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }
  }, 250);
})();

window.addEventListener("keydown", (e) => {
  const direction = e.key.replace("Arrow", "");
  snake.changeDirection(direction);
});
