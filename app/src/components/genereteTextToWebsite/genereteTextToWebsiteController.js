(function () {

    "use strict";

    angular
    	.module('KHO_CRM')
    	.controller('GenereteTextToWebsiteController', GenereteTextToWebsiteController);

    GenereteTextToWebsiteController.$inject = [
        '$scope',
        '$http',
        'Todos',
        '$timeout',
        'SetAlertClass',
        '$rootScope',
        'KHO_CRM_CONFIG',
    ];

    function GenereteTextToWebsiteController($scope, $http, Todos, $timeout, SetAlertClass, $rootScope, KHO_CRM_CONFIG) {

    	$scope.users = [];

    	Todos.get().success(function(data) {
$scope.users = data;
               		angular.forEach(data, function(user) {

               			angular.forEach(user.attempt, function(attempt) {
               				attempt.userID = user._id;
               				attempt.name = user.name;
               				attempt.surname = user.surname;
               				attempt.team = user.team;

               				//$scope.users.push(attempt);


               			});



			});

console.log($scope.users);

            }).error(function(err){
                console.log("GET ERROR: " + err);
            });

    }

})();
