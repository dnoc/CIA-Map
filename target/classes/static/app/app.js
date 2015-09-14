(function(angular) {
  angular.module("myApp.controllers", []);
  angular.module("myApp.services", []);
  angular.module("myApp.directives", ['leaflet-directive']);
  angular.module("myApp", ["ngResource", "myApp.controllers", "myApp.services", "myApp.directives"]);
}(angular));