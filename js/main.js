
class Obj {
  super(id, x, y) {
    this.id=id;
    this.x=x;
    this.y=y;
  }
  takeStep(state) {}
  str() {
    return `${this.id}: ${this.x} ${this.y}`;
  }
}


class Tsooper extends Obj {
  init(id, x, y, dir) {
    this.super(id, x, y);
    this.dir = dir;
    this.range = 5;
    this.speed = 0.67;
    this.beta = 17;
    this.alpha = 180;
  }
  inRange(obj) {
    var diffx = obj.x - this.x;
    var diffy = obj.y - this.y;
    return (diffx * diffx + diffy * diffy > this.range * this.range);
  }
  angleToOther(obj) {
    return Math.atan2(obj.y, obj.x) * 180 / Math.PI;
  }
  takeStep(state) {
    var numLeft = 0;
    var numRight = 0;
    state.objects.map((obj) => {
      if (this.inRange(obj)) {
        if (this.angleToOther(obj) - this.dir <= 180) {
          numLeft += 1;
        } else {
          numRight += 1;
        }
      }
    });
    var turnDir = Math.sign(numLeft - numRight);
    this.dir = (this.dir + this.alpha + (this.beta * (numRight + numLeft) * turnDir)) % 360;
    this.moveInDir();
  }
  moveInDir() {
    this.x += Math.cos(this.dir)*this.speed;
    this.y += Math.sin(this.dir)*this.speed;
  }
  str() {
    return `${this.id}: ${this.x} ${this.y} ${this.dir}`;
  }
}

class State {
  objects = [];
  print() {
    this.objects.map((obj) => {
      console.log(obj.str());
    });
  }
  takeStep() {
    this.objects.map((obj) => {
      obj.takeStep(this);
    });
  }
}

function main() {
  var state = new State();
  for (var i = 0; i < 20; i+=1) {
    var tsooper = new Tsooper();
    tsooper.init(i, i, i, i);
    state.objects.push(tsooper);
  }
  for (var i = 0; i < 20; i+=1) {
    state.takeStep();
    state.print();
  }
}

window.onload = (event) => {
  console.log('loaded!');
  // SETUP
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 600, 600);

  main();
}


