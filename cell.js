class Cell {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.visited = false;

        this.top_wall   = true;
        this.down_wall  = true;
        this.left_wall  = true;
        this.right_wall = true;

        this.TopWallVisible   = false;
        this.DownWallVisible  = false;
        this.LeftWallVisible  = false;
        this.RightWallVisible = false;
    }


    display(rRes, cRes) {
        const x = this.col * cRes
        const y = this.row * rRes;

        strokeWeight(2);
        stroke(color(200, 200, 200));

        if(this.TopWallVisible)   {
            line(x       , y       , x + cRes, y       );
        }

        if(this.DownWallVisible)  {
            line(x       , y + rRes, x + cRes, y + rRes);
        }

        if(this.LeftWallVisible)  {
            line(x       , y       , x       , y + rRes);
        }

        if(this.RightWallVisible) {
            line(x + cRes, y       , x + cRes, y + rRes);
        }
    }

}