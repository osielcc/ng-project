//permissions.js
app.factory('permissions', function ($rootScope) {
		var permissionList = [];
		return {
			setPermissions: function (permissions) {
				permissionList = permissions;
				$rootScope.$broadcast('permissionsChanged');
			},
			hasPermission: function (permission) {
				permission = permission.trim();
				return permissionList.some(function (item) {
					if (item[permission] === undefined) { // item.Name is only used because when I called setPermission, I had a Name property
						return false;
					}
					return item[permission];
				});
			}
		};
	})
	.factory('authInterceptor', function ($q, $location) {
		return {
			responseError: function (response) {
				if (response.status === 401 || response.status === 403) {
					$location.path('/unauthorized');
				}
				return $q.reject(response);
			}
		};
	})
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	});