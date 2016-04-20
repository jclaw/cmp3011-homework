$(document).foundation();
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
// $('.orb-inner').addClass('infinite').animateCss('pulse');

// $('.orb-outer')
// 	.mouseenter(function() {
// 		$('.orb-outer').removeClass('animated');
// 	})
// 	.mouseleave(function() {
// 		$('.orb-outer').addClass('animated');
// 	})
