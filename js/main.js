/***********************************
**********GLOBAL VARIABLES**********
***********************************/

var myCanvas = document.getElementById('myCanvas');
var myCanvasContext = myCanvas.getContext('2d');

var playerX, playerY, playerML = false, playerMR = false, playerMF = false, playerMB = false;

var keyState = {};

var elapsed = 15;
var shots = [];


/***********************************
***********EVENT HANDLERS***********
***********************************/


window.addEventListener( 'keydown', function( event ){
	keyState[ event.keyCode || e.which ] = true;
}, true);

window.addEventListener( 'keyup', function( event ){
	keyState[ event.keyCode || e.which ] = false;
}, true);


/***********************************
*************FUNCTIONS**************
***********************************/


function drawBorders(){
	myCanvasContext.strokeStyle = "black";
	myCanvasContext.clearRect( 0, 0, myCanvas.width, myCanvas.height );
	myCanvasContext.beginPath();
	myCanvasContext.moveTo( 0,              0               );
	myCanvasContext.lineTo( 0,              myCanvas.height );
	myCanvasContext.lineTo( myCanvas.width, myCanvas.height );
	myCanvasContext.lineTo( myCanvas.width, 0               );
	myCanvasContext.lineTo( 0,              0               );
	myCanvasContext.stroke();
}

function drawPlayer(){
	var lx = -10, ly = 10, rx = 10, ry = 10, fx = 0; fy = -20, flameSize = 7;
	if(       playerML ){
		lx = -8;
		ly =  8;
		rx =  8;
		ry = 12;
	}else if( playerMR ){
		lx = -8;
		ly = 12;
		rx =  8;
		ry =  8;
	}
	if(       playerMB ){
		flameSize = 3;
	}
	if(       playerMF ){
		flameSize = 15;
	}
	
	//DRAW BODY
	myCanvasContext.beginPath();
	myCanvasContext.moveTo( playerX+fx, playerY-25 );
	myCanvasContext.lineTo( playerX+fx, playerY+fy );
	myCanvasContext.lineTo( playerX+lx, playerY+ly );
	myCanvasContext.lineTo( playerX+rx, playerY+ry );
	myCanvasContext.lineTo( playerX+fx, playerY+fy );
	myCanvasContext.stroke();
	
	//DRAW FLAMES
	myCanvasContext.strokeStyle = "red";
	
	myCanvasContext.beginPath();
	
	myCanvasContext.moveTo( playerX,      playerY+10 );
	myCanvasContext.lineTo( playerX,      playerY+15 + Math.random()*flameSize );
	
	myCanvasContext.moveTo( playerX-3,    playerY+10 );
	myCanvasContext.lineTo( playerX-3,    playerY+15 + Math.random()*flameSize );
	
	myCanvasContext.moveTo( playerX-6,    playerY+10 );
	myCanvasContext.lineTo( playerX-6,    playerY+15 + Math.random()*flameSize );
	
	myCanvasContext.moveTo( playerX+3,    playerY+10 );
	myCanvasContext.lineTo( playerX+3,    playerY+15 + Math.random()*flameSize );
	
	myCanvasContext.moveTo( playerX+6,    playerY+10 );
	myCanvasContext.lineTo( playerX+6,    playerY+15 + Math.random()*flameSize );
	
	myCanvasContext.stroke();
	
	myCanvasContext.strokeStyle = "black";
}

function drawShoots(){
	if( shots.length > 0 && shots[0].y < 2 ){
		shots.splice( 0,1 );
	}
	myCanvasContext.fillStyle = "purple";
	for( shot of shots ){
		myCanvasContext.beginPath();
		myCanvasContext.arc(shot.x, shot.y, 2, 0, 2*Math.PI);
		myCanvasContext.fill();
	}
	moveShots();
}

function moveShots(){
	for( shot of shots ){
		shot.y -= 5;
	}
}

function setCanvasSize(){
	myCanvasContext.canvas.width  = 600;
	myCanvasContext.canvas.height = 600;
}

function setPlayerPos(){
	if( ( keyState[37] || keyState[65] ) && playerX > 10   && !( keyState[39] || keyState[68] ) ){
		playerX  -= 3;
		playerML  = true;
	}else{
		playerML  = false;
	}
	if( ( keyState[39] || keyState[68] ) && playerX < 590  && !( keyState[37] || keyState[65] ) ){
		playerX  += 3;
		playerMR  = true;
	}else{
		playerMR  = false;
	}
	if( ( keyState[38] || keyState[87] ) && playerY > 20   && !( keyState[40] || keyState[83] ) ){
		playerY  -= 3;
		playerMF  = true;
	}else{
		playerMF  = false;
	}
	if( ( keyState[40] || keyState[83] ) && playerY < 580  && !( keyState[38] || keyState[87] ) ){
		playerY  += 2;
		playerMB  = true;
	}else{
		playerMB  = false;
	}
}

function playerShoot(){
	if( elapsed >= 15 ){
		shots.push(createShot());
		elapsed = 0;
	}
}

function createShot(){
	return{
		x: playerX,
		y: playerY-25
	};
}

function init(){
	myCanvasContext.strokeStyle = "black";
	setCanvasSize();
	initPlayer();
	play();
}

function initPlayer(){
	playerX = myCanvas.width  / 2;
	playerY = myCanvas.height - 50;
}

function play(){
	setPlayerPos();
	drawBorders();
	drawPlayer();
	playerShoot();
	drawShoots();
	elapsed += 1;
	setTimeout(play, 15);
}


/***********************************
**************MAIN******************
***********************************/

init();