let app_statistical = angular.module("statistical", []);

app_statistical.controller("statistical-ctrl", function ($scope, $http, $timeout) {
    const api = "http://localhost:8080/statistical";
    // tổng tiền trong  tháng
    $scope.getSum= function (){
        $http.get(api).then(function (rest){
            $scope.getsum = rest.data;
        })
    }
    $scope.getSum();
    // Tỉ lệ tổng tiền trong  tháng
    $scope.getSum1= function (){
        $http.get(api+"/he").then(function (rest){
            $scope.getsum1 = rest.data;
        })
    }
    $scope.getSum1();
// tổng hóa đơn trong  ngày
    $scope.getCodeDay= function (){
        $http.get(api+"/count-day").then(function (rest){
            $scope.getcodeday = rest.data;
        })
    }
    $scope.getCodeDay();

    // Tỉ lệ tổng hóa đơn trong  ngày
    $scope.getCodeDayTiLe= function (){
        $http.get(api+"/tile-day").then(function (rest){
            $scope.getcodedaytile = rest.data;
        })
    }
    $scope.getCodeDayTiLe();


    $scope.getAllList = function (){
        $http.get(api+"/get-all-list").then(function (getall){
            $scope.getalllist = getall.data;
        })
    }
    $scope.getAllList();
    //Tổng khách hàng trong 1 năm
    $scope.listCustomerYear = function (){
        $http.get(api+"/list-customer-year").then(function (getall){
            $scope.listcustomeryear = getall.data;
        })
    }
    $scope.listCustomerYear();
});