let app_rating = angular.module("rating", []);

app_rating.controller("rating-ctrl", function ($scope, $http, $timeout) {
    $scope.rating = [];
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

    $scope.initialize = function () {
        $http.get("/rating").then(function (resp) {
            $scope.rating = resp.data;
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

    $scope.edit = function (rating) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(rating);
        } else {
            $scope.formUpdate = angular.copy(rating);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }
    

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/rating", item).then(function (resp) {
            $scope.showSuccessMessage("Create rating successfully");
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
        $http.put(`/rating/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Update rating successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/rating/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete rating successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateRating.$setPristine();
        $scope.formUpdateRating.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateRating.$setPristine();
        $scope.formCreateRating.$setUntouched();
    }

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            return $scope.rating.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.rating.length / this.size);
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