
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

        .when("/account", {
            templateUrl: "admin/account.html",
            controller: "account-ctrl"
        })
        .when("/address", {
            templateUrl: "admin/address.html",
            controller: "address-ctrl"
        })
        .when("/customer", {
            templateUrl: "admin/customer.htm",
            controller: "customer-ctrl"
        })
        .when("/employee", {
            templateUrl: "admin/employee_home.html",
            controller: "employee-ctrl"
        })
        .when("/favorite", {
            templateUrl: "admin/favorite.html",
            controller: "favorite-ctrl"
        })
        .when("/rating", {
            templateUrl: "admin/rating.html",
            controller: "rating-ctrl"
        })
        .when("/role", {
            templateUrl: "admin/role.html",
            controller: "role-ctrl"
        })
        .when("/brand", {
            templateUrl: "admin/brand.html",
            controller: "brand-ctrl"
        })
        .when("/category", {
            templateUrl: "admin/category-list.html",
            controller: "category-ctrl"
        })
        .when("/color", {
            templateUrl: "admin/color-list.html",
            controller: "color-ctrl"
        })
        .when("/material", {
            templateUrl: "admin/material-list.html",
            controller: "material-ctrl"
        })
        .when("/voucher", {
            templateUrl: "/Tinh/html/voucher/voucher_home.html",
            controller: "voucher-ctrl"
        })
        .when("/statistical", {
            templateUrl: "/Tinh/html/thongKe.html",
            controller: "statistical-ctrl"
        })



    // <!-- Nguyen -->




    // <!-- Tinh -->


});

// Hieu js

