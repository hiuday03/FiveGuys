let app_customer = angular.module("customer", []);

app_customer.controller("customer-ctrl", function ($scope, $http, $timeout) {
    $scope.customer = [];
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
        $http.get("/customer").then(function (resp) {
            $scope.customer = resp.data;
        });
    }
    $scope.getAddressDateOnly = function(dateTime) {
        // Chuyển đổi datetime thành date (chỉ lấy ngày)
        var date = new Date(dateTime);
        return date;
    };

    $scope.initialize();

    $scope.edit = function (customer) {
        if ($scope.formUpdate.createdAt) {
            $scope.formUpdate = angular.copy(customer);
        } else {
            $scope.formUpdate = angular.copy(customer);
            $scope.formUpdate.createdAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }
    

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post("/customer", item).then(function (resp) {
            $scope.showSuccessMessage("Create customer successfully");
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
        $http.put(`/customer/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Update Customer successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/customer/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Customer successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateCustomer.$setPristine();
        $scope.formUpdateCustomer.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateCustomer.$setPristine();
        $scope.formCreateCustomer.$setUntouched();
    }

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.customer.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.customer.length / this.size);
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