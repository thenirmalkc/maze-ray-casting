class Cell {

    constructor(row, col) {
        this.row                = row;
        this.col                = col;
        this.visited            = false;
        this.top_wall           = true;
        this.down_wall          = true;
        this.left_wall          = true;
        this.right_wall         = true;
        this.top_wall_visible   = false;
        this.down_wall_visible  = false;
        this.left_wall_visible  = false;
        this.right_wall_visible = false;

    }


    display(row_res, col_res) {
        const x = this.col * col_res;
        const y = this.row * row_res;

        strokeWeight(1);

        if (this.top_wall_visible) {
            stroke(40);
            line(x          , y          , x + col_res, y          );
            stroke(255);
            line(x          , y          , x + col_res, y          );
        }

        if (this.down_wall_visible) {
            stroke(40);
            line(x          , y + row_res, x + col_res, y + row_res);
            stroke(255);
            line(x          , y + row_res, x + col_res, y + row_res);
        }

        if (this.left_wall_visible) {
            stroke(40);
            line(x          , y          , x          , y + row_res);
            stroke(255);
            line(x          , y          , x          , y + row_res);
        }

        if (this.right_wall_visible) {
            stroke(40);
            line(x + col_res, y          , x + col_res, y + row_res);
            stroke(255);
            line(x + col_res, y          , x + col_res, y + row_res);
        }
    }

}