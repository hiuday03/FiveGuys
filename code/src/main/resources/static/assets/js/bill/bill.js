let app_bill = angular.module("bill", []);

app_bill.controller("bill-ctrl", function ($scope, $http, $timeout) {
    $scope.originalBill = [];
    $scope.bill = [];
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

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== '') {
            $scope.bill = $scope.originalBill.filter(function (item) {
                if (item && item.code) {
                    return item.code.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalBill
            $scope.bill = angular.copy($scope.originalBill);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };
    $scope.initialize = function () {
        $http.get("/bills").then(function (resp) {
            $scope.originalBill = resp.data;
            $scope.bill = angular.copy($scope.originalBill);
        });
    }

    $scope.initialize();

    $scope.loadCustomers = function () {
        $http.get("/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customerEntitys = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadCustomers();

    $scope.loadEmployees = function () {
        $http.get("/employee") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.employees = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading employees", error);
            });
    }

    $scope.loadEmployees();

    $scope.loadVoucher = function () {
        $http.get("/api/voucher") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.vouchers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading vuchers", error);
            });
    }

    $scope.loadVoucher();

    $scope.edit = function (bill) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(bill);
        } else {
            $scope.formUpdate = angular.copy(bill);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }
    // $scope.edit = function (bill) {
    //     $scope.formUpdate = angular.copy(bill);
    // }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/bills", item).then(function (resp) {
            $scope.showSuccessMessage("Create bill successfully");
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
        $http.put(`/bills/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Update bill successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/bills/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete bill successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateBill.$setPristine();
        $scope.formUpdateBill.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateBill.$setPristine();
        $scope.formCreateBill.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.bill.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.bill.length / this.size);
        },
        first() {
            this.page = 0;
        },
        prev() {
            if (this.page > 0) {
                this.page--;
            }
        },
        next() {
            if (this.page < this.count - 1) {
                this.page++;
            }
        },
        last() {
            this.page = this.count - 1;
        }
    };

});