// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core','user.services',
                          'user.controllers','starter.services','starter.controllers'])

.run(function($ionicPlatform,ParseConfiguration) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);

  });
})
.value('ParseConfiguration', {
  applicationId: "Z7FfuulZZGBo4h08XsoObVFbRAsPMWQx3ckr0dFJ",
  javascriptKey: "LHVigiOfG7pDMr2jBgh1QB1bxDw72DYLJP1Af9v1",
  clientKey: "aLNFSSkuykeWcllYV5NszS8aHIsOX338KnrzKcSf",
  USING_PARSE: true,
  initialized: false
})
.config(function($stateProvider,$urlRouterProvider,$ionicAppProvider){
  $ionicAppProvider.identify({
    app_id: '0947e323',
    api_key: '17096f1bb151b7e33e95dfa88d322099d9ed5a73d9fb74ae'
  });
  $stateProvider
  .state('app-signup', {
      url: "/signup",
      templateUrl: "templates/user/signup.html",
      controller: "SignUpController"
  })
  // login state that is needed to log the user in after logout
  // or if there is no user object available
  .state('app-login', {
      url: "/login",
      templateUrl: "templates/user/login.html",
      controller: "LoginController"
  })
  .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
  })
  .state('tab.list', {
      url: '/list',
      cache: true,
      views: {
          'tab-list': {
              templateUrl: 'templates/tab-list.html',
              controller: 'ListCtrl'
          }
      }
  })
  .state('tab.journal', {
      url: '/journal/:jid',
      cache: true,
      views: {
          'tab-list': {
              templateUrl: 'templates/journalDetail.html',
              controller: 'JournalCtrl'
          }
      },
      resolve: {
        journal: function($stateParams,journalServices){
          return journalServices.get($stateParams.jid);
        }
      }
  });
  $urlRouterProvider.otherwise('/login');
})
