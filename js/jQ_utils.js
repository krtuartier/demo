(function($) {
	$.fn.Tags = function(options) {
		var opts = $.extend({}, $.fn.Tags.defaults, options);
		return this.each(function() {
			var $tags = $(this); //导航选项卡
			var controlObj = $tags.find('li'); //导航选项卡的选项li
			var sectionWrap = opts.sectionWrap ? opts.sectionWrap : $tags.next(); //默认下一个元素为翻页的wrap
			var section = sectionWrap.children(); //一个section页面
			var vPer = 100 / controlObj.length; //选项个数百分比
			var scrollPlace=opts.scrollPlace;

			//nav样式
			function navCss() {
				$tags.css({
					'width': '100%',
					'position': 'relative'
				});
				$tags.find('ul').css({
					'width': '100%'
				});
				controlObj.css({
					'width': vPer + '%'
				});

			}
			//navBar
			var oNavB = $('<b class="active_border"></b>');
			oNavB.css({
				'width': vPer + '%',
				'left': '0',
				'display': 'block',
				'position': 'absolute',
				'height': '0.05rem',
				'background-color': opts.barColor,
				'bottom': '0'
			});
			$tags.append(oNavB);

			//section样式
			function sectionCss() {
				if (opts.sectionWrapHeight) {
					sectionWrap.css({
						'height':sectionWrap.parent().height() - $tags.height(),
						'top': $tags.height()
					});
				}else{
					sectionWrap.css({
						'height':'100%'
					});
				}
				sectionWrap.css({
					'width': controlObj.length * 100 + '%',
					'position': 'absolute',
					'left': 0,
				});
				section.css({
					'position': 'relative',
            		'float': 'left',
					'width': vPer + '%',
					'height':'100%'
				});
			}

			setTimeout(function() {
				navCss();
				sectionCss();
			}, 0);

			var iW = $(window).width(); //屏幕的宽度
			var iNow = 0; //第几张
			var iStartx = 0; //初始位置
			var iScroll = 0; //滚动距离
			var iStartScroll = 0; //初始滚动距离
			//点击nav控制
			controlObj.each(function() {
				$(this).click(function() {
					var oLiIndex = $(this).index();
					controlObj.removeClass('active');
					$(this).addClass('active');
					sectionWrap.animate({
						'left': 0 - oLiIndex * 100 + '%'
					}, opts.speed);
					iNow = oLiIndex;
					iScroll = -oLiIndex * iW;
					iStartScroll = -oLiIndex * iW;
					oNavB.animate({
						'left': oLiIndex * vPer + '%'
					}, opts.speed);
					pageIndex(iNow);
				});
			});
			//触摸移动页面控制
//			sectionWrap.bind('touchstart', function(e) {
//				var touch = e.originalEvent.targetTouches[0];
//				iStartx = touch.pageX;
//				iStartScroll = iScroll;
//			});
//			sectionWrap.bind('touchmove', function(e) {
//				e.preventDefault(); //微信touch事件兼容
//				var touch = e.originalEvent.targetTouches[0];
//				var dix = touch.pageX - iStartx;
//				if((sectionWrap.attr('page') == 0 && dix > 0) || (sectionWrap.attr('page') == section.length - 1 && dix < 0)) {
//					return;
//				} else {
//					e.stopPropagation();
//				}
//				iScroll = iStartScroll + dix;
//				iNow = -iScroll / iW;
////				sectionWrap.css({
////					'left': 0 - iNow * 100 + '%'
////				});
////				oNavB.css({
////					'left': iNow * vPer + '%'
////				});
//			});
//			sectionWrap.bind('touchend', function(e) {
//				var touch = e.originalEvent.changedTouches[0];
//				var dix = touch.pageX - iStartx;
//				if((sectionWrap.attr('page') == 0 && dix > 0) || (sectionWrap.attr('page') == section.length - 1 && dix < 0)) {
//					return;
//				} else {
//					e.stopPropagation();
//				}
//				iScroll = iStartScroll + dix;
//				iNow = -iScroll / iW;
//				if(dix <= 0 && dix / iW <= -.4) {
//					iNow = Math.ceil(iNow);
//				} else if(dix >= 0 && dix / iW >= .4) {
//					iNow = Math.floor(iNow);
//				} else {
//					iNow = Math.ceil(iNow);
//				}
//				if(iNow < 0) {
//					iNow = 0
//				} else if(iNow > section.length - 1) {
//					iNow = section.length - 1;
//				}
//				iScroll = -iNow * iW;
//				sectionWrap.animate({
//					'left': 0 - iNow * 100 + '%'
//				}, opts.speed);
//				oNavB.animate({
//					'left': iNow * vPer + '%'
//				}, opts.speed);
//				controlObj.removeClass('active');
//				controlObj.eq(iNow).addClass('active');
//				pageIndex(iNow);
//			});
//
//			
//			if (scrollPlace) {
//				var sPSET=[];
//				scrollPlace.each(function(){
//					sPSET[$(this).parent().index()]={
//						iH:$(window).height(),
//						iStartx:0,
//						iScroll:0,
//						iStartScroll:0
//					};
//					//触摸移动页面控制
//					$(this).bind('touchstart', function(e) {
//						var touch = e.originalEvent.targetTouches[0];
//						sPSET[$(this).parent().index()].iStarty = touch.pageY;
//						sPSET[$(this).parent().index()].iStartScroll = sPSET[$(this).parent().index()].iScroll;
//					});
//					$(this).bind('touchmove', function(e) {
//						e.preventDefault(); //微信touch事件兼容
//						var touch = e.originalEvent.targetTouches[0];
//						var diy = touch.pageY - sPSET[$(this).parent().index()].iStarty;
//						sPSET[$(this).parent().index()].iScroll = sPSET[$(this).parent().index()].iStartScroll + diy;
//					 	$(this).scrollTop(-sPSET[$(this).parent().index()].iScroll);
//					});
//					$(this).bind('touchend', function(e) {
//						var touch = e.originalEvent.changedTouches[0];
//						var diy = touch.pageY - sPSET[$(this).parent().index()].iStarty;
//						sPSET[$(this).parent().index()].iScroll = sPSET[$(this).parent().index()].iStartScroll + diy;
//					});
//				});
//			}
			function pageIndex(iNow) {
				sectionWrap.attr('page', iNow);
			}
			pageIndex(iNow);
		});
	};
	$.fn.Tags.defaults = {
		navPosition:true,
		sectionWrap: null,
		sectionWrapHeight: true,
		scrollPlace:null,
		barColor: '#004FB6',
		speed: 200
	};
	$.fn.Tags.setDefaults = function(settings) {
		$.extend($.fn.Tags.defaults, settings);
	};
})(jQuery);