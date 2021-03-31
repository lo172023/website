//https://www.educative.io/blog/javascript-snake-game-tutorial
const board_background = "#35363A";
const snake_col = 'green';

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 }
]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 20;
let dy = 0;

const snakeboard = document.getElementById("canvas");
const snakeboard_ctx = snakeboard.getContext("2d");
main();

gen_food();

document.addEventListener("keydown", change_direction);

function main() {

    if (has_game_ended()) {
        return
    }
    hitWall()
    changing_direction = false;
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        main();
    }, 100)
}

function clear_board() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokeStyle = "white"
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'red';
    snakeboard_ctx.fillRect(food_x, food_y, 20, 20);
}

function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
}

function hitWall() {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 20;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 20;
    if (hitLeftWall) {
        snake[0].x = snakeboard.width - 20;
    }
    if (hitRightWall) {
        snake[0].x = 20;
    }
    if (hitTopWall) {
        snake[0].y = snakeboard.height - 20;
    }
    if (hitBottomWall) {
        snake[0].y = 20;
    }
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - 20);
    food_y = random_food(0, snakeboard.height - 20);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

function move_snake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        score += 1;
        document.getElementById('score').innerHTML = `Score: ${score}`;
        gen_food();
    } else {
        snake.pop();
    }
}
