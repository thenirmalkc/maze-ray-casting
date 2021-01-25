class Ray {

    constructor(x, y) {
        this.dir = new Vector2D(x, y); // Direction of Ray
    }


    cast(dist) {
        this.dir.set_mag(dist);
    }


    display(origin) {
        strokeWeight(1);
        stroke(255, 80);

        const r = Vector2D.add(origin, this.dir); // Result vector

        line(origin.x, origin.y, r.x, r.y);
    }

}