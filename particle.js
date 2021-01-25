class Particle {

    constructor(x, y) {
        this.pos      = new Vector2D(x, y);
        this.dir      = new Vector2D(1, 0);
        this.fov      = (22 / 7) / 2; // Field of View in Radians
        this.speed    = 1.5;
        this.size     = 8
        this.min_dist = Infinity;
        this.rays_c   = 100;
        this.rays     = [];

        this.update_rays();
    }


    update_pos(x, y) {
        let vel = this.dir.copy(); // Velocity Vector
        vel.set_mag(this.speed);

        if(this.min_dist > this.size)
            this.pos.add(vel);
    }


    update_dir(angle) {
        this.dir.rotate(angle);

        // Updating rays after direction is updated
        this.update_rays();
    }


    update_rays() {
        this.rays = [];

        let angle = this.fov / this.rays_c;

        for(let i = -this.rays_c / 2; i <= this.rays_c / 2; i ++) {
            let v = this.dir.copy();
            v.rotate(i * angle);

            this.rays.push(new Ray(v.x, v.y));
        }

    }



    ray_cast(objs) {
        this.min_dist = Infinity;

        for(let i = 0; i < this.rays_c; i ++) {

            // Initializing minimum distance to Infinity
            let min_dist = Infinity;
            let x1, y1, x2, y2, x3, y3, x4, y4;
            let nearest_wall;

            for(let j = 0; j < objs.length; j ++) {
                const r = Vector2D.add(this.pos, this.rays[i].dir); // Result Vector

                x1 = objs[j].p1.x;
                y1 = objs[j].p1.y;

                x2 = objs[j].p2.x;
                y2 = objs[j].p2.y;

                x3 = this.pos.x;
                y3 = this.pos.y;

                x4 = r.x;
                y4 = r.y;

                let d =   (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4); // Denominator
                let t =  ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
                let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

                if(d == 0) continue;
                else if(t >= 0 && t <= 1 && u >= 0) {
                    let x, y;

                    x = x1 + t * (x2 - x1);
                    y = y1 + t * (y2 - y1);

                    let v = new Vector2D(x, y);

                    // Calculating distance
                    let dist = Vector2D.dist(this.pos, v);

                    if(dist < min_dist) {
                        nearest_wall = objs[j];
                        min_dist     = dist;

                        // To make sure min_dist is always greater than 0
                        if(min_dist == 0) min_dist = 1;
                    }
                }
            }

            // Making ray casted wall visible
            if(nearest_wall)
                nearest_wall.visible = true;

            if(min_dist < this.min_dist)
                this.min_dist = min_dist;

            if(min_dist != Infinity)
                this.rays[i].cast(min_dist);
        }
    }


    display() {

        // Displaying Particle
        noStroke();
        fill(255);
        circle(this.pos.x, this.pos.y, this.size);

        // Displaying Rays
        for(let i = 0; i < this.rays_c; i ++)
            this.rays[i].display(this.pos);
    }

}