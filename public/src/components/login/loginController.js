(function () {
    'use strict';

    angular
        .module('KHO_CRM')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'UserService', 'md5'];

    function LoginController($location, AuthenticationService, UserService, md5) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            console.log("clear");
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            console.log("fdsfs");
            var pass = md5.createHash(vm.password);
            vm.dataLoading = true;

            AuthenticationService.Login(vm.username, pass, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/content/dashboard');
                } else {
                    //UserService.Error(response.message);
                    vm.password = {};
                    vm.errorLoginData = true;
                    vm.dataLoading = false;
                }
            });
        };
    }

})();