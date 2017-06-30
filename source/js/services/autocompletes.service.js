app.service("AutocompleteService",function(A_url,$http,$Auth){
	var AS={};
	AS.usuarios=function(busqueda){
		return $http({
			method: 'GET',
			url:A_url+"usuario/autocomplete?busqueda="+busqueda,
			headers:$Auth.headers(),
		});
	}

	AS.estados=function(busqueda){
		return $http({
			method: 'GET',
			url:A_url+"estado/autocomplete?busqueda="+busqueda,
			headers:$Auth.headers(),
		});
	}
	AS.gral=function(r,b){
		return $http({
			method: 'GET',
			url:A_url+r+"/autocomplete?busqueda="+b,
			headers:$Auth.headers(),
		});
	}
	return AS;
});