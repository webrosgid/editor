<?php

define ('_ROSGID', true);
require_once ($_SERVER['DOCUMENT_ROOT'] . '/db.php');

$date = date('Y-m-d');
$content = addslashes(trim($_POST['content']));
$footer = addslashes(trim($_POST['footer']));
$header = addslashes(trim($_POST['header']));
$menu = addslashes(trim($_POST['menu']));

$site =  trim($_POST['site']);
$id_page =  trim($_POST['id_page']);


if($_POST['temp'] == 'no')
{
	$web->query("UPDATE module_lp SET content_html='{$content}', footer_html='{$footer}', header_html='{$header}', menu_html='{$menu}', last_mod_date='{$date}' WHERE id={$id_page}");
}
else
{
	$time = date('H:i:s');
	$web->query("INSERT INTO module_lp_temp (id, id_module_lp, content_html, header_html, menu_html, footer_html, date, time) VALUES ('','{$id_page}','{$content}', '{$header}', '{$menu}', '{$footer}', '{$date}','{$time}')");
}
