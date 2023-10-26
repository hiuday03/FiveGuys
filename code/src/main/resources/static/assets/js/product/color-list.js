var app = angular.module("product-list-app", []);

app.controller("product-list-ctrl", function ($scope, $http, $window, $rootScope) {

    const apiUrlColor = "http://localhost:8080/api/color"

    //ham lay tat ca san pham co phan trang
    $scope.getProduct = function () {
        $http.get(apiUrlProduct + "/page")
            .then(function (response) {
                $scope.products = response.data.content;
                $scope.totalPages = response.data.totalPages;
            });
    }
    $scope.getProduct();

    //ham hien thi nut phan trang
    $scope.displayPageRange = function () {
        var range = [];
        for (var i = 1; i <= $scope.totalPages; i++) {
            range.push(i);
        }
        return range;
    };

    //ham hien thi trang
    $scope.setPage = function (page) {
        page = page - 1;
        $http.get(apiUrlProduct + "/page?page=" + page)
            .then(function (response) {
                console.log(response)
                $scope.products = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }

    //tao doi tuong
    const getProduct = function () {
        return {
            "name": $scope.name,
            "collar": $scope.collar,
            "wrist": $scope.wrist,
            "describe": $scope.describe,
            "brand": $scope.brand,
            "category": {
                id: $scope.idCategory,
            },
            "material": {
                id: $scope.idMaterial
            },
        }
    }

    $scope.createProduct = function () {
        console.log(getProduct())
    }

});
