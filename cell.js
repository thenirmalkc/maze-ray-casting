class Cell {

    constructor(row, col) {
        this.row        = row;
        this.col        = col;
        this.visited    = false;
        this.top_wall   = true;
        this.down_wall  = true;
        this.left_wall  = true;
        this.right_wall = true;
    }


    display(row_res, col_res) {
        strokeWeight(2);
        stroke(255);

        const x = this.col * col_res;
        const y = this.row * row_res;


        if (this.top_wall)
            line(          x,           y, x + col_res,           y);

        if (this.down_wall)
            line(          x, y + row_res, x + col_res, y + row_res);

        if (this.left_wall)
            line(          x,           y,           x, y + row_res);

        if (this.right_wall)
            line(x + col_res,           y, x + col_res, y + row_res);
    }

}