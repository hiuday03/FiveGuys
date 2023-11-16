var app = angular.module("voucher-list-app", [])
app.controller("voucher-list-controller", function ($scope, $http, $timeout) {

    const apiUrlVoucher = "http://localhost:8080/api/voucher";
    const apiUrlAccount = "http://localhost:8080/account";
    $scope.voucher = [];
    $scope.formUpdate = {};
    $scope.formShow = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.hihi = {};

    $scope.label1 = {
        update: "Add voucher",
    }

    $scope.showSuccessMessage = function (message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function () {
            $scope.showAlert = false;
        }, 3000);
    }

    $scope.closeAlert = function () {
        $scope.showAlert = false;
    }

    $scope.getAll = function () {
        $http.get(apiUrlVoucher).then(function (response) {
            $scope.listVoucher = response.data;
        });
    }
    $scope.getAll();

    // getById Voucher
    $scope.getById = function (item) {
        $http.get(`/api/voucher/${item.id}`).then(function (response) {
            $scope.listVoucher = response.data;
            console.log(item.id);
        })
    }

    //Khai báo status voucher
    $scope.statusOptions = [
        {value: 0, label: 'CHUA_HOAT_DONG'},
        {value: 1, label: 'DANG_HOAT_DONG'},
        {value: 2, label: 'HET_KHUYEN_MAI'},
        {value: 3, label: 'HET_HAN'},
        {value: 4, label: 'DA_XOA'},
    ];

    //detail Voucher
    $scope.edit = function (voucher) {
        $scope.formInput = angular.copy(voucher);
        $scope.formInput.valid_form = new Date(voucher.valid_form)
        $scope.formInput.valid_until = new Date(voucher.valid_until); // Hoặc là giá trị ngày mặc định của bạn
        $scope.formInput.startDate = new Date(voucher.startDate);
        $scope.formInput.endDate = new Date(voucher.endDate);
        $scope.label1.update = "Update Voucher";
    }

    //detail voucher chi tiết
    $scope.show = function (employee) {
        $scope.formShow = angular.copy(employee);
        $scope.formShow.valid_form = new Date(employee.valid_form)
        $scope.formShow.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    }

    // create Employee
    $scope.addVoucher = function (newVoucher) {
        let item = angular.copy($scope.formInput);
        var isDuplicate = item.code.includes(newVoucher);
        if (isDuplicate){
            $scope.hihi= " ma trung";
        }else {
            $http.post("/api/voucher", item).then(function (resp) {
            $scope.showSuccessMessage("Create Voucher Successfully");
            $scope.resetFormInput();
            // alert("Create customer successfully")
            $scope.getAll();
        }).catch(function (error) {
            console.log("Error", error);
        });
        }

    }

    // update Voucher
    $scope.updateVoucher = function () {
        let item = angular.copy($scope.formInput);
        console.log(item)
        $http.put(`/api/voucher/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update Voucher successfully");
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

    //submit add and update
    $scope.submit = function () {
        if ($scope.formInput.id == true) {
            $scope.updateVoucher();
        } else {
            $scope.addVoucher();
        }
    }

    //rest form
    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.addformVoucher.$setPristine();
        $scope.addformVoucher.$setUntouched();
        $scope.label1.update = "Add Voucher";
    }

    $scope.showSuccessMessage = function (message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function () {
            $scope.closeAlert();
        }, 3000);
    }
    $scope.closeAlert = function () {
        $scope.showAlert = false;
    }

    //validate endDate >= startDate
    $scope.validateDate = function () {
        let item = angular.copy($scope.formInput);
        if (item.startDate && item.endDate) {
            var startDateObj = new Date(item.startDate);
            var endDateObj = new Date(item.endDate);

            if (startDateObj >= endDateObj) {
                $scope.endDateError = true;
            } else {
                $scope.endDateError = false;
            }
        }
    };


    // Phan trang
    $scope.paper = {
        page: 0,
        size: 7,
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