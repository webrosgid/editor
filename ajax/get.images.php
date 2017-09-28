<?php

$images = scandir($_SERVER['DOCUMENT_ROOT'] . '/editor/uploads/background');
$href = 'http://' . $_SERVER['HTTP_HOST'] . '/editor/uploads/background/';
$result = '';

$idBlock = trim($_POST['idBlock']) ? trim($_POST['idBlock']) : '';

for($i = 2; $i < count($images); $i++)
{
	$data = $_SERVER['DOCUMENT_ROOT'] . '/editor/uploads/background/' . $images[$i];
	$src = $href . $images[$i];
	$result .="<div style='position: relative;'>
					<i onclick='deleteBackgroundImg($(this)); return false;' class='fa fa-times del-back-img' aria-hidden='true' title='Удалить'></i>
					<img class='back-img' data='$data' src='$src' onclick='setImageBackground(\"$src\", \"$idBlock\"); return false;'>
				</div>
";
}

echo $result;