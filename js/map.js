// $(document).ready(function() {
// 	ymaps.ready(init);
// 	function init() {
// 		// Строка с адресом, который нужно геокодировать и требуемое количество результатов
// 		var geocoder = new ymaps.geocode('Санкт-Петербург,Оптиков,4/2', { results: 1 });
//
// 		// После того, как поиск вернул результат, вызывается callback-функция
// 		geocoder.then(function (res) {
// 				// координаты объекта
// 				var coord = res.geoObjects.get(0).geometry.getCoordinates();
// 				var map = new ymaps.Map('map', {
// 					center: coord,      // Центр карты - координаты первого элемента
// 					zoom: 16,           // Коэффициент масштабирования
// 					behaviors: ['default', 'scrollZoom'],   // включаем масштабирование карты колесом
// 					controls: ['mapTools']
// 				});
//
// 				map.geoObjects.add(res.geoObjects.get(0));  // Добавление метки на карту
// 				map.controls.add('mapTools').add('zoomControl').add('typeSelector');    // Добавление стандартного набора кнопок
// 			}
// 		);
// 	}
// });
