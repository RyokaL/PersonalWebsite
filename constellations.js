//TODO: Add glow effect
//TODO: Maybe change looping?
//TODO: Add smaller white background stars

var ttlCanvas = document.getElementById("title");
var ttlContext = ttlCanvas.getContext("2d");

//Fix_DPI method found online
//get DPI
let dpi = window.devicePixelRatio;

function fix_dpi() {
//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(ttlCanvas).getPropertyValue("height").slice(0, -2);
//get CSS width
let style_width = +getComputedStyle(ttlCanvas).getPropertyValue("width").slice(0, -2);
//scale the canvas
ttlCanvas.setAttribute('height', style_height * dpi);
ttlCanvas.setAttribute('width', style_width * dpi);
}


function randomColour() {
  var r = 0;
  var g = 0;
  var b = 0;
  
  r = Math.floor(50 + Math.random() * 206);
  g = Math.floor(50 + Math.random() * 206);
  b = Math.floor(50 + Math.random() * 206);
  
  return "rgb(" + r + "," + g + "," + b + ")";
}

var constel = [];

Constellation = function() {
  this.stars = [];
  this.connect = [];
  this.colour = randomColour();
  this.vx = 0.01 + Math.random() * .5;
  if(Math.random() * 100 >= 50) {
    this.vx = -this.vx;
  }
  this.vy = 0;
};

Star = function(minX, maxX, minY, maxY) {
  this.x = minX + Math.random() * (maxX - minX);
  this.y = minY + Math.random() * (maxY - minY);
  this.absX = this.x;
  this.absY = this.y;
  this.radius = 3 * Math.random() + 2;
};

function constDraw(ctx, toDraw) {
  ctx.fillStyle = toDraw.colour;
  ctx.strokeStyle = toDraw.colour;
  ctx.lineWidth = 1;
  
  var currStar;
  for(var i = 0; i < toDraw.stars.length; i++) {
    currStar = toDraw.stars[i];
    ctx.beginPath();
    ctx.arc(currStar.x, currStar.y, currStar.radius, 0, (2 * Math.PI));
    ctx.closePath();
    ctx.fill();
  }
  
  for(var j = 0; j < toDraw.connect.length; j++) {
    var p1 = toDraw.stars[toDraw.connect[j][0]];
    var p2 = toDraw.stars[toDraw.connect[j][1]];
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
  }
};

Constellation.prototype.update = function() {
  var totalOff = 0;
  for(var i = 0; i < this.stars.length; i++) {
    var currStar = this.stars[i];
    currStar.x += this.vx;
    currStar.y += this.vy;

    if(this.vx <= 0 && currStar.x < currStar.radius) {
        totalOff += 1;
    }
    else if(this.vx >= 0 && currStar.x > ttlCanvas.width - currStar.radius){
        totalOff += 1;
    }
  }
  
  // console.log(totalOff);

  if(totalOff == this.stars.length) {
    for(var j = 0; j < this.stars.length; j++) {
        var curr = this.stars[j];
        if(this.vx < 0) {
            curr.x = ttlCanvas.width + curr.absX/2;
        }
        else {
            curr.x = 0 - curr.absX/2;
        }
        // console.log(curr);
    }
  }
  
};

function starLoop() {
  fix_dpi();
  ttlContext.clearRect(0, 0, ttlCanvas.width, ttlCanvas.height);
  for(var i = 0; i < constel.length; i++) {
    constDraw(ttlContext, constel[i]);
    constel[i].update();
  }
  requestAnimationFrame(starLoop);
}

function genConstel() {
  var constelNum = Math.floor(Math.random() * 75) + 25;
  var starNum;
  var currConstel;
      
  for(var i = 0; i < constelNum; i++) {
    starNum = Math.floor(Math.random() * 4) + 2;
    currConstel = new Constellation();
    
    var x1 = Number.MAX_SAFE_INTEGER; var x2 = 0;
    while(Math.abs(x1-x2) > 0.3 * ttlCanvas.width) {
      x1 = ttlCanvas.width * Math.random();
      x2 = ttlCanvas.width * Math.random();
    }
    var temp;
    temp = x2;
    x2 = Math.max(x1, x2);
    x1 = Math.min(x1, temp);

    var y1 = Number.MAX_SAFE_INTEGER; var y2 = 0;
    while(Math.abs(y1-y2) > (0.5 * (ttlCanvas.height) / 4)) {
      y1 = ttlCanvas.height * Math.random();
      y2 = ttlCanvas.height * Math.random();
    }
    temp = y2;
    y2 = Math.max(y1, y2);
    y1 = Math.min(y1, temp);
    
    for(var j = 0; j < starNum; j++) {
       
      var nextStar = new Star(x1,x2,y1,y2);
      currConstel.stars.push(nextStar);
      
    }
    var certianConnect;
    for(var k = 0; k < currConstel.stars.length; k++) {
      certainConnect = k;
      if(currConstel.stars.length === 1) {
        break;
      }
      while(certainConnect === k) {
        certainConnect = Math.floor(Math.random() * (currConstel.stars.length));
      }

      currConstel.connect.push([k, certainConnect]);
      for(var l = 0; l < currConstel.stars.length; l++) {
        if(l !== certainConnect && Math.random() * 100 > 99) {
           currConstel.connect.push([k, l]);
        }
      }
    }
    constel.push(currConstel);
  }
}
fix_dpi();
genConstel();
starLoop();