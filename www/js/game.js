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
	indexOfMovedBomb = -1;
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
		number : Math.floor(Math.random()*(20-1+1)+1),
		dragged : false
	};

	this.bombs.push(bomb);
	
	bomb.img.onload = function() {
        ctx.drawImage(bomb.img, 0, 200);
        ctx.fillText(""+bomb.number, 0, 200);
    };

    bomb.img.src = "img/Twirl1.png";
    bomb.img.draggable = "true";
	};
	
};

var moveBombs = function(){
	var bomb;
	for(i=0; i<bombs.length; i++){
		bomb = bombs[i];
		if (bomb.x>=800){
			bombs.splice(i,1);
		}
		else if (bomb.x>=0 && !bomb.dragged){
			bomb.x = bomb.x+2;
			this.ctx.drawImage(bomb.img, bomb.x, bomb.y);
			this.ctx.fillText(""+bomb.number, bomb.x+25, bomb.y+55);
		}
		else if (bomb.x>=0 && bomb.dragged){
			if(!dragging){
				//console.log("what");
				bomb.dragged = false;
			}
		}
	}
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
	//mouseX = e.layerX;
	//mouseY = e.pageY;
	console.log(bombs);
	console.log("halla");
	for(i=0; i<bombs.length; i++){
		console.log("bombX: " + bombs[i].x)
		console.log("mouseX: " + mouseX)
		console.log(Math.pow((bombs[i].y-mouseY),2))
		distance = Math.sqrt(Math.pow((bombs[i].x-mouseX),2)+Math.pow((bombs[i].y-mouseY),2));
		console.log("distance: "+distance)
		if(distance < closestDistance){
			closestDistance = distance;
			moveBomb = bombs[i];
			indexOfMovedBomb = i;
		}
		moveBomb.dragged = true;
	};
};

var inFirstField = function(){
	return (moveBomb.x>60 && moveBomb.x<200 && moveBomb.y>0 && moveBomb.y<150);
}

var inSecondField = function(){
	return (moveBomb.x>350 && moveBomb.x<500 && moveBomb.y>0 && moveBomb.y<150);
}

var inThirdField = function(){
	return (moveBomb.x>60 && moveBomb.x<200 && moveBomb.y>330 && moveBomb.y<480);
}

var inFourthField = function(){
	return (moveBomb.x>350 && moveBomb.x<500 && moveBomb.y>330 && moveBomb.y<480);
}

var calculateField = function(fieldNumber){
	if(moveBomb.number % fieldNumber == 0){
		console.log("Hurray!");
	}
	else{
		console.log("ya lost m8");
	}
}

var myUp = function(){
	dragging = false;
	if(inFirstField()){
		calculateField(1);
		bombs.splice(indexOfMovedBomb,1);
	}
	else if(inSecondField()){
		calculateField(2);
		bombs.splice(indexOfMovedBomb,1);
	}
	else if(inThirdField()){
		calculateField(5);
		bombs.splice(indexOfMovedBomb,1);
	}
	else if(inFourthField()){
		calculateField(7);
		bombs.splice(indexOfMovedBomb,1);
	}
	//console.log("jada")
	if(moveBomb!=null){
		moveBomb.dragged = false;
		//console.log(moveBomb.x)
		moveBomb = null;
	}
};

var dragBomb = function(){
	if(dragging && moveBomb){
		//console.log(mouseX);
		//moveBomb.x = mouseX+c.offsetLeft;
		//moveBomb.y = mouseY+c.offsetRight;
		moveBomb.x = mouseX - 25;
		moveBomb.y = mouseY - 55;
		this.ctx.drawImage(moveBomb.img, moveBomb.x, moveBomb.y);
		this.ctx.fillText(""+moveBomb.number, moveBomb.x+25, moveBomb.y+55);
	}
};

function setMousePosition(e)
{
    if(e.offsetX) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
    }
    else if(e.layerX) {
        this.mouseX = e.layerX;
        this.mouseY = e.layerY;
    }

    console.log(this.mouseY);
}

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
