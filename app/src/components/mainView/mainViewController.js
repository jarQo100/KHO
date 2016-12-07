(function () {

    "use strict";

    angular.module('KHO_CRM').controller('MainViewController', MainViewController);

    MainViewController.$inject = [
        '$scope',
    ];

    function MainViewController($scope) {

    		$scope.test = "TEST";

    }

})();