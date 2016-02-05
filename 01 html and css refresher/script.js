$(document).ready(function() {
	$('a.hero').hover(function() {
		var line = $(this).find('#line');
		var height = $(this).height();
		console.log(height);
		var offset = 353 * Math.tan(20);
		line.css('right', (-1 * offset) + 'px');
		line.toggleClass('hover');
	});
});