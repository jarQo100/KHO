(function(){

"use strinct";

angular.module("KHO_CRM").controller('AddCommentController', AddCommentController);

AddCommentController.$inject = [
	'$scope',
	'$stateParams',
	'$http',
	'Todos',
	'SetAlertClass',
	'$rootScope'
];

function AddCommentController($scope, $stateParams, $http, Todos, SetAlertClass, $rootScope){

		$scope.attemptIdParam = $stateParams.attemptId;
		$scope.nameAndSurname;
		$scope.formData = {};
		getComments();


		$scope.createTask = function(commData){
			var username = $rootScope.globals.currentUser['username'];
			Todos.findByEmail(username).success(function(data){

			         commData.author = data.name + " " + data.surname;

				         	Todos.addComment($scope.attemptIdParam, commData).success(function(data) {
						console.log("SUCCESS");
				            }).error(function(err){
				                       console.log("GET ERROR: " + err);
				            });

				getComments();
				$scope.showFormComm = false;
			  });
		}

		function getComments(){
			Todos.findByIdTask($scope.attemptIdParam).success(function(data) {
				$scope.formData = data;
			});
		}

		$scope.getClass = function(category){
			return "alert-" + SetAlertClass.set(category);
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