const width  = 640 * 1.2;
const height = 480 * 1.2;


let maze;
let particle;


function setup() {
    const canvas = createCanvas(width, height);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

    background(40);

    // Initializing New Maze
    maze = new Maze(12, 12);
    // Generating Maze
    maze.generate();

    // Initializing New Particle
    particle = new Particle((width / maze.col) / 2, (height / maze.row) / 2);
}


function draw() {
    background(40);

    // Displaying Maze
    maze.display(width, height);

    // Displaying Particle
    particle.display(width, height);

    // Casting Particle's Rays on Maze
    particle.castRays(width, height, maze);

    // Updating Particle's Direction
    if(keyIsDown(37)) {
        particle.updateDir(-0.1);
    }
    if(keyIsDown(39)) {
        particle.updateDir( 0.1);
    }

    // Updating Particle's position
    if(keyIsDown(32)) {
        particle.updatePos();
    }
}
