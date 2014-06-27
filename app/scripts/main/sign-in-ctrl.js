'use strict';

Affordably.controller('SignInCtrl', function ($scope, $famous, $state, $http, $window) {
  var Transitionable = $famous['famous/transitions/Transitionable'];

  var translateTrans = new Transitionable([0,0,0]);
  $scope.success = translateTrans.get.bind(translateTrans);

  // var password = $scope.password;
  // var email = $scope.email;

  $scope.submit = function(email, password) {
    var credentials = {
      password: password,
      user_email: email
    };

    $http({
      method: 'POST',
      url:"http://localhost:3000/api/v1/tokens/new",
      data: credentials
    }).success(function(data, status, headers, config) {
      $window.sessionStorage.token = data.token;
      translateTrans.set([-287,0,0  ], {duration: 500, curve: 'easeOut'}, function() {
      $state.go('institutionSelect')
      });
      $scope.message = 'Welcome';
    }).error(function(data, status, headers, config) {
      delete $window.sessionStorage.token;
      $scope.message = 'Error: Invalid user or password';
    });
  };
});