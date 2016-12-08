(function () {

    "use strict";

    angular.module('KHO_CRM').controller('ScoutsDetailsController', ScoutsDetailsController);

    ScoutsDetailsController.$inject = [
    	'$scope',
    	'$stateParams',
    	'Todos'
    ];

    function ScoutsDetailsController($scope, $stateParams, Todos) {

			var scoutIdParam = $stateParams.scoutsId; 

				$scope.formData = {};

            Todos.findById(scoutIdParam).success(function(data) {

                $scope.formData = data;
console.log($scope.formData);
            }).error(function(err){

                console.log("GET ERROR: " + err);

            });

    }

})();