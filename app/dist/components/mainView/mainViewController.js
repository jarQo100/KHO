(function () {

    "use strict";

    angular.module('KHO_CRM').controller('MainViewController', MainViewController);

    MainViewController.$inject = [
        '$scope',
        'AuthenticationService',
        '$location'
    ];

    function MainViewController($scope, AuthenticationService, $location) {

    		$scope.test = "TEST";

    		$scope.logout = function(){
    			console.log("logout");
    			AuthenticationService.ClearCredentials();
    			 $location.path('/login');
    		};

    }

})();