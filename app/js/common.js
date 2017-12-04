$(function() {

	$('#my-menu').mmenu({
		extensions:['theme-black', 'fx-menu-slide'],
		navbar:{
			title: '<div class="logo-icon mobile"><a href="#"><i class="icon-logo"></i></a><br><span class="color_white">Stanislav</span><span class="accent"> Matievsky</span></div>'
		},
		offCanvas:{
			position: 'right'
		}

	});
	

	
	$('.hamburger').on( "click", function() {
		var api = $('#my-menu').data('mmenu');
		var ths = $(this)
		api.bind('open:finish', function() {
			ths.addClass('is-active')
		});
		api.bind('close:finish', function() {
			ths.removeClass('is-active');
		});
	});
	
	$('.go-to-top').click(function() {
		$(window.opera ? 'html' : 'html, body').animate({
			scrollTop: 0
		}, 'slow');
	});

	function onScroll(event){

		var scrollPos = $(document).scrollTop();
		if(scrollPos <= 400 || scrollPos >= 1000){
			$('.skills-wrap-list em').removeClass('animate-icon');
			
		}
		else{ 
			$('.skills-wrap-list em').addClass('animate-icon');
		};
		

		if(scrollPos >= 1100){
			$(".go-to-top").fadeIn('normal');
		} else{
			$(".go-to-top").fadeOut('normal')
		}



	}

	$(document).on("scroll", onScroll);


	$(".main-nav_link, .scroll-button_link").on('click', function(e) {
     e.preventDefault();
     var target = $(this).attr('href');
     $('html, body').animate({
       scrollTop: ($(target).offset().top) - 100
     }, 1000);
  });


});
