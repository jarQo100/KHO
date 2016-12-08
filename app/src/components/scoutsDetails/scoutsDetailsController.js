(function () {

    "use strict";

    angular.module('KHO_CRM').controller('ScoutsDetailsController', ScoutsDetailsController);

    ScoutsDetailsController.$inject = [
    	'$scope',
    	'$stateParams',
    	'Todos',
                '$timeout'
    ];

    function ScoutsDetailsController($scope, $stateParams, Todos, $timeout) {

	       var scoutIdParam = $stateParams.scoutsId;

	       $scope.formData = {};



                Todos.findById(scoutIdParam).success(function(data) {

                        $scope.formData = data;

                }).error(function(err){
                    console.log("GET ERROR: " + err);
                });

            $scope.updateScout = function(){

                        Todos.update($scope.formData).success(function(data) {

                            //$scope.formData = data;
                            $scope.alertUpdateUser = true;

                            $timeout(function(){
                                    $scope.alertUpdateUser = false;
                            }, 5000)

                            }).error(function(err){
                                        console.log("GET ERROR: " + err);
                            });

            }

    }

})();