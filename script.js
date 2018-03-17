//variables
let canvas;
let canvasContext;

let ballX = 500;
let ballXSpeed = 1;
let ballY = 350;
let ballYSpeed = 1;

let paddle1Y = 275;
let paddle2Y = 275;
const paddleHeight = 150;
const paddleWidth = 10;

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
    canvas.addEventListener('mousemove', function (event) {
        let mousePos = mousePosition(event);
        //paddle center
        paddle1Y = mousePos.y - (paddleHeight / 2);
    })
};

//create game elements
function drawElements() {
    //game window size and color
    canvasContext.fillStyle = 'rgb(47, 47, 47)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    //drawing left player paddle
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    //drawing right computer paddle
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
    //drawing ball
    canvasContext.fillStyle = 'yellow';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
    canvasContext.fill();
}

//move game elements
function moveElements() {
    //moving PC paddle
    moveCompPaddle();
    drawNet();
    // ball reset when touch left or right side
    ballX += ballXSpeed;
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballXSpeed = -ballXSpeed;
        } else {
            resetBall();
        }
    }
    if (ballX < 0) {
        //bouncing off the paddle
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballXSpeed = -ballXSpeed;
        } else {
            resetBall();
        }
    }
    //Y axis ball bounce
    ballY += ballYSpeed;
    if (ballY > canvas.height) {
        ballYSpeed = -ballYSpeed;
    }
    if (ballY < 0) {
        ballYSpeed = -ballYSpeed;
    }
}

//reset ball and switch the ball's direction each time it's scored
function resetBall() {
    ballXSpeed = -ballXSpeed;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function moveCompPaddle() {
    let paddle2YCenter = paddle2Y + (paddleHeight / 2);
    if (paddle2YCenter < ballY) {
        paddle2Y += 1;
    } else {
        paddle2Y -= 1;
    }
}

function drawNet() {
    for (let i=0; i<canvas.height; i+=40){
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(canvas.width/2-1, i, 2, 30)
    }
}