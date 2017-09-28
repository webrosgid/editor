
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
					$('.sl-img').height('650');
			break;
		case '2' : eval("$('#" + sliderId + "').slick({dots : true, autoplay : true, adaptiveHeight : true, arrows : true, slidesToShow: 3, slidesToScroll: 3});");
					$('.sl-img').height('280');
			break;
		case '3' : eval("$('#" + sliderId + "').slick({centerMode: true,centerPadding: '60px',slidesToShow: 3,responsive: [{breakpoint: 768,settings: {arrows: false,centerMode: true,centerPadding: '40px',slidesToShow: 3}},{breakpoint: 480,settings: {arrows: false,centerMode: true,centerPadding: '40px',slidesToShow: 1}}]});");
					$('.sl-img').height('280');
			break;
	}

}

function saveSettingSlide(){
	var src ='';
	var header = '';
	var text = '';
	var metka = '';

	var id = $('.sliders-panel').attr('id_sl');
	var slider = $('#' + id);

	$('.sliders-panel-slide').each(function() {
		metka = $('#srcMetka').val();
		src = $(this).find('img').attr('src');
		header = $(this).find('.sl-set-header').val();
		text = $(this).find('.sl-set-desc').val();

		slider.find('img').each(function(){
			if($(this).attr('src') === src){
				$(this).attr('src', src);
				$(this).next('.sl-text').find('.sl-header').html(header);
				$(this).next('.sl-text').find('.sl-desc').html(text);

			}
		});
	});
}


//Удалить слайд
function deleteSlide(btn) {
	var src = btn.attr('argument');
	var id = btn.attr('id_sl');

	$('#'+id).find('img').each(function(){
		if($(this).attr('src') === src){
			$(this).closest('.sl-slide').remove();
			$('#'+id).slick('slickRemove', $('.slick-slide').index(this) - 1)
		}
	});
	btn.closest('.sliders-panel-slide').remove();
}