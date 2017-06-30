app.controller("TestCtrl",function($scope,$http,A_url,$Auth){
	var data={
		empresa_id:1,
		rol_id:1
	}
	var array=["1","2","3"];
	var data2=transformArray("arreglo",array);
	$.extend(true,data,data2);
	$http({
		method: 'POST',
		url:A_url+"test",
		data:data,
		headers:$Auth.headers(),
		transformRequest: transformRequest
	});
});