angular.module('app')
	.factory('mvAuth', function ($http, mvIdentity, $q, mvUser, mvNote) {

		return {
			authenticateUser: function (username, password) {
				var deferred = $q.defer();
				$http.post('/login', {username: username, password: password})
					.then(function (response) {
						if(response.data.success){
							var user = new mvUser();
							angular.extend(user, response.data.user);
							mvIdentity.currentUser = user;
							deferred.resolve(true);
						} else {
							deferred.resolve(false);
						}
					});
					return deferred.promise;
			},
			createUser: function (newUserData) {
				var newUser = new mvUser(newUserData);
				var deferred = $q.defer();

				newUser.$save().then(function () {
					mvIdentity.currentUser = newUser;
					console.log('newUser._id', newUser._id);	
					deferred.resolve();
					console.log('RESOLVED', deferred.resolve);
				}, function (response) {
					deferred.reject(response.data.reason);
				});
				console.log('PROMISE', deferred.promise);
				return deferred.promise;
			},
			createUserNote: function (newUserNote) {
				var deferred = $q.defer();
				var newNote = new mvNote(newUserNote);

				newNote.$save().then(function () {
					deferred.resolve();
				}, function (response) {
					deferred.reject(response.data.reason);
				});
				return deferred.promise;
			},
			deleteUserNote: function (noteToDelete) {
				var deferred = $q.defer();
				var note = new mvNote();
			
				note.$delete({_id: noteToDelete}).then(function () {
					deferred.resolve();
				}, function (response) {
					deferred.reject(response.data.reason);
				});
			
				return deferred.promise;
				/*var note = new mvNote();
				var deferred = $q.defer();

				note.$remove({_id: noteToDelete}).then(function () {
					deferred.resolve();
				}, function (response) {
					deferred.reject(response.data.reason);
				});
				return deferred.promise;*/
			},
			updateCurrentUser: function (newUserData) {
				var deferred = $q.defer();

				var clone = angular.copy(mvIdentity.currentUser);
				angular.extend(clone, newUserData);
				clone.$update().then(function () {
					mvIdentity.currentUser = clone;
					deferred.resolve();
				}, function (response) {
					deferred.reject(response.data.reason);
				});
				return deferred.promise;
			},
			logoutUser: function () {
				var deferred = $q.defer();
				$http.post('/logout', {logout: true}).then(function () {
					mvIdentity.currentUser = undefined;
					deferred.resolve();
				});
				return deferred.promise;
			},
			authorizeCurrentUserForRoute: function (role) {
				if(mvIdentity.isAuthorized(role)){
					return true;
				} else {
					return $q.reject('not authorized');
				}
			},
			authorizeAuthenticatedUserForRoute: function () {
				if(mvIdentity.isAuthenticated()){
					return true;
				} else {
					return $q.reject('not authorized');
				}
			}
		}
})