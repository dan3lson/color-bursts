// Capture the count of red circles clicked
var red_circle_count = 0;
var lives = 3;
// Add the new shapes to this container
var shapeContainer = _("shapeContainer");

play();

function play() {
	_("easy").onclick=function(){
		startGame(1);
	};

	_("medium").onclick=function(){
		startGame(20);
	};

	_("hard").onclick=function(){
		startGame(30);
	};

	_("impossible").onclick=function(){
		startGame(150);
	};
}

function startGame(levelOfDifficulty) {
	_("introHeader").style.display = "none";
	document.body.style.background = "#FFF";
	_("gameHeader").style.display = "block";
	_("score").innerHTML = red_circle_count;
	_("lives").innerHTML = lives;
	_("homeIcon").onclick=function(){
		location.reload();
	};
	// Display the shapes at the beginning of the game
	for (var i = 0; i < levelOfDifficulty; i++) {		
		setInterval(function(){
			displayShapes();			
		}, 300);
	};
}



function displayShapes() {
	var newShape = document.createElement("div");
	newShape.id = "newShape";

	shapeContainer.appendChild(newShape);
	
	var totalShapes = shapeContainer.getElementsByTagName("div").length;
	var redShapes = totalShapes - 1;
			
	// Create the new shape and give it properties
		// Shape size 
	newShape.style.width = "33px";
	newShape.style.height = "33px";
		// Roundness
	newShape.style.borderRadius = "33px";
		// Color
			// var shape_colors = ["red", "blue", "brown", "purple", "gold", "black", "green", "pink", "orange", "gray"];
	var shape_colors = ["rgb(255, 19, 0)", "#007AFF", "#5856D6", "#FFCC00", "#1F1F21", "#4CD964", "#FF4981", "#FF9500", "#BDBEC2"];
	var random_shape_number = randomRange(9,0);
	newShape.style.background = shape_colors[random_shape_number];
		// Random position
	var position_width = randomRange(window.innerWidth, 0) + "px";
	var position_height = randomRange(window.innerHeight, 0) + "px";
	newShape.style.left = position_width;
	newShape.style.top = position_height;
	newShape.style.position = "absolute";
				
	newShape.onclick=function() {
		// If a red circle is clicked, increase the count by one and vice versa				
		if(newShape.style.background == "rgb(255, 19, 0)"){
			red_circle_count++;
			_("score").innerHTML = red_circle_count;
			if (red_circle_count == 7) {
				_("shapeContainer").style.display = "none";
				_("gameResult").innerHTML = "You win :)";
				_("endOfGame").style.display = "block";
				
				setInterval(function(){
					location.reload();
				},2300);
			}
		} else{
			lives--;
			_("lives").innerHTML = lives;
			if (lives == 0) {
				_("shapeContainer").style.display = "none";
				_("gameResult").innerHTML = "You lose :(";
				_("endOfGame").style.display = "block";
				
				setInterval(function(){
					location.reload();
				},2300);
			}
		};
	
		console.log("Red circle count", red_circle_count);
		console.log("Lives: ", lives);
		
		var totalShapes = shapeContainer.getElementsByTagName("div");

		for (var i = 0; i < totalShapes.length; i++) {
			// Randomize the position of the shape
			var width = randomRange(window.innerWidth, 0) + "px";
			var height = randomRange(window.innerHeight, 0) + "px";
			totalShapes[i].style.left = width;
			totalShapes[i].style.top = height;
			totalShapes[i].style.position = "absolute";
			
			// var shape_colors = ["red", "blue", "brown", "purple", "gold", "black", "green", "pink", "orange", "gray"];
			var shape_colors = ["rgb(255, 19, 0)", "#007AFF", "#5856D6", "#FFCC00", "#1F1F21", "#4CD964", "#FF4981", "#FF9500", "#BDBEC2"];
			var random_shape_number = randomRange(9,0);
			totalShapes[i].style.background = shape_colors[random_shape_number];
		};	

	};	
};	

function displayEndOfGame() {
	// body...
}


function randomRange (x,y) {
	return Math.floor(Math.random()* (x-y) + y);
};		

function rgbValue() {
	return randomRange(255,0);
};

function randomRadius() {
	var borderRadiusOptions = ["0px", "75px"];
	var randomRadius = borderRadiusOptions[randomRange(2,0)]; 
	
	return randomRadius;
}

// Shortcut for retrieving an element's ID
function _(x) {
	return document.getElementById(x);
}