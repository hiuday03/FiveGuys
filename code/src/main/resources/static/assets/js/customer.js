let app_customer = angular.module("customer", []);

app_customer.controller("customer-ctrl", function ($scope, $http, $timeout) {
    $scope.customers = [];
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
        // Thay đổi đường dẫn API cụ thể tới danh sách khách hàng
        $http.get('/customer/all').then(function(resp) {
            $scope.customers = resp.data;
        })
        .catch(function(error) {
            console.log('Error loading data:', error);
        });
    }

    $scope.initialize();

    $scope.edit = function (customer) {
        $scope.formUpdate = angular.copy(customer);
    }

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        // Thay đổi đường dẫn API cụ thể để tạo khách hàng
        $http.post('/customer/create', item).then(resp => {
            $scope.showSuccessMessage("Create customer successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAll').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        });
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        // Thay đổi đường dẫn API cụ thể để cập nhật khách hàng
        $http.put(`/customer/update/${item.customerId}`, item).then(resp => {
            $scope.showSuccessMessage("Update Customer successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        // Thay đổi đường dẫn API cụ thể để xóa khách hàng
        $http.delete(`/customer/delete/${item.customerId}`).then(resp => {
            $scope.showSuccessMessage("Delete Customer successfully");
            $scope.initialize();
        }).catch(error => {
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
        $scope.formAddCustomer.$setPristine();
        $scope.formAddCustomer.$setUntouched();
    }

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.colors.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.colors.length / this.size)
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
