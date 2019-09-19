class Octopus {
  constructor(octopusSprite) {
    this.y = 200;
    this.x = 1;

    this.gravity = 0.08;
    this.lift = -3;
    this.velocity = 0;
    this.icon = octopusSprite;
    this.width = 60;
    this.height = 60;


  }

  show() {
    image(octopusSprite, this.x, this.y, 0, 0)
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
  }

  up() {
    this.velocity = this.lift;
  }
  left() {
    this.x--;
  }
  right() {
    this.x++;
  }
}