(function () {

    "use strict";

    angular.module('KHO_CRM').controller('ScoutsDetailsController', ScoutsDetailsController);

    ScoutsDetailsController.$inject = [
    	'$scope',
    	'$stateParams',
    	'Todos',
                '$timeout',
                'md5',
                '$rootScope',
                'KHO_CRM_CONFIG',
                '$location'
    ];

    function ScoutsDetailsController($scope, $stateParams, Todos, $timeout, md5, $rootScope, KHO_CRM_CONFIG, $location) {

	       var scoutIdParam = $stateParams.scoutsId;
                        var username = $rootScope.globals.currentUser['username'];
                        checkPermission();
                        $scope.teams = KHO_CRM_CONFIG.teams;
	        $scope.formData = {};
                        $scope.notAuthorize = true;

                        function checkPermission(){
                                    Todos.findByEmail(username).success(function(response){

                                                        if(scoutIdParam != response._id && response.role == KHO_CRM_CONFIG.petent){
                                                            $location.path('/notAuthorize');
                                                        }

                                                        if(response.role == KHO_CRM_CONFIG.petent){
                                                              $scope.notAuthorize = false;
                                                        }


                                                    });


                        }




                Todos.findById(scoutIdParam).success(function(data) {

                        $scope.formData = data;

                }).error(function(err){
                    console.log("GET ERROR: " + err);
                });

            $scope.updateScout = function(){
                        if($scope.formData.password2 != null){
                            $scope.formData.password = md5.createHash($scope.formData.password2);
                        }

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