app.controller("statistical-ctrl", function ($scope, $http, $timeout, $document, $filter) {
    $scope.customes = {
        decrease: "decrease",
    };
    const api = "http://localhost:8080/statistical";
    // tổng tiền trong  tháng
    $scope.getSum = function () {
        $http.get(api).then(function (rest) {
            $scope.getsum = rest.data;
        });
    };
    $scope.getSum();
    // Tỉ lệ tổng tiền trong  tháng
    $scope.getSum1 = function () {
        $http.get(api + "/he").then(function (rest) {
            $scope.getsum1 = rest.data;
        });
    };
    $scope.getSum1();
    // tổng hóa đơn trong  ngày
    $scope.getCodeDay = function () {
        $http.get(api + "/count-day").then(function (rest) {
            $scope.getcodeday = rest.data;
        });
    };
    $scope.getCodeDay();

    // Tỉ lệ tổng hóa đơn trong  ngày
    $scope.getCodeDayTiLe = function () {
        $http.get(api + "/tile-day").then(function (rest) {
            $scope.getcodedaytile = rest.data;
        });
    };
    $scope.getCodeDayTiLe();

    // get all table bill
    $scope.getAllBillList = function () {
        $http.get(api + "/get-all-list").then(function (getall) {
            $scope.getallbilllist = getall.data;
        });
    };
    $scope.getAllBillList();
    //Tổng khách hàng trong 1 năm
    $scope.listCustomerYear = function () {
        $http.get(api + "/list-customer-year").then(function (getall) {
            $scope.listcustomeryear = getall.data;
        });
    };
    $scope.listCustomerYearTile = function () {
        $http.get(api + "/list-customer-year-tile").then(function (getall) {
            $scope.listcustomeryeartile = getall.data;
        });
    };
    $scope.listCustomerYearTile();
    $scope.listCustomerYear();
    // $scope.ValidateCustomes =function (){
    //     let h1 = $scope.listCustomerYear();
    //     let h2 = $scope.listCustomerYearTile();
    //     if(h1>h2){
    //        $scope.customes.decrease = "increase";
    //        console.log($scope.customes.decrease);
    //     }
    // }
    // $scope.ValidateCustomes();

    // top 5 Bán chạy
    $scope.TopBanChay = function () {
        $http.get(api + "/top5-ban-chay").then((data) => {
            $scope.topbanchay = data.data;
        });
    };
    $scope.TopBanChay();

    // top 5 Bán chạy theo ngay
    $scope.TopBanChayDate = function () {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        $http
            .get(api + "/top5-ban-chay-date/" + `${todayfomat}`, todayfomat)
            .then((data) => {
                $scope.topbanchaydate = data.data;
                console.log($scope.topbanchaydate);
            });
    };
    $scope.TopBanChayDate();

    //Sơ đồ thống kê --------------------------------------------------------
    //Tổng khách hàng trong 1 năm
    $scope.listCustomerDay = function () {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        var today1 = new Date();
        today1.setDate(today1.getDate() - 1);
        let today1fomat = $filter("date")(today1, "yyyy-MM-dd");
        var today2 = new Date();
        today2.setDate(today2.getDate() - 2);
        let today2fomat = $filter("date")(today2, "yyyy-MM-dd");
        var today3 = new Date();
        today3.setDate(today3.getDate() - 3);
        let today3fomat = $filter("date")(today3, "yyyy-MM-dd");
        var today4 = new Date();
        today4.setDate(today4.getDate() - 4);
        let today4fomat = $filter("date")(today4, "yyyy-MM-dd");
        var today5 = new Date();
        today5.setDate(today5.getDate() - 5);
        let today5fomat = $filter("date")(today5, "yyyy-MM-dd");
        var today6 = new Date();
        today6.setDate(today6.getDate() - 6);
        let today6fomat = $filter("date")(today6, "yyyy-MM-dd");
        //list customes--------------------------------------
        $http
            .get(api + "/list-customer-day/" + `${todayfomat}`, todayfomat)
            .then(function (getall) {
                $scope.listcustomerday = getall.data;
            });
        $http
            .get(api + "/list-customer-day/" + `${today1fomat}`, today1fomat)
            .then(function (getall1) {
                $scope.listcustomerday1 = getall1.data;
            });
        $http
            .get(api + "/list-customer-day/" + `${today2fomat}`, today2fomat)
            .then(function (getall2) {
                $scope.listcustomerday2 = getall2.data;
            });
        $http
            .get(api + "/list-customer-day/" + `${today3fomat}`, today3fomat)
            .then(function (getall3) {
                $scope.listcustomerday3 = getall3.data;
            });
        $http
            .get(api + "/list-customer-day/" + `${today4fomat}`, today4fomat)
            .then(function (getall4) {
                $scope.listcustomerday4 = getall4.data;
            });
        $http
            .get(api + "/list-customer-day/" + `${today5fomat}`, today5fomat)
            .then(function (getall5) {
                $scope.listcustomerday5 = getall5.data;
            });
        $http
            .get(api + "/list-customer-day/" + `${today6fomat}`, today6fomat)
            .then(function (getall6) {
                $scope.listcustomerday6 = getall6.data;
            });

        //List bill--------------------------------------------------------
        $http
            .get(api + "/list-bill-day/" + `${todayfomat}`, todayfomat)
            .then(function (getbill) {
                $scope.listbillday = getbill.data;
            });
        $http
            .get(api + "/list-bill-day/" + `${today1fomat}`, today1fomat)
            .then(function (getbill1) {
                $scope.listbillday1 = getbill1.data;
            });
        $http
            .get(api + "/list-bill-day/" + `${today2fomat}`, today2fomat)
            .then(function (getbill2) {
                $scope.listbillday2 = getbill2.data;
            });
        $http
            .get(api + "/list-bill-day/" + `${today3fomat}`, today3fomat)
            .then(function (getbill3) {
                $scope.listbillday3 = getbill3.data;
            });
        $http
            .get(api + "/list-bill-day/" + `${today4fomat}`, today4fomat)
            .then(function (getbill4) {
                $scope.listbillday4 = getbill4.data;
            });
        $http
            .get(api + "/list-bill-day/" + `${today5fomat}`, today5fomat)
            .then(function (getbill5) {
                $scope.listbillday5 = getbill5.data;
            });
        $http
            .get(api + "/list-bill-day/" + `${today6fomat}`, today6fomat)
            .then(function (getbill6) {
                $scope.listbillday6 = getbill6.data;
            });
        //List Doanh thu--------------------------------------------------------
        $http
            .get(api + "/list-doanhthu-day/" + `${todayfomat}`, todayfomat)
            .then(function (getbill) {
                $scope.listdoanhthuday = getbill.data;
            });
        $http
            .get(api + "/list-doanhthu-day/" + `${today1fomat}`, today1fomat)
            .then(function (getbill1) {
                $scope.listdoanhthuday1 = getbill1.data;
            });
        $http
            .get(api + "/list-doanhthu-day/" + `${today2fomat}`, today2fomat)
            .then(function (getbill2) {
                $scope.listdoanhthuday2 = getbill2.data;
            });
        $http
            .get(api + "/list-doanhthu-day/" + `${today3fomat}`, today3fomat)
            .then(function (getbill3) {
                $scope.listdoanhthuday3 = getbill3.data;
            });
        $http
            .get(api + "/list-doanhthu-day/" + `${today4fomat}`, today4fomat)
            .then(function (getbill4) {
                $scope.listdoanhthuday4 = getbill4.data;
            });
        $http
            .get(api + "/list-doanhthu-day/" + `${today5fomat}`, today5fomat)
            .then(function (getbill5) {
                $scope.listdoanhthuday5 = getbill5.data;
            });
        $http
            .get(api + "/list-doanhthu-day/" + `${today6fomat}`, today6fomat)
            .then(function (getbill6) {
                $scope.listdoanhthuday6 = getbill6.data;
                renderChart();
            });
    };

    function renderChart() {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        $scope.formattedDateTomorrow = $filter("date")(tomorrow, "yyyy-MM-dd");
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate());
        $scope.formattedDate = $filter("date")(yesterday, "yyyy-MM-dd");
        let yesterday1 = new Date();
        yesterday1.setDate(yesterday1.getDate() - 1);
        $scope.formattedDate1 = $filter("date")(yesterday1, "yyyy-MM-dd");
        let yesterday2 = new Date();
        yesterday2.setDate(yesterday2.getDate() - 2);
        $scope.formattedDate2 = $filter("date")(yesterday2, "yyyy-MM-dd");
        let yesterday3 = new Date();
        yesterday3.setDate(yesterday3.getDate() - 3);
        $scope.formattedDate3 = $filter("date")(yesterday3, "yyyy-MM-dd");
        let yesterday4 = new Date();
        yesterday4.setDate(yesterday4.getDate() - 4);
        $scope.formattedDate4 = $filter("date")(yesterday4, "yyyy-MM-dd");
        let yesterday5 = new Date();
        yesterday5.setDate(yesterday5.getDate() - 5);
        $scope.formattedDate5 = $filter("date")(yesterday5, "yyyy-MM-dd");
        let yesterday6 = new Date();
        yesterday6.setDate(yesterday6.getDate() - 6);
        $scope.formattedDate6 = $filter("date")(yesterday6, "yyyy-MM-dd");
        new ApexCharts(document.querySelector("#reportsChart"), {
            series: [
                {
                    name: "Sales",
                    data: [
                        $scope.listbillday6,
                        $scope.listbillday5,
                        $scope.listbillday4,
                        $scope.listbillday3,
                        $scope.listbillday2,
                        $scope.listbillday1,
                        $scope.listbillday,
                    ],
                },
                {
                    name: "Revenue",
                    data: [
                        $scope.listdoanhthuday6,
                        $scope.listdoanhthuday5,
                        $scope.listdoanhthuday4,
                        $scope.listdoanhthuday3,
                        $scope.listdoanhthuday2,
                        $scope.listdoanhthuday1,
                        $scope.listdoanhthuday,
                    ],
                },
                {
                    name: "Customers",
                    data: [
                        $scope.listcustomerday6,
                        $scope.listcustomerday5,
                        $scope.listcustomerday4,
                        $scope.listcustomerday3,
                        $scope.listcustomerday2,
                        $scope.listcustomerday1,
                        $scope.listcustomerday,
                    ],
                },
            ],
            chart: {
                height: 350,
                type: "area",
                toolbar: {
                    show: false,
                },
            },
            markers: {
                size: 4,
            },
            colors: ["#4154f1", "#2eca6a", "#ff771d"],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            xaxis: {
                type: "datetime",
                categories: [
                    $scope.formattedDate6,
                    $scope.formattedDate5,
                    $scope.formattedDate4,
                    $scope.formattedDate3,
                    $scope.formattedDate2,
                    $scope.formattedDate1,
                    $scope.formattedDate,
                    $scope.formattedDateTomorrow,
                ],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yyyy",
                },
            },
        }).render();
    }

    angular.element(document).ready(function () {
        $scope.listCustomerDay();
    });

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    // function hi(){
    //     echarts.init(document.querySelector("#reportsChart"), {
    //         tooltip: {
    //             trigger: 'item'
    //         },
    //         legend: {
    //             top: '5%',
    //             left: 'center'
    //         },
    //         series: [{
    //             name: 'Access From',
    //             type: 'pie',
    //             radius: ['40%', '70%'],
    //             avoidLabelOverlap: false,
    //             label: {
    //                 show: false,
    //                 position: 'center'
    //             },
    //             emphasis: {
    //                 label: {
    //                     show: true,
    //                     fontSize: '18',
    //                     fontWeight: 'bold'
    //                 }
    //             },
    //             labelLine: {
    //                 show: false
    //             },
    //             data: [{
    //                 value: 48,
    //                 name: 'áo so mi 1'
    //             },
    //                 {
    //                     value: 735,
    //                     name: 'Direct'
    //                 },
    //                 {
    //                     value: 580,
    //                     name: 'Email'
    //                 },
    //                 {
    //                     value: 484,
    //                     name: 'Union Ads'
    //                 },
    //                 {
    //                     value: 300,
    //                     name: 'Video Ads'
    //                 }
    //             ]
    //         }]
    //     });
    // }
    $scope.trafficChart = function () {
        echarts.init(document.querySelector("#trafficChart")).setOption({
            tooltip: {
                trigger: "item",
            },
            legend: {
                top: "5%",
                left: "center",
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: ["40%", "70%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "18",
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: 48,
                            name: "áo so mi 1",
                        },
                        // {
                        //     value: 735,
                        //     name: 'Direct'
                        // },
                        // {
                        //     value: 580,
                        //     name: 'Email'
                        // },
                        // {
                        //     value: 484,
                        //     name: 'Union Ads'
                        // },
                        // {
                        //     value: 300,
                        //     name: 'Video Ads'
                        // },
                        // {
                        //     value: 150,
                        //     name: 'tinh'
                        // },
                        // {
                        //     value: 150,
                        //     name: 'tinhdd'
                        // }
                    ],
                },
            ],
        });
    };
    $scope.trafficChart();

    // Phan trang all bill
    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            if ($scope.getallbilllist) {
                return $scope.getallbilllist.slice(start, start + this.size);
            }
        },
        get count() {
            if ($scope.getallbilllist) {
                return Math.ceil((1.0 * $scope.getallbilllist.length) / this.size);
            }
        },
        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        },
    };
}
);

