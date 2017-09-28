<?php

$uploaddir = $_SERVER['DOCUMENT_ROOT'] . '/editor/uploads/' . $_POST['dir'] . '/';
//$file_name = substr(md5(microtime() . rand(0, 9999)), 0, 20);
$file_type =  end(explode(".", $_FILES['uploadimg']['name']));
$filetypes = array('jpg','gif','bmp','png','JPG','BMP','GIF','PNG','jpeg','JPEG');


$file = $uploaddir . basename($_FILES['uploadimg']['name']);



if(!in_array($file_type,$filetypes))
{
	echo "<p>Не изображение</p>";
}
else
{
	if (move_uploaded_file($_FILES['uploadimg']['tmp_name'], $file)) {
		echo "success";
	} else {
		echo "error";
	}
}