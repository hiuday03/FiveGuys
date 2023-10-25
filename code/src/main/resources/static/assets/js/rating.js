let app_rating = angular.module("rating", []);

app_rating.controller("rating-ctrl", function ($scope, $http, $timeout) {
    $scope.rating = [];
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
        $http.get("/rating").then(function (resp) {
            $scope.rating = resp.data;
        });
    }

    $scope.initialize();

    $scope.edit = function (rating) {
        $scope.formUpdate = angular.copy(rating);
    }

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post("/rating", item).then(function (resp) {
            $scope.showSuccessMessage("Create rating successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`/rating/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update rating successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/rating/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete rating successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdaterating.$setPristine();
        $scope.formUpdaterating.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreaterating.$setPristine();
        $scope.formCreaterating.$setUntouched();
    }

    $scope.pager = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.rating.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.rating.length / this.size);
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