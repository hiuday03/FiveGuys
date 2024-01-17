
app.controller("rating-ctrl", function ($scope, $http, $timeout) {
    $scope.originalRating = [];
    $scope.rating = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

    const apiRating = "http://localhost:8080/rating";

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== "") {
            $scope.rating = $scope.originalRating.filter(function (item) {
                if (item && item.content) {
                    return item.content
                        .toLowerCase()
                        .includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalRating
            $scope.rating = angular.copy($scope.originalRating);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get(apiRating).then(function (resp) {
            $scope.originalRating = resp.data;
            $scope.rating = angular.copy($scope.originalRating);
        });
    };
    $scope.initialize();

    //chuyên status =2
    $scope.DanhGiaXacNhan = function (item) {
        console.log(item);
        $http
            .put(apiRating + "/update-status-rating-xac-nhan/" + `${item}`)
            .then(function () {
                $scope.initialize();
            });
    };
    //chuyên status =3
    $scope.DanhGiaHuy = function (item) {
        $http
            .put(apiRating + "/update-status-rating-huy/" + `${item}`)
            .then(function () {
                $scope.initialize();
            });
    };

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

    $scope.loadBillDetails = function () {
        $http
            .get("/billDetail") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.billDetails = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading billDetails", error);
            });
    };

    $scope.loadBillDetails();

    $scope.edit = function (rating) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(rating);
        } else {
            $scope.formUpdate = angular.copy(rating);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    };

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http
            .post("/rating", item)
            .then(function (resp) {
                $scope.showSuccessMessage("Create rating successfully");
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
        item.updatedAt = $scope.currentDate;
        $http
            .put(`/rating/${item.id}`, item)
            .then(function (resp) {
                $scope.showSuccessMessage("Update rating successfully");
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
            .delete(`/rating/${item.id}`)
            .then(function (resp) {
                $scope.showSuccessMessage("Delete rating successfully");
                $scope.initialize();
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateRating.$setPristine();
        $scope.formUpdateRating.$setUntouched();
    };

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateRating.$setPristine();
        $scope.formCreateRating.$setUntouched();
    };

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.rating.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil((1.0 * $scope.rating.length) / this.size);
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