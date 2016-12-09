(function(){

"use strict";

angular.module("KHO_CRM").controller('AttemptListController', AttemptListController);

AttemptListController.$inject= [
	'$scope',
	'$http',
	'Todos',
	'$timeout'
];

function AttemptListController($scope, $http, Todos, $timeout){

	$scope.formData = {};

            Todos.get().success(function(data) {

               $scope.users = data;
                $scope.alertDeleteUser = false;
		console.log( $scope.users);
            }).error(function(err){

                console.log("GET ERROR: " + err);

            });

            $scope.deleteAttempt = function(id){
            	 $scope.loading = true;

	            var  confirmResult = confirm("Czy na pewno chcesz usunąć próbę użytkownika?");
alert(id);
	                if(confirmResult == true){

	                        Todos.deleteAttempt(id)
	                        .success(function(data) {
	                            $scope.loading = false;
	                            $scope.users = data;
	                        }).error(function(){
	                        	console.log("ERROR");
	                        });

	                        $scope.alertDeleteUser = true;
	                            $timeout(function () {
	                                 $scope.alertDeleteUser = false;
	                            }, 5000);

	                }
	            }

}

})();