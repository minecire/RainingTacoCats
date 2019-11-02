var canvas = document.getElementById("game"); //get the canvas
var ctx = canvas.getContext("2d"); //get the context of the canvas
var frame = 0;
var prevFrame = 0;
var cats = [];
function runFrame(){
    if((Math.random()*100 > 30 && frame-prevFrame > 2) || frame-prevFrame > 6){
        cats.push(new cat(Math.random()*canvas.width,Math.random()*40+10 , Math.round(Math.random()*10)));
        prevFrame = frame;
    }
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; //set canvas size to the size of the window
    ctx.fillStyle = "#778899";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < cats.length; i++){
        cats[i].displayCat();
        cats[i].update();
    }
    frame++;
}

var interval = setInterval(runFrame,1000/60); // run the function 'runFrame' every 60th of a second

class cat{
    constructor(xPos, cLength, animOffset){
        this.animationOffset = animOffset;
        this.x = xPos;
        this.cycleLength = cLength;
        this.y = 0;
        this.yv = 3;
        this.state = "falling";
    }
    displayCat(){
        ctx.translate(this.x, this.y);
        ctx.rotate((frame + this.animationOffset) / this.cycleLength);
        if (Math.round((frame+this.animationOffset) / 10) % 4 == 0) {
            ctx.drawImage(document.getElementById("cat1"), -45, -35, 90, 70);
        } else if (Math.round((frame + this.animationOffset) / 10) % 4 == 2) {
            ctx.drawImage(document.getElementById("cat3"), -45, -35, 90, 70);
        } else {
            ctx.drawImage(document.getElementById("cat2"), -45, -35, 90, 70);
        }
        ctx.rotate(-(frame + this.animationOffset) / this.cycleLength);
        ctx.translate(-this.x, -this.y);
    }
    update(){
        this.y += this.yv;
        this.yv += 0.3;
    }
}