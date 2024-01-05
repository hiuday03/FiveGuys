
// import generateInvoiceHTML from './invoice.js';


var app = angular.module("myAppOfView", ["ngRoute", "angular-jwt", "ngSanitize"]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.factory('authInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    return {
        'request': function (config) {
            // Lấy token từ localStorage
            var token = localStorage.getItem('token');

            // Nếu có token, thêm header 'Authorization'
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }

            return config;
        },
        'responseError': function (response) {
            // Xử lý các lỗi khi nhận response
            return $q.reject(response);
        }
    };
}]);


app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);



app.config(function ($httpProvider) {
    $httpProvider.useApplyAsync(1000); //true
});


app.config(function ($routeProvider) {
    $routeProvider


        // Tham khao
        .when("/homeTest/123", {
            templateUrl: "thamkhao/homeTest.html",
            controller: "myAppOfView-ctrl"
        })
        .when("/productTest", {
            templateUrl: "thamkhao/productTest.html",
            controller: "myAppOfView-ctrl"
        })
        .when("/cartTest", {
            templateUrl: "thamkhao/cartTest.html",
            controller: "myAppOfView-ctrl2"
        })
        // Tham khao
        // <!-- Thuong -->




        // <!-- Hieu -->




        // <!-- Nguyen -->

        .when("/admin/product", {
            templateUrl: "/ofView/Nguyen/product/product.html",
            controller: "nguyen-product-ctrl"
        })
        .when("/admin/bill", {
            templateUrl: "/ofView/Nguyen/bill/bill.html",
            controller: "nguyen-bill-ctrl"
        })



        // <!-- Tinh -->


        ;
});

app.controller("myAppOfView-ctrl", function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {

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

    // $scope.callAdminEndpoint = function() {
    //     $http.get('http://localhost:8080http://localhost:8080/api/admin') // Sử dụng 'text' làm kiểu dữ liệu trả về
    //         .then(function(response) {
    //             // In dữ liệu phản hồi từ endpoint '/api/admin'
    //             console.log('Response from admin endpoint:');
    //         })
    //         .catch(function(error) {
    //             // Xử lý lỗi khi gọi API
    //             console.error('Error calling admin endpoint:', error);    
    //         });
    // };
    // $scope.callAdminEndpoint();


    console.log("myAppOfView-ctrl")

});
app.controller("myAppOfView-ctrl2", function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {
    console.log("myAppOfView-ctrl2")

});



