app.config(function ($routeProvider) {

	$routeProvider
		.when("/signin",{
			templateUrl:"login/signin.html",
			controller:"LoginCtrl"
		})
		.when('/dashboard', {
			templateUrl: "dashboard/dashboard.html",
			controller:"DashboardCtrl"
		})
		.when('/listado', {
			templateUrl: "listado/listado.html",
			controller:"ListadoCtrl",
		})
		.when("/listado/:id/detalle",{
			templateUrl: "listado/listado_detalle.html",
			controller:"ListadoDetalleCtrl"
		})
		.otherwise({
			redirect: '/iniciar'
		});
});