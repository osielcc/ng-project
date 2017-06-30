/**
 * Created by Osiel on 05/08/2016.
 */
app.factory("$Alert",function($mdDialog,$mdToast,$mdPanel,$rootScope){
	var AlertasFactory={};

	AlertasFactory.alert=function(title,content,ok){
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(false)
				.title(title)
				.content(content)
				.ariaLabel('Precaución')
				.ok(ok)
		);
	};

	AlertasFactory.dialog=function(scope,template,targetO,targetC){
		$mdDialog.show({
			controller: function($scope, $mdDialog) {
				$scope.hide = function () {
					$mdDialog.hide();
				};
				$scope.cancel = function () {
					$mdDialog.cancel();
				};
			},
			templateUrl: template,
			parent: angular.element(document.body),
			openFrom:targetO,
			//targetEvent: ev,
			scope: scope,
			preserveScope: true,
			escapeToClose:false
		});
	}

	AlertasFactory.toast=function(msg,position,time){
		var _position=(position===undefined)?"top right":position;
		var _time=(time===undefined)?5000:time;
		$mdToast.show(
			$mdToast.simple()
				.content(msg)
				.position(_position)
				.hideDelay(_time)
		);
	}

	AlertasFactory.toastHide=function(){
		$mdToast.hide();
	};

	AlertasFactory.confirm=function(msg,ok,cancel,okresponse,cancelresponse){
		var confirm = $mdDialog.confirm()
			.content(msg)
			.ok(ok)
			.cancel(cancel)
			.clickOutsideToClose(false);
		$mdDialog.show(confirm).then(function() {
			okresponse.call();
		}, function() {
			cancelresponse.call();
		});
	}

	AlertasFactory.showAlertLoading=function(mensaje){
		$mdDialog.show({
			controller: function($scope, $mdDialog) {
				$scope.mensaje=mensaje;
				$scope.hide = function () {
					$mdDialog.hide();
				};
				$scope.cancel = function () {
					$mdDialog.cancel();
				};
			},
			templateUrl: "templatesUrl/dialog/dialogAlertLoading.html",
			parent: angular.element(document.body),
			preserveScope: true,
			escapeToClose:false
		});
	}

	AlertasFactory.hideAlertLoading=function(){
		$mdDialog.hide();
	}

	AlertasFactory.showLoadingLinear=function(valor){
		$rootScope.loadLinear=valor;
	}

	return AlertasFactory;
});