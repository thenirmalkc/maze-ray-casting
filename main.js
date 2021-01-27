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
    maze = new Maze(12, 12);

    // Generating Maze
    maze.generate();

    // Initializing New Walls
    initialize_walls();

    // Initializing New Particle
    particle = new Particle(maze.col_res / 2, maze.row_res / 2);
}


function draw() {
    background(40);

    // Displaying Maze
    maze.display();

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
    for(let i = 0; i <= maze.row; i ++)
        walls.push(new Wall(0, i * maze.row_res, width, i * maze.row_res));

    for(let i = 0; i <= maze.col; i ++)
        walls.push(new Wall(i * maze.col_res, 0, i * maze.col_res, height));
}
