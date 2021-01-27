const PI = 22 / 7;


class Particle {

    constructor(x, y) {
        this.pos      = new Vector2D(x, y);
        this.dir      = new Vector2D(-1, 0);
        this.fov      = PI / 2; // Field of View in Radians
        this.speed    = 1.5;
        this.size     = 8
        this.rays_c   = 120;
        this.rays     = [];
        this.min_dist = Infinity;

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
        let x1, y1, x2, y2, x3, y3, x4, y4;
        let r;
        this.min_dist = Infinity;

        for(let i = 0; i < this.rays_c; i ++) {
            let min_dist = Infinity;

            let nr = null; // Nearest row
            let nc = null; // Nearest col
            let vw = null; // Visible Wall

            r = Vector2D.add(this.pos, this.rays[i].dir); // Result Vector

            x3 = this.pos.x;
            y3 = this.pos.y;

            x4 = r.x;
            y4 = r.y;

            for(let j = 0; j < objs.length; j ++) {
                if(j <  objs.length / 2 && this.rays[i].dir.y == 0) continue;
                if(j >= objs.length / 2 && this.rays[i].dir.x == 0) continue;

                x1 = objs[j].p1.x;
                y1 = objs[j].p1.y;

                x2 = objs[j].p2.x;
                y2 = objs[j].p2.y;

                let d =   (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4); // Denominator
                if(d == 0) continue;

                let t =  ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
                let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

                if(t >= 0 && t <= 1 && u >= 0) {
                    let temp_vw; // Temp Visible Wall

                    let x = x1 + t * (x2 - x1);
                    let y = y1 + t * (y2 - y1);

                    let r = floor(y / maze.row_res); // Wall's row
                    let c = floor(x / maze.col_res); // Wall's col

                    // Checking if Wall exists
                    if     (j <  objs.length / 2 && this.rays[i].dir.y > 0) {
                        r -= 1;
                        if(!maze.maze[r][c].down_wall)  continue;
                        temp_vw = 2;
                    }
                    else if(j <  objs.length / 2 && this.rays[i].dir.y < 0) {
                        if(!maze.maze[r][c].top_wall)   continue;
                        temp_vw = 0
                    }
                    else if(j >= objs.length / 2 && this.rays[i].dir.x > 0) {
                        c -= 1;
                        if(!maze.maze[r][c].right_wall) continue;
                        temp_vw = 1;
                    }
                    else if(j >= objs.length / 2 && this.rays[i].dir.x < 0) {
                        if(!maze.maze[r][c].left_wall)  continue;
                        temp_vw = 3;
                    }

                    let v    = new Vector2D(x, y); // Wall Vector

                    // Calculating distance between Particle and Wall
                    let dist = Vector2D.dist(this.pos, v);

                    if(dist < min_dist) {
                        nr       = r;
                        nc       = c;
                        vw       = temp_vw;
                        min_dist = dist;
                    }
                }
            }

            if(nr != null && nc != null && vw != null) {
                if     (vw == 0) maze.maze[nr][nc].top_wall_visible   = true;
                else if(vw == 1) maze.maze[nr][nc].right_wall_visible = true;
                else if(vw == 2) maze.maze[nr][nc].down_wall_visible  = true;
                else if(vw == 3) maze.maze[nr][nc].left_wall_visible  = true;
            }

            if(min_dist < this.min_dist)
                this.min_dist = min_dist;

            if(min_dist == Infinity || min_dist == 0)
                min_dist = 1;

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