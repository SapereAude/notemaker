angular.module('app')
	.controller('mvNoteListCtrl', function ($scope, mvIdentity, mvNotifier, $location, mvAuth, mvNote, $routeParams) {
		


		var theNotes = mvNote.query({_id: $routeParams.id});

		$scope.notes = theNotes;

		$scope.identity = mvIdentity;

		$scope.createNote = function() { 
			var newNote = {
				userid: mvIdentity.currentUser._id,
				content: $scope.content,
				category: $scope.category
			};
			mvAuth.createUserNote(newNote).then(function () {
				mvNotifier.notify('Note created');
				$scope.content = '';
				$scope.category = '';
			}, function (reason) {
				mvNotifier.notify(reason);
			});

			$scope.notes = mvNote.query({_id: $routeParams.id});
		
		}

		$scope.deleteNote = function(noteId) {
			/*mvAuth.deleteUserNote(noteId).then(function () {
				mvNotifier.notify('Note Deleted');
			}, function (reason) {
				mvNotifier.notify(reason);
			});*/

			mvNote.delete({_id: noteId});
			$scope.notes = mvNote.query({_id: $routeParams.id});
		};

	});