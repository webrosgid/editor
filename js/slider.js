
$(document).ready(function()
{
	eval("$('.single-item').slick({dots : true, autoplay : true, adaptiveHeight : true, arrows : true});");
});

//задать вид слайдера
function setSliderView(item) {
	var sliderId = item.attr('slider_id');
	var view = item.attr('view');
	$('#'+sliderId).slick("unslick");

	switch(view){
		case '1' : eval("$('#" + sliderId + "').slick({dots : true, autoplay : true, adaptiveHeight : true, arrows : true});");
					$('.sl_img').height('650');
			break;
		case '2' : eval("$('#" + sliderId + "').slick({dots : true, autoplay : true, adaptiveHeight : true, arrows : true, slidesToShow: 3, slidesToScroll: 3});");
					$('.sl_img').height('280');
			break;
		case '3' : eval("$('#" + sliderId + "').slick({centerMode: true,centerPadding: '60px',slidesToShow: 3,responsive: [{breakpoint: 768,settings: {arrows: false,centerMode: true,centerPadding: '40px',slidesToShow: 3}},{breakpoint: 480,settings: {arrows: false,centerMode: true,centerPadding: '40px',slidesToShow: 1}}]});");
					$('.sl_img').height('280');
			break;
	}

}