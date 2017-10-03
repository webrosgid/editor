//инициализация карт для страницы
function init_map(id) {
	var type = $('#'+id).attr('map_type');
	switch(type){
		case 'yandex':
			yandex_map(id);
			break;
		case 'google':
			google_map(id);
			break;
		default:
			yandex_map(id);
			break;
	}
}

//инциализация карт для настройки
function init_map_setting() {
	var id = $('.form-setting').attr('id_map');
	var type = $('#'+id).attr('map_type');
	switch(type){
		case 'yandex':
			$('#radio_ya').prop('checked',true);
			init_ya();
			break;
		case 'google':
			$('#radio_gl').prop('checked',true);
			$(function() {init_gl();});
			break;
		default:
			$('#radio_ya').prop('checked',true);
			init_ya();
			break;
	}
}

//Сохранить настройки карты
function saveMapSetting() {
	var map_x = $('input[name="map_x"]').val(),
		map_y = $('input[name="map_y"]').val(),
		map_z = $('input[name="map_z"]').val();
	var id_map = $('.form-setting').attr('id_map');

	$('#set_' + id_map).attr('x', map_x);
	$('#set_' + id_map).attr('y', map_y);
	$('#set_' + id_map).attr('z', map_z);

	$('#'+id_map).html('');
	$('#'+id_map).attr('map_type', $('.type-map').find('input:radio:checked').val());
	init_map(id_map);
}


/*для страницы сайта*/
function yandex_map(id) {
	ymaps.ready(function() {
		var x = $('#set_' + id).attr('x');
		var y = $('#set_' + id).attr('y');
		var z = $('#set_' + id).attr('z');
		var geocoder = new ymaps.geocode([x, y], { results: 1 });

		var map = new ymaps.Map (id, {
			center: [x, y],
			zoom: parseInt(z)
		});
		map.controls.add('zoomControl', { left: 5, top: 5 }).add('typeSelector').add('mapTools', { left: 35, top: 5 });

		var marker = new ymaps.Placemark([x, y], {
			style: "default#lightblueSmallPoint"
			//hintContent: geocoder.then(function (res) {res.geoObjects.get(0).getAddressLine()})
		});

		map.geoObjects.add(marker);
	});
}

function google_map(id) {
	$(function() {
		var x = $('#set_' + id).attr('x');
		var y = $('#set_' + id).attr('y');
		var z = $('#set_' + id).attr('z');

		var mapOptions = {
			zoom: parseInt( z ),
			center: new google.maps.LatLng(x, y),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById(id), mapOptions);

		var marker = new google.maps.Marker({
			position: map.getCenter(),
			map: map,
			title: 'Текст марке'
		});
	});
}
/*****************************************************/


/*для выбора типа и настройки*/
// google карты
function init_gl() {
	var map_x = $('input[name="map_x"]').val(),
		map_y = $('input[name="map_y"]').val(),
		map_z = $('input[name="map_z"]').val();

	var mapOptions = {
		zoom: parseInt( map_z ),
		center: new google.maps.LatLng(map_x, map_y),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('set_map'), mapOptions);

	var marker = new google.maps.Marker({
		position: map.getCenter(),
		map: map,
		draggable: true,
		title: 'Перетащите метку и кликните, чтобы установить адрес'
	});

	var infowindow = new google.maps.InfoWindow();

	google.maps.event.addListener(marker, 'click', function(e) {
		var cx = e.latLng.lat().toPrecision(6),
			cy = e.latLng.lng().toPrecision(6),
			cz = map.getZoom();

		infowindow.setContent( '<b>Установленные координаты:</b><br/>' + cx + ', ' + cy + ' на масштабе ' + cz );
		infowindow.open(map, marker);

		set_coord(cx, cy, cz);
	});
	google.maps.event.addListener(marker, 'drag', function(e) {
		infowindow.close(map, marker);
	});
}

// яндекс карты
function init_ya() {
	var map_x = $('input[name="map_x"]').val(),
		map_y = $('input[name="map_y"]').val(),
		map_z = $('input[name="map_z"]').val();

	var map = new ymaps.Map ("set_map", {
		center: [map_x, map_y],
		zoom: parseInt( map_z )
	});

	map.controls
		.add('zoomControl', { left: 5, top: 5 })
		.add('typeSelector')
		.add('mapTools', { left: 35, top: 5 });

	var marker = new ymaps.Placemark([map_x, map_y], {
		hintContent: 'Перетащите метку и кликните, чтобы установить адрес'
	}, {
		draggable: 'true'
	});

	marker.events.add('click', function (e) {
		var coords = e.get('coordPosition'),
			cx = coords[0].toPrecision(6),
			cy = coords[1].toPrecision(6),
			cz = map.getZoom();

		marker.properties.set({
			balloonContentBody: '<b>Установленные координаты:</b><br/>',
			balloonContentFooter: cx + ', ' + cy + ' на масштабе ' + cz
		});

		set_coord(cx, cy, cz);
	});

	map.geoObjects.add(marker);
	map.behaviors.enable('scrollZoom');
}

//2гис
function init_2gis() {
	var map_x = $('input[name="map_x"]').val(),
		map_y = $('input[name="map_y"]').val(),
		map_z = $('input[name="map_z"]').val();

		var map = DG.map('set_map', {
			'center': [map_x, map_y],
			'zoom': parseInt( map_z )
		});
}
/*****************************/

//задаем координаты
function set_coord(x, y, z) {
	var a = $('input[name="map_x"]'),
		b = $('input[name="map_y"]'),
		c = $('input[name="map_z"]');

	if(x !== undefined && y !== undefined && z !== undefined) {
		a.val(x);
		b.val(y);
		c.val(z);
	}else{
		var id_map = $('.form-setting').attr('id_map');
		a.val($('#set_' + id_map).attr('x'));
		b.val($('#set_' + id_map).attr('y'));
		c.val($('#set_' + id_map).attr('z'));
	}
}

//Выбор крты
function selectMap(input) {
	var type = input.val();
	$('#set_map').html('');

	switch(type){
		case 'yandex': init_ya(); break;
		case 'google': init_gl(); break;
		case '2gis':init_2gis(); break;
		default: init_ya(); break;
	}
}