app.controller("voucher-list-controller", function ($scope, $http, $timeout) {
    const apiUrlVoucher = "http://localhost:8080/api/voucher";
    const apiUrlAccount = "http://localhost:8080/account";
    $scope.voucher = [];
    $scope.formUpdate = {};
    $scope.formShow = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.hihi = {};

    $scope.label1 = {
        update: "Thêm",
    };
    $scope.button = {};

    $scope.showSuccessMessage = function (message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function () {
            $scope.showAlert = false;
        }, 3000);
    };

    $scope.closeAlert = function () {
        $scope.showAlert = false;
    };

    $scope.getAll = function () {
        $http.get(apiUrlVoucher).then(function (response) {
            $scope.listVoucher = response.data;
        });
    };
    $scope.getAll();

    // getById Voucher
    $scope.getById = function (item) {
        $http.get(`/api/voucher/${item.id}`).then(function (response) {
            $scope.listVoucher = response.data;
            console.log(item.id);
        });
    };

    //Khai báo status voucher
    $scope.statusOptions = [
        { value: 0, label: "CHUA_HOAT_DONG" },
        { value: 1, label: "DANG_HOAT_DONG" },
        { value: 2, label: "HET_KHUYEN_MAI" },
        { value: 3, label: "HET_HAN" },
        { value: 4, label: "DA_XOA" },
    ];

    //detail Voucher
    $scope.edit = function (voucher) {
        $scope.formInput = angular.copy(voucher);
        $scope.formInput.valid_form = new Date(voucher.valid_form);
        $scope.formInput.valid_until = new Date(voucher.valid_until); // Hoặc là giá trị ngày mặc định của bạn
        $scope.formInput.startDate = new Date(voucher.startDate);
        $scope.formInput.endDate = new Date(voucher.endDate);
        $scope.label1.update = "Sửa";
        document.getElementById("myButton").style.display = "none";
    };

    //detail voucher chi tiết
    $scope.show = function (employee) {
        $scope.formShow = angular.copy(employee);
        $scope.formShow.valid_form = new Date(employee.valid_form);
        $scope.formShow.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    };

    // create Employee
    $scope.addVoucher = function (newVoucher) {
        let item = angular.copy($scope.formInput);
        var isDuplicate = item.code.includes(newVoucher);
        if (isDuplicate) {
            $scope.hihi = " ma trung";
        } else {
            $http
                .post("/api/voucher", item)
                .then(function (resp) {
                    $scope.showSuccessMessage("Create Voucher Successfully");
                    $scope.resetFormInput();
                    $scope.getAll();
                })
                .catch(function (error) {
                    console.log("Error", error);
                });
        }
    };
    // update Voucher
    $scope.updateVoucher = function () {
        let item = angular.copy($scope.formInput);
        console.log(item);
        $http
            .put(`/api/voucher/${item.id}`, item)
            .then(function (resp) {
                $scope.showSuccessMessage("Update Voucher successfully");
                $scope.resetFormInput();
                $scope.getAll();
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };

    //delete update status Employee
    $scope.updateStatusVoucher = function (item) {
        console.log(item);
        $http.put(`/api/voucher/delete/${item.id}`, item).then(function (resp) {
            $scope.getAll();
            // $scope.getAllStatusDangLam();
            console.log(item.id);
        });
    };

    //submit add and update
    $scope.submit = function () {
        if ($scope.formInput.id == true) {
            $scope.updateVoucher();
        } else {
            $scope.addVoucher();
        }
    };

    //rest form
    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.addformVoucher.$setPristine();
        $scope.addformVoucher.$setUntouched();
        $scope.label1.update = "Thêm";
        document.getElementById("myButton").style.display = "block";
    };

    $scope.showSuccessMessage = function (message) {
        $scope.alertMessage = message;
        $scope.showAlert = true;
        $timeout(function () {
            $scope.closeAlert();
        }, 3000);
    };
    $scope.closeAlert = function () {
        $scope.showAlert = false;
    };

    //validate endDate >= startDate
    $scope.validateDate = function () {
        let item = angular.copy($scope.formInput);
        if (item.startDate && item.endDate) {
            var startDateObj = new Date(item.startDate);
            var endDateObj = new Date(item.endDate);

            if (startDateObj >= endDateObj) {
                $scope.endDateError = true;
            } else {
                $scope.endDateError = false;
            }
        }
    };

    //Add voucher Bằng file excel
    $scope.insertExcelVoucher = function (files) {
        var reader = new FileReader();
        reader.onloadend = async () => {
            var workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(reader.result);
            const worksheet = workbook.getWorksheet("Sheet1");
            worksheet.eachRow((row, index) => {
                if (index > 1) {
                    //import bigdecimel
                    var bigDecimalValue = new Big(row.getCell(3).value);
                    var bigDecimalMinimumTotalAmount = new Big(row.getCell(5).value);
                    //import date
                    var startdate1 = new Date(row.getCell(7).value);
                    var enddate1 = new Date(row.getCell(8).value);
                    let voucher = {
                        code: row.getCell(1).value,
                        name: row.getCell(2).value,
                        value: bigDecimalValue,
                        valueType: row.getCell(4).value,
                        minimumTotalAmount: bigDecimalMinimumTotalAmount,
                        // +row import thành int
                        quantity: +row.getCell(6).value,
                        startDate: startdate1,
                        endDate: enddate1,
                        describe: row.getCell(9).value,
                    };
                    $http.post("/api/voucher", voucher).then((resp) => {
                        alert("Add Voucher successfully");
                        $scope.getAll();
                        console.log("success", resp.data);
                    });
                }
            });
        };
        reader.readAsArrayBuffer(files[0]);
    };
    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    // Phan trang
    $scope.paper = {
        page: 0,
        size: 7,
        get items() {
            let start = this.page * this.size;
            if ($scope.listVoucher) {
                return $scope.listVoucher.slice(start, start + this.size);
            }
        },
        get count() {
            if ($scope.listVoucher) {
                return Math.ceil((1.0 * $scope.listVoucher.length) / this.size);
            }
        },
        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        },
    };
});

