app.config(function($stateProvider) {
	$stateProvider.state('privateChat', {
		url: '/api/chat/privateChat',
		templateUrl: 'js/private_chat/private_chat.html',
		controller: 'privateChatCtrl'
	});
});

app.controller('privateChatCtrl',function($scope,$rootScope, mySocket, $state){
	$scope.message = "";
	$scope.mssgs = [];
	window.onfocus = function () { 
	  onTab = true;
	  document.title="College Chat";
	}; 
	window.onblur = function(){
		onTab = false
	}

	$scope.public_chat = function(){
		$state.go("generalChat");
	}

	mySocket.on('found', function(room) {
	    $scope.room = room;
	    alert("You have found a chat partner");
  	});

  	mySocket.on('private response', function(mssg){
  		$scope.mssgs.push(mssg);
  		if(!onTab){
			document.title = "New Message!";
		}
  	})

	$scope.submit = function(){
		var localTime  = moment.utc(moment.utc().format('YYYY-MM-DD HH:mm:ss')).toDate();
    	localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
		mySocket.emit('private message', $scope.room, {
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
})