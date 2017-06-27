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
	

});
