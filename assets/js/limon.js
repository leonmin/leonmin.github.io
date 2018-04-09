// $(document).pjax("a","#main");
// $(document).on('pjax:click',function(){
// 	NProgress.start();
// });
// $(document).on('pjax:end',function(){
// 	NProgress.done();
// });

$(document).ready(function(){
	var container = $(".container");
	var windowHeight= $(window).height();
	container.css("min-height",windowHeight);








	//Back Button
	// NProgress.configure({
  // 	template: '<div class="bar" role="bar"><div class="peg"></div></div>'
	// });
	
	// NProgress.start();
	// $(window).load(function(){
	// 	NProgress.done();
	// });

	//head menu
	$(".head-menu-btn").click(function () {
		$("#head-menu-contain").fadeToggle();
		$(this).toggleClass("active");
	});
	$("#head-menu-contain a").click(function () {
		$("#head-menu-contain").fadeOut();
		$(".head-menu-btn").removeClass("active");
	});

	//head back
	$("#head-back").click(function(){
		window.history.back(-1);
	});

	//head progress
	var getMax = function () {
		return $(document).height() - $(window).height();
	}
	var getValue = function () {
		return $(window).scrollTop();
	}
	if ('max' in document.createElement('progress')) {
		var progressBar = $('progress');
		progressBar.attr({
			max: getMax()
		});
		$(document).on('scroll', function () {
			progressBar.attr({
				value: getValue()
			});
		});
		$(window).resize(function () {
			progressBar.attr({
				max: getMax(),
				value: getValue()
			});
		});
	} 

	// head search
	var $searchInput = $('#search-input');
	var mack=$('#head-mask');

	var showSearch = function(){
		mack.show();
		$('#head-search-contain').show();
		$('body').css('overflow', 'hidden');
	}
	var hideSearch = function(){
		mack.hide();
		$('#head-search-contain').hide();
		$('body').css('overflow', '');
	}
	$('#head-search-btn').click(function(){
		showSearch();
		
		$searchInput.attr('autocapitalize','none');
		$searchInput.attr('autocorrect','off');
		$searchInput.focus();
	});
	$(".search-close-icon").click(function(){
		hideSearch();
	});
	mack.click(function(){
		hideSearch();
	});
	
	// back top btn
	//若在首页点击后跳转到下一页
	//若在其他页,跳回首页
	var gonextpage = $(".move-btn");
	if($(document).height() - $(window).height()==0){
		gonextpage.hide();
	}
	gonextpage.on("click", function () {
		if ($(window).scrollTop() > 733) {
			$('html,body').animate({
				scrollTop: 0
			}, 800)
		} else {
			$('html,body').animate({
				scrollTop: 734
			}, 800)
		}
	});
	//手动触发一次scroll
	$(window).trigger('scroll');
	//保证scroll后刷新正常
	if($(window).scrollTop() > 733){
		$(".arrow").addClass("arrow-stop").removeClass("arrow-hit");
		$(".arrow i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
	}
	//若在首页箭头向下,箭头跳动
	//若在其他页箭头向上,箭头静止
	$(window).on("scroll", function () {
		if ($(window).scrollTop() > 733) {
			$(".arrow").addClass("arrow-stop").removeClass("arrow-hit");
			$(".arrow i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
		} else {
			$(".arrow").addClass("arrow-hit").removeClass("arrow-stop");
			$(".arrow i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		}
	});

	var sjs = SimpleJekyllSearch({
		searchInput: document.getElementById('search-input'),
		resultsContainer: document.getElementById('results-container'),
		json: '/search.json',
		searchResultTemplate: '<article class="post index-post"><header class="post-header"><h1 class="post-h-title post-i-title"><a href="{url}">{title}</a></h1><div class="post-meta"><span class="post-date">{date}</span><span class="post-cate">{category}</span></div></header><section class="post-content">{content}</section><footer class="post-footer"><a class="post-more" href="{url}">Read more..</a></footer></article>',
		noResultsText: '<div style="text-align:center;font-size:1.4em;color:rgba(199, 15, 15, 0.99)">没有找到相关内容..<div>'
	});

});

// var ap4 = new APlayer({
//     element: document.getElementById('player'),
//     narrow: false,
//     autoplay: false,
//     showlrc: false,
//     mutex: true,
//     theme: '#ad7a86',
//     mode: 'circulation',
//     music: [
//         {
//             title: 'ナツコイ (夏恋)',
//             author: '井上苑子',
//             url: 'http://p1rw6xttu.bkt.clouddn.com/music/%E4%BA%95%E4%B8%8A%E8%8B%91%E5%AD%90-%E5%A4%8F%E6%81%8B.mp3',
//             pic: 'http://p1rw6xttu.bkt.clouddn.com/music/sonko.jpg',
// 						num: 0
//         },
//         {
//             title: 'キセキ (奇迹).mp3',
//             author: 'GReeeeN',
//             url: 'http://p1rw6xttu.bkt.clouddn.com/music/GReeeeN-%E5%A5%87%E8%BF%B9.mp3',
//             pic: 'http://p1rw6xttu.bkt.clouddn.com/music/GReeeeN-%E5%A5%87%E8%BF%B9.jpg',
// 						num: 1
//         },
//         {
//             title: '(ラッドウィンプス)_前前前世',
//             author: 'RADWIMPS',
//             url: 'http://p1rw6xttu.bkt.clouddn.com/music/RADWIMPS-%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96.mp3',
//             pic: 'http://p1rw6xttu.bkt.clouddn.com/music/RADWIMPS-%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96.jpg',
// 						num: 2
//         }
//     ]
// });

// var flag = true;
// $('.limi-music-btn').click(function () {
// 	if (flag == false) {
// 		$('.limi-music-box').css('transform', 'translateX(-250px)');
// 		flag = true;
// 	} else if (flag == true) {
// 		$('.limi-music-box').css('transform', 'translateX(0px)');
// 		flag = false;
// 	}
// });

// $('.aplayer-icon-menu').click(function () {
// 	var list = ap4.music.num;
// 	if (list < 2) {
// 		ap4.setMusic(list + 1);
// 	} else {
// 		ap4.setMusic(0);
// 	}

// });