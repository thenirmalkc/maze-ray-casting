class Wall {

    constructor(x1, y1, x2, y2) {

        this.p1 = new Vector2D(x1, y1); // P(x1, y1)
        this.p2 = new Vector2D(x2, y2); // P(x2, y2)

    }

    display() {
        strokeWeight(1);
        stroke(255);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }

}