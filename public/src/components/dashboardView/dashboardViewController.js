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

    var vm = this;
    vm.attempt = [];
    vm.comm = [];
    vm.openAttempt = 0;
    vm.closeAttempt = 0;
    getMeetingsDate();

    vm.username = $rootScope.globals.currentUser['username'];

    Todos.checkRole(vm.username).success(function(response){
        if(response.role != KHO_CRM_CONFIG.petent){
            vm.lastCommentsToogle = true;
            vm.yourAttemptToogle = false;
        }else{
            vm.yourAttemptToogle = true;
        }

    });


        Todos.get().success(function(data) {

                vm.usersCount = data.length;
                 vm.users = data;

                angular.forEach(data, function(user) {

                        angular.forEach(user.attempt, function(attempt) {
                                if(attempt.results == 'W trakcie realizacji'){
                                    vm.openAttempt += 1;
                                }else{
                                    vm.closeAttempt += 1;
                                }
                                attempt.email = user.email;
                                attempt.userID = user._id;
                                vm.attempt.push(attempt);


                                      angular.forEach(attempt.comments, function(comments) {
                                            comments.nameAndSurname = user.name + " " + user.surname;
                                            vm.comm.push(comments);
                                      });

                        });

                });

            });

        function getMeetingsDate(){
            Todos.getMeeting().success(function(data){
                vm.meetingData = data;
            });
        }


        vm.getClass = function(status) {
            return "label-" + SetAlertClass.setClassStatus(status);
          };

          vm.getClassCategoryComments = function(status) {
            return "label-" + SetAlertClass.set(status);
          };




    }

})();
