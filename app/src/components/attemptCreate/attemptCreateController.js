(function(){

"use strict";

angular.module("KHO_CRM").controller('AttemptCreateController', AttemptCreateController);

AttemptCreateController.$inject = [
	'$scope',
	'$http',
	'Todos',
	'$timeout',
	'$location'
];

function AttemptCreateController($scope, $http, Todos, $timeout, $location){


	$scope.formData  = {};
	$scope.userData = {};
	$scope.tasks = [{}];
	$scope.nameSurname = true;

	$scope.addButton = function(){
		$scope.tasks.push({});
	}

            Todos.get().success(function(data) {
                $scope.formData = data;
            }).error(function(err){
                console.log("GET ERROR: " + err);
            });

            $scope.createAttempt = function(attemptData){

			$scope.formData2 = attemptData;
			$scope.formData2.tasks = $scope.tasks;

			console.log($scope.formData2);
console.log(attemptData.nameAndSurname);

			if( attemptData.$valid ){

				Todos.findById(attemptData.nameAndSurname).success(function(data) {

			                        $scope.userData = data;
			                        $scope.userData.attempt = attemptData;

			              		Todos.addAttempt($scope.userData._id, $scope.userData.attempt).success(function(data) {

				                                  $scope.alertUpdateUser = false;

				                        }).error(function(err){
				                                   console.log("GET ERROR: " + err);
				                        });

					$location.path('/content/attemptList');

			              }).error(function(){
			              	console.log("BŁĄD");
			              });


			}else{
				$scope.invalidForm = true;

				$timeout(function () {
	                             		$scope.invalidForm = false;
	                            	}, 5000);

			}

    		};

}


})();