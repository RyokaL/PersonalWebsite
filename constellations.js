//TODO: Add glow effect
//TODO: Maybe change looping?
//TODO: Add smaller white background stars

var ttlCanvas = document.getElementById("title");
var ttlContext = ttlCanvas.getContext("2d");

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var mobile = window.mobileCheck();

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
  if(mobile) {
    radius = 5 * Math.random() + 3;
  }
};

function constDraw(ctx, toDraw) {
  ctx.fillStyle = toDraw.colour;
  ctx.strokeStyle = toDraw.colour;
  ctx.lineWidth = 1;
  if(mobile) {
    ctx.lineWidth = 2;
  }
  
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
  if(mobile) {
    constelNum = Math.floor(Math.random() * 20) + 10;
  }
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