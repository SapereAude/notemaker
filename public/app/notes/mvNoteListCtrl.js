angular.module('app')
	.controller('mvNoteListCtrl', function($scope, mvIdentity, mvNotifier, $location, mvAuth, mvNote, $routeParams, $filter) {
		
		$scope.notes = mvNote.query({_id: $routeParams.id});

		$scope.identity = mvIdentity;

		$scope.createNote = function() { 
			var newNote = {
				userid: mvIdentity.currentUser._id,
				content: $scope.content,
				category: $scope.category
			};
			//Create a new user note. Returns a promise from mvAuth.createUserNote
			mvAuth.createUserNote(newNote).then(function () {
			
				$scope.emptyInput();

				//Fetch new notes api. Get the newly created note's ObjectId from Mango db(_id). this _id is used in the delete operation.  
				var getNewNote = mvNote.query({_id: $routeParams.id}, function(){

					//The last item of the array is cut from it (the note just created) and copied in a var.
					var sup = getNewNote.pop();
					
					//add the new note object to the $scope.(responsive reload);
					$scope.notes.push(sup)
				
					mvNotifier.notify('Note created');

				}, function(error) {//error querying notes
					mvNotifier.notify(error);					
				}); 
			}, function (reason) {//create new note unsuccessful
				mvNotifier.notify(reason);
			});
		
		};

		$scope.deleteNoteFromDb = function (noteId, note) {
			//Using $resource to Delete
			mvAuth.deleteUserNote(noteId).then(function () {
				mvNotifier.notify('Note Deleted');

				// removes note from the view. 
				$scope.removeNoteFromView = function (note) { 

					//Find index of note to be removed
			      	var index = $scope.notes.indexOf(note);

			      	//use splice to remove note from notes array
			      	$scope.notes.splice(index,1);

			    }
			    $scope.removeNoteFromView(note);

			}, function (reason) {
				mvNotifier.notify("Delete unsuccessful!");
			});
		    
		};

		//Empty input boxes
		$scope.emptyInput = function(){
			$scope.content = '';
			$scope.category = '';
		};
	});