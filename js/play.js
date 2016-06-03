$(document).ready(function() {
	var redCircleCount = 0;
	var lives = 3;
	var $shapeContainer = $("#shape-container");
	var circleDimensions = "50px";
	var timeGameStarted;
	var CORRECT_COLOR = "rgb(255, 59, 48)";
	var LEVEL_OF_DIFFICULTY;
	var UNIQUE_GAME_ID = randomString();
	var POST_URL = "https://damp-meadow-35051.herokuapp.com/api/v1/stats";

	$("#easy").click(function() {	startGame(3); });
	$("#medium").click(function() {	startGame(20); });
	$("#hard").click(function() {	startGame(40); });
	$("#impossible").click(function() {	startGame(30); });
	$("#home-button").click(reload);

	function startGame(num_circles) {
		timeGameStarted = new Date();
		LEVEL_OF_DIFFICULTY = num_circles;
		hideOtherSections("#game-zone");
		hideFooter();
		$("#game-zone").fadeIn();
		$("#score").html(redCircleCount);
		$("#lives").html(lives);
		$("#exit-icon").click(reload);
		createAllShapes();
	}

	function hideFooter() {
		$(".footer").hide();
	}

	function hideOtherSections(section) {
		$("section").not(section).hide();
	}

	function createAllShapes() {
		for (var i = 0; i < LEVEL_OF_DIFFICULTY; i++) {
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
			if ($circle.css("background-color") == CORRECT_COLOR) {
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
			var score = $("#score").text();
			var data = {
				"js_id": UNIQUE_GAME_ID,
				"game": game(),
				"time_spent": timeSpentInMinutes(),
				"score": score
			};

			setUpResultsDisplay();
			displayGameResult("GAME OVER");
			postGameResults(data);
		}
	}

	function randomString() {
		var alphabet = (
			"abcdefghijklmnopqrstuvwxyz" +
			"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		).split('');
		var numbers = "123456789".split('');
		var random_characters = [];

		for (var i = 0; i < 20; i++) {
			var random_letter = alphabet[randomRange(52, 0)];
			var random_number = numbers[randomRange(9, 0)];
			random_characters.push(random_letter);
			random_characters.push(random_number);
		}

		return random_characters.join('');
	}

	function postGameResults(data) {
		$.post(POST_URL, data, function (response) {
			console.log("POST API:", response);
			debugger;
		}, "json");
	}

	getLeaderboards();

	function getLeaderboards() {
		getAPIGames().done(function(response) {
			debugger;
		});
	}

	function getAPIGames() {
		return $.get(POST_URL, function() {}, "json");
	}

	function updateGameResults() {
		var player = $("#player-name").val();
		var data = {
			"js_id": UNIQUE_GAME_ID,
			"player": player
		};

		// does $.patch() exist?
	}

	function timeSpentInMinutes() {
		return ((new Date() - timeGameStarted) / 1000 ) / 60;
	}

	function setUpResultsDisplay() {
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
		var dimensions = circlePixels();

		$circle.css("background", randomColor());
		$circle.css("borderRadius", dimensions);
		$circle.css("height", dimensions);
		$circle.css("width", dimensions);
		return $circle;
	}

	function game() {
		if (LEVEL_OF_DIFFICULTY == 3) {
			return "easy";
		} else if (LEVEL_OF_DIFFICULTY == 20) {
			return "medium";
		} else if (LEVEL_OF_DIFFICULTY == 40) {
			return "hard";
		} else {
			return "impossible"
		}
	}

	function circlePixels() {
		if (game() == "easy") {
			return "80px";
		} else if (game() == "medium") {
			return "50px";
		} else if (game() == "hard") {
			return "40px";
		} else {
			return "30px";
		}
	}

	function randomColor() {
		var shape_colors = [
			CORRECT_COLOR,
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
