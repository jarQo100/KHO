(function () {
    'use strict';

    angular
        .module('KHO_CRM')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'UserService', 'md5'];

    function LoginController($location, AuthenticationService, UserService, md5) {
        var vm = this;

        vm.login = login;
        console.log("elo");

        (function initController() {
            // reset login status
            console.log("clear");
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            var pass = md5.createHash(vm.password);
            console.log(pass);
            vm.dataLoading = true;
console.log("fdsfsdfsdfsd");
            AuthenticationService.Login(vm.username, pass, function (response) {
				console.log("fdsfsdfsdfsd");
                if (response.success) {
                    console.log("true");
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/content/dashboard');
                } else {
                    console.log("false");
                    //UserService.Error(response.message);
                    vm.password = {};
                    vm.errorLoginData = true;
                    vm.dataLoading = false;
                }
            });
        };
    }

})();