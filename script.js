var canvas = document.getElementById("game"); //get the canvas
var ctx = canvas.getContext("2d"); //get the context of the canvas
function runFrame(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; //set canvas size to the size of the window
    ctx.fillStyle = "#778899";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var interval = setInterval(runFrame,1000/60); // run the function 'runFrame' every 60th of a second