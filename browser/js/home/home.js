app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'homeCtrl'
	});
});

app.controller('homeCtrl', function($scope, $state, $http, $rootScope){
	$scope.getCode = function(){
		$http.get('/api/confirmation/code')
		.then(function(res){
			if(res){
				$rootScope.code = res.data.code;
				$state.go('confirmation');
			}
		})
	}
})