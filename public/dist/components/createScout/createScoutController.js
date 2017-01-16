(function () {

    "use strict";

    angular.module('KHO_CRM').controller('CreateScoutController', CreateScoutController);

    CreateScoutController.$inject = [
        '$scope',
        '$http',
        'Todos',
        '$location',
        '$timeout',
        'md5',
        '$rootScope',
        'KHO_CRM_CONFIG'
    ];

    function CreateScoutController($scope, $http, Todos, $location, $timeout, md5, $rootScope, KHO_CRM_CONFIG) {

var vm = this;

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        vm.role = response.role;

        if(response.role == KHO_CRM_CONFIG.petent){
            $location.path('/notAuthorize');
        }
    });

vm.teams = KHO_CRM_CONFIG.teams;

    		vm.createScout = function(formData){

			vm.invalidForm = false;
			vm.formData = formData;
			formData.password = md5.createHash(formData.password);
			console.log(formData.password);
			if( formData.$valid ){

				Todos.create(formData)
					.success(function(data) {
						console.log("SUCCESS");
						vm.loading = false;
						vm.formData = {};
						vm.todos = data;
						$location.path('/content/list');
				}).error(function(){
					console.log("ERROR CREATE");
				});

			}else{
				vm.invalidForm = true;

				$timeout(function () {
	                                		vm.invalidForm = false;
	                            	}, 5000);

			}

    		};



    }

})();