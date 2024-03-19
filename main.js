let g;
let steps = 0;
function setup(){
  c = createCanvas();
  g = createGraphics(1, 1);
  colorMode(HSB, 1, 1, 1);
  g.colorMode(HSB, 1, 1, 1);
  windowResized();
}

function draw(){
  
  for (let j = 0; j < 8; j++){
    if (c && steps < 100){
      for (let i = 0; i < height; i++){
        let a = (i/height)*TAU;
        let x = noise(steps*100, cos(a)*height/2000.0+1000.0, sin(a)*height/200.0+1000.0)*100.0;
        g.image(c, x, i, width, 1, 0, i, width, 1);
        g.image(c, x-width, i, width, 1, 0, i, width, 1);
      }

      image(g, 0, 0);

      for (let i = 0; i < width; i++){
        let a = (i/width)*TAU;
        let y = noise(steps*100, cos(a)*width/2000.0+1000.0, sin(a)*width/200.0+1000.0)*100.0;
        g.image(c, i, y, 1, height, i, 0, 1, height);
        g.image(c, i, y-height, 1, height, i, 0, 1, height);
      }

      image(g, 0, 0);
      steps++;
    }
    if (steps == 100){
      g.image(c, 0, 0);
      g.fill(0, random(.3, .7));
      g.noStroke();
      g.rect(0, 0, width, height);
      blendMode(ADD);
      image(g, 0, 0);
      blendMode(BLEND);
      steps++;
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  g.resizeCanvas(width, height);
  
  steps = 0;
  noiseSeed(random()*1000);
  
  for (let i = 0; i < width; i++){
    let amt = i/width;
    amt = (amt*3 + .5);
    amt %= 1;
    amt = sin(amt*PI);
    stroke(i/width, 1, lerp(.78, 1, amt));
    //stroke(amt);
    line(i, 0, i, height);
  }
  
  noStroke();
  let size = random(200, 500);
  for (let i = 0; i < 100; i++){
    fill(random(), random(), random(), .9);
    rect(random(width), random(height), random(size), random(size));
  }
}

function mousePressed(evt){
  if (evt.button == 2) return;
  windowResized();
}