app.run(function(permissions,$Auth,$location,$rootScope) {
	$rootScope.$on("$routeChangeStart", function(args){
		//$("body").css("visibility","hidden");
		var isOnlinePromise=$Auth.online();
		isOnlinePromise.then(function(r){
			if(r.status==200){
				$rootScope.access=true;
				if($location.$$path=="/signin"){
					$location.path("dashboard");
				}
			}
			permisos(r.data.datos.id);
		},function(r){
			if(r.status==401){
				$rootScope.access=false;
				if($location.$$path!="/signin"){
					$location.path("signin");
				}
			}
			//$("body").css("visibility","visible");
		})
	});

	function permisos(id){
		var permisosPromise=$Auth.permissions(id);
		permisosPromise.then(function(r){
			permissionList = r.data.datos;
			permissions.setPermissions(permissionList);
			//$("body").css("visibility","visible");
		});
	}
});