app.controller("brand-ctrl", function ($scope, $http, $timeout) {
    $scope.originalbrand = [];
    $scope.brand = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

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
            $scope.brand = $scope.originalBrand.filter(function (item) {
                if (item && item.name) {
                    return item.name.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalBrand
            $scope.brand = angular.copy($scope.originalBrand);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/brand").then(function (resp) {
            $scope.originalBrand = resp.data; // Lưu dữ liệu gốc
            $scope.brand = angular.copy($scope.originalBrand); // Sao chép dữ liệu gốc sang mảng hiển thị
        });
    }

    $scope.initialize();

    $scope.edit = function (brand) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(brand);
        } else {
            $scope.formUpdate = angular.copy(brand);
            $scope.formUpdate.updatedAt = new Date();
        }
    }


    // $scope.create = function () {
    //     let item = angular.copy($scope.formInput);
    //     item.createdAt = $scope.currentDate;
    //     $http.post("/brand", item).then(function (resp) {
    //         $scope.showSuccessMessage("Create brand successfully");
    //         $scope.resetFormInput();
    //         $scope.initialize();
    //         $('#modalAdd').modal('hide');
    //     }).catch(function (error) {
    //         console.log("Error", error);
    //     });
    // }
    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/brand", item).then(function (resp) {
            $scope.showSuccessMessage("Create brand successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            if (error.status === 400 && error.data === 'Name already exists') {
                $scope.nameExists = true;
            } else {
                console.log("Error", error);
            }
        });
    };


    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item)
        item.updatedAt = $scope.currentDate;
        $http.put(`/brand/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update Brand successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            if (error.status === 400 && error.data === 'Name already exists') {
                $scope.nameExists = true;
            } else {
                console.log("Error", error);
            }
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/brand/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Brand successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateBrand.$setPristine();
        $scope.formUpdateBrand.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateBrand.$setPristine();
        $scope.formCreateBrand.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.brand.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.brand.length / this.size);
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
app.controller("size-ctrl", function ($scope, $http, $timeout) {

    const apiUrlSize = "http://localhost:8080/api/size"

    $scope.sizes = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
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
    $scope.initialize = function () {
        $http.get(apiUrlSize + "/page").then(resp => {
            $scope.sizes = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

    $scope.edit = function (cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlSize, item).then(resp => {
            $scope.showSuccessMessage("Create size successfully!")
            $scope.initialize();
            $('#modalAdd').modal('hide');
            $scope.resetFormInput();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`${apiUrlSize}/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update size successfully!")
            $scope.initialize();
            $('#modalUpdate').modal('hide');
            $scope.resetFormUpdate();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function (item) {
        $http.delete(`${apiUrlSize}/${item.id}`).then(resp => {
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
        $currentPage = page
        page = page - 1;
        $http.get(apiUrlSize + "/page?page=" + page)
            .then(function (response) {
                $scope.sizes = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }

});

app.controller("material-ctrl", function ($scope, $http, $timeout) {

    const apiUrlMaterial = "http://localhost:8080/api/material"

    $scope.materials = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
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
    $scope.initialize = function () {
        $http.get(apiUrlMaterial + "/page").then(resp => {
            $scope.materials = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

    $scope.edit = function (cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlMaterial, item).then(resp => {
            $scope.showSuccessMessage("Create material successfully!")
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`${apiUrlMaterial}/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update material successfully!")
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function (item) {
        $http.delete(`${apiUrlMaterial}/${item.id}`).then(resp => {
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

    // //ham lay tat ca san pham co phan trang
    // $scope.getProduct = function () {
    //     $http.get(apiUrlProduct + "/page")
    //         .then(function (response) {
    //             $scope.products = response.data.content;
    //             $scope.totalPages = response.data.totalPages;
    //         });
    // }
    // $scope.getProduct();

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
        $http.get(apiUrlMaterial + "/page?page=" + page)
            .then(function (response) {
                console.log(response)
                $scope.materials = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }

    //tao doi tuong
    // const getProduct = function () {
    //     return {
    //         "name": $scope.name,
    //         "collar": $scope.collar,
    //         "wrist": $scope.wrist,
    //         "describe": $scope.describe,
    //         "brand": $scope.brand,
    //         "material": {
    //             id: $scope.idMaterial,
    //         },
    //         "material": {
    //             id: $scope.idMaterial,
    //         },
    //     }
    // }


});

app.controller("color-ctrl", function ($scope, $http, $timeout) {

    const apiUrlColor = "http://localhost:8080/api/color"

    $scope.colors = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
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
    $scope.initialize = function () {
        $http.get(apiUrlColor + "/page").then(resp => {
            $scope.colors = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

    $scope.edit = function (cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlColor, item).then(resp => {
            $scope.showSuccessMessage("Create color successfully!")
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`${apiUrlColor}/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update color successfully!")
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function (item) {
        $http.delete(`${apiUrlColor}/${item.id}`).then(resp => {
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

    // //ham lay tat ca san pham co phan trang
    // $scope.getProduct = function () {
    //     $http.get(apiUrlProduct + "/page")
    //         .then(function (response) {
    //             $scope.products = response.data.content;
    //             $scope.totalPages = response.data.totalPages;
    //         });
    // }
    // $scope.getProduct();

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
        $http.get(apiUrlColor + "/page?page=" + page)
            .then(function (response) {
                console.log(response)
                $scope.colors = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }

    //tao doi tuong
    // const getProduct = function () {
    //     return {
    //         "name": $scope.name,
    //         "collar": $scope.collar,
    //         "wrist": $scope.wrist,
    //         "describe": $scope.describe,
    //         "brand": $scope.brand,
    //         "color": {
    //             id: $scope.idColor,
    //         },
    //         "material": {
    //             id: $scope.idMaterial,
    //         },
    //     }
    // }


});

app.controller("category-ctrl", function ($scope, $http, $timeout) {

    const apiUrlCategory = "http://localhost:8080/api/category"

    $scope.categories = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
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
    $scope.initialize = function () {
        $http.get(apiUrlCategory + "/page").then(resp => {
            $scope.categories = resp.data.content;
            $scope.totalPages = resp.data.totalPages
        });
    }
    $scope.initialize();

    $scope.edit = function (cate) {
        $scope.formUpdate = angular.copy(cate);
    }
    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        $http.post(apiUrlCategory, item).then(resp => {
            $scope.showSuccessMessage("Create category successfully!")
            $scope.initialize();
            $('#modalAdd').modal('hide');
            $scope.resetFormInput();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`${apiUrlCategory}/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update category successfully!")
            $scope.initialize();
            $('#modalUpdate').modal('hide');
            $scope.resetFormUpdate();
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function (item) {
        $http.delete(`${apiUrlCategory}/${item.id}`).then(resp => {
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
        $currentPage = page
        page = page - 1;
        $http.get(apiUrlCategory + "/page?page=" + page)
            .then(function (response) {
                $scope.categories = response.data.content;
                $scope.totalPage = response.data.totalPages
            });
    }
});

app.controller("favorite-ctrl", function ($scope, $http, $timeout) {
    $scope.originalFavorite = [];
    $scope.favorite = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

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
            $scope.favorite = $scope.originalFavorite.filter(function (item) {
                if (item && item.content) {
                    return item.content.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalFavorite
            $scope.favorite = angular.copy($scope.originalFavorite);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/favorite").then(function (resp) {
            $scope.originalFavorite = resp.data;
            $scope.favorite = angular.copy($scope.originalFavorite);
        });
    };

    $scope.initialize();

    $scope.loadCustomers = function () {
        $http.get("/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

    $scope.loadProductDetails = function () {
        $http.get("/api/productDetail") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.productDetails = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading productDetails", error);
            });
    }

    $scope.loadProductDetails();

    $scope.edit = function (favorite) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(favorite);
        } else {
            $scope.formUpdate = angular.copy(favorite);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        item.createdAt = $scope.currentDate;
        $http.post("/favorite", item).then(function (resp) {
            $scope.showSuccessMessage("Create favorite successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item);
        item.updatedAt = $scope.currentDate;

        $http.put(`/favorite/${item.id}`, item)
            .then(function (resp) {
                $scope.showSuccessMessage("Update Favorite successfully");
                $scope.resetFormUpdate();
                $scope.initialize();
                $('#modalUpdate').modal('hide');
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };

    $scope.delete = function (item) {
        $http.delete(`/favorite/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Favorite successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateFavorite.$setPristine();
        $scope.formUpdateFavorite.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateFavorite.$setPristine();
        $scope.formCreateFavorite.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.favorite.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.favorite.length / this.size);
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
app.controller("rating-ctrl", function ($scope, $http, $timeout) {
    $scope.originalRating = [];
    $scope.rating = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

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
            $scope.rating = $scope.originalRating.filter(function (item) {
                if (item && item.content) {
                    return item.content.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalRating
            $scope.rating = angular.copy($scope.originalRating);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/rating").then(function (resp) {
            $scope.originalRating = resp.data;
            $scope.rating = angular.copy($scope.originalRating);
        });
    }


    $scope.initialize();

    $scope.loadCustomers = function () {
        $http.get("/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

    $scope.loadProductDetails = function () {
        $http.get("/api/productDetail") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.productDetails = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading productDetails", error);
            });
    }

    $scope.loadProductDetails();

    $scope.edit = function (rating) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(rating);
        } else {
            $scope.formUpdate = angular.copy(rating);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/rating", item).then(function (resp) {
            $scope.showSuccessMessage("Create rating successfully");
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
        item.updatedAt = $scope.currentDate;
        $http.put(`/rating/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Update rating successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/rating/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete rating successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateRating.$setPristine();
        $scope.formUpdateRating.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateRating.$setPristine();
        $scope.formCreateRating.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.rating.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.rating.length / this.size);
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
app.controller("role-ctrl", function ($scope, $http, $timeout) {
    $scope.originalRole = [];
    $scope.role = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

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
            $scope.role = $scope.originalRole.filter(function (item) {
                if (item && item.fullName) {
                    return item.fullName.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalRole
            $scope.role = angular.copy($scope.originalRole);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/role").then(function (resp) {
            $scope.originalRole = resp.data; // Lưu dữ liệu gốc
            $scope.role = angular.copy($scope.originalRole); // Sao chép dữ liệu gốc sang mảng hiển thị
        });
    }

    $scope.initialize();

    $scope.edit = function (role) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(role);
        } else {
            $scope.formUpdate = angular.copy(role);
            $scope.formUpdate.updatedAt = new Date();
        }
    }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/role", item).then(function (resp) {
            $scope.showSuccessMessage("Create role successfully");
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
        item.updatedAt = $scope.currentDate;
        $http.put(`/role/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update Role successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/role/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Role successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateRole.$setPristine();
        $scope.formUpdateRole.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateRole.$setPristine();
        $scope.formCreateRole.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.role.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.role.length / this.size);
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
app.controller("address-ctrl", function ($scope, $http, $timeout) {
    $scope.originalAddress = [];
    $scope.address = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

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
            $scope.address = $scope.originalAddress.filter(function (item) {
                if (item && item.address) {
                    return item.address.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalAddress
            $scope.address = angular.copy($scope.originalAddress);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };
    $scope.initialize = function () {
        $http.get("/address").then(function (resp) {
            $scope.originalAddress = resp.data;
            $scope.address = angular.copy($scope.originalAddress);
        });
    }

    $scope.initialize();

    // $scope.customers = []; // Khởi tạo danh sách khách hàng

    $scope.loadCustomers = function () {
        $http.get("/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

    $scope.edit = function (address) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(address);
        } else {
            $scope.formUpdate = angular.copy(address);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }
    // $scope.edit = function (address) {
    //     $scope.formUpdate = angular.copy(address);
    // }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        item.address = getResult1();

        $http.post("/address", item).then(function (resp) {
            $scope.showSuccessMessage("Create address successfully");
            $scope.resetFormInput();
            $scope.initialize();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });

    }
    function getResult1() {
        let houseNumber1 = $("#houseNumber1").val();
        let city1 = $("#city1 option:selected").text();
        let district1 = $("#district1 option:selected").text();
        let ward1 = $("#ward1 option:selected").text();

        return houseNumber1 && district1 && city1 && ward1
            ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
            : '';
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item)
        item.updatedAt = $scope.currentDate;
        item.address = getResult2();

        $http.put(`/address/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update address successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }
    function getResult2() {
        let houseNumber2 = $("#houseNumber2").val();
        let city2 = $("#city2 option:selected").text();
        let district2 = $("#district2 option:selected").text();
        let ward2 = $("#ward2 option:selected").text();

        return houseNumber2 && district2 && city2 && ward2
            ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
            : '';
    }

    $scope.delete = function (item) {
        $http.delete(`/address/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete address successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateAddress.$setPristine();
        $scope.formUpdateAddress.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateAddress.$setPristine();
        $scope.formCreateAddress.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.address.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.address.length / this.size);
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

    const host = "https://provinces.open-api.vn/api/";

    var callAPI = (api, callback) => {
        return axios.get(api)
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    // Load city data for the first set of elements
    callAPI(host + '?depth=1', (data) => {
        renderData(data, "city1");
    });

    // Load city data for the second set of elements
    callAPI(host + '?depth=1', (data) => {
        renderData(data, "city2");
    });

    var callApiDistrict = (api, dropdownId) => {
        callAPI(api, (data) => {
            renderData(data.districts, dropdownId);
        });
    }

    var callApiWard = (api, dropdownId) => {
        callAPI(api, (data) => {
            renderData(data.wards, dropdownId);
        });
    }

    var renderData = (array, select) => {
        let row = '<option disable value="">Chọn</option>';
        array.forEach(element => {
            row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
        });
        document.querySelector("#" + select).innerHTML = row;
    }


    $("#city1, #city2").change(function () {
        const dropdownId = $(this).attr("id");
        const districtDropdownId = dropdownId.replace("city", "district");
        const selectedCityId = $(this).find(':selected').data('id');

        // Clear district and ward dropdowns
        $("#" + districtDropdownId).empty().html('<option value="" selected>Chọn quận huyện</option>');

        const wardDropdownId = dropdownId.replace("city", "ward");
        $("#" + wardDropdownId).empty().html('<option value="" selected>Chọn phường xã</option>');

        if (selectedCityId) {
            callApiDistrict(host + "p/" + selectedCityId + "?depth=2", districtDropdownId);
        }
        printResult();
    });

    $("#district1, #district2").change(function () {
        const dropdownId = $(this).attr("id");
        const wardDropdownId = dropdownId.replace("district", "ward");
        const selectedDistrictId = $(this).find(':selected').data('id');

        $("#" + wardDropdownId).empty().html('<option value="" selected>Chọn phường xã</option>');

        if (selectedDistrictId) {
            callApiWard(host + "d/" + selectedDistrictId + "?depth=2", wardDropdownId);
        }
        printResult();
    });

    $("#ward1, #ward2, #houseNumber1, #houseNumber2").on('change input', function () {
        printResult();
    });

    var printResult = () => {
        let houseNumber1 = $("#houseNumber1").val();
        let city1 = $("#city1 option:selected").text();
        let district1 = $("#district1 option:selected").text();
        let ward1 = $("#ward1 option:selected").text();

        let houseNumber2 = $("#houseNumber2").val();
        let city2 = $("#city2 option:selected").text();
        let district2 = $("#district2 option:selected").text();
        let ward2 = $("#ward2 option:selected").text();

        let result1 = houseNumber1 && district1 && city1 && ward1 ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}` : '';
        let result2 = houseNumber2 && district2 && city2 && ward2 ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}` : '';

        $("#inputAddress1").val(result1);
        $("#inputAddress2").val(result2);
    }

    // Initial call when the page loads
    printResult();
});
app.controller("account-ctrl", function ($scope, $http, $timeout) {
    $scope.originalAccount = [];
    $scope.account = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

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
            $scope.account = $scope.originalAccount.filter(function (item) {
                if (item && item.account) {
                    return item.account.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalAccount
            $scope.account = angular.copy($scope.originalAccount);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };
    $scope.initialize = function () {
        $http.get("/account").then(function (resp) {
            $scope.originalAccount = resp.data;
            $scope.account = angular.copy($scope.originalAccount);
        });
    }

    $scope.initialize();

    $scope.loadRoles = function () {
        $http.get("/role")
            .then(function (resp) {
                $scope.roles = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadRoles();

    $scope.edit = function (account) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(account);
        } else {
            $scope.formUpdate = angular.copy(account);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    }
    // $scope.edit = function (account) {
    //     $scope.formUpdate = angular.copy(account);
    // }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        item.password = "fiveguys123";
        item.status = 1;
        $http.post("/account/save", item).then(function (resp) {
            $scope.showSuccessMessage("Thêm tài khoản thành công");
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
        $http.put(`/account/${item.id}`, item).then(function (resp) {

            $scope.showSuccessMessage("Sửa tài khoản thành công");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.delete = function (item) {
        $http.delete(`/account/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Xoá thành công");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateAccount.$setPristine();
        $scope.formUpdateAccount.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateAccount.$setPristine();
        $scope.formCreateAccount.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.account.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.account.length / this.size);
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
app.controller("customer-ctrl", function ($scope, $http, $timeout) {
    $scope.originalCustomer = [];
    $scope.customer = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();
    $scope.showError = false;
    $scope.load = function () { $scope.loading = true }
    $scope.unload = function () { $scope.loading = false }

    imgShow("image", "image-preview");
    imgShow("image-update", "image-preview-update");

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
            $scope.customer = $scope.originalCustomer.filter(function (item) {
                if (item && item.fullName) {
                    return item.fullName.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalCustomer
            $scope.customer = angular.copy($scope.originalCustomer);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.initialize = function () {
        $http.get("/customer").then(function (resp) {
            $scope.originalCustomer = resp.data;
            $scope.customer = angular.copy($scope.originalCustomer);
        });
    }

    $scope.initialize();

    $scope.loadAccounts = function () {
        $http.get("/account/not-in-customer-employee") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.accounts = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading accounts", error);
            });
    }

    $scope.loadAccounts(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy



    // $scope.create = function () {
    //     let item = angular.copy($scope.formInput);
    //     item.createdAt = $scope.currentDate;
    //     $http.post("/customer", item).then(function (resp) {
    //         $scope.showSuccessMessage("Create customer successfully");
    //         $scope.resetFormInput();
    //         $scope.initialize();
    //         $('#modalAdd').modal('hide');
    //     }).catch(function (error) {
    //         console.log("Error", error);
    //     });
    // }
    $scope.create = function () {
        let fileInput = document.getElementById("image");
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        $scope.showErrorImg = function (message) {
            $scope.alertErrorImg = message;
            $scope.showError = true;
        }
        if (!allowedExtensions.exec(fileInput.value)) {
            $scope.showErrorImg("Please upload file having extensions .jpeg/.jpg/.png/.gif only")
            return;
        } else if (fileInput.files.length > 0) {
            let data = new FormData();
            data.append('file', fileInput.files[0]);
            $scope.load();
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(resp => {
                $scope.formInput.avatar = resp.data.name;
                let item = angular.copy($scope.formInput);
                item.createdAt = $scope.currentDate;
                $http.post(`/customer`, item).then(resp => {
                    $scope.showSuccessMessage("Create Custoemr successfully!");
                    $scope.initialize();
                    $scope.resetFormInput();
                    $('#modalAdd').modal('hide');
                    $scope.showError = false;
                    $scope.unload();
                }).catch(error => {
                    console.log("Error", error);
                    $scope.unload();
                    return;
                })
            }).catch(error => {
                console.log("Error", error);
            })
        }
    }

    // $scope.update = function () {
    //     let item = angular.copy($scope.formUpdate);
    //     console.log(item)
    //     $http.put(`/customer/${item.id}`, item).then(function (resp) {
    //         $scope.showSuccessMessage("Update Customer successfully");
    //         $scope.resetFormUpdate();
    //         $scope.initialize();
    //         $('#modalUpdate').modal('hide');
    //     }).catch(function (error) {
    //         console.log("Error", error);
    //     });
    // }

    $scope.apiUpdate = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`/customer/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update Customer successfully!")
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
            $scope.showError = false;
            $scope.unload();
        }).catch(error => {
            console.log("Error", error);
            return;
        })
    }
    $scope.update = function () {
        let fileInput = document.getElementById("image-update");
        if ($scope.formUpdate.avatar.length > 0 && !fileInput.files.length > 0) {
            $scope.apiUpdate();
        } else {
            let data = new FormData();
            data.append('file', fileInput.files[0]);
            $scope.load();
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(resp => {
                $scope.formUpdate.avatar = resp.data.name;
                $scope.apiUpdate();
                $scope.unload();
            }).catch(error => {
                console.log("Error", error);
                $scope.unload();
            })
        }
    }

    $scope.edit = function (customer) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(customer);
        } else {
            $scope.formUpdate = angular.copy(customer);
            $scope.formUpdate.updatedAt = new Date();
        }
    }

    $scope.delete = function (item) {
        $http.delete(`/customer/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete Customer successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        let fileInput = document.getElementById("image-update");
        let imagePreviewUpdate = document.getElementById("image-preview-update")
        imagePreviewUpdate.src = "/assets/img/no-img.png";
        fileInput.value = "";
        fileInput.type = "file";
        $scope.formUpdateCustomer.$setPristine();
        $scope.formUpdateCustomer.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        let fileInput = document.getElementById("image");
        let imagePreview = document.getElementById("image-preview");
        imagePreview.src = "/assets/img/no-img.png";
        fileInput.value = "";
        fileInput.type = "file";
        $scope.formCreateCustomer.$setPristine();
        $scope.formCreateCustomer.$setUntouched();
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.customer.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.customer.length / this.size);
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

    $scope.xuatFile = function () {
        $http.get("/customer/excel").then(function (response) {
            alert("Xuất File Thành Công")
            // $scope.pageEm = response.data.content;
            // $scope.totalPages = response.data.totalPages
        })
    }

});
app.controller("employee-ctrl", function ($scope, $http, $timeout) {
    $scope.originalEmployee = [];
    $scope.employee = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();
    $scope.showAlert = false;
    $scope.showError = false;
    $scope.load = function () { $scope.loading = true }
    $scope.unload = function () { $scope.loading = false }

    imgShow("image", "image-preview");
    imgShow("image-update", "image-preview-update");

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
            $scope.employee = $scope.originalEmployee.filter(function (item) {
                if (item && item.code) {
                    return item.code.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalEmployee
            $scope.employee = angular.copy($scope.originalEmployee);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };
    $scope.initialize = function () {
        $http.get("/employee").then(function (resp) {
            $scope.originalEmployee = resp.data;
            $scope.employee = angular.copy($scope.originalEmployee);
        });
    }


    $scope.initialize();

    $scope.loadAccounts = function () {
        $http.get("/account/not-in-customer-employee")
            .then(function (resp) {
                $scope.accounts = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading accounts", error);
            });
    }

    $scope.loadAccounts();

    // create employee
    $scope.create = function () {
        let fileInput = document.getElementById("image");
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        $scope.showErrorImg = function (message) {
            $scope.alertErrorImg = message;
            $scope.showError = true;
        }
        if (!allowedExtensions.exec(fileInput.value)) {
            $scope.showErrorImg("Please upload file having extensions .jpeg/.jpg/.png/.gif only")
            return;
        } else if (fileInput.files.length > 0) {
            let data = new FormData();
            data.append('file', fileInput.files[0]);
            $scope.load();
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(resp => {
                $scope.formInput.avatar = resp.data.name;
                let item = angular.copy($scope.formInput);
                item.createdAt = $scope.currentDate;
                $http.post(`/employee`, item).then(resp => {
                    $scope.showSuccessMessage("Create Custoemr successfully!");
                    $scope.initialize();
                    $scope.resetFormInput();
                    $('#modalAdd').modal('hide');
                    $scope.showError = false;
                    $scope.unload();
                }).catch(error => {
                    console.log("Error", error);
                    $scope.unload();
                    return;
                })
            }).catch(error => {
                console.log("Error", error);
            })
        }
    }
    // create account
    $scope.createAccount = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        item.active = true;
        $http.post("/account/save", item).then(function (resp) {
            $scope.getRole();
            $scope.resetFormInput();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }
    $scope.getRole = function () {
        $http.get("/account").then(function (resp) {
        });
    }
    $scope.getRole();
    $scope.loadRoles = function () {
        $http.get("/role")
            .then(function (resp) {
                $scope.roles = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }
    $scope.loadRoles();

    //Add employee Bằng file excel
    $scope.insertExcelEmployee = function (files) {
        var reader = new FileReader();
        reader.onloadend = async () => {
            var workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(reader.result);
            const worksheet = workbook.getWorksheet('Sheet1');
            worksheet.eachRow((row, index) => {
                if (index > 1) {
                    //import bigdecimel
                    // var bigDecimalValue = new Big(row.getCell(3).value);
                    // var bigDecimalMinimumTotalAmount = new Big(row.getCell(5).value);
                    //import date
                    var BirthDate = new Date(row.getCell(2).value)
                    var Gender = new Boolean(row.getCell(3).value)
                    let employee = {
                        // code: row.getCell(1).value,
                        fullName: row.getCell(1).value,
                        birthDate: BirthDate,
                        gender: Gender,
                        address: row.getCell(4).value,
                    }
                    $http.post("/employee", employee).then(resp => {
                        alert("Add Employee successfully")
                        $scope.initialize();
                        console.log("success", resp.data);
                    })
                }
            });
        }
        reader.readAsArrayBuffer(files[0]);
    }

    $scope.apiUpdate = function () {
        let item = angular.copy($scope.formUpdate);
        $http.put(`/employee/${item.id}`, item).then(resp => {
            $scope.showSuccessMessage("Update employee successfully!")
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
            $scope.showError = false;
            $scope.unload();
        }).catch(error => {
            console.log("Error", error);
            return;
        })
    }
    $scope.update = function () {
        let fileInput = document.getElementById("image-update");
        if ($scope.formUpdate.avatar.length > 0 && !fileInput.files.length > 0) {
            $scope.apiUpdate();
        } else {
            let data = new FormData();
            data.append('file', fileInput.files[0]);
            $scope.load();
            $http.post('/rest/upload', data, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(resp => {
                $scope.formUpdate.avatar = resp.data.name;
                $scope.apiUpdate();
                $scope.unload();
            }).catch(error => {
                console.log("Error", error);
                $scope.unload();
            })
        }
    }

    $scope.edit = function (employee) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(employee);
        } else {
            $scope.formUpdate = angular.copy(employee);
            $scope.formUpdate.updatedAt = new Date();
        }
    }

    $scope.delete = function (item) {
        $http.delete(`/employee/${item.id}`).then(function (resp) {
            $scope.showSuccessMessage("Delete employee successfully");
            $scope.initialize();
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        let fileInput = document.getElementById("image-update");
        let imagePreviewUpdate = document.getElementById("image-preview-update")
        imagePreviewUpdate.src = "/assets/img/no-img.png";
        fileInput.value = "";
        fileInput.type = "file";
        $scope.formUpdateEmployee.$setPristine();
        $scope.formUpdateEmployee.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        let fileInput = document.getElementById("image");
        let imagePreview = document.getElementById("image-preview");
        imagePreview.src = "/assets/img/no-img.png";
        fileInput.value = "";
        fileInput.type = "file";
        $scope.formCreateEmployee.$setPristine();
        $scope.formCreateEmployee.$setUntouched();
    }

    $scope.getById = function (item) {
        $http.get(`/api/employee/${item.id}`).then(function (response) {
            $scope.listEm = response.data;
            console.log(item.id);
        })
    }

    // search code employee
    $scope.getByMa = function (item) {
        // console.log(item.id);
        $http.get(`/api/employee/search/${item.id}`).then(function (response) {
            console.log(item.code);
            $scope.listEm = response.data;
            // console.log(item.code);
        })
    }

    //detaol Employee
    $scope.edit = function (employee) {
        $scope.formUpdate = angular.copy(employee);
        $scope.formUpdate.valid_form = new Date(employee.valid_form)
        $scope.formUpdate.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    }
    $scope.show = function (employee) {
        $scope.formShow = angular.copy(employee);
        $scope.formShow.valid_form = new Date(employee.valid_form)
        $scope.formShow.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    }

    //delete or update status Employee
    $scope.updateStatusEmployee = function (item) {
        console.log(item)
        $http.put(`/api/employee/delete/${item.id}`, item).then(function (resp) {
            // $scope.getAll();
            $scope.getAllStatusDangLam();
            console.log(item.id);
        })
    }

    // xuát file danh sách excel Employee
    $scope.xuatFile = function () {
        $http.get("/employee/excel").then(function (response) {
            alert("Xuất File Thành Công")
            // $scope.pageEm = response.data.content;
            // $scope.totalPages = response.data.totalPages
        })
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.employee.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.employee.length / this.size);
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
//end js Hieu

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


//BEGIN NGUYEN PRODUCT
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
                $scope.statusHopLe = true;
                $scope.enableEditForm(true, true);
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


    $scope.update = function (productId) {
        let item = angular.copy($scope.formUpdate);
        // console.log("cc" + item.category)

        if ($scope.checkStatusProductDetail($scope.productDetails, item.status) == false) return;

        $scope.load()
        $http.put(`${apiUrlProduct}/` + productId, item).then(resp => {
            $scope.enableEditForm(true, true);
            $scope.unload()
            $scope.showSuccessNotification("Cập nhật thành công!");
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
            $scope.showSuccessNotification("Sản phẩm đã tự chuyển trạng thái sang ngừng bán");
        }).catch(error => {
            console.log("Error", error);
        })
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
        if (total == 1 && itemStatus == 2 && productStatus == 1) {
            $scope.showSuccessNotification("Trạng thái sản phẩm đã chuyển về ngừng bán")

        } $scope.initialize();
    }

    $scope.updateProductDetail = function (listImage) {
        $scope.formUpdatePd.product = $scope.formUpdate
        let item = angular.copy($scope.formUpdatePd);
        item.product.id = $scope.formUpdate.id
        let productDetailRequest = { productDetail: item, imagesList: listImage };
        console.log(productDetailRequest)
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
                    $scope.formUpdatePd = {}
                    $scope.listImageUpdate = [];
                });
        }).catch(error => {
            console.log("Error", error);
        })
        $scope.unload()
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
            createdAt: "",
            createdBy: "",
            describe: "",
            status: ""
        }
        let heading = [["ID", "Mã", "Tên SP", "Cổ áo", "Tay áo", "Loại", "Chất liệu", "Thương hiệu", "Ngày tạo", "Người tạo", "Mô tả", "Trạng thái"]]

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
            formData.createdAt = new Date(item.createdAt).getDay() + "/" + (new Date(item.createdAt).getMonth() + 1) + "/" + new Date(item.createdAt).getFullYear()
            formData.createdBy = item.createdBy
            formData.describe = item.describe
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



    $scope.insertExcelProduct = function (files) {
        var reader = new FileReader();
        reader.onloadend = async () => {
            var workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(reader.result);
            const worksheet = workbook.getWorksheet("Sheet1");
            worksheet.eachRow((row, index) => {
                if (index > 1) {
                    //import bigdecimel
                    var bigDecimalValue = new Big(row.getCell(3).value);
                    var bigDecimalMinimumTotalAmount = new Big(row.getCell(5).value);
                    //import date
                    var startdate1 = new Date(row.getCell(7).value);
                    var enddate1 = new Date(row.getCell(8).value);
                    let voucher = {
                        code: row.getCell(1).value,
                        name: row.getCell(2).value,
                        value: bigDecimalValue,
                        valueType: row.getCell(4).value,
                        minimumTotalAmount: bigDecimalMinimumTotalAmount,
                        // +row import thành int
                        quantity: +row.getCell(6).value,
                        startDate: startdate1,
                        endDate: enddate1,
                        describe: row.getCell(9).value,
                    };
                    $http.post("/api/voucher", voucher).then((resp) => {
                        alert("Add Voucher successfully");
                        $scope.getAll();
                        console.log("success", resp.data);
                    });
                }
            });
        };
        reader.readAsArrayBuffer(files[0]);
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
    $scope.filter = function (searchName, fromDateProduct, toDateProduct, filterCategoryId, filterMaterialId, filterBrandId) {
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

        let a = $scope.originalProduct;

        if (searchName != undefined) {
            a = a.filter(function (item) {
                if (item && item.name) {
                    return toLowerCaseNonAccentVietnamese(item.name).includes(toLowerCaseNonAccentVietnamese(searchName));
                }

            });
        }
        if (fromDateProduct != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getDate() >= new Date(fromDateProduct).getDate())
                    && (new Date(item.createdAt).getFullYear() >= new Date(fromDateProduct).getFullYear())
            })
        }
        if (toDateProduct != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getDate() <= new Date(toDateProduct).getDate())
                    && (new Date(item.createdAt).getFullYear() <= new Date(toDateProduct).getFullYear())
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
        $scope.searchName = undefined
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
//END NGUYEN PRODUCT

//BEGIN NGUYEN BILL
app.controller("nguyen-bill-ctrl", function ($scope, $http, $timeout) {
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

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== '') {
            $scope.bill = $scope.originalBill.filter(function (item) {
                // if (item && item.code) {
                return item.code.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                // }
                // return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalBill
            $scope.bill = angular.copy($scope.originalBill);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.filter = function (fromDate, toDate, filterTypeBill, filterStatus) {
        if (fromDate == null) {
            fromDate = undefined
        }
        if (toDate == null) {
            toDate = undefined
        }
        if (filterTypeBill == "" || filterTypeBill == null) {
            filterTypeBill = undefined
        }
        if (filterStatus == "" || filterStatus == null) {
            filterStatus = undefined
        }

        let a = $scope.originalBill;

        if (fromDate != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getDate() >= new Date(fromDate).getDate())
                    && (new Date(item.createdAt).getFullYear() >= new Date(fromDate).getFullYear())
            })
        }
        if (toDate != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getDate() <= new Date(toDate).getDate())
                    && (new Date(item.createdAt).getFullYear() >= new Date(toDate).getFullYear())
            })
        }
        if (filterStatus != undefined) {
            a = a.filter(function (item) {
                return item.status == filterStatus
            })
        }
        if (filterTypeBill != undefined) {
            a = a.filter(function (item) {
                return item.typeBill == filterTypeBill
            })
        }
        $scope.bill = a;

        // $scope.bill = $scope.originalBill.filter(function (item) {

        //     // return (item.status == filterStatus) && () 
        //     //nếu thời gian null
        //     // if (fromDate == undefined && toDate == undefined) {
        //     //     if (filterStatus != undefined && filterTypeBill != undefined) {
        //     //         if (item && item.status && item.typeBill) {
        //     //             return (item.status == filterStatus && item.typeBill == filterTypeBill)
        //     //         }
        //     //     }
        //     //     if (filterStatus != undefined && filterTypeBill == undefined) {
        //     //         if (item && item.status) {
        //     //             return (item.status == filterStatus)
        //     //         }
        //     //     }
        //     //     if (filterStatus == undefined && filterTypeBill != undefined) {
        //     //         if (item && item.typeBill) {
        //     //             return (item.typeBill == filterTypeBill)
        //     //         }
        //     //     }
        //     // }

        //     //nếu status va typebill null
        //     // if (filterStatus == undefined && filterTypeBill == undefined) {
        //     //     if (fromDate != undefined && toDate == undefined) {
        //     //         if (item && item.createdAt) {
        //     //             return (new Date(item.createdAt).getDate() >= new Date(fromDate).getDate())
        //     //         }
        //     //     }
        //     //     if (fromDate == undefined && toDate != undefined) {
        //     //         if (item && item.createdAt) {
        //     //             return (new Date(item.createdAt).getDate() <= new Date(toDate).getDate())
        //     //         }
        //     //     }
        //     //     if (fromDate != undefined && toDate != undefined) {
        //     //         if (item && item.createdAt) {
        //     //             return ((new Date(item.createdAt).getDate() >= new Date(fromDate).getDate())
        //     //                 && (new Date(item.createdAt).getDate() <= new Date(toDate).getDate()))
        //     //         }
        //     //     }
        //     // }

        //     //có hoặc ko có cái nào null
        //     // if (filterStatus != undefined || filterTypeBill != undefined
        //     //     || fromDate != undefined || toDate != undefined) {

        //     //     //tất cả khác null
        //     //     if (filterStatus != undefined && filterTypeBill != undefined
        //     //         && fromDate != undefined && toDate != undefined) {
        //     //         if (item && item.typeBill && item.status && item.createdAt) {
        //     //             return ((new Date(item.createdAt).getTime() >= new Date(fromDate).getTime())
        //     //                 && (new Date(item.createdAt).getTime() <= new Date(toDate).getTime()))
        //     //                 && (item.status == filterStatus && item.typeBill == filterTypeBill)
        //     //         }
        //     //     }
        //     // }
        //     return false;
        // });
        $scope.changePageSize();
    };

    $scope.resetFilter = function () {
        $scope.bill = angular.copy($scope.originalBill);
        $scope.typeBill = ""
        $scope.billStatus = ""
        $scope.fromDate = null
        $scope.toDate = null
        $scope.searchKeyword = undefined
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
        $scope.currentStatus = bill.status
        // $scope.showNote(bill.status)
    }

    $scope.exportBill = function () {
        let data = angular.copy($scope.formUpdate)
        $scope.printBill(data)
    }

    $scope.printBill = resp => {
        const invoiceHTML = generateInvoiceHTML(resp);
        const invoiceWindow = window.open('', '_blank');
        invoiceWindow.document.write(invoiceHTML);
        invoiceWindow.document.close();
    }

    // $scope.showNote = function (billStatus) {
    //     var areaNote = document.getElementById("areaNote")
    //     var labelNote = document.getElementById("labelNote")
    //     if(billStatus == 4){
    //         areaNote.style.display = "block"
    //         labelNote.style.display = "block"
    //     }else{
    //         areaNote.style.display = "none"
    //         labelNote.style.display = "none"
    //     }
    //     console.log($scope.formUpdate.status +" - " + $scope.currentStatus)
    //     if(billStatus == 4){
    //         areaNote.disabled = true
    //     }
    //     if($scope.formUpdate.status == 4 && $scope.currentStatus != 4){
    //         areaNote.disabled = false
    //     }else{
    //         areaNote.disabled = true
    //     }
    // }
    // $scope.showNote(1);


    $scope.getInfoBill = function (bill) {
        $scope.tongTien = bill.totalAmount;
        $scope.giamGia = bill.totalAmount - bill.totalAmountAfterDiscount;
        $scope.khachPhaiTra = bill.totalAmountAfterDiscount;
        $scope.khachDaTra = 0

        // console.log(bill.typeBill)
        // console.log(bill.paymentMethod.id)
        if (bill.typeBill === 2 && bill.paymentMethod.id === 3) {
            $scope.khachDaTra = $scope.khachPhaiTra;
        } else if (bill.typeBill === 2 && bill.paymentMethod.id != 3) {
            $scope.khachDaTra = 0;
        } else if (bill.typeBill == 1 &&
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


    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item)
        $http.put(`http://localhost:8080/bills/${item.id}`, item).then(function (resp) {
            $scope.initialize();
            $scope.showSuccessNotification("Cập nhật trạng thái hóa đơn thành công")
            // $('#modalUpdate').modal('hide');
            $scope.loadBillDetail()
            $scope.currentStatus = bill.status
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.updateStatus = function (status, item) {
        console.log("c")
        console.log(status)
        console.log(item)
        $http.put(`http://localhost:8080/bills/status/${item.id}`, status).then(function (resp) {
            // $scope.resetFormUpdate();
            $scope.initialize();
            // $('#modalUpdate').modal('hide');
            $scope.showSuccessNotification("Cập nhật trạng thái hóa đơn thành công")
            $scope.edit(item)
        }).catch(function (error) {
            console.log("Error", error);
        });
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




    const formatCurrency = price => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    const formatDate = dateString => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('vi-VN', options);
    };
    function generateInvoiceHTML(resp) {
        const listBillDT = Object.values($scope.billDetails).map(billDT => `
            <tr>
                <td class="desc">${billDT.productDetail.product.name} ${billDT.productDetail.product.material.name} ${billDT.productDetail.size.name}</td>
                <td class="unit">${billDT.price}</td>
                <td class="qty">${billDT.quantity}</td>
                <td class="total">${formatCurrency(billDT.price * billDT.quantity)}</td>
            </tr>
        `).join('');
        const htmlContent = `<!DOCTYPE html>
    <html>
    <head>
        <style>
            .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }
    
    a {
      color: #5D6975;
      text-decoration: underline;
    }
    
    body {
      position: relative;
      width: 21cm;  
      height: 20cm; 
      margin: 0 auto; 
      color: #001028;
      background: #FFFFFF; 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      font-family: Arial;
    }
    
    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }
    
    #logo {
      text-align: center;
      margin-bottom: 10px;
    }
    
    #logo img {
      width: 90px;
    }
    
    h1 {
      border-top: 1px solid  #5D6975;
      border-bottom: 1px solid  #5D6975;
      color: #5D6975;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      margin: 0 0 20px 0;
      background: #F5F5F5;
    }
    
    #project {
      float: left;
    }
    
    #project span {
      color: #5D6975;
      text-align: right;
      width: 52px;
      margin-right: 10px;
      display: inline-block;
      font-size: 0.8em;
    }
    
    #company {
      float: right;
      text-align: right;
    }
    
    #project div,
    #company div {
      white-space: nowrap;        
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }
    
    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    }
    
    table th,
    table td {
      text-align: center;
    }
    
    table th {
      padding: 5px 20px;
      color: #5D6975;
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;        
      font-weight: normal;
    }
    
    table .service,
    table .desc {
      text-align: left;
    }
    
    table td {
      padding: 20px;
      text-align: right;
    }
    
    table td.service,
    table td.desc {
      vertical-align: top;
    }
    
    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }
    
    table td.grand {
      border-top: 1px solid #5D6975;;
    }
    
    .foter {
      color: #5D6975;
      width: 100%;
      height: 30px;
      border-top: 1px solid #C1CED9;
      padding: 8px 0;
      text-align: center;
    }
    
    .font-b {
        font-weight: bold;
    }
        </style>    
    </head>
    <body>
         <header class="clearfix">
          <div id="logo">
            <img src="https://res.cloudinary.com/dvtz5mjdb/image/upload/v1701333412/image/h1vzhjzyuuwhrhak1bcr.png">
          </div>
          <h1>HÓA ĐƠN</h1>
          <div id="company" class="clearfix">
            <div>#${resp.code}</div>
            <div>Ngày tạo: ${formatDate(resp.createdAt)}</div>
            <div>Ngày thanh toán: ${formatDate(resp.paymentDate)}</div>
          </div>
          <div id="project">
            <div><span>Khách hàng:</span> ${resp.customerEntity ? resp.customerEntity.fullName : 'Khách lẻ'}</div>
            <div><span>SĐT:</span> ${resp ? resp.phoneNumber : ''}</div>
            <div><span>Địa chỉ:</span> ${resp ? resp.address : ''}</div>
          </div>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th class="desc">Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
                ${listBillDT}
              <tr>
                <td colspan="3" class="font-b">Tổng tiền hàng: </td>
                <td class="total font-b">${formatCurrency(resp.totalAmount)}</td>
              </tr>
              ${resp.voucher !== null ? `
                <tr>
                <td colspan="3" class="font-b">Giảm giá</td>
                <td class="total font-b">${resp.voucher.value}${resp.voucher.valueType == 2 ? '%' : '₫'}</td>
                </tr>
              ` : ''}
              <tr>
                <td colspan="3" class="grand font-b">Tổng thanh toán</td>
                <td class="total grand font-b">${resp.totalAmountAfterDiscount == 0 ? formatCurrency(resp.totalAmount) : formatCurrency(resp.totalAmountAfterDiscount)}</td>
              </tr>
            </tbody>
          </table>
           <div class="foter">
                Cảm ơn và hẹn gặp lại!
            </div>
        </main>
        <script>
             window.onload = function() {
                  window.print();
             };
        </script>
    </body>
    </html>`;

        return htmlContent;
    }




});
//END NGUYEN BILL


// Tạo cái mới đừng dùng những cái có sẵn chỉ để tham khảo
// Các phím tắt khi sử dụng visual
// https://www.thegioididong.com/game-app/tong-hop-cac-phim-tat-trong-visual-studio-code-giup-lap-trinh-1314635

