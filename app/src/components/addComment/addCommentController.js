(function(){

"use strinct";

angular.module("KHO_CRM").controller('AddCommentController', AddCommentController);

AddCommentController.$inject = [
	'$scope',
	'$stateParams',
	'$http',
	'Todos'
];

function AddCommentController($scope, $stateParams, $http, Todos){

		$scope.attemptIdParam = $stateParams.attemptId;

		console.log("attemptIdParam: " + $scope.attemptIdParam);

		$scope.formData = {};

		$scope.formData = Todos.findByIdTask($scope.attemptIdParam).success(function(data) {
			$scope.formData = data;
			console.log($scope.formData);
		});

		$scope.createTask = function(commData){

			console.log(commData);
			console.log($scope.formData);

			Todos.addComment($scope.TaskIdParam, commData).success(function(data) {

				console.log("POMYŚLNIE WSTAWIONO");

            }).error(function(err){
                       console.log("GET ERROR: " + err);
            });
		}

}

})();