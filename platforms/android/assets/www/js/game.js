var width = 800, 
	height = 480,
	textc = document.getElementById('c'), 
	textcanvas = textc.getContext('2d');

	c.width = width;
	c.height = height;


var clear = function(){
	ctx.fillStyle = '#d0e7f9';
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
}

var bomb = new (function(){
	var that = this;
	that.img = new Image();
	that.img.src = "img/Fields.png";

	that.draw = function(){
		try {
			ctx.drawImage(that.img, 0, 0);
		}
		catch(e){

		};
	}
})();

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
	//clear();
	//bomb.draw();
	textcanvas.fillText("1",110,85);
	textcanvas.fillText("2",410,85);
	textcanvas.fillText("5",110,415);
	textcanvas.fillText("7",410,415);
	textcanvas.fillStyle= "white";
	textcanvas.font="35px Verdana";
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
