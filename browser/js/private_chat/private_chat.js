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
	$scope.chatting = false;
	window.onfocus = function () { 
	  onTab = true;
	  document.title="College Chat";
	}; 
	window.onblur = function(){
		onTab = false
	}

	$scope.public_chat = function(){
		$state.go("generalChat");
		mySocket.emit('left', $scope.room);
	}

	mySocket.on('found', function(room) {
	    $scope.room = room;
	    alert("You have found a chat partner");
	    $scope.chatting = true;
  	});

  	mySocket.on('private response', function(mssg){
  		$scope.mssgs.push(mssg);
  		if(!onTab){
			document.title = "New Message!";
		}
  	})

  	mySocket.on('leave', function() {
  		alert("The other person left, looking for a new chat partner");
  		$scope.chatting = false;
	    mySocket.emit('joinPrivate');
	  });

  	$scope.another = function(){
  		mySocket.emit('left', $scope.room);
  		$scope.chatting = false;
  		mySocket.emit('joinPrivate');
  	}

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