(function(){

"use strict";

angular.module("KHO_CRM").controller('AttemptCreateController', AttemptCreateController);

AttemptCreateController.$inject = [
	'$scope',
	'$http',
	'Todos',
	'$timeout',
	'$location',
	'$rootScope',
	'KHO_CRM_CONFIG'
];

function AttemptCreateController($scope, $http, Todos, $timeout, $location, $rootScope, KHO_CRM_CONFIG){

	var vm = this;

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        vm.role = response.role;

        if(response.role == KHO_CRM_CONFIG.petent){
            $location.path('/notAuthorize');
        }
    });

	vm.formData  = {};
	vm.userData = {};
	vm.tasks = [{}];
	vm.nameSurname = true;
	vm.createAttempt = createAttempt;
	vm.addButton = addButton;


	function addButton(){
		vm.tasks.push({});
	}

            Todos.get().success(function(data) {
                vm.formData = data;
            });

            function createAttempt(attemptData){

			vm.formData2 = vm.attemptData;
			vm.formData2.tasks = vm.tasks;

			console.log(attemptData);
			console.log(attemptData.nameAndSurname);



				Todos.findById(attemptData.nameAndSurname).success(function(data) {

			                        vm.userData = data;
			                        vm.userData.attempt = attemptData;

			              		Todos.addAttempt(vm.userData._id, vm.userData.attempt).success(function(data) {

				                                  vm.alertUpdateUser = false;

				                        }).error(function(err){
				                                   console.log("GET ERROR: " + err);
				                        });

					$location.path('/content/attemptList');

			              }).error(function(){
			              	console.log("BŁĄD");
			              });




    		};

}


})();