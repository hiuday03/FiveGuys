var app = angular.module("abcd", ['ngSanitize']);

app.controller("abcd", function ($scope, $http, $timeout) {
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

    const apiUrlProduct = "http://localhost:8080/api/product"

    $scope.initialize = function () {
        $http.get("/api/product").then(function (resp) {
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

    // $scope.initialize = function () {
    //     $http.get(apiUrlProduct + "/page").then(resp => {
    //         $scope.products = resp.data.content;
    //         $scope.totalPages = resp.data.totalPages
    //     });
    // }
    // $scope.initialize();

    const apiUrlCategory = "http://localhost:8080/api/category"
    const apiUrlMaterial = "http://localhost:8080/api/material"
    const apiUrlBrand = "http://localhost:8080/api/category/brands"

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


    $scope.getForm = function () {
        // alert(angular.copy($scope.formInput.name))
    }

    $scope.create = function () {
        console.log(editor1.getHTMLCode())
        $scope.formInput.describe = editor1.getHTMLCode();
        let item = angular.copy($scope.formInput);
        $scope.load();
        $http.post(apiUrlProduct, item).then(resp => {
            $('#productConfirm').modal('hide');
            $scope.unload()
            $scope.showToast("Thêm sản phẩm thành công!")
            $scope.initialize();
            $scope.resetFormInput();
        }).catch(error => {
            $scope.unload()
            console.log("Error", error);
        })
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formInput.$setPristine();
        $scope.formInput.$setUntouched();
    }

    $scope.edit = function (product) {
        $scope.formUpdate = angular.copy(product);
        console.log($scope.formUpdate)
        // editor2.setHTMLCode($scope.formUpdate.describe);

        $http.get(apiUrlProduct + "/" + product.id + "/productDetail")
            .then(function (response) {
                console.log("proDetail" + response)
                $scope.productDetails = response.data.content
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
        document.getElementById("updateName").readOnly = bool;
        document.getElementById("updateCollar").readOnly = bool;
        document.getElementById("updateWrist").readOnly = bool;
        document.getElementById("updateCategory").disabled = bool;
        document.getElementById("updateMaterial").disabled = bool;
        document.getElementById("updateBrand").disabled = bool;

        $scope.showButton(bool1);
    }
    $scope.enableEditForm(true, true);


    $scope.update = function (productId) {
        let item = angular.copy($scope.formUpdate);
        console.log("cc" + item.category)
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

    $scope.submitProductDetail = function (listImage) {
        console.log($scope.formInputPd)
        console.log("cc")
        console.log($scope.formUpdate.id)
        $scope.formInputPd.product.id = $scope.formUpdate.id
        let item = angular.copy($scope.formInputPd);
        item.product.id = $scope.formUpdate.id
        let productDetailRequest = {productDetail: item, imagesList: listImage};
        console.log(productDetailRequest)
        $http.post(apiUrlProductDetail, productDetailRequest).then(resp => {
            $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
                .then(function (response) {
                    console.log("pd" + response)
                    $scope.productDetails = response.data.content
                });
            if (!alert("Create product detail successfully!")) {
                //     var idModal1 = "modalProductDetail"
                //     var myModal1 = bootstrap.Modal.getOrCreateInstance(document.getElementById(idModal1));
                //     myModal1.hide();
                // }
                $scope.formInputPd = {}
                $scope.resetFormInput();

                $scope.resetFormInputPd()
                $scope.formInputPd = {}
            }
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.submitProductDetail123 = function () {
        $scope.checkTrungFK = false;
        console.log($scope.formInputPd)
        $scope.formInputPd.product = $scope.formUpdate
        let item = angular.copy($scope.formInputPd);
        $http.post(apiUrlProductDetail + "/checkFk", item).then(resp => {
            if (resp.data == '') {
                console.log("cc1")
                $scope.checkTrungFK = false;
                $('#modalProductDetail').modal('hide');
                $('#modalDetail').modal('show');
            } else {
                console.log("cc2")
                $scope.checkTrungFK = true;
                // return true;
            }
        }).catch(error => {
            console.log("Error", error);
            // return false;
        })
    }

    $scope.cancelEditPd = function () {
        $http.get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
            .then(function (response) {
                console.log(response)
                $scope.productDetails = response.data.content
            });
        $scope.resetValiAddPD()
        // $scope.formInputPd = {}
    }

    $scope.resetValiAddPD = function () {
        $scope.checkTrungFK = false;
        $scope.formInputPd = {}
        $scope.resetFormInputPd()
    }

    $scope.formUpdateImage = {
        path: null,
        name: null,
        productDetail: {
            id: null
        }
    }

    imgShow("imageUpdate1", "imageupdate-preview1");
    imgShow("imageUpdate2", "imageupdate-preview2");
    imgShow("imageUpdate3", "imageupdate-preview3");


    // imgShow("image-update1", "image-preview-update1");
    // imgShow("image-update2", "image-preview-update2");
    // imgShow("image-update3", "image-preview-update3");

    // imgShow("image-update", "image-preview-update");

    function imgShow(textInput, textPreview) {
        const imageInput = document.getElementById(textInput);
        const imagePreview = document.getElementById(textPreview);
        imageInput.addEventListener("change", function () {
            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                };
                reader.readAsDataURL(imageInput.files[0]);
            }
        });
    }

    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    $scope.showErrorImg = function (message) {
        $scope.alertErrorImg = message;
        $scope.showError = true;
    }

    $scope.saveImage1233 = function () {
        let images = [];
        let fileInput1 = document.getElementById("image1");
        let fileInput2 = document.getElementById("image2");
        let fileInput3 = document.getElementById("image3");
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        // images.p
        if (fileInput1.files.length > 0) {
            let data = new FormData();
            data.append('file', fileInput1.files[0]);
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(resp => {
                let imagecc = {
                    path: null,
                    name: null,
                    productDetail: {
                        id: null
                    }
                }
                imagecc.path = resp.data.name;
                images.push(imagecc)

                console.log(images)
                if (fileInput2.files.length <= 0 && fileInput3.files.length <= 0) {
                    console.log("1")
                    console.log(images)
                    $scope.submitProductDetail(images)
                }
            }).catch(error => {
                console.log("Error", error);
            })
        }
        if (fileInput2.files.length > 0) {
            let data = new FormData();
            data.append('file', fileInput2.files[0]);
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(resp => {
                let imagecc = {
                    path: null,
                    name: null,
                    productDetail: {
                        id: null
                    }
                }
                imagecc.path = resp.data.name;
                images.push(imagecc)

                console.log(images)
                if (fileInput3.files.length <= 0) {
                    console.log("2")
                    console.log(images)
                    $scope.submitProductDetail(images)
                }
            }).catch(error => {
                console.log("Error", error);
            })
        }
        if (fileInput3.files.length > 0) {
            let data = new FormData();
            data.append('file', fileInput3.files[0]);
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(resp => {
                let imagecc = {
                    path: null,
                    name: null,
                    productDetail: {
                        id: null
                    }
                }
                imagecc.path = resp.data.name;
                images.push(imagecc)
                console.log("3")
                console.log(images)
                $scope.submitProductDetail(images)
            }).catch(error => {
                console.log("Error", error);
            })
        }
    }


    $scope.imagelist = [];

    $scope.getImageByPDid = function (id) {
        $http.get(apiImage + "/pd/" + id)
            .then(function (response) {
                console.log(response.data)
                $scope.imagelist = response.data
                return $scope.imagelist;
            });
    }

    $scope.editProductDetail = function (productDetail) {
        $scope.formUpdatePd = angular.copy(productDetail);
        let listimage = $scope.getImageByPDid($scope.formUpdatePd.id)
        // console.log(listimage)
        // console.log($scope.imagelist)
    }

    // imgShow("image1", "image-preview1");
    // imgShow("image2", "image-preview2");
    // imgShow("image3", "image-preview3");

    // imgShow("image-update", "image-preview-update");

    // function imgShow(textInput, textPreview) {
    //     const imageInput = document.getElementById(textInput);
    //     const imagePreview = document.getElementById(textPreview);
    //     imageInput.addEventListener("change", function () {
    //         if (imageInput.files && imageInput.files[0]) {
    //             const reader = new FileReader();
    //             reader.onload = function (e) {
    //                 imagePreview.src = e.target.result;
    //             };
    //             reader.readAsDataURL(imageInput.files[0]);
    //         }
    //     });
    // }



    $scope.resetFormInputPd = function () {
        let fileInput1 = document.getElementById("image1");
        let imagePreview1 = document.getElementById("image-preview1");
        let fileInput2 = document.getElementById("image2");
        let imagePreview2 = document.getElementById("image-preview2");
        let fileInput3 = document.getElementById("image3");
        let imagePreview3 = document.getElementById("image-preview3");
        imagePreview1.src = "/assets/img/no-img.png";
        imagePreview2.src = "/assets/img/no-img.png";
        imagePreview3.src = "/assets/img/no-img.png";
        fileInput1.value = "";
        fileInput1.type = "file";
        fileInput2.value = "";
        fileInput2.type = "file";
        fileInput3.value = "";
        fileInput3.type = "file";
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