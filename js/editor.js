var ckeditors = [];

$(document).ready(function() {
	var page = $('#page');

	$('.site-header').height($('.site-header').height());
	$('.site-footer').height($('.site-footer').height());

	/*Отображение и скрытие рамки при наведении на компонент страницы*/
	page.on('mouseenter', '.el', function() {
		if($('.header').css('display') != 'none' && $('#statusSettingFrame').val() != 'none') {
			var btn  = '';
			var link = '';
			var type = $(this).children().attr('type');
			var type2 = $(this).children().children().attr('type');

			if(type != 'footer' && type != 'header') {

				if(type2 != 'menu') {
					link = '<i class="fa fa-link" onclick="addLink($(this));" aria-hidden="true" title="Привязать к пункту меню"></i>';
				}

				btn = link +
					'<i class="fa fa-arrow-up" onclick="liftUp($(this));" aria-hidden="true" title="Вверх"></i>' +
					'<i class="fa fa-arrow-down" onclick="liftDown($(this))" aria-hidden="true" title="Вниз"></i>' +
					'<i class="fa fa-trash" onclick="removeBlock($(this))" aria-hidden="true" title="Удалить блок"></i>';
			}

			$(this).prepend('<div class="setting-frame">' +
				'<i class="fa fa-cog" onclick="startSetting($(this));" aria-hidden="true" title="Настройки"></i>' + btn +
				'</div>'
			);

			$(this).css({
				'border-color': '#3E94D1',
				'z-index'     : '3'
			});

			styleMoveElement(true);
		}
		else
		{
			$('.move-list').sortable();
			$('.move-list').sortable('destroy');
			styleMoveElement(false);
		}
	});

	page.on('mouseleave', '.el', function() {
		$(this).find('.setting-frame').remove();
		$(this).css({
			'border-color' : '',
			'z-index' : ''
		});
	});
	/**********************************************************************/

	/*Выбор типа фона для страницы*/
	$('.setting-content').on('change', '#selectTypeBackground', function() {
		var value = $(this).val();
		var idBlock = $(this).attr('id-block');
		generateFormFromSettingBackground(value, idBlock);
	});
	/****************************************************/

	/*Выбор типа меню для страницы*/
	$('.setting-content').on('change', '#selectTypeMenu', function() {
		var value = $(this).val();
		var idBlock = $(this).attr('id-block');
		generateFormFromSettingMenu(value, idBlock);
	});
	/****************************************************/

	/*Выбор фона кнопок меню для страницы*/
	$('.setting-content').on('change', '#selectTypeBackgroundButton', function() {
		var value = $(this).val();
		var idBlock = $(this).attr('id-block');
		generateFormFromSettingBackgroundButton(value, idBlock);
	});
	/****************************************************/

	/* Перетаскивание элементов в блоке */
	$('.move-list').sortable({
		axis: "x",
		containment: ".move-list",
		classes: {
			"ui-sortable-helper": "move-element"
		},
		distance : 10,
		cursor: 'move',
	});
	/********************************************/

	/*Редактирование текста на странице*/
	page.on('dblclick', 'div [contenteditable]', function() {
		var id = $(this).attr("id");
		if ( id === undefined || id === false) {
			id = str_rand();
			$(this).attr('id', id);
		}

		if($(this).attr('cktype') == 'small')
		{
			CKEDITOR.inline(id, { customConfig: '/editor/library/ckeditor/myconfig.js' });
		}
		else
		{
			CKEDITOR.inline(id);
		}
	});
	/***************************************************/


	/*Привязка якоря*/
	var index = 'page_head';
	var info = $('div[type=text_block]').attr('id');
	var contact = $('div[type=callback]').attr('id');
	var mas = [index, info, contact];
	var i =0;
	$('.menu-item').each(function() {
		$(this).find('a').attr('href', '#'+mas[i]);
		i++;
	});
	/******************/
});

//сохранить настройки блока
function saveSetting() {
	var type = $('.form-setting').attr('type_setting')

	switch(type){
		case 'map': saveMapSetting(); break;
		case 'slider': saveSettingSlide(); break;
	}

	closeSettingPanel();
}

//Открыть панель настроек
function openSettingPanel() {
	$('#settingPanel').slideDown(500);
}

//Закрыть панель настроек
function closeSettingPanel() {
	$('#settingPanel').slideUp(500);
}

//Клик по шестеренке настроек
function startSetting(block) {
	var data = '';
	var type = getTypeBlock(block);
	var id = getIdBlock(block);
	data += "&context=" + type;
	data += "&id=" + id;

	if(type === 'slider'){
		var sliders = getSliders(id);
		data += "&sliders=" + sliders;
	}
	uploadContextSetting(data);
}

