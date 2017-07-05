;

	

	$(function() {
		
		$('.mobile-buttton').click(function(){
			$(this).toggleClass('open');
			$('.mobile-menu').toggleClass('show');
		});

		$('.mobile-menu a').click(function(){
			$('.mobile-menu').toggleClass('show');
			$('.mobile-buttton').toggleClass('open');
		});

		$('.top-slider__').on("click", function(){
			$('.popup').toggleClass('show').fadeIn('fast')
		})
		$('.button-cancel').on("click", function(){
			$('.popup').fadeOut('fast')
		})

		
		$(".owl-carousel").owlCarousel({
			Default: 1,
			loop:true,
			animateOut: 'fadeOut',
	    smartSpeed: 1500,
	    navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			resposiveClass: true,
	    nav: true,
	    dots: true,
	    mouseDrag: false,
	    touchDrag: false,
	    autoHeight:true,
			responsive : {
				0 : {
					items : 1,
					
				}
			}
			
		});

	function load(){
	  var hash=window.location.hash;
	  $hash=$(hash);
	  if(hash){
	    $('html, body').stop().animate({
	    'scrollTop': $hash.offset().top-120
	  }, 1000);
	  }
	}
	load();
	
	
	$(document).on("scroll", onScroll);	

	
var navbar = $('.navbar__list a')
var main_nav = $('.main-nav__list a')

	function onScroll(event){
	  var scrollPos = $(document).scrollTop();
	  if(scrollPos >= 900){
	    $(".button_up").fadeIn('slow')
	  } else{
	          $(".button_up").fadeOut('normal')
	        }
	  
	  changeLink(navbar, scrollPos)
	  changeLink(main_nav, scrollPos)

	}



	function changeLink(event, scrollPos){
		event.each(function () {
			var actLink = $(this);
	    var linkElement = $(actLink.attr('href'));
	    if (linkElement.position().top - 125 < scrollPos && linkElement.position().top + linkElement.height() > scrollPos) {
	      event.removeClass("active");
	      actLink.addClass("active");   
	    } 
	    else{
		    actLink.removeClass("active");
		  }
		})
		
	}

	$('.main-nav__list a, .logo a, a.button-down, .navbar__list a, .button_up, .mobile-menu a').on('click', function (e) {

	  var target = this.hash,
	  menu = target,
	  $target = $(target);

	  e.preventDefault();
	  $(document).off("scroll");

	  $('html, body').stop().animate({
	    'scrollTop': $target.offset().top-105
	  }, 1000,  function () {
	    window.location.hash = target;
	    $(document).on("scroll", onScroll);

	    if($(document).scrollTop() < 900){
	    	$('.button_up').fadeOut('normal');
	    	main_nav.removeClass('active');
	    	navbar.removeClass('active');
	  	}
	  });
	  
	  // $('.main-nav__list a').each(function () {
	  //   $(this).removeClass('active');
	  // })
	  // $(this).addClass('active');
	  
	  
	});

	


	$("input, select, textarea").jqBootstrapValidation(
	{
		submitSuccess: function ($form, event) {
			alert("Спасибо, мы обязательно свяжемся с Вами в ближайшее время!");
				// event.preventDefault();
        
    //     	var str = $(".main_form").serialize();
    //     //E-mail Ajax Send
    //     $.ajax({
    //     	type: "POST",
    //     	url: "mail.php",
    //     	data: str
    //     }).done(function() {
    //     	$(this).find("input").val("");
    //     	alert("Спасибо, мы обязательно свяжемся с Вами в ближайшее время!");
    //     	$(".main_form").trigger("reset");
    //     });
    //     return false;
        
    }

  });


});