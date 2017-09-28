<?php
/**
 * Содержит подключаемые файлы для определенных блоков
 */

$header = <<<HTML
<div id="head-header">
	<link rel="stylesheet" type="text/css" href="/editor/css/header.css">
	<script src="/editor/js/header.js" type="text/javascript" charset="UTF-8"></script>
</div>
HTML;

$footer = <<<HTML
<div id="head_footer">
	<link rel="stylesheet" type="text/css" href="/editor/css/footer.css">
	<script src="/editor/js/footer.js" type="text/javascript" charset="UTF-8"></script>
</div>
HTML;

$menu = <<<HTML
<div id="head_menu">
	<link rel="stylesheet" type="text/css" href="/editor/css/menu.css">
	<script src="/editor/js/menu.js" type="text/javascript" charset="UTF-8"></script>
</div>
HTML;

$slider = <<<HTML
<div id="head_slider">
	<link rel="stylesheet" type="text/css" href="/editor/library/slick-1.8.0/slick-1.8.0/slick/slick.css">
	<link rel="stylesheet" type="text/css" href="/editor/library/slick-1.8.0/slick-1.8.0/slick/slick-theme.css">
	<link rel="stylesheet" type="text/css" href="/editor/css/slider.css">
	<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="/editor/library/slick-1.8.0/slick-1.8.0/slick/slick.min.js" type="text/javascript" ></script>
	<script src="/editor/js/slider.js" type="text/javascript" ></script>
</div>
HTML;

$text_block = <<<HTML
<div id="head_text_block">
	<link rel="stylesheet" type="text/css" href="/editor/css/text_block.css">
	<script src="/editor/js/text_block.js" type="text/javascript" charset="UTF-8"></script>
</div>
HTML;

$map = <<<HTML
<div id="head_map">
	<link rel="stylesheet" type="text/css" href="/editor/css/map.css">
	<script src="http://api-maps.yandex.ru/2.0-stable/?load=package.standard&lang=ru-RU" type="text/javascript"></script>
	<script src="/editor/js/map.js" type="text/javascript" charset="UTF-8"></script>
</div>
HTML;

$callback = <<<HTML
<div id="head_callback">
	<link rel="stylesheet" type="text/css" href="/editor/css/callback.css">
</div>
HTML;

$head_page = array ('header' => $header, 'footer' => $footer, 'menu' => $menu, 'slider' => $slider, 'text_block' => $text_block, 'map' => $map, 'callback' =>$callback);

