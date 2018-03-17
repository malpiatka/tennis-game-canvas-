//variables
let canvas;
let canvasContext;

let ballX = 500;
let ballXSpeed = 1;
let ballY = 350;
let ballYSpeed = 1;

let paddle1Y =275;
let paddle2Y =275;
const paddleHeight =150;

//tracking mouse position
function mousePosition(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

//game window
window.onload = function () {
    canvas = document.getElementById('game');
    canvasContext = canvas.getContext('2d');
    setInterval(callBoth, 2);

    // calling draw and move elements at the same time
    function callBoth() {
        drawElements();
        moveElements();
    }

    //left and right paddle tracking mouse (Y axis)
    canvas.addEventListener('mousemove', function(event){
        let mousePos = mousePosition(event);
        //paddle center
        paddle1Y = mousePos.y -(paddleHeight/2);
        paddle2Y = mousePos.y -(paddleHeight/2);
    })
};

//create game elements
function drawElements() {
    //game window size and color
    canvasContext.fillStyle = 'rgb(47, 47, 47)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    //drawing left paddle
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(5, paddle1Y, 10, 150);
    //drawing right paddle
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(985, paddle2Y,10, 150);
    //drawing ball
    canvasContext.fillStyle = 'yellow';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    canvasContext.fill();
}
//bouncing the ball
function moveElements() {
    // ball reset when touch left or right side
    ballX = ballX + ballXSpeed;
    if (ballX > canvas.width){
        resetBall();
    }
    if (ballX <0){
        resetBall();
    }
    //Y axis first ball bounce
    ballY = ballY + ballYSpeed;
    if (ballY > canvas.height){
        ballYSpeed = -ballYSpeed;
    }
    // Y axis bounce back ( -(-ballYSpeed)= ballYSpeed)
    if (ballY < 0){
        ballYSpeed = -ballYSpeed;
    }
}
//reset ball and switch the ball's direction each time it's scored
function resetBall() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballXSpeed = -ballXSpeed;
}

