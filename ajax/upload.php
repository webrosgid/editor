<?php
//$dirName = trim($_POST['dirName']) != '' ? trim($_POST['dirName']) : '';

$dir = $_SERVER['DOCUMENT_ROOT'] . '/editor/uploads/background/';

$file_name = substr(md5(microtime() . rand(0, 9999)), 0, 20);
$file_type =  end(explode(".", $_FILES['file']['name']));

if ( 0 < $_FILES['file']['error'] )
{
	echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else
{

	$file_name = substr(md5(microtime() . rand(0, 9999)), 0, 10);
	$file_type =  end(explode(".", $_FILES['file']['name']));
	move_uploaded_file($_FILES['file']['tmp_name'], $dir . $file_name . '.' . $file_type);
}