app.controller("nguyen-product-ctrl", function ($scope, $http, $timeout) {
    $scope.originalProduct = [];
    $scope.formInput = {};
    $scope.formUpdate = {};
    $scope.stage = "";
    $scope.formValidation = false;
    // $scope.toggleJSONView = false;
    // $scope.toggleFormErrorsView = false;
    $scope.formParams = {};
    $scope.load = function () {
        $scope.loading = true
    }
    $scope.unload = function () {
        $scope.loading = false
    }

    $scope.formUpdatePd = {
        product: {
            id: null
        }
    }

    $scope.formInputImage = {
        path: null,
        name: null,
        productDetail: {
            id: null
        }
    }

    $scope.formInputPd = {
        product: {
            id: null
        }
    }

    $scope.showAlert = false;
    $scope.getAlert = function (message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function () {
            $scope.closeAlert();
        }, 5000);
    }
    $scope.closeAlert = function () {
        $scope.showAlert = false;
    }





    const apiUrlProduct = "http://localhost:8080/api/product"
    const apiUrlCategory = "http://localhost:8080/api/category"
    const apiUrlMaterial = "http://localhost:8080/api/material"
    const apiUrlBrand = "http://localhost:8080/api/category/brands"

    $scope.initialize = function () {
        $http.get(apiUrlProduct).then(function (resp) {
            $scope.originalProduct = resp.data;
            $scope.products = angular.copy($scope.originalProduct);
        });
    }
    $scope.initialize();

    $scope.showToast = function (message) {
        $scope.toastMessage = message
        var toastElList = [].slice.call(document.querySelectorAll('#liveToast'))
        var toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl)
        })
        toastList.forEach(toast => toast.show())
    }

    $scope.showToastUpdate = function (message) {
        $scope.toastMessage = message
        var toastElList = [].slice.call(document.querySelectorAll('#liveToastUpdate'))
        var toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl)
        })
        toastList.forEach(toast => toast.show())
    }


    $scope.getSelectOption = function () {
        $http.get(apiUrlCategory)
            .then(function (response) {
                console.log(response)
                $scope.categories = response.data;
            });
        $http.get(apiUrlMaterial)
            .then(function (response) {
                console.log(response)
                $scope.materials = response.data;
            });
        $http.get(apiUrlBrand)
            .then(function (response) {
                console.log(response)
                $scope.brands = response.data;
            });
    }
    $scope.getSelectOption();


    //filter status
    $scope.changeStatus = function (selectedItem) {
        console.log(selectedItem)
        if (selectedItem != "") {
            $scope.products = $scope.originalProduct.filter(function (item) {
                if (item && item.status) {
                    return (item.status == selectedItem);
                }
                return false;
            });
        } else {
            $scope.products = angular.copy($scope.originalProduct);
        }
        $scope.changePageSize();
    }

    //create product
    $scope.create = function () {
        // console.log(editor1.getHTMLCode())
        // $scope.formInput.describe = editor1.getHTMLCode();
        if ($scope.checkTrungTenCreate == true) return;
        let item = angular.copy($scope.formInput);
        $scope.load();
        $http.post(apiUrlProduct, item).then(resp => {
            $('#modalAddProduct').modal('hide');
            $scope.unload()
            $scope.showToast("Thêm sản phẩm thành công!")
            $scope.initialize();
            $scope.resetFormInput();
        }).catch(error => {
            $scope.unload()
            console.log("Error", error);
        })
    }

    //check trùng tên sản phẩm
    $scope.checkTrungTenCreate = false;
    $scope.checkTrungTenSP = function (inputName) {
        if (inputName == undefined) {
            $scope.checkTrungTenCreate = false;
            return;
        }
        for (let i = 0; i < $scope.products.length; i++) {
            let data = $scope.products[i]
            if (data.name == inputName.trim()) {
                console.log("a");
                $scope.checkTrungTenCreate = true;
                return;
            }
            $scope.checkTrungTenCreate = false;
        }
    }

    //reset form input product
    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.checkTrungTenCreate = false;
        $scope.formCreateProduct.$setPristine();
        $scope.formCreateProduct.$setUntouched();
    }

    //show product
    $scope.edit = function (product) {
        $scope.formUpdate = angular.copy(product);
        console.log($scope.formUpdate)
        // editor2.setHTMLCode($scope.formUpdate.describe);

        $http.get(apiUrlProduct + "/" + product.id + "/productDetail")
            .then(function (response) {
                console.log("proDetail" + response)
                $scope.productDetails = response.data
            });
    }


    $scope.showTab = function () {
        var someListItemEl = document.querySelector('#tabhome')
        var tab = new bootstrap.Tab(someListItemEl)
        tab.show()
    }

    $scope.showButton = function (bool1) {
        var x = document.getElementById("enableEdit");
        var y = document.getElementById("cancelEdit");
        var z = document.getElementById("submitEdit");

        if (bool1 == true) {
            x.style.display = "block";
            y.style.display = "none";
            z.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "block";
            z.style.display = "block";
        }
    }

    $scope.enableEditForm = function (bool, bool1) {
        document.getElementById("updateName").disabled = bool;
        document.getElementById("updateCollar").disabled = bool;
        document.getElementById("updateWrist").disabled = bool;
        document.getElementById("updateCategory").disabled = bool;
        document.getElementById("updateMaterial").disabled = bool;
        document.getElementById("updateBrand").disabled = bool;
        document.getElementById("updateDescribe").disabled = bool;
        document.getElementById("updateStatus").disabled = bool;

        $scope.showButton(bool1);
    }
    $scope.enableEditForm(true, true);


    //check productDetail co trang thai 1 ko
    $scope.checkStatusProductDetail = function (listProductDetail, statusProduct) {
        $scope.statusHopLe = true;
        if (statusProduct == 1) {
            if (!listProductDetail.length > 0) {
                $scope.statusHopLe = false;
                return false;
            }
            var totalOfStatus1 = 0;
            for (let i = 0; i <= listProductDetail; i++) {
                let data = listProductDetail[i];
                if (data.status == 1) {
                    totalOfStatus1++;
                }
            }
            if (totalOfStatus1 >= 1) {
                $scope.statusHopLe = true;
                return true;
            } else {
                $scope.statusHopLe = false;
                return false;
            }
        } else {
            $scope.statusHopLe = true;
            return;
        }

    }


    $scope.update = function (productId) {
        let item = angular.copy($scope.formUpdate);
        // console.log("cc" + item.category)

        if ($scope.checkStatusProductDetail($scope.productDetails, item.status) == false) return;

        $scope.load()
        $http.put(`${apiUrlProduct}/` + productId, item).then(resp => {
            $scope.enableEditForm(true, true);
            $scope.unload()
            $scope.showToast("Cập nhật thành công!");
            $scope.showToastUpdate("Cập nhật thành công!");
            $scope.initialize();
            $scope.resetFormUpdate();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    // $scope.updateStatus = 0;
    $scope.updateStatusProduct = function (productId, statusUpdate) {
        $scope.load()
        $http.put(apiUrlProduct + "/status/" + productId, statusUpdate).then(resp => {
            // alert("Update status product successfully!")
            $scope.initialize();
            $scope.unload();
            $scope.showToast("Cập nhật thành công!");
            var idModal = "updateStatusProduct-" + productId
            var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById(idModal));
            myModal.hide();
            $scope.resetFormInput();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    var editor1 = new RichTextEditor("#div_editor");
    $scope.cc1 = function () {
        $scope.getForm();
        // console.log(editor1.getHTMLCode())
        $scope.formInput.describe = editor1.getHTMLCode()
    };

    $scope.cancelEdit = function () {
        $scope.enableEditForm(true, true);
        $http.get(apiUrlProduct + "/" + $scope.formUpdate.id)
            .then(function (response) {
                console.log(response)
                $scope.formUpdate = response.data;
            });
        // $scope.formUpdate = $scope.productEdit
    }

    var btnPd = document.getElementById("addProductDetail");
    btnPd.style.display = "none";

    $scope.showAddProductDetail = function (value) {
        if (value == "pd") {
            btnPd.style.display = "block";
        } else {
            btnPd.style.display = "none";
        }
    }

    const apiUrlSize = "http://localhost:8080/api/size"
    const apiUrlColor = "http://localhost:8080/api/color"

    $scope.getSelectOptionPD = function () {
        $http.get(apiUrlSize)
            .then(function (response) {
                console.log(response)
                $scope.sizes = response.data;
            });
        $http.get(apiUrlColor)
            .then(function (response) {
                console.log(response)
                $scope.colors = response.data;
            });
    }
    $scope.getSelectOptionPD();


    const apiUrlProductDetail = "http://localhost:8080/api/productDetail"
    const apiImage = "http://localhost:8080/api/image"

    $scope.showLoadImage = false;
    $scope.loadImage = function () {
        $scope.showLoadImage = true;
    }
    $scope.unLoadImage = function () {
        $scope.showLoadImage = false;
    }

    //check so luong va status productDetail
    $scope.checkSoLuongToiThieu = function (quantity, status) {
        $scope.quantityStatusPD = false;
        if (quantity <= 0 && status == 1) {
            $scope.quantityStatusPD = true;
            return true;
        } else {
            $scope.quantityStatusPD = false;
            return false;
        }
    }

    $scope.listImageCreate = [];

    function layAnhTuCloud(textInput) {
        const imageInput = document.getElementById(textInput);
        imageInput.addEventListener("change", function () {
            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // imagePreview.src = e.target.result;

                    let data = new FormData();
                    data.append('file', imageInput.files[0]);
                    $scope.loadImage()
                    $http.post('http://localhost:8080/rest/upload', data, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    }).then(resp => {
                        $scope.unLoadImage()
                        let objectImage = {
                            path: null,
                            name: null,
                            productDetail: {
                                id: null
                            }
                        }
                        objectImage.path = resp.data.name;
                        $scope.listImageCreate.push(objectImage)
                        console.log($scope.listImageCreate)
                    }).catch(error => {
                        $scope.unLoadImage()
                        console.log("Error", error);
                    })
                };
                reader.readAsDataURL(imageInput.files[0]);
            }

        });
    }
    layAnhTuCloud("imageCreate")

    $scope.removeImage = function (image) {
        var index = $scope.listImageCreate.indexOf(image);
        $scope.listImageCreate.splice(index, 1);
    }

    //create product detail
    $scope.submitProductDetail = function (listImage) {
        $scope.checkTrungFK = false;
        console.log($scope.formInputPd)
        $scope.formInputPd.product = $scope.formUpdate
        let itemcheck = angular.copy($scope.formInputPd);
        $http.post(apiUrlProductDetail + "/checkFk", itemcheck).then(resp => {
            if (resp.data == '') {
                $scope.checkTrungFK = false;

                $scope.formInputPd.product = $scope.formUpdate
                let item = angular.copy($scope.formInputPd);
                item.product.id = $scope.formUpdate.id
                let productDetailRequest = { productDetail: item, imagesList: listImage };
                console.log(productDetailRequest)
                $scope.load();
                if ($scope.checkTrungProductDetail() == true) return;
                console.log(item)
                if ($scope.checkSoLuongToiThieu(item.quantity, item.status) == true) return;

                $http.post(apiUrlProductDetail, productDetailRequest).then(resp => {
                    $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
                        .then(function (response) {
                            console.log("pd" + response)
                            $scope.productDetails = response.data
                            $('#modalProductDetail').modal('hide');
                            $('#modalDetail').modal('show');
                            $scope.unload()
                            $scope.showToastUpdate("Thêm chi tiết sản phẩm thành công!")
                            $scope.showToast("Thêm chi tiết sản phẩm thành công!")
                            $scope.formInputPd = {
                                describe: ''
                            }
                            $scope.listImageUpdate = []
                        });
                }).catch(error => {
                    console.log("Error", error);
                })

            } else {
                $scope.quantityStatusPD = false;
                $scope.checkTrungFK = true;
            }
        }).catch(error => {
            console.log("Error", error);
            return false;
        })
    }

    $scope.checkTrungProductDetail = function () {
        $scope.checkTrungFK = false;
        console.log($scope.formInputPd)
        $scope.formInputPd.product = $scope.formUpdate
        let item = angular.copy($scope.formInputPd);
        $http.post(apiUrlProductDetail + "/checkFk", item).then(resp => {
            if (resp.data == '') {
                console.log("cc1")
                $scope.checkTrungFK = false;
                // $('#modalProductDetail').modal('hide');
                // $('#modalDetail').modal('show');
                return false;
            } else {
                console.log("cc2")
                $scope.checkTrungFK = true;
                return true;
            }
        }).catch(error => {
            console.log("Error", error);
            return false;
        })
    }

    $scope.cancelEditPd = function () {
        $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
            .then(function (response) {
                console.log(response)
                $scope.productDetails = response.data
            });
        $scope.resetValiAddPD()
        // $scope.formInputPd = {}
    }

    $scope.resetValiAddPD = function () {
        $scope.checkTrungFK = false;
        $scope.formInputPd = {}
        $scope.formCreateProductDetail.$setPristine();
        $scope.formCreateProductDetail.$setUntouched();
    }

    $scope.formUpdateImage = {
        path: null,
        name: null,
        productDetail: {
            id: null
        }
    }

    $scope.listImageUpdate = [];

    $scope.getImageByPDid = function (id) {
        $http.get(apiImage + "/pd/" + id)
            .then(function (response) {
                console.log(response.data)
                $scope.listImageUpdate = response.data
                return $scope.listImageUpdate;
            });
    }

    function layAnhTuCloudUpdate(textInput) {
        const imageInput = document.getElementById(textInput);
        imageInput.addEventListener("change", function () {
            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // imagePreview.src = e.target.result;

                    let data = new FormData();
                    data.append('file', imageInput.files[0]);
                    $scope.loadImage()
                    $http.post('http://localhost:8080/rest/upload', data, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    }).then(resp => {
                        $scope.unLoadImage()
                        let objectImage = {
                            path: null,
                            name: null,
                            productDetail: {
                                id: null
                            }
                        }
                        objectImage.path = resp.data.name;
                        $scope.listImageUpdate.push(objectImage)
                        console.log($scope.listImageUpdate)
                    }).catch(error => {
                        $scope.unLoadImage()
                        console.log("Error", error);
                    })
                };
                reader.readAsDataURL(imageInput.files[0]);
            }

        });
    }
    layAnhTuCloudUpdate("imageUpdate")

    $scope.removeImageUpdate = function (image) {
        var index = $scope.listImageUpdate.indexOf(image);
        $scope.listImageUpdate.splice(index, 1);
    }

    $scope.editProductDetail = function (productDetail) {
        $scope.formUpdatePd = angular.copy(productDetail);
        let listimage = $scope.getImageByPDid($scope.formUpdatePd.id)
        // console.log(listimage)
        // console.log($scope.listImageUpdate)
    }

    $scope.updateProductDetail = function (listImage) {
        $scope.formUpdatePd.product = $scope.formUpdate
        let item = angular.copy($scope.formUpdatePd);
        item.product.id = $scope.formUpdate.id
        let productDetailRequest = { productDetail: item, imagesList: listImage };
        console.log(productDetailRequest)
        $scope.load();
        $http.put(apiUrlProductDetail + "/" + $scope.formUpdatePd.id, productDetailRequest).then(resp => {
            $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
                .then(function (response) {
                    console.log("pd" + response)
                    $scope.productDetails = response.data
                    $('#modalUpdateDetail').modal('hide');
                    $('#modalDetail').modal('show');
                    $scope.unload()
                    $scope.showToastUpdate("Cập nhật thành công!")
                    $scope.showToast("Cập nhật thành công!")
                    $scope.formUpdatePd = {}
                    $scope.listImageUpdate = [];
                });
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== '') {
            $scope.products = $scope.originalProduct.filter(function (item) {
                if (item && item.code) {
                    return item.code.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalBill
            $scope.products = angular.copy($scope.originalProduct);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.products.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.products.length / this.size);
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

app.controller("nguyen-bill-ctrl", function ($scope, $http, $timeout){
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
                        return (new Date(item.createdAt).getDate()>= new Date(fromDate).getDate())
                    }
                }
                if (fromDate == undefined && toDate != undefined) {
                    if (item && item.createdAt) {
                        return (new Date(item.createdAt).getDate() <= new Date(toDate).getDate())
                    }
                }
                if (fromDate != undefined && toDate != undefined) {
                    if (item && item.createdAt) {
                        return ((new Date(item.createdAt).getDate() >= new Date(fromDate).getDate())
                            && (new Date(item.createdAt).getDate() <= new Date(toDate).getDate()))
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
        $http.get("http://localhost:8080/bills").then(function (resp) {
            $scope.originalBill = resp.data;
            $scope.bill = angular.copy($scope.originalBill);
        });
    }
    $scope.initialize();

    $scope.loadCustomers = function () {
        $http.get("http://localhost:8080/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customerEntitys = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadCustomers();

    $scope.loadEmployees = function () {
        $http.get("http://localhost:8080/employee") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.employees = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading employees", error);
            });
    }
    $scope.loadEmployees();

    $scope.loadVoucher = function () {
        $http.get("http://localhost:8080/api/voucher") // Thay đổi đường dẫn API tương ứng
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
        $http.post("http://localhost:8080/bills", item).then(function (resp) {
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
        $http.put(`http://localhost:8080/bills/${item.id}`, item).then(function (resp) {

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
        $http.put(`http://localhost:8080/bills/status/${item.id}`, status).then(function (resp) {

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



// Tạo cái mới đừng dùng những cái có sẵn chỉ để tham khảo
// Các phím tắt khi sử dụng visual
// https://www.thegioididong.com/game-app/tong-hop-cac-phim-tat-trong-visual-studio-code-giup-lap-trinh-1314635

