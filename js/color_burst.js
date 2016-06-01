$(document).ready(function() {
	var redCircleCount = 0;
	var lives = 3;
	var $shapeContainer = $("#shape-container");
	var circleDimensions = "33px";
	var CORRECTCOLOR = "rgb(255, 19, 19)";

	$("#easy").click(function() {	startGame(3) });
	$("#medium").click(function() {	startGame(20) });
	$("#hard").click(function() {	startGame(40) });
	$("#impossible").click(function() {	startGame(175) });
	$("#home-button").click(reload);

	function startGame(levelOfDifficulty) {
		$("#introHeader").css("display", "none");
		$("body").css("background", "#FFF");
		$("#game-header").css("display", "block");
		$("#score").html(redCircleCount);
		$("#lives").html(lives);
		$("#home-icon").click(reload);
		createAllShapes(levelOfDifficulty);
	}

	function createAllShapes(levelOfDifficulty) {
		for (var i = 0; i < levelOfDifficulty; i++) {
			setInterval(displayShapes, 300);
		};
	}

	function displayShapes() {
		var $newShape = createCircle();
		$shapeContainer.append($newShape);
		var totalShapes = $shapeContainer.find("div").length;
		$newShape.css("left", positionWidth());
		$newShape.css("top", positionHeight());
		$newShape.css("position", "absolute");

		$newShape.click(function() {
			if($newShape.css("background-color") == CORRECTCOLOR) {
				redCircleCount++;
				$("#score").html(redCircleCount);
			} else {
				lives--;
				$("#lives").html(lives);
				determineIfLost(lives);
			};

			console.log("Red circle count", redCircleCount);
			console.log("Lives: ", lives);

			var totalShapes = $shapeContainer.find(".circle");
			console.log("Num circles", totalShapes.length);
			randomizeColor(totalShapes)
		});
	};

	function randomizeColor(shapes) {
		for (var i = 0; i < shapes.length; i++) {
			$(shapes[i]).css("background", randomColor);
		}
	}

	function determineIfLost(lives) {
		if (lives == 0) {
			setupResultsDisplay();
			displayGameResult("Game over :-/");
		}
	}

	function setupResultsDisplay() {
		$shapeContainer.css("display", "none");
		$("#end-of-game").css("display", "block");
	}

	function startOver() {
		setInterval(reload, 1300);
	}

	function reload() {
		location.reload();
	}

	function positionWidth() {
		return randomRange(window.innerWidth, 0) + "px";
	}

	function positionHeight() {
		return randomRange(window.innerHeight, 0) + "px";
	}

	function displayGameResult(result) {
		$("#game-result").html(result);
	}

	function createCircle() {
		var $circle = createElement("div", "circle");
		$circle.css("background", randomColor());
		$circle.css("borderRadius", circleDimensions);
		$circle.css("height", circleDimensions);
		$circle.css("width", circleDimensions);
		return $circle;
	}

	function randomColor() {
		// var shape_colors = [
		// 	"red",
		// 	"blue",
		// 	"brown",
		// 	"purple",
		// 	"gold",
		// 	"black",
		// 	"green",
		// 	"pink",
		// 	"orange",
		// 	"gray"
		// ];
		var shape_colors = [
			CORRECTCOLOR,
			"#007AFF",
			"#5856D6",
			"#FFCC00",
			"#1F1F21",
			"#4CD964",
			"#FF4981",
			"#FF9500",
			"#BDBEC2"
		];
		return shape_colors[randomRange(9, 0)];
	}

	function randomRange (x, y) {
		return Math.floor(Math.random() * (x - y) + y);
	};

	function createElement(elem, elem_class, elem_id) {
		elem_class = elem_class ||  null;
		elem_id = elem_id || null;
		return $("<" + elem + ">", { class: elem_class, id: elem_id });
	}
});
