<?php

$data = array_map('trim', $_POST);
$result = '';
$tpl = '';  //хранит шаблон формы настройки

$sliders = $data['sliders'];

switch($data['context']){
	//Формируем форму настройки фона страницы
	case 'lp_background':
		$tpl .= "<div id='formSetting' class='form-setting'>";
		$tpl .= "<div class='title-setting'>Настройка фона страницы</div>";
		$tpl .= "<div class='input-group'>";
		$tpl .= "<span class='input-group-addon'>Тип фона страницы</span>";
		$tpl .= "<select id='selectTypeBackground' class='form-control'>";
		$tpl .= "<option value='type-none'>Нет фона</option>";
		$tpl .= "<option value='type-color'>Цвет</option>";
		$tpl .= "<option value='type-img'>Изображение</option>";
		$tpl .= "</select>";
		$tpl .= "</div>";
		$tpl .="<div class='settings-box'>";
		$tpl .="</div>";
		$tpl .= "</div>";

		$result = "$('#settingPanel').find('.setting-content').html(\"{$tpl}\");";
		break;

	//Формируем форму настройки шапки страницы
	case 'header':
		$tpl .= "<div id='formSetting' class='form-setting'>";
		$tpl .= "<div class='title-setting'>Настройка шапки</div>";

		$tpl .= "<div class='head-setting'>Фон шапки</div>";
		$tpl .= "<div class='input-group'>";
		$tpl .= "<span class='input-group-addon'>Тип фона</span>";
		$tpl .= "<select id='selectTypeBackground' id-block='{$data['id']}' class='form-control'>";
		$tpl .= "<option value='type-none'>Нет фона</option>";
		$tpl .= "<option value='type-color'>Цвет</option>";
		$tpl .= "<option value='type-img'>Изображение</option>";
		$tpl .= "</select>";
		$tpl .= "</div>";

		$tpl .="<div class='settings-box'>";
		$tpl .="</div>";

		$tpl .= "</div>";

		$result = "$('#settingPanel').find('.setting-content').html(\"{$tpl}\");";
		break;

	//Формируем форму настройки подвала страницы
	case 'footer':
		$tpl .= "<div id='formSetting' class='form-setting'>";
		$tpl .= "<div class='title-setting'>Настройка подвала</div>";

		$tpl .= "<div class='head-setting'>Фон подвала</div>";
		$tpl .= "<div class='input-group'>";
		$tpl .= "<span class='input-group-addon'>Тип фона</span>";
		$tpl .= "<select id='selectTypeBackground' id-block='{$data['id']}' class='form-control'>";
		$tpl .= "<option value='type-none'>Нет фона</option>";
		$tpl .= "<option value='type-color'>Цвет</option>";
		$tpl .= "<option value='type-img'>Изображение</option>";
		$tpl .= "</select>";
		$tpl .= "</div>";

		$tpl .="<div class='settings-box'>";
		$tpl .="</div>";

		$tpl .= "</div>";

		$result = "$('#settingPanel').find('.setting-content').html(\"{$tpl}\");";
		break;

	//Формируем форму настройки слайдера
	case 'slider':
		$tpl .= "<div id='formSetting' class='form-setting'>";
		$tpl .= "<div class='title-setting'>Настройка галереи</div>";

		/*аккордион панель*/
		$tpl .= "<div class='panel-group' id='accordion'>";

		/*вид слайдера*/
		$tpl .= "<div class='panel panel-default'>";
		$tpl .= "<div class='panel-heading'>";
		$tpl .= "<h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#view_type'>Вид галереии</a></h4>";
		$tpl .= "</div>";
		$tpl .= "<div id='view_type' class='panel-collapse collapse in'>";
		$tpl .= "<div class='panel-body view-type'>";
		$tpl .= "<img view='1' slider_id='{$data['id']}' src='/editor/images/sl_type_1.png' onclick='setSliderView($(this));'>";
		$tpl .= "<img view='2' slider_id='{$data['id']}' src='/editor/images/sl_type_2.png' onclick='setSliderView($(this));'>";
		$tpl .= "<img view='3' slider_id='{$data['id']}' src='/editor/images/sl_type_3.png' onclick='setSliderView($(this));'>";
		$tpl .= "</div>";
		$tpl .= "</div>";
		$tpl .= "</div>";
		/*end вид слайдера*/

		/*слайды*/
		$tpl .= "<div class='panel panel-default'>";
		$tpl .= "<div class='panel-heading'>";
		$tpl .= "<h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#sliders'>Слайды</a></h4>";
		$tpl .= "</div>";
		$tpl .= "<div id='sliders' class='panel-collapse collapse'>";
		$tpl .= "<div class='panel-body sliders-panel' id_sl = '{$data['id']}'>";

		$sliders = explode('#', $sliders);

		for($i = 0; $i<count($sliders)-1; $i++)
		{
			$slide = explode('~', $sliders[$i]);
			$tpl .= "<div class='sliders-panel-slide' number='{$i}'>";
			$tpl .= "<img class='back-img' onclick='showGallery({$i});' prevsrc='{$slide[0]}' src='{$slide[0]}'/>";
			$tpl .= "<div class='sliders-panel-desc'>";
			$tpl .= "<div class='input-group sett-desc'>";
			$tpl .= "<span class='input-group-addon'>Заголовок</span>";
			$tpl .= "<input type='text' class='form-control sl-set-header' value='{$slide[1]}'>";
			$tpl .= "</div>";
			$tpl .= "<div class='input-group sett-desc'>";
			$tpl .= "<span class='input-group-addon'>Описание</span>";
			$tpl .= "<textarea rows='5' class='form-control sl-set-desc'>{$slide[2]}</textarea>";
			$tpl .= "</div>";
			$tpl .= "<button class='btn btn-sm' argument = '{$slide[0]}' id_sl = '{$data['id']}' onclick='deleteSlide($(this));'>Удалить</button>";
			$tpl .= "</div>";
			$tpl .= "</div>";
		}

		$tpl .= "</div>";
		$tpl .= "<div class='block-upload'><div>Загрузка файлов для галереи</div><div id='uploadBtn' class='btn upload-btn'><span>Выбрать файл<span></div><span id='statusUpload'></span></div>";
		$tpl .= "<button class='btn btn-sm' onclick='saveSettingSlide();'>Сохранить</button>&nbsp";
		$tpl .= "</div>";
		$tpl .= "</div>";
		/*end слайды*/

		$tpl .= "</div>";
		/*end аккордион панель*/

		
		$tpl .= "<div class='settings-box'>";

		$tpl .= "</div>";
		$tpl .= "</div>";
		$tpl .= "<script>uploadImages('slider');</script>";

		$result = "$('#settingPanel').find('.setting-content').html(\"{$tpl}\");";
		break;

	//Формируем форму настройки текстового блока
	case 'text_block':
		$tpl .= "<div id='formSetting' class='form-setting'>";
		$tpl .= "<div class='title-setting'>Настройка текстового блока</div>";

		$tpl .= "<div class='head-setting'>Фон текстового блока</div>";
		$tpl .= "<div class='input-group'>";
		$tpl .= "<span class='input-group-addon'>Тип фона</span>";
		$tpl .= "<select id='selectTypeBackground' id-block='{$data['id']}' class='form-control'>";
		$tpl .= "<option value='type-none'>Нет фона</option>";
		$tpl .= "<option value='type-color'>Цвет</option>";
		$tpl .= "<option value='type-img'>Изображение</option>";
		$tpl .= "</select>";
		$tpl .= "</div>";

		$tpl .="<div class='settings-box'>";

		$tpl .="</div>";
		$tpl .= "</div>";

		$result = "$('#settingPanel').find('.setting-content').html(\"{$tpl}\");";
		break;

	//Формируем форму настройки главного меню
	case 'menu':
		$tpl .= "<div id='formSetting' class='form-setting'>";
		$tpl .= "<div class='title-setting'>Настройка главного меню</div>";

		$tpl .= "<div class='head-setting'>Фон меню</div>";
		$tpl .= "<div class='input-group'>";
		$tpl .= "<span class='input-group-addon'>Тип фона</span>";
		$tpl .= "<select id='selectTypeBackground' id-block='{$data['id']}' class='form-control'>";
		$tpl .= "<option value='type-none'>Нет фона</option>";
		$tpl .= "<option value='type-color'>Цвет</option>";
		$tpl .= "<option value='type-img'>Изображение</option>";
		$tpl .= "</select>";
		$tpl .= "</div>";
		$tpl .="<div class='settings-box'>";
		$tpl .="</div>";

		$tpl .= "<div class='head-setting'>Поведение меню</div>";
		$tpl .= "<div class='input-group'>";
		$tpl .= "<span class='input-group-addon'>Позиционирование меню</span>";
		$tpl .= "<select id='selectTypeMenu' id-block='{$data['id']}' class='form-control'>";
		$tpl .= "<option value='type-none'>Зафиксированное</option>";
		$tpl .= "<option value='type-fix'>Фиксация при опускании страницы</option>";
		$tpl .= "<option value='type-abs'>С наложением на следующий блок, но без фиксации</option>";
		$tpl .= "</select>";
		$tpl .= "</div>";
		$tpl .="<div class='settings-box-position'>";
		$tpl .="</div>";

		$tpl .= "<div class='head-setting'>Фон кнопок</div>";
		$tpl .= "<div class='input-group'>";
		$tpl .= "<span class='input-group-addon'>Тип фона</span>";
		$tpl .= "<select id='selectTypeBackgroundButton' id-block='{$data['id']}' class='form-control'>";
		$tpl .= "<option value='type-none'>Нет фона</option>";
		$tpl .= "<option value='type-coloring'>Цвет</option>";
		$tpl .= "</select>";
		$tpl .= "</div>";
		$tpl .="<div class='settings-box-btn'>";
		$tpl .="</div>";

		$tpl .= "</div>";

		$result = "$('#settingPanel').find('.setting-content').html(\"{$tpl}\");";
		break;

	//Формируем форму настройки карты
	case 'map':
		$tpl .= "<div id='formSetting' class='form-setting'>";
		$tpl .= "<div class='title-setting'>Настройка карты</div>";
		$tpl .="<div class='settings-box'>";
		$tpl .="</div>";
		$tpl .= "</div>";

		$result = "$('#settingPanel').find('.setting-content').html(\"{$tpl}\");";
		break;

	default:
		$result = "$('#settingPanel').find('.setting-content').html('');";
		break;

}

echo $result;