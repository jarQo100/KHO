(function () {

    "use strict";

    angular.module('KHO_CRM').controller('RegisterController', RegisterController);

    RegisterController.$inject = [
    	'$scope',
    	'md5'
    ];

    function RegisterController($scope, md5) {

    	var vm = this;
   	vm.register = register;


	function register(){


	   	if(vm.registerForm.password != vm.registerForm.confirmpass){
	   		vm.notMatchpass = true;
	   	}else{
	   		console.log(vm.registerForm);
	    		var pass = md5.createHash(vm.password);
	    		// var userData = {
	    		// 	name: vm.RegisterForm.name
	    		// 	surname: vm.RegisterForm.surname
	    		// 	email: vm.RegisterForm.email
	    		// 	password: vm.RegisterForm.password
	    		// }
	   	}






    	};


};

})();