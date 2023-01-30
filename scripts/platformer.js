const canvas = document.getElementById('gamewindow')
const canvasContext = canvas.getContext('2d')

let playerHeight = 20;
let playerWidth = 20;

let playerX = canvas.width / 2;
let velocityX = 0;
let accelerationX = 0;
let playerY = canvas.height / 2;
let velocityY = 0;
let accelerationY = 0;
let onGround = false;

let upArrow = false;
let downArrow = false;
let leftArrow = false;
let rightArrow = false;

window.requestAnimationFrame(gameLoop);

function gameLoop() {
    update();
    window.requestAnimationFrame(gameLoop);
}

window.onkeydown = function (e){
    switch(e.keyCode){
        case 37: leftArrow = true; break;
        case 38: upArrow = true; break;
        case 39: rightArrow = true; break;
        case 40: downArrow = true; break;
    }
}
window.onkeyup = function (e){
    switch(e.keyCode){
        case 37: leftArrow = false; break;
        case 38: upArrow = false; break;
        case 39: rightArrow = false; break;
        case 40: downArrow = false; break;
    }
}

function update(){
    if(playerY > canvas.height - playerHeight) {
        playerY = canvas.height - playerHeight;
        velocityY = 0;
        onGround = true;
    }

    accelerationX = 0;
    if(rightArrow) accelerationX++;
    if(leftArrow) accelerationX--;

    accelerationY = 1;
    if(upArrow){
        accelerationY = 0.5;
        if(onGround){
            velocityY = -10
            onGround = false;
        }
    }
    if (downArrow){
        accelerationY = 1.5;
    }

    velocityX += accelerationX;
    velocityX *= 0.9
    playerX += velocityX;
    if(!onGround){
        velocityY += accelerationY;
        playerY += velocityY;
    }
    drawPlayer();
}

function canvasSize(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function drawPlayer() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle = '#00FFFF'
    canvasContext.fillRect(playerX, playerY, playerWidth, playerHeight)
}
