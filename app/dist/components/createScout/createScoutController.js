(function () {

    "use strict";

    angular.module('KHO_CRM').controller('CreateScoutController', CreateScoutController);

    CreateScoutController.$inject = [
        '$scope',
        '$http',
        'Todos'
    ];

    function CreateScoutController($scope, $http, Todos) {

    		$scope.formData = {};


    		$scope.createScout = function(){


console.log($scope.formData);

		                Todos.create($scope.formData)
		                    .success(function(data) {
		                    	console.log("SUCCESS");
		                        $scope.loading = false;
		                        $scope.formData = {}; // clear the form so our user is ready to enter another
		                        $scope.todos = data; // assign our new list of todos
		                    }).error(function(){
		                    	console.log("ERROR CREATE");
		                    });

    		};

    }

})();