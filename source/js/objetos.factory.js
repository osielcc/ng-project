app.factory("ObjetosFactory",function(){
	var OF={};

	OF.baselayers={
		osm: {
			name: 'OpenStreetMap',
				type: 'xyz',
				url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				layerOptions: {
				subdomains: ['a', 'b', 'c'],
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					continuousWorld: true
			}
		},
		cycle: {
			name: 'OpenCycleMap',
				type: 'xyz',
				url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
				layerOptions: {
				subdomains: ['a', 'b', 'c'],
					attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
					continuousWorld: true
			}
		}
	};

	return OF;
});