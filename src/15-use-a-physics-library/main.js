var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine
});

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse
});

Composite.add(engine.world, mouseConstraint);

render.mouse = mouse;

function addCircle(x, y) {
    var circle = Bodies.circle(x, y, 40, {
        restitution: 0.5,
        render: {
            fillStyle: 'red'
        }
    });
    Composite.add(engine.world, circle);
}

function flipGravity() {
    engine.world.gravity.y *= -1;
}

document.body.addEventListener("click", function (event) {
    var mousePosition = mouse.position;
    addCircle(mousePosition.x, mousePosition.y);

    flipGravity();
});

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var leftWall = Bodies.rectangle(0, 300, 60, 600, { isStatic: true });
var rightWall = Bodies.rectangle(800, 300, 60, 600, { isStatic: true });
var topWall = Bodies.rectangle(400, 0, 800, 60, { isStatic: true });

Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);

render.options.width = 800;
render.options.height = 600;

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);

