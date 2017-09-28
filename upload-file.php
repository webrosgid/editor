<?php
define ('_ROSGID', true);
error_reporting (-1);

ini_set ('display_errors', true);
ini_set ('output_buffering', 'off');

function error ($text) {
	die ('<div class="element-notice-red">' . $text . '</div>');
}

function success ($text) {
	die ('<div class="element-notice-green">' . $text . '</div>');
}

$conf_init = array ('plug_access' => true, 'class_safe' => true);
require_once ($_SERVER['DOCUMENT_ROOT'] . '/init.php');

//	Папка загрузки для изображений:
$uploaddir = ROOT . SITEURL . '/tpl/lp/'.$_COOKIE['landing_edit'].'/images/';

//	Объявляем имя файла:
$fileName = mt_rand (10000,100000) . '.jpg';

if ( $_FILES['uploadfile']['error'] == UPLOAD_ERR_OK ) {

	//	Проверяем существует ли папка на сервере:
	if ( ! file_exists ($uploaddir) ) @mkdir( $uploaddir, 0755 );

	//	Перемещаем файл в папку домена:
	move_uploaded_file ( $_FILES['uploadfile']['tmp_name'], $uploaddir . $fileName );

	//	Выводим сообщение о успешной загрузки файла:
	echo $fileName;

} else die('error');





?>