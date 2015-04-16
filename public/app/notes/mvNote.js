angular.module('app').factory('mvNote', function ($resource) {
	var UserResource = $resource('/api/notes/:_id', { _id: "@id" } );
	
		return UserResource;
})