<?php

define ('_ROSGID', true);
require_once ($_SERVER['DOCUMENT_ROOT'] . '/db.php');

$now = date('Y-m-d');
$content = addslashes(trim($_POST['content']));
$footer = addslashes(trim($_POST['footer']));
$header = addslashes(trim($_POST['header']));
$menu = addslashes(trim($_POST['menu']));

$site =  trim($_POST['site']);
$id_page =  trim($_POST['id_page']);

$result= $web->query("UPDATE module_lp SET content_html='{$content}', footer_html='{$footer}', header_html='{$header}', menu_html='{$menu}', last_mod_date='{$date}' WHERE id={$id_page}");
