<?php
$dir = $_POST['dir'];
$images = scandir($_SERVER['DOCUMENT_ROOT'] . '/editor/uploads/' . $dir);
$href = '/editor/uploads/'.$dir.'/';
$result = '';

$idBlock = trim($_POST['idBlock']) ? trim($_POST['idBlock']) : '';

for($i = 2; $i < count($images); $i++)
{
	$data = $_SERVER['DOCUMENT_ROOT'] . '/editor/uploads/'.$dir.'/' . $images[$i];
	$src = $href . $images[$i];

	if($dir != 'slider')
	{
		$result .= "<div style='position: relative;'>
					<i onclick='deleteImage($(this)); return false;' class='fa fa-times del-back-img' aria-hidden='true' title='Удалить'></i>
					<img class='back-img' data='$data' src='$src' onclick='setImageBackground(\"$src\", \"$idBlock\"); return false;'>
				</div>";
	}
	else
	{
		$result .= "<div style='position: relative;'>
					<i onclick='deleteImage($(this)); return false;' class='fa fa-times del-back-img' aria-hidden='true' title='Удалить'></i>
					<img class='back-img' data='$data' src='$src' onclick='selectImageToSlide($(this));'>
				</div>";
	}
}

echo $result;