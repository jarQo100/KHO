(function(){

"use strict";

angular.module("KHO_CRM").controller('AttemptCreateController', AttemptCreateController);

AttemptCreateController.$inject = [
	'$scope',
	'$http',
	'Todos'
];

function AttemptCreateController($scope, $http, Todos){

	$scope.formData = {};
	$scope.formData2  = {};
	$scope.userData = {};

            Todos.get().success(function(data) {
                $scope.formData = data;
            }).error(function(err){
                console.log("GET ERROR: " + err);
            });

            $scope.createAttempt = function(attemptData){

			$scope.formData2 = attemptData;

			if( attemptData.$valid ){



				Todos.findById(attemptData.nameAndSurname).success(function(data) {

			                        $scope.userData = data;
			                        $scope.userData.attempt = attemptData;

			              		Todos.update($scope.userData).success(function(data) {

				                                    $scope.alertUpdateUser = false;


				                            }).error(function(err){
				                                        console.log("GET ERROR: " + err);
				                            });


			              }).error(function(){
			              	console.log("BŁĄD");
			              });

// _id: {
//     			type: String,
//     			default: ''
//     		},
//     		quide: {
//         			type: String,
//        			default: ''
//     		},
//     		dataBegin: {
//     			type: Date,
//     			default: ''
//     		},
//     		dataEnd: {
//     			type: Date,
//     			default: ''
//     		},


				// Todos.update($scope.formData).success(function(data) {

			 //                            $scope.alertUpdateUser = true;

			 //                            $timeout(function(){
			 //                                    $scope.alertUpdateUser = false;
			 //                            }, 5000)

		  //                           }).error(function(err){
		  //                                       console.log("GET ERROR: " + err);
		  //                           });

			}else{
				$scope.invalidForm = true;

				// $timeout(function () {
	   //                              		$scope.invalidForm = false;
	   //                          	}, 5000);

			}

    		};

}


})();