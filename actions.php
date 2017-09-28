<?php 
define ('_ROSGID', true);
error_reporting (-1);

ini_set ('display_errors', true);
ini_set ('output_buffering', 'off');

header ('Content-Type: text/html; charset=utf-8');

if ( ( (isset ( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ) ) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {

function error ($text) {
		die ('<div class="element-notice-red">' . $text . '</div>');
}

function success ($text) {
	die ('<div class="element-notice-green">' . $text . '</div>');
}

$conf_init = array ('plug_access' => true, 'class_safe' => true);

require_once ($_SERVER['DOCUMENT_ROOT'] . '/init.php');


	if(isset($_POST['content'])){	
		//if(file_exists(ROOT . SITEURL . '/tpl/lp/' . $_POST['id'] . '/main.tpl')){
			//file_put_contents(ROOT . SITEURL . '/tpl/lp/' . $_POST['id'] . '/main.tpl', '<div class="wrap ui-droppable">'.$_POST['content'].'</div><div class="clearfix"></div>');
			file_put_contents(ROOT . SITEURL . '/tpl/lp/' . $_COOKIE['landing_edit'] . '/main.tpl', htmlspecialchars('<div class="wrap ui-droppable">'.$_POST['content'].'</div><div class="clearfix"></div>'));
		//}		
	}
	
		
	if(isset($_POST['forRemove'])){
		@unlink(ROOT . SITEURL . '/tpl/lp/'.$_COOKIE['landing_edit'].'/images/'.$_POST['forRemove']);
	}
}
?>
