(function(){

"use strict";

angular.module('KHO_CRM').controller('UpdateAttemptController', UpdateAttemptController);

UpdateAttemptController.$inject = [
	'$scope',
	'Todos',
	'$location',
	'$stateParams',
	'$timeout'
];

function UpdateAttemptController($scope, Todos, $location, $stateParams, $timeout){

		//var scoutIdParam = $stateParams.userId;
		var attemptIdParam = $stateParams.attemptId;

		var userID;

	       	$scope.formData = {};
	       	$scope.tasks =  {};

	       	$scope.addButton = function(){
			$scope.tasks.push({});
		}

	       	Todos.get().success(function(data) {
	                $scope.formData = data;
							userID = data._id;
	                console.log("DATA", data);
	            });


		$scope.formData = Todos.findByIdTask(attemptIdParam).success(function(data) {

		   	$scope.attemptData = data.attempt
			$scope.attemptData = {};

			angular.forEach(data.attempt, function(attempt) {
				  if(attempt._id == attemptIdParam){
				  	$scope.attemptData = attempt;
				  	$scope.tasks = attempt.tasks;
				  }

			});


		});

		            $scope.createAttempt = function(attemptData){


			$scope.formData2 = attemptData;
			$scope.formData2.tasks = $scope.tasks;
			$scope.formData2.userId = userID;

			console.log("DORMDATA2", $scope.formData2);




				Todos.updateAttempt(attemptData).success(function(data) {

			                        $scope.userData = data;
			                        $scope.userData.attempt = attemptData;


			              }).error(function(){
			              	console.log("BŁĄD");
			              });

$location.path('/content/dashboard');


    		};

}



})();