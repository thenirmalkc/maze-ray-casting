const width  = 640 * 1.2;
const height = 480 * 1.2;


let maze;
let walls = [];
let particle;


function setup() {
    const canvas = createCanvas(width, height);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

    background(40);

    // Initializing New Maze
    maze = new Maze(16, 16);

    // Generating Maze
    maze.generate();

    // Initializing New Walls
    initialize_walls();

    // Initializing New Particle
    particle = new Particle(maze.col_res / 2, maze.row_res / 2);
}


function draw() {
    background(40);

    // Displaying Walls
    for(let i = 0; i < walls.length; i ++)
        walls[i].display();

    // Casting Particle's rays on walls
    particle.ray_cast(walls);

    // Displaying Particle
    particle.display();


    // Updating Particle's position and direction
    if(keyIsDown(37)) {
        particle.update_dir(-0.1);
    }
    if(keyIsDown(39)) {
        particle.update_dir(0.1);
    }
    if(keyIsDown(32)) {
        particle.update_pos();
    }
}


function initialize_walls() {
    const row_res = height / maze.row;
    const col_res = width  / maze.col;

    walls.push(new Wall(    0,      0, width,      0));
    walls.push(new Wall(width,      0, width, height));
    walls.push(new Wall(width, height,     0, height));
    walls.push(new Wall(    0, height,     0,      0));

    for(let i = 0; i < maze.row - 1; i ++) {
        for(let j = 0; j < maze.col; j ++) {
            const x = j * col_res;
            const y = i * row_res;

            if(maze.maze[i][j].down_wall)
                walls.push(new Wall(x, y + row_res, x + col_res, y + row_res));
        }
    }

    for(let i = 0; i < maze.row; i ++) {
        for(let j = 0; j < maze.col - 1; j ++) {
            const x = j * col_res;
            const y = i * row_res;

            if (maze.maze[i][j].right_wall)
                walls.push(new Wall(x + col_res, y, x + col_res, y + row_res));
        }
    }
}
