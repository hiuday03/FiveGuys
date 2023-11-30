const inputElement = document.getElementById('search-product');
const hiddenElement = document.getElementById('item-list');
inputElement.addEventListener('click', function() {
    hiddenElement.style.display = 'block';
});
document.addEventListener('click', function(event) {
    if (event.target !== inputElement && event.target !== hiddenElement) {
        hiddenElement.style.display = 'none';
    }
});

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

let app_sellQuickly = angular.module("sell-quickly", ["kendo.directives"]);
app_sellQuickly.controller("sell-quickly-ctrl", function ($scope, $http, $timeout){
    $scope.products = [];
    $scope.vouchers = [];
    $scope.payMethods = [];
    $scope.cards = [];
    $scope.banks = [];
    $scope.formCustomer = {};
    $scope.formAddress = {};
    $scope.formCustomer2 = {};
    $scope.formAddress2 = {};
    $scope.formCard = {};
    $scope.employee = {};
    $scope.customers = [];
    let headers = {
        'x-client-id': '6fe80f99-3713-4e0e-b6ea-db59c5a2b8ce',
        'x-api-key': '0697a401-a4d1-4ffe-8005-9ee802ae9bab',
        'Content-Type': 'application/json'
    };
    $scope.showCustomerList = function () {
        var inputElementCustomer = document.getElementById('search-client');
        var hiddenElementCustomer = document.getElementById('customerList');
        inputElementCustomer.addEventListener('click', function() {
            hiddenElementCustomer.style.display = 'block';
        });

        document.addEventListener('click', function(event) {
            if (event.target !== inputElementCustomer && event.target !== hiddenElementCustomer) {
                hiddenElementCustomer.style.display = 'none';
            }
        });
    };
    $scope.removeAddress = function (selectedItem) {
        selectedItem.address = null;
        localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
    }

    $scope.showCustomerUpdate = function (selectedItem) {
        $scope.resetFormUpdate();
        $scope.formCustomer2.fullName = selectedItem.address.customer.fullName;
        $scope.formCustomer2.birthDate = new Date(selectedItem.address.customer.birthDate);
        $scope.formCustomer2.gender = selectedItem.address.customer.gender.toString();
        $scope.formAddress2.phoneNumber = selectedItem.address.phoneNumber;
        $scope.formAddress2.addressType = selectedItem.address.addressType;
        $scope.formAddress2.address = selectedItem.address.address;
    }

    $scope.showSelectCustomer = function (selectedItem, customer) {
        $http.get(`/address/get-by-customer/${customer.id}`).then(resp => {
            selectedItem.address = resp.data[0];
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        })
    }

    $scope.getListCustomer = function () {
        $http.get("/customer").then(resp => {
            $scope.customers = resp.data;
        });
    }

    $scope.getListCards = function () {
        $http.get("/api/card").then(resp => {
            $scope.cards = resp.data;
        });
    }

    $scope.initialize = function () {
        $http.get("/api/productDetail").then(resp => {
            $scope.products = resp.data;
            console.log($scope.products)
        });
        $http.get("/api/user").then(resp => {
            $scope.employee = resp.data;
        });
        $http.get("/api/pay-method").then(resp => {
            $scope.payMethods = resp.data;
        });
        $http.get("https://api.vietqr.io/v2/banks").then(resp => {
            $scope.banks = resp.data.data;
        });
        $http.get("/api/voucher").then(resp => {
            $scope.vouchers = resp.data;
        })
        $scope.getListCards();
        $scope.getListCustomer();
    }



    $scope.resetFormCard = function () {
        $scope.formCard = {};
    }

    $scope.createCard = function () {
        let card = {
            bankName: $scope.formCard.bank.name,
            bankCode: $scope.formCard.bank.code,
            acqId: $scope.formCard.bank.bin,
            accountNo: $scope.formCard.accountNo,
            accountName: $scope.formCard.accountName,
            description: $scope.formCard.description,
            createdBy:  $scope.employee.fullName,
            createdAt: new Date()
        }
        $http.post(`/api/card`, card).then(resp => {
            toastr["success"]("Tạo thẻ ngân hàng thành công")
            $scope.resetFormCard();
            $scope.getListCards();
            $('#modalCard').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.create = function (selectedItem) {
        $scope.formCustomer.status = 1;
        $scope.formCustomer.createdAt = new Date();
        $scope.formCustomer.createdBy = $scope.employee.fullName;
        var customer = angular.copy($scope.formCustomer);
        $http.post(`/customer`, customer).then(resp => {
            $scope.formAddress.createdAt = new Date();
            $scope.formAddress.status = 1;
            $scope.formAddress.customer = resp.data;
            var address = angular.copy($scope.formAddress);
            $http.post(`/address`, address).then(resp => {
                toastr["success"]("Thêm khách hàng thành công")
                $scope.resetForm();
                selectedItem.address = resp.data;
                $scope.getListCustomer();
                $('#modalCustomer').modal('hide');
            })
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function (selectedItem) {
        $scope.formAddress2.customer = $scope.formCustomer2;
        $scope.formAddress2.updatedAt = new Date();
        $scope.formAddress2.customer.updatedAt = new Date();
        $scope.formAddress2.customer.updatedBy =  $scope.employee.fullName;
        $scope.formAddress2.customer.id = selectedItem.address.customer.id;
        let item = angular.copy($scope.formAddress2);
        $http.put(`/address/${selectedItem.address.id}`, item).then(resp => {
            toastr["success"]("Cập nhật khách hàng thành công")
            $('#modalCustomerUpdate').modal('hide');
            selectedItem.address = resp.data;
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
            $scope.getListCustomer();

        }).catch((error) => {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formAddress2 = {
            addressType: "Cá nhân"
        };
        $scope.formCustomer2 = {
            gender: "true"
        };
    }
    $scope.resetForm = function () {
        $scope.formAddress = {
            addressType: "Cá nhân"
        };
        $scope.formCustomer = {
            gender: "true"
        };
    }

    $scope.initialize();
    // bill tab
    $scope.treeData = new kendo.data.HierarchicalDataSource({
        data: JSON.parse(localStorage.getItem("treeData")) || [

        ]
    });


    function makeBill() {
        var uniqueId = $scope.treeData.data().length + 1;
        var bill = {
            name: 'Hóa đơn ' + uniqueId,
            createdAt: new Date(),
            paymentDate: new Date(),
            itemQty: 0,
            moneyReturn: 0,
            customerPay: 0,
            totalCustomerPay: 0,
            totalAmount: 0,
            reciverName: null,
            deliveryDate: new Date(),
            shippingFee: 0,
            address: null,
            phoneNumber: null,
            note: null,
            status: 1,
            voucher: null,
            payMethod:  $scope.payMethods[0],
            card: null,
            cart: []
        }
        return bill;
    };

    $scope.addBill = function () {
        var newbill = makeBill();
        $scope.treeData.add(newbill);
        localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
    }

    $scope.removeBill = function (item) {
        var array = item.parent();
        var index = array.indexOf(item);
        array.splice(index, 1);
        $scope.selectedItem = undefined;
        localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
    };

    $scope.addProductCart = function (selectedItem, id) {
        if (selectedItem == null) {
            toastr["error"]("Vui lòng chọn hóa đơn hoặc tạo hóa đơn")
            return;
        }
        var item = selectedItem.cart.find(item => item.id == id);
        if (item) {
            item.qty++;
            $scope.count(selectedItem);
        } else {
            $http.get('/api/productDetail/' + id).then(resp => {
                resp.data.qty = 1;
                selectedItem.cart.push(resp.data);
                $scope.count(selectedItem);
            })
        }
    }

    $scope.removeProductCart = function (id, selectedItem) {
        var index = Object.values(selectedItem.cart).findIndex(item => item.id == id);
        if (index !== -1) {
            selectedItem.cart.splice(index, 1);
            $scope.count(selectedItem);
        }
        if (selectedItem.cart.length == 0) {
            selectedItem.payMethod = $scope.payMethods[0];
        }
    }

    $scope.subtractQuantity = function (selectedItem, item) {
        if (item.qty > 1) {
            item.qty--;
            $scope.count(selectedItem);
        }
    };

    $scope.addQuantity = function (selectedItem, item) {
        item.qty++;
        $scope.count(selectedItem);
    }

    $scope.checkQuantityChange = function (selectedItem, item) {
        if (isNaN(item.qty) || item.qty < 1 || !Number.isInteger(item.qty)) {
            item.qty = 1;
        }
        $scope.count(selectedItem);
    }

    $scope.addVoucher = function (selectedItem, voucher) {
        selectedItem.voucher = voucher;
        $scope.setCustomerPay(selectedItem);
        localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        $('#modalVoucher').modal('hide');
    }

    $scope.setCustomerPay = function (selectedItem) {
        if (selectedItem.voucher != null) {
            if (selectedItem.voucher.valueType == 2) {
                selectedItem.totalCustomerPay = selectedItem.totalAmount * ((100 - selectedItem.voucher.value)/100);
            } else {
                selectedItem.totalCustomerPay = selectedItem.totalAmount - selectedItem.voucher.value;
            }
            selectedItem.customerPay = selectedItem.totalCustomerPay;
        } else {
            selectedItem.totalCustomerPay = selectedItem.totalAmount;
            selectedItem.customerPay = selectedItem.totalCustomerPay;
        }
        $scope.changeCustomerPay(selectedItem);
    }

    $scope.changeCustomerPay = function (selectedItem) {
        if (selectedItem.customerPay > selectedItem.totalCustomerPay) {
            selectedItem.moneyReturn = selectedItem.customerPay - selectedItem.totalCustomerPay;
        } else {
            selectedItem.moneyReturn = 0;
        }
        if (selectedItem.payMethod.name.toLowerCase() === 'chuyển khoản' && selectedItem.card != null) {
            $scope.showQRCode(selectedItem);
        } else {
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    }

    $scope.removeVoucher = function (selectedItem) {
        selectedItem.voucher = {};
        $scope.setCustomerPay(selectedItem);
        localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
    }

    $scope.count = function (selectedItem) {
        selectedItem.itemQty = selectedItem.cart.reduce((total, item) => total + item.qty, 0);
        selectedItem.totalAmount = selectedItem.cart.reduce((total, item) => total + item.qty * item.price, 0);
        $scope.setCustomerPay(selectedItem);
    }

    $scope.changePaymentMethod = function (selectedItem, item) {
        selectedItem.payMethod = item;
        if (selectedItem.payMethod.name.toLowerCase() === 'chuyển khoản' && selectedItem.card != null) {
            $scope.showQRCode(selectedItem);
        } else {
            selectedItem.card = null;
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    }

    $scope.showQRCode = function (selectedItem) {
        let data = {
            accountNo: selectedItem.card.accountNo,
            accountName: selectedItem.card.accountName,
            acqId: selectedItem.card.acqId,
            addInfo: 'Chuyen khoan den ' + selectedItem.card.accountName,
            amount: selectedItem.customerPay,
            template: 'compact2'
        };
        $http({
            method: 'POST',
            url: 'https://api.vietqr.io/v2/generate',
            headers: headers,
            data: data
        }).then(function(response) {
            selectedItem.card.qrCode = response.data.data.qrDataURL;
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }, function(error) {
            // Handle error
            console.error(error);
        });

    }

    $scope.pay = function (selectedItem) {
        if (selectedItem.cart.length == 0) {
            toastr["error"]("Phiếu hàng đang trống");
            return;
        }
        let bill = {
            createdAt: new Date(),
            paymentDate: new Date(),
            totalAmount: selectedItem.totalAmount,
            totalAmountAfterDiscount: selectedItem.totalCustomerPay,
            customerEntity: selectedItem.address ? selectedItem.address.customer : null,
            employee: $scope.employee,
            paymentMethod: selectedItem.payMethod,
            voucher: selectedItem.voucher,
            card: selectedItem.card,
            typeBill: 1,
            status: 3,
            get billDetail() {
                return selectedItem.cart.map(item => {
                    return {
                        productDetail:{id: item.id},
                        price: item.price,
                        quantity: item.qty
                    }
                })
            }
        };
        $http.post(`/api/bill`, bill).then(resp => {
            toastr["success"]("Hóa đơn được cập nhật thành công")
            $scope.removeBill(selectedItem);
        })
    }

});