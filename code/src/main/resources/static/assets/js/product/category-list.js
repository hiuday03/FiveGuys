var app = angular.module("product-list-app", []);

app.controller("product-list-ctrl", function ($scope, $http) {

    const apiUrlCategory = "http://localhost:8080/api/category"

    $scope.categories = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.showSuccessMessage = function(message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function() {
            $scope.closeAlert();
        }, 5000);
    }
    $scope.closeAlert = function() {
        $scope.showAlert = false;
    }
    $scope.initialize = function() {
        $http.get("/rest/colors").then(resp => {
            $scope.colors = resp.data;
        });
    }
    $scope.initialize();
    $scope.edit = function(cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function() {
        let item = angular.copy($scope.formInput);
        $http.post(`/rest/colors`, item).then(resp => {
            $scope.showSuccessMessage("Create color successfully!")
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function() {
        let item = angular.copy($scope.formUpdate);
        $http.put(`/rest/colors/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update color successfully!")
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function(item) {
        $http.delete(`/rest/colors/${item.id}`).then(resp => {
            $scope.showSuccessMessage("Delete color successfully!")
            $scope.initialize();
        }).catch(error => {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateColor.$setPristine();
        $scope.formUpdateColor.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formAddColor.$setPristine();
        $scope.formAddColor.$setUntouched();
    }

    //ham lay tat ca san pham co phan trang
    $scope.getProduct = function () {
        $http.get(apiUrlProduct + "/page")
            .then(function (response) {
                $scope.products = response.data.content;
                $scope.totalPages = response.data.totalPages;
            });
    }
    $scope.getProduct();

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

    //tao doi tuong
    const getProduct = function () {
        return {
            "name": $scope.name,
            "collar": $scope.collar,
            "wrist": $scope.wrist,
            "describe": $scope.describe,
            "brand": $scope.brand,
            "category": {
                id: $scope.idCategory,
            },
            "material": {
                id: $scope.idMaterial,
            },
        }
    }

    $scope.createProduct = function () {
        console.log(getProduct())
    }

    //lay doi tuong theo id
    $scope.getProductById = function (id) {
        $scope.id = id;
        $scope.productByID = "ccresponse.data"
        $http.get(apiUrlProduct + "/" + id)
            .then(function (response) {
                console.log(response.data.category.id)
                $scope.productByID = response.data
                setProductToForm(response.data)
            });
    }

    let setProductToForm = function (product) {
        $scope.name = product.name
        $scope.collar = product.collar
        $scope.wrist = product.wrist
        $scope.describe = product.describe
        $scope.brand = product.brand
        $scope.idCategory1 = product.category.id
    }

});
