(function () {

    "use strict";

    angular
    	.module('KHO_CRM')
    	.controller('DashboardViewController', DashboardViewController);

    DashboardViewController.$inject = [
        '$scope',
        '$http',
        'Todos',
        '$timeout',
        'SetAlertClass',
        '$rootScope',
        'KHO_CRM_CONFIG'
    ];

    function DashboardViewController($scope, $http, Todos, $timeout, SetAlertClass, $rootScope, KHO_CRM_CONFIG) {

    $scope.attempt = [];
    $scope.comm = [];
    $scope.openAttempt = 0;
    $scope.closeAttempt = 0;
    getMeetingsDate();

    $scope.username = $rootScope.globals.currentUser['username'];

    Todos.checkRole($scope.username).success(function(response){
        if(response.role != KHO_CRM_CONFIG.petent){
            $scope.lastCommentsToogle = true;
            $scope.yourAttemptToogle = false;
        }else{
            $scope.yourAttemptToogle = true;
        }

    });


        Todos.get().success(function(data) {

                $scope.usersCount = data.length;
                 $scope.users = data;

                angular.forEach(data, function(user) {

                        angular.forEach(user.attempt, function(attempt) {
                                if(attempt.results == 'W trakcie realizacji'){
                                    $scope.openAttempt += 1;
                                }else{
                                    $scope.closeAttempt += 1;
                                }
                                attempt.email = user.email;
                                attempt.userID = user._id;
                                $scope.attempt.push(attempt);


                                      angular.forEach(attempt.comments, function(comments) {
                                            comments.nameAndSurname = user.name + " " + user.surname;
                                            $scope.comm.push(comments);
                                      });

                        });

                });

            });

        function getMeetingsDate(){
            Todos.getMeeting().success(function(data){
                $scope.meetingData = data;
            });
        }


        $scope.getClass = function(status) {
            return "label-" + SetAlertClass.setClassStatus(status);
          };

          $scope.getClassCategoryComments = function(status) {
            return "label-" + SetAlertClass.set(status);
          };




    }

})();
