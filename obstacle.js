class Obstacle {
    constructor(obstacleSprite) {
        this.w = width / 2
        this.x = 350;
        this.y = height
        this.speed = 5;
        this.passed = false;
    }

    show() {
        image(obstacleSprite, this.x, this.y, 190, 140)
    }
    left() {
        this.x -= this.speed
    }
    update() {
    }
    pass(octopus) {
        if (octopus.x > this.x && !this.passed || octopus.y > this.w && !this.passed) {
            //this.passed = true;
            return true;
        }
        return false;
    }
    crashWith(octopus, i) {

        let d = dist(this.x, this.y, octopus.x, octopus.y)

        if (d < 40) {
            return true
        } else {
            return false
        }

    }
}