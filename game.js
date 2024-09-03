const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dino = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    color: 'black',
    dy: 0,
    gravity: 1,
    jumpPower: 15,
    jumping: false
};

const cactus = {
    x: canvas.width,
    y: 300,
    width: 20,
    height: 50,
    color: 'black',
    speed: 6
};

let score = 0;

function drawDino() {
    ctx.fillStyle = dino.color;
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawCactus() {
    ctx.fillStyle = cactus.color;
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dino gravity and jump logic
    if (dino.jumping) {
        dino.dy += dino.gravity;
        dino.y += dino.dy;

        if (dino.y >= 300) {
            dino.y = 300;
            dino.jumping = false;
            dino.dy = 0;
        }
    }

    // Move cactus
    cactus.x -= cactus.speed;
    if (cactus.x + cactus.width < 0) {
        cactus.x = canvas.width;
        score++;
    }

    // Collision detection
    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        alert('Game Over! Score: ' + score);
        cactus.x = canvas.width;
        score = 0;
    }

    drawDino();
    drawCactus();
    
    requestAnimationFrame(update);
}

function jump() {
    if (!dino.jumping) {
        dino.jumping = true;
        dino.dy = -dino.jumpPower;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

update();
