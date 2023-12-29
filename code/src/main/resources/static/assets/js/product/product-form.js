var app = angular.module("abcd", ['ngSanitize']);

app.controller("abcd", function ($scope, $http, $timeout) {
    $scope.formInput = {};
    $scope.formUpdate = {};
    $scope.stage = "";
    $scope.formValidation = false;
    // $scope.toggleJSONView = false;
    // $scope.toggleFormErrorsView = false;


    $scope.formParams = {};

    // $scope.next = function (stage) {
    //
    //     $scope.formValidation = true;
    //
    //     if ($scope.multiStepForm.$valid) {
    //         $scope.direction = 1;
    //         $scope.stage = stage;
    //         $scope.formValidation = false;
    //     }
    // };
    //
    // $scope.back = function (stage) {
    //     $scope.direction = 0;
    //     $scope.stage = stage;
    // };

    // CC email list functions
    // $scope.addCCEmail = function () {
    //     $scope.rowId++;
    //
    //     var email = {
    //         email: $scope.formParams.ccEmail,
    //         row_id: $scope.rowId
    //     };
    //
    //     $scope.formParams.ccEmailList.push(email);
    //
    //     $scope.formParams.ccEmail = '';
    // };
    //
    // $scope.removeCCEmail = function (row_id) {
    //     for (var i = 0; i < $scope.formParams.ccEmailList.length; i++) {
    //         if ($scope.formParams.ccEmailList[i].row_id === row_id) {
    //             $scope.formParams.ccEmailList.splice(i, 1);
    //             break;
    //         }
    //     }
    // };


    // Post to desired exposed web service.
    // $scope.submitForm = function () {
    //     var wsUrl = "someURL";
    //
    //     // Check form validity and submit data using $http
    //     if ($scope.multiStepForm.$valid) {
    //         $scope.formValidation = false;
    //
    //         $http({
    //             method: 'POST',
    //             url: wsUrl,
    //             data: JSON.stringify($scope.formParams)
    //         }).then(function successCallback(response) {
    //             if (response
    //                 && response.data
    //                 && response.data.status
    //                 && response.data.status === 'success') {
    //                 $scope.stage = "success";
    //             } else {
    //                 if (response
    //                     && response.data
    //                     && response.data.status
    //                     && response.data.status === 'error') {
    //                     $scope.stage = "error";
    //                 }
    //             }
    //         }, function errorCallback(response) {
    //             $scope.stage = "error";
    //             console.log(response);
    //         });
    //     }
    // };


    // $scope.reset = function() {
    //     // Clean up scope before destorying
    //     $scope.formInput = {};
    //     $scope.stage = "";
    // }


    const apiUrlProduct = "http://localhost:8080/api/product"

    $scope.initialize = function () {
        $http.get(apiUrlProduct + "/page").then(resp => {
            $scope.products = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

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

    //ham hien thi nut phan trang
    $scope.displayPageRange = function () {
        var range = [];
        for (var i = 1; i <= $scope.totalPages; i++) {
            range.push(i);
        }
        return range;
    };


    //ham hien thi trang
    $scope.setPage = function (page) {
        page = page - 1;
        $http.get(apiUrlProduct + "/page?page=" + page)
            .then(function (response) {
                console.log(response)
                $scope.products = response.data.content;
                $scope.totalPages = response.data.totalPages
            });
    }

    $scope.setPage2 = function (page, selectedItem) {
        page = page - 1;
        if (selectedItem == "" || selectedItem == undefined) {
            $http.get(apiUrlProduct + "/page?page=" + page)
                .then(function (response) {
                    console.log(response)
                    $scope.products = response.data.content;
                    $scope.totalPages = response.data.totalPages
                });
        } else {
            $http.get(apiUrlProduct + "/searchByStatus?page=" + page + "&status=" + selectedItem).then(resp => {
                $scope.products = resp.data.content;
                $scope.totalPages = resp.data.totalPages
            });
        }
    }

    $scope.currentPage = 1;
    $scope.firstPage = function (selectedItem) {
        $scope.currentPage = 1;
        $scope.setPage2($scope.currentPage, selectedItem);
    }
    $scope.prePage = function (selectedItem) {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
        $scope.setPage2($scope.currentPage, selectedItem);
    }
    $scope.nextPage = function (selectedItem) {
        if ($scope.currentPage < $scope.totalPages) {
            $scope.currentPage++;
        }
        $scope.setPage2($scope.currentPage, selectedItem);
    }
    $scope.lastPage = function (selectedItem) {
        $scope.currentPage = $scope.totalPages;
        $scope.setPage2($scope.totalPages, selectedItem);
    }


    $scope.changeStatus = function (selectedItem) {
        console.log(selectedItem)
        $scope.currentPage = 1;
        if (selectedItem == "") {
            $scope.initialize()
        } else {
            $http.get(apiUrlProduct + "/searchByStatus?page=0&status=" + selectedItem).then(resp => {
                $scope.products = resp.data.content;
                $scope.totalPages = resp.data.totalPages
            });
        }
    }


    $scope.getForm = function () {
        // alert(angular.copy($scope.formInput.name))
    }

    $scope.create = function () {
        console.log(editor1.getHTMLCode())
        $scope.formInput.describe = editor1.getHTMLCode();
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlProduct, item).then(resp => {
            alert("Create product successfully!")
            $scope.initialize();
            $scope.resetFormInput();
        }).catch(error => {
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
        $http.put(`${apiUrlProduct}/` + productId, item).then(resp => {
            $scope.enableEditForm(true, true);
            alert("Update product successfully!")
            $scope.initialize();
            $scope.resetFormUpdate();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    // $scope.updateStatus = 0;
    $scope.updateStatusProduct = function (productId, statusUpdate) {
        $http.put(apiUrlProduct + "/status/" + productId, statusUpdate).then(resp => {
            // alert("Update status product successfully!")
            $scope.initialize();
            if (!alert("Update status product successfully!")) {
                var idModal = "updateStatusProduct-" + productId
                var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById(idModal));
                myModal.hide();
            }
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

    $scope.formInputPd = {
        product: {
            id: null
        }
    }


    const apiUrlProductDetail = "http://localhost:8080/api/productDetail"
    const apiImage = "http://localhost:8080/api/image"

    $scope.formInputImage = {
        path: null,
        name: null,
        productDetail: {
            id: null
        }
    }

    $scope.submitProductDetail = function (listImage) {
        console.log($scope.formInputPd)
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
        $scope.formInputPd.product.id = $scope.formUpdate.id
        let item = angular.copy($scope.formInputPd);
        $http.post(apiUrlProductDetail + "/checkFk", item).then(resp => {
            if(resp.data == ''){
                console.log("cc1")
                $scope.checkTrungFK = false;
                $('#modalProductDetail').modal('hide');
                $('#modalDetail').modal('show');
            }else{
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
        $scope.resetFormInputPd()
        $scope.formInputPd = {}
    }

    imgShow("image1", "image-preview1");
    imgShow("image2", "image-preview2");
    imgShow("image3", "image-preview3");

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

    $scope.displayPageRange1 = function () {
        var range = [];
        for (var i = 1; i <= $scope.totalPages; i++) {
            range.push(i);
        }
        return range;
    };

    //ham hien thi trang
    $scope.setPage1 = function (page) {
        $currentPage = page
        page = page - 1;
        $http.get(apiUrlCategory + "/page?page=" + page)
            .then(function (response) {
                $scope.categories = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }


    $scope.saveImage = function () {
        let images = [];
        let fileInput1 = document.getElementById("image1");
        let fileInput2 = document.getElementById("image2");
        let fileInput3 = document.getElementById("image3");
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (fileInput1.files.length > 0) {
            let data = new FormData();
            data.append('file', fileInput1.files[0]);
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(resp => {
                $timeout(function () {
                    $scope.formInputImage.path = resp.data.name;
                    images.push($scope.formInputImage)
                }, 100);

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
                $timeout(function () {
                    $scope.formInputImage.path = resp.data.name;
                    images.push($scope.formInputImage)
                }, 100);
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
                $timeout(function () {
                    $scope.formInputImage.path = resp.data.name;
                    images.push($scope.formInputImage)
                }, 100);
            }).catch(error => {
                console.log("Error", error);
            })
        }
        $timeout(function () {
            console.log(images)
            return images;
        }, 1000);
    }

    $scope.saveImage123 = function () {
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
                $timeout(function () {
                    $scope.formInputImage.path = resp.data.name;
                    images.push($scope.formInputImage)
                }, 100);

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
                $timeout(function () {
                    $scope.formInputImage.path = resp.data.name;
                    images.push($scope.formInputImage)
                }, 100);
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
                $timeout(function () {
                    $scope.formInputImage.path = resp.data.name;
                    images.push($scope.formInputImage)
                }, 100);
            }).catch(error => {
                console.log("Error", error);
            })
        }
        $timeout(function () {
            console.log(images)
            return images;
        }, 1000);
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
                if(fileInput2.files.length <= 0 && fileInput3.files.length <= 0){
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
                if(fileInput3.files.length <= 0){
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

    $scope.formUpdatePd = {
        product: {
            id: null
        }
    }

    $scope.editProductDetail = function (productDetail) {
        $scope.formUpdatePd = angular.copy(productDetail);
        $scope.getImageByPDid($scope.formUpdatePd.id)
    }

    $scope.imagelist = [];

    $scope.getImageByPDid = function (id) {
        $http.get(apiImage + "/pd/" + id)
            .then(function (response) {
                console.log(response.data)
                $scope.imagelist = response.data.content
            });
    }

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

});