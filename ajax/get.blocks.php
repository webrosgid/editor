<?php

// Подключайм файл базы данных
require_once ($_SERVER['DOCUMENT_ROOT'] . '/db.php');

// Подключаем файл подключаемых файлов к блокам
require_once ($_SERVER['DOCUMENT_ROOT'] . '/editor/head.php');

$jsn = (isset($_POST['jsn']) && trim($_POST['jsn']) != '') ? trim($_POST['jsn']) : '';
$jsn = json_decode($jsn);

$result = array();

foreach($jsn as $id)
{
	$sql = $web->query("SELECT * FROM module_lp_block WHERE id_type = {$id} LIMIT 1");
	if($sql->num_rows > 0)
	{
		$row = $sql->fetch_assoc();

		$sql_type = $web->query("SELECT * FROM module_lp_block_type WHERE id = {$row['id_type']} LIMIT 1");

		if($sql->num_rows > 0)
		{
			$row_type = $sql_type->fetch_assoc();
			$result['type'][] = $row_type['name'];
			$result['head'][] = $head_page[$row_type['name']];

			//Создаем уникальный идендификатор для блока
			$blockId = $row_type['name'] . "_" . substr(md5(microtime() . rand(0, 9999)), 0, 5);
			$result['id'][] = $blockId;
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

		$result['content'] .= $row['html'];
	}
}

echo json_encode($result);