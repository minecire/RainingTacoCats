var canvas = document.getElementById("game"); //get the canvas
var ctx = canvas.getContext("2d"); //get the context of the canvas
var frame = 0;
var prevFrame = 0;
var score = 0;
var highscore = -1;
var prevscore = -1;
var lives = 9;
var bedIdeal = window.innerWidth/2;
var bedX = window.innerWidth/2;
var cats = [];
var raindrops = [];
var screen = "splash";
function runFrame(){
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; //set canvas size to the size of the window
    if(screen == "game"){
        bedX = (bedX*9+bedIdeal)/10;
        document.onmousemove = function(event){
            bedIdeal = event.pageX;
        }
        for(var i = 0; i < Math.random()*5+5; i++){
            raindrops.push(new raindrop(Math.random()*canvas.width,Math.random()*40+10 , Math.round(Math.random()*10)));
        }
        if((Math.random()*100 > 3 && frame-prevFrame > 20) || frame-prevFrame > 60){
            cats.push(new cat(Math.random()*canvas.width,Math.random()*40+10 , Math.round(Math.random()*10)));
            prevFrame = frame;
        }
        
        ctx.fillStyle = "#778899";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < raindrops.length; i++){
            raindrops[i].display();
            if(raindrops[i].update()){
                var raindrops2 = [];
                for(var j = 0; j < raindrops.length; j++){
                    if(j != i){
                        raindrops2.push(raindrops[j]);
                    }
                }
                raindrops = raindrops2;
                i--;
            }
        }
        for(var i = 0; i < cats.length; i++){
            cats[i].displayCat();
            if(cats[i].updateCat()){
                var cats2 = [];
                for(var j = 0; j < cats.length; j++){
                    if(j != i){
                        cats2.push(cats[j]);
                    }
                }
                cats = cats2;
                i--;
                if(lives <= 0){
                    screen = "splash";
                    cats = [];
                    raindrops = [];
                    frame = 0;
                    prevFrame = 0;
                    lives = 9;
                    prevscore = score;
                    if(score > highscore){
                        highscore = score;
                    }
                }
            }
        }
        ctx.drawImage(document.getElementById("bed"), bedX-90, canvas.height*0.8);
        ctx.font = "80px Courier New bold";
        ctx.fillStyle = "#000000";
        ctx.fillText(score, canvas.width/2, canvas.height*0.1);
        for(var i = 0; i < lives; i++){
            ctx.drawImage(document.getElementById("life"), 50+i*50, 50);
        }
        frame++;
    }
    if(screen == "splash"){
        ctx.fillStyle = "#778899";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < raindrops.length; i++){
            raindrops[i].display();
            if(raindrops[i].update()){
                var raindrops2 = [];
                for(var j = 0; j < raindrops.length; j++){
                    if(j != i){
                        raindrops2.push(raindrops[j]);
                    }
                }
                raindrops = raindrops2;
                i--;
            }
        }
        for(var i = 0; i < Math.random()*5+5; i++){
            raindrops.push(new raindrop(Math.random()*canvas.width,Math.random()*40+10 , Math.round(Math.random()*10)));
        }
        ctx.fillStyle = "#663300";
        ctx.fillRect(0,0,canvas.width, 200);
        ctx.fillRect(0,0,100,canvas.height);
        ctx.fillRect(340,0,canvas.width-680, canvas.height);
        ctx.fillRect(canvas.width-100, 0, 100, canvas.height);
        ctx.fillRect(0, 540, canvas.width, canvas.height-540);
        ctx.drawImage(document.getElementById("window"), 100, 200);
        ctx.drawImage(document.getElementById("window"), canvas.width-340, 200);
        ctx.drawImage(document.getElementById("home"), canvas.width/2-400, canvas.height/2-240);
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.font = "80px Courier New bold";
        ctx.fillText("It's Raining Tacocats!", canvas.width/2, canvas.height*0.1);
        
        if(prevscore != -1){
            ctx.font = "40px Courier New bold";
            ctx.fillText('Previous Score', canvas.width*0.11, canvas.height*0.9);
            ctx.fillText(prevscore, canvas.width*0.11, canvas.height*0.9+40);
            ctx.fillText('High Score', canvas.width*0.89, canvas.height*0.9);
            ctx.fillText(highscore, canvas.width*0.89, canvas.height*0.9+40);
            ctx.font = "80px Courier New bold";
            ctx.fillText("Press any key to play again", canvas.width/2, canvas.height*0.8);
        }
        else{
            ctx.font = "80px Courier New bold";
            ctx.fillText("Press any key to begin", canvas.width/2, canvas.height*0.8);
        }
        document.onkeydown = function(){screen = "game";};
    }
}

var interval = setInterval(runFrame,1000/60); // run the function 'runFrame' every 60th of a second

class raindrop{
    constructor(xPos, cLength, animOffset) {
        this.animationOffset = animOffset;
        this.x = xPos;
        this.cycleLength = cLength;
        this.y = 0;
        this.yv = 3;
        this.state = "falling";
        this.height = Math.random()*100+50;
    }
    update(){
        this.y += this.yv;
        this.yv += 1;
        if(this.y > canvas.height+300){
            return true;
        }
    }
    display(){
        ctx.fillStyle = "#446688";
        ctx.fillRect(this.x, this.y, 2, this.height);
    }
}

class cat extends raindrop{
    
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
    updateCat(){
        this.y += this.yv;
        this.yv += 0.1;
        if(this.y > canvas.height+300){
            lives--;
            return true;
        }
        if(this.y > canvas.height*0.8-90 && this.y < canvas.height*0.8+190 && this.x < bedX + 270 && this.x > bedX - 90){
            score++;
            return true;
        }
    }
}