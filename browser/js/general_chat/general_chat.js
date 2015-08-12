app.config(function($stateProvider) {
	$stateProvider.state('generalChat', {
		url: '/api/chat',
		templateUrl: 'js/general_chat/general_chat.html',
		controller: 'generalChatCtrl'
	});
});

app.controller('generalChatCtrl', function($scope,mySocket){
	$scope.message = "";
	$scope.mssgs = [];
	$scope.submit = function(){
		mySocket.emit('message', {
			message: $scope.message,
			time: new Date()
		});
		$scope.mssgs.push({
			message: $scope.message,
			time: new Date()
		});
		$scope.message = "";
	}
})