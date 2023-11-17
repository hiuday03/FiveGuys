var app = angular.module("product-list-app", []);

app.controller("product-list-ctrl", function ($scope, $http, $window, $rootScope) {

    const apiUrlProduct = "http://localhost:8080/api/product"

    $scope.products = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.showSuccessMessage = function(message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function() {
            $scope.closeAlert();
        }, 5000);
    }
    $scope.closeAlert = function() {
        $scope.showAlert = false;
    }
    $scope.initialize = function() {
        $http.get(apiUrlProduct + "/page").then(resp => {
            $scope.products = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

    $scope.edit = function(cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function() {
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlProduct, item).then(resp => {
            $scope.showSuccessMessage("Create product successfully!")
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function() {
        let item = angular.copy($scope.formUpdate);
        $http.put(`${apiUrlProduct}/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update product successfully!")
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.updateStatus = function() {
        let status = 3;
        $http.put(`${apiUrlProduct}/status/${item.id}`, 3).then(resp => {
            $scope.showSuccessMessage("Update status product successfully!")
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function(item) {
        $http.delete(`${apiUrlProduct}/${item.id}`).then(resp => {
            $scope.showSuccessMessage("Delete product successfully!")
            $scope.initialize();
        }).catch(error => {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateColor.$setPristine();
        $scope.formUpdateColor.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formAddColor.$setPristine();
        $scope.formAddColor.$setUntouched();
    }

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

});

