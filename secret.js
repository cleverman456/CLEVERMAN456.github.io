const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200;
let width, height;
let mouse = { x: 0, y: 0 };

// Resize canvas to full screen
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create stars
function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * 360
    });
  }
}
createStars();

// Track mouse movement
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Update stars
function updateStars() {
  for (let star of stars) {
    star.y += star.speed;
    star.x += Math.sin((mouse.x / width - 0.5) * 4) * 0.3;

    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
  }
}

// Draw stars
function drawStars() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Animation loop
function animate() {
  updateStars();
  drawStars();
  requestAnimationFrame(animate);
}
animate();
