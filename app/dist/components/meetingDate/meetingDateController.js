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
        '$location'
    ];

    function MeetingDateController($scope, $http, Todos, $timeout, $location) {

    $scope.formData = {};
getMeetingsDate();
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
