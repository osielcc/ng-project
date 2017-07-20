app.directive("mdWebcam",function(){
	return{
		restric: "E",
		scope: {
			size: "=",
			modelo: "=",
			buttonText: "@",
		},
		templateUrl: "directivas/directivaMdWebcam.html",
		controller:function($scope,$Alert,$timeout){
			var streamGral;
			$scope.detenerCamara=function(){
				var video = $('#video'), video = video[0];
				video.src="";
				streamGral.getVideoTracks()[0].stop();
			}

			$scope.openModalCam=function(){
				$Alert.dialog($scope,"directivas/dialogWebCam.html");
			}

			$scope.initCam=function(){
				$scope.picture=false;
				$timeout(function(){
					var canvas = $('#canvas'), cxt = canvas[0].getContext('2d'),
						video = $('#video'), video = video[0];
					if (navigator.getUserMedia) {
						navigator.getUserMedia({'video': true}, function (stream) {
							streamGral=stream;
							video.src = window.URL.createObjectURL(stream);
							video.play();
						}, function () {
							console.warn("Error getting audio stream from getUserMedia")
						});
					} else if (navigator.webkitGetUserMedia) {
						navigator.webkitGetUserMedia({'video': true}, function (stream) {
							video.src = window.webkitURL.createObjectURL(stream);
							video.play();
						}, function () {
							console.warn("Error getting audio stream from getUserMedia")
						});
					} else if (navigator.mozGetUserMedia) {
						navigator.mozGetUserMedia({'video': true}, function (stream) {
							video.mozSrcObject = stream;
							video.play();
						}, function (err) {
							alert('An error occured! ' + err);
						}, function () {
							console.warn("Error getting audio stream from getUserMedia")
						});
					}

					$('#photo').click(function () {
						$scope.picture=true;
						cxt.drawImage(video, 0, 0, 640, 480);
						$scope.modelo.push(cxt.canvas.toDataURL());
						$scope.detenerCamara();
						safeApply($scope);
					});
				},1000);
			}
		}
	}
})