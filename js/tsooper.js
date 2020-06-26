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
  init(id, x, y, dir, width, height, alpha=180, beta=17) {
    this.super(id, x, y);
    this.dir = dir;
    this.range = 5;
    this.speed = 0.67;
    this.beta = beta;
    this.alpha = alpha;
    this.boardWidth = width;
    this.boardHeight = height;
    this.color = 'white';
  }

  getColor(n) {
    if (n < 1) {
      return 'grey';
    } else if (n < 2) {
      return 'white';
    } else if (n < 4) {
      return 'yellow';
    } else if (n < 8) {
      return 'orange';
    } else if (n < 16) {
      return 'red';
    } else if (n < 32) {
      return 'purple';
    } else if (n < 64) {
      return 'blue';
    } else {
      return 'pink';
    }
  }

  inRange(obj) {
    var diffx = obj.x - this.x;
    var diffy = obj.y - this.y;
    return (diffx * diffx + diffy * diffy <= this.range * this.range);
  }

  angleToOther(obj) {
    return Math.atan2(obj.y, obj.x) * 180 / Math.PI;
  }

  setupStep() {
    var numLeft = 0;
    var numRight = 0;
    state.objects.map((obj) => {
      if (obj.id === this.id) {
        return;
      }
      if (this.inRange(obj)) {
        if (this.angleToOther(obj) - this.dir <= 180) {
          numLeft += 1;
        } else {
          numRight += 1;
        }
      }
    });
    var totalN = (numRight + numLeft);
    var turnDir = Math.sign(numLeft - numRight);
    this.dir = (this.dir + this.alpha + (this.beta * totalN * turnDir)) % 360;
    this.color = this.getColor(totalN);
  }

  takeStep(state) {
    this.moveInDir();
  }

  moveInDir() {
    var radDir = this.dir / 180 * Math.PI;
    this.x += Math.cos(radDir)*this.speed;
    this.y += Math.sin(radDir)*this.speed;
    while (this.x < 0) {
      this.x += this.boardWidth;
    } 
    while (this.x >= this.boardWidth) {
      this.x -= this.boardWidth;
    }
    while (this.y < 0) {
      this.y += this.boardHeight;
    }
    while (this.y >= this.boardHeight) {
      this.y -= this.boardHeight;
    }
  }

  str() {
    return `${this.id}: ${this.x} ${this.y} ${this.dir} ${this.color}`;
  }
}