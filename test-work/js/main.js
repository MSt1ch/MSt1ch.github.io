;
$(document).ready(function(){

	$(".fname").on('change', function(){
		var str = this.value;
		return $(".text").html("Привет " + str) 
	});

	$(".btn_submit").on("click", function(e){
		e.preventDefault();
		$('.popup-wrap').toggleClass("hidden");
	});

	$('.popup__close').on('click', function(){
		$('.popup-wrap').toggleClass("hidden");
	})
	$('.popup-wrap').on('click', function(e){
		if(e.target.className === 'popup-wrap'){
			$('.popup-wrap').toggleClass("hidden");
		}
	})
});