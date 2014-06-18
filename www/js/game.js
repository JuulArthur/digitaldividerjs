var width = 800, 
	height = 480,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');

	c.width = width;
	c.height = height;
	bombs = [];
	minRandom = 0;
	dragging = false;
	moveBomb = null;
	mouseX = 0;
	mouseY = 0;


var clear = function(){
	ctx.clearRect(0,0,this.width, this.height);
}

var drawBomb = function(){

	//var img = new Image();

	var randNumber = Math.random() * (1000 - this.minRandom) + minRandom;

	if (randNumber>995){
	var bomb = {
		img : new Image(),
		x : 0,
		y : 200,
		dragged : false
	};

	this.bombs.push(bomb);
	
	bomb.img.onload = function() {
        ctx.drawImage(bomb.img, 0, 200);
        ctx.fillText("1", 0, 200);
    };

    bomb.img.src = "img/Twirl1.png";
    bomb.img.draggable = "true";
	};
	
};

var moveBombs = function(){
	var bomb;
	this.bombs.forEach(function(bomb){
		if (bomb.x>=0 && !bomb.dragged){
			bomb.x = bomb.x+2;
			this.ctx.drawImage(bomb.img, bomb.x, bomb.y);
			this.ctx.fillText("7", bomb.x+25, bomb.y+55);
		}
		else if (bomb.x>=0 && bomb.dragged){
			if(!dragging){
				console.log("what");
				bomb.dragged = false;
			}
		}
	});
};

var background = new (function(){
	var that = this;
	that.image = new Image();

	that.image.src = "img/BG.jpg"


	that.draw = function(){
		try {
			ctx.drawImage(that.image, 0, 0);
		} 
		catch (e) {
		};
	
	}
})();

var myDown = function(e){
	dragging = true;
	closestDistance = 99999;
	var distance = 0;
	mouseX = e.layerX;
	mouseY = e.pageY;
	bombs.forEach(function(bomb){
		distance = (bomb.x-mouseX)^2+(bomb.y-mouseY)^2;
		if(distance < closestDistance){
			closestDistance = distance;
			moveBomb = bomb;
		}
	moveBomb.dragged = true;
	});
};

var myUp = function(){
	dragging = false;
	console.log("jada")
	if(moveBomb!=null){
		moveBomb.dragged = false;
		console.log(moveBomb.x)
		moveBomb = null;
	}
};

var dragBomb = function(){
	if(dragging && moveBomb){
		//console.log(mouseX);
		//moveBomb.x = mouseX+c.offsetLeft;
		//moveBomb.y = mouseY+c.offsetRight;
		moveBomb.x = moveBomb.x - 5;
		this.ctx.drawImage(moveBomb.img, moveBomb.x, moveBomb.y);
		this.ctx.fillText("7", moveBomb.x+25, moveBomb.y+55);
	}
};

c.onmousedown = myDown;
c.onmouseup = myUp;

var GameLoop = function(){
	clear();
	dragBomb();
	moveBombs();
	ctx.fillText("1",110,85);
	ctx.fillText("2",410,85);
	ctx.fillText("5",110,415);
	ctx.fillText("7",410,415);
	ctx.fillStyle= "white";
	ctx.font="30px Verdana";
	drawBomb();
	gLoop = setTimeout(GameLoop, 1000 / 50);
};

GameLoop();
