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

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        $scope.role = response.role;

        if(response.role == KHO_CRM_CONFIG.petent){
            $location.path('/notAuthorize');
        }
    });

$scope.teams = KHO_CRM_CONFIG.teams;

    		$scope.createScout = function(formData){

			$scope.invalidForm = false;
			$scope.formData = formData;
			formData.password = md5.createHash(formData.password);
			console.log(formData.password);
			if( formData.$valid ){

				Todos.create(formData)
					.success(function(data) {
						console.log("SUCCESS");
						$scope.loading = false;
						$scope.formData = {};
						$scope.todos = data;
						$location.path('/content/list');
				}).error(function(){
					console.log("ERROR CREATE");
				});

			}else{
				$scope.invalidForm = true;

				$timeout(function () {
	                                		$scope.invalidForm = false;
	                            	}, 5000);

			}

    		};



    }

})();