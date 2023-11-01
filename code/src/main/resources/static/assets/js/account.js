let app_account = angular.module("account", []);

app_account.controller("account-ctrl", function ($scope, $http, $timeout) {
    $scope.account = [];
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
        $http.get("/account").then(function (resp) {
            $scope.account = resp.data;
        });
    }

    $scope.initialize();

    $scope.loadRoles = function () {
        $http.get("/role") 
            .then(function (resp) {
                $scope.roles = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadRoles(); 

    $scope.edit = function (account) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(account);
        } else {
            $scope.formUpdate = angular.copy(account);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }
    // $scope.edit = function (account) {
    //     $scope.formUpdate = angular.copy(account);
    // }
    

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/account", item).then(function (resp) {
            $scope.showSuccessMessage("Create account successfully");
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
        $http.put(`/account/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Update account successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/account/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete account successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateAccount.$setPristine();
        $scope.formUpdateAccount.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateAccount.$setPristine();
        $scope.formCreateAccount.$setUntouched();
    }

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.account.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.account.length / this.size);
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