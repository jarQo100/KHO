(function(){

"use strinct";

angular.module("KHO_CRM").controller('AddCommentController', AddCommentController);

AddCommentController.$inject = [
	'$scope',
	'$stateParams',
	'$http',
	'Todos',
	'SetAlertClass',
	'$rootScope',
	'SendEmailToGroup',
	'$timeout'
];

function AddCommentController($scope, $stateParams, $http, Todos, SetAlertClass, $rootScope, SendEmailToGroup, $timeout){

		var vm = this;

		// Deklaracja zmiennych
		vm.attemptIdParam = $stateParams.attemptId;
		vm.nameAndSurname;
		vm.formData = {};

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

		$scope.uploadFiles = function(file, errFiles) {
		        $scope.f = file;
		        $scope.errFile = errFiles && errFiles[0];
		        console.log(file);
		        if (file) {
		            file.upload = Upload.upload({
		                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
		                data: {file: file}
		            });

		        //     file.upload.then(function (response) {
		        //         $timeout(function () {
		        //             file.result = response.data;
		        //         });
		        //     }, function (response) {
		        //         if (response.status > 0)
		        //             $scope.errorMsg = response.status + ': ' + response.data;
		        //     }, function (evt) {
		        //         file.progress = Math.min(100, parseInt(100.0 *
		        //                                  evt.loaded / evt.total));
		        //     });

		     }
    		}

}

})();