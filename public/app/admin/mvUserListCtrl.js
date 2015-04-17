angular.module('app').controller('mvUserListCtrl', function ($scope, mvUser) {

	$scope.pageClass = 'page-site';

	$scope.users = mvUser.query();
});