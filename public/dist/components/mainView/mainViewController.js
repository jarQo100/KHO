(function () {

    "use strict";

    angular.module('KHO_CRM').controller('MainViewController', MainViewController);

    MainViewController.$inject = [
        '$scope',
        'AuthenticationService',
        '$location',
        'Todos',
        '$rootScope',
        'KHO_CRM_CONFIG'
    ];

    function MainViewController($scope, AuthenticationService, $location, Todos, $rootScope, KHO_CRM_CONFIG) {

    var vm = this;
    vm.showMenuToggle = true;

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        vm.role = response.role;
    });

    Todos.findByEmail(username).success(function(response){
        vm.scout_id = response._id;
    });


    		vm.test = "TEST";

    		vm.logout = function(){
    			console.log("logout");
    			AuthenticationService.ClearCredentials();
    			 $location.path('/login');
    		};


            vm.getActiveClass = function (path) {
              return ($location.path().substr(0, path.length) === path) ? 'active' : '';
            }

    }

})();