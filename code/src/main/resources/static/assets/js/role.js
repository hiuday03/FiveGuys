let app_role = angular.module("role", []);

app_role.controller("role-ctrl", function ($scope, $http, $timeout) {
    $scope.originalRole = [];
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

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== '') {
            $scope.role = $scope.originalRole.filter(function (item) {
                if (item && item.fullName) {
                    return item.fullName.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalRole
            $scope.role = angular.copy($scope.originalRole);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/role").then(function (resp) {
            $scope.originalRole = resp.data; // Lưu dữ liệu gốc
            $scope.role = angular.copy($scope.originalRole); // Sao chép dữ liệu gốc sang mảng hiển thị
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
        item.updatedAt = $scope.currentDate;
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

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
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