var width = 800, 
	height = 480,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');

	c.width = width;
	c.height = height;
	bombs = [];
	minRandom = 0;


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
		y : 200
	};

	this.bombs.push(bomb);
	
	bomb.img.onload = function() {
        ctx.drawImage(bomb.img, 0, 200);
    };

    bomb.img.src = "img/Twirl1.png";
    bomb.img.draggable = "true";
	};
	
};

var moveBombs = function(){
	var bomb;
	this.bombs.forEach(function(bomb){
		if (bomb.x>=0){
			bomb.x = bomb.x+2;
			this.ctx.drawImage(bomb.img, bomb.x, bomb.y);
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

var GameLoop = function(){
	clear();
	moveBombs();
	ctx.fillText("1",110,85);
	ctx.fillText("2",410,85);
	ctx.fillText("5",110,415);
	ctx.fillText("7",410,415);
	ctx.fillStyle= "white";
	ctx.font="35px Verdana";
	drawBomb();
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
