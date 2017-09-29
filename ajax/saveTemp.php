<?
//defined ('_ROSGID') or die ('Error! #001 - Access Denied.');
define ('_ROSGID', true);
require_once ($_SERVER['DOCUMENT_ROOT'] . '/db.php');
//	Объявляем конфигурацию для инициализации:
//$conf_init = array ('ini_configuration' => true, 'class_safe' => true, 'plug_access' => true);

//	Подключение модулей и инициализация ядра:
//require_once ($_SERVER['DOCUMENT_ROOT'] . '/init.php');

//	Подключаем файл с классом:
//require_once ($_SERVER['DOCUMENT_ROOT'] . '/editor/classes/template.class.php');
//if (($_POST['content'])&&($_POST['footer'])&&($_POST['header'])&&($_POST['menu']))
//{
$now=date('Y-m-d');
$con=$_POST['content'];
$footer=$_POST['footer'];
$head=$_POST['header'];
$menu=$_POST['menu'];
$con = addslashes($con);
$footer = addslashes($footer);
$head = addslashes($head);
$menu = addslashes($menu);
$site =  $_POST['site'];
//echo $site;
/*здесь заложена логика сохранения ид страницы, то есть именно то что данная страница относится к pages*/
//$s =  $web->query ("select * from module_pages where site='".$site."'");
//$row = $s->fetch_assoc();
/*конец*/
$result= $web->query("INSERT INTO module_lp_temp (site, title, date, content_html, header_html, menu_html, footer_html) VALUES ('{$site}','Главная','{$now}', '{$con}', '{$head}', '{$menu}', '{$footer}')");
//не убирать на всякий случай $str= $web->query("INSERT INTO module_pages VALUES ('','','" . SITEURL . "','glavnaya','Главная','','".date("Y-m-d h:i:s")."','','','','','1','0')");





?>