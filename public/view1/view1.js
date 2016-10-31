'use strict';

function editProfileLinkController($scope, $element, $attrs) {
  var ctrl = this;
  ctrl.editMode = false;

  ctrl.edit = function(){
    ctrl.editMode = true;
    ctrl.onEdit()
  }
  ctrl.cancel = function() {
    ctrl.editMode = false;
    ctrl.onCancel()
  }
  ctrl.save = function() {
    ctrl.editMode = false;
    ctrl.onCancel()
  }
}

angular.module('talkApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'MainCtrl',
    controllerAS: 'ctrl'
  });
}])

.controller('MainCtrl', ['$scope', 'User', function ($scope, User) {
  $scope.edit_mode = false;
  $scope.user = User.query({},{'Id':1});
  $scope.editmode = function(i){
    $scope.edit_mode = i;
  }
  $scope.save = function(){
  }
}])

.component('editProfileLink', {
  transclude: true,
  template: '<div class="right" ng-switch="$ctrl.editMode">'+
  '<h2 ng-switch-when="false" ng-click="$ctrl.edit()" class="blue edit">Edit</h2>'+
  '<button class="cancel btn btn-secondary" ng-switch-when="true" ng-click="$ctrl.cancel()">Cancel</button>'+
  '<button class="save btn btn-primary" ng-switch-when="true" ng-click="$ctrl.save()">Save Changes</button>'+
  '</div>',
  controller: editProfileLinkController,
  bindings: {
    onCancel: '&',
    onEdit: '&',
    onSave: '&'
  }
})


angular.module('talkApp.services', ['ngResource']).factory('User', ['$resource',
  function($resource){
    return $resource('data/:userId.json', {}, {
      query: {method:'GET', params:{userId:'user'}, isArray:true}
    });
}]);
