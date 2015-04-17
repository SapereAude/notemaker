angular.module('app')
	.controller('mvNavBarLoginCtrl' , function ($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
		$scope.identity = mvIdentity;
		$scope.signin = function(username, password) {
			mvAuth.authenticateUser(username, password).then(function (success) {
				if(success){
					mvNotifier.login('You are logged in!')
				} else {
					mvNotifier.logFail('Dang it! Username/Password combination incorrect!');
				}
			});
		}

		$scope.signout = function () {
			mvAuth.logoutUser().then(function () {
				$scope.username = "";
				$scope.password = "";
				mvNotifier.login('You have successfully signed out!');
				$location.path('/');
			})
		}
});