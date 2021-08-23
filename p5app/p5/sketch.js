let appbarOffset = document.getElementById("pk-appbar").offsetHeight;
let $width = document.body.clientWidth;
let $height = document.body.clientHeight - appbarOffset;

function setup() {
  createCanvas($width, $height);
}

function draw() {
  background(51);
}

// Update p5 canvas on window resize
function windowResized() {
  $width = document.body.clientWidth;
  $height = document.body.clientHeight - appbarOffset;
  resizeCanvas($width, $height);
}
