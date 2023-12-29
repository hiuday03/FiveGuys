let app_bill1 = angular.module("newbill", []);

app_bill1.controller("newbill-ctrl", function ($scope, $http, $timeout) {
    $scope.originalBill = [];
    $scope.bill = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

    // $scope.typeBill = ""
    // $scope.billStatus = ""
    // $scope.fromDate = null
    // $scope.toDate = null

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

    $scope.filter = function (fromDate, toDate, filterTypeBill, filterStatus) {
        // $scope.bill = $scope.originalBill.filter(function (item) {
        //     if (item && item.createdAt) {
        //         return (new Date(item.createdAt).getTime() >= new Date(fromDate).getTime())
        //     }
        //     return false;
        // });
        console.log(fromDate)
        console.log(toDate)
        console.log(filterTypeBill)
        console.log(filterStatus)
        if(fromDate == null){
            fromDate = undefined
        }
        if(toDate == null){
            toDate = undefined
        }
        if(filterTypeBill == "" || filterTypeBill == null){
            filterTypeBill = undefined
        }
        console.log(filterStatus)
        if(filterStatus == "" || filterStatus == null){
            filterStatus = undefined
        }


        console.log(fromDate)
        console.log(toDate)
        console.log(filterTypeBill)
        console.log(filterStatus)

        if(filterStatus == undefined && filterTypeBill == undefined
            && fromDate == undefined && toDate == undefined){
            $scope.bill = angular.copy($scope.originalBill);
            return;
        }

        $scope.bill = $scope.originalBill.filter(function (item) {

            //nếu thời gian null
            if(fromDate == undefined && toDate == undefined){
                if (filterStatus != undefined && filterTypeBill != undefined) {
                    if (item && item.status && item.typeBill) {
                        return (item.status == filterStatus && item.typeBill == filterTypeBill)
                    }
                }
                if (filterStatus != undefined && filterTypeBill == undefined) {
                    if (item && item.status) {
                        return (item.status == filterStatus)
                    }
                }
                if (filterStatus == undefined && filterTypeBill != undefined) {
                    if (item && item.typeBill) {
                        return (item.typeBill == filterTypeBill)
                    }
                }
            }

            //nếu status va typebill null
            if(filterStatus == undefined && filterTypeBill == undefined){
                if (fromDate != undefined && toDate == undefined) {
                    if (item && item.createdAt) {
                        return (new Date(item.createdAt).getTime() >= new Date(fromDate).getTime())
                    }
                }
                if (fromDate == undefined && toDate != undefined) {
                    if (item && item.createdAt) {
                        return (new Date(item.createdAt).getTime() <= new Date(toDate).getTime())
                    }
                }
                if (fromDate != undefined && toDate != undefined) {
                    if (item && item.createdAt) {
                        return ((new Date(item.createdAt).getTime() >= new Date(fromDate).getTime())
                            && (new Date(item.createdAt).getTime() <= new Date(toDate).getTime()))
                    }
                }
            }

            //có hoặc ko có cái nào null
            if(filterStatus != undefined || filterTypeBill != undefined
                || fromDate != undefined || toDate != undefined){

                //tất cả khác null
                if(filterStatus != undefined && filterTypeBill != undefined
                    && fromDate != undefined && toDate != undefined){
                    if (item && item.typeBill && item.status && item.createdAt) {
                        return ( (new Date(item.createdAt).getTime() >= new Date(fromDate).getTime())
                                && (new Date(item.createdAt).getTime() <= new Date(toDate).getTime()))
                            && (item.status == filterStatus && item.typeBill == filterTypeBill)
                    }
                }
            }
            return false;
        });
        $scope.changePageSize();
    };

    $scope.resetFilter = function () {
        $scope.bill = angular.copy($scope.originalBill);
        $scope.typeBill = ""
        $scope.billStatus = ""
        $scope.fromDate = null
        $scope.toDate = null
        $scope.changePageSize();
    }

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

    $scope.loadBillDetail = function (id) {
        $http.get("http://localhost:8080/bills/" + id + "/billDetail") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.billDetails = resp.data;
                var arr = resp.data;
                $scope.tongSoSanPham = 0;
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        $scope.tongSoSanPham += arr[i].quantity;
                    }
                }
                // console.log($scope.tongSoSanPham)
            })
            .catch(function (error) {
                console.log("Error loading billDetails", error);
            });
    }

    $scope.edit = function (bill) {
        $scope.showTab()
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(bill);
        } else {
            $scope.formUpdate = angular.copy(bill);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
        $scope.loadBillDetail(bill.id)
        $scope.getInfoBill(bill)
        console.log(bill)
    }


    $scope.getInfoBill = function (bill) {
        $scope.tongTien = bill.totalAmount;
        $scope.giamGia = bill.totalAmount - bill.totalAmountAfterDiscount;
        $scope.khachPhaiTra = bill.totalAmountAfterDiscount;
        $scope.khachDaTra = 0

        // console.log(bill.typeBill)
        // console.log(bill.paymentMethod.id)
        if (bill.typeBill === 1 && bill.paymentMethod.id === 3) {
            $scope.khachDaTra = $scope.khachPhaiTra;
        } else if (bill.typeBill === 1 && bill.paymentMethod.id != 3) {
            $scope.khachDaTra = 0;
        } else if (bill.typeBill == 2 &&
            (bill.paymentMethod.id === 1 || bill.paymentMethod.id === 2 || bill.paymentMethod.id === 3)) {
            $scope.khachDaTra = $scope.khachPhaiTra;
        } else if (bill.typeBill == 3 &&
            (bill.paymentMethod.id === 1 || bill.paymentMethod.id === 2 || bill.paymentMethod.id === 3)) {
            $scope.khachDaTra = $scope.khachPhaiTra;
        } else if (bill.typeBill === 3 && bill.paymentMethod.id === 4) {
            $scope.khachDaTra = 0
        }
    }

    //change tab
    $scope.showTab = function () {
        var someListItemEl = document.querySelector('#tabhome')
        var tab = new bootstrap.Tab(someListItemEl)
        tab.show()
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

    $scope.updateStatus = function (status, item) {
        console.log("c")
        console.log(status)
        console.log(item)
        $http.put(`/bills/status/${item.id}`, status).then(function (resp) {

            $scope.showSuccessMessage("Cập nhật hóa đơn thành công");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
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