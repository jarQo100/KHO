(function () {

    "use strict";

    angular
    	.module('KHO_CRM')
    	.controller('MainPageController', MainPageController);

    MainPageController.$inject = [
        '$scope',
        '$http',
        'Todos'
    ];

    function MainPageController($scope, $http, Todos) {
            $scope.formData = {};

            console.log("Uzupełniłeś scope data" + $scope.formData);

                  $scope.status = "pl";

            Todos.get().success(function(data) {

                $scope.users = data;
                $scope.loading = false;
                $scope.status = "!";

            }).error(function(err){

                console.log("GET ERROR: " + err);

            });


        $scope.deleteUser = function(id){

            $scope.loading = true;

            Todos.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.loading = false;
                   $scope.users = data;
                });

        };






    }

})();
