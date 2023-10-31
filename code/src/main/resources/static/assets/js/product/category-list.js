var app = angular.module("category-app", []);

app.controller("category-ctrl", function ($scope, $http, $timeout) {

    const apiUrlCategory = "http://localhost:8080/api/category"

    $scope.categories = [];
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
        $http.get(apiUrlCategory + "/page").then(resp => {
            $scope.categories = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

    $scope.edit = function(cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function() {
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlCategory, item).then(resp => {
            $scope.showSuccessMessage("Create category successfully!")
            $scope.initialize();
            $('#modalAdd').modal('hide');
            $scope.resetFormInput();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function() {
        let item = angular.copy($scope.formUpdate);
        $http.put(`${apiUrlCategory}/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update category successfully!")
            $scope.initialize();
            $('#modalUpdate').modal('hide');
            $scope.resetFormUpdate();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function(item) {
        $http.delete(`${apiUrlCategory}/${item.id}`).then(resp => {
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
        $currentPage = page
        page = page - 1;
        $http.get(apiUrlCategory + "/page?page=" + page)
            .then(function (response) {
                $scope.categories = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }

});
