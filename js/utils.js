/*
 * rem
 */
function RootNodeFont() {
	if(window.screen.width <= 750) {
		this.html = document.documentElement;
		this.hWidth = this.html.getBoundingClientRect().width;
		this.html.style.fontSize = this.hWidth / 7.5 + "px";
	}
}

(function($) {
	//jQrem
	$.fn.extend({
		AutoSize: function() {
			var element = $(this);
			auto();

			function auto() {
				var width = $(window).width(),
					height = $(window).height();
				$("html").css("font-size", width / 7.5);
				$(element).width(width).height(height);
			};
			$(window).resize(auto);
		}
	});
})(jQuery);