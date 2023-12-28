let app_account = angular.module("account", []);

app_account.controller("account-ctrl", function ($scope, $http, $timeout) {
    $scope.originalAccount = [];
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

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== '') {
            $scope.account = $scope.originalAccount.filter(function (item) {
                if (item && item.account) {
                    return item.account.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalAccount
            $scope.account = angular.copy($scope.originalAccount);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };
    $scope.initialize = function () {
        $http.get("/account").then(function (resp) {
            $scope.originalAccount = resp.data;
            $scope.account = angular.copy($scope.originalAccount);
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
        item.password = "fiveguys123";
        item.status = 1;
        $http.post("/account/save", item).then(function (resp) {
            $scope.showSuccessMessage("Thêm tài khoản thành công");
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

            $scope.showSuccessMessage("Sửa tài khoản thành công");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/account/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Xoá thành công");
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

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
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