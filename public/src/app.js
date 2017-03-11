(function () {
    'use strict';

    angular
        .module('KHO_CRM', ['pascalprecht.translate', 'ngSanitize', 'ui.router', 'ngResource', 'ngCookies', 'angular-md5', 'chart.js', 'angular.filter', 'ngFileUpload'])
        .constant('KHO_CRM_CONFIG', {
            defaultLang: 'pl_pl',
            admin: 'Administrator',
            petent: 'Petent',
            _dir: '../../uploads',
            teams :  [
              { name: "4 Rozborska Drużyna Harcerzy „Karacena” im. 10 Pułku Strzelców Konnych"},
              { name: "1 Przeworska Drużyna Harcerzy „Borek” im. św. Franciszka z Asyżu"},
              { name: "1 Jarosławska Drużyna Harcerzy „Pościg” im. Jana III Sobieskiego"}
            ],
        })
        .config(configureFluoModule)
        .run(runApp);

    configureFluoModule.$inject = [
         'KHO_CRM_CONFIG',
         '$translateProvider',
         '$locationProvider',
         '$stateProvider',
         '$urlRouterProvider',
         'ChartJsProvider',
    ];

    function configureFluoModule(KHO_CRM_CONFIG, $translateProvider, $locationProvider, $stateProvider, $urlRouterProvider, ChartJsProvider) {

ChartJsProvider.setOptions({
      //chartColors: ['#FF5252', '#FF8A80'],
      responsive: false,
      showLines: true,
      colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      fullWidth : true,
    });


      var loginState = {
        name: 'loginPage',
        url: '/login',
        templateUrl: 'pages/login/index.html',
        controller: 'LoginController as vm',
      }

      var registerState = {
        name: 'registerPage',
        url: '/utworz-konto',
        templateUrl: 'pages/register/index.html',
        controller: 'RegisterController as RegisterControllerVM'
      }

      var mainView = {
          name: 'mainView',
          url: '/content',
          templateUrl: 'pages/content/index.html',
          //controller: 'MainViewController as mainViewVm'
        }

        var notAuthorize = {
          name: 'notAuthorize',
          url: '/notAuthorize',
          templateUrl: 'pages/notAuthorize.html',
        }

        var dashboardView = {
          name: 'mainView.dashboard',
          url: '/dashboard',
          templateUrl: 'src/components/dashboardView/dashboardViewComponent.html',
          controller: 'DashboardViewController as dashboardViewVM'
        }

        var mainViewList = {
          name: 'mainView.List',
          url: '/list',
          templateUrl: 'src/components/mainPage/mainPageComponent.html',
          controller: 'MainPageController as mainPageVM',
        }

        var createScout = {
          name: 'mainView.Create',
          url: '/create',
          templateUrl: 'src/components/createScout/createScoutComponent.html',
          controller: 'CreateScoutController as createScoutVM',
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
          controller: 'AttemptListController as attemptListVM',
        }

        var attemptCrete = {
          name: 'mainView.attemptCreate',
          url: '/attemptCreate',
          templateUrl: 'src/components/attemptCreate/attemptCreateComponent.html',
          controller: 'AttemptCreateController as attemptCreateVM',
        }

        var detailsAttempt = {
          name: 'mainView.detailsAttempt',
          url: '/detailsAttempt/:userId/:attemptId',
          templateUrl: 'src/components/detailsAttempt/detailsAttemptComponent.html',
          controller: 'DetailsAttemptController as detailsAttemptVM',
        }

        var addComment = {
          name: 'mainView.addComment',
          url: '/addComment/:attemptId',
          templateUrl: 'src/components/addComment/addCommentComponent.html',
          controller: 'AddCommentController as addCommentVM',
        }

        var updateAttempt = {
          name: 'mainView.updateAttempt',
          url: '/updateAttempt/:attemptId',
          templateUrl: 'src/components/updateAttempt/updateAttemptComponent.html',
          controller: 'UpdateAttemptController as updateAttemptVM',
        }

        // var updateAttempt = {
        //   name: 'mainView.updateAttempt',
        //   url: '/updateAttempt/:attemptId',
        //   templateUrl: 'src/components/updateAttempt/updateAttemptComponent.html',
        //   controller: 'UpdateAttemptController as attemptCreateVM',
        // }

        var meetingDate = {
          name: 'mainView.meetingDate',
          url: '/meetingDate',
          templateUrl: 'src/components/meetingDate/meetingDateComponent.html',
          controller: 'MeetingDateController as meetingViewVM',
        }

        var genereteTextToWebsite = {
          name: 'mainView.genereteTextToWebsite',
          url: '/genereteTextToWebsite',
          templateUrl: 'src/components/genereteTextToWebsite/genereteTextToWebsiteComponent.html',
          controller: 'GenereteTextToWebsiteController',
        }


      $stateProvider.state(loginState);
      $stateProvider.state(registerState);
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
      $stateProvider.state(notAuthorize);
      $stateProvider.state(genereteTextToWebsite);
      $urlRouterProvider.otherwise("/content/dashboard");

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

    runApp.$inject = ['$translate', '$location', '$rootScope', '$cookies', '$http', 'Todos'];

    function runApp($translate, $location, $rootScope, $cookies, $http, Todos) {
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