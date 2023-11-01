var app = angular.module("material-app", []);

app.controller("material-ctrl", function ($scope, $http, $timeout) {

    const apiUrlMaterial = "http://localhost:8080/api/material"

    $scope.materials = [];
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
        $http.get(apiUrlMaterial + "/page").then(resp => {
            $scope.materials = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

    $scope.edit = function(cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function() {
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlMaterial, item).then(resp => {
            $scope.showSuccessMessage("Create material successfully!")
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function() {
        let item = angular.copy($scope.formUpdate);
        $http.put(`${apiUrlMaterial}/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update material successfully!")
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function(item) {
        $http.delete(`${apiUrlMaterial}/${item.id}`).then(resp => {
            $scope.showSuccessMessage("Delete color successfully!")
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

    // //ham lay tat ca san pham co phan trang
    // $scope.getProduct = function () {
    //     $http.get(apiUrlProduct + "/page")
    //         .then(function (response) {
    //             $scope.products = response.data.content;
    //             $scope.totalPages = response.data.totalPages;
    //         });
    // }
    // $scope.getProduct();

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
        $http.get(apiUrlMaterial + "/page?page=" + page)
            .then(function (response) {
                console.log(response)
                $scope.materials = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }

    //tao doi tuong
    // const getProduct = function () {
    //     return {
    //         "name": $scope.name,
    //         "collar": $scope.collar,
    //         "wrist": $scope.wrist,
    //         "describe": $scope.describe,
    //         "brand": $scope.brand,
    //         "material": {
    //             id: $scope.idMaterial,
    //         },
    //         "material": {
    //             id: $scope.idMaterial,
    //         },
    //     }
    // }


});
