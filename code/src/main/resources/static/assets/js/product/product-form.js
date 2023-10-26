var app = angular.module("product-form-app", []);
app.controller('ctrl1', ['$scope','$rootScope',
    function($scope, $rootScope) {
        $rootScope.showBanner = true;
    }]);

app.controller('ctrl2', ['$scope','$rootScope',
    function($scope, $rootScope) {
        $rootScope.showBanner = false;
    }]);