//Отправка контекста для отображения соответствующих настроек
function uploadContextSetting(data){
	if(data === 'lp_background'){
		data = "&context=" + 'lp_background';
	}
	$.post('/editor/ajax/context.php', data, function(data) {
		eval(data);
		openSettingPanel();
	});
}

//Загрузка панели выбора цвета фона
function loadPicker(idBlock) {
	var picker = $.farbtastic('#selectColor');
	picker.setColor('#fff');
	picker.linkTo(function(color) {
		if(idBlock == undefined)
		{
			$('body').css('background-color', color);
		}
		else
		{
			$('#'+idBlock).closest('.el').css('background-color', color);
		}
	});
}

//Загрузка панели выбора цвета фона для кнопок
function loadPickerButton(idBlock) {
	var picker = $.farbtastic('#selectColor');
	picker.setColor('#fff');
	picker.linkTo(function(color) {
		if(idBlock == undefined)
		{
			$('body').css('background-color', color);
		}
		else
		{
			$("a[data^='menu']").css({'background-color': color, 'padding':'7px 7px 7px 7px'});
		}
	});
}

//Получить изображения для фона
function getImages(dir,idBlock) {
	$.post('/editor/ajax/get.images.php', {idBlock : idBlock, dir : dir}, function(data) {
		if(dir === 'slider'){
			$('.images-slider').html(data);
		}else {
			$('.images-default').html(data);
		}
	})
}

//генерация элементов форми при выборе типа фона страницы
function generateFormFromSettingBackground(value, idBlock) {
	switch(value)
	{
		case 'type-none':
			clearSetting('background', idBlock);
			break;

		case 'type-color':
			clearSetting('background', idBlock);
			$('.settings-box').html("<link href='/editor/library/farbtastic/farbtastic.css' rel='stylesheet' type='text/css'>" +
				"<div>Выберете цвет</div>" +
				"<div id='selectColor' class='select-color'></div>" +
				"<script src='/editor/library/farbtastic/farbtastic.js' type='text/javascript' charset='UTF-8'></script>"
			);
			loadPicker(idBlock);
			break;

		case 'type-img':
			clearSetting('background', idBlock);
			getImages('background', idBlock);
			$('.settings-box').html(
				"<div>Выбрать один из вариантов</div>" +
				"<div class='images-default'></div>"+
				"<div class='block-upload'><div>Загрузка изображений для фона</div><div id='uploadBtn' class='btn upload-btn'><span>Выбрать файл<span></div><span id='statusUpload'></span></div>"
			);
			uploadImages('background', idBlock);

			break;
	}
}

//генерация элементов формы меню при выборе типа отображения меню на странице
function generateFormFromSettingMenu(value, idBlock) {  console.log(value);
	switch(value)
	{
		case 'type-none':
			clearSetting('position', idBlock);
			clearSetting('z-index', idBlock);
			clearSetting('top', idBlock);
			clearSetting('left', idBlock);
			$('#'+idBlock).css({'z-index':'99', 'position':'static'});
			console.log(value);
			break;

		case 'type-fix':
			clearSetting('position', idBlock);
			clearSetting('z-index', idBlock);
			clearSetting('top', idBlock);
			clearSetting('left', idBlock);
			$('#'+idBlock).css({'position':'fixed',
				'z-index':'99',
				'top':'10%',
				'left':'31%'});
			console.log(value);
			break;

		case 'type-abs':
			clearSetting('position', idBlock);
			clearSetting('z-index', idBlock);
			clearSetting('top', idBlock);
			clearSetting('left', idBlock);
			$('#'+idBlock).css({'top':'40%','z-index':'99', 'position':'relative'});
			console.log(value);
			break;
	}
}

//генерация элементов форми при выборе типа фона кнопок страницы
function generateFormFromSettingBackgroundButton(value, idBlock) {
	switch(value)
	{
		case 'type-none':
			clearSetting('background', idBlock);
			break;

		case 'type-coloring':
			clearSetting('background', idBlock);
			$('.settings-box-btn').html("<link href='/editor/library/farbtastic/farbtastic.css' rel='stylesheet' type='text/css'>" +
				"<div>Выберете цвет</div>" +
				"<div id='selectColor' class='select-color'></div>" +
				"<script src='/editor/library/farbtastic/farbtastic.js' type='text/javascript' charset='UTF-8'></script>"
			);
			loadPickerButton(idBlock);
			break;
	}
}

/*установить картинку на фон*/
function setImageBackground(url, idBlock) {
	var href = "url('"+url+"')";

	if(idBlock == ''){
		$('body').css({
			'background' : href,
			'background-size' : '100%'
		});
	}
	else
	{
		$('#'+idBlock).closest('.el').css({
			'background' : href,
			'background-size' : '100%'
		});
	}
}

