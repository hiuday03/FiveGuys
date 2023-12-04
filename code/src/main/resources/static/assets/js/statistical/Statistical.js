let app_statistical = angular.module("statistical", []);

app_statistical.controller("statistical-ctrl", function ($scope, $http, $timeout, $document, $filter) {

    const api = "http://localhost:8080/statistical";
    // tổng tiền trong  tháng
    $scope.getSum = function () {
        $http.get(api).then(function (rest) {
            $scope.getsum = rest.data;
        })
    }
    $scope.getSum();
    // Tỉ lệ tổng tiền trong  tháng
    $scope.getSum1 = function () {
        $http.get(api + "/he").then(function (rest) {
            $scope.getsum1 = rest.data;
        })
    }
    $scope.getSum1();
// tổng hóa đơn trong  ngày
    $scope.getCodeDay = function () {
        $http.get(api + "/count-day").then(function (rest) {
            $scope.getcodeday = rest.data;
        })
    }
    $scope.getCodeDay();

    // Tỉ lệ tổng hóa đơn trong  ngày
    $scope.getCodeDayTiLe = function () {
        $http.get(api + "/tile-day").then(function (rest) {
            $scope.getcodedaytile = rest.data;
        })
    }
    $scope.getCodeDayTiLe();


    $scope.getAllList = function () {
        $http.get(api + "/get-all-list").then(function (getall) {
            $scope.getalllist = getall.data;
        })
    }
    $scope.getAllList();
    //Tổng khách hàng trong 1 năm
    $scope.listCustomerYear = function () {
        $http.get(api + "/list-customer-year").then(function (getall) {
            $scope.listcustomeryear = getall.data;
        })
    }
    $scope.listCustomerYear();

    //Tổng khách hàng trong 1 năm
    $scope.listCustomerDay = function () {
        var today = new Date().getDate();

        $http.get(api + "/list-customer-day/" + `${today}`, today).then(function (getall) {
            $scope.listcustomerday = getall.data;
        })
        $http.get(api + "/list-customer-day/" + `${today - 1}`, today).then(function (getall1) {
            $scope.listcustomerday1 = getall1.data;
        })
        $http.get(api + "/list-customer-day/" + `${today - 2}`, today).then(function (getall2) {
            $scope.listcustomerday2 = getall2.data;
        })
        $http.get(api + "/list-customer-day/" + `${today - 3}`, today).then(function (getall3) {
            $scope.listcustomerday3 = getall3.data;
        })
        $http.get(api + "/list-customer-day/" + `${today - 4}`, today).then(function (getall4) {
            $scope.listcustomerday4 = getall4.data;
        })
        $http.get(api + "/list-customer-day/" + `${today - 5}`, today).then(function (getall5) {
            $scope.listcustomerday5 = getall5.data;
        })
        $http.get(api + "/list-customer-day/" + `${today - 6}`, today).then(function (getall6) {
            $scope.listcustomerday6 = getall6.data;
            renderChart();
        })

    }

    function renderChart() {
        // let todayhi = new Date();
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate()+1);
        $scope.formattedDate = $filter('date')(yesterday, 'yyyy/MM/dd')
        let yesterday1 = new Date();
        yesterday1.setDate(yesterday1.getDate());
        $scope.formattedDate1 = $filter('date')(yesterday1, 'yyyy/MM/dd')
        let yesterday2 = new Date();
        yesterday2.setDate(yesterday2.getDate()-1);
        $scope.formattedDate2 = $filter('date')(yesterday2, 'yyyy/MM/dd')
        let yesterday3 = new Date();
        yesterday3.setDate(yesterday3.getDate()-2);
        $scope.formattedDate3 = $filter('date')(yesterday3, 'yyyy/MM/dd')
        let yesterday4 = new Date();
        yesterday4.setDate(yesterday4.getDate()-3);
        $scope.formattedDate4 = $filter('date')(yesterday4, 'yyyy/MM/dd')
        let yesterday5 = new Date();
        yesterday5.setDate(yesterday5.getDate()-4);
        $scope.formattedDate5 = $filter('date')(yesterday5, 'yyyy/MM/dd')
        let yesterday6 = new Date();
        yesterday6.setDate(yesterday6.getDate()-5);
        $scope.formattedDate6 = $filter('date')(yesterday6, 'yyyy/MM/dd')
    console.log($scope.formattedDate)

        new ApexCharts(document.querySelector("#reportsChart"), {
            series: [{
                name: 'Sales',
                data: [100, 20, 28, 51, 42, 82, 56],
            }, {
                name: 'Revenue',
                data: [11, 32, 45, 32, 34, 52, 41]
            }, {
                name: 'Customers',
                // data: [$scope.listcustomerday6, $scope.listcustomerday5, $scope.listcustomerday4, $scope.listcustomerday3, $scope.listcustomerday2, $scope.listcustomerday1, $scope.listcustomerday]
                data: [1,2 ,3,3,5,6,7]
            }],
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            markers: {
                size: 4
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                type: 'datetime',
                categories: [$scope.formattedDate6, $scope.formattedDate5, $scope.formattedDate4, $scope.formattedDate3, $scope.formattedDate2, $scope.formattedDate1, $scope.formattedDate]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yyyy'
                },
            }
        }).render();
    };
    angular.element(document).ready(function () {
        $scope.listCustomerDay();
    });
});