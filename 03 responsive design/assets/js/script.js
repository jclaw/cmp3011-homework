$(document).ready(function() {

	controlNav();
	$(window).resize(function() {
		controlNav();
	});

	$('#home .hero').on('mouseover', function() {
		var line = $(this).find('#line');
		var height = $(window).height();
		var num = -1 * height * Math.tan(20 * Math.PI/180);
		line.css('right', num + 'px');
	});

	$('#home .hero').on('mouseout', function() {
		var line = $(this).find('#line');
		line.css('right', '100%');
	});
})

function controlNav() {
	var width = $(window).width();
	if (width > 767) {
		$('.nav .links').removeClass('hidden');
		$('.nav .hamburger').addClass('hidden');
	} else {
		$('.nav .links').addClass('hidden');
		$('.nav .hamburger').removeClass('hidden');
	}
}
