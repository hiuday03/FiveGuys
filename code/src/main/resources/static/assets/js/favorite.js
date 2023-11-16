let app_favorite = angular.module("favorite", []);

app_favorite.controller("favorite-ctrl", function ($scope, $http, $timeout) {
    $scope.favorite = [];
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
    $scope.search = function () {
    // Kiểm tra xem từ khóa tìm kiếm có được nhập không
    if ($scope.searchKeyword.trim() !== '') {
        // Sử dụng phương thức filter của JavaScript để lọc dữ liệu
        $scope.favorite = $scope.favorite.filter(function (item) {
            // Kiểm tra xem item có thuộc tính name không trước khi sử dụng toLowerCase()
            if (item && item.content) {
                return item.content.toLowerCase().includes($scope.searchKeyword.toLowerCase());
            }
            return false; // Trả về false nếu không có thuộc tính name hoặc item là null/undefined
        });
    } else {
        // Nếu từ khóa tìm kiếm trống, reset lại dữ liệu ban đầu
        $scope.initialize();
    }
};  

    $scope.closeAlert = function () {
        $scope.showAlert = false;
    }

    $scope.initialize = function () {
        $http.get("/favorite").then(function (resp) {
            $scope.favorite = resp.data;
        });
    }
    
    $scope.initialize();

    $scope.loadCustomers = function () {
        $http.get("/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

    $scope.loadProductDetails = function () {
        $http.get("/api/productDetail") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.productDetails = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading productDetails", error);
            });
    }

    $scope.loadProductDetails();

    $scope.edit = function (favorite) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(favorite);
        } else {
            $scope.formUpdate = angular.copy(favorite);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }
    

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        item.createdAt = $scope.currentDate;
        $http.post("/favorite", item).then(function (resp) {
            $scope.showSuccessMessage("Create favorite successfully");
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
        $http.put(`/favorite/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Update favorite successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/favorite/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Favorite successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateFavorite.$setPristine();
        $scope.formUpdateFavorite.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateFavorite.$setPristine();
        $scope.formCreateFavorite.$setUntouched();
    }

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.favorite.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.favorite.length / this.size);
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