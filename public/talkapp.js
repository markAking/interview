'use strict';

angular.module('talkApp', [
  'ngRoute',
  'talkApp.view1',
  'talkApp.services'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