//загрузка изображения для фона страницы
// function uploadImgBackground(input) {
// 	var file = input.prop('files')[0];
// 	var form_data = new FormData();
// 	form_data.append('file', file);
//
// 	$.ajax({
// 		url: '/editor/ajax/upload.php',
// 		dataType: 'text',
// 		cache: false,
// 		contentType: false,
// 		processData: false,
// 		data: form_data,
// 		type: 'post',
// 		success: function(result){
// 			console.log(result);
// 			input.prop('value', null);
// 			getImagesBackground();
// 		}
// 	});
// }

//удалить изображение для фона из панели настроек
function deleteImage(item) {
	var img = item.next('img');
	var file = img.attr('data');
	$.post('/editor/ajax/delete.file.php', {file : file}, function() {
		getImages('background');
	})

}

//очистить настройки по типу (пока так)
function clearSetting(type, idBlock) {
	if(type == 'background')
	{
		if(idBlock == undefined) {
			$('.settings-box').html('');
			$('body').css('background-color', '');
			$('body').css('background', '');
		}
		else
		{
			$('.settings-box').html('');
			$('.settings-box-btn').html('');
			$('#'+idBlock).css('background-color', '');
			$('#'+idBlock).css('background', '');
		}
	}

	/*удаление стилей*/
	if(type == 'position')
	{

		$('.settings-box').html('');
		$('#'+idBlock).css('positon', '');
	}
	if(type == 'z-index')
	{

		$('.settings-box').html('');
		$('#'+idBlock).css('z-index', '');

	}
	if(type == 'top')
	{

		$('.settings-box').html('');
		$('#'+idBlock).css('top', '');

	}
	if(type == 'left')
	{

		$('.settings-box').html('');
		$('#'+idBlock).css('left', '');

	}
}

//скрыть главную панель инструментов
function hideToolbar() {
	$('.header').slideUp();
	$('.space').slideUp();
	$('.blocks-btn').slideUp();
	$('.fa-eye-slash').css('display', 'none');
	$('.fa-eye').css('display', 'block');
	closeSettingPanel();
}

//показать главную панель инструментов
function showToolbar() {
	$('.header').slideDown();
	$('.space').slideDown();
	$('.blocks-btn').slideDown();
	$('.fa-eye-slash').css('display', 'block');
	$('.fa-eye').css('display', 'none');
}

/*Смена блоком местами*/
//Поместить блок над предыдущим
function liftUp(up) {
	var prevType = up.closest('.el').prev().children().attr('type');
	if(prevType != 'header'){
		up.closest('.el').insertBefore(up.closest('.el').prev());
	}
	return false;
}

//Поместить блок под блок снизу
function liftDown(down) {
	var nextType = down.closest('.el').next().children().attr('type');
	if(nextType != 'footer') {
		down.closest('.el').insertAfter(down.closest('.el').next());
	}
	return false;
}
/**********************************/

//открыть модальное окно
function showModal(id) {
	$(id).modal('show');
}

//скрыть модальное окно
function hideModal(id) {
	$(id).modal('hide');
}

//Добавить выбранные блоки на страницу
function addSelectBlocks() {
	var arrSelBlocks = [];
	$('.type-blocks').find('input:checked').each(function() {
		arrSelBlocks.push($(this).val());
	});
	var jsn = JSON.stringify(arrSelBlocks);

	$.post('/editor/ajax/get.blocks.php', {jsn : jsn} ,  function(result) {
		result = JSON.parse(result);
		$('.content').append(result.content);

		for(var i=0; i<result.type.length; i++)
		{
			// var selector = '#head_'+result.type[i];
			//
			// if(!$("#page_head *").is(selector)){
			// 	$("#page_head").append(result.head[i]);
			// }

			var code = '';
			if(result.type[i] == 'slider'){
				code = "$('#"+result.id[i]+"').slick({autoplay : true, adaptiveHeight : true, arrows : true, dots : true});";
				eval(code);
			}


		}
	});

	hideModal('#addBlockModal');
	cancelAddBlocks();

	var height = $("body").height();
	$("html,body").animate({"scrollTop":height},5);
}

//Добавить блок
function addBlock(block) {
	var arrBlocks = [];
	arrBlocks.push(block.val());
	var jsn = JSON.stringify(arrBlocks);

	$.post('/editor/ajax/get.blocks.php', {jsn : jsn} ,  function(result) {
		result = JSON.parse(result);
		$('.content').append(result.content);

		for(var i=0; i<result.type.length; i++)
		{
			// var selector = '#head_'+result.type[i];
			//
			// if(!$("#page_head *").is(selector)){
			// 	$("#page_head").append(result.head[i]);
			// }

			var code = '';
			if(result.type[i] == 'slider'){
				code = "$('#"+result.id[i]+"').slick({autoplay : true, adaptiveHeight : true, arrows : true, dots : true});";
				eval(code);
			}
		}

		var height = $("body").height();
		$("html,body").animate({"scrollTop":height},5);
	});
}

//отмена добавления блоков
function cancelAddBlocks() {
	$('.type-blocks').find('input:checked').each(function() {
		$(this).prop('checked', false);
	});
}

//Удалить блок
function removeBlock(block){
	if(lastBlockGiveTypeToPage(block)){
		var type = getTypeBlock(block);
		var selector = '#head_' + type;
		$(selector).remove();
	}
	block.closest('.el').remove();
}

//Определить последний ли блок данного типа на странице
function lastBlockGiveTypeToPage(block) {
	var count = 0;
	var type = getTypeBlock(block);
	var selector = 'div [type=' + type + ']'
	count = $(selector).length;

	if(count == 1){
		return true;
	}
	return false;
}

//вернуть тип элемента по панели (точка отчета выплывающая рамка настроек)
function getTypeBlock(panel) {
	var type = '';
	var rowElement = panel.parent('.setting-frame').parent('.el');

	if(rowElement.children('footer').attr('type') === 'footer')
	{
		type = 'footer';
	}
	else if(rowElement.children('header').attr('type') === 'header')
	{
		type = 'header';
	}
	else
	{
		type = rowElement.children('#el_container').children('div').attr('type');
	}
	return type;
}

//вернуть id элемента по панели (точка отчета выплывающая рамка настроек)
function getIdBlock(panel) {
	var id = '';
	var rowElement = panel.parent('.setting-frame').parent('.el');

	if(rowElement.children('footer').attr('type') === 'footer')
	{
		id = rowElement.children('footer').attr('id');
	}
	else if(rowElement.children('header').attr('type') === 'header')
	{
		id = rowElement.children('header').attr('id');
	}
	else
	{
		id = rowElement.children('#el_container').children('div').attr('id');
	}
	return id;
}

//Стили для сортируемого элемента (задает возможность выделения сортируемого элемента)
function styleMoveElement(set) {
	if(set == true)
	{
		$('.move-item').mouseenter(function() {
			$(this).css({
				'cursor': 'move',
				'border': '1px solid grey'
			});
		});

		$('.move-item').mouseleave(function() {
			$(this).css({
				'cursor': 'default',
				'border': ''
			});
		});
	}
	else
	{
		$('.move-item').mouseenter(function() {
			$(this).css({
				'cursor' : 'default',
				'border' : ''
			});
		});

		$('.move-item').mouseleave(function() {
			$(this).css({
				'cursor' : 'default',
				'border' : ''
			});
		});
	}
}

//добавить пункт меню модальное окно
function addLink(block) {
	var bid=getIdBlock(block);
	showModal('#addModalMenu');
	$('#idBlock').val(bid);
}

//Добавление пункта меню в блок меню
function addLinkMenu() {

	var bid=$('#idBlock').val();
	$('div [type="menu"]').find('ul').append('<li class="menu-item move-item"><a href="#'+bid+'" data="menu">'+$('#textMenu').val()+'</a></li>');
	hideModal('#addModalMenu');
}

//генерирует случайное имя из 5 символов
function str_rand() {
	var result       = '';
	var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	var max_position = words.length - 1;
	for( i = 0; i < 5; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}
	return result;
}

//Получить слайды из слайдера с id
function getSliders(id) {
	var sliders = '';
	var sl = [];
	var testArr = [];
	var img = '';
	var header = '';
	var text = '';

	$('#'+id).find('.sl-img').each(function()
	{
		img =  $(this).attr('src');
		header = $(this).next('.sl-text').find('.sl-header').html();
		text = $(this).next('.sl-text').find('.sl-desc').html();

		sl = img +'~' + header + '~' + text;

		if(testArr.indexOf(img) === -1) {
			sliders += sl + "#";
			testArr.push(img);
		}
	});
	return sliders;
}

//загрузка изображений
function uploadImages(dir, idBlock) {
	$(function(){
		var btnUpload=$('#uploadBtn');
		var status=$('#statusUpload');
		new AjaxUpload(btnUpload, {
			action: '/editor/ajax/upload.img.php',
			name: 'uploadimg',
			type:'post',
			data:{dir : dir},
			onSubmit: function(file, ext)
			{
				if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext)))
				{
					status.text('Поддерживаемые форматы JPG, PNG или GIF');
					return false;
				}
				status.text('Загрузка...');
			},
			onComplete: function(file, response)
			{
				status.text('');
				if(response==="success")
				{
					if(dir === 'background'){
						getImages('background', idBlock);
					}else if(dir === 'slider'){
						getImages('slider');
					}

					$('.block-upload').append('<div class="status-load">Файл загружен!</div>');
					setTimeout(function() { $(".status-load").remove(); }, 5000);
				}
				else
				{
					//$('<li></li>').appendTo('#files').text('Файл не загружен' + file).addClass('error');
				}
			}
		});

	});
}



