app.directive("mdSyncAutocomplete", function () {
	return {
		restric: "E",
		scope: {
			busqueda: "=",
			modelo: "=",
			placeholder: "@",
			requerido: "@",
			callbackFnSeleccion: "&callbackFnSeleccion",
			params: "@",
			display: "@"
		},
		templateUrl: "directivas/directivaMdSyncAutocomplete.html",
		controller: function ($scope, AutocompleteService, $timeout, $q) {
			if ($scope.requerido === undefined) {
				$scope.requerido = false;
			} else {
				if ($scope.requerido == "true") {
					$scope.requerido = true;
				} else {
					$scope.requerido = false;
				}
			}

			$scope.selectedItem = null;
			$scope.searchText = null;
			$scope.querySearch = querySearch;
			function querySearch(query) {
				if (query.length > 2) {
					var promiseEstados = AutocompleteService.gral($scope.busqueda, query, $scope.params);
					var deferred = $q.defer();
					promiseEstados.then(function (r) {
						if (!r.data.error) {
							var transformArray = [];
							var displays = $scope.display.split(".");
							r.data.datos.map(function (dato) {
								var display = false;
								displays.map(function (_display) {
									if (!display) {
										display = dato[_display];
									} else {
										display = display[_display];
									}

								});
								transformArray.push({
									id: dato.id,
									display: display
								});
							});
							deferred.resolve(transformArray);
						}
					}).catch(function () {

					});
					return deferred.promise;
				}
			}

			$scope.seleccionado = function () {
				if($scope.selectedItem!=null){
					$scope.callbackFnSeleccion({elemento: $scope.selectedItem});
					$scope.searchText=$scope.selectedItem.display;
					$scope.modelo=$scope.selectedItem;
				}
			}

			if($scope.modelo){
				$scope.modelo={
					id:$scope.modelo.id,
					display:$scope.modelo.modelo
				}
				$scope.searchText=$scope.modelo.display;
			}

		}
	};
});