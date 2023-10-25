let app_favorite = angular.module("favorite", []);

app_favorite.controller("favorite-ctrl", function ($scope, $http, $timeout) {
    $scope.favorite = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;

    $scope.showSuccessMessage = function (message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function () {
            $scope.closeAlert();
        }, 5000);
    }

    $scope.closeAlert = function () {
        $scope.showAlert = false;
    }

    $scope.initialize = function () {
        $http.get("/favorite").then(function (resp) {
            $scope.favorite = resp.data;
        });
    }

    $scope.initialize();

    $scope.edit = function (favorite) {
        $scope.formUpdate = angular.copy(favorite);
    }

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post("/favorite", item).then(function (resp) {
            $scope.showSuccessMessage("Create favorite successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`/favorite/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update favorite successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/favorite/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete favorite successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdatefavorite.$setPristine();
        $scope.formUpdatefavorite.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreatefavorite.$setPristine();
        $scope.formCreatefavorite.$setUntouched();
    }

    $scope.pager = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.favorite.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.favorite.length / this.size);
        },
        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        }
    }
});