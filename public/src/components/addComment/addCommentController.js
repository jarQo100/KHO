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
	'Upload',
	'KHO_CRM_CONFIG'
];

function AddCommentController($scope, $stateParams, $http, Todos, SetAlertClass, $rootScope, SendEmailToGroup, $timeout, Upload, KHO_CRM_CONFIG){

		var vm = this;

		// Deklaracja zmiennych
		vm.attemptIdParam = $stateParams.attemptId;
		var userIdParam = $stateParams.userId;

		vm.nameAndSurname;
		vm.formData = {};
		var username = $rootScope.globals.currentUser['username'];
		vm._dir = './resources/user_uploads/' + username;

		// Przypisanie funkcji do zmiennych
		vm.createTask = createTaskFun;
		vm.getClass = getClass;
		vm.showForm = showForm;
		vm.showFormFile = showFormFile;
		vm.read = read();
		vm.role = {};

		var candidateEmail = {};

		findCandidateEmail();
		getComments();
		read();
		checkPermission();

		function findCandidateEmail(){
			Todos.findById(userIdParam).then(function(response){
				candidateEmail = response.data.email;
			});
		}



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
				if(commData.sendMailToCandidate == "true"){
					commData.username = username;
					commData.sendToCandidate = candidateEmail;
					SendEmailToGroup.sendFromAddCommentToCandidate(commData);
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

		function checkPermission(){
                                    Todos.findByEmail(username).success(function(response){

                                                        if(response.role != KHO_CRM_CONFIG.petent){
                                                            vm.role = true;
                                                        }else{
                                                        	vm.role = false;
                                                        }

                                      });
                        }

vm.submit = function(){
            if (vm.upload_form.file.$valid && vm.file) {
                vm.upload(vm.file);
            }
        }

        vm.upload = function (file) {
        	var username = $rootScope.globals.currentUser['username'];
            Upload.upload({
                url: '/api/sendFiles/'+username, //webAPI exposed to upload the file
                data:{
                	file:file,
                } ,
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                	read();
                } else {
                    alert('Błąd dodawania pliku');
                }
            }, function (resp) { //catch error
                alert('Błąd dodawanie pliku:  ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                vm.progress = 'Plik został dołączony poprawnie! Progres: ' + progressPercentage + '% ';
                vm.file = null;
                	$timeout(function () {
                       		vm.progress = false;
                   	}, 2000);
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

