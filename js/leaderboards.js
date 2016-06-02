$(document).ready(function() {
	$("#leaderboards-btn").click(function() {
		hideOtherSections("#leaderboards-container");
		$("#leaderboards-container").fadeIn();
		updateHeader("Leaderboards");
		updateFooter(this);
	});

	function hideOtherSections(section) {
		$("section").not(section).hide();
	}

	function updateHeader(string) {
		$("#header h1").html(string);
	}

	function updateFooter(_this) {
		$(".footer .col-xs-4.active").removeClass("active");
		$(_this).addClass("active");
	}

	function createElement(elem, elem_class, elem_id) {
		elem_class = elem_class || null;
		elem_id = elem_id || null;
		return $("<" + elem + ">", { class: elem_class, id: elem_id });
	}
});
