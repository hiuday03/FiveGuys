let app_role = angular.module("role", []);

app_role.controller("role-ctrl", function ($scope, $http, $timeout) {
    $scope.role = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

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
        $http.get("/role").then(function (resp) {
            $scope.role = resp.data;
        });
    }

    $scope.initialize();

    $scope.edit = function (role) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(role);
        } else {
            $scope.formUpdate = angular.copy(role);
            $scope.formUpdate.updatedAt = new Date();
        }
    }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/role", item).then(function (resp) {
            $scope.showSuccessMessage("Create role successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item)
        $http.put(`/role/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update Role successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/role/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Role successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateRole.$setPristine();
        $scope.formUpdateRole.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateRole.$setPristine();
        $scope.formCreateRole.$setUntouched();
    }

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.role.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.role.length / this.size);
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