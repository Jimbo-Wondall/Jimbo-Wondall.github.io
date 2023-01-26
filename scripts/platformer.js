const canvas = document.getElementById('tester-canvas')
const canvasContext = canvas.getContext('2d')

let playerHeight = 20;
let playerWidth = 20;

let playerX = canvas.width / 2;
let velocityX = 0;
let accelerationX = 0;
let playerY = canvas.height / 2;
let velocityY = 0;

window.requestAnimationFrame(gameLoop);

function gameLoop() {
    update();
    window.requestAnimationFrame(gameLoop);
}

window.onkeydown = function (e){
    switch(e.keyCode){
        case 37: 
            accelerationX = -1;
            break;
        case 38: 
            velocityY = -10;
            break;
        case 39: 
            accelerationX = 1;
            break;
        case 40: 
            break;
    }
}
window.onkeyup = function (e){
    switch(e.keyCode){
        case 37: 
            accelerationX = 0;
            break;
        case 38: 
            break;
        case 39: 
            accelerationX = 0;
            break;
        case 40: 
            break;
    }
}

function update(){
        velocityX += accelerationX;
        velocityX *= 0.9

        playerX += velocityX;
        if(playerY >= canvas.height - playerHeight && velocityY != -10) {
            playerY = canvas.height - playerHeight;
            velocityY = 0;
        }
        else{
            playerY += velocityY++;
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
