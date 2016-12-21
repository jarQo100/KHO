(function () {
    'use strict';

    angular
        .module('KHO_CRM', ['pascalprecht.translate', 'ngSanitize', 'ui.router', 'ngResource', 'ngCookies', 'angular-md5'])
        .constant('KHO_CRM_CONFIG', {
            defaultLang: 'pl_pl'
        })
        .config(configureFluoModule)
        .run(runApp);

    configureFluoModule.$inject = [
         'KHO_CRM_CONFIG',
         '$translateProvider',
         '$locationProvider',
         '$stateProvider',
          '$urlRouterProvider',


    ];

    function configureFluoModule(KHO_CRM_CONFIG, $translateProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

      var loginState = {
        name: 'loginPage',
        url: '/login',
        templateUrl: 'pages/login/index.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      }

      var mainView = {
          name: 'mainView',
          url: '/content',
          templateUrl: 'pages/content/index.html',
        }

        var dashboardView = {
          name: 'mainView.dashboard',
          url: '/dashboard',
          templateUrl: 'src/components/dashboardView/dashboardViewComponent.html',
          controller: 'DashboardViewController'
        }

        var mainViewList = {
          name: 'mainView.List',
          url: '/list',
          templateUrl: 'src/components/mainPage/mainPageComponent.html',
          controller: 'MainPageController',
        }

        var createScout = {
          name: 'mainView.Create',
          url: '/create',
          templateUrl: 'src/components/createScout/createScoutComponent.html',
          controller: 'CreateScoutController',
        }

        var scoutsDetailsList = {
          name: 'mainView.Details',
          url: '/details/:scoutsId',
          templateUrl: 'src/components/scoutsDetails/scoutsDetailsComponent.html',
          controller: 'ScoutsDetailsController',
        }

        var attemptList = {
          name: 'mainView.attemptList',
          url: '/attemptList',
          templateUrl: 'src/components/attemptList/attemptListComponent.html',
          controller: 'AttemptListController',
        }

        var attemptCrete = {
          name: 'mainView.attemptCreate',
          url: '/attemptCreate',
          templateUrl: 'src/components/attemptCreate/attemptCreateComponent.html',
          controller: 'AttemptCreateController',
        }

        var detailsAttempt = {
          name: 'mainView.detailsAttempt',
          url: '/detailsAttempt/:userId/:attemptId',
          templateUrl: 'src/components/detailsAttempt/detailsAttemptComponent.html',
          controller: 'DetailsAttemptController',
        }

        var addComment = {
          name: 'mainView.addComment',
          url: '/addComment/:attemptId',
          templateUrl: 'src/components/addComment/addCommentComponent.html',
          controller: 'AddCommentController',
        }

        var updateAttempt = {
          name: 'mainView.updateAttempt',
          url: '/updateAttempt/:attemptId',
          templateUrl: 'src/components/updateAttempt/updateAttemptComponent.html',
          controller: 'UpdateAttemptController',
        }

        var updateAttempt = {
          name: 'mainView.updateAttempt',
          url: '/updateAttempt/:attemptId',
          templateUrl: 'src/components/updateAttempt/updateAttemptComponent.html',
          controller: 'UpdateAttemptController',
        }

        var meetingDate = {
          name: 'mainView.meetingDate',
          url: '/meetingDate',
          templateUrl: 'src/components/meetingDate/meetingDateComponent.html',
          controller: 'MeetingDateController',
        }


      $stateProvider.state(loginState);
      $stateProvider.state(mainView);
      $stateProvider.state(mainViewList);
      $stateProvider.state(scoutsDetailsList);
      $stateProvider.state(createScout);
      $stateProvider.state(attemptList);
      $stateProvider.state(attemptCrete);
      $stateProvider.state(detailsAttempt);
      $stateProvider.state(addComment);
      $stateProvider.state(updateAttempt);
      $stateProvider.state(dashboardView);
      $stateProvider.state(meetingDate);
      $urlRouterProvider.otherwise("/content/list");

//$resourceProvider.defaults.stripTrailingSlashes = false;
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: true,
        //     rewriteLinks: true
        // });


    //$locationProvider.html5Mode(true);

        $translateProvider
            .useStaticFilesLoader({
                prefix: 'resources/locales/',
                suffix: '.json'
            })
           .preferredLanguage(KHO_CRM_CONFIG.defaultLang)
           .fallbackLanguage(KHO_CRM_CONFIG.defaultLang);

    }

    runApp.$inject = ['$translate', '$location', '$rootScope', '$cookies', '$http'];

    function runApp($translate, $location, $rootScope, $cookies, $http) {
        var locationSearch = $location.search();
        if (locationSearch.hasOwnProperty('lang')) {
            $translate.use(locationSearch['lang'].toLowerCase());
        }


// keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });



    }


})();