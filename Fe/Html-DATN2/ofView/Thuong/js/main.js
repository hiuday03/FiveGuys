


// import generateInvoiceHTML from './invoice.js';
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



let app_sellQuickly = angular.module("sell-quickly", ["kendo.directives", "angular-jwt"]);

app_sellQuickly.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app_sellQuickly.factory('authInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
  return {
      'request': function(config) {
          // Lấy token từ cookies
          var token = localStorage.getItem('token');

          
          
          // Nếu có token, thêm header 'Authorization'
          if (token) {
              config.headers['Authorization'] = 'Bearer ' + token;
          }
          
          return config;
      },
      'responseError': function(response) {
          // Xử lý các lỗi khi nhận response
          return $q.reject(response);
      }
  };
}]);

app_sellQuickly.controller("sell-quickly-ctrl", function ($scope, $http,jwtHelper){


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
        $scope.products = [];
        $scope.vouchers = [];
        $scope.payMethods = [];
        $scope.formCustomer = {};
        $scope.formAddress = {};
        $scope.formCustomer2 = {};
        $scope.formAddress2 = {};
        $scope.employee = {};
        $scope.customers = [];








        $scope.userData = null; 
        $scope.username = null; 
        // check người dùng đã đăng nhập chưa
        function checkUserLoggedIn(username) {
          $http.get('http://localhost:8080/api/ol/user?username=' + username)
            .then(function (response) {
              console.log(response.data);
              if (response.status === 200 && response.data !== null) {
                if (response.data.employeeLoggedIn === true) {
                  $scope.isEmployeeLoggedIn = true;
                  $scope.userData = response.data;
                  console.log("Employee is logged in.");
                  return ;
                } else if(response.data.loggedIn === false){
                  $scope.isCustomerLoggedIn = false;
                  $scope.isEmployeeLoggedIn = false;
                  console.log("User is not logged in.");
                  return ;
                } else {
                  $scope.isCustomerLoggedIn = true;
                  $scope.userData = response.data;
                  console.log($scope.userData)
                  console.log("Customer is logged in.");
                  return ;
        
                  
                }
              } else {
                // Reset variables and return false
                $scope.isCustomerLoggedIn = false;
                $scope.isEmployeeLoggedIn = false;
                console.log("User is not logged in.");
                return ;
              }
            })
            .catch(function (error) {
              console.error("Error checking user login status:", error);
              // Reset variables and return false in case of errors
              $scope.isCustomerLoggedIn = false;
              $scope.isEmployeeLoggedIn = false;
              console.log("Error occurred. User is not logged in.");
              return;
            });
        }
        
        function isUserLoggedIn() {
          // var token = $cookies.get('token');
                 // Lấy token từ cookies
                 var token = localStorage.getItem('token');
        
          if (!token) {
            $scope.isCustomerLoggedIn = false;
            $scope.isEmployeeLoggedIn = false;
            $scope.userData = null;
            $scope.isAdmin = false;
        
            return Promise.resolve(false);
          }
        
          var decodedToken = jwtHelper.decodeToken(token);
          $scope.username = decodedToken.sub;
          if (decodedToken.role && decodedToken.role.length > 0) {
            console.log(decodedToken.role[0].authority);
            $scope.isAdmin = decodedToken.role[0].authority === 'ADMIN' || decodedToken.role[0].authority === 'STAFF';
          } else {
            $scope.isAdmin = false;
          }
          console.log($scope.isAdmin)
          return checkUserLoggedIn($scope.username);
        }
        // check người dùng đã đăng nhập chưa
        isUserLoggedIn();
        
















    
        function createDataSource(apiUrl) {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: apiUrl,
                        dataType: "json"
                    }
                }
            });
        }
    
        function createDataSourceDistrict(apiUrl) {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: apiUrl,
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (response) {
                        return response.districts || [];
                    }
                }
            });
        }
    
        function createDataSourceWard(apiUrl) {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: apiUrl,
                        dataType: "json"
                    }
                },
                schema: {
                    data: function (response) {
                        return response.wards || [];
                    }
                }
            });
        }
    
        $scope.city = createDataSource("https://provinces.open-api.vn/api/?depth=1");
    
        function createComboBoxOptionsCity(idCity, idDistrict, idWard) {
            return {
                dataSource: $scope.city,
                dataTextField: "name",
                dataValueField: "code",
                placeholder: "Tỉnh/thành...",
                change: () => {
                    var codeCity = $("#" + idCity).data('kendoComboBox').value();
                    if (!isNaN(codeCity)) {
                        $("#" + idWard).data("kendoComboBox").setDataSource([]);
                        $scope.resetInputWard(idWard);
                        $scope.resetInputDistrict(idDistrict);
                        $("#" + idDistrict).data("kendoComboBox").setDataSource(createDataSourceDistrict("https://provinces.open-api.vn/api/p/" + codeCity + "?depth=2"));
                    } else {
                        $("#" + idWard).data("kendoComboBox").setDataSource([]);
                        $("#" + idDistrict).data("kendoComboBox").setDataSource([]);
                        $scope.resetInputWard(idWard);
                        $scope.resetInputDistrict(idDistrict);
                    }
                    $("#" + idCity).data("kendoComboBox").close();
                }
            };
        }
    
        function createComboBoxOptionsDistrict(idDistrict, idWard) {
            return {
                dataSource: [],
                dataTextField: "name",
                dataValueField: "code",
                placeholder: "Quận/huyện...",
                change: () => {
                    var codeDistrict = $("#" + idDistrict).data('kendoComboBox').value();
                    if (!isNaN(codeDistrict)) {
                        $scope.resetInputWard(idWard);
                        $("#" + idWard).data("kendoComboBox").setDataSource(createDataSourceWard("https://provinces.open-api.vn/api/d/" + codeDistrict + "?depth=2"));
                    } else {
                        $("#" + idWard).data("kendoComboBox").setDataSource([]);
                        $scope.resetInputWard(idWard);
                    }
                    $("#" + idDistrict).data("kendoComboBox").close();
                }
            };
        }
    
        function createComboBoxOptionsWard(idWard) {
            return {
                dataSource: [],
                dataTextField: "name",
                dataValueField: "code",
                placeholder: "Thị trấn/Xã/Phường...",
                change: () => {
                    $("#" + idWard).data("kendoComboBox").close();
                }
            };
        }
    
        $scope.cityComboBoxOptions1 = createComboBoxOptionsCity("city1", "district1", "ward1");
        $scope.cityComboBoxOptions2 = createComboBoxOptionsCity("city2", "district2", "ward2");
    
    
        $scope.districtComboBoxOptions1 = createComboBoxOptionsDistrict("district1", "ward1");
        $scope.districtComboBoxOptions2 = createComboBoxOptionsDistrict("district2", "ward2");
    
        $scope.wardComboBoxOptions1 = createComboBoxOptionsWard("ward1");
        $scope.wardComboBoxOptions2 = createComboBoxOptionsWard("ward2");
    
        $scope.resetInputAddress = (idHouseNumber, idCity, idDistrict, idWard) => {
            $("#" + idHouseNumber).val("");
            $("#" + idWard).data("kendoComboBox").setDataSource([]);
            $("#" + idDistrict).data("kendoComboBox").setDataSource([]);
            $("#" + idCity).data("kendoComboBox").value("");
            $("#" + idCity).data("kendoComboBox").text("");
            $scope.resetInputDistrict(idDistrict);
            $scope.resetInputWard(idWard);
        }
    
        $scope.resetInputDistrict = (id) => {
            $("#" + id).data("kendoComboBox").value("");
            $("#" + id).data("kendoComboBox").text("");
        }
    
        $scope.resetInputWard = (id) => {
            $("#" + id).data("kendoComboBox").value("");
            $("#" + id).data("kendoComboBox").text("");
        }
    
        function changeShowCustomerList(id1, id2) {
            var inputElementCustomer = document.getElementById(id1);
            var hiddenElementCustomer = document.getElementById(id2);
            inputElementCustomer.addEventListener('click', () => {
                hiddenElementCustomer.style.display = 'block';
            });
    
            document.addEventListener('click', event => {
                if (event.target !== inputElementCustomer && event.target !== hiddenElementCustomer) {
                    hiddenElementCustomer.style.display = 'none';
                }
            });
        };
    
        $scope.showCustomerList1 = () => changeShowCustomerList('search-client', 'customerList');
        $scope.showCustomerList2 = () => changeShowCustomerList('search-client-2', 'customerList-2');
    
        $scope.removeAddress = selectedItem => {
            selectedItem.address = null;
            $scope.resetInputAddress("houseNumber3","city3", "district3", "ward3");
            return localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.showCustomerUpdate = selectedItem => {
            $scope.formCustomer2.fullName = selectedItem.address.customer.fullName;
            if (selectedItem.address.customer.birthDate != null) {
                $scope.formCustomer2.birthDate = new Date(selectedItem.address.customer.birthDate);
            }
            $scope.formCustomer2.gender = selectedItem.address.customer.gender.toString();
            $scope.formAddress2.phoneNumber = selectedItem.address.phoneNumber;
            $scope.formAddress2.addressType = selectedItem.address.addressType;
            var addressParts = selectedItem.address.address.split(', ');
            $("#houseNumber2").val(addressParts[0]);
            $("#city2").data("kendoComboBox").text(addressParts[3]);
            $("#city2").data("kendoComboBox").trigger("change");
            $("#district2").data("kendoComboBox").text(addressParts[2]);
            $("#ward2").data("kendoComboBox").text(addressParts[1]);
        }
    
        $scope.showSelectCustomer = (selectedItem, customer) => {
            $http.get(`http://localhost:8080/api/of-address/${customer.id}`).then(resp => {
                selectedItem.address = resp.data;
                var addressParts = selectedItem.address.address.split(', ');
                $("#houseNumber3").val(addressParts[0]);
                $("#city3").data("kendoComboBox").text(addressParts[3]);
                $("#district3").data("kendoComboBox").text(addressParts[2]);
                $("#ward3").data("kendoComboBox").text(addressParts[1]);
                localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
            })
        }
    
        $scope.getListCustomer = () => {
            $http.get("http://localhost:8080/customer").then(resp => {
                $scope.customers = resp.data;
            });
        }
    
        $scope.initialize = () => {
            $http.get("http://localhost:8080/api/off-productDetail").then(resp => {
                $scope.products = resp.data;
            });
          //   $http.get("http://localhost:8080/api/user").then(resp => {
          //       $scope.employee = resp.data;
          //   });
            $http.get("http://localhost:8080/api/pay-method").then(resp => {
                $scope.payMethods = resp.data;
            });
            $http.get("http://localhost:8080/api/off-voucher").then(resp => {
                $scope.vouchers = resp.data;
            });
            $http.get("http://localhost:8080/api/pay-method/cod").then(resp => {
                $scope.cod = resp.data;
            });
            $scope.getListCustomer();
        }
    
        $scope.create = selectedItem => {
            $scope.formCustomer.status = 1;
            $scope.formCustomer.createdAt = new Date();
            $scope.formCustomer.createdBy = $scope.employee.fullName;
            $scope.formAddress.address = printResult("houseNumber1", "city1", "district1", "ward1");
            if (!$scope.formAddress.address) {
                toastr["error"]("Vui lòng nhập đầy đủ địa chỉ");
                return;
            }
            var customer = angular.copy($scope.formCustomer);
            $http.post(`http://localhost:8080/customer`, customer).then(resp => {
                $scope.formAddress.createdAt = new Date();
                $scope.formAddress.status = 1;
                $scope.formAddress.defaultAddress = true;
                $scope.formAddress.customer = resp.data;
                var address = angular.copy($scope.formAddress);
                $http.post(`http://localhost:8080/address`, address).then(resp => {
                    toastr["success"]("Thêm khách hàng thành công")
                    $scope.resetForm();
                    selectedItem.address = resp.data;
                    $scope.getListCustomer();
                    $('#modalCustomer').modal('hide');
                }).catch(error => {
                    console.log("Error", error);
                })
            }).catch(error => {
                console.log("Error", error);
            })
        }
    
    
        $scope.update = selectedItem => {
            $scope.formAddress2.customer = $scope.formCustomer2;
            $scope.formAddress2.updatedAt = new Date();
            $scope.formAddress2.customer.updatedAt = new Date();
            $scope.formAddress2.customer.updatedBy =  $scope.employee.fullName;
            $scope.formAddress2.customer.id = selectedItem.address.customer.id;
            $scope.formAddress2.address = printResult("houseNumber2", "city2", "district2", "ward2");
            if (!$scope.formAddress2.address) {
                toastr["error"]("Vui lòng nhập đầy đủ địa chỉ");
                return;
            }
            let item = angular.copy($scope.formAddress2);
            $http.put(`http://localhost:8080/address/${selectedItem.address.id}`, item).then(resp => {
                toastr["success"]("Cập nhật khách hàng thành công");
                $scope.resetFormUpdate();
                $('#modalCustomerUpdate').modal('hide');
                selectedItem.address = resp.data;
                localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
                $scope.getListCustomer();
            }).catch((error) => {
                console.log("Error", error);
            });
        }
    
        $scope.resetFormUpdate = () => {
            $scope.formAddress2 = {
                addressType: "Cá nhân"
            };
            $scope.formCustomer2 = {
                gender: "true"
            };
            $scope.resetInputAddress("houseNumber2","city2", "district2", "ward2");
        }
        $scope.resetForm = () => {
            $scope.formAddress = {
                addressType: "Cá nhân"
            };
            $scope.formCustomer = {
                gender: "true"
            };
            $scope.resetInputAddress("houseNumber1","city1", "district1", "ward1");
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
                itemQty: 0,
                moneyReturn: 0,
                customerPay: 0,
                totalCustomerPay: 0,
                totalAmount: 0,
                reciverName: null,
                deliveryDate: new Date(),
                shippingFee: 0,
                houseNumber: null,
                city: null,
                district: null,
                ward: null,
                phoneNumber: null,
                note: null,
                status: 1,
                voucher: null,
                payMethod:  $scope.payMethods[0],
                cart: [],
                tabShip: false
            }
            return bill;
        };
    
        $scope.addBill = () => {
            var newbill = makeBill();
            $scope.treeData.add(newbill);
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.removeBill = item => {
            var array = item.parent();
            var index = array.indexOf(item);
            array.splice(index, 1);
            $scope.selectedItem = undefined;
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        };
    
        $scope.addProductCart = (selectedItem, id) => {
            if (selectedItem == null) {
                toastr["error"]("Vui lòng chọn hóa đơn hoặc tạo hóa đơn")
                return;
            }
            var item = selectedItem.cart.find(item => item.id == id);
            if (item) {
                item.qty++;
                $scope.count(selectedItem);
            } else {
                $http.get('http://localhost:8080/api/productDetail/' + id).then(resp => {
                    resp.data.qty = 1;
                    selectedItem.cart.push(resp.data);
                    $scope.count(selectedItem);
                })
            }
        }
    
        $scope.removeProductCart = (id, selectedItem) => {
            var index = Object.values(selectedItem.cart).findIndex(item => item.id == id);
            if (index !== -1) {
                selectedItem.cart.splice(index, 1);
                $scope.count(selectedItem);
            }
            if (selectedItem.cart.length == 0) {
                selectedItem.payMethod = $scope.payMethods[0];
            }
        }
    
        $scope.subtractQuantity = (selectedItem, item) => {
            if (item.qty > 1) {
                item.qty--;
                $scope.count(selectedItem);
            }
        };
    
        $scope.addQuantity = (selectedItem, item) => {
            item.qty++;
            $scope.count(selectedItem);
        }
    
        $scope.checkQuantityChange = (selectedItem, item) => {
            if (isNaN(item.qty) || item.qty < 1 || !Number.isInteger(item.qty)) {
                item.qty = 1;
            }
            $scope.count(selectedItem);
        }
    
        $scope.addVoucher = (selectedItem, voucher) => {
            selectedItem.voucher = voucher;
            if (selectedItem.totalAmount < selectedItem.voucher.minimumTotalAmount) {
                 toastr["error"](`Voucher ${selectedItem.voucher.name} không thể áp dụng`);
                 selectedItem.voucher = null;
                 return;
            }
            $scope.setCustomerPay(selectedItem);
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
            $('#modalVoucher').modal('hide');
        }
    
        $scope.setCustomerPay = selectedItem => {
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
    
        $scope.changeCustomerPay = selectedItem => {
            if (selectedItem.customerPay > selectedItem.totalCustomerPay) {
                selectedItem.moneyReturn = selectedItem.customerPay - selectedItem.totalCustomerPay;
            } else {
                selectedItem.moneyReturn = 0;
            }
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.changeNote = () => {
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.removeVoucher = selectedItem => {
            selectedItem.voucher = null;
            $scope.setCustomerPay(selectedItem);
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.count = selectedItem => {
            selectedItem.itemQty = selectedItem.cart.reduce((total, item) => total + item.qty, 0);
            selectedItem.totalAmount = selectedItem.cart.reduce((total, item) => total + item.qty * item.price, 0);
            $scope.setCustomerPay(selectedItem);
        }
    
        $scope.changePaymentMethod = (selectedItem, item) => {
            selectedItem.payMethod = item;
            $scope.setCustomerPay(selectedItem);
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
    
        $scope.pay = selectedItem => {
            if (selectedItem.cart.length == 0) {
                toastr["error"]("Phiếu hàng đang trống");
                return;
            } else if (selectedItem.cart.some(item => item.quantity < item.qty)) {
                toastr["error"]("Không đủ số lượng tồn kho");
                return;
            } else if (selectedItem.customerPay < selectedItem.totalCustomerPay) {
                toastr["error"]("Hệ thống không theo dõi công nợ vui lòng nhập đầy đủ số tiền");
                return;
            }
            let bill = {
                code: 'HD' + Number(String(new Date().getTime()).slice(-6)),
                createdAt: selectedItem.createdAt,
                totalAmount: selectedItem.totalAmount,
                totalAmountAfterDiscount: selectedItem.totalCustomerPay == selectedItem.totalAmount ? 0 : selectedItem.totalCustomerPay,
                customerEntity: selectedItem.address ? selectedItem.address.customer : null,
                address: selectedItem.address ? selectedItem.address.address : null,
                reciverName: selectedItem.address ? selectedItem.address.customer.fullName : null,
                phoneNumber: selectedItem.address ? selectedItem.address.phoneNumber : null,
                employee: $scope.employee,
                paymentMethod: selectedItem.payMethod,
                voucher: selectedItem.voucher,
                note: selectedItem.note,
                get billDetail() {
                    return selectedItem.cart.map(item => {
                        return {
                            productDetail:{id: item.id},
                            price: item.price,
                            quantity: item.qty,
                            status: 1
                        }
                    })
                }
            };
            $http.post(`http://localhost:8080/api/payos/create`, bill).then(resp => {
                if (resp.data.bill.paymentMethod.name.toLowerCase() === "chuyển khoản") {
                    $scope.openPaymentPopup(resp.data, selectedItem);
                } else if(resp.data.bill.paymentMethod.name.toLowerCase() === "tiền mặt") {
                    toastr["success"]("Thanh toán thành công");
                    $scope.removeBill(selectedItem);
                    $scope.billAddress = null;
                    if (resp.data.bill.customerEntity) {
                        $http.get(`http://localhost:8080/address/get-by-customer/${resp.data.bill.customerEntity.id}`).then(resp2 => {
                            resp.data.bill.addressCustomer = resp2.data;
                        })
                    }
                    $http.get(`http://localhost:8080/api/bill-detail/${resp.data.bill.id}`).then(billDT => {
                        resp.data.bill.billDetail = billDT.data;
                        $scope.confirmPrintBill(resp.data.bill);
                    })
                }
            }).catch((error) => {
                console.log("Error", error);
            });
        }
    
        $scope.confirmPrintBill = resp => {
            if (confirm('Bạn có muốn in hóa đơn không?')) {
                $scope.printBill(resp);
            } else {
                return;
            }
        }
    
        $scope.printBill = resp => {
            const invoiceHTML = generateInvoiceHTML(resp);
            const invoiceWindow = window.open('', '_blank');
            invoiceWindow.document.write(invoiceHTML);
            invoiceWindow.document.close();
        }
    
        $scope.openPaymentPopup = (data, selectedItem) => {
            let payOSConfig = {
                RETURN_URL: "http://localhost:8080/admin/sell-quicly",
                ELEMENT_ID: "tab-page",
                CHECKOUT_URL: data.data.checkoutUrl,
                onSuccess: (event) => {
                    $http.post(`http://localhost:8080/api/payment/payos-of/success`, JSON.stringify(data.bill)).then(resp => {
                        toastr["success"]("Thanh toán thành công");
                        $scope.removeBill(selectedItem);
                        $scope.initialize();
                        if (resp.data.bill.customerEntity) {
                            $http.get(`http://localhost:8080/address/get-by-customer/${resp.data.bill.customerEntity.id}`).then(resp2 => {
                                resp.data.bill.addressCustomer = resp2.data;
                            })
                        }
                        $http.get(`http://localhost:8080/api/bill-detail/${resp.data.bill.id}`).then(billDT => {
                            resp.data.bill.billDetail = billDT.data;
                            $scope.confirmPrintBill(resp.data.bill);
                        })
                    })
                },
                onCancel: (event) => {
                    $http.put(`http://localhost:8080/api/payos/${event.orderCode}`).then(resp => {
                        toastr["warning"]("Đã hủy thanh toán");
                        console.log(resp.data);
                    });
                },
                onExit: (event) => {},
            };
    
            const {open} = PayOSCheckout.usePayOS(payOSConfig);
            open();
        }
    
        function printResult (houseNumber, city, district, ward) {
            let houseNumberVal = $("#" + houseNumber).val();
            let cityVal = $("#" + city).data("kendoComboBox").text();
            let districtVal = $("#" + district).data("kendoComboBox").text();
            let wardVal = $("#" + ward).data("kendoComboBox").text();
            let result = wardVal && houseNumberVal && cityVal && districtVal ? `${houseNumberVal}, ${wardVal}, ${districtVal}, ${cityVal}` : '';
            if (result != '') {
                return result;
            }
        }
    
        $scope.paymethodCOD = selectedItem => {
            selectedItem.tabShip = true;
            selectedItem.payMethod = $scope.cod;
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        };
    
        $scope.changeCash = selectedItem => {
            selectedItem.payMethod =  $scope.payMethods[0];
            selectedItem.tabShip = false;
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.changeCashAndCod = selectedItem => {
            if (selectedItem.payMethod.paymentType === 3) {
                selectedItem.payMethod =  $scope.payMethods[0];
            } else {
                selectedItem.payMethod =  $scope.cod;
            }
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.changeHouseNumber = () => {
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.changeCity = () => {
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.changeDistrict = () => {
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
    
        $scope.changeWard = () => {
            localStorage.setItem("treeData", JSON.stringify($scope.treeData.data()));
        }
  
  });