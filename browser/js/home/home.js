app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'homeCtrl'
	});
});

app.controller('homeCtrl', function($scope, $state, $http, $rootScope){
	$scope.email = "";
	$scope.getCode = function(){
		$http.put('/api/confirmation/code',{email: $scope.email})
		.then(function(res){
			if(res){
				$rootScope.code = res.data.code;
				$rootScope.animal = res.data.animal;
				$state.go('confirmation');
			}
		})
	}
})