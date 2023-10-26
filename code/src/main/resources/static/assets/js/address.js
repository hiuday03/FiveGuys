let app_address = angular.module("address", []);

app_address.controller("address-ctrl", function ($scope, $http, $timeout) {
    $scope.address = [];
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
        $http.get("/address").then(function (resp) {
            $scope.address = resp.data;
        });
    }
    $scope.getDateOnly = function(dateTime) {
        // Chuyển đổi datetime thành date (chỉ lấy ngày)
        var date = new Date(dateTime);
        return date;
    };
    

    $scope.initialize();

    // $scope.edit = function (address) {
    //     if ($scope.formUpdate.createdAt) {
    //         $scope.formUpdate = angular.copy(address);
    //     } else {
    //         $scope.formUpdate = angular.copy(address);
    //         $scope.formUpdate.createdAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
    //     }
    // }
    $scope.edit = function (address) {
        $scope.formUpdate = angular.copy(address);
    }
    

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post("/address", item).then(function (resp) {
            $scope.showSuccessMessage("Create address successfully");
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
        $http.put(`/address/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Update address successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/address/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete address successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateAddress.$setPristine();
        $scope.formUpdateAddress.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateAddress.$setPristine();
        $scope.formCreateAddress.$setUntouched();
    }

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.address.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.address.length / this.size);
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