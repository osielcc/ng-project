app.factory("$User",function($localStorage){
	var UF={};
	UF.empresa=function(){
		return $localStorage.user.e;
	};

	UF.r=function(){
		return $localStorage.user.r;
	}

	UF.u=function(){
		return $localStorage.user.u;
	}

	UF.t=function(){
		return $localStorage.user.t;
	}

	UF.p=function(){
		var permisos={
			empresa:false,
			empresas:false
		};
		switch(UF.r()){
			case 1:
				permisos.empresa=false;
				permisos.empresas=true;
				break;
			case 3:
				permisos.empresa=true;
				permisos.empresas=false;
			break;
		}
		return permisos;
	}
	return UF;
});