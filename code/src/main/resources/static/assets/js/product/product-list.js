var app = angular.module("product-list-app", []);

app.controller("product-list-ctrl", function ($scope, $http, $window, $rootScope) {

    const apiUrlProduct = "http://localhost:8080/api/product"

    $scope.formProduct = {

    }

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

    const apiUrlCategory = "http://localhost:8080/api/category"
    const apiUrlMaterial = "http://localhost:8080/api/material"

    $scope.getSelectOption = function () {
        $http.get(apiUrlCategory)
            .then(function (response) {
                console.log(response)
                $scope.categories = response.data;
            });
        $http.get(apiUrlMaterial)
            .then(function (response) {
                console.log(response)
                $scope.materials = response.data;
            });
    }
    $scope.getSelectOption();

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
                id: $scope.idMaterial,
            },
        }
    }

    $scope.createProduct = function () {
        console.log(getProduct())
    }

    //lay doi tuong theo id
    $scope.getProductById = function (id) {
        $scope.id = id;
        $scope.productByID = "ccresponse.data"
        $http.get(apiUrlProduct + "/" + id)
            .then(function (response) {
                console.log(response.data.category.id)
                $scope.productByID = response.data
                setProductToForm(response.data)
            });
    }

    let setProductToForm = function (product) {
        $scope.name = product.name
        $scope.collar = product.collar
        $scope.wrist = product.wrist
        $scope.describe = product.describe
        $scope.brand = product.brand
        $scope.idCategory1 = product.category.id
    }

});
