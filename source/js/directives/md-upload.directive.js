app.directive('mdUpload', function ($http, $Auth, $q) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			ngModel:"="
		},
		require: '?ngModel',
		templateUrl: 'directivas/directivaMdUpload.html',
		link: function (scope, element, attrs, ngModel) {
			scope.showDragDrop=true;

			scope.showDragDropFn=function(){
				if(scope.ngModel.length==0){
					scope.showDragDrop=true;
				}else{
					if(scope.over || scope.enter){
						scope.showDragDrop=true;
					}else{
						scope.showDragDrop=false;
					}
				}
			}
			//safeApply(scope);

			element.on('dragover', function (e) {
				e.preventDefault();
				e.stopPropagation();
				scope.over=true;
				scope.leave=false;
				scope.showDragDropFn();
				//safeApply(scope);
			});

			element.on('dragenter', function (e) {
				e.preventDefault();
				e.stopPropagation();
				scope.enter=true;
				scope.leave=false;
				scope.showDragDropFn();
				//safeApply(scope);
			});

			element.on('dragleave', function (e) {
				scope.leave=true;
				scope.over=false;
				scope.enter=false;
				scope.showDragDropFn();
				//safeApply(scope);
			});

			element.on('drop', function (e) {
				scope.drop=true;
				scope.over=false;
				scope.enter=false;
				//safeApply(scope);
				e.preventDefault();
				e.stopPropagation();
				if (e.dataTransfer) {
					if (e.dataTransfer.files.length > 0) {
						transformFiles(e.dataTransfer.files);
					}
				}
				return false;
			});

			scope.activeFiles=function(){
				$("#uploadFiles").trigger('click');

			};
			$(document).on("change","#uploadFiles",function(){
				if(this.files.length>0){
					transformFiles(this.files);
				}
			});

			function transformFiles(files){
				angular.forEach(files, function (value) {
					var altaPromise = alta(value);
					altaPromise.then(function (r) {
						scope.ngModel.push(r);
						scope.showDragDropFn();
					});
				});
			}

			function alta(imagen) {
				var defered = $q.defer();
				var promise = defered.promise;
				getBase64(imagen, function (cb) {
					defered.resolve(cb.resultado);
				});
				return promise;
			}

			function requestAPI() {
				/*var data = {
				 id: "4"
				 };
				 var files = transformArray("files", ArrayImg);
				 $.extend(true, data, files);
				 $http({
				 method: 'POST',
				 url: attrs.to,
				 data: data,
				 headers: $Auth.headers(),
				 transformRequest: transformRequest
				 }).then(function () {
				 console.log("Uploaded");
				 }).catch(function () {
				 console.log("Error");
				 });*/
			}
		}
	};
})