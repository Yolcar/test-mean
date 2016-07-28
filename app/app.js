(function(){
  angular.module('mean', ['ui.router', 'ngFileUpload', 'ngRoute'])
  .config(function($stateProvider, $urlRouterProvider /*$locationProvider*/){

    $urlRouterProvider.otherwise("/");
    //$locationProvider.html5Mode(true);

    $stateProvider
      .state('signUp', {
        url: "/signup",
        templateUrl: "app/signup/signup.html",
        controller: "SignUpController"
      })
      .state('editProfile', {
        url: "/edit-profile",
        templateUrl: "app/profile/edit-profile-view.html",
        controller: "EditProfileController"
      })
      .state('main', {
        url: "/",
        templateUrl: "app/main/main.html",
        controller: "MainController"
      });
  });
}());
