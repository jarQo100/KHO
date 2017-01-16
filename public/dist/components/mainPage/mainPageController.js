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

    var vm = this;

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        vm.role = response.role;

        if(response.role == KHO_CRM_CONFIG.petent){
            $location.path('/notAuthorize');
        }
    });


            vm.formData = {};

            Todos.get().success(function(data) {

                vm.users = data;
                vm.loading = false;
                vm.alertDeleteUser = false;

            }).error(function(err){

                console.log("GET ERROR: " + err);

            });


        vm.deleteUser = function(id){

            vm.loading = true;

            var  confirmResult = confirm("Czy na pewno chcesz usunąć użytkownika z bazy danych?");

                if(confirmResult == true){

                        Todos.delete(id)
                        .success(function(data) {
                            vm.loading = false;
                            vm.users = data;
                        });

                        vm.alertDeleteUser = true;
                            $timeout(function () {
                                 vm.alertDeleteUser = false;
                            }, 5000);

                }



        };


    }

})();
