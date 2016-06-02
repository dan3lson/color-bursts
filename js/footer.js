$(document).ready(function() {
	$("#play-btn").click(function() {
		var btn_selector = "#play-btn";
		var notTheseSections = "#header, #game-options";
		var fadeIn = "#header, #play-options";
		var header = "Color Burst";
		setUpPage(btn_selector, notTheseSections, fadeIn, header);
	});
	$("#leaderboards-btn").click(function() {
		var btn_selector = "#leaderboards-btn";
		var notTheseSections = "#leaderboards-container, #header";
		var fadeIn = "#leaderboards-container";
		var header = "Leaderboards";
		setUpPage(btn_selector, notTheseSections, fadeIn, header);
	});

	function setUpPage(btn_selector, notTheseSections, fadeIn, header) {
		if (!$(btn_selector).hasClass("active")) {
			hideOtherSections(notTheseSections);
			$(fadeIn).fadeIn();
			updateHeader(header);
			updateFooter(btn_selector);
		}
	}

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
});
