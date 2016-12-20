(function(){

"use strict";

angular.module("KHO_CRM").controller('AttemptListController', AttemptListController);

AttemptListController.$inject= [
	'$scope',
	'$http',
	'Todos',
	'$timeout',
	'$location',
	'SetAlertClass'
];

function AttemptListController($scope, $http, Todos, $timeout, $location, SetAlertClass){

	$scope.formData = {};
	$scope.users = [];

            Todos.get().success(function(data) {

               		angular.forEach(data, function(user) {

               			angular.forEach(user.attempt, function(attempt) {
               				attempt.userID = user._id;
               				attempt.name = user.name;
               				attempt.surname = user.surname;
					$scope.users.push(attempt);

               			});

			});

               		console.log($scope.users);

            }).error(function(err){
                console.log("GET ERROR: " + err);
            });

            $scope.deleteAttempt = function(userID, attemptID){
            	 $scope.loading = true;

	            var  confirmResult = confirm("Czy na pewno chcesz usunąć próbę użytkownika?");

	                if(confirmResult == true){

	                        Todos.deleteAttempt(userID, attemptID)
	                        .success(function(data) {
	                        	alert("fdsfsda");
	                        }).error(function(){
	                        	console.log("ERROR2222");
	                        });

			$location.path('/content/attemptList');

	                        $scope.alertDeleteUser = true;
	                            $timeout(function () {
	                                 $scope.alertDeleteUser = false;
	                            }, 5000);

	                }
	         }

	         $scope.propertyName = 'age';
		  $scope.reverse = true;


		  $scope.getClass = function(status) {
		  	return SetAlertClass.setClassStatus(status);
		  };



}

})();