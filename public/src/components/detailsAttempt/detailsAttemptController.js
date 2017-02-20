(function(){

	"use strict";

	angular.module("KHO_CRM").controller('DetailsAttemptController', DetailsAttemptController);

	DetailsAttemptController.$inject = [
		'$scope',
		'$stateParams',
		'$http',
		'Todos'
	];

	function DetailsAttemptController($scope, $stateParams, $http, Todos){

		var vm = this;
		var scoutIdParam = $stateParams.userId;
		vm.attemptIdParam = $stateParams.attemptId;

	       	vm.attemptData = {};
	       	vm.scoutDetails = {};

			Todos.findById(scoutIdParam).success(function(data) {

				vm.scoutDetails = data;

				angular.forEach(data.attempt, function(attempt) {

               				if(attempt._id == vm.attemptIdParam){
               					vm.attemptData = attempt;
               					console.log(vm.attemptData);
               				}


               			});

		                });





	}

})();