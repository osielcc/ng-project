app.service("$Auth", function (A_url, $http, $localStorage, $cookies,$q,$timeout) {
	var A = {};

	A.headers=function(){
		var token=$cookies.get("token");
		if(token){
			return {
				Accept:"application/json",
				Authorization:"Bearer "+token,
				"Content-Type":"application/x-www-form-urlencoded;"
			}
		}else{
			return {};
		}
	}

	A.online = function () {
		return $http({
			url:A_url+"current",
			method:"post",
			headers: A.headers()
		});
	}

	A.permissions=function(id){
		return $http({
			url:A_url+"permissions",
			method:"post",
			headers: A.headers(),
			data:{id:id},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			}
		});
	}

	A.signin = function (user) {
		return $http({
			url: A_url + "loginUser",
			method: "post",
			data: {email: user.email, password: user.password}
		}).then(function (r) {
			$cookies.put("token",r.data.datos.api_token);
			return r.data;
		});
	};

	A.logout = function () {
		var defered = $q.defer();
		var promise = defered.promise;
		$timeout(function(){
			$cookies.remove("token");
			defered.resolve();
		},500);
		return promise;
	}

	return A;
});