let board = [
    { x: 0, y: 0, type: "empty", used: false },
    { x: 100, y: 0, type: "empty", used: false },
    { x: 200, y: 0, type: "empty", used: false },
    { x: 0, y: 100, type: "empty", used: false },
    { x: 100, y: 100, type: "empty", used: false },
    { x: 200, y: 100, type: "empty", used: false },
    { x: 0, y: 200, type: "empty", used: false },
    { x: 100, y: 200, type: "empty", used: false },
    { x: 200, y: 200, type: "empty", used: false }
]
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const messageHTML = document.getElementById("gameMessage");
var turn = "x";
var gameOver = false;
var isTie = false;
var xWins = false;
var oWins = false;
const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
canvas.addEventListener("mousemove", getMousePosition, false);
canvas.addEventListener("click", checkMouse, false);
function drawBoard() {
    board.forEach(drawTile);
}
function drawTile(tile) {
    ctx.fillStyle = "#35363A";
    ctx.strokeStyle = "white";
    ctx.strokeRect(tile.x, tile.y, 100, 100);
    ctx.fillRect(tile.x, tile.y, 100, 100);
    if (tile.type !== "empty") {
        if (tile.used === false) {
            if (tile.type === "x") {
                ctx.moveTo(tile.x + 25, tile.y + 25);
                ctx.lineTo(tile.x + 75, tile.y + 75);
                ctx.moveTo(tile.x + 75, tile.y + 25);
                ctx.lineTo(tile.x + 25, tile.y + 75);
                ctx.stroke();
            }
            else if (tile.type === "o") {
                ctx.beginPath();
                ctx.arc(tile.x + 50, tile.y + 50, 25, 0, 2 * Math.PI);
                ctx.stroke();
            }
            tile.used = true;
            Object.defineProperty(tile, "type", {
                writable: false
            })
        }
        else if (tile.used === true && tile.type === "x") {
            ctx.moveTo(tile.x + 25, tile.y + 25);
            ctx.lineTo(tile.x + 75, tile.y + 75);
            ctx.moveTo(tile.x + 75, tile.y + 25);
            ctx.lineTo(tile.x + 25, tile.y + 75);
            ctx.stroke();
        }
        else if (tile.used === true && tile.type === "o") {
            ctx.beginPath();
            ctx.arc(tile.x + 50, tile.y + 50, 25, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
    else if (tile.type === "empty") {
        return;
    }
}
function getMousePosition(event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
}
function checkMouse(event) {
    getMousePosition(event);
    if (mouseX <= 100 && mouseX > 0 && mouseY <= 100 && mouseY > 0) {
        board[0].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 200 && mouseX > 100 && mouseY <= 100 && mouseY > 0) {
        board[1].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 300 && mouseX > 200 && mouseY <= 100 && mouseY > 0) {
        board[2].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 100 && mouseX > 0 && mouseY <= 200 && mouseY > 100) {
        board[3].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 200 && mouseX > 100 && mouseY <= 200 && mouseY > 100) {
        board[4].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 300 && mouseX > 200 && mouseY <= 200 && mouseY > 100) {
        board[5].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 100 && mouseX > 0 && mouseY <= 300 && mouseY > 200) {
        board[6].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 200 && mouseX > 100 && mouseY <= 300 && mouseY > 200) {
        board[7].type = turn === "x" ? "x" : "o";
        newTurn();
    }
    else if (mouseX <= 300 && mouseX > 200 && mouseY <= 300 && mouseY > 200) {
        board[8].type = turn === "x" ? "x" : "o";
        newTurn();
    }
}
function newTurn() {
    turn = turn === "x" ? "o" : "x";
}
function tieGame() {
    if (board.every(val => val.type != "empty")) {
        gameOver = true;
        isTie = true;
    }
}
// This function uses code from: https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
function gameEnded() {
    for (let i = 0; i <= 7; i++) {
        const condition = conditions[i];
        let a = board[condition[0]].type;
        let b = board[condition[1]].type;
        let c = board[condition[2]].type;
        if (a === "empty" || b === "empty" || c === "empty") {
            continue;
        }
        if (a === b && b === c && a === "x") {
            gameOver = true;
            xWins = true;
            break;
        }
        else if (a === b && b === c && a === "o") {
            gameOver = true;
            oWins = true;
            break;
        }
    }
}
function draw() {
    if (gameOver) {
        /*         ctx.fillStyle = "#35363A";
                ctx.fillRect(0, 0, canvas.width, canvas.height); */
        if (xWins) {
            messageHTML.innerHTML = "X wins";
            return;
        }
        else if (oWins) {
            messageHTML.innerHTML = "O wins";
            return;
        }
        else if (isTie) {
            messageHTML.innerHTML = "Tie";
        }
        return;
    }
    requestAnimationFrame(draw);
    drawBoard();
    tieGame();
    gameEnded();
}
requestAnimationFrame(draw);
