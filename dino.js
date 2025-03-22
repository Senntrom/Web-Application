const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const retryBtn = document.getElementById("retry-btn");
const returnBtn = document.getElementById("return-btn");
const gameOverMessage = document.getElementById("game-over");

let isGameOver = false;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
const scoreDisplay = document.createElement("div");
const highScoreDisplay = document.createElement("div");

scoreDisplay.id = "score";
highScoreDisplay.id = "high-score";
scoreDisplay.textContent = `Score: ${score}`;
highScoreDisplay.textContent = `High Score: ${highScore}`;
document.body.appendChild(scoreDisplay);
document.body.appendChild(highScoreDisplay);

function jump() {
    if (!dino.classList.contains("jump") && !isGameOver) {
        dino.classList.add("jump");

        setTimeout(() => {
            dino.classList.remove("jump");
        }, 300);
    }
}

let isAlive = setInterval(() => {
    if (isGameOver) return;

    // Get current dino Y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

    // Get current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Detect collision
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        isGameOver = true;
        gameOver();
    } else if (!isGameOver) {
        // Increment score if no collision
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
}, 100);

function gameOver() {
    cactus.style.animationPlayState = "paused";
    gameOverMessage.style.display = "block";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

retryBtn.addEventListener("click", () => {
    isGameOver = false;
    gameOverMessage.style.display = "none";
    cactus.style.animation = "none";

    // Reset score
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;

    setTimeout(() => {
        cactus.style.animation = "block 1s infinite linear";
    }, 0);
});

returnBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

document.addEventListener("keydown", jump);