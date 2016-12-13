(function(){

"use strinct";

angular.module("KHO_CRM").controller('AddCommentController', AddCommentController);

AddCommentController.$inject = [
	'$scope',
	'$stateParams',
	'$http',
	'Todos',
	'SetAlertClass',
];

function AddCommentController($scope, $stateParams, $http, Todos, SetAlertClass){

		$scope.attemptIdParam = $stateParams.attemptId;

		$scope.formData = {};

		var getComments = Todos.findByIdTask($scope.attemptIdParam).success(function(data) {
			$scope.formData = data;
		});

		$scope.createTask = function(commData){

			Todos.addComment($scope.attemptIdParam, commData).success(function(data) {
				console.log("SUCCESS");
		            }).error(function(err){
		                       console.log("GET ERROR: " + err);
		            });
		            window.location.reload();

		}

		$scope.getClass = function(category){
			return SetAlertClass.set(category);
		}

		$scope.showForm = function(){
			if($scope.showFormComm == true){
				$scope.showFormComm = false;
			}else{
				$scope.showFormComm = true;
			}
		}

}

})();