var onTab = true;

app.config(function($stateProvider) {
	$stateProvider.state('generalChat', {
		url: '/api/chat',
		templateUrl: 'js/general_chat/general_chat.html',
		controller: 'generalChatCtrl'
	});
});

app.controller('generalChatCtrl', function($scope,mySocket,$rootScope,$state){
	$scope.message = "";
	$scope.mssgs = [];
	mySocket.on('everyone', function(mssg){
		$scope.mssgs.push(mssg);
		if(!onTab){
			document.title = "New Message!";
		}
	})

	$scope.private_chat = function(){
		$state.go("privateChat");
		mySocket.emit('joinPrivate');
	}

	$scope.submit = function(){
		var localTime  = moment.utc(moment.utc().format('YYYY-MM-DD HH:mm:ss')).toDate();
    	localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
		mySocket.emit('message', {
			message: $scope.message,
			time: localTime,
			animal: $rootScope.animal+String($rootScope.code)
		});
		$scope.mssgs.push({
			message: $scope.message,
			time: localTime,
			animal: "You"
		});
		$scope.message = "";
	}
	window.onfocus = function () { 
	  onTab = true;
	  document.title="College Chat";
	}; 
	window.onblur = function(){
		onTab = false
	}
})