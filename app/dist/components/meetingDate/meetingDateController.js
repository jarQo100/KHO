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

    $scope.formData = {};
    getMeetingsDate();
    getMeetingDateToReportForm();
    findUserIDByEmail();

    var username = $rootScope.globals.currentUser['username'];
    Todos.checkRole(username).success(function(response){
        $scope.role = response.role;
    });

    //console.log(result.value.data.role);
    console.log($scope.role);



        $scope.report = function(formDataReport){
            formDataReport.user_id = $rootScope.globals.currentUser['username'];

             Todos.addPersonToMeeting(formDataReport);
                    $scope.formDataReport.$setUntouched();
                    $scope.formDataReport = {};
                    getMeetingsDate();
                    $scope.reportToogle = false;
        }

        $scope.createMeeting = function(formData){
             Todos.addMeeting(formData);
                $scope.formData.$setUntouched();
                $scope.formData = {};
                 getMeetingsDate();
                $scope.addMeetingToogle = false;
        }

    function getMeetingsDate(){
        Todos.getMeeting().success(function(data){
            $scope.meetingData = data;
        });
    }

    function getMeetingDateToReportForm(){
        Todos.getMeeting().success(function(data){
            $scope.formData.meetingDate = data.date;
        });
    }

     function findUserIDByEmail(){
        formDataReport.user_id = $rootScope.globals.currentUser['username'];

        Todos.findByEmail(formDataReport.user_id).success(function(data){
            $scope.formDataReport.nameAndSurname = data.name + " " + data.surname;
            $scope.formDataReport.userId = data._id;
            $scope.formDataConfirmPresent.nameAndSurname = data.name + " " + data.surname;
            $scope.formDataConfirmPresent.userId = data._id;
        });



        $scope.deleteMeeting = function (meetingId){

                var  confirmResult = confirm("Czy na pewno chcesz usunąć spotkanie?");

                    if(confirmResult == true){
                            Todos.deleteMeeting(meetingId);
                            getMeetingsDate();

                            $scope.alertDeleteUser = true;
                                $timeout(function () {
                                     $scope.alertDeleteUser = false;
                                }, 5000);


             }
        }

        $scope.showDetails = function(meetingId){
            $scope.meetingDataDetailsId = meetingId;
        }

        $scope.confirmPresent = function(formData){
            console.log(formData);
            Todos.confirmPresent(formData);
                 getMeetingsDate();
                $scope.confirmTooge = false;
        }



    }

}

})();
