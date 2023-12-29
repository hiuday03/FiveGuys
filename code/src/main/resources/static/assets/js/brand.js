let app_brand = angular.module("brand", []);

app_brand.controller("brand-ctrl", function ($scope, $http, $timeout) {
    $scope.originalbrand = [];
    $scope.brand = [];
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
            $scope.brand = $scope.originalBrand.filter(function (item) {
                if (item && item.name) {
                    return item.name.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalBrand
            $scope.brand = angular.copy($scope.originalBrand);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/brand").then(function (resp) {
            $scope.originalBrand = resp.data; // Lưu dữ liệu gốc
            $scope.brand = angular.copy($scope.originalBrand); // Sao chép dữ liệu gốc sang mảng hiển thị
        });
    }

    $scope.initialize();

    $scope.edit = function (brand) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(brand);
        } else {
            $scope.formUpdate = angular.copy(brand);
            $scope.formUpdate.updatedAt = new Date();
        }
    }


    // $scope.create = function () {
    //     let item = angular.copy($scope.formInput);
    //     item.createdAt = $scope.currentDate;
    //     $http.post("/brand", item).then(function (resp) {
    //         $scope.showSuccessMessage("Create brand successfully");
    //         $scope.resetFormInput();
    //         $scope.initialize();
    //         $('#modalAdd').modal('hide');
    //     }).catch(function (error) {
    //         console.log("Error", error);
    //     });
    // }
    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/brand", item).then(function (resp) {
            $scope.showSuccessMessage("Create brand successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            if (error.status === 400 && error.data === 'Name already exists') {
                $scope.nameExists = true;
            } else {
                console.log("Error", error);
            }
        });
    };
    

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item)
        item.updatedAt = $scope.currentDate;
        $http.put(`/brand/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update Brand successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            if (error.status === 400 && error.data === 'Name already exists') {
                $scope.nameExists = true;
            } else {
                console.log("Error", error);
            }
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/brand/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Brand successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateBrand.$setPristine();
        $scope.formUpdateBrand.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateBrand.$setPristine();
        $scope.formCreateBrand.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.brand.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.brand.length / this.size);
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