class Maze {

    constructor(row, col) {
        this.row     = row;
        this.col     = col;
        this.maze    = [];
        this.stack   = [];
        this.row_res = height / this.row;
        this.col_res = width  / this.col;

        for(let i = 0; i < this.row; i ++) {
            this.maze.push([]);
            for(let j = 0; j < this.col; j ++) {
                this.maze[i].push(new Cell(i, j));
            }
        }

        this.stack.push(this.maze[0][0]);
    }


    get_neighbours({row, col}) {
        const neighbours = [];

        if (row > 0)            neighbours.push(this.maze[row - 1][col]);
        if (row < this.row - 1) neighbours.push(this.maze[row + 1][col]);
        if (col > 0)            neighbours.push(this.maze[row][col - 1]);
        if (col < this.col - 1) neighbours.push(this.maze[row][col + 1]);

        return neighbours;
    }


    get_unvsited_neighbours({row, col}) {
        const neighbours = this.get_neighbours({row, col});

        for(let i = neighbours.length - 1; i >= 0; i --)
            if(neighbours[i].visited) neighbours.splice(i, 1);

        return neighbours;
    }


    get_random_unvisited_neighbour({row, col}) {
        const neighbours = this.get_unvsited_neighbours({row, col});
        const neighbour  = neighbours[floor(random(neighbours.length))];

        return neighbour;
    }


    remove_wall(prev_cell, curr_cell) {
        const row = curr_cell.row - prev_cell.row;
        const col = curr_cell.col - prev_cell.col;

        if (row == -1) {
            prev_cell.top_wall   = false;
            curr_cell.down_wall  = false;
        }
        else if (row == 1) {
            prev_cell.down_wall  = false;
            curr_cell.top_wall   = false;
        }
        else if (col == -1) {
            prev_cell.left_wall  = false;
            curr_cell.right_wall = false;
        }
        else if (col == 1) {
            prev_cell.right_wall = false;
            curr_cell.left_wall  = false;
        }
    }


    generate() {
        while(this.stack.length) {
            const top   = this.stack[this.stack.length - 1];
            top.visited = true;

            const neighbour = this.get_random_unvisited_neighbour(top);

            if(neighbour) {
                this.stack.push(neighbour);
                this.remove_wall(top, neighbour);
            }
            else {
                this.stack.pop();
            }
        }
    }


    display() {
        for(let i = 0; i < this.row; i ++)
            for(let j = 0; j < this.col; j ++)
                this.maze[i][j].display(this.row_res, this.col_res);
    }

}