//задать вид слайдера
function setSliderView(item) {
	var sliderId = item.attr('slider_id');
	var view = item.attr('view');
	$('#'+sliderId).slick("unslick");
	var img = $('#' + sliderId).find('.sl-img');
	var code = '';

	switch(view){
		case '1' :
			code = "$('#" + sliderId + "').slick({dots : true, autoplay : true, adaptiveHeight : true, arrows : true});";
			eval(code);
			img.height('650');
			break;

		case '2' :
			code = "$('#" + sliderId + "').slick({dots : true, autoplay : true, adaptiveHeight : true, arrows : true, slidesToShow: 3, slidesToScroll: 3});";
			eval(code);
			img.height('280');
			break;

		case '3' :
			code ="$('#" + sliderId + "').slick({centerMode: true,centerPadding: '60px',slidesToShow: 3,responsive: [{breakpoint: 768,settings: {arrows: false,centerMode: true,centerPadding: '40px',slidesToShow: 3}},{breakpoint: 480,settings: {arrows: false,centerMode: true,centerPadding: '40px',slidesToShow: 1}}]});";
			eval(code);
			img.height('280');
			break;
		default:
			code = "$('#" + sliderId + "').slick({dots : true, autoplay : true, adaptiveHeight : true, arrows : true});";
			eval(code);
			img.height('650');
			break;
	}

	$('#code_' + sliderId).html(code);

}

//Сохранить настройки слайдера
function saveSettingSlide(){
	var src ='';
	var header = '';
	var text = '';
	var metka = '';

	var id = $('.form-setting').attr('id_slider');
	var slider = $('#' + id);

	slider.slick('unslick');

	$('.sliders-panel-slide').each(function() {
		metka = $(this).find('img').attr('prevsrc');
		src = $(this).find('img').attr('src');
		header = $(this).find('.sl-set-header').val();
		text = $(this).find('.sl-set-desc').val();

		if(slider.find('img[src^="'+metka+'"]').length > 0){
			slider.find('img[src^="'+metka+'"]').each(function(){
				$(this).attr('src', src);
				$(this).next('.sl-text').find('.sl-header').html(header);
				$(this).next('.sl-text').find('.sl-desc').html(text);
			});
		}else{
			var html="<div class='sl-slide'>"+
			"<img class='sl-img' src='"+src+"'>"+
				"<div class='sl-text'>"+
				"<div class='sl-header'>"+header+"</div>"+
			"<div class='sl-desc'>"+text+"</div>"+
			"</div>"+
			"</div>";

			slider.prepend(html);
		}

	});

	var code = $('#code_'+id).html();
	eval(code);
}

//Удалить слайд
function deleteSlide(btn) {
	var src = btn.attr('argument');
	var id = $('.form-setting').attr('id_slider');

	$('#'+id).find('img').each(function(){
		if($(this).attr('src') === src){
			$(this).closest('.sl-slide').remove();
			$('#'+id).slick('slickRemove', $('.slick-slide').index(this) - 1)
		}
	});
	btn.closest('.sliders-panel-slide').remove();
}

//Открыть галерею картинок для слайдера
function showGallery(num) {
	getImages('slider');
	$('.images-slider').attr('number', num);
	$('#slideImages').attr('style', 'width : 1200px; display: block; margin-left: -495px;');
	$('#slideImages').find('.modal-dialog').attr('style', 'width : 1200px');
	showModal('#slideImages');
}

//закрыть галерею
function hideGallery() {
	hideModal('#slideImages');
}

//Выбрать изображение для слайда
function selectImageToSlide(img) {
	var slideNum = img.closest('.images-slider').attr('number');
	var src = img.attr('src');
	$('.sliders-panel-slide[number^='+slideNum+']').find('img').attr('src', src);
}

//отмена выбора изображения для слайда
function cancelSelectImgToSlide() {
	var slideNum = $('.images-slider').attr('number');
	var img = $('.sliders-panel-slide[number^='+slideNum+']').find('img');
	img.attr('src', img.attr('prevsrc'));
}

//добавить слайд
function addSlide(btn) {
	var number = $('.sliders-panel-slide').length;

	var html = "<div class='sliders-panel-slide' number='"+number+"'>" +
		"<img class='back-img' onclick='showGallery("+number+");' prevsrc='/editor/images/no-image.png' src='/editor/images/no-image.png'>" +
		"<div class='sliders-panel-desc'><div class='input-group sett-desc'>" +
			"<span class='input-group-addon'>Заголовок</span><input type='text' class='form-control sl-set-header' value='Заголовок'>" +
		"</div>" +
		"<div class='input-group sett-desc'>" +
			"<span class='input-group-addon'>Описание</span><textarea rows='5' class='form-control sl-set-desc'>Описание слайда</textarea>" +
		"</div>" +
		"<button class='btn btn-sm' argument='#' onclick='deleteSlide($(this));'>Удалить</button>" +
		"</div></div>";

	btn.after(html);
}