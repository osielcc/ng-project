app.directive('mdTimePicker', function() {
	return {
		restric: "EAC",
		scope: {
			modelo:"=",
		},
		link: function(scope, iElement, iAttrs, ctrl) {
			var content=iElement.html();
			var template="<button class='md-raised md-button md-ink-ripple btn-single'>"+
				content;
			"</button>";
			iElement.html(template);
			var dialog = new mdDateTimePicker.default({
				type: 'time',
				trigger : iElement[0]
			});
			var toggleButton=iElement[0];
			toggleButton.addEventListener('click', function() {
				dialog.toggle();
			});

			toggleButton.addEventListener('onOk', function() {
				var value = dialog.time.toString();
				scope.modelo=dialog.time;//.format("HH:mm");
				safeApply(scope);
			});
		}
	}
});