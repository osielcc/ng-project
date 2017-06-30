app.directive("mdSyncChip",function(){
	return {
		restric: "E",
		scope: {
			busqueda:"=",
			modelo:"=",
			placeholder:"@",
			name:"@",
			imagen:"@",
			//requerido:"@",
			//callbackFnSeleccion:"&callbackFnSeleccion"
		},
		templateUrl: "directivas/directivaMdChip.html",
		controller: function ($scope,AutocompleteService,$timeout,$q){
			var pendingSearch, cancelSearch = angular.noop;
			var lastSearch;

			$scope.delayedQuerySearch= function (criteria) {
					if ( !pendingSearch || !debounceSearch() )  {
						cancelSearch();
						var defered = $q.defer();
						var promise = defered.promise;
						console.log('searching for place');
						var promiseAutocompletado=AutocompleteService.gral($scope.busqueda,criteria);
						promiseAutocompletado.then(function(respuesta){
							console.log(respuesta);
							$scope.result1=respuesta.data.datos;
							respuesta.data.datos.map(function(usuario){
								if(usuario["foto"]==null){
									usuario["foto"]="";
								}else{
									usuario["foto"]="http://eyetracker.m3s.tech/imagenes/"+usuario["foto"];
								}
							});
							defered.resolve(respuesta.data.datos);
							refreshDebounce();
						}).catch(function(promesaError){

						});

					}
					return promise;

			}

			function refreshDebounce() {
				lastSearch = 0;
				pendingSearch = null;
				cancelSearch = angular.noop;
			}

			function debounceSearch() {
				var now = new Date().getMilliseconds();
				lastSearch = lastSearch || now;
				return ((now - lastSearch) < 300);
			}
		}
	}
});