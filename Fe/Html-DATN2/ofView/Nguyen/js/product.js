app.controller("nguyen-product-ctrl", function ($scope, $http, $timeout) {
    $scope.products = [];
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

    // Hàm hiển thị thông báo thành công
    $scope.showSuccessNotification = function (message) {
        toastr["success"](message);
    };
    // Hàm hiển thị thông báo lỗi
    $scope.showErrorNotification = function (message) {
        toastr["error"](message);
    };
    $scope.showWarningNotification = function (message) {
        toastr["warning"](message);
    };

    const apiUrlProduct = "http://localhost:8080/api/product"
    const apiUrlCategory = "http://localhost:8080/api/category"
    const apiUrlMaterial = "http://localhost:8080/api/material"
    const apiUrlBrand = "http://localhost:8080/api/category/brands"

    $scope.initialize = function () {
        $http.get(apiUrlProduct).then(function (resp) {
            $scope.originalProduct = resp.data;
            console.log(resp.data);
            $scope.products = angular.copy($scope.originalProduct);
        });

        //lay list product excel
        $http.get(apiUrlProduct + "/getAllExportExcel")
            .then(function (response) {
                // $scope.unload();
                $scope.getAllExportExcel = response.data
            });

        //lay list product detail order product id excel
        $http.get("http://localhost:8080/api/productDetail" + "/getAllPdExportExcel")
            .then(function (response) {
                // $scope.unload();
                $scope.getAllPdExportExcel = response.data
                console.log($scope.getAllPdExportExcel);
            });
    }
    $scope.initialize();

    $scope.getSelectOption = function () {
        $http.get(apiUrlCategory)
            .then(function (response) {
                $scope.categories = response.data;
            });
        $http.get(apiUrlMaterial)
            .then(function (response) {
                $scope.materials = response.data;
            });
        $http.get(apiUrlBrand)
            .then(function (response) {
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
            $scope.showSuccessNotification("Thêm sản phẩm thành công!")
            $scope.initialize();
            $scope.resetFormInput();
            $scope.formUpdate = angular.copy(resp.data)
            $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
                .then(function (response) {
                    console.log("proDetail" + response)
                    $scope.productDetails = response.data
                    $scope.statusHopLe = true;
                    $scope.enableEditForm(true, true);
                });
            $scope.unload()
            $('#modalDetail').modal('show');
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
            if (toLowerCaseNonAccentVietnamese(data.name) == toLowerCaseNonAccentVietnamese(inputName.trim())) {
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
                $scope.statusHopLe = true;
                $scope.enableEditForm(true, true);

                $scope.checkTrungTenUpdate = false;
            });
        $scope.showAddProductDetail("product")
        $scope.showTab()
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
        console.log(listProductDetail);
        $scope.statusHopLe = true;
        if (statusProduct == 1) {
            if (listProductDetail.length <= 0) {
                $scope.statusHopLe = false;
                return false;
            }
            var totalOfStatus1 = 0;
            console.log(listProductDetail);
            for (let i = 0; i < listProductDetail.length; i++) {
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
            return true;
        }
    }

    //check trùng tên sản phẩm
    $scope.checkTrungTenUpdate = false;
    $scope.checkTrungTenSPUpdate = function (productId, inputName) {
        $http.get(apiUrlProduct + "/" + productId).then(function (resp) {
            $scope.productById = resp.data;
        });
        if (inputName == undefined) {
            $scope.checkTrungTenUpdate = false;
            return;
        }
        if ($scope.productById.name == inputName) {
            $scope.checkTrungTenUpdate = false;
            return true;
        }
        for (let i = 0; i < $scope.products.length; i++) {
            let data = $scope.products[i]
            if (data.name == inputName.trim()) {
                console.log("a");
                $scope.checkTrungTenUpdate = true;
                return;
            }
            $scope.checkTrungTenUpdate = false;
        }
    }


    $scope.update = function (productId) {
        let item = angular.copy($scope.formUpdate);
        // console.log("cc" + item.category)
        if ($scope.checkTrungTenUpdate == true) return;
        if ($scope.checkStatusProductDetail($scope.productDetails, item.status) == false) return;
        $scope.load()
        $http.put(`${apiUrlProduct}/` + productId, item).then(resp => {
            $scope.checkTrungTenUpdate = false;
            $scope.enableEditForm(true, true);
            $scope.unload()
            $scope.showSuccessNotification("Cập nhật thành công!");
            $scope.initialize();
            $http.get(apiUrlProduct + "/" + productId + "/productDetail")
                .then(function (response) {
                    $scope.productDetails = response.data
                });
            // $scope.resetFormUpdate();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    // $scope.updateStatus = 0;
    $scope.updateStatusProduct = function (productId, statusUpdate) {
        $http.get(apiUrlProduct + "/" + productId + "/productDetail")
            .then(function (response) {
                $scope.productDetailForStatusUpdate = response.data
                console.log(response.data);
                if ($scope.checkStatusProductDetail($scope.productDetailForStatusUpdate, statusUpdate) == false) return;
                $scope.load()
                $http.put(apiUrlProduct + "/status/" + productId, statusUpdate).then(resp => {
                    // alert("Update status product successfully!")
                    $scope.unload();
                    $http.get(apiUrlProduct + "/" + productId + "/productDetail")
                        .then(function (response) {
                            $scope.productDetails = response.data
                        });
                    $scope.initialize();
                    $scope.statusHopLe = true;
                    $scope.showSuccessNotification("Cập nhật trạng thái sản phẩm thành công");
                    $('#updateStatusProduct').modal('hide');
                }).catch(error => {
                    $scope.unload();
                    console.log("Error", error);
                })
            });

    }

    $scope.setStatusHopLe = function (p) {
        $scope.statusHopLe = true;
        $scope.productStatus = angular.copy(p)
        // $scope.statusUpdate = $scope.a.status
    }

    $scope.cancelEdit = function () {
        $scope.enableEditForm(true, true);
        $scope.statusHopLe = true;
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
        $http.get(apiUrlProduct + "/" + $scope.formUpdate.id)
            .then(function (response) {
                $scope.formUpdate = response.data
                $scope.statusHopLe = true;
                $scope.enableEditForm(true, true);
            });
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
                $scope.sizes = response.data;
            });
        $http.get(apiUrlColor)
            .then(function (response) {
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

    //check anh va status productDetail
    $scope.checkAnhEmpty = function (listImage, status) {
        $scope.imageStatusPD = false;
        if (status == 1) {
            dataLength = listImage.length
            if (dataLength <= 0) {
                $scope.imageStatusPD = true;
                return true;
            } else {
                $scope.imageStatusPD = false;
                return false;
            }
        } else {
            $scope.imageStatusPD = false;
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
                if ($scope.checkTrungProductDetail() == true) return;
                console.log(item)
                if ($scope.checkSoLuongToiThieu(item.quantity, item.status) == true) return;
                if ($scope.checkAnhEmpty(listImage, item.status) == true) return;

                $scope.load();
                $http.post(apiUrlProductDetail, productDetailRequest).then(resp => {
                    $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
                        .then(function (response) {
                            console.log("pd" + response)
                            $scope.productDetails = response.data
                            $('#modalProductDetail').modal('hide');
                            $('#modalDetail').modal('show');
                            $scope.initialize();
                            $scope.unload()
                            $scope.showSuccessNotification("Thêm chi tiết sản phẩm thành công!")
                            $scope.formInputPd = {
                                describe: ''
                            }
                            $scope.listImageUpdate = []
                        });
                }).catch(error => {
                    console.log("Error", error);
                    $scope.unload()
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
                console.log("ct1")
                $scope.checkTrungFK = false;
                // $('#modalProductDetail').modal('hide');
                // $('#modalDetail').modal('show');
                return false;
            } else {
                console.log("ct2")
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
        $scope.listImageCreate = []
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
        $scope.quantityStatusPD = false;
        $scope.imageStatusPD = false;
        // console.log(listimage)
        // console.log($scope.listImageUpdate)
    }

    $scope.checkLastPDStatus1 = function (itemStatus, productStatus) {
        let total = 0;
        for (let i = 0; i < $scope.productDetails.length; i++) {
            data = $scope.productDetails[i]
            if (data.status == 1) {
                total++;
            }
        }
        // if (total == 1 && itemStatus == 2 && productStatus == 1) {
        //     $scope.showSuccessNotification("Trạng thái sản phẩm đã chuyển về ngừng bán")
        // }
        // if (total == 0 && itemStatus == 1 && productStatus == 2) {
        //     $scope.showSuccessNotification("Trạng thái sản phẩm đã chuyển về đang bán")
        // }
        $scope.initialize();
    }

    $scope.checkTrungProductDetailUpdate = function () {
        console.log("ccccccccc");
        $scope.checkTrungFK = false;
        console.log($scope.formUpdatePd)
        $scope.formUpdatePd.product = $scope.formUpdate
        let item = angular.copy($scope.formUpdatePd);
        console.log(item);
        $http.post(apiUrlProductDetail + "/checkFkUpdate", item).then(resp => {
            console.log(resp.data)
            // if (resp.data == '') {
            //     console.log("ct1")
            //     $scope.checkTrungFK = false;
            //     return false;
            // } else {
            //     console.log("ct2")
            //     $scope.checkTrungFK = true;
            //     return true;
            // }
        }).catch(error => {
            console.log("Error", error);
            return false;
        })
    }

    $scope.updateProductDetail = function (listImage) {
        $scope.formUpdatePd.product = $scope.formUpdate
        let item = angular.copy($scope.formUpdatePd);
        item.product.id = $scope.formUpdate.id
        let productDetailRequest = { productDetail: item, imagesList: listImage };
        console.log(productDetailRequest)
        if ($scope.checkTrungProductDetailUpdate() == true) return;
        if ($scope.checkSoLuongToiThieu(item.quantity, item.status) == true) return;
        if ($scope.checkAnhEmpty(listImage, item.status) == true) return;
        $scope.checkLastPDStatus1(item.status, item.product.status)
        $scope.load();
        $http.put(apiUrlProductDetail + "/" + $scope.formUpdatePd.id, productDetailRequest).then(resp => {
            $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
                .then(function (response) {
                    console.log("pd" + response)
                    $scope.productDetails = response.data
                    $('#modalUpdateDetail').modal('hide');
                    $('#modalDetail').modal('show');
                    $scope.unload()
                    $scope.showSuccessNotification("Cập nhật thành công!")
                    $scope.initialize();
                    $scope.formUpdatePd = {}
                    $scope.listImageUpdate = [];
                    $scope.checkTrungFK = false;
                });
        }).catch(error => {
            console.log("Error", error);
        })
        $scope.unload()
        $scope.checkTrungFK = false;
    }

    //begin excel

    $scope.xuLyDataExportExcel = function () {
        // $scope.load()

        let products = angular.copy($scope.getAllExportExcel)
        let data = []
        let formData = {
            id: "",
            ma: "",
            name: "",
            collar: "",
            wrist: "",
            category: "",
            material: "",
            brand: "",
            describe: "",
            createdAt: "",
            createdBy: "",
            status: ""
        }
        let heading = [["ID", "Mã", "Tên SP", "Cổ áo", "Tay áo", "Loại", "Chất liệu", "Thương hiệu", "Mô tả", "Ngày tạo", "Người tạo", "Trạng thái"]]

        for (let i = 0; i < products.length; i++) {
            item = products[i]
            formData.id = item.id
            formData.ma = item.code
            formData.name = item.name
            formData.collar = item.collar
            formData.wrist = item.wrist
            formData.category = item.category.name
            formData.material = item.material.name
            formData.brand = item.brand.name
            formData.describe = item.describe
            formData.createdAt = new Date(item.createdAt).getDay() + "/" + (new Date(item.createdAt).getMonth() + 1) + "/" + new Date(item.createdAt).getFullYear()
            formData.createdBy = item.createdBy
            formData.status = item.status == 1 ? "Đang bán" : "Ngừng bán"

            data.push(formData)
            formData = {}
        }

        let productDetails = angular.copy($scope.getAllPdExportExcel)
        let dataProductDetail = []
        let formPd = {
            id: "",
            product: "",
            size: "",
            color: "",
            importPrice: "",
            price: "",
            quantity: "",
            barcode: "",
            createdAt: "",
            createdBy: "",
            status: ""
        }
        let pdHeading = [["ID", "Sản phẩm", "Kích cỡ", "Màu sắc", "Giá nhập", "Giá bán", "Số lượng tồn", "Barcode", "Ngày tạo", "Người tạo", "Trạng thái"]]
        for (let i = 0; i < productDetails.length; i++) {
            itempd = productDetails[i]
            formPd.id = itempd.id;
            formPd.product = itempd.product.code + " - " + itempd.product.name;
            formPd.size = itempd.size.name;
            formPd.color = itempd.color.name;
            formPd.importPrice = itempd.importPrice;
            formPd.price = itempd.price;
            formPd.quantity = itempd.quantity;
            formPd.barcode = itempd.barcode;
            formPd.createdAt = itempd.createdAt;
            formPd.createdBy = itempd.createdBy;
            formPd.status = itempd.status == 1 ? "Hiển thị" : "Ẩn";

            dataProductDetail.push(formPd)
            formPd = {}
        }

        $scope.exportExcel(data, heading, dataProductDetail, pdHeading)
    }

    //ham xuat file excel
    $scope.exportExcel = function (dataProduct, heading, dataProductDetail, pdHeading) {
        $scope.columnNames = ["Name", "Age", "City"];

        // const XLSX = require('xlsx');
        const wb = XLSX.utils.book_new();

        //san pham
        //bat dau tu o A2 bo qua header
        const ws = XLSX.utils.json_to_sheet(dataProduct, { origin: 'A2', skipHeader: true });
        //them header tu A1
        XLSX.utils.sheet_add_aoa(ws, heading, { origin: 'A1' });
        // appending sheet with a name
        XLSX.utils.book_append_sheet(wb, ws, 'Danh sách sản phẩm');

        //san pham chi tiet
        //bat dau tu o A2 bo qua header
        const wspd = XLSX.utils.json_to_sheet(dataProductDetail, { origin: 'A2', skipHeader: true });
        //them header tu A1
        XLSX.utils.sheet_add_aoa(wspd, pdHeading, { origin: 'A1' });
        // appending sheet with a name
        XLSX.utils.book_append_sheet(wb, wspd, 'Sản phẩm chi tiết');



        XLSX.writeFile(wb, "product_data.xlsx");
    }

    $scope.getCategoryById = function (nameCate) {
        $http.get(apiUrlCategory)
            .then(function (response) {
                $scope.categories = response.data;
            });
        if (nameCate == undefined || nameCate == null || nameCate == "") return null;
        for (let i = 0; i < $scope.categories.length; i++) {
            // console.log(nameCate);
            // console.log($scope.categories[i].name);

            if ($scope.categories[i].name == nameCate) {
                return $scope.categories[i].id
            }
        }
        return null
    }
    $scope.getMaterialById = function (nameM) {
        $http.get(apiUrlMaterial)
            .then(function (response) {
                $scope.materials = response.data;
            });
        if (nameM == undefined || nameM == null || nameM == "") return null;
        for (let i = 0; i < $scope.materials.length; i++) {
            if ($scope.materials[i].name == nameM) {
                return $scope.materials[i].id
            }
        }
        return null
    }
    $scope.getBrandById = function (nameB) {
        $http.get(apiUrlBrand)
            .then(function (response) {
                $scope.brands = response.data;
            });
        if (nameB == undefined || nameB == null || nameB == "") return null;
        for (let i = 0; i < $scope.brands.length; i++) {
            if ($scope.brands[i].name == nameB) {
                return $scope.brands[i].id
            }
        }
        return null
    }
    $scope.checkTrungNameP = function (name) {
        if (name == undefined || name == null || name == "") {
            return null;
        }
        for (let i = 0; i < $scope.products.length; i++) {
            let data = $scope.products[i]
            if (data.name == name) {
                console.log(name + " - " + data.name);
                return null;
            }
        }
        return name;
    }


    $scope.importExcel = function () {
        var excelFile = document.getElementById('excelFile').files[0];
        var workbook = new ExcelJS.Workbook();
        var reader = new FileReader();

        $scope.totalError = 0;
        $scope.rowOfError = []

        reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);
            var arr = new Array();

            let listData = []
            for (var i = 0; i != data.length; ++i) {
                arr[i] = String.fromCharCode(data[i]);
            }
            var bstr = arr.join("");
            workbook.xlsx.load(bstr)
                .then(function () {
                    // Đọc dữ liệu từ tệp Excel và thực hiện các thao tác mong muốn
                    var worksheet = workbook.getWorksheet(1);
                    worksheet.eachRow(function (row, rowNumber) {
                        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));

                        if (rowNumber > 1) {
                            let product = {
                                name: row.getCell(2).value,
                                collar: row.getCell(3).value,
                                wrist: row.getCell(4).value,
                                category: {
                                    id: $scope.getCategoryById(row.getCell(5).value)
                                },
                                material: {
                                    id: $scope.getMaterialById(row.getCell(6).value)
                                },
                                brand: {
                                    id: $scope.getBrandById(row.getCell(7).value)
                                },
                                describe: row.getCell(8).value,
                            }
                            console.log(product);
                            if ($scope.checkTrungNameP(product.name) == null) {
                                $scope.rowOfError.push(rowNumber);
                                return;
                            }
                            if (product.collar == null) {
                                $scope.rowOfError.push(rowNumber);
                                return;
                            }
                            if (product.wrist == null) {
                                $scope.rowOfError.push(rowNumber);
                                return;
                            }
                            if (product.category.id == null) {
                                $scope.rowOfError.push(rowNumber);
                                return;
                            }
                            if (product.material.id == null) {
                                $scope.rowOfError.push(rowNumber);
                                return;
                            }
                            if (product.brand.id == null) {
                                $scope.rowOfError.push(rowNumber);
                                return;
                            }
                            if (product.describe == null) {
                                $scope.rowOfError.push(rowNumber);
                                return;
                            }
                            listData.push(product)
                        }
                    });

                    console.log(listData);
                    console.log($scope.rowOfError);
                    $scope.load();
                    $http.post(apiUrlProduct + "/saveAll", listData).then(resp => {
                        $scope.unload()
                        $scope.showSuccessNotification("Thêm sản phẩm thành công!")
                        $scope.initialize();
                        $('#modalExel').modal('hide')
                    }).catch(error => {
                        console.log("Error", error);
                    })
                });
        };
        reader.readAsArrayBuffer(excelFile);
    };

    //end excel

    //ham tim kiem theo ma
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


    //ham chuyen tieng viet co dau sang khong dau
    function toLowerCaseNonAccentVietnamese(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }


    //product filter
    $scope.filter = function (searchName, fromDateProduct, toDateProduct, filterCategoryId, filterMaterialId, filterBrandId, filterProductStatus) {
        console.log(searchName);
        if (fromDateProduct == null) {
            fromDateProduct = undefined
        }
        if (toDateProduct == null) {
            toDateProduct = undefined
        }
        if (filterCategoryId == "" || filterCategoryId == null) {
            filterCategoryId = undefined
        }
        if (filterMaterialId == "" || filterMaterialId == null) {
            filterMaterialId = undefined
        }
        if (filterBrandId == "" || filterBrandId == null) {
            filterBrandId = undefined
        }
        if (filterProductStatus == "" || filterProductStatus == null) {
            filterProductStatus = undefined
        }

        let a = angular.copy($scope.originalProduct);

        if (searchName != undefined) {
            a = a.filter(function (item) {
                if (item && item.name) {
                    return toLowerCaseNonAccentVietnamese(item.name).includes(toLowerCaseNonAccentVietnamese(searchName));
                }

            });
        }
        if (fromDateProduct != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getTime() >= new Date(fromDateProduct).getTime())
            })
        }
        if (toDateProduct != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getTime() <= new Date(toDateProduct).getTime())
            })
        }
        if (filterCategoryId != undefined) {
            a = a.filter(function (item) {
                return item.category.id == filterCategoryId
            })
        }
        if (filterMaterialId != undefined) {
            a = a.filter(function (item) {
                return item.material.id == filterMaterialId
            })
        }
        if (filterBrandId != undefined) {
            a = a.filter(function (item) {
                return item.brand.id == filterBrandId
            })
        }
        if (filterProductStatus != undefined) {
            a = a.filter(function (item) {
                return item.status == filterProductStatus
            })
        }
        $scope.products = a;
        $scope.changePageSize();
    };

    $scope.resetFilter = function () {
        $scope.products = angular.copy($scope.originalProduct)
        $scope.fromDateProduct = null;
        $scope.toDateProduct = null;
        $scope.filterCategoryId = ""
        $scope.filterMaterialId = ""
        $scope.filterBrandId = ""
        $scope.filterProductStatus = ""
        $scope.searchName = undefined
        $scope.searchKeyword = undefined
        $scope.changePageSize()
    }

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