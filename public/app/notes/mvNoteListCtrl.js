angular.module('app')
	.controller('mvNoteListCtrl', function($scope, mvIdentity, mvNotifier, $location, mvAuth, mvNote, $routeParams, $filter) {

		$scope.title = 'New Note';

		// ng-animate class
		$scope.pageClass = 'page-site';

		//get all the notes
		$scope.notes = mvNote.query({_id: $routeParams.id});

  		$scope.state = { selected : null};

		//user
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

				//Fetch new notes api. Get the newly created note's ObjectId from Mango db(_id). this _id is used in the delete function.  
				var getNewNote = mvNote.query({_id: $routeParams.id}, function(){

					//The last item of the array is cut from it (the note just created) and copied in a var.
					var sup = getNewNote.pop();
					
					//add the new note object to the $scope.(responsive reload);
					$scope.notes.push(sup)
				
					mvNotifier.notify('Note created');

				}, function(error) {//error querying notes
					mvNotifier.error(error);					
				}); 
			}, function (reason) {//create new note unsuccessful
				mvNotifier.error('Creation Unsuccessful!');
			});
		
		};

		$scope.deleteNote = function (noteId, note) {
			//Using $resource to Delete
			mvAuth.deleteUserNote(noteId).then(function () {
				mvNotifier.notify('Note Deleted');

				//Find index of note to be removed
		      	var index = $scope.notes.indexOf(note);
		      	console.log(index);

		      	//use splice to remove note from notes array
		      	$scope.notes.splice(index,1);

			}, function (reason) {
				mvNotifier.error("Delete unsuccessful!");
			});
		    
		};

		$scope.updateNote = function (note) {

			var editedNote = {
				content: $scope.editContent,
				category: $scope.editCategory
			};

			mvAuth.updateUserNote(note._id, editedNote).then(function () {
				mvNotifier.notify('Note updated');

				$scope.notes = mvNote.query({_id: $routeParams.id});

				$scope.editContent = '';
				$scope.editCategory = '';
				$scope.state.selected = null;

			}, function () {
				mvNotifier.error('Update Unsuccessful!');
			});
			

		};

		//Edit note
		$scope.editMode = function(note) {
			$scope.state.selected = note;
			$scope.editSwitch = 'bg-danger';
		};

		//Cancel edit
		$scope.cancelEdit = function() {
			$scope.state.selected = null;
			$scope.editSwitch = '';
			$scope.emptyInput();
		};

		$scope.isSelected = function(note) {
		    return $scope.state.selected === note;
		};

		//Empty input boxes
		$scope.emptyInput = function(){
			$scope.content = '';
			$scope.category = '';
		};
	});