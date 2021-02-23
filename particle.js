class Particle {

    constructor(x, y) {
        this.radian = 0;
        this.dir    = new Vec2(1, 0);
        this.pos    = new Vec2(x, y);
        this.fov    = PI * 0.33;

        this.size    = 4;
        this.speed   = 1.5;
        this.minDist = Infinity;

        this.raysC  = 100; // Rays Count
    }

    updateDir(radian) {
        this.radian += radian;
        this.radian  = this.radian % (2 * PI);

        if(this.radian < 0)
            this.radian += 2 * PI;

        this.dir.set(1, 0);
        this.dir.rotate(this.radian);
    }

    updatePos() {
        const vel = this.dir.copy();
        vel.setMag(this.speed);

        if(this.minDist > this.size)
            this.pos.add(vel);

        this.minDist = Infinity;
    }

    castRays(width, height, maze) {
        const cRes = width  / maze.col;
        const rRes = height / maze.row;
        const cR   = Math.floor(this.pos.y / rRes); // Current Row
        const cC   = Math.floor(this.pos.x / cRes); // Current Col
        const dRad = this.fov / this.raysC;

        let sRad = this.radian - this.fov / 2;
        if(sRad < 0)
            sRad += 2 * PI;

        for(let i = -1; i < this.raysC; i ++) {
            let x, y, tX, tY, dX, dY;
            let rad;
            if(i == -1)
                rad = this.radian;
            else
                rad = (sRad + i * dRad) % (2 * PI);

            let R, C; // Calculated Row and Col
            let minDist = Infinity;

            // Maze
            let wall = null;
            let mR = null;
            let mC = null;

            // For Vertical Rays
            if(rad > PI) {
                for(let j = cR; j >= 0; j --) {
                    dY = j * rRes - this.pos.y;
                    dX = dY / Math.tan(rad);
                    x  = this.pos.x + dX;
                    y  = this.pos.y + dY;
                    R  = Math.floor(y / rRes);
                    C  = Math.floor(x / cRes);

                    if(C < 0 || C >= maze.col)
                        break;

                    if(maze.maze[R][C].top_wall) {
                        wall = 0;
                        mR = R;
                        mC = C;
                        minDist = dY / Math.sin(rad);
                        break;
                    }
                }
            }
            else {
                for(let j = cR + 1; j <= maze.row; j ++) {
                    dY = j * rRes - this.pos.y;
                    dX = dY / Math.tan(rad);
                    x  = this.pos.x + dX;
                    y  = this.pos.y + dY;
                    R  = Math.floor(y / rRes) - 1;
                    C  = Math.floor(x / cRes);

                    if(C < 0 || C >= maze.col)
                        break;

                    if(maze.maze[R][C].down_wall) {
                        wall = 2;
                        mR = R;
                        mC = C;
                        minDist = dY / Math.sin(rad);
                        break;
                    }
                }
            }

            // For Horizontal Rays
            if(rad >  3 * PI / 2 || rad < PI / 2) {
                for(let j = cC + 1; j <= maze.row; j ++) {
                    dX = j * cRes - this.pos.x;
                    dY = dX * Math.tan(rad);
                    tX = this.pos.x + dX;
                    tY = this.pos.y + dY;
                    R  = Math.floor(tY / rRes);
                    C  = Math.floor(tX / cRes) - 1;

                    if(R < 0 || R >= maze.row)
                        break;

                    if(maze.maze[R][C].right_wall) {
                        const dist = dX / Math.cos(rad);
                        if(dist < minDist) {
                            x = tX;
                            y = tY;
                            wall = 1;
                            mR = R;
                            mC = C;
                            minDist = dist;
                            break;
                        }
                    }
                }
            }
            else {
                for(let j = cC; j >= 0; j --) {
                    dX = j * cRes - this.pos.x;
                    dY = dX * Math.tan(rad);
                    tX  = this.pos.x + dX;
                    tY  = this.pos.y + dY;
                    R  = Math.floor(tY / rRes);
                    C  = Math.floor(tX / cRes);

                    if(R < 0 || R >= maze.row)
                        break;

                    if(maze.maze[R][C].left_wall) {
                        const dist = dX / Math.cos(rad);
                        if(dist < minDist) {
                            x = tX;
                            y = tY;
                            wall = 3;
                            mR = R;
                            mC = C;
                            minDist = dist;
                            break;
                        }
                    }
                }
            }
            if(i == -1) {
                this.minDist = minDist;
                continue;
            }

            if     (wall == 0) maze.maze[mR][mC].TopWallVisible   = true;
            else if(wall == 1) maze.maze[mR][mC].RightWallVisible = true;
            else if(wall == 2) maze.maze[mR][mC].DownWallVisible  = true;
            else if(wall == 3) maze.maze[mR][mC].LeftWallVisible  = true;


            stroke(color(255, 255, 255, 50));
            strokeWeight(1);
            line(this.pos.x, this.pos.y, x, y);
        }

    }

    display(width, height) {
        // Displaying Particle
        const x = this.pos.x - this.size / 2;
        const y = this.pos.y - this.size / 2;

        noStroke();
        fill(color(255, 255, 255));
        square(x, y, this.size);
    }

}