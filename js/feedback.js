$(document).ready(function() {
	var URL = "https://damp-meadow-35051.herokuapp.com/feedbacks";

	$("#give-feedback").click(postFeedback);

	function postFeedback() {
		var input = $("#feedback-value").val();

		if (input.length > 0) {
			var data = {
				"input": input
			};
			var $post = $.post(URL, data, function() {}, "json");

			$post.done(function(response) {
				console.log(response);
				$("#feedback-form").hide();
				$("#feedback-response").fadeIn();
			});
		} else {
			$("#empty-feedback-response").fadeIn();
			setTimeout(function() {
				$("#empty-feedback-response").fadeOut();
			}, 1500);
		}
	}
});
