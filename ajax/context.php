<?php

$data = array_map('trim', $_POST);
$result = '';
$tpl = '';  //хранит шаблон формы настройки

$sl_images = json_decode($data['sl_imgs']);

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
		$tpl .= "<h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#slider_img'>Слайды</a></h4>";
		$tpl .= "</div>";
		$tpl .= "<div id='slider_img' class='panel-collapse collapse'>";
		$tpl .= "<div class='panel-body slider-img'>";

		foreach($sl_images as $src)
		{
			$tpl .= "<div style='position: relative;'>";
			$tpl .= "<i onclick='deleteBackgroundImg($(this)); return false;' class='fa fa-times del-back-img' aria-hidden='true' title='Удалить'></i>";
			$tpl .= "<img data='/var/www/ducoll/data/www/lp.rosgid.ru{$src}' class='back-img' src='{$src}'/>";
			$tpl .= "</div>";
		}

		$tpl .= "</div>";
		$tpl .= "</div>";
		$tpl .= "</div>";
		/*end слайды*/

		$tpl .= "</div>";
		/*end аккордион панель*/

		
		$tpl .= "<div class='settings-box'>";

		$tpl .= "</div>";
		$tpl .= "</div>";

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