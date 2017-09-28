 <?php
	//	Объявляем константу безопасного подключения файлов:
	define ('_ROSGID', true);
	
	//	Функция вывода ошибок:
	function error ($text)
	{
		echo '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html lang="ru"><head><meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>Rosgid Engine - Error!</title><link href="/css/error.css" rel="stylesheet" type="text/css"></head><body><div><h1>Rosgid Engine - Error!</h1><span>' . $text . '</span></div></body></html>';
	}
	
	//	Журналирование ошибок PHP:
	//error_reporting (E_ERROR | E_PARSE | E_NOTICE);

	//	Изменение настроек в INI файле PHP:
	ini_set ('display_errors', true);
	ini_set ('output_buffering', 'off');
	
	//	Объявляем конфигурацию для инициализации:
	$conf_init = array ('ini_configuration' => true, 'class_safe' => true, 'plug_access' => true);

	//	Подключение модулей и инициализация ядра:
	require_once ($_SERVER['DOCUMENT_ROOT'] . '/init.php');
	
	//	Подключаем файл с классом:
	require_once ($_SERVER['DOCUMENT_ROOT'] . '/editor/classes/template.class.php');


	// Подключайм файл базы данных
	require_once ($_SERVER['DOCUMENT_ROOT'] . '/db.php');

	//	Проверка на наличие Cookie Файла:
//	if ( !isset ($_COOKIE['landing_edit']) )
//	{
//		error ('Error - A Landing Page Is Not Selected.'); die;
//	}
//	else
//	{
//		//	Загружаем шаблон:
//		define ('TEMPLATE', $_COOKIE['landing_edit']);
//		$stack = $template->load(TEMPLATE);
//		if ( $stack == false ) { error ('Error - A Landing Page Is Not Loading.'); die; }
//	}


?>

<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Rosgid Engine 2.0 - Landing Page Editor</title>
<meta name="author" content="D.Creator">
<meta name="author" content="MegaBrain">
<?php if ( $template->editor == true ) {echo '<link href="http://' . SITEURL . '/tpl/lp/' . TEMPLATE . '/css/main.css" rel="stylesheet" type="text/css">' . "\r\n";} else {null;} ?>

<link href="/editor/css/style.css" rel="stylesheet" type="text/css">

<link href="/editor/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="/editor/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
<link href="/editor/css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="/editor/library/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
<link href="/editor/css/template.css" rel="stylesheet" type="text/css">
<link href="/editor/css/setting.css" rel="stylesheet" type="text/css">

<script src="/editor/js/jquery-3.1.1.min.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/library/jquery-ui/jquery-ui.min.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/js/bootstrap.min.js" type="text/javascript" charset="UTF-8"></script>

<script src="/editor/library/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/js/ajaxupload.3.5.js" type="text/javascript" charset="UTF-8"></script>

<script src="/editor/js/functions.js" type="text/javascript" charset="UTF-8"></script>
<script src="/editor/js/editor.js" type="text/javascript" charset="UTF-8"></script>

<?php
//if ( $template->editor == true )
//{
//	echo <<<SCRIPT
//<script type="text/javascript">
//	$(function() {
//		$("div.ui-draggable").draggable({
//			grid: [ 10, 10 ],
//			containment: ".wrap", scroll: false
//		});
//	});
//</script>
//SCRIPT;
//}

?>

</head>

<body>

<div class="header">
	<div class="border-head">
		<div class="container">
			<div id="top_menu" class="top-menu">
				<div class="span3">
					<img class="logo" src="images/logo.png" alt="Логотип Росгид">
				</div>

				<div class="control">
					<button id="addBlockBtn" onclick="showModal('#addBlockModal')" class="btn">Добавить блок</button>
					<button onclick="uploadContextSetting('lp_background');" class="btn">Фон страницы</button>
					<button id="saveBtn" class="btn"><img src="/editor/images/save-ico.png" alt="Сохранить">Сохранить</button>
				</div>

			</div>
		</div>
	</div>
</div>

<!--
Пока что закомментила, по скольку нужно сделать разделения по блокам-->
<!--<div class="clearHeader"></div>-->
<?//// echo htmlspecialchars_decode(stripslashes($stack));?>
<!--<input type="hidden" name="id" id="template_id" value="--><?php //echo TEMPLATE;?><!--">-->
<!--<input type="hidden" name="siteurl" id="siteurl" value="--><?php //echo SITEURL;?><!--">-->
<!--
<div class="modal hide fade in photos" id="wb_dialog_7" role="dialog" aria-hidden="false">
	<div class="modal-header">
		<button data-dismiss="modal" class="close" type="button">×</button>
		<h3>Изменить изображение</h3>
	</div>
	<div class="modal-body">
		<div class="tabbable">
			<ul class="nav nav-tabs" style="display: block;">
				<li class="active">
					<a data-toggle="tab" href="#wb_tab_pane_0_tab0">Галерея шаблонов</a>
				</li>
			</ul>
		<div class="tab-content" style="height: 300px; overflow-y: auto; opacity: 1;">
		<div class="tab-pane active" id="wb_tab_pane_0_tab0">
		<div style="position: relative;">
		<table style="width:100%;">
			<tbody>
				<tr>
					<td class="wb_menu_fields">
						<div class="form-inline clearfix wb_tab_head1">
							<label style="line-height:30px">Выбрать изображение ниже или</label>
							<button style="margin-left: 10px; position: relative; z-index: 0;" class="btn btn-info" id="upload">Загрузить новую фотографию</button>
						</div>
					</td>
				</tr>
				<tr>
					<td>
					<div id="files" >
					<?php
						/*$dir = ROOT . SITEURL . '/files/template/' . TEMPLATE . '/images/';

						$dir = ROOT . SITEURL . '//tpl/lp/' . TEMPLATE . '/images/';
						if(is_dir($dir)) {
							$files = scandir($dir);
							array_shift($files);
							array_shift($files);
							for($i=0; $i<sizeof($files); $i++)
								echo "<div><div class='over'><img src='http://".SITEURL."/tpl/lp/" . TEMPLATE . "/images/".$files[$i]."' alt='' title='' /></div><br /><span>".$files[$i]."</span></div>";
						}*/
					?>
					</div>
					<input type="hidden" id="selected_img_placeholder">
					</td>
				</tr>
			</tbody>
		</table>
		</div>
		</div>
		</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn" id="cancel">Отменить</button>
		<button type="button" class="btn btn-success" id="choose">Выбрать</button>
	</div>
</div>
-->

<?php
// Подключаем файл подключаемых файлов к блокам
require_once ($_SERVER['DOCUMENT_ROOT'] . '/editor/head.php');

$sql = $web->query("SELECT * FROM module_lp_block ORDER BY position");
$content_page = "";         //контент страницы
$content_page_head = "<div id='page_head'>";    //контент блока head страницы (блок div содержащий подключаемые файлы)

if($sql->num_rows > 0)
{
	while($row = $sql->fetch_assoc())
	{
		$sql_type = $web->query("SELECT * FROM module_lp_block_type WHERE id = {$row['id_type']} LIMIT 1");
		if($sql->num_rows > 0)
		{
			$row_type = $sql_type->fetch_assoc();
			$content_page_head .= $head_page[$row_type['name']];

			//Создаем уникальный идендификатор для блока
			$blockId = $row_type['name'] . "_" . substr(md5(microtime() . rand(0, 9999)), 0, 5);
			$pos = strpos($row['html'], 'type="' . $row_type['name'] . '"');
			$str1 = substr($row['html'], 0, $pos);
			$str2 = ' id="' . $blockId . '" ';
			$str3 = substr($row['html'], $pos, strlen($row['html']));
			$row['html'] = $str1 . $str2 . $str3;

			if($row_type['name'] == 'map')
			{
				$row['html'] .= <<<HTML
				<script>
					ymaps.ready(init);
					function init() {
						var geocoder = new ymaps.geocode('Санкт-Петербург,Оптиков,4/2', { results: 1 });
							geocoder.then(function (res) {
							var coord = res.geoObjects.get(0).geometry.getCoordinates();
							var map = new ymaps.Map('{$blockId}', {
								center: coord,
								zoom: 16,
								//behaviors: ['default', 'scrollZoom'],
								controls: ['mapTools']
							});
				
							map.geoObjects.add(res.geoObjects.get(0));
							map.controls.add('mapTools').add('zoomControl').add('typeSelector');
							}
						);
					}
				</script>
HTML;

			}
		}

		$content_page .= $row['html'];
	}
}

$content_page_head .= "</div>";
$content_page = $content_page_head . $content_page;
?>

<div class="space" style="height: 70px"></div>
<!--страница-->
<div id="page" class="container-fluid">
	<?=$content_page  ?>
</div>
<!--end страница-->

<!--панель добавления блоков-->
<div class="blocks-btn">
	<div class="blocks-btn-header">Добавить блок</div>
	<?php
	$sql_type_block = $web->query("SELECT * FROM module_lp_block_type");
	if($sql_type_block->num_rows > 0)
	{
		while($row_type = $sql_type_block->fetch_assoc())
		{
			if($row_type['name'] != 'footer' && $row_type['name'] != 'header')
			{
				echo "<button class='btn' value='{$row_type['id']}' onclick='addBlock($(this));'>{$row_type['title']}</button>";
			}
		}
	}
	?>
</div>
<!--end панель добавления блоков-->

<!--панель настроек-->
<div id="settingPanel" class="setting-panel" style="display: none;">
	<div class="btn-setting-group">
		<i class="fa fa-check-circle-o btn-save" aria-hidden="true"></i>
		<i class="fa fa-times-circle-o btn-close" onclick="closeSettingPanel();" aria-hidden="true"></i>
	</div>
	<div class="setting-content">

	</div>
</div>
<!--end панель настроек-->

<!--скрыть показать главную панель инструментов (шапка)-->
<div class="visible-header-lp">
	<i class="fa fa-eye" aria-hidden="true" onclick="showToolbar();" style="display: none" title="Показать панель инструментов"></i>
	<i class="fa fa-eye-slash" aria-hidden="true" onclick="hideToolbar();" title="Скрыть панель инструментов"></i>
</div>
<!--end скрыть показать главную панель инструментов (шапка)-->


<!--Модальное окно "Добавить блок"-->
<div id="addBlockModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="cancelAddBlocks();">×</button>
				<h4 class="modal-title">Добавить блок на страницу</h4>
			</div>
			<div class="modal-body">
				<div class="check-title">Выберете блоки которые хотите добавить на страницу</div>
				<div class="type-blocks">
					<?php
						$sql_type_block = $web->query("SELECT * FROM module_lp_block_type");
						if($sql_type_block->num_rows > 0)
						{
							while($row_type = $sql_type_block->fetch_assoc())
							{
								if($row_type['name'] != 'footer' && $row_type['name'] != 'header')
								{
									echo "<p><input type='checkbox' value='{$row_type['id']}'><span>{$row_type['title']}</span></p>";
								}
							}
						}
					?>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="cancelAddBlocks();">Отмена</button>
				<button type="button" class="btn btn-primary" onclick="addSelectBlocks();">Добавить</button>
			</div>
		</div>
	</div>
</div>
<!-- end Модальное окно "Добавить блок"-->

<!--Модальное окно "Добавить пункт меню"-->
<div id="addModalMenu" class="modal fade" style="padding-right: 19px;margin-left: -255px;">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="cancelAddBlocks();">×</button>
				<h4 class="modal-title">Добавить меню на страницу</h4>
			</div>
			<div class="modal-body">
				<div class="check-title">Введите название пункта меню</div>
				<div class="type-blocks">
					<input type="text" name="textMenu" id="textMenu">
					<input type="hidden" name="idBlock" id="idBlock" >
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="cancelAddBlocks();">Отмена</button>
				<button type="button" class="btn btn-primary" onclick="addLinkMenu();">Добавить</button>
			</div>
		</div>
	</div>
</div>
<!-- end Модальное окно "Добавить пункт меню"-->

<!-- Обратный звонок-->
<div id="call" class="call">
	<div>
		<div class="text" align="center">
			<div id="blok_tel">
				<form action="" method="post" class="form1">
					<h3> ЗАКАЗ ОБРАТНОГО ЗВОНКА</h3>
					<input type="number" name="tel" placeholder="Номер телефона" required="required" class="inputbox" value="Номер телефона с кодом" onfocus = "(this.value == '0123456789') && (this.value = '')" onblur = "(this.value == '') && (this.value = '0123456789')">
					<input type="submit" class="big-button" name="submit_tel">
				</form>
				<?if(isset($_POST["submit_tel"]))
				{
					$email = 'ваша_почта@yandex.com';
					/* Отправляем email */
					mail($email, "Заказ обратного звонка на сайте ...", "\nПосетитель заказал обратный звонок! \nТелефон : ".$_POST['tel']."");
					echo 'Заявка принята!';
				}
				?>
			</div>
		</div>
		<a href="#close" title="Закрыть">Закрыть</a>
	</div>
</div>
<!-- end Обратный звонок-->


</body>
</html>