var app = angular.module("abcd", []);

app.controller("abcd", function ($scope, $http, $timeout) {
    $scope.formInput = {};
    $scope.stage = "";
    $scope.formValidation = false;
    // $scope.toggleJSONView = false;
    // $scope.toggleFormErrorsView = false;

    $scope.formParams = {
    };

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

    $scope.initialize = function() {
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
                $scope.totalPage = response.data.totalPages
            });
    }

    var editor1 = new RichTextEditor("#div_editor");
    $scope.cc1 = function () {
        $scope.getForm();
        // console.log(editor1.getHTMLCode())
        $scope.formInput.describe = editor1.getHTMLCode()
    };

    $scope.getForm = function () {
        // alert(angular.copy($scope.formInput.name))
    }

    $scope.create = function () {
        $scope.formInput.describe = editor1.getHTMLCode();
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlProduct, item).then(resp => {
            alert("Create product successfully!")
            $scope.resetFormInput();
            $scope.initialize();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.resetFormUpdate = function () {
        $scope.formInput = {};
        $scope.formInput.$setPristine();
        $scope.formInput.$setUntouched();
    }
});
