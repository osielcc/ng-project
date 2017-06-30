app.directive("mdSyncAutocomplete",function(){
	return {
		restric: "E",
		scope: {
			busqueda:"=",
			modelo:"=",
			placeholder:"@",
			requerido:"@",
			callbackFnSeleccion:"&callbackFnSeleccion"
		},
		templateUrl: "directivas/directivaMdSyncAutocomplete.html",
		controller: function ($scope,AutocompleteService,$timeout,$q){
			if($scope.requerido===undefined){
				$scope.requerido=false;
			}else{
				if($scope.requerido=="true"){
					$scope.requerido=true;
				}else{
					$scope.requerido=false;
				}
			}
			//AutocompleteService.estados($scope.busqueda);
			// list of `state` value/display objects
			$scope.states        = loadAll();
			$scope.selectedItem  = null;
			$scope.searchText    = null;
			$scope.querySearch   = querySearch;

			// ******************************
			// Internal methods
			// ******************************

			/**
			 * Search for states... use $timeout to simulate
			 * remote dataservice call.
			 */
			function querySearch (query) {
				if(query.length>2){
					var promiseEstados=AutocompleteService.gral($scope.busqueda,query);
					var deferred = $q.defer();
					promiseEstados.then(function(r){
						if(!r.data.error){
							var transformArray=[];
							r.data.datos.map(function(dato){
								transformArray.push({
									id:dato.id,
									display:dato.estado
								});
							});
							deferred.resolve(transformArray);
						}
					}).catch(function(){

					});
					return deferred.promise;
				}
			}

			/**
			 * Build `states` list of key/value pairs
			 */
			function loadAll() {
				var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

				return allStates.split(/, +/g).map( function (state) {
					return {
						value: state.toLowerCase(),
						display: state
					};
				});
			}

			/**
			 * Create filter function for a query string
			 */
			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);

				return function filterFn(state) {
					return (state.value.indexOf(lowercaseQuery) === 0);
				};
			}
			$scope.seleccionado=function(){
				$scope.callbackFnSeleccion({elemento: $scope.selectedItem});
			}
			/*$scope.$watch("selectedItem",function(newval){
				$scope.callbackFnMunicipio({estado: estado,municipio:municipio});
			});*/
		}
	};
});