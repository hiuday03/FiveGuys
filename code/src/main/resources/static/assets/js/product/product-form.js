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
        if($scope.currentPage > 1){
            $scope.currentPage--;
        }
        $scope.setPage2($scope.currentPage, selectedItem);
    }
    $scope.nextPage = function (selectedItem) {
        if($scope.currentPage < $scope.totalPages){
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
            $scope.resetFormInput();
            $scope.initialize();
        }).catch(error => {
            console.log("Error", error);
            alert("Error" + error)
        })
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formInput.$setUntouched();
    }

    $scope.edit = function (product) {
        $scope.formUpdate = angular.copy(product);
        editor2.setHTMLCode($scope.formUpdate.describe);

        $http.get(apiUrlProduct + "/" + product.id + "/productDetail")
            .then(function (response) {
                console.log(response)
                $scope.productDetails = response.data.content
            });
    }

    $scope.update = function () {

    }

    // $scope.updateStatus = 0;
    $scope.updateStatusProduct = function (productId, statusUpdate) {
        $http.put(apiUrlProduct + "/status/" + productId, statusUpdate).then(resp => {
            alert("Update status product successfully!")
            $scope.resetFormInput();
            $scope.initialize();
        }).catch(error => {
            console.log("Error", error);
            alert("Error" + error)
        })
    }

    // var x = document.getElementById("enableEdit");
    // x.style.display = "block";
    // var y = document.getElementById("cancelEdit");
    // var z = document.getElementById("submitEdit");
    // y.style.display = "none";
    // z.style.display = "none";
    //
    // $scope.showButton = function () {
    //     var x = document.getElementById("enableEdit");
    //     var y = document.getElementById("cancelEdit");
    //     var z = document.getElementById("submitEdit");
    //
    //     if (x.style.display === "none") {
    //         x.style.display = "block";
    //         y.style.display = "none";
    //         z.style.display = "none";
    //     }else{
    //         x.style.display = "none";
    //         y.style.display = "block";
    //         z.style.display = "block";
    //     }
    // }

    var editor1 = new RichTextEditor("#div_editor");
    $scope.cc1 = function () {
        $scope.getForm();
        // console.log(editor1.getHTMLCode())
        $scope.formInput.describe = editor1.getHTMLCode()
    };

    var editor2 = new RichTextEditor("#div_editor1");
    $scope.cc2 = function () {
        editor2.setHTMLCode("Use inline HTML or setHTMLCode to init the default");
        console.log(editor2.getHTMLCode())
    };



    $scope.enableEditForm = function (bool) {

        document.getElementById("updateCode").readOnly = bool;
        document.getElementById("updateName").readOnly = bool;
        document.getElementById("updateCollar").readOnly = bool;
        document.getElementById("updateWrist").readOnly = bool;
        document.getElementById("updateBrand").readOnly = bool;
        document.getElementById("updateCategory").disabled = bool;
        document.getElementById("updateMaterial").disabled = bool;
        // if(bool == false){
        // }
        // $scope.showButton();
    }
    $scope.enableEditForm(true);


    $scope.cancelEdit = function () {
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
        if(value == "pd"){
            btnPd.style.display = "block";
        }else{
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

    $scope.formInputPd = {}

    $scope.submitProductDetail = function () {
        console.log($scope.formInputPd)
    }

});
