//canvas variables
let canvas;
let canvasContext;

//ball speed variables
let ballX = 500;
let ballXSpeed = 0.9;
let ballY = 350;
let ballYSpeed = 0.9;

//paddle variables
let paddle1Y = 275;
let paddle2Y = 275;
const paddleHeight = 150;
const paddleWidth = 10;

//score variables
let player1Score = 0;
let player2Score = 0;
let winScreen = false;
const WinScore = 3;


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
    });

    //restart game after click play again window
    canvas.addEventListener('mousedown', function () {
        if (WinScore === true) {
            player1Score = 0;
            player2Score = 0;
            winScreen = false;
        }
    })
};

//create game elements
function drawElements() {
    //game window size and color
    canvasContext.fillStyle = 'rgb(47, 47, 47)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    drawNet();
    //play again window
    if (winScreen === true) {
        canvasContext.font = '25px Arial';
        if (player1Score === WinScore) {
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(canvas.width / 2 - 140, canvas.height / 2 - 100, 280, 50);
            canvasContext.fillStyle = 'black';
            canvasContext.fillText('You Won!', canvas.width / 2 - 50, canvas.height / 2 - 65);
        } else {
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(canvas.width / 2 - 140, canvas.height / 2 - 100, 280, 50);
            canvasContext.fillStyle = 'black';
            canvasContext.fillText('Computer Won!', canvas.width / 2 - 90, canvas.height / 2 - 65);
        }
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(canvas.width / 2 - 90, canvas.height - 170, 180, 50);
        canvasContext.fillStyle = 'black';
        canvasContext.fillText('Play again', canvas.width / 2 - 55, canvas.height - 135);
        return;
    }
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
    //score area
    canvasContext.font = '25px Arial';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(player1Score, 200, 100);
    canvasContext.fillText(player2Score, (canvas.width - 200), 100);
}

//move game elements
function moveElements() {
    //moving PC paddle
    moveCompPaddle();
    // ball reset when touch left or right side
    ballX += ballXSpeed;
    if (ballX > (canvas.width - paddleWidth)) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballXSpeed = -ballXSpeed;
            //change ball speed when bounce
            let deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballYSpeed = deltaY * 0.02;
        } else {
            //add point and reset ball
            player1Score += 1; //before reset
            resetBall();
        }
    }
    if (ballX < (paddleWidth)) {
        //bouncing off the paddle
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballXSpeed = -ballXSpeed;
            //change ball speed when bounce
            let deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballYSpeed = deltaY * 0.02;
        } else {
            //add point and reset ball
            player2Score += 1; //before reset
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
    //reset score if player1 or player2 win
    if ((player1Score || player2Score) >= WinScore) {
        player1Score = 0;
        player2Score = 0;
        winScreen = true;
    }
}

function moveCompPaddle() {
    let paddle2YCenter = paddle2Y + (paddleHeight / 2);
    if (paddle2YCenter < ballY) {
        paddle2Y += 0.75;
    } else {
        paddle2Y -= 0.75;
    }
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(canvas.width / 2 - 1, i, 2, 30)
    }
}


