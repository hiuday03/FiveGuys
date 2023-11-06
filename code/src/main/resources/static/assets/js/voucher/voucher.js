var app = angular.module("voucher-list-app", [])
app.controller("voucher-list-controller", function ($scope, $http, $timeout) {

    const apiUrlVoucher = "http://localhost:8080/api/voucher";
    const apiUrlAccount = "http://localhost:8080/account";
    $scope.voucher = [];
    $scope.formUpdate = {};
    $scope.formShow = {};
    $scope.formInput = {};
    $scope.showAlert = false;

    //
    // // get page Employee
    // $scope.getPage = function () {
    //     $http.get(apiUrlEmployee + "/get-page").then(function (response) {
    //         $scope.pageEm = response.data.content;
    //         $scope.totalPages = response.data.totalPages
    //     })
    // }
    // $scope.getPage()
    // //hiển thi nut phan trang
    // $scope.displayPageRange = function (){
    //     var rangs = [];
    //     for (var i = 1; i<= $scope.totalPages; i++){
    //         rangs.push(i);
    //     }
    //     return rangs;
    // }
    // //hien thi trang
    // $scope.setPage = function (page) {
    //     page = page-1;
    //     $http.get(apiUrlEmployee+ "/get-page?page="+ page).then(function (response) {
    //         $scope.pageEm = response.data.content;
    //         $scope.totalPages = response.data.totalPages
    //     })
    // }

    $scope.getAll = function () {
        $http.get(apiUrlVoucher).then(function (response) {
            $scope.listVoucher = response.data;
        });
        $http.get(`/api/voucher/list-current-date`).then(function (response) {
            $scope.listCurrentDate = response.data;
            for (const currentDate of $scope.listCurrentDate) {
                updateVoucherStatus(currentDate);
            }
            console.log($scope.listCurrentDate)
        });
    }
    function updateVoucherStatus(currentDate) {
        try {
            console.log("xin cahfhoo 11", currentDate)
            currentDate.status = 1; // Thay "MOT_TRANG_THAI_MONG_MUON" bằng giá trị trạng thái mới mong muốn
            $http.put(`/api/voucher/update-date/${currentDate.id}`, currentDate).then((response) => {
                console.log("kq == ", response);
            });
        } catch (error) {
            console.error("Lỗi trong quá trình cập nhật: ", error);
        }
    }

    $scope.getAll();

    // getById Voucher
    $scope.getById = function (item) {
        $http.get(`/api/voucher/${item.id}`).then(function (response) {
            $scope.listVoucher = response.data;
            console.log(item.id);
        })
    }

    // // search code employee
    // $scope.getByMa = function (item) {
    //     // console.log(item.id);
    //     $http.get(`/api/employee/search/${item.id}`).then(function (response) {
    //         console.log(item.code);
    //         $scope.listEm = response.data;
    //         // console.log(item.code);
    //     })
    // }
    //
    //

    //detaol Employee
    $scope.edit = function (employee) {
        $scope.formInput = angular.copy(employee);
        $scope.formInput.valid_form = new Date(employee.valid_form)
        $scope.formInput.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    }
    $scope.show = function (employee) {
        $scope.formShow = angular.copy(employee);
        $scope.formShow.valid_form = new Date(employee.valid_form)
        $scope.formShow.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    }

    // //delete Employ
    // $scope.delete = function (item) {
    //     $http.delete(`/api/employee/${item.id}`).then(function (response) {
    //         // $scope.getAll();
    //         $scope.getAllStatusDangLam();
    //         console.log(item.id);
    //     }).catch(function (error) {
    //         console.log("Error", error);
    //     });
    // }
    //
    // create Employee
    $scope.addVoucher = function () {
        let item = angular.copy($scope.formInput);
        $http.post("/api/voucher", item).then(function (resp) {
            $scope.showSuccessMessage("Create customer successfully");
            $scope.resetFormInput();
            $scope.getAll();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }
    // update Voucher
    $scope.updateVoucher = function () {
        // let item = angular.copy($scope.formInput);
        let item = angular.copy($scope.formInput);
        console.log(item)
        $http.put(`/api/voucher/${item.id}`, item).then(function (resp) {
            $scope.resetFormInput();
            $scope.getAll();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    //delete update status Employee
    $scope.updateStatusVoucher = function (item) {
        console.log(item)
        $http.put(`/api/voucher/delete/${item.id}`, item).then(function (resp) {
            $scope.getAll();
            // $scope.getAllStatusDangLam();
            console.log(item.id);
        })
    }
    $scope.submit = function (){
        if ($scope.formInput.id == -1){
            $scope.updateVoucher();
        }else {
            $scope.addVoucher();
        }
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.addformVoucher.$setPristine();
        $scope.addformVoucher.$setUntouched();
    }

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

    $scope.paper = {
        page: 0,
        size: 8,
        get items() {
            let start = this.page * this.size;
            if ($scope.listVoucher) {
                return $scope.listVoucher.slice(start, start + this.size);
            }
        },
        get count() {
            if ($scope.listVoucher) {
                return Math.ceil(1.0 * $scope.listVoucher.length / this.size);
            }

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
})