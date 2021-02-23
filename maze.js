class Maze {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.maze = [];

        for(let i = 0; i < this.row; i ++) {
            this.maze.push([]);
            for(let j = 0; j < this.col; j ++) {
                this.maze[i].push(new Cell(i, j));
            }
        }
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

    remove_wall(curr_cell, next_cell) {
        const row = next_cell.row - curr_cell.row;
        const col = next_cell.col - curr_cell.col;

        if (row == -1) {
            curr_cell.top_wall   = false;
            next_cell.down_wall  = false;
        }
        else if (row == 1) {
            curr_cell.down_wall  = false;
            next_cell.top_wall   = false;
        }
        else if (col == -1) {
            curr_cell.left_wall  = false;
            next_cell.right_wall = false;
        }
        else if (col == 1) {
            curr_cell.right_wall = false;
            next_cell.left_wall  = false;
        }
    }

    generate() {
        const stack = [];
        stack.push(this.maze[0][0]);

        while(stack.length) {
            const top = stack[stack.length - 1];
            top.visited = true;

            const neighbour = this.get_random_unvisited_neighbour(top);

            if(neighbour) {
                stack.push(neighbour);
                this.remove_wall(top, neighbour);
            }
            else {
                stack.pop();
            }
        }
    }

    display(width, height) {
        const cRes = width  / this.col;
        const rRes = height / this.row;

        for(let i = 0; i < this.row; i ++)
            for(let j = 0; j < this.col; j ++)
                this.maze[i][j].display(rRes, cRes);
    }

}