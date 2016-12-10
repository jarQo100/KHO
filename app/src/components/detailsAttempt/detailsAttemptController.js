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

		var scoutIdParam = $stateParams.userId;
		$scope.attemptIdParam = $stateParams.attemptId;

	       	$scope.formData = {};




			$scope.formData = Todos.findById(scoutIdParam).success(function(data) {
	                        	$scope.formData = data;
		                })







	}

})();