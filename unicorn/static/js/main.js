;
// Начинать писать отсюда!!!!
$(document).ready(function(){


	$('.js-features-slider').slick({
		nextArrow: '.features-slider__next',
		prevArrow: '.features-slider__prev',
		arrows: true,
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1250,
				settings: {
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 1150,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			}

		]
	});

	$('.portfolio-slider').bxSlider({
		hideControlOnEnd: true,
		minSlides: 1,
		maxSlides: 4,
		slideWidth: 430,
		controls: false
	});


	$('.js-clients-slider').slick({
		nextArrow: '.clients-slider__next',
		prevArrow: '.clients-slider__prev',
		arrows: true,
		infinite: false,
		speed: 700,
		slidesToShow: 5,
		slidesToScroll: 5,
		responsive: [
			{
				breakpoint: 950,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			}

		]
	});

	$('.js-next-posts-slider').slick({
		nextArrow: '.next-posts-slider__next',
		prevArrow: '.next-posts-slider__prev',
		arrows: true,
		infinite: false,
		speed: 700,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1250,
				settings: {
					dots: true,
					arrows: false,
				}
			},
			{
				breakpoint: 950,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			}

		]
	});

	$('.form_check').each(function(){

		var form = $(this),
		btn = form.find('.submit_b');

		form.find('.rfield').addClass('empty_field').parents('.input-wrap').append('<span class="rfield_error">fill in the field</span>');
		btn.addClass('disabled');
			// проверка полей формы      
			function checkInput(){
				
				form.find('.rfield').each(function(){
					
					if($(this).hasClass('mailfield')) {
						var mailfield = $(this);
						var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
						if(pattern.test(mailfield.val())){
							mailfield.removeClass('empty_field');
						} else {
							mailfield.addClass('empty_field');
						}
					} else if($.trim($(this).val()) != '') {
						$(this).removeClass('empty_field');
					} else {
						$(this).addClass('empty_field');
					}

				});
			}
			
			// подсветка незаполненных полей
			function lightEmpty(){
				form.find('.empty_field').addClass('rf_error');
				form.find('.empty_field').parents('.input-wrap').find('.rfield_error').css({'visibility':'visible'});
				setTimeout(function(){
					form.find('.empty_field').removeClass('rf_error');
					form.find('.empty_field').parents('.input-wrap').find('.rfield_error').css({'visibility':'hidden'});
				},1500);
			}
			
			//  проверка полей
			function checkform(){
				checkInput();
				var sizeEmpty = form.find('.empty_field').length;
				if(sizeEmpty > 0){
					if(btn.hasClass('disabled')){
						return false
					} else {
						btn.addClass('disabled')
					}
				} else {
					btn.removeClass('disabled')
					$('.popup-wrap').removeClass('hidden')
				}
			}
	});

});	