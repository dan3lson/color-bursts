$(document).ready(function() {
	var $leaderboardContainer = $("#leaderboards table");
	var stat;
	var URL = "https://damp-meadow-35051.herokuapp.com/api/v1/stats";

	getStats().done(function(response) {
		createTableRows(response);
	});

	function createTableRows(stats) {
		for (var i = 0; i < stats.length; i++) {
			stat = stats[i];
			$leaderboardContainer.append(
				row(i + 1, stat.player, stat.score, stat.time_spent)
			);
		}
	}

	function row(rank, player, score, time_spent) {
		return '<tr>' +
			'<td>' + rank + '</td>' +
			'<td>' + (player || "Anonymous") + '</td>' +
			'<td>' + score + '</td>' +
			'<td>' + time_spent + '</td>'
		'</tr>';
	}

	function getStats() {
		return $.get(URL, function() {}, "json");
	}
});
