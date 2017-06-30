app.controller("LoginCtrl",function($scope,$Auth,$location,$timeout){
	$scope.user={
		email:"usuario@demo.com",
		password:"demosuperadmin"
	};
	$scope.msgs="";
	$scope.loading=false;
	$scope.signin=function(){
		$scope.loading=true;
		var promiseAuth=$Auth.signin($scope.user);
		$timeout(function(){
			promiseAuth.then(function(r){
				if(!r.error){
					$scope.loading=false;
					$location.path("/dashboard");
				}else{
					$scope.loading=false;
					$scope.msgs=r.msg;
				}
			});
		},1000);
	}
});