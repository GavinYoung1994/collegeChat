app.config(function($stateProvider) {
	$stateProvider.state('confirmation', {
		url: '/confirmation/',
		templateUrl: 'js/confirmation/confirmation.html',
		controller: 'confirmCtrl'
	});
});

app.controller('confirmCtrl', function($scope,$rootScope,$state){
	$scope.code = $rootScope.code;
	$scope.user_input = "";
	$scope.match = function(){
		if($scope.user_input===String($scope.code)){
			$state.go('generalChat');
		}else{
			alert("Your code is incorrect, please try again");
		}
	}
})