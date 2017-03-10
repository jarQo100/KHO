(function(){

"use strinct";

angular.module("KHO_CRM")
	.controller('AddCommentController', AddCommentController)
	.directive('ngFiles', ['$parse', function ($parse) {

	            function fn_link(scope, element, attrs) {
	                var onChange = $parse(attrs.ngFiles);
	                element.on('change', function (event) {
	                    onChange(scope, { $files: event.target.files });
	                });
	            };

	            return {
	                link: fn_link
	            }
	        }
        ]);

AddCommentController.$inject = [
	'$scope',
	'$stateParams',
	'$http',
	'Todos',
	'SetAlertClass',
	'$rootScope',
	'SendEmailToGroup',
	'$timeout',
];

function AddCommentController($scope, $stateParams, $http, Todos, SetAlertClass, $rootScope, SendEmailToGroup, $timeout){

		var vm = this;

		// Deklaracja zmiennych
		vm.attemptIdParam = $stateParams.attemptId;
		vm.nameAndSurname;
		vm.formData = {};
		vm.files = {};

		// Przypisanie funkcji do zmiennych
		vm.createTask = createTaskFun;
		vm.getClass = getClass;
		vm.showForm = showForm;

		getComments();


		function createTaskFun(commData){
			var username = $rootScope.globals.currentUser['username'];


			Todos.findByEmail(username).success(function(data){
			          commData.author = data.name + " " + data.surname;

				Todos.addComment(vm.attemptIdParam, commData);
				getComments();
				vm.showFormComm = false;

				if(commData.sendMail == "true"){
					commData.username = username;
					SendEmailToGroup.sendFromAddComment(commData);
				}


			  });


		}

		function getComments(){
			Todos.findByIdTask(vm.attemptIdParam).success(function(data) {
				vm.formData = data;
				console.log(vm.formData);
			});
		}

		function getClass(category){
			return "alert-" + SetAlertClass.set(category);
		}

		function showForm(){
			if(vm.showFormComm == true){
				vm.showFormComm = false;
			}else{
				vm.showFormComm = true;
			}
		}

		vm.submit = function() {
		      if (vm.form.file.$valid && vm.form.file) {
		      	console.log(vm.form.file);
		        	vm.upload(vm.form.file);
		      }
		    };


    //upload on file select or drop
    vm.upload = function (file) {
    	Todos.sendFiles("jarek", file);
}

    // // for multiple files:
    // $scope.uploadFiles = function (files) {
    //   if (files && files.length) {
    //     for (var i = 0; i < files.length; i++) {
    //       Upload.upload({..., data: {file: files[i]}, ...})...;
    //     }
    //     // or send them all together for HTML5 browsers:
    //     Upload.upload({..., data: {file: files}, ...})...;
    //   }
    // }



}

})();