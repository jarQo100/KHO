(function () {
    'use strict';

    angular
        .module('KHO_CRM', ['pascalprecht.translate', 'ngSanitize', 'ui.router', 'ngResource'])
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
        url: '/',
        templateUrl: 'pages/login/index.html'
      }

      var mainView = {
          name: 'mainView',
          url: '/content',
          templateUrl: 'pages/content/index.html',
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


      $stateProvider.state(loginState);
      $stateProvider.state(mainView);
      $stateProvider.state(mainViewList);
      $stateProvider.state(scoutsDetailsList);
      $stateProvider.state(createScout);
      $stateProvider.state(attemptList);
      $stateProvider.state(attemptCrete);
      $stateProvider.state(detailsAttempt);
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

    runApp.$inject = ['$translate', '$location'];

    function runApp($translate, $location) {
        var locationSearch = $location.search();
        if (locationSearch.hasOwnProperty('lang')) {
            $translate.use(locationSearch['lang'].toLowerCase());
        }
    }


})();