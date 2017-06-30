app.service("AutocompleteService",function(A_url,$http,$Auth){
	var AS={};
	AS.gral=function(r,b){
		return $http({
			method: 'GET',
			url:A_url+r+"/autocomplete?busqueda="+b,
			headers:$Auth.headers(),
		});
	}
	return AS;
});