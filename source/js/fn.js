function safeApply($scope){
	try{
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
			$scope.$apply();
		}
	}catch(a){

	}
}

function transformRequest(obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
}

function getBase64(file,cb) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function () {
		cb.call(this,{resultado:reader.result});
	};
	reader.onerror = function (error) {
		console.log('Error: ', error);
	};
}

function transformArray(name,array){
	var newDataAdd={};
	array.map(function(dato,index){
		newDataAdd[name+"["+index+"]"]=dato;
	});
	return newDataAdd;
}

function clearAutocomplete(data,objects){
	objects.map(function(obj){
		data[obj+"_id"]=data[obj].id;
		delete(data[obj]);
	});
	return data;
}

function clearSwitch(data,objects){
	objects.map(function(obj){
		data[obj]=(data[obj])?"1":"0";
	});
	return data;
}