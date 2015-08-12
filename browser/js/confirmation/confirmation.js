app.config(function($stateProvider) {
	$stateProvider.state('confirmation', {
		url: '/confirmation/',
		templateUrl: 'js/confirmation/confirmation.html',
		controller: 'confirmCtrl'
	});
});

app.controller('confirmCtrl', function($scope,$rootScope,$state,$http){
	$scope.code = $rootScope.code;
	$scope.user_input = "";
	$scope.match = function(){
		if($scope.user_input===String($scope.code)){
			$http.put('/api/chat',{pass:true}).then(function(res){
				if(res.data.match===true){
					$state.go('generalChat');
				}
			})
		}else{
			alert("Your code is incorrect, please try again");
		}
	}
})