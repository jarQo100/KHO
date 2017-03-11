(function(){

"use strinct";

angular.module("KHO_CRM")
	.controller('AddCommentController', AddCommentController)
	.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);

AddCommentController.$inject = [
	'$scope',
	'$stateParams',
	'$http',
	'Todos',
	'SetAlertClass',
	'$rootScope',
	'SendEmailToGroup',
	'$timeout',
	'Upload'
];

function AddCommentController($scope, $stateParams, $http, Todos, SetAlertClass, $rootScope, SendEmailToGroup, $timeout, Upload){

		var vm = this;

		// Deklaracja zmiennych
		vm.attemptIdParam = $stateParams.attemptId;
		vm.nameAndSurname;
		vm.formData = {};


		// Przypisanie funkcji do zmiennych
		vm.createTask = createTaskFun;
		vm.getClass = getClass;
		vm.showForm = showForm;
		vm.showFormFile = showFormFile;
		vm.read = read();

		getComments();
		read();


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

		function showFormFile(){
			if(vm.showFormFileField == true){
				vm.showFormFileField = false;
			}else{
				vm.showFormFileField = true;
			}
		}

vm.submit = function(){
	console.log("fdsfsd");
	console.log(vm.file);
            if (vm.upload_form.file.$valid && vm.file) {
                vm.upload(vm.file);
            }
        }

        vm.upload = function (file) {
        	var username = $rootScope.globals.currentUser['username'];
            Upload.upload({
                url: '/api/sendFiles/', //webAPI exposed to upload the file
                data:{
                	file:file,
                } ,
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success

                } else {
                    alert('Błąd dodawania pliku');
                }
            }, function (resp) { //catch error
                alert('Błąd dodawanie pliku:  ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                vm.progress = 'Plik został dołączony poprawnie! Progres: ' + progressPercentage + '% '; // capture upload progress
            });
        };


         function read () {
        		var username = $rootScope.globals.currentUser['username'];

            	Todos.readFiles({username:username}).success(function(data){
			vm.filesList = data;
		});

          }

          	vm.upload2 = function () {
	   	angular.element(document.querySelector('#fileInput')).click();
	};


}

})();

