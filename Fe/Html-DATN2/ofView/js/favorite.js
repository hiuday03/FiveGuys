app.controller("favorite-ctrl", function ($scope, $http, $timeout) {
    $scope.originalFavorite = [];
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
    };

    $scope.closeAlert = function () {
        $scope.showAlert = false;
    };

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== "") {
            $scope.favorite = $scope.originalFavorite.filter(function (item) {
                if (item && item.content) {
                    return item.content
                        .toLowerCase()
                        .includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalFavorite
            $scope.favorite = angular.copy($scope.originalFavorite);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/favorite").then(function (resp) {
            $scope.originalFavorite = resp.data;
            $scope.favorite = angular.copy($scope.originalFavorite);
        });
    };

    $scope.initialize();

    $scope.loadCustomers = function () {
        $http
            .get("/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    };

    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

    $scope.loadProducts = function () {
        $http
            .get("/api/product") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.products = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading products", error);
            });
    };

    $scope.loadProducts();

    $scope.edit = function (favorite) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(favorite);
        } else {
            $scope.formUpdate = angular.copy(favorite);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    };

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        item.createdAt = $scope.currentDate;
        $http
            .post("/favorite", item)
            .then(function (resp) {
                $scope.showSuccessMessage("Create favorite successfully");
                $scope.resetFormInput();
                $scope.initialize();
                $("#modalAdd").modal("hide");
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item);
        item.updatedAt = $scope.currentDate;

        $http
            .put(`/favorite/${item.id}`, item)
            .then(function (resp) {
                $scope.showSuccessMessage("Update Favorite successfully");
                $scope.resetFormUpdate();
                $scope.initialize();
                $("#modalUpdate").modal("hide");
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };

    $scope.delete = function (item) {
        $http
            .delete(`/favorite/${item.id}`)
            .then(function (resp) {
                $scope.showSuccessMessage("Delete Favorite successfully");
                $scope.initialize();
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateFavorite.$setPristine();
        $scope.formUpdateFavorite.$setUntouched();
    };

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateFavorite.$setPristine();
        $scope.formCreateFavorite.$setUntouched();
    };

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.favorite.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil((1.0 * $scope.favorite.length) / this.size);
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
        },
    };
});