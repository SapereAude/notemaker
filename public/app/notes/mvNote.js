angular.module('app').factory('mvNote', function ($resource) {
	var UserResource = $resource('/api/notes/:_id', 
		{
			_id: "@id"
		},
		{
			update:  { method: 'PUT', isArray: false }
		},
		{	
			delete: { method: 'DELETE', params: "@id" }
		}
	);
	
	return UserResource;
})