(function () {

    "use strict";

    angular
    	.module('KHO_CRM')
    	.controller('MeetingDateController', MeetingDateController);

    MeetingDateController.$inject = [
        '$scope',
        '$http',
        'Todos',
        '$timeout'
    ];

    function MeetingDateController($scope, $http, Todos, $timeout) {

        Todos.get().success(function(data) {
console.log(data);
                $scope.users = data.length;
                $scope.attempt = data[0].attempt.length;
                $scope.alertDeleteUser = false;

            }).error(function(err){

                console.log("GET ERROR: " + err);

            });






    }

})();
