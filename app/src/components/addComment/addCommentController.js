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

		$scope.TaskIdParam = $stateParams.taskId;


	       	$scope.formData = {};

		$scope.formData = Todos.findByIdTask($scope.TaskIdParam).success(function(data) {
                        	$scope.formData = data;
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