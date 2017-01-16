(function(){

"use strict";

angular.module('KHO_CRM').controller('UpdateAttemptController', UpdateAttemptController);

UpdateAttemptController.$inject = [
	'$scope',
	'Todos',
	'$location',
	'$stateParams',
	'$timeout',
];

function UpdateAttemptController($scope, Todos, $location, $stateParams, $timeout){
var vm = this;
		//var scoutIdParam = $stateParams.userId;
		var attemptIdParam = $stateParams.attemptId;

		var userID;

	       	vm.formData = {};
	       	vm.formData2 = {};
	       	vm.tasks =  {};

	       	vm.addButton = addButton;
	       	vm.getAttempt = getAttempt;

	       	getAttempt();

	        	function addButton(){
			vm.tasks.push({});
		}

		function getAttempt(){
		       	Todos.get().success(function(data) {
		                	vm.formData = data;
				userID = data._id;
		            });
	       	};


		vm.formData = Todos.findByIdTask(attemptIdParam).success(function(data) {

		   	vm.attemptData = data.attempt
			vm.attemptData = {};

			angular.forEach(data.attempt, function(attempt) {
				  if(attempt._id == attemptIdParam){
				  	vm.attemptData = attempt;
				  	vm.tasks = attempt.tasks;
				  }

			});


		});

		            vm.createAttempt = function(attemptData){

			vm.formData2 = attemptData;
			vm.formData2.tasks = vm.tasks;
			vm.formData2.userId = userID;



				Todos.updateAttempt(attemptData).success(function(data) {

			                        vm.userData = data;
			                        vm.userData.attempt = attemptData;


			              }).error(function(){
			              	console.log("BŁĄD");
			              });

vm.success = true;
//$location.path('/content/dashboard');


    		};
return vm;
}



})();