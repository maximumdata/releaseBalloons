var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    bg = document.getElementById('bg'),
    balloonEl = document.getElementById('balloon'),
    balloons = [],
    Balloon = function(x, y){
      this.x = x;
      this.y = y;
      this.created = Date.now();
    };

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


canvas.addEventListener('click', function(e) {
  balloons.push(new Balloon(e.clientX, e.clientY));

});

function drawLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bg, 0, 0 );
  for(var i = 0; i < balloons.length; i++) {
    var x = balloons[i].x;
    var y = balloons[i].y;
    var timeSinceCreation = Date.now() - balloons[i].created;
    context.drawImage(balloonEl, x, y);
    if(timeSinceCreation < 500) {
      balloons[i].y -= 4;
    } else if(timeSinceCreation >= 500 && timeSinceCreation < 1000) {
      balloons[i].y -= 5;
    } else if(timeSinceCreation >= 1000) {
      balloons[i].y -= 7;
    }

    if(y <= -151) {
      balloons.splice(i, 1);
    }

  }
  requestAnimationFrame(drawLoop);
}

drawLoop();
