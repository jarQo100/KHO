(function(){

"use strict";

angular.module("KHO_CRM").controller('AttemptListController', AttemptListController);

AttemptListController.$inject= [
	'$scope',
	'$http',
	'Todos',
	'$timeout',
	'$location',
	'SetAlertClass',
	'$rootScope',
	'KHO_CRM_CONFIG'
];

function AttemptListController($scope, $http, Todos, $timeout, $location, SetAlertClass, $rootScope, KHO_CRM_CONFIG){

	var vm = this;
	vm.formData = {};
	vm.users = [];
	vm.deleteAttempt = deleteAttempt;
	vm.getClass = getClass;

	    var username = $rootScope.globals.currentUser['username'];
	    Todos.checkRole(username).success(function(response){
	        vm.role = response.role;
	         if(response.role == KHO_CRM_CONFIG.petent){
	            $location.path('/notAuthorize');
	        }
	    });




            Todos.get().success(function(data) {

               		angular.forEach(data, function(user) {

               			angular.forEach(user.attempt, function(attempt) {
               				attempt.userID = user._id;
               				attempt.name = user.name;
               				attempt.surname = user.surname;
               				if(vm.role != KHO_CRM_CONFIG.petent){
               					vm.users.push(attempt);
               				}else{
               					if(user.email == username){
               						vm.users.push(attempt);
               					}

               				}


               			});

			});

               		console.log(vm.users);

            }).error(function(err){
                console.log("GET ERROR: " + err);
            });

            function deleteAttempt(userID, attemptID){

            	 vm.loading = true;
	            var  confirmResult = confirm("Czy na pewno chcesz usunąć próbę użytkownika?");

	                if(confirmResult == true){

	                        Todos.deleteAttempt(userID, attemptID)
	                        .success(function(data) {
	                        	alert("fdsfsda");
	                        }).error(function(){
	                        	console.log("ERROR2222");
	                        });

			$location.path('/content/attemptList');

	                        vm.alertDeleteUser = true;
	                            $timeout(function () {
	                                 vm.alertDeleteUser = false;
	                            }, 5000);

	                }
	         }

	         	vm.propertyName = 'age';
		  vm.reverse = true;


		  function getClass(status) {
		  	return "label-" + SetAlertClass.setClassStatus(status);
		  };



}

})();