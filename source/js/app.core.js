app.controller("CoreCtrl",function($scope,$mdSidenav,$Auth,$timeout,$location,$rootScope){
	$rootScope.configFB = {
		apiKey: "AIzaSyAF6Bp3K53yUi4Z5_jgZTUr9MA18JuU-l8",
		authDomain: "eyetracker-159904.firebaseapp.com",
		databaseURL: "https://eyetracker-159904.firebaseio.com",
		projectId: "eyetracker-159904",
		storageBucket: "eyetracker-159904.appspot.com",
		messagingSenderId: "672937211498"
	};

	$scope.toggle = function (componentId) {
		$mdSidenav(componentId).toggle();
	};

	$scope.logout=function(){
		var logoutPromise=$Auth.logout();
		logoutPromise.then(function(){
			$location.path("/signin");
		})
	}
	$scope.cargado=true;
	$timeout(function(){
		$scope.cargado2=true;
	},4000)
});