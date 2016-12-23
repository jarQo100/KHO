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


        $scope.report = function(formDataReport){
             
          
             formDataReport.user_id = $rootScope.globals.currentUser['username']
             console.log(formDataReport);

             Todos.addPersonToMeeting(formDataReport).success(function(){

             });
   
        }

        $scope.createMeeting = function(formData){
             Todos.addMeeting(formData).success(function(){

             });
              console.log("true");
                $scope.formData = {};
                getMeetingsDate();
        }

    function getMeetingsDate(){
        Todos.getMeeting().success(function(data){
            console.log(data);
            $scope.meetingData = data;
        });
    }

    function getMeetingDateToReportForm(){
        Todos.getMeeting().success(function(data){
            
            $scope.formData.meetingDate = data.date;
            console.log($scope.formData.meetingDate);
        });
        
    }





//         Todos.get().success(function(data) {
// console.log(data);
//                 $scope.users = data.length;
//                 $scope.attempt = data[0].attempt.length;
//                 $scope.alertDeleteUser = false;

//             }).error(function(err){

//                 console.log("GET ERROR: " + err);

//             });






    }

})();
