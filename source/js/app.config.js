app
	.config(function($logProvider){
		$logProvider.debugEnabled(false);
	})
	.config(function(){
		moment.locale("es");
	})
	.config(function($localStorageProvider){
			$localStorageProvider.setKeyPrefix('E_T_');
	})
	.config(function($httpProvider){
		/*var $cookies;
		angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
			$cookies = _$cookies_;
			if($cookies.get("token")){
				$httpProvider.defaults.headers.common.Accept="application/json";
				$httpProvider.defaults.headers.common.Authorization="Bearer "+$cookies.get("token");
				$httpProvider.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;";
			}
		}]);*/
	})
	.config(function($mdThemingProvider){
		$mdThemingProvider.theme('default')
			.primaryPalette('indigo')
			.accentPalette('pink')
			.warnPalette('red')
	})
	.config(function($compileProvider) {
		$compileProvider.preAssignBindingsEnabled(true);
	});