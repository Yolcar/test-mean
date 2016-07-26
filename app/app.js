(function(){
  angular.module('mean', ['ui.router'])
  .config(function($stateProvider){
    $stateProvider
      .state('signUp', {
        url: "/signup",
        templateUrl: "app/signup/signup.html",
        controller: "SignUpController"
      });
  });
}());
