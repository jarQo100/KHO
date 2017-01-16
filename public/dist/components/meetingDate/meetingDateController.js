(function () {

    "use strict";

    angular
    	.module('KHO_CRM')
    	.controller('MeetingDateController', MeetingDateController);

    MeetingDateController.$inject = [
        '$scope',
        '$http',
        'Todos',
        '$timeout',
        '$location',
        '$rootScope'
    ];

    function MeetingDateController($scope, $http, Todos, $timeout, $location, $rootScope) {

        var vm = this;
    vm.formData = {};
    vm.formDataReport = {};
    getMeetingsDate();
    getMeetingDateToReportForm();
    findUserIDByEmail();

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        vm.role = response.role;
    });

    //console.log(result.value.data.role);
    console.log(vm.role);



        vm.report = function(formDataReport){

            vm.formDataReport.user_id = $rootScope.globals.currentUser['username'];
            formDataReport.nameAndSurname = vm.formDataReport.nameAndSurname;
            formDataReport.username = vm.formDataReport.user_id
console.log(formDataReport);
             Todos.addPersonToMeeting(formDataReport);
                    //vm.formDataReport.$setUntouched();
                    vm.formDataReport = {};
                    getMeetingsDate();
                    vm.reportToogle = false;
        }

        vm.createMeeting = function(formData){
             Todos.addMeeting(formData);
                //vm.formData.$setUntouched();
                vm.formData = {};
                 getMeetingsDate();
                vm.addMeetingToogle = false;
        }

    function getMeetingsDate(){
        Todos.getMeeting().success(function(data){
            vm.meetingData = data;
        });
    }

    function getMeetingDateToReportForm(){
        Todos.getMeeting().success(function(data){
            vm.formData.meetingDate = data.date;
        });
    }

     function findUserIDByEmail(){

        formDataReport.user_id = $rootScope.globals.currentUser['username'];

        Todos.findByEmail(formDataReport.user_id).success(function(data){
            vm.formDataReport.nameAndSurname = data.name + " " + data.surname;
            vm.formDataReport.userId = data._id;
            vm.formDataConfirmPresent.nameAndSurname = data.name + " " + data.surname;
            vm.formDataConfirmPresent.userId = data._id;
        });



        vm.deleteMeeting = function (meetingId){

                var  confirmResult = confirm("Czy na pewno chcesz usunąć spotkanie?");

                    if(confirmResult == true){
                            Todos.deleteMeeting(meetingId);
                            getMeetingsDate();

                            vm.alertDeleteUser = true;
                                $timeout(function () {
                                     vm.alertDeleteUser = false;
                                }, 5000);


             }
        }

        vm.showDetails = function(meetingId){
            vm.meetingDataDetailsId = meetingId;
        }

        vm.confirmPresent = function(formData){
            console.log(formData);
            Todos.confirmPresent(formData);
                 getMeetingsDate();
                 vm.confirmTooge = false;
        }



    }

}

})();
