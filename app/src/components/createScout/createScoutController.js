(function () {

    "use strict";

    angular.module('KHO_CRM').controller('CreateScoutController', CreateScoutController);

    CreateScoutController.$inject = [
        '$scope',
        '$http',
        'Todos',
        '$location',
        '$timeout'
    ];

    function CreateScoutController($scope, $http, Todos, $location, $timeout) {

    		$scope.createScout = function(formData){

			$scope.invalidForm = false;
			$scope.formData = formData;

			if( formData.$valid ){

				Todos.create(formData)
					.success(function(data) {
						console.log("SUCCESS");
						$scope.loading = false;
						$scope.formData = {};
						$scope.todos = data;
						$location.path('/content/list')
				}).error(function(){
					console.log("ERROR CREATE");
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