$(document).ready(function() {
	var score = 0;
	var lives = 1;
	var pointsNeededToLevelUp = 3;
	var $shapeContainer = $("#shape-container");
	var circleDimensions = 150;
	var gameSpeed = 450;
	var timeGameStarted;
	var initialIntervalID;
	var gameIntervalID;
	var CORRECT_COLOR = "rgb(255, 59, 48)";
	var UNIQUE_GAME_ID = randomString();
	var POST_URL = "https://damp-meadow-35051.herokuapp.com/api/v1/stats.json";

	setInterval(changePlayCircleBackground, 750);

	$(".play-game-btn").click(startGame);
	$("#exit-btn").click(function() {
		postGameResults();
		setTimeout(reload, 250);
	});
	// $("#save-player-name").click(updateGameResults);

	function startGame(num_circles) {
		timeGameStarted = new Date();
		$(".fa-play-circle").hide();
		hideOtherSections("#game-zone");
		hideFooter();
		$("#game-zone").show();
		updateScoreDisplay();
		updateLivesDisplay();
		initialIntervalID = displayNewCircle();
	}

	function hideFooter() {
		$(".footer").hide();
	}

	function showFooter() {
		$(".footer").show();
	}

	function hideOtherSections(section) {
		$("section").not(section).hide();
	}

	function displayNewCircle() {
		clearInterval(initialIntervalID);
		clearInterval(gameIntervalID);
		gameIntervalID = setInterval(appendNewCircle, gameSpeed);
	}

	function appendNewCircle() {
		$shapeContainer.append(createCircle());

		// if ($circle.css("background-color") == "rgb(0, 0, 0)") {
		// 	var $bomb = createElement("i", "fa fa-bomb");
		// 	$circle.addClass("bomb");
		// 	$circle.append($bomb);
		// }
	};

	$shapeContainer.on("click", ".circle", function() {
		console.log("Circle Dimensions", circleDimensions);

		var $circle = $(this);

		if ($circle.css("background-color") == CORRECT_COLOR) {
			increaseScore();
			updateScoreDisplay();

			if (score % pointsNeededToLevelUp == 0) {
				levelUp();
			}
		} else {
			subtractLife();
			updateLivesDisplay();

			if (lives == 1 && score > 15) {
				gameSpeed = 700;
			}

			determineIfLost();
		}

		displayNewCircle();

		console.log("Score", score);
		console.log("Lives", lives);

		var totalShapes = $shapeContainer.find("div");
		randomizeColor(totalShapes);
	});

	function randomizeColor(shapes) {
		for (var i = 0; i < shapes.length; i++) {
			$(shapes[i]).css("background", randomColor);
		}
	}

	function determineIfLost() {
		if (lives == 0) {
			$shapeContainer.remove();
			displayGameResults();
			postGameResults();
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

	function postGameResults() {
		var data = {
			"js_id": UNIQUE_GAME_ID,
			"time_spent": timeSpentInMinutes(),
			"score": score
		};

		$.post(POST_URL, data, function(response) {
			console.log(response);
		}, "json");
	}

	function getLeaderboards() {
		getAPIGames().done(function(response) {
			console.log(response);
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

		$.ajax({
			type: "PATCH",
			url: POST_URL,
			dataType: "json",
			data: data,
			success: function(response) {
				console.log(response.errors);
				debugger;
			}
		});
	}

	function timeSpentInMinutes() {
		return ((new Date() - timeGameStarted) / 1000 ) / 60;
	}

	function displayGameResults() {
		$("#header").html("GAME OVER");
		$("#game-result").fadeIn();
		$("#game-zone-header").hide();
		showFooter();
		$("#end-of-game").css("display", "block");
		$("#game-result-score").append(score);
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

	function createCircle() {
		var $circle = createElement("div", "circle");
		var size = circleDimensions + "px";

		$circle.css("background", randomColor());
		$circle.css("borderRadius", size);
		$circle.css("height", size);
		$circle.css("left", positionWidth());
		$circle.css("position", "absolute");
		$circle.css("top", positionHeight());
		$circle.css("width", size);
		return $circle;
	}

	function levelUp() {
		decreaseCircleSize();
		increaseGameSpeed();
		addLife();
		updateLivesDisplay();
		emptyShapeContainer();
	}

	function changePlayCircleBackground() {
		$(".fa-play-circle").css("color", randomColor());
	}

	function emptyShapeContainer() {
		$shapeContainer.empty();
	}

	function removeShapeContainer() {
		$shapeContainer.remove();
	}

	function increaseScore() {
		score++;
	}

	function addLife() {
		lives++;
	}

	function subtractLife() {
		lives--;
	}

	function increaseGameSpeed() {
		gameSpeed -= 30;
		console.log(gameSpeed);
	}

	function decreaseCircleSize() {
		if (circleDimensions < 30) {
			circleDimensions = 130;
			gameSpeed +=  75;
		}
		circleDimensions -= 10;
	}

	function increaseAllCircleSizes(amount) {
		var size = circleDimensions + amount + "px";
		$shapeContainer.find(".circle").css("width", size);
		$shapeContainer.find(".circle").css("height", size);
		$shapeContainer.find(".circle").css("border-radius", size);
	}

	function updateLivesDisplay() {
		$("#lives").html(lives);
	}

	function updateScoreDisplay() {
		$("#score").html(score);
	}

	function randomColor() {
		var shape_colors = [
			CORRECT_COLOR,
			CORRECT_COLOR,
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
		return shape_colors[randomRange(13, 0)];
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
