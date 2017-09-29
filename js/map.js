$(document).ready(function() {
	//google.maps.event.addDomListener(window, 'load', init_gl);

});

function init_map(type, id) {
	switch(type){
		case 'yandex':
			init_yandex_map(id);
			break;
		default:
			init_yandex_map(id);
			break;
	}
}


function init_yandex_map(id) {
	ymaps.ready(function() {
		var geocoder = new ymaps.geocode('Санкт-Петербург,Оптиков,4/2', { results: 1 });

		geocoder.then(function (res) {
				var coord = res.geoObjects.get(0).geometry.getCoordinates();
				var map = new ymaps.Map(id, {
					center: coord,
					zoom: 16,
					controls: ['mapTools']
				});

				map.geoObjects.add(res.geoObjects.get(0));
				map.controls.add('mapTools').add('zoomControl').add('typeSelector');
			}
		);
	});
}









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
		console.log(e);
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

//задаем координаты
function set_coord(x, y, z) {
	var a = $('input[name="map_x"]'),
		b = $('input[name="map_y"]'),
		c = $('input[name="map_z"]');

	a.val(x); b.val(y); c.val(z);
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