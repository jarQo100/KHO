(function () {

    "use strict";

    angular
    	.module('KHO_CRM')
    	.controller('MainPageController', MainPageController);

    MainPageController.$inject = [
        '$scope',
        '$http',
        'Todos',
        '$timeout',
        '$rootScope',
        'KHO_CRM_CONFIG',
        '$location'
    ];

    function MainPageController($scope, $http, Todos, $timeout, $rootScope, KHO_CRM_CONFIG, $location) {

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        $scope.role = response.role;

        if(response.role == KHO_CRM_CONFIG.petent){
            $location.path('/notAuthorize');
        }
    });


            $scope.formData = {};

            Todos.get().success(function(data) {

                $scope.users = data;
                $scope.loading = false;
                $scope.alertDeleteUser = false;

            }).error(function(err){

                console.log("GET ERROR: " + err);

            });


        $scope.deleteUser = function(id){

            $scope.loading = true;

            var  confirmResult = confirm("Czy na pewno chcesz usunąć użytkownika z bazy danych?");

                if(confirmResult == true){

                        Todos.delete(id)
                        .success(function(data) {
                            $scope.loading = false;
                            $scope.users = data;
                        });

                        $scope.alertDeleteUser = true;
                            $timeout(function () {
                                 $scope.alertDeleteUser = false;
                            }, 5000);

                }



        };


    }

})();
