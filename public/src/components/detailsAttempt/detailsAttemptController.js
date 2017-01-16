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

	       	vm.formData = {};

			vm.formData = Todos.findById(scoutIdParam).success(function(data) {
	                        	vm.formData = data;
		                })

	}

})();