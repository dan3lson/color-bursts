$(document).ready(function() {
	var redCircleCount = 0;
	var lives = 3;
	var $shapeContainer = $("#shape-container");
	var circleDimensions = "50px";
	var CORRECTCOLOR = "rgb(255, 59, 48)";

	$("#easy").click(function() {	startGame(3); });
	$("#medium").click(function() {	startGame(20); });
	$("#hard").click(function() {	startGame(40); });
	$("#impossible").click(function() {	startGame(65); });
	$("#home-button").click(reload);

	function startGame(levelOfDifficulty) {
		hideOtherSections("#game-zone");
		hideFooter();
		$("#game-zone").fadeIn();
		$("#score").html(redCircleCount);
		$("#lives").html(lives);
		$("#home-icon").click(reload);
		createAllShapes(levelOfDifficulty);
	}

	function hideFooter() {
		$(".footer").hide();
	}

	function hideOtherSections(section) {
		$("section").not(section).hide();
	}

	function createAllShapes(levelOfDifficulty) {
		for (var i = 0; i < levelOfDifficulty; i++) {
			setInterval(displayShapes, 300);
		}
	}

	function displayShapes() {
		var $circle = createCircle();
		$shapeContainer.append($circle);
		var totalShapes = $shapeContainer.find("div").length;
		$circle.css("left", positionWidth());
		$circle.css("top", positionHeight());
		$circle.css("position", "absolute");

		if ($circle.css("background-color") == "rgb(0, 0, 0)") {
			var $bomb = createElement("i", "fa fa-bomb");
			$circle.addClass("bomb");
			$circle.append($bomb);
		}

		$circle.click(function() {
			if ($circle.css("background-color") == CORRECTCOLOR) {
				redCircleCount++;
				$("#score").html(redCircleCount);
			} else {
				console.log("WRONG:", $circle.css("background-color"));
				lives--;
				$("#lives").html(lives);
				determineIfLost(lives);
			}

			console.log("Red circle count", redCircleCount);
			console.log("Lives: ", lives);

			var totalShapes = $shapeContainer.find(".circle");
			console.log("Num circles", totalShapes.length);
			randomizeColor(totalShapes);
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
			displayGameResult("GAME OVER");
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
		var shape_colors = [
			CORRECTCOLOR,
			"#5AC8FA",
			"#FFCC00",
			"#FF9500",
			"#007AFF",
			"#4CD964",
			"#8E8E93",
			"#EFEFF4",
			"#CECED2",
			"#000000",
			"#007AFF"
		];
		return shape_colors[randomRange(11, 0)];
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
