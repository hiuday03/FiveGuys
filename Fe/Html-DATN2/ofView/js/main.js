// import generateInvoiceHTML from './invoice.js';

var app = angular.module("myAppOfView", [
    "ngRoute",
    "angular-jwt",
    "ngSanitize",
  ]);
  
  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  });
  
  app.factory("authInterceptor", [
    "$q",
    "$rootScope",
    function ($q, $rootScope) {
      return {
        request: function (config) {
          // Lấy token từ localStorage
          var token = localStorage.getItem("token");
  
          // Nếu có token, thêm header 'Authorization'
          if (token) {
            config.headers["Authorization"] = "Bearer " + token;
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
  $httpProvider.interceptors.push("authInterceptor");
});

app.factory("authInterceptor", [
  "$q",
  "$rootScope",
  function ($q, $rootScope) {
    return {
      request: function (config) {
        // Lấy token từ localStorage
        var token = localStorage.getItem("token");

        // Nếu có token, thêm header 'Authorization'
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }

        return config;
      },
      responseError: function (response) {
        // Xử lý các lỗi khi nhận response
        return $q.reject(response);
      },
    };
  },
]);

app.config([
  "$compileProvider",
  function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  },
]);

app.config(function ($httpProvider) {
  $httpProvider.useApplyAsync(1000); //true
});

app.config(function ($routeProvider) {
  $routeProvider

    // Tham khao
    .when("/homeTest/123", {
      templateUrl: "thamkhao/homeTest.html",
      controller: "myAppOfView-ctrl",
    })
    .when("/productTest", {
      templateUrl: "thamkhao/productTest.html",
      controller: "myAppOfView-ctrl",
    })
    .when("/cartTest", {
      templateUrl: "thamkhao/cartTest.html",
      controller: "myAppOfView-ctrl2",
    })
    // Tham khao
    // <!-- Thuong -->

    // <!-- Hieu -->

    .when("/admin/account/account", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/account.html",
      controller: "account-ctrl",
    })
    .when("/admin/account/address", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/address.html",
      controller: "address-ctrl",
    })
    .when("/admin/account/customer", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/customer.html",
      controller: "customer-ctrl",
    })
    .when("/admin/account/employee", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/employee_home.html",
      controller: "employee-ctrl",
    })
    .when("/admin/account/favorite", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/favorite.html",
      controller: "favorite-ctrl",
    })
    .when("/admin/account/rating", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/rating.html",
      controller: "rating-ctrl",
    })
    .when("/admin/account/role", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/role.html",
      controller: "role-ctrl",
    })
    .when("/admin/brand", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/brand.html",
      controller: "brand-ctrl",
    })
    .when("/admin/category", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/category-list.html",
      controller: "category-ctrl",
    })
    .when("/admin/color", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/color-list.html",
      controller: "color-ctrl",
    })
    .when("/admin/size", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/size-list.html",
      controller: "size-ctrl",
    })
    .when("/admin/material", {
      templateUrl: "/Fe/Html-DATN2/ofView/admin/material-list.html",
      controller: "material-ctrl",
    })
    // tinh
    .when("/admin/voucher", {
      templateUrl: "/Fe/Html-DATN2/ofView/Tinh/html/voucher/voucher_home.html",
      controller: "voucher-list-controller",
    })
    .when("/admin/index", {
      templateUrl: "/Fe/Html-DATN2/ofView/Tinh/html/thongKe/thongKe.html",
      controller: "statistical-ctrl",
    });

  // <!-- Nguyen -->
});

// Hieu js
//--------------------------------tinh thong kê-----------------------------
app.controller(
  "statistical-ctrl",
  function ($scope, $http, $timeout, $document, $filter) {
    $scope.customes = {
      decrease: "decrease",
    };
    $scope.searchStatus = "1";
    const api = "http://localhost:8080/statistical";
    // tổng tiền trong  tháng
    $scope.getSum = function () {
      $http.get(api).then(function (rest) {
        $scope.getsum = rest.data;
      });
    };
    $scope.getSum();
    // Tỉ lệ tổng tiền trong  tháng

    // tổng hóa đơn trong  ngày
    $scope.getCodeDay = function () {
      $http.get(api + "/count-day").then(function (rest) {
        $scope.getcodeday = rest.data;
      });
    };
    $scope.getCodeDay();
    $scope.selectedOption = "1";

    $scope.he = function () {
      if ($scope.selectedOption === "1") {
        $scope.hi = "Hôm Nay";
      } else if ($scope.selectedOption === "2") {
        $scope.hi = "Tháng Này";
      } else {
        $scope.hi = "Năm Này";
      }
    };
    $scope.he();

    //search status Bill
    $scope.searchStatusBill = function () {
      if ($scope.searchStatus === "1") {
        $http.get(api + "/search-status-bill/1").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.searchStatus === "2") {
        $http.get(api + "/search-status-bill/2").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.searchStatus === "3") {
        $http.get(api + "/search-status-bill3").then(function (response) {
          $scope.getallbilllist = response.data;
          console.log(response.data);
        });
      } else if ($scope.searchStatus === "4") {
        $http.get(api + "/search-status-bill/4").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.searchStatus === "5") {
        $http.get(api + "/search-status-bill/5").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.searchStatus === "6") {
        $http.get(api + "/search-status-bill/6").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.searchStatus === "7") {
        status$http
          .get(api + "/search-status-bill/7")
          .then(function (response) {
            $scope.getallbilllist = response.data;
          });
      } else if ($scope.searchStatus === "8") {
        $http.get(api + "/search-status-bill/8").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.searchStatus === "9") {
        $http.get(api + "/search-status-bill/9").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      }
    };
    $scope.searchStatusBill;
    // get all table bill
    $scope.getAllBillList = function () {
      $http.get(api + "/get-all-list").then(function (getall) {
        $scope.getallbilllist = getall.data;
      });
    };
    $scope.getAllBillList();

    var today = new Date();
    today.setDate(today.getDate());
    let todayfomat = $filter("date")(today, "yyyy-MM-dd");

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let yesterdayFormat = $filter("date")(yesterday, "yyyy-MM-dd");
    var yesterdaymonth = new Date();
    yesterdaymonth.setDate(yesterdaymonth.getMonth() - 1);
    let yestermonthFormat = $filter("date")(yesterdaymonth, "yyyy-MM-dd");
    var yesterdayyear = new Date();
    yesterdayyear.setDate(yesterdayyear.getFullYear());
    let yesteryaerFormat = $filter("date")(yesterdayyear, "yyyy-MM-dd");

    // tổng tiền trong  tháng
    $scope.tongTien = function () {
      if ($scope.selectedOption === "1") {
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${todayfomat}`, todayfomat)
          .then(function (rest) {
            $scope.getsum = rest.data;
          });
        $http
          .get(
            api + "/tong-doanh-thu-ngay/" + `${yesterdayFormat}`,
            yesterdayFormat
          )
          .then(function (rest) {
            $scope.getsumtile = rest.data;
          });
        $scope.tiletongtien = $scope.getsum / $scope.getsumtile;
      } else if ($scope.selectedOption === "2") {
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${todayfomat}`, todayfomat)
          .then(function (rest) {
            $scope.getsum = rest.data;
          });
        $http
          .get(
            api + "/tong-doanh-thu-thang/" + `${yestermonthFormat}`,
            yestermonthFormat
          )
          .then(function (rest) {
            $scope.getsumtile = rest.data;
          });
        $scope.tiletongtien = $scope.getsum / $scope.getsumtile;
      } else if ($scope.selectedOption === "3") {
        $http
          .get(api + "/tong-doanh-thu-nam/" + `${todayfomat}`, todayfomat)
          .then(function (rest) {
            $scope.getsum = rest.data;
          });
        $http
          .get(
            api + "/tong-doanh-thu-nam/" + `${yesteryaerFormat}`,
            yesteryaerFormat
          )
          .then(function (rest) {
            $scope.getsumtile = rest.data;
          });
        $scope.tiletongtien = $scope.getsum / $scope.getsumtile;
      }
    };
    $scope.tongTien();
    // tổng hóa đơn trong  ngày
    $scope.tongHoaDon = function () {
      if ($scope.selectedOption === "1") {
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${todayfomat}`, todayfomat)
          .then(function (rest) {
            $scope.getcodeday = rest.data;
          });
      } else if ($scope.selectedOption === "2") {
        $http
          .get(api + "/tong-hoa-don-thang/" + `${todayfomat}`, todayfomat)
          .then(function (rest) {
            $scope.getcodeday = rest.data;
          });
      } else if ($scope.selectedOption === "3") {
        $http
          .get(api + "/tong-hoa-don-nam/" + `${todayfomat}`, todayfomat)
          .then(function (rest) {
            $scope.getcodeday = rest.data;
          });
      }
    };
    $scope.tongHoaDon();
    $scope.tongHoaDontile = function () {
      if ($scope.selectedOption === "1") {
        $http
          .get(
            api + "/tong-hoa-don-ngay/" + `${yesterdayFormat}`,
            yesterdayFormat
          )
          .then(function (rest) {
            $scope.getcodedaytile = rest.data;
          });
      } else if ($scope.selectedOption === "2") {
        $http
          .get(
            api + "/tong-hoa-don-thang/" + `${yestermonthFormat}`,
            yestermonthFormat
          )
          .then(function (rest) {
            $scope.getcodedaytile = rest.data;
            console.log("hihi");
          });
      } else if ($scope.selectedOption === "3") {
        $http
          .get(
            api + "/tong-hoa-don-nam/" + `${yesteryaerFormat}`,
            yesteryaerFormat
          )
          .then(function (rest) {
            $scope.getcodedaytile = rest.data;
          });
      }
    };
    $scope.tongHoaDontile();
    //San phâm ban ra
    $scope.tongKhachHang = function () {
      if ($scope.selectedOption === "1") {
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${todayfomat}`, todayfomat)
          .then(function (getall) {
            $scope.listcustomeryear = getall.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${yesterdayFormat}`, yesterday)
          .then(function (getall) {
            $scope.listcustomeryeartile = getall.data;
          });
        $scope.tiletongkhachhang =
          $scope.listcustomeryear / $scope.listcustomeryeartile;
      } else if ($scope.selectedOption === "2") {
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${todayfomat}`, todayfomat)
          .then(function (getall) {
            $scope.listcustomeryear = getall.data;
          });
        $http
          .get(
            api + "/san-pham-ban-ra-thang/" + `${yestermonthFormat}`,
            yesterdayFormat
          )
          .then(function (getall) {
            $scope.listcustomeryeartile = getall.data;
          });
        $scope.tiletongkhachhang =
          $scope.listcustomeryear / $scope.listcustomeryeartile;
      } else if ($scope.selectedOption === "3") {
        $http
          .get(api + "/san-pham-ban-ra-nam/" + `${todayfomat}`, todayfomat)
          .then(function (getall) {
            $scope.listcustomeryear = getall.data;
          });
        $http
          .get(
            api + "/san-pham-ban-ra-nam/" + `${yesteryaerFormat}`,
            yesteryaerFormat
          )
          .then(function (getall) {
            $scope.listcustomeryeartile = getall.data;
          });
        $scope.tiletongkhachhang =
          $scope.listcustomeryear / $scope.listcustomeryeartile;
      }
    };
    $scope.tongKhachHang();

    // top 5 Bán chạy
    $scope.Top5BanChay = function () {
      if ($scope.selectedOption === "1") {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        $http
          .get(api + "/top5-ban-chay-day/" + `${todayfomat}`, todayfomat)
          .then((data) => {
            $scope.topbanchay = data.data;
          });
      } else if ($scope.selectedOption === "2") {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        $http
          .get(api + "/top5-ban-chay-month/" + `${todayfomat}`, todayfomat)
          .then((data) => {
            $scope.topbanchay = data.data;
          });
      } else if ($scope.selectedOption === "3") {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        $http
          .get(api + "/top5-ban-chay-year/" + `${todayfomat}`, todayfomat)
          .then((data) => {
            $scope.topbanchay = data.data;
          });
      }
    };
    $scope.Top5BanChay($scope.topbanchay);

    // top 5 Bán chạy theo ngay

    $scope.TopBanChayDate = function () {
      var today = new Date();
      today.setDate(today.getDate());
      let todayfomat = $filter("date")(today, "yyyy-MM-dd");
      $http
        .get(api + "/top-ban-chay-date/" + `${todayfomat}`, todayfomat)
        .then((data) => {
          $scope.topbanchaydate = data.data;
          $scope.trafficChart($scope.topbanchaydate);
        });
    };
    $scope.TopBanChayDate();
    $scope.TopBanChayMonth = function () {
      var today = new Date();
      today.setDate(today.getDate());
      let todayfomat = $filter("date")(today, "yyyy-MM-dd");
      $http
        .get(api + "/top-ban-chay-month/" + `${todayfomat}`, todayfomat)
        .then((data) => {
          $scope.topbanchaymonth = data.data;
          $scope.trafficChart($scope.topbanchaymonth);
        });
    };
    $scope.TopBanChayMonth();
    $scope.TopBanChayYear = function () {
      var today = new Date();
      today.setDate(today.getDate());
      let todayfomat = $filter("date")(today, "yyyy-MM-dd");
      $http
        .get(api + "/top-ban-chay-year/" + `${todayfomat}`, todayfomat)
        .then((data) => {
          $scope.topbanchayyear = data.data;
          $scope.trafficChart($scope.topbanchayyear);
        });
    };
    $scope.TopBanChayYear();

    //Sơ đồ thống kê ----------
    //Tổng khách hàng trong 1 năm     // fomat ngay
    var today = new Date();
    today.setDate(today.getDate());
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

    //-----fomat thang
    var today = new Date();
    today.setDate(today.getMonth());
    let thangfomat = $filter("date")(today, "yyyy-MM-dd");
    var today1 = new Date();
    today1.setDate(today1.getMonth() - 1);
    let thang1fomat = $filter("date")(today1, "yyyy-MM-dd");
    var today2 = new Date();
    today2.setDate(today2.getMonth() - 2);
    let thang2fomat = $filter("date")(today2, "yyyy-MM-dd");
    var today3 = new Date();
    today3.setDate(today3.getMonth() - 3);
    let thang3fomat = $filter("date")(today3, "yyyy-MM-dd");
    var today4 = new Date();
    today4.setDate(today4.getMonth() - 4);
    let thang4fomat = $filter("date")(today4, "yyyy-MM-dd");
    var today5 = new Date();
    today5.setDate(today5.getMonth() - 5);
    let thang5fomat = $filter("date")(today5, "yyyy-MM-dd");
    var today6 = new Date();
    today6.setDate(today6.getMonth() - 6);
    let thang6fomat = $filter("date")(today6, "yyyy-MM-dd");
    //-----fomat nam
    var today = new Date();
    today.setDate(today.getFullYear());
    let namfomat = $filter("date")(today, "yyyy-MM-dd");
    var today1 = new Date();
    today1.setDate(today1.getFullYear() - 1);
    let nam1fomat = $filter("date")(today1, "yyyy-MM-dd");
    var today2 = new Date();
    today2.setDate(today2.getFullYear() - 2);
    let nam2fomat = $filter("date")(today2, "yyyy-MM-dd");
    var today3 = new Date();
    today3.setDate(today3.getFullYear() - 3);
    let nam3fomat = $filter("date")(today3, "yyyy-MM-dd");
    var today4 = new Date();
    today4.setDate(today4.getFullYear() - 4);
    let nam4fomat = $filter("date")(today4, "yyyy-MM-dd");
    today3.setDate(today3.getFullYear() - 5);
    let nam5fomat = $filter("date")(today3, "yyyy-MM-dd");
    var today4 = new Date();
    today4.setDate(today4.getFullYear() - 6);
    let nam6fomat = $filter("date")(today4, "yyyy-MM-dd");

    $scope.listCustomerDay = function () {
      if ($scope.selectedOption === "1") {
        // list customes-------
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${todayfomat}`, todayfomat)
          .then(function (getall) {
            $scope.listcustomerday = getall.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${today1fomat}`, today1fomat)
          .then(function (getall1) {
            $scope.listcustomerday1 = getall1.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${today2fomat}`, today2fomat)
          .then(function (getall2) {
            $scope.listcustomerday2 = getall2.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${today3fomat}`, today3fomat)
          .then(function (getall3) {
            $scope.listcustomerday3 = getall3.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${today4fomat}`, today4fomat)
          .then(function (getall4) {
            $scope.listcustomerday4 = getall4.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${today5fomat}`, today5fomat)
          .then(function (getall5) {
            $scope.listcustomerday5 = getall5.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-ngay/" + `${today6fomat}`, today6fomat)
          .then(function (getall6) {
            $scope.listcustomerday6 = getall6.data;
          });

        //List bill---------
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${todayfomat}`, todayfomat)
          .then(function (getbill) {
            $scope.listbillday = getbill.data;
          });
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${today1fomat}`, today1fomat)
          .then(function (getbill1) {
            $scope.listbillday1 = getbill1.data;
          });
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${today2fomat}`, today2fomat)
          .then(function (getbill2) {
            $scope.listbillday2 = getbill2.data;
          });
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${today3fomat}`, today3fomat)
          .then(function (getbill3) {
            $scope.listbillday3 = getbill3.data;
          });
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${today4fomat}`, today4fomat)
          .then(function (getbill4) {
            $scope.listbillday4 = getbill4.data;
          });
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${today5fomat}`, today5fomat)
          .then(function (getbill5) {
            $scope.listbillday5 = getbill5.data;
          });
        $http
          .get(api + "/tong-hoa-don-ngay/" + `${today6fomat}`, today6fomat)
          .then(function (getbill6) {
            $scope.listbillday6 = getbill6.data;
          });
        //List Doanh thu-------
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${todayfomat}`, todayfomat)
          .then(function (getbill) {
            $scope.listdoanhthuday = getbill.data;
          });
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${today1fomat}`, today1fomat)
          .then(function (getbill1) {
            $scope.listdoanhthuday1 = getbill1.data;
          });
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${today2fomat}`, today2fomat)
          .then(function (getbill2) {
            $scope.listdoanhthuday2 = getbill2.data;
          });
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${today3fomat}`, today3fomat)
          .then(function (getbill3) {
            $scope.listdoanhthuday3 = getbill3.data;
          });
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${today4fomat}`, today4fomat)
          .then(function (getbill4) {
            $scope.listdoanhthuday4 = getbill4.data;
          });
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${today5fomat}`, today5fomat)
          .then(function (getbill5) {
            $scope.listdoanhthuday5 = getbill5.data;
          });
        $http
          .get(api + "/tong-doanh-thu-ngay/" + `${today6fomat}`, today6fomat)
          .then(function (getbill6) {
            $scope.listdoanhthuday6 = getbill6.data;
            renderChart();
          });
        //--------------------------------------------else if
      } else if ($scope.selectedOption === "2") {
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thangfomat}`, thangfomat)
          .then(function (getall) {
            $scope.listcustomerday = getall.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang1fomat}`, thang1fomat)
          .then(function (getall1) {
            $scope.listcustomerday1 = getall1.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang2fomat}`, thang2fomat)
          .then(function (getall2) {
            $scope.listcustomerday2 = getall2.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang3fomat}`, thang3fomat)
          .then(function (getall3) {
            $scope.listcustomerday3 = getall3.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang4fomat}`, thang4fomat)
          .then(function (getall4) {
            $scope.listcustomerday4 = getall4.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang5fomat}`, thang5fomat)
          .then(function (getall5) {
            $scope.listcustomerday5 = getall5.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang6fomat}`, thang6fomat)
          .then(function (getall6) {
            $scope.listcustomerday6 = getall6.data;
          });

        //List bill---------
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thangfomat}`, thangfomat)
          .then(function (getbill) {
            $scope.listbillday = getbill.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang1fomat}`, thang1fomat)
          .then(function (getbill1) {
            $scope.listbillday1 = getbill1.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang2fomat}`, thang2fomat)
          .then(function (getbill2) {
            $scope.listbillday2 = getbill2.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang3fomat}`, thang3fomat)
          .then(function (getbill3) {
            $scope.listbillday3 = getbill3.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang4fomat}`, thang4fomat)
          .then(function (getbill4) {
            $scope.listbillday4 = getbill4.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang5fomat}`, thang5fomat)
          .then(function (getbill5) {
            $scope.listbillday5 = getbill5.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang6fomat}`, thang6fomat)
          .then(function (getbill6) {
            $scope.listbillday6 = getbill6.data;
          });
        //List Doanh thu-------
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thangfomat}`, thangfomat)
          .then(function (getbill) {
            $scope.listdoanhthuday = getbill.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang1fomat}`, thang1fomat)
          .then(function (getbill1) {
            $scope.listdoanhthuday1 = getbill1.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang2fomat}`, thang2fomat)
          .then(function (getbill2) {
            $scope.listdoanhthuday2 = getbill2.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang3fomat}`, thang3fomat)
          .then(function (getbill3) {
            $scope.listdoanhthuday3 = getbill3.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang4fomat}`, thang4fomat)
          .then(function (getbill4) {
            $scope.listdoanhthuday4 = getbill4.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang5fomat}`, thang5fomat)
          .then(function (getbill5) {
            $scope.listdoanhthuday5 = getbill5.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang6fomat}`, thang6fomat)
          .then(function (getbill6) {
            $scope.listdoanhthuday6 = getbill6.data;
            renderChart();
          });
      }
      //     else if ($scope.selectedOption === "3") {
      //         $http
      //         .get(api + "/san-pham-ban-ra-nam/" + `${namfomat}`, namfomat)
      //         .then(function (getall) {
      //           $scope.listcustomerday = getall.data;
      //         });
      //       $http
      //         .get(api + "/san-pham-ban-ra-nam/" + `${nam1fomat}`, nam1fomat)
      //         .then(function (getall1) {
      //           $scope.listcustomerday1 = getall1.data;
      //         });
      //       $http
      //         .get(api + "/san-pham-ban-ra-nam/" + `${nam2fomat}`, nam2fomat)
      //         .then(function (getall2) {
      //           $scope.listcustomerday2 = getall2.data;
      //         });
      //       $http
      //         .get(api + "/san-pham-ban-ra-nam/" + `${nam3fomat}`, nam3fomat)
      //         .then(function (getall3) {
      //           $scope.listcustomerday3 = getall3.data;
      //         });
      //       $http
      //         .get(api + "/san-pham-ban-ra-nam/" + `${nam4fomat}`, nam4fomat)
      //         .then(function (getall4) {
      //           $scope.listcustomerday4 = getall4.data;
      //         });
      //          $http
      // .get(api + "/san-pham-ban-ra-nam/" + `${nam5fomat}`, nam6fomat)
      //         .then(function (getall3) {
      //           $scope.listcustomerday5 = getall3.data;
      //         });
      //       $http
      //         .get(api + "/san-pham-ban-ra-nam/" + `${nam6fomat}`, nam6fomat)
      //         .then(function (getall4) {
      //           $scope.listcustomerday = getall4.data;
      //         });

      //       //List bill---------
      //       $http
      //         .get(api + "/tong-hoa-don-nam/" + `${namfomat}`, namfomat)
      //         .then(function (getbill) {
      //           $scope.listbillday = getbill.data;
      //         });
      //       $http
      //         .get(api + "/tong-hoa-don-nam/" + `${nam1fomat}`, nam1fomat)
      //         .then(function (getbill1) {
      //           $scope.listbillday1 = getbill1.data;
      //         });
      //       $http
      //         .get(api + "/tong-hoa-don-nam/" + `${nam2fomat}`, thang2fomat)
      //         .then(function (getbill2) {
      //           $scope.listbillday2 = getbill2.data;
      //         });
      //       $http
      //         .get(api + "/tong-hoa-don-nam/" + `${nam3fomat}`, nam3fomat)
      //         .then(function (getbill3) {
      //           $scope.listbillday3 = getbill3.data;
      //         });
      //       $http
      //         .get(api + "/tong-hoa-don-nam/" + `${nam4fomat}`, nam4fomat)
      //         .then(function (getbill4) {
      //           $scope.listbillday4 = getbill4.data;
      //         });
      //         $http
      //         .get(api + "/tong-hoa-don-nam/" + `${nam6fomat}`, nam5fomat)
      //         .then(function (getbill3) {
      //           $scope.listbillday5 = getbill3.data;
      //         });
      //       $http
      //         .get(api + "/tong-hoa-don-nam/" + `${nam6fomat}`, nam6fomat)
      //         .then(function (getbill4) {
      //           $scope.listbillday6 = getbill4.data;
      //         });

      //       //List Doanh thu-------
      //       $http
      //         .get(api + "/tong-doanh-thu-nam/" + `${namfomat}`, namfomat)
      //         .then(function (getbill) {
      //           $scope.listdoanhthuday = getbill.data;
      //         });
      //       $http
      //         .get(api + "/tong-doanh-thu-nam/" + `${nam1fomat}`, nam1fomat)
      //         .then(function (getbill1) {
      //           $scope.listdoanhthuday1 = getbill1.data;
      //         });
      //       $http
      //         .get(api + "/tong-doanh-thu-nam/" + `${nam2fomat}`, nam2fomat)
      //         .then(function (getbill2) {
      //           $scope.listdoanhthuday2 = getbill2.data;
      //         });
      //       $http
      //         .get(api + "/tong-doanh-thu-nam/" + `${nam3fomat}`, nam3fomat)
      //         .then(function (getbill3) {
      //           $scope.listdoanhthuday3 = getbill3.data;
      //         });
      //       $http
      //         .get(api + "/tong-doanh-thu-nam/" + `${nam4fomat}`, nam4fomat)
      //         .then(function (getbill4) {
      //   $scope.listdoanhthuday4 = getbill4.data;
      //         });
      //      $http
      //         .get(api + "/tong-doanh-thu-nam/" + `${nam5fomat}`, nam5fomat)
      //         .then(function (getbill3) {
      //           $scope.listdoanhthuday5 = getbill3.data;
      //         });
      //       $http
      //         .get(api + "/tong-doanh-thu-nam/" + `${nam6fomat}`, nam6fomat)
      //         .then(function (getbill4) {
      //           $scope.listdoanhthuday6 = getbill4.data;
      //           renderChart();
      //         });
      //     }
    };

    function renderChart() {
      //------------

      new ApexCharts(document.querySelector("#reportsChart"), {
        series: [
          {
            name: "Hóa Đơn",
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
            name: "Sản Phẩm",
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
          {
            name: "Doanh Thu",
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
            // `${todayfomat}`,
            `${today6fomat}`,
            `${today5fomat}`,
            `${today4fomat}`,
            `${today3fomat}`,
            `${today2fomat}`,
            `${today1fomat}`,
            `${todayfomat}`,
            // $scope.formattedDateTomorrow,
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

    //Thống kê sản phâm bán chạy
    $scope.trafficChart = function () {
      if ($scope.selectedOption === "1") {
        if ($scope.topbanchaydate && $scope.topbanchaydate.length > 0) {
          var chartData = [];
          for (var i = 0; i < $scope.topbanchaydate.length; i++) {
            var currentItem = $scope.topbanchaydate[i];
            var itemData = {
              name: currentItem.ten_sanpham,
              value: currentItem.so_luong_ban,
            };
            chartData.push(itemData);
          }
        }
      } else if ($scope.selectedOption === "2") {
        if ($scope.topbanchaymonth && $scope.topbanchaymonth.length > 0) {
          var chartData = [];
          for (var i = 0; i < $scope.topbanchaymonth.length; i++) {
            var currentItem = $scope.topbanchaymonth[i];

            var itemData = {
              name: currentItem.ten_sanpham,
              value: currentItem.so_luong_ban,
            };
            chartData.push(itemData);
          }
        }
      } else if ($scope.selectedOption === "3") {
        if ($scope.topbanchayyear && $scope.topbanchayyear.length > 0) {
          var chartData = [];
          for (var i = 0; i < $scope.topbanchayyear.length; i++) {
            var currentItem = $scope.topbanchayyear[i];
            var itemData = {
              name: currentItem.ten_sanpham,
              value: currentItem.so_luong_ban,
            };
            chartData.push(itemData);
          }
        }
      }
      //bieeur ddoof
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
            data: chartData,
          },
        ],
      });
    };
    $scope.trafficChart();
    $scope.availablePageSizes = [5, 10, 20, 50, 100];
    $scope.changePageSize = function () {
      $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };
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
//---------------------------------Tịnh end thong kê---------------------------
//---------------------------------Tịnh Voucher---------------------------
app.controller("voucher-list-controller", function ($scope, $http, $timeout) {
  const apiUrlVoucher = "http://localhost:8080/api/voucher";
  const apiUrlAccount = "http://localhost:8080/account";
  $scope.voucher = [];
  $scope.formUpdate = {};
  $scope.formShow = {};
  $scope.formInput = {};
  $scope.formtimkiem = "1";
  $scope.showAlert = false;
  $scope.hihi = {};

  $scope.label1 = {
    update: "Thêm",
  };
  $scope.button = {};
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

  $scope.getAll = function () {
    $http.get(apiUrlVoucher).then(function (response) {
      $scope.listVoucher = response.data;
    });
  };
  $scope.getAll();

  //tìm kiếm voucher theo status
  $scope.timkiemStatus = function () {
    if ($scope.formtimkiem === "5") {
      $http.get(apiUrlVoucher + "/timkiem-status/1").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "2") {
      $http.get(apiUrlVoucher + "/timkiem-status/2").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "0") {
      $http.get(apiUrlVoucher + "/timkiem-status/0").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "3") {
      $http.get(apiUrlVoucher + "/timkiem-status/3").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "4") {
      $http.get(apiUrlVoucher + "/timkiem-status/4").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "1") {
      $http.get(apiUrlVoucher).then(function (response) {
        $scope.listVoucher = response.data;
      });
    }
  };
  $scope.timkiemStatus();
  // getById Voucher
  $scope.getById = function (item) {
    $http.get(`/api/voucher/${item.id}`).then(function (response) {
      $scope.listVoucher = response.data;
      console.log(item.id);
    });
  };

  //Khai báo status voucher
  $scope.statusOptions = [
    { value: 0, label: "Chưa hoạt động" },
    { value: 1, label: "Đang hoạt động" },
    { value: 2, label: "Hết khuyến mại" },
    { value: 3, label: "Hết hạn" },
    { value: 4, label: "Đá xóa" },
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
  // var modal = document.getElementById("modalAdd");
  // create Employee
  $scope.addVoucher = function (newVoucher) {
    let item = angular.copy($scope.formInput);
    $http
      .post(apiUrlVoucher, item)
      .then(function (resp) {
        $scope.showSuccessNotification("Cập nhật thông tin thành công");
        $scope.resetFormInput();
        $scope.getAll();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };
  // update Voucher
  $scope.updateVoucher = function () {
    let item = angular.copy($scope.formInput);
    $http
      .put(apiUrlVoucher + "/update/" + `${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessNotification("Cập nhật thông tin thành công");
        $scope.resetFormInput();
        $scope.getAll();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  //delete update status Employee
  $scope.updateStatusVoucher = function (item) {
    $http
      .put(apiUrlVoucher + "/delete/" + `${item.id}`, item)
      .then(function (resp) {
        $scope.getAll();
      });
  };

  //submit add and update
  $scope.submit = function () {
    if (($scope.formInput.id = true)) {
      $scope.updateVoucher();
    } else if (($scope.formInput.id = false)) {
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

  $scope.insertExcelVoucher = function () {
    var inputElement = $("#fileInput")[0];

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      var files = inputElement.files;
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
            $http.post(apiUrlVoucher, voucher).then((resp) => {
              $scope.showSuccessNotification("Cập nhật thông tin thành công");
              $scope.getAll();
            });
          }
        });
      };
      reader.readAsArrayBuffer(files[0]);
    } else {
      console.error("No files selected.");
    }
  };
  $scope.changePageSize = function () {
    $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
  };
  /////

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  $scope.availablePageSizes = [5, 10, 20, 50, 100];
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
//---------------------------------Tịnh end Voucher---------------------------

app.controller("brand-ctrl", function ($scope, $http, $timeout) {
  $scope.originalbrand = [];
  $scope.brand = [];
  $scope.formUpdate = {};
  $scope.formInput = {};
  $scope.showAlert = false;
  $scope.currentDate = new Date();
  const apiBrand = "http://localhost:8080/brand";

  $scope.showSuccessMessage = function (message) {
    $scope.alertMessage = message;
    $scope.showAlert = true;
    $timeout(function () {
      $scope.closeAlert();
    }, 5000);
  };

  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.brand = $scope.originalBrand.filter(function (item) {
        if (item && item.name) {
          return item.name
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
    $http.get(apiBrand).then(function (resp) {
      $scope.originalBrand = resp.data; // Lưu dữ liệu gốc
      $scope.brand = angular.copy($scope.originalBrand); // Sao chép dữ liệu gốc sang mảng hiển thị
    });
  };

  $scope.initialize();

  $scope.edit = function (brand) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(brand);
    } else {
      $scope.formUpdate = angular.copy(brand);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

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
    $http
      .post(apiBrand, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create brand successfully");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        if (error.status === 400 && error.data === "Name already exists") {
          $scope.nameExists = true;
        } else {
          console.log("Error", error);
        }
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    console.log(item);
    item.updatedAt = $scope.currentDate;
    $http
      .put(apiBrand + `${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update Brand successfully");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch(function (error) {
        if (error.status === 400 && error.data === "Name already exists") {
          $scope.nameExists = true;
        } else {
          console.log("Error", error);
        }
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`/brand/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Brand successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateBrand.$setPristine();
    $scope.formUpdateBrand.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateBrand.$setPristine();
    $scope.formCreateBrand.$setUntouched();
  };

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
      return Math.ceil((1.0 * $scope.brand.length) / this.size);
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
    },
  };
});
app.controller("size-ctrl", function ($scope, $http, $timeout) {
  const apiUrlSize = "http://localhost:8080/api/size";

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
  };
  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };
  $scope.initialize = function () {
    $http.get(apiUrlSize + "/page").then((resp) => {
      $scope.sizes = resp.data.content;
      $scope.totalPages = resp.data.totalPages;
    });
  };
  $scope.initialize();

  $scope.edit = function (cate) {
    $scope.formUpdate = angular.copy(cate);
  };
  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    $http
      .post(apiUrlSize, item)
      .then((resp) => {
        $scope.showSuccessMessage("Create size successfully!");
        $scope.initialize();
        $("#modalAdd").modal("hide");
        $scope.resetFormInput();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    $http
      .put(`${apiUrlSize}/${item.id}`, item)
      .then((resp) => {
        $scope.showSuccessMessage("Update size successfully!");
        $scope.initialize();
        $("#modalUpdate").modal("hide");
        $scope.resetFormUpdate();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`${apiUrlSize}/${item.id}`)
      .then((resp) => {
        $scope.showSuccessMessage("Delete color successfully!");
        $scope.initialize();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateColor.$setPristine();
    $scope.formUpdateColor.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formAddColor.$setPristine();
    $scope.formAddColor.$setUntouched();
  };

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
    $currentPage = page;
    page = page - 1;
    $http.get(apiUrlSize + "/page?page=" + page).then(function (response) {
      $scope.sizes = response.data.content;
      $scope.totalPage = response.data.totalPages;
    });
  };
});

app.controller("material-ctrl", function ($scope, $http, $timeout) {
  const apiUrlMaterial = "http://localhost:8080/api/material";

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
  };
  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };
  $scope.initialize = function () {
    $http.get(apiUrlMaterial + "/page").then((resp) => {
      $scope.materials = resp.data.content;
      $scope.totalPages = resp.data.totalPages;
    });
  };
  $scope.initialize();

  $scope.edit = function (cate) {
    $scope.formUpdate = angular.copy(cate);
  };
  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    $http
      .post(apiUrlMaterial, item)
      .then((resp) => {
        $scope.showSuccessMessage("Create material successfully!");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    $http
      .put(`${apiUrlMaterial}/${item.id}`, item)
      .then((resp) => {
        $scope.showSuccessMessage("Update material successfully!");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`${apiUrlMaterial}/${item.id}`)
      .then((resp) => {
        $scope.showSuccessMessage("Delete color successfully!");
        $scope.initialize();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateColor.$setPristine();
    $scope.formUpdateColor.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formAddColor.$setPristine();
    $scope.formAddColor.$setUntouched();
  };

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
    $http.get(apiUrlMaterial + "/page?page=" + page).then(function (response) {
      console.log(response);
      $scope.materials = response.data.content;
      $scope.totalPage = response.data.totalPages;
    });
  };

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
  const apiUrlColor = "http://localhost:8080/api/color";

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
  };
  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };
  $scope.initialize = function () {
    $http.get(apiUrlColor + "/page").then((resp) => {
      $scope.colors = resp.data.content;
      $scope.totalPages = resp.data.totalPages;
    });
  };
  $scope.initialize();

  $scope.edit = function (cate) {
    $scope.formUpdate = angular.copy(cate);
  };
  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    $http
      .post(apiUrlColor, item)
      .then((resp) => {
        $scope.showSuccessMessage("Create color successfully!");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    $http
      .put(`${apiUrlColor}/${item.id}`, item)
      .then((resp) => {
        $scope.showSuccessMessage("Update color successfully!");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`${apiUrlColor}/${item.id}`)
      .then((resp) => {
        $scope.showSuccessMessage("Delete color successfully!");
        $scope.initialize();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateColor.$setPristine();
    $scope.formUpdateColor.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formAddColor.$setPristine();
    $scope.formAddColor.$setUntouched();
  };

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
    $http.get(apiUrlColor + "/page?page=" + page).then(function (response) {
      console.log(response);
      $scope.colors = response.data.content;
      $scope.totalPage = response.data.totalPages;
    });
  };

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
  const apiUrlCategory = "http://localhost:8080/api/category";

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
  };
  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };
  $scope.initialize = function () {
    $http.get(apiUrlCategory + "/page").then((resp) => {
      $scope.categories = resp.data.content;
      $scope.totalPages = resp.data.totalPages;
    });
  };
  $scope.initialize();

  $scope.edit = function (cate) {
    $scope.formUpdate = angular.copy(cate);
  };
  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    $http
      .post(apiUrlCategory, item)
      .then((resp) => {
        $scope.showSuccessMessage("Create category successfully!");
        $scope.initialize();
        $("#modalAdd").modal("hide");
        $scope.resetFormInput();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    $http
      .put(`${apiUrlCategory}/${item.id}`, item)
      .then((resp) => {
        $scope.showSuccessMessage("Update category successfully!");
        $scope.initialize();
        $("#modalUpdate").modal("hide");
        $scope.resetFormUpdate();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`${apiUrlCategory}/${item.id}`)
      .then((resp) => {
        $scope.showSuccessMessage("Delete color successfully!");
        $scope.initialize();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateColor.$setPristine();
    $scope.formUpdateColor.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formAddColor.$setPristine();
    $scope.formAddColor.$setUntouched();
  };

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
    $currentPage = page;
    page = page - 1;
    $http.get(apiUrlCategory + "/page?page=" + page).then(function (response) {
      $scope.categories = response.data.content;
      $scope.totalPage = response.data.totalPages;
    });
  };
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
  };

  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.favorite = $scope.originalFavorite.filter(function (item) {
        if (item && item.content) {
          return item.content
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
    $http
      .get("/customer") // Thay đổi đường dẫn API tương ứng
      .then(function (resp) {
        $scope.customers = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading customers", error);
      });
  };

  $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

  $scope.loadProductDetails = function () {
    $http
      .get("/api/productDetail") // Thay đổi đường dẫn API tương ứng
      .then(function (resp) {
        $scope.productDetails = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading productDetails", error);
      });
  };

  $scope.loadProductDetails();

  $scope.edit = function (favorite) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(favorite);
    } else {
      $scope.formUpdate = angular.copy(favorite);
      $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
    }
  };

  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    item.createdAt = $scope.currentDate;
    item.createdAt = $scope.currentDate;
    $http
      .post("/favorite", item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create favorite successfully");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    console.log(item);
    item.updatedAt = $scope.currentDate;

    $http
      .put(`/favorite/${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update Favorite successfully");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`/favorite/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Favorite successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateFavorite.$setPristine();
    $scope.formUpdateFavorite.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateFavorite.$setPristine();
    $scope.formCreateFavorite.$setUntouched();
  };

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
      return Math.ceil((1.0 * $scope.favorite.length) / this.size);
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
    },
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
  };

  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.rating = $scope.originalRating.filter(function (item) {
        if (item && item.content) {
          return item.content
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
  };

  $scope.initialize();

  $scope.loadCustomers = function () {
    $http
      .get("/customer") // Thay đổi đường dẫn API tương ứng
      .then(function (resp) {
        $scope.customers = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading customers", error);
      });
  };

  $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

  $scope.loadProductDetails = function () {
    $http
      .get("/api/productDetail") // Thay đổi đường dẫn API tương ứng
      .then(function (resp) {
        $scope.productDetails = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading productDetails", error);
      });
  };

  $scope.loadProductDetails();

  $scope.edit = function (rating) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(rating);
    } else {
      $scope.formUpdate = angular.copy(rating);
      $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
    }
  };

  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    item.createdAt = $scope.currentDate;
    $http
      .post("/rating", item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create rating successfully");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    console.log(item);
    item.updatedAt = $scope.currentDate;
    $http
      .put(`/rating/${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update rating successfully");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`/rating/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete rating successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateRating.$setPristine();
    $scope.formUpdateRating.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateRating.$setPristine();
    $scope.formCreateRating.$setUntouched();
  };

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
      return Math.ceil((1.0 * $scope.rating.length) / this.size);
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
    },
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
  };

  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.role = $scope.originalRole.filter(function (item) {
        if (item && item.fullName) {
          return item.fullName
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
  };

  $scope.initialize();

  $scope.edit = function (role) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(role);
    } else {
      $scope.formUpdate = angular.copy(role);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    item.createdAt = $scope.currentDate;
    $http
      .post("/role", item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create role successfully");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    console.log(item);
    item.updatedAt = $scope.currentDate;
    $http
      .put(`/role/${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update Role successfully");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`/role/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Role successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateRole.$setPristine();
    $scope.formUpdateRole.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateRole.$setPristine();
    $scope.formCreateRole.$setUntouched();
  };

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
      return Math.ceil((1.0 * $scope.role.length) / this.size);
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
    },
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
  };
  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.address = $scope.originalAddress.filter(function (item) {
        if (item && item.address) {
          return item.address
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
  };

  $scope.initialize();

  // $scope.customers = []; // Khởi tạo danh sách khách hàng

  $scope.loadCustomers = function () {
    $http
      .get("/customer") // Thay đổi đường dẫn API tương ứng
      .then(function (resp) {
        $scope.customers = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading customers", error);
      });
  };

  $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

  $scope.edit = function (address) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(address);
    } else {
      $scope.formUpdate = angular.copy(address);
      $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
    }
  };
  // $scope.edit = function (address) {
  //     $scope.formUpdate = angular.copy(address);
  // }

  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    item.createdAt = $scope.currentDate;
    item.address = getResult1();

    $http
      .post("/address", item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create address successfully");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };
  function getResult1() {
    let houseNumber1 = $("#houseNumber1").val();
    let city1 = $("#city1 option:selected").text();
    let district1 = $("#district1 option:selected").text();
    let ward1 = $("#ward1 option:selected").text();

    return houseNumber1 && district1 && city1 && ward1
      ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
      : "";
  }

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    console.log(item);
    item.updatedAt = $scope.currentDate;
    item.address = getResult2();

    $http
      .put(`/address/${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update address successfully");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };
  function getResult2() {
    let houseNumber2 = $("#houseNumber2").val();
    let city2 = $("#city2 option:selected").text();
    let district2 = $("#district2 option:selected").text();
    let ward2 = $("#ward2 option:selected").text();

    return houseNumber2 && district2 && city2 && ward2
      ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
      : "";
  }

  $scope.delete = function (item) {
    $http
      .delete(`/address/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete address successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateAddress.$setPristine();
    $scope.formUpdateAddress.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateAddress.$setPristine();
    $scope.formCreateAddress.$setUntouched();
  };

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
      return Math.ceil((1.0 * $scope.address.length) / this.size);
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
    },
  };

  const host = "https://provinces.open-api.vn/api/";

  var callAPI = (api, callback) => {
    return axios
      .get(api)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Load city data for the first set of elements
  callAPI(host + "?depth=1", (data) => {
    renderData(data, "city1");
  });

  // Load city data for the second set of elements
  callAPI(host + "?depth=1", (data) => {
    renderData(data, "city2");
  });

  var callApiDistrict = (api, dropdownId) => {
    callAPI(api, (data) => {
      renderData(data.districts, dropdownId);
    });
  };

  var callApiWard = (api, dropdownId) => {
    callAPI(api, (data) => {
      renderData(data.wards, dropdownId);
    });
  };

  var renderData = (array, select) => {
    let row = '<option disable value="">Chọn</option>';
    array.forEach((element) => {
      row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  $("#city1, #city2").change(function () {
    const dropdownId = $(this).attr("id");
    const districtDropdownId = dropdownId.replace("city", "district");
    const selectedCityId = $(this).find(":selected").data("id");

    // Clear district and ward dropdowns
    $("#" + districtDropdownId)
      .empty()
      .html('<option value="" selected>Chọn quận huyện</option>');

    const wardDropdownId = dropdownId.replace("city", "ward");
    $("#" + wardDropdownId)
      .empty()
      .html('<option value="" selected>Chọn phường xã</option>');

    if (selectedCityId) {
      callApiDistrict(
        host + "p/" + selectedCityId + "?depth=2",
        districtDropdownId
      );
    }
    printResult();
  });

  $("#district1, #district2").change(function () {
    const dropdownId = $(this).attr("id");
    const wardDropdownId = dropdownId.replace("district", "ward");
    const selectedDistrictId = $(this).find(":selected").data("id");

    $("#" + wardDropdownId)
      .empty()
      .html('<option value="" selected>Chọn phường xã</option>');

    if (selectedDistrictId) {
      callApiWard(
        host + "d/" + selectedDistrictId + "?depth=2",
        wardDropdownId
      );
    }
    printResult();
  });

  $("#ward1, #ward2, #houseNumber1, #houseNumber2").on(
    "change input",
    function () {
      printResult();
    }
  );

  var printResult = () => {
    let houseNumber1 = $("#houseNumber1").val();
    let city1 = $("#city1 option:selected").text();
    let district1 = $("#district1 option:selected").text();
    let ward1 = $("#ward1 option:selected").text();

    let houseNumber2 = $("#houseNumber2").val();
    let city2 = $("#city2 option:selected").text();
    let district2 = $("#district2 option:selected").text();
    let ward2 = $("#ward2 option:selected").text();

    let result1 =
      houseNumber1 && district1 && city1 && ward1
        ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
        : "";
    let result2 =
      houseNumber2 && district2 && city2 && ward2
        ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
        : "";

    $("#inputAddress1").val(result1);
    $("#inputAddress2").val(result2);
  };

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
  const apiUrlAccount = "http://localhost:8080/account";
  const apiUrlRole = "http://localhost:8080/role";

  $scope.showSuccessMessage = function (message) {
    $scope.alertMessage = message;
    $scope.showAlert = true;
    $timeout(function () {
      $scope.closeAlert();
    }, 5000);
  };

  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.account = $scope.originalAccount.filter(function (item) {
        if (item && item.account) {
          return item.account
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
    $http.get(apiUrlAccount).then(function (resp) {
      $scope.originalAccount = resp.data;
      $scope.account = angular.copy($scope.originalAccount);
    });
  };

  $scope.initialize();

  $scope.loadRoles = function () {
    $http
      .get(apiUrlRole)
      .then(function (resp) {
        $scope.roles = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading customers", error);
      });
  };

  $scope.loadRoles();

  $scope.edit = function (account) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(account);
    } else {
      $scope.formUpdate = angular.copy(account);
      $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
    }
  };
  // $scope.edit = function (account) {
  //     $scope.formUpdate = angular.copy(account);
  // }

  $scope.create = function () {
    let item = angular.copy($scope.formInput);
    item.createdAt = $scope.currentDate;
    item.password = "fiveguys123";
    item.status = 1;
    $http
      .post(apiUrlAccount + "/save", item)
      .then(function (resp) {
        $scope.showSuccessMessage("Thêm tài khoản thành công");
        $scope.resetFormInput();
        $scope.initialize();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.update = function () {
    let item = angular.copy($scope.formUpdate);
    console.log(item);
    $http
      .put(apiUrlAccount + `${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Sửa tài khoản thành công");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.delete = function (item) {
    $http
      .delete(`/account/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Xoá thành công");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateAccount.$setPristine();
    $scope.formUpdateAccount.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateAccount.$setPristine();
    $scope.formCreateAccount.$setUntouched();
  };

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
      return Math.ceil((1.0 * $scope.account.length) / this.size);
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
    },
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
  $scope.load = function () {
    $scope.loading = true;
  };
  $scope.unload = function () {
    $scope.loading = false;
  };

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
  };
  $scope.showSuccessMessage = function (message) {
    $scope.alertMessage = message;
    $scope.showAlert = true;
    $timeout(function () {
      $scope.closeAlert();
    }, 5000);
  };

  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.customer = $scope.originalCustomer.filter(function (item) {
        if (item && item.fullName) {
          return item.fullName
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
  };

  $scope.initialize();

  $scope.loadAccounts = function () {
    $http
      .get("/account/not-in-customer-employee") // Thay đổi đường dẫn API tương ứng
      .then(function (resp) {
        $scope.accounts = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading accounts", error);
      });
  };

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
    };
    if (!allowedExtensions.exec(fileInput.value)) {
      $scope.showErrorImg(
        "Please upload file having extensions .jpeg/.jpg/.png/.gif only"
      );
      return;
    } else if (fileInput.files.length > 0) {
      let data = new FormData();
      data.append("file", fileInput.files[0]);
      $scope.load();
      $http
        .post("/rest/upload", data, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then((resp) => {
          $scope.formInput.avatar = resp.data.name;
          let item = angular.copy($scope.formInput);
          item.createdAt = $scope.currentDate;
          $http
            .post(`/customer`, item)
            .then((resp) => {
              $scope.showSuccessMessage("Create Custoemr successfully!");
              $scope.initialize();
              $scope.resetFormInput();
              $("#modalAdd").modal("hide");
              $scope.showError = false;
              $scope.unload();
            })
            .catch((error) => {
              console.log("Error", error);
              $scope.unload();
              return;
            });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

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
    $http
      .put(`/customer/${item.id}`, item)
      .then((resp) => {
        $scope.showSuccessMessage("Update Customer successfully!");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
        $scope.showError = false;
        $scope.unload();
      })
      .catch((error) => {
        console.log("Error", error);
        return;
      });
  };
  $scope.update = function () {
    let fileInput = document.getElementById("image-update");
    if ($scope.formUpdate.avatar.length > 0 && !fileInput.files.length > 0) {
      $scope.apiUpdate();
    } else {
      let data = new FormData();
      data.append("file", fileInput.files[0]);
      $scope.load();
      $http
        .post("/rest/upload", data, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then((resp) => {
          $scope.formUpdate.avatar = resp.data.name;
          $scope.apiUpdate();
          $scope.unload();
        })
        .catch((error) => {
          console.log("Error", error);
          $scope.unload();
        });
    }
  };

  $scope.edit = function (customer) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(customer);
    } else {
      $scope.formUpdate = angular.copy(customer);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

  $scope.delete = function (item) {
    $http
      .delete(`/customer/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Customer successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    let fileInput = document.getElementById("image-update");
    let imagePreviewUpdate = document.getElementById("image-preview-update");
    imagePreviewUpdate.src = "/assets/img/no-img.png";
    fileInput.value = "";
    fileInput.type = "file";
    $scope.formUpdateCustomer.$setPristine();
    $scope.formUpdateCustomer.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    let fileInput = document.getElementById("image");
    let imagePreview = document.getElementById("image-preview");
    imagePreview.src = "/assets/img/no-img.png";
    fileInput.value = "";
    fileInput.type = "file";
    $scope.formCreateCustomer.$setPristine();
    $scope.formCreateCustomer.$setUntouched();
  };

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
      return Math.ceil((1.0 * $scope.customer.length) / this.size);
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
    },
  };

  $scope.xuatFile = function () {
    $http.get("/customer/excel").then(function (response) {
      alert("Xuất File Thành Công");
      // $scope.pageEm = response.data.content;
      // $scope.totalPages = response.data.totalPages
    });
  };
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
  $scope.load = function () {
    $scope.loading = true;
  };
  $scope.unload = function () {
    $scope.loading = false;
  };
  const apiEmployee = "http://localhost:8080/employee";

  imgShow("image", "image-preview");
  imgShow("image-update", "image-preview-update");
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
  };

  $scope.search = function () {
    // Kiểm tra từ khóa tìm kiếm
    if ($scope.searchKeyword.trim() !== "") {
      $scope.employee = $scope.originalEmployee.filter(function (item) {
        if (item && item.code) {
          return item.code
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
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
    $http.get(apiEmployee).then(function (resp) {
      $scope.originalEmployee = resp.data;
      $scope.employee = angular.copy($scope.originalEmployee);
    });
  };

  $scope.initialize();

  $scope.loadAccounts = function () {
    $http
      .get("/account/not-in-customer-employee")
      .then(function (resp) {
        $scope.accounts = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading accounts", error);
      });
  };

  $scope.loadAccounts();

  // create employee
  $scope.create = function () {
    let fileInput = document.getElementById("image");
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    $scope.showErrorImg = function (message) {
      $scope.alertErrorImg = message;
      $scope.showError = true;
    };
    if (!allowedExtensions.exec(fileInput.value)) {
      $scope.showErrorImg(
        "Please upload file having extensions .jpeg/.jpg/.png/.gif only"
      );
      return;
    } else if (fileInput.files.length > 0) {
      let data = new FormData();
      data.append("file", fileInput.files[0]);
      $scope.load();
      $http
        .post("/rest/upload", data, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then((resp) => {
          $scope.formInput.avatar = resp.data.name;
          let item = angular.copy($scope.formInput);
          item.createdAt = $scope.currentDate;
          $http
            .post(apiEmployee, item)
            .then((resp) => {
              $scope.showSuccessNotification("Cập nhật thông tin thành công");
              $scope.initialize();
              $scope.resetFormInput();
              $("#modalAdd").modal("hide");
              $scope.showError = false;
              $scope.unload();
            })
            .catch((error) => {
              console.log("Error", error);
              $scope.unload();
              return;
            });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };
  // create account
  $scope.createAccount = function () {
    let item = angular.copy($scope.formInput);
    item.createdAt = $scope.currentDate;
    item.active = true;
    $http
      .post("/account/save", item)
      .then(function (resp) {
        $scope.getRole();
        $scope.resetFormInput();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };
  $scope.getRole = function () {
    $http.get("/account").then(function (resp) {});
  };
  $scope.getRole();
  $scope.loadRoles = function () {
    $http
      .get("/role")
      .then(function (resp) {
        $scope.roles = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading customers", error);
      });
  };
  $scope.loadRoles();

  //Add employee Bằng file excel
  $scope.insertExcelEmployee = function () {
    var inputElement = $("#fileInput")[0];

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      var files = inputElement.files;
      var reader = new FileReader();
      reader.onloadend = async () => {
        var workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(reader.result);
        const worksheet = workbook.getWorksheet("Sheet1");
        worksheet.eachRow((row, index) => {
          if (index > 1) {
            //import bigdecimel
            // var bigDecimalValue = new Big(row.getCell(3).value);
            // var bigDecimalMinimumTotalAmount = new Big(row.getCell(5).value);
            //import date
            var BirthDate = new Date(row.getCell(2).value);
            var Gender = new Boolean(row.getCell(3).value);
            let employee = {
              // code: row.getCell(1).value,
              fullName: row.getCell(1).value,
              birthDate: BirthDate,
              gender: Gender,
              address: row.getCell(4).value,
            };
            $http.post(apiEmployee, employee).then((resp) => {
              $scope.showSuccessNotification("Cập nhật thông tin thành công");
              $scope.initialize();
              console.log("success", resp.data);
            });
          }
        });
      };
      reader.readAsArrayBuffer(files[0]);
    } else {
      console.error("No files selected.");
    }
  };

  $scope.apiUpdate = function () {
    let item = angular.copy($scope.formUpdate);
    $http
      .put(`/employee/${item.id}`, item)
      .then((resp) => {
        $scope.showSuccessNotification("Cập nhật thông tin thành công");
        $scope.resetFormUpdate();
        $scope.initialize();
        $("#modalUpdate").modal("hide");
        $scope.showError = false;
        $scope.unload();
      })
      .catch((error) => {
        console.log("Error", error);
        return;
      });
  };
  $scope.update = function () {
    let fileInput = document.getElementById("image-update");
    if ($scope.formUpdate.avatar.length > 0 && !fileInput.files.length > 0) {
      $scope.apiUpdate();
    } else {
      let data = new FormData();
      data.append("file", fileInput.files[0]);
      $scope.load();
      $http
        .post("/rest/upload", data, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then((resp) => {
          $scope.formUpdate.avatar = resp.data.name;
          $scope.apiUpdate();
          $scope.unload();
        })
        .catch((error) => {
          console.log("Error", error);
          $scope.unload();
        });
    }
  };

  $scope.edit = function (employee) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(employee);
    } else {
      $scope.formUpdate = angular.copy(employee);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

  $scope.delete = function (item) {
    $http
      .delete(`/employee/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessNotification("Cập nhật thông tin thành công");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    let fileInput = document.getElementById("image-update");
    let imagePreviewUpdate = document.getElementById("image-preview-update");
    imagePreviewUpdate.src = "/assets/img/no-img.png";
    fileInput.value = "";
    fileInput.type = "file";
    $scope.formUpdateEmployee.$setPristine();
    $scope.formUpdateEmployee.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    let fileInput = document.getElementById("image");
    let imagePreview = document.getElementById("image-preview");
    imagePreview.src = "/assets/img/no-img.png";
    fileInput.value = "";
    fileInput.type = "file";
    $scope.formCreateEmployee.$setPristine();
    $scope.formCreateEmployee.$setUntouched();
  };

  $scope.getById = function (item) {
    $http.get(`/api/employee/${item.id}`).then(function (response) {
      $scope.listEm = response.data;
      console.log(item.id);
    });
  };

  // search code employee
  $scope.getByMa = function (item) {
    // console.log(item.id);
    $http.get(`/api/employee/search/${item.id}`).then(function (response) {
      console.log(item.code);
      $scope.listEm = response.data;
      // console.log(item.code);
    });
  };

  //detaol Employee
  $scope.edit = function (employee) {
    $scope.formUpdate = angular.copy(employee);
    $scope.formUpdate.valid_form = new Date(employee.valid_form);
    $scope.formUpdate.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
  };
  $scope.show = function (employee) {
    $scope.formShow = angular.copy(employee);
    $scope.formShow.valid_form = new Date(employee.valid_form);
    $scope.formShow.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
  };

  //delete or update status Employee
  $scope.updateStatusEmployee = function (item) {
    console.log(item);
    $http.put(`/api/employee/delete/${item.id}`, item).then(function (resp) {
      // $scope.getAll();
      $scope.getAllStatusDangLam();
      console.log(item.id);
    });
  };

  // xuát file danh sách excel Employee
  $scope.xuatFile = function () {
    $http
      .get(apiEmployee + "/excel")
      .then(function (response) {
        alert("Xuất File Thành Công");
        // $scope.pageEm = response.data.content;
        // $scope.totalPages = response.data.totalPages
      })
      .catch((error) => {
        alert("hihi");
      });
  };

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
      return Math.ceil((1.0 * $scope.employee.length) / this.size);
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
    },
  };
});
//end js Hieu

app.controller(
  "myAppOfView-ctrl",
  function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

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

    console.log("myAppOfView-ctrl");
  }
);
app.controller("myAppOfView-ctrl2", function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {
    console.log("myAppOfView-ctrl2")
    $httpProvider.useApplyAsync(1000); //true
});

  app.config([
    "$compileProvider",
    function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    },
  ]);
  var app = angular.module("myAppOfView", ["ngRoute", "angular-jwt"]);
  
  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  });
  
  app.factory("authInterceptor", [
    "$q",
    "$rootScope",
    function ($q, $rootScope) {
      return {
        request: function (config) {
          // Lấy token từ localStorage
          var token = localStorage.getItem("token");
  
          // Nếu có token, thêm header 'Authorization'
          if (token) {
            config.headers["Authorization"] = "Bearer " + token;
          }
  
          return config;
        },
        responseError: function (response) {
          // Xử lý các lỗi khi nhận response
          return $q.reject(response);
        },
      };
    },
  ]);
  
  app.config([
    "$compileProvider",
    function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    },
  ]);
  
  app.config(function ($httpProvider) {
    $httpProvider.useApplyAsync(1000); //true
  });
  
  app.config(function ($routeProvider) {
    $routeProvider
  
      // Tham khao
      .when("/homeTest/123", {
        templateUrl: "thamkhao/homeTest.html",
        controller: "myAppOfView-ctrl",
      })
      .when("/productTest", {
        templateUrl: "thamkhao/productTest.html",
        controller: "myAppOfView-ctrl",
      })
      .when("/cartTest", {
        templateUrl: "thamkhao/cartTest.html",
        controller: "myAppOfView-ctrl2",
      })
      // Tham khao
      // <!-- Thuong -->
  
      // <!-- Hieu -->
  
      .when("/admin/account/account", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/account.html",
        controller: "account-ctrl",
      })
      .when("/admin/account/address", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/address.html",
        controller: "address-ctrl",
      })
      .when("/admin/account/customer", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/customer.html",
        controller: "customer-ctrl",
      })
      .when("/admin/account/employee", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/employee_home.html",
        controller: "employee-ctrl",
      })
      .when("/admin/account/favorite", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/favorite.html",
        controller: "favorite-ctrl",
      })
      .when("/admin/account/rating", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/rating.html",
        controller: "rating-ctrl",
      })
      .when("/admin/account/role", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/role.html",
        controller: "role-ctrl",
      })
      .when("/admin/brand", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/brand.html",
        controller: "brand-ctrl",
      })
      .when("/admin/category", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/category-list.html",
        controller: "category-ctrl",
      })
      .when("/admin/color", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/color-list.html",
        controller: "color-ctrl",
      })
      .when("/admin/size", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/size-list.html",
        controller: "size-ctrl",
      })
      .when("/admin/material", {
        templateUrl: "/Fe/Html-DATN2/ofView/admin/material-list.html",
        controller: "material-ctrl",
      })
      // tinh
      .when("/admin/voucher", {
        templateUrl: "/Fe/Html-DATN2/ofView/Tinh/html/voucher/voucher_home.html",
        controller: "voucher-list-controller",
      })
      .when("/admin/index", {
        templateUrl: "/Fe/Html-DATN2/ofView/Tinh/html/thongKe/thongKe.html",
        controller: "statistical-ctrl",
      });
  
    // <!-- Nguyen -->
  });
  
  // Hieu js
  //--------------------------------tinh thong kê-----------------------------
  app.controller(
    "statistical-ctrl",
    function ($scope, $http, $timeout, $document, $filter) {
      $scope.customes = {
        decrease: "decrease",
      };
      $scope.searchStatus = "1";
      const api = "http://localhost:8080/statistical";
      // tổng tiền trong  tháng
      $scope.getSum = function () {
        $http.get(api).then(function (rest) {
          $scope.getsum = rest.data;
        });
      };
      $scope.getSum();
      // Tỉ lệ tổng tiền trong  tháng
  
      // tổng hóa đơn trong  ngày
      $scope.getCodeDay = function () {
        $http.get(api + "/count-day").then(function (rest) {
          $scope.getcodeday = rest.data;
        });
      };
      $scope.getCodeDay();
      $scope.selectedOption = "1";
  
      $scope.he = function () {
        if ($scope.selectedOption === "1") {
          $scope.hi = "Hôm Nay";
        } else if ($scope.selectedOption === "2") {
          $scope.hi = "Tháng Này";
        } else {
          $scope.hi = "Năm Này";
        }
      };
      $scope.he();
  
      //search status Bill
      $scope.searchStatusBill = function () {
        var status = 3;
        if ($scope.searchStatus === "1") {
          status = 1;
        } else if ($scope.searchStatus === "2") {
          status = 2;
          console.log(status);
        } else if ($scope.searchStatus === "3") {
          status = 3;
        } else if ($scope.searchStatus === "4") {
          status = 4;
        } else if ($scope.searchStatus === "5") {
          status = 5;
        } else if ($scope.searchStatus === "6") {
          status = 6;
        } else if ($scope.searchStatus === "7") {
          status = 7;
        } else if ($scope.searchStatus === "8") {
          status = 8;
        } else if ($scope.searchStatus === "9") {
          status = 9;
        }
        $http
          .get(api + "/search-status-bill/" + `${status}`, status)
          .then(function (response) {
            $scope.getallbilllist = response.data;
            console.log(response.data);
          });
      };
      $scope.searchStatusBill;
      // get all table bill
      $scope.getAllBillList = function () {
        $http.get(api + "/get-all-list").then(function (getall) {
          $scope.getallbilllist = getall.data;
        });
      };
      $scope.getAllBillList();
  
      var today = new Date();
      today.setDate(today.getDate());
      let todayfomat = $filter("date")(today, "yyyy-MM-dd");
  
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let yesterdayFormat = $filter("date")(yesterday, "yyyy-MM-dd");
      var yesterdaymonth = new Date();
      yesterdaymonth.setDate(yesterdaymonth.getMonth() - 1);
      let yestermonthFormat = $filter("date")(yesterdaymonth, "yyyy-MM-dd");
      var yesterdayyear = new Date();
      yesterdayyear.setDate(yesterdayyear.getFullYear());
      let yesteryaerFormat = $filter("date")(yesterdayyear, "yyyy-MM-dd");
  
      // tổng tiền trong  tháng
      $scope.tongTien = function () {
        if ($scope.selectedOption === "1") {
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${todayfomat}`, todayfomat)
            .then(function (rest) {
              $scope.getsum = rest.data;
            });
          $http
            .get(
              api + "/tong-doanh-thu-ngay/" + `${yesterdayFormat}`,
              yesterdayFormat
            )
            .then(function (rest) {
              $scope.getsumtile = rest.data;
            });
          $scope.tiletongtien = $scope.getsum / $scope.getsumtile;
        } else if ($scope.selectedOption === "2") {
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${todayfomat}`, todayfomat)
            .then(function (rest) {
              $scope.getsum = rest.data;
            });
          $http
            .get(
              api + "/tong-doanh-thu-thang/" + `${yestermonthFormat}`,
              yestermonthFormat
            )
            .then(function (rest) {
              $scope.getsumtile = rest.data;
            });
          $scope.tiletongtien = $scope.getsum / $scope.getsumtile;
        } else if ($scope.selectedOption === "3") {
          $http
            .get(api + "/tong-doanh-thu-nam/" + `${todayfomat}`, todayfomat)
            .then(function (rest) {
              $scope.getsum = rest.data;
            });
          $http
            .get(
              api + "/tong-doanh-thu-nam/" + `${yesteryaerFormat}`,
              yesteryaerFormat
            )
            .then(function (rest) {
              $scope.getsumtile = rest.data;
            });
          $scope.tiletongtien = $scope.getsum / $scope.getsumtile;
        }
      };
      $scope.tongTien();
      // tổng hóa đơn trong  ngày
      $scope.tongHoaDon = function () {
        if ($scope.selectedOption === "1") {
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${todayfomat}`, todayfomat)
            .then(function (rest) {
              $scope.getcodeday = rest.data;
            });
        } else if ($scope.selectedOption === "2") {
          $http
            .get(api + "/tong-hoa-don-thang/" + `${todayfomat}`, todayfomat)
            .then(function (rest) {
              $scope.getcodeday = rest.data;
            });
        } else if ($scope.selectedOption === "3") {
          $http
            .get(api + "/tong-hoa-don-nam/" + `${todayfomat}`, todayfomat)
            .then(function (rest) {
              $scope.getcodeday = rest.data;
            });
        }
      };
      $scope.tongHoaDon();
      $scope.tongHoaDontile = function () {
        if ($scope.selectedOption === "1") {
          $http
            .get(
              api + "/tong-hoa-don-ngay/" + `${yesterdayFormat}`,
              yesterdayFormat
            )
            .then(function (rest) {
              $scope.getcodedaytile = rest.data;
            });
        } else if ($scope.selectedOption === "2") {
          $http
            .get(
              api + "/tong-hoa-don-thang/" + `${yestermonthFormat}`,
              yestermonthFormat
            )
            .then(function (rest) {
              $scope.getcodedaytile = rest.data;
              console.log("hihi");
            });
        } else if ($scope.selectedOption === "3") {
          $http
            .get(
              api + "/tong-hoa-don-nam/" + `${yesteryaerFormat}`,
              yesteryaerFormat
            )
            .then(function (rest) {
              $scope.getcodedaytile = rest.data;
            });
        }
      };
      $scope.tongHoaDontile();
      //San phâm ban ra
      $scope.tongKhachHang = function () {
        if ($scope.selectedOption === "1") {
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${todayfomat}`, todayfomat)
            .then(function (getall) {
              $scope.listcustomeryear = getall.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${yesterdayFormat}`, yesterday)
            .then(function (getall) {
              $scope.listcustomeryeartile = getall.data;
            });
          $scope.tiletongkhachhang =
            $scope.listcustomeryear / $scope.listcustomeryeartile;
        } else if ($scope.selectedOption === "2") {
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${todayfomat}`, todayfomat)
            .then(function (getall) {
              $scope.listcustomeryear = getall.data;
            });
          $http
            .get(
              api + "/san-pham-ban-ra-thang/" + `${yestermonthFormat}`,
              yesterdayFormat
            )
            .then(function (getall) {
              $scope.listcustomeryeartile = getall.data;
            });
          $scope.tiletongkhachhang =
            $scope.listcustomeryear / $scope.listcustomeryeartile;
        } else if ($scope.selectedOption === "3") {
          $http
            .get(api + "/san-pham-ban-ra-nam/" + `${todayfomat}`, todayfomat)
            .then(function (getall) {
              $scope.listcustomeryear = getall.data;
            });
          $http
            .get(
              api + "/san-pham-ban-ra-nam/" + `${yesteryaerFormat}`,
              yesteryaerFormat
            )
            .then(function (getall) {
              $scope.listcustomeryeartile = getall.data;
            });
          $scope.tiletongkhachhang =
            $scope.listcustomeryear / $scope.listcustomeryeartile;
        }
      };
      $scope.tongKhachHang();
  
      // top 5 Bán chạy
      $scope.Top5BanChay = function () {
        if ($scope.selectedOption === "1") {
          var today = new Date();
          today.setDate(today.getDate());
          let todayfomat = $filter("date")(today, "yyyy-MM-dd");
          $http
            .get(api + "/top5-ban-chay-day/" + `${todayfomat}`, todayfomat)
            .then((data) => {
              $scope.topbanchay = data.data;
            });
        } else if ($scope.selectedOption === "2") {
          var today = new Date();
          today.setDate(today.getDate());
          let todayfomat = $filter("date")(today, "yyyy-MM-dd");
          $http
            .get(api + "/top5-ban-chay-month/" + `${todayfomat}`, todayfomat)
            .then((data) => {
              $scope.topbanchay = data.data;
            });
        } else if ($scope.selectedOption === "3") {
          var today = new Date();
          today.setDate(today.getDate());
          let todayfomat = $filter("date")(today, "yyyy-MM-dd");
          $http
            .get(api + "/top5-ban-chay-year/" + `${todayfomat}`, todayfomat)
            .then((data) => {
              $scope.topbanchay = data.data;
            });
        }
      };
      $scope.Top5BanChay($scope.topbanchay);
  
      // top 5 Bán chạy theo ngay
  
      $scope.TopBanChayDate = function () {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        $http
          .get(api + "/top-ban-chay-date/" + `${todayfomat}`, todayfomat)
          .then((data) => {
            $scope.topbanchaydate = data.data;
            $scope.trafficChart($scope.topbanchaydate);
          });
      };
      $scope.TopBanChayDate();
      $scope.TopBanChayMonth = function () {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        $http
          .get(api + "/top-ban-chay-month/" + `${todayfomat}`, todayfomat)
          .then((data) => {
            $scope.topbanchaymonth = data.data;
            $scope.trafficChart($scope.topbanchaymonth);
          });
      };
      $scope.TopBanChayMonth();
      $scope.TopBanChayYear = function () {
        var today = new Date();
        today.setDate(today.getDate());
        let todayfomat = $filter("date")(today, "yyyy-MM-dd");
        $http
          .get(api + "/top-ban-chay-year/" + `${todayfomat}`, todayfomat)
          .then((data) => {
            $scope.topbanchayyear = data.data;
            $scope.trafficChart($scope.topbanchayyear);
          });
      };
      $scope.TopBanChayYear();
  
      //Sơ đồ thống kê ----------
      //Tổng khách hàng trong 1 năm     // fomat ngay
      var today = new Date();
      today.setDate(today.getDate());
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
  
      //-----fomat thang
      var today = new Date();
      today.setDate(today.getMonth());
      let thangfomat = $filter("date")(today, "yyyy-MM-dd");
      var today1 = new Date();
      today1.setDate(today1.getMonth() - 1);
      let thang1fomat = $filter("date")(today1, "yyyy-MM-dd");
      var today2 = new Date();
      today2.setDate(today2.getMonth() - 2);
      let thang2fomat = $filter("date")(today2, "yyyy-MM-dd");
      var today3 = new Date();
      today3.setDate(today3.getMonth() - 3);
      let thang3fomat = $filter("date")(today3, "yyyy-MM-dd");
      var today4 = new Date();
      today4.setDate(today4.getMonth() - 4);
      let thang4fomat = $filter("date")(today4, "yyyy-MM-dd");
      var today5 = new Date();
      today5.setDate(today5.getMonth() - 5);
      let thang5fomat = $filter("date")(today5, "yyyy-MM-dd");
      var today6 = new Date();
      today6.setDate(today6.getMonth() - 6);
      let thang6fomat = $filter("date")(today6, "yyyy-MM-dd");
      //-----fomat nam
      var today = new Date();
      today.setDate(today.getFullYear());
      let namfomat = $filter("date")(today, "yyyy-MM-dd");
      var today1 = new Date();
      today1.setDate(today1.getFullYear() - 1);
      let nam1fomat = $filter("date")(today1, "yyyy-MM-dd");
      var today2 = new Date();
      today2.setDate(today2.getFullYear() - 2);
      let nam2fomat = $filter("date")(today2, "yyyy-MM-dd");
      var today3 = new Date();
      today3.setDate(today3.getFullYear() - 3);
      let nam3fomat = $filter("date")(today3, "yyyy-MM-dd");
      var today4 = new Date();
      today4.setDate(today4.getFullYear() - 4);
      let nam4fomat = $filter("date")(today4, "yyyy-MM-dd");
      today3.setDate(today3.getFullYear() - 5);
      let nam5fomat = $filter("date")(today3, "yyyy-MM-dd");
      var today4 = new Date();
      today4.setDate(today4.getFullYear() - 6);
      let nam6fomat = $filter("date")(today4, "yyyy-MM-dd");
  
      $scope.listCustomerDay = function () {
        if ($scope.selectedOption === "1") {
          // list customes-------
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${todayfomat}`, todayfomat)
            .then(function (getall) {
              $scope.listcustomerday = getall.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${today1fomat}`, today1fomat)
            .then(function (getall1) {
              $scope.listcustomerday1 = getall1.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${today2fomat}`, today2fomat)
            .then(function (getall2) {
              $scope.listcustomerday2 = getall2.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${today3fomat}`, today3fomat)
            .then(function (getall3) {
              $scope.listcustomerday3 = getall3.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${today4fomat}`, today4fomat)
            .then(function (getall4) {
              $scope.listcustomerday4 = getall4.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${today5fomat}`, today5fomat)
            .then(function (getall5) {
              $scope.listcustomerday5 = getall5.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-ngay/" + `${today6fomat}`, today6fomat)
            .then(function (getall6) {
              $scope.listcustomerday6 = getall6.data;
            });
  
          //List bill---------
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${todayfomat}`, todayfomat)
            .then(function (getbill) {
              $scope.listbillday = getbill.data;
            });
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${today1fomat}`, today1fomat)
            .then(function (getbill1) {
              $scope.listbillday1 = getbill1.data;
            });
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${today2fomat}`, today2fomat)
            .then(function (getbill2) {
              $scope.listbillday2 = getbill2.data;
            });
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${today3fomat}`, today3fomat)
            .then(function (getbill3) {
              $scope.listbillday3 = getbill3.data;
            });
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${today4fomat}`, today4fomat)
            .then(function (getbill4) {
              $scope.listbillday4 = getbill4.data;
            });
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${today5fomat}`, today5fomat)
            .then(function (getbill5) {
              $scope.listbillday5 = getbill5.data;
            });
          $http
            .get(api + "/tong-hoa-don-ngay/" + `${today6fomat}`, today6fomat)
            .then(function (getbill6) {
              $scope.listbillday6 = getbill6.data;
            });
          //List Doanh thu-------
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${todayfomat}`, todayfomat)
            .then(function (getbill) {
              $scope.listdoanhthuday = getbill.data;
            });
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${today1fomat}`, today1fomat)
            .then(function (getbill1) {
              $scope.listdoanhthuday1 = getbill1.data;
            });
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${today2fomat}`, today2fomat)
            .then(function (getbill2) {
              $scope.listdoanhthuday2 = getbill2.data;
            });
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${today3fomat}`, today3fomat)
            .then(function (getbill3) {
              $scope.listdoanhthuday3 = getbill3.data;
            });
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${today4fomat}`, today4fomat)
            .then(function (getbill4) {
              $scope.listdoanhthuday4 = getbill4.data;
            });
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${today5fomat}`, today5fomat)
            .then(function (getbill5) {
              $scope.listdoanhthuday5 = getbill5.data;
            });
          $http
            .get(api + "/tong-doanh-thu-ngay/" + `${today6fomat}`, today6fomat)
            .then(function (getbill6) {
              $scope.listdoanhthuday6 = getbill6.data;
              renderChart();
            });
          //--------------------------------------------else if
        } else if ($scope.selectedOption === "2") {
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${thangfomat}`, thangfomat)
            .then(function (getall) {
              $scope.listcustomerday = getall.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${thang1fomat}`, thang1fomat)
            .then(function (getall1) {
              $scope.listcustomerday1 = getall1.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${thang2fomat}`, thang2fomat)
            .then(function (getall2) {
              $scope.listcustomerday2 = getall2.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${thang3fomat}`, thang3fomat)
            .then(function (getall3) {
              $scope.listcustomerday3 = getall3.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${thang4fomat}`, thang4fomat)
            .then(function (getall4) {
              $scope.listcustomerday4 = getall4.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${thang5fomat}`, thang5fomat)
            .then(function (getall5) {
              $scope.listcustomerday5 = getall5.data;
            });
          $http
            .get(api + "/san-pham-ban-ra-thang/" + `${thang6fomat}`, thang6fomat)
            .then(function (getall6) {
              $scope.listcustomerday6 = getall6.data;
            });
  
          //List bill---------
          $http
            .get(api + "/tong-hoa-don-thang/" + `${thangfomat}`, thangfomat)
            .then(function (getbill) {
              $scope.listbillday = getbill.data;
            });
          $http
            .get(api + "/tong-hoa-don-thang/" + `${thang1fomat}`, thang1fomat)
            .then(function (getbill1) {
              $scope.listbillday1 = getbill1.data;
            });
          $http
            .get(api + "/tong-hoa-don-thang/" + `${thang2fomat}`, thang2fomat)
            .then(function (getbill2) {
              $scope.listbillday2 = getbill2.data;
            });
          $http
            .get(api + "/tong-hoa-don-thang/" + `${thang3fomat}`, thang3fomat)
            .then(function (getbill3) {
              $scope.listbillday3 = getbill3.data;
            });
          $http
            .get(api + "/tong-hoa-don-thang/" + `${thang4fomat}`, thang4fomat)
            .then(function (getbill4) {
              $scope.listbillday4 = getbill4.data;
            });
          $http
            .get(api + "/tong-hoa-don-thang/" + `${thang5fomat}`, thang5fomat)
            .then(function (getbill5) {
              $scope.listbillday5 = getbill5.data;
            });
          $http
            .get(api + "/tong-hoa-don-thang/" + `${thang6fomat}`, thang6fomat)
            .then(function (getbill6) {
              $scope.listbillday6 = getbill6.data;
            });
          //List Doanh thu-------
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${thangfomat}`, thangfomat)
            .then(function (getbill) {
              $scope.listdoanhthuday = getbill.data;
            });
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${thang1fomat}`, thang1fomat)
            .then(function (getbill1) {
              $scope.listdoanhthuday1 = getbill1.data;
            });
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${thang2fomat}`, thang2fomat)
            .then(function (getbill2) {
              $scope.listdoanhthuday2 = getbill2.data;
            });
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${thang3fomat}`, thang3fomat)
            .then(function (getbill3) {
              $scope.listdoanhthuday3 = getbill3.data;
            });
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${thang4fomat}`, thang4fomat)
            .then(function (getbill4) {
              $scope.listdoanhthuday4 = getbill4.data;
            });
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${thang5fomat}`, thang5fomat)
            .then(function (getbill5) {
              $scope.listdoanhthuday5 = getbill5.data;
            });
          $http
            .get(api + "/tong-doanh-thu-thang/" + `${thang6fomat}`, thang6fomat)
            .then(function (getbill6) {
              $scope.listdoanhthuday6 = getbill6.data;
              renderChart();
            });
        }
        //     else if ($scope.selectedOption === "3") {
        //         $http
        //         .get(api + "/san-pham-ban-ra-nam/" + `${namfomat}`, namfomat)
        //         .then(function (getall) {
        //           $scope.listcustomerday = getall.data;
        //         });
        //       $http
        //         .get(api + "/san-pham-ban-ra-nam/" + `${nam1fomat}`, nam1fomat)
        //         .then(function (getall1) {
        //           $scope.listcustomerday1 = getall1.data;
        //         });
        //       $http
        //         .get(api + "/san-pham-ban-ra-nam/" + `${nam2fomat}`, nam2fomat)
        //         .then(function (getall2) {
        //           $scope.listcustomerday2 = getall2.data;
        //         });
        //       $http
        //         .get(api + "/san-pham-ban-ra-nam/" + `${nam3fomat}`, nam3fomat)
        //         .then(function (getall3) {
        //           $scope.listcustomerday3 = getall3.data;
        //         });
        //       $http
        //         .get(api + "/san-pham-ban-ra-nam/" + `${nam4fomat}`, nam4fomat)
        //         .then(function (getall4) {
        //           $scope.listcustomerday4 = getall4.data;
        //         });
        //          $http
        // .get(api + "/san-pham-ban-ra-nam/" + `${nam5fomat}`, nam6fomat)
        //         .then(function (getall3) {
        //           $scope.listcustomerday5 = getall3.data;
        //         });
        //       $http
        //         .get(api + "/san-pham-ban-ra-nam/" + `${nam6fomat}`, nam6fomat)
        //         .then(function (getall4) {
        //           $scope.listcustomerday = getall4.data;
        //         });
  
        //       //List bill---------
        //       $http
        //         .get(api + "/tong-hoa-don-nam/" + `${namfomat}`, namfomat)
        //         .then(function (getbill) {
        //           $scope.listbillday = getbill.data;
        //         });
        //       $http
        //         .get(api + "/tong-hoa-don-nam/" + `${nam1fomat}`, nam1fomat)
        //         .then(function (getbill1) {
        //           $scope.listbillday1 = getbill1.data;
        //         });
        //       $http
        //         .get(api + "/tong-hoa-don-nam/" + `${nam2fomat}`, thang2fomat)
        //         .then(function (getbill2) {
        //           $scope.listbillday2 = getbill2.data;
        //         });
        //       $http
        //         .get(api + "/tong-hoa-don-nam/" + `${nam3fomat}`, nam3fomat)
        //         .then(function (getbill3) {
        //           $scope.listbillday3 = getbill3.data;
        //         });
        //       $http
        //         .get(api + "/tong-hoa-don-nam/" + `${nam4fomat}`, nam4fomat)
        //         .then(function (getbill4) {
        //           $scope.listbillday4 = getbill4.data;
        //         });
        //         $http
        //         .get(api + "/tong-hoa-don-nam/" + `${nam6fomat}`, nam5fomat)
        //         .then(function (getbill3) {
        //           $scope.listbillday5 = getbill3.data;
        //         });
        //       $http
        //         .get(api + "/tong-hoa-don-nam/" + `${nam6fomat}`, nam6fomat)
        //         .then(function (getbill4) {
        //           $scope.listbillday6 = getbill4.data;
        //         });
  
        //       //List Doanh thu-------
        //       $http
        //         .get(api + "/tong-doanh-thu-nam/" + `${namfomat}`, namfomat)
        //         .then(function (getbill) {
        //           $scope.listdoanhthuday = getbill.data;
        //         });
        //       $http
        //         .get(api + "/tong-doanh-thu-nam/" + `${nam1fomat}`, nam1fomat)
        //         .then(function (getbill1) {
        //           $scope.listdoanhthuday1 = getbill1.data;
        //         });
        //       $http
        //         .get(api + "/tong-doanh-thu-nam/" + `${nam2fomat}`, nam2fomat)
        //         .then(function (getbill2) {
        //           $scope.listdoanhthuday2 = getbill2.data;
        //         });
        //       $http
        //         .get(api + "/tong-doanh-thu-nam/" + `${nam3fomat}`, nam3fomat)
        //         .then(function (getbill3) {
        //           $scope.listdoanhthuday3 = getbill3.data;
        //         });
        //       $http
        //         .get(api + "/tong-doanh-thu-nam/" + `${nam4fomat}`, nam4fomat)
        //         .then(function (getbill4) {
        //   $scope.listdoanhthuday4 = getbill4.data;
        //         });
        //      $http
        //         .get(api + "/tong-doanh-thu-nam/" + `${nam5fomat}`, nam5fomat)
        //         .then(function (getbill3) {
        //           $scope.listdoanhthuday5 = getbill3.data;
        //         });
        //       $http
        //         .get(api + "/tong-doanh-thu-nam/" + `${nam6fomat}`, nam6fomat)
        //         .then(function (getbill4) {
        //           $scope.listdoanhthuday6 = getbill4.data;
        //           renderChart();
        //         });
        //     }
      };
  
      function renderChart() {
        //------------
  
        new ApexCharts(document.querySelector("#reportsChart"), {
          series: [
            {
              name: "Hóa Đơn",
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
              name: "Sản Phẩm",
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
            {
              name: "Doanh Thu",
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
              // `${todayfomat}`,
              `${today6fomat}`,
              `${today5fomat}`,
              `${today4fomat}`,
              `${today3fomat}`,
              `${today2fomat}`,
              `${today1fomat}`,
              `${todayfomat}`,
              // $scope.formattedDateTomorrow,
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
  
      //Thống kê sản phâm bán chạy
      $scope.trafficChart = function () {
        if ($scope.selectedOption === "1") {
          if ($scope.topbanchaydate && $scope.topbanchaydate.length > 0) {
            var chartData = [];
            for (var i = 0; i < $scope.topbanchaydate.length; i++) {
              var currentItem = $scope.topbanchaydate[i];
              var itemData = {
                name: currentItem.ten_sanpham,
                value: currentItem.so_luong_ban,
              };
              chartData.push(itemData);
            }
          }
        } else if ($scope.selectedOption === "2") {
          if ($scope.topbanchaymonth && $scope.topbanchaymonth.length > 0) {
            var chartData = [];
            for (var i = 0; i < $scope.topbanchaymonth.length; i++) {
              var currentItem = $scope.topbanchaymonth[i];
  
              var itemData = {
                name: currentItem.ten_sanpham,
                value: currentItem.so_luong_ban,
              };
              chartData.push(itemData);
            }
          }
        } else if ($scope.selectedOption === "3") {
          if ($scope.topbanchayyear && $scope.topbanchayyear.length > 0) {
            var chartData = [];
            for (var i = 0; i < $scope.topbanchayyear.length; i++) {
              var currentItem = $scope.topbanchayyear[i];
              var itemData = {
                name: currentItem.ten_sanpham,
                value: currentItem.so_luong_ban,
              };
              chartData.push(itemData);
            }
          }
        }
        //bieeur ddoof
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
              data: chartData,
            },
          ],
        });
      };
      $scope.trafficChart();
      $scope.availablePageSizes = [5, 10, 20, 50, 100];
      $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
      };
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
  //---------------------------------Tịnh end thong kê---------------------------
  //---------------------------------Tịnh Voucher---------------------------
  app.controller("voucher-list-controller", function ($scope, $http, $timeout) {
    const apiUrlVoucher = "http://localhost:8080/api/voucher";
    const apiUrlAccount = "http://localhost:8080/account";
    $scope.voucher = [];
    $scope.formUpdate = {};
    $scope.formShow = {};
    $scope.formInput = {};
    $scope.formtimkiem = "1";
    $scope.showAlert = false;
    $scope.hihi = {};
  
    $scope.label1 = {
      update: "Thêm",
    };
    $scope.button = {};
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
  
    $scope.getAll = function () {
      $http.get(apiUrlVoucher).then(function (response) {
        $scope.listVoucher = response.data;
      });
    };
    $scope.getAll();
  
    //tìm kiếm voucher theo status
    $scope.timkiemStatus = function () {
      if ($scope.formtimkiem === "5") {
        $http.get(apiUrlVoucher + "/timkiem-status/1").then(function (response) {
          $scope.listVoucher = response.data;
        });
      } else if ($scope.formtimkiem === "2") {
        $http.get(apiUrlVoucher + "/timkiem-status/2").then(function (response) {
          $scope.listVoucher = response.data;
        });
      } else if ($scope.formtimkiem === "0") {
        $http.get(apiUrlVoucher + "/timkiem-status/0").then(function (response) {
          $scope.listVoucher = response.data;
        });
      } else if ($scope.formtimkiem === "3") {
        $http.get(apiUrlVoucher + "/timkiem-status/3").then(function (response) {
          $scope.listVoucher = response.data;
        });
      } else if ($scope.formtimkiem === "4") {
        $http.get(apiUrlVoucher + "/timkiem-status/4").then(function (response) {
          $scope.listVoucher = response.data;
        });
      } else if ($scope.formtimkiem === "1") {
        $http.get(apiUrlVoucher).then(function (response) {
          $scope.listVoucher = response.data;
        });
      }
    };
    $scope.timkiemStatus();
    // getById Voucher
    $scope.getById = function (item) {
      $http.get(`/api/voucher/${item.id}`).then(function (response) {
        $scope.listVoucher = response.data;
        console.log(item.id);
      });
    };
  
    //Khai báo status voucher
    $scope.statusOptions = [
      { value: 0, label: "Chưa hoạt động" },
      { value: 1, label: "Đang hoạt động" },
      { value: 2, label: "Hết khuyến mại" },
      { value: 3, label: "Hết hạn" },
      { value: 4, label: "Đá xóa" },
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
    // var modal = document.getElementById("modalAdd");
    // create Employee
    $scope.addVoucher = function (newVoucher) {
      let item = angular.copy($scope.formInput);
      $http
        .post(apiUrlVoucher, item)
        .then(function (resp) {
          $scope.showSuccessNotification("Cập nhật thông tin thành công");
          $scope.resetFormInput();
          $scope.getAll();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
    // update Voucher
    $scope.updateVoucher = function () {
      let item = angular.copy($scope.formInput);
      $http
        .put(apiUrlVoucher + "/update/" + `${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessNotification("Cập nhật thông tin thành công");
          $scope.resetFormInput();
          $scope.getAll();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    //delete update status Employee
    $scope.updateStatusVoucher = function (item) {
      $http
        .put(apiUrlVoucher + "/delete/" + `${item.id}`, item)
        .then(function (resp) {
          $scope.getAll();
        });
    };
  
    //submit add and update
    $scope.submit = function () {
      if (($scope.formInput.id = true)) {
        $scope.updateVoucher();
      } else if (($scope.formInput.id = false)) {
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
  
    $scope.insertExcelVoucher = function () {
      var inputElement = $("#fileInput")[0];
  
      if (inputElement && inputElement.files && inputElement.files.length > 0) {
        var files = inputElement.files;
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
              $http.post(apiUrlVoucher, voucher).then((resp) => {
                $scope.showSuccessNotification("Cập nhật thông tin thành công");
                $scope.getAll();
              });
            }
          });
        };
        reader.readAsArrayBuffer(files[0]);
      } else {
        console.error("No files selected.");
      }
    };
    $scope.changePageSize = function () {
      $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };
    /////
  
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    $scope.availablePageSizes = [5, 10, 20, 50, 100];
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
  //---------------------------------Tịnh end Voucher---------------------------
  
  app.controller("brand-ctrl", function ($scope, $http, $timeout) {
    $scope.originalbrand = [];
    $scope.brand = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();
    const apiBrand = "http://localhost:8080/brand";
  
    $scope.showSuccessMessage = function (message) {
      $scope.alertMessage = message;
      $scope.showAlert = true;
      $timeout(function () {
        $scope.closeAlert();
      }, 5000);
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.brand = $scope.originalBrand.filter(function (item) {
          if (item && item.name) {
            return item.name
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
      $http.get(apiBrand).then(function (resp) {
        $scope.originalBrand = resp.data; // Lưu dữ liệu gốc
        $scope.brand = angular.copy($scope.originalBrand); // Sao chép dữ liệu gốc sang mảng hiển thị
      });
    };
  
    $scope.initialize();
  
    $scope.edit = function (brand) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(brand);
      } else {
        $scope.formUpdate = angular.copy(brand);
        $scope.formUpdate.updatedAt = new Date();
      }
    };
  
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
      $http
        .post(apiBrand, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create brand successfully");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          if (error.status === 400 && error.data === "Name already exists") {
            $scope.nameExists = true;
          } else {
            console.log("Error", error);
          }
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      item.updatedAt = $scope.currentDate;
      $http
        .put(apiBrand + `${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update Brand successfully");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          if (error.status === 400 && error.data === "Name already exists") {
            $scope.nameExists = true;
          } else {
            console.log("Error", error);
          }
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`/brand/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete Brand successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateBrand.$setPristine();
      $scope.formUpdateBrand.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateBrand.$setPristine();
      $scope.formCreateBrand.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.brand.length) / this.size);
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
      },
    };
  });
  app.controller("size-ctrl", function ($scope, $http, $timeout) {
    const apiUrlSize = "http://localhost:8080/api/size";
  
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
    };
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
    $scope.initialize = function () {
      $http.get(apiUrlSize + "/page").then((resp) => {
        $scope.sizes = resp.data.content;
        $scope.totalPages = resp.data.totalPages;
      });
    };
    $scope.initialize();
  
    $scope.edit = function (cate) {
      $scope.formUpdate = angular.copy(cate);
    };
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      $http
        .post(apiUrlSize, item)
        .then((resp) => {
          $scope.showSuccessMessage("Create size successfully!");
          $scope.initialize();
          $("#modalAdd").modal("hide");
          $scope.resetFormInput();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      $http
        .put(`${apiUrlSize}/${item.id}`, item)
        .then((resp) => {
          $scope.showSuccessMessage("Update size successfully!");
          $scope.initialize();
          $("#modalUpdate").modal("hide");
          $scope.resetFormUpdate();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`${apiUrlSize}/${item.id}`)
        .then((resp) => {
          $scope.showSuccessMessage("Delete color successfully!");
          $scope.initialize();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateColor.$setPristine();
      $scope.formUpdateColor.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formAddColor.$setPristine();
      $scope.formAddColor.$setUntouched();
    };
  
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
      $currentPage = page;
      page = page - 1;
      $http.get(apiUrlSize + "/page?page=" + page).then(function (response) {
        $scope.sizes = response.data.content;
        $scope.totalPage = response.data.totalPages;
      });
    };
  });
  
  app.controller("material-ctrl", function ($scope, $http, $timeout) {
    const apiUrlMaterial = "http://localhost:8080/api/material";
  
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
    };
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
    $scope.initialize = function () {
      $http.get(apiUrlMaterial + "/page").then((resp) => {
        $scope.materials = resp.data.content;
        $scope.totalPages = resp.data.totalPages;
      });
    };
    $scope.initialize();
  
    $scope.edit = function (cate) {
      $scope.formUpdate = angular.copy(cate);
    };
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      $http
        .post(apiUrlMaterial, item)
        .then((resp) => {
          $scope.showSuccessMessage("Create material successfully!");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      $http
        .put(`${apiUrlMaterial}/${item.id}`, item)
        .then((resp) => {
          $scope.showSuccessMessage("Update material successfully!");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`${apiUrlMaterial}/${item.id}`)
        .then((resp) => {
          $scope.showSuccessMessage("Delete color successfully!");
          $scope.initialize();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateColor.$setPristine();
      $scope.formUpdateColor.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formAddColor.$setPristine();
      $scope.formAddColor.$setUntouched();
    };
  
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
      $http.get(apiUrlMaterial + "/page?page=" + page).then(function (response) {
        console.log(response);
        $scope.materials = response.data.content;
        $scope.totalPage = response.data.totalPages;
      });
    };
  
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
    const apiUrlColor = "http://localhost:8080/api/color";
  
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
    };
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
    $scope.initialize = function () {
      $http.get(apiUrlColor + "/page").then((resp) => {
        $scope.colors = resp.data.content;
        $scope.totalPages = resp.data.totalPages;
      });
    };
    $scope.initialize();
  
    $scope.edit = function (cate) {
      $scope.formUpdate = angular.copy(cate);
    };
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      $http
        .post(apiUrlColor, item)
        .then((resp) => {
          $scope.showSuccessMessage("Create color successfully!");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      $http
        .put(`${apiUrlColor}/${item.id}`, item)
        .then((resp) => {
          $scope.showSuccessMessage("Update color successfully!");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`${apiUrlColor}/${item.id}`)
        .then((resp) => {
          $scope.showSuccessMessage("Delete color successfully!");
          $scope.initialize();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateColor.$setPristine();
      $scope.formUpdateColor.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formAddColor.$setPristine();
      $scope.formAddColor.$setUntouched();
    };
  
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
      $http.get(apiUrlColor + "/page?page=" + page).then(function (response) {
        console.log(response);
        $scope.colors = response.data.content;
        $scope.totalPage = response.data.totalPages;
      });
    };
  
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
    const apiUrlCategory = "http://localhost:8080/api/category";
  
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
    };
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
    $scope.initialize = function () {
      $http.get(apiUrlCategory + "/page").then((resp) => {
        $scope.categories = resp.data.content;
        $scope.totalPages = resp.data.totalPages;
      });
    };
    $scope.initialize();
  
    $scope.edit = function (cate) {
      $scope.formUpdate = angular.copy(cate);
    };
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      $http
        .post(apiUrlCategory, item)
        .then((resp) => {
          $scope.showSuccessMessage("Create category successfully!");
          $scope.initialize();
          $("#modalAdd").modal("hide");
          $scope.resetFormInput();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      $http
        .put(`${apiUrlCategory}/${item.id}`, item)
        .then((resp) => {
          $scope.showSuccessMessage("Update category successfully!");
          $scope.initialize();
          $("#modalUpdate").modal("hide");
          $scope.resetFormUpdate();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`${apiUrlCategory}/${item.id}`)
        .then((resp) => {
          $scope.showSuccessMessage("Delete color successfully!");
          $scope.initialize();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateColor.$setPristine();
      $scope.formUpdateColor.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formAddColor.$setPristine();
      $scope.formAddColor.$setUntouched();
    };
  
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
      $currentPage = page;
      page = page - 1;
      $http.get(apiUrlCategory + "/page?page=" + page).then(function (response) {
        $scope.categories = response.data.content;
        $scope.totalPage = response.data.totalPages;
      });
    };
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
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.favorite = $scope.originalFavorite.filter(function (item) {
          if (item && item.content) {
            return item.content
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
      $http
        .get("/customer") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.customers = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading customers", error);
        });
    };
  
    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy
  
    $scope.loadProductDetails = function () {
      $http
        .get("/api/productDetail") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.productDetails = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading productDetails", error);
        });
    };
  
    $scope.loadProductDetails();
  
    $scope.edit = function (favorite) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(favorite);
      } else {
        $scope.formUpdate = angular.copy(favorite);
        $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
      }
    };
  
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      item.createdAt = $scope.currentDate;
      $http
        .post("/favorite", item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create favorite successfully");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      item.updatedAt = $scope.currentDate;
  
      $http
        .put(`/favorite/${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update Favorite successfully");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`/favorite/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete Favorite successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateFavorite.$setPristine();
      $scope.formUpdateFavorite.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateFavorite.$setPristine();
      $scope.formCreateFavorite.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.favorite.length) / this.size);
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
      },
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
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.rating = $scope.originalRating.filter(function (item) {
          if (item && item.content) {
            return item.content
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
    };
  
    $scope.initialize();
  
    $scope.loadCustomers = function () {
      $http
        .get("/customer") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.customers = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading customers", error);
        });
    };
  
    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy
  
    $scope.loadProductDetails = function () {
      $http
        .get("/api/productDetail") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.productDetails = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading productDetails", error);
        });
    };
  
    $scope.loadProductDetails();
  
    $scope.edit = function (rating) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(rating);
      } else {
        $scope.formUpdate = angular.copy(rating);
        $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
      }
    };
  
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      $http
        .post("/rating", item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create rating successfully");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      item.updatedAt = $scope.currentDate;
      $http
        .put(`/rating/${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update rating successfully");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`/rating/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete rating successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateRating.$setPristine();
      $scope.formUpdateRating.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateRating.$setPristine();
      $scope.formCreateRating.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.rating.length) / this.size);
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
      },
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
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.role = $scope.originalRole.filter(function (item) {
          if (item && item.fullName) {
            return item.fullName
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
    };
  
    $scope.initialize();
  
    $scope.edit = function (role) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(role);
      } else {
        $scope.formUpdate = angular.copy(role);
        $scope.formUpdate.updatedAt = new Date();
      }
    };
  
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      $http
        .post("/role", item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create role successfully");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      item.updatedAt = $scope.currentDate;
      $http
        .put(`/role/${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update Role successfully");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`/role/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete Role successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateRole.$setPristine();
      $scope.formUpdateRole.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateRole.$setPristine();
      $scope.formCreateRole.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.role.length) / this.size);
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
      },
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
    };
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.address = $scope.originalAddress.filter(function (item) {
          if (item && item.address) {
            return item.address
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
    };
  
    $scope.initialize();
  
    // $scope.customers = []; // Khởi tạo danh sách khách hàng
  
    $scope.loadCustomers = function () {
      $http
        .get("/customer") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.customers = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading customers", error);
        });
    };
  
    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy
  
    $scope.edit = function (address) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(address);
      } else {
        $scope.formUpdate = angular.copy(address);
        $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
      }
    };
    // $scope.edit = function (address) {
    //     $scope.formUpdate = angular.copy(address);
    // }
  
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      item.address = getResult1();
  
      $http
        .post("/address", item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create address successfully");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
    function getResult1() {
      let houseNumber1 = $("#houseNumber1").val();
      let city1 = $("#city1 option:selected").text();
      let district1 = $("#district1 option:selected").text();
      let ward1 = $("#ward1 option:selected").text();
  
      return houseNumber1 && district1 && city1 && ward1
        ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
        : "";
    }
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      item.updatedAt = $scope.currentDate;
      item.address = getResult2();
  
      $http
        .put(`/address/${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update address successfully");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
    function getResult2() {
      let houseNumber2 = $("#houseNumber2").val();
      let city2 = $("#city2 option:selected").text();
      let district2 = $("#district2 option:selected").text();
      let ward2 = $("#ward2 option:selected").text();
  
      return houseNumber2 && district2 && city2 && ward2
        ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
        : "";
    }
  
    $scope.delete = function (item) {
      $http
        .delete(`/address/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete address successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateAddress.$setPristine();
      $scope.formUpdateAddress.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateAddress.$setPristine();
      $scope.formCreateAddress.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.address.length) / this.size);
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
      },
    };
  
    const host = "https://provinces.open-api.vn/api/";
  
    var callAPI = (api, callback) => {
      return axios
        .get(api)
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  
    // Load city data for the first set of elements
    callAPI(host + "?depth=1", (data) => {
      renderData(data, "city1");
    });
  
    // Load city data for the second set of elements
    callAPI(host + "?depth=1", (data) => {
      renderData(data, "city2");
    });
  
    var callApiDistrict = (api, dropdownId) => {
      callAPI(api, (data) => {
        renderData(data.districts, dropdownId);
      });
    };
  
    var callApiWard = (api, dropdownId) => {
      callAPI(api, (data) => {
        renderData(data.wards, dropdownId);
      });
    };
  
    var renderData = (array, select) => {
      let row = '<option disable value="">Chọn</option>';
      array.forEach((element) => {
        row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
      });
      document.querySelector("#" + select).innerHTML = row;
    };
  
    $("#city1, #city2").change(function () {
      const dropdownId = $(this).attr("id");
      const districtDropdownId = dropdownId.replace("city", "district");
      const selectedCityId = $(this).find(":selected").data("id");
  
      // Clear district and ward dropdowns
      $("#" + districtDropdownId)
        .empty()
        .html('<option value="" selected>Chọn quận huyện</option>');
  
      const wardDropdownId = dropdownId.replace("city", "ward");
      $("#" + wardDropdownId)
        .empty()
        .html('<option value="" selected>Chọn phường xã</option>');
  
      if (selectedCityId) {
        callApiDistrict(
          host + "p/" + selectedCityId + "?depth=2",
          districtDropdownId
        );
      }
      printResult();
    });
  
    $("#district1, #district2").change(function () {
      const dropdownId = $(this).attr("id");
      const wardDropdownId = dropdownId.replace("district", "ward");
      const selectedDistrictId = $(this).find(":selected").data("id");
  
      $("#" + wardDropdownId)
        .empty()
        .html('<option value="" selected>Chọn phường xã</option>');
  
      if (selectedDistrictId) {
        callApiWard(
          host + "d/" + selectedDistrictId + "?depth=2",
          wardDropdownId
        );
      }
      printResult();
    });
  
    $("#ward1, #ward2, #houseNumber1, #houseNumber2").on(
      "change input",
      function () {
        printResult();
      }
    );
  
    var printResult = () => {
      let houseNumber1 = $("#houseNumber1").val();
      let city1 = $("#city1 option:selected").text();
      let district1 = $("#district1 option:selected").text();
      let ward1 = $("#ward1 option:selected").text();
  
      let houseNumber2 = $("#houseNumber2").val();
      let city2 = $("#city2 option:selected").text();
      let district2 = $("#district2 option:selected").text();
      let ward2 = $("#ward2 option:selected").text();
  
      let result1 =
        houseNumber1 && district1 && city1 && ward1
          ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
          : "";
      let result2 =
        houseNumber2 && district2 && city2 && ward2
          ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
          : "";
  
      $("#inputAddress1").val(result1);
      $("#inputAddress2").val(result2);
    };
  
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
    const apiUrlAccount = "http://localhost:8080/account";
    const apiUrlRole = "http://localhost:8080/role";
  
    $scope.showSuccessMessage = function (message) {
      $scope.alertMessage = message;
      $scope.showAlert = true;
      $timeout(function () {
        $scope.closeAlert();
      }, 5000);
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.account = $scope.originalAccount.filter(function (item) {
          if (item && item.account) {
            return item.account
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
      $http.get(apiUrlAccount).then(function (resp) {
        $scope.originalAccount = resp.data;
        $scope.account = angular.copy($scope.originalAccount);
      });
    };
  
    $scope.initialize();
  
    $scope.loadRoles = function () {
      $http
        .get(apiUrlRole)
        .then(function (resp) {
          $scope.roles = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading customers", error);
        });
    };
  
    $scope.loadRoles();
  
    $scope.edit = function (account) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(account);
      } else {
        $scope.formUpdate = angular.copy(account);
        $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
      }
    };
    // $scope.edit = function (account) {
    //     $scope.formUpdate = angular.copy(account);
    // }
  
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      item.password = "fiveguys123";
      item.status = 1;
      $http
        .post(apiUrlAccount + "/save", item)
        .then(function (resp) {
          $scope.showSuccessMessage("Thêm tài khoản thành công");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      $http
        .put(apiUrlAccount + `${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Sửa tài khoản thành công");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`/account/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Xoá thành công");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateAccount.$setPristine();
      $scope.formUpdateAccount.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateAccount.$setPristine();
      $scope.formCreateAccount.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.account.length) / this.size);
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
      },
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
    $scope.load = function () {
      $scope.loading = true;
    };
    $scope.unload = function () {
      $scope.loading = false;
    };
  
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
    };
    $scope.showSuccessMessage = function (message) {
      $scope.alertMessage = message;
      $scope.showAlert = true;
      $timeout(function () {
        $scope.closeAlert();
      }, 5000);
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.customer = $scope.originalCustomer.filter(function (item) {
          if (item && item.fullName) {
            return item.fullName
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
    };
  
    $scope.initialize();
  
    $scope.loadAccounts = function () {
      $http
        .get("/account/not-in-customer-employee") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.accounts = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading accounts", error);
        });
    };
  
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
      };
      if (!allowedExtensions.exec(fileInput.value)) {
        $scope.showErrorImg(
          "Please upload file having extensions .jpeg/.jpg/.png/.gif only"
        );
        return;
      } else if (fileInput.files.length > 0) {
        let data = new FormData();
        data.append("file", fileInput.files[0]);
        $scope.load();
        $http
          .post("/rest/upload", data, {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined },
          })
          .then((resp) => {
            $scope.formInput.avatar = resp.data.name;
            let item = angular.copy($scope.formInput);
            item.createdAt = $scope.currentDate;
            $http
              .post(`/customer`, item)
              .then((resp) => {
                $scope.showSuccessMessage("Create Custoemr successfully!");
                $scope.initialize();
                $scope.resetFormInput();
                $("#modalAdd").modal("hide");
                $scope.showError = false;
                $scope.unload();
              })
              .catch((error) => {
                console.log("Error", error);
                $scope.unload();
                return;
              });
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    };
  
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
      $http
        .put(`/customer/${item.id}`, item)
        .then((resp) => {
          $scope.showSuccessMessage("Update Customer successfully!");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
          $scope.showError = false;
          $scope.unload();
        })
        .catch((error) => {
          console.log("Error", error);
          return;
        });
    };
    $scope.update = function () {
      let fileInput = document.getElementById("image-update");
      if ($scope.formUpdate.avatar.length > 0 && !fileInput.files.length > 0) {
        $scope.apiUpdate();
      } else {
        let data = new FormData();
        data.append("file", fileInput.files[0]);
        $scope.load();
        $http
          .post("/rest/upload", data, {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined },
          })
          .then((resp) => {
            $scope.formUpdate.avatar = resp.data.name;
            $scope.apiUpdate();
            $scope.unload();
          })
          .catch((error) => {
            console.log("Error", error);
            $scope.unload();
          });
      }
    };
  
    $scope.edit = function (customer) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(customer);
      } else {
        $scope.formUpdate = angular.copy(customer);
        $scope.formUpdate.updatedAt = new Date();
      }
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`/customer/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete Customer successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      let fileInput = document.getElementById("image-update");
      let imagePreviewUpdate = document.getElementById("image-preview-update");
      imagePreviewUpdate.src = "/assets/img/no-img.png";
      fileInput.value = "";
      fileInput.type = "file";
      $scope.formUpdateCustomer.$setPristine();
      $scope.formUpdateCustomer.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      let fileInput = document.getElementById("image");
      let imagePreview = document.getElementById("image-preview");
      imagePreview.src = "/assets/img/no-img.png";
      fileInput.value = "";
      fileInput.type = "file";
      $scope.formCreateCustomer.$setPristine();
      $scope.formCreateCustomer.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.customer.length) / this.size);
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
      },
    };
  
    $scope.xuatFile = function () {
      $http.get("/customer/excel").then(function (response) {
        alert("Xuất File Thành Công");
        // $scope.pageEm = response.data.content;
        // $scope.totalPages = response.data.totalPages
      });
    };
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
    $scope.load = function () {
      $scope.loading = true;
    };
    $scope.unload = function () {
      $scope.loading = false;
    };
    const apiEmployee = "http://localhost:8080/employee";
  
    imgShow("image", "image-preview");
    imgShow("image-update", "image-preview-update");
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
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.employee = $scope.originalEmployee.filter(function (item) {
          if (item && item.code) {
            return item.code
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
      $http.get(apiEmployee).then(function (resp) {
        $scope.originalEmployee = resp.data;
        $scope.employee = angular.copy($scope.originalEmployee);
      });
    };
  
    $scope.initialize();
  
    $scope.loadAccounts = function () {
      $http
        .get("/account/not-in-customer-employee")
        .then(function (resp) {
          $scope.accounts = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading accounts", error);
        });
    };
  
    $scope.loadAccounts();
  
    // create employee
    $scope.create = function () {
      let fileInput = document.getElementById("image");
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      $scope.showErrorImg = function (message) {
        $scope.alertErrorImg = message;
        $scope.showError = true;
      };
      if (!allowedExtensions.exec(fileInput.value)) {
        $scope.showErrorImg(
          "Please upload file having extensions .jpeg/.jpg/.png/.gif only"
        );
        return;
      } else if (fileInput.files.length > 0) {
        let data = new FormData();
        data.append("file", fileInput.files[0]);
        $scope.load();
        $http
          .post("/rest/upload", data, {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined },
          })
          .then((resp) => {
            $scope.formInput.avatar = resp.data.name;
            let item = angular.copy($scope.formInput);
            item.createdAt = $scope.currentDate;
            $http
              .post(apiEmployee, item)
              .then((resp) => {
                $scope.showSuccessNotification("Cập nhật thông tin thành công");
                $scope.initialize();
                $scope.resetFormInput();
                $("#modalAdd").modal("hide");
                $scope.showError = false;
                $scope.unload();
              })
              .catch((error) => {
                console.log("Error", error);
                $scope.unload();
                return;
              });
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    };
    // create account
    $scope.createAccount = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      item.active = true;
      $http
        .post("/account/save", item)
        .then(function (resp) {
          $scope.getRole();
          $scope.resetFormInput();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
    $scope.getRole = function () {
      $http.get("/account").then(function (resp) {});
    };
    $scope.getRole();
    $scope.loadRoles = function () {
      $http
        .get("/role")
        .then(function (resp) {
          $scope.roles = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading customers", error);
        });
    };
    $scope.loadRoles();
  
    //Add employee Bằng file excel
    $scope.insertExcelEmployee = function () {
      var inputElement = $("#fileInput")[0];
  
      if (inputElement && inputElement.files && inputElement.files.length > 0) {
        var files = inputElement.files;
        var reader = new FileReader();
        reader.onloadend = async () => {
          var workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(reader.result);
          const worksheet = workbook.getWorksheet("Sheet1");
          worksheet.eachRow((row, index) => {
            if (index > 1) {
              //import bigdecimel
              // var bigDecimalValue = new Big(row.getCell(3).value);
              // var bigDecimalMinimumTotalAmount = new Big(row.getCell(5).value);
              //import date
              var BirthDate = new Date(row.getCell(2).value);
              var Gender = new Boolean(row.getCell(3).value);
              let employee = {
                // code: row.getCell(1).value,
                fullName: row.getCell(1).value,
                birthDate: BirthDate,
                gender: Gender,
                address: row.getCell(4).value,
              };
              $http.post(apiEmployee, employee).then((resp) => {
                $scope.showSuccessNotification("Cập nhật thông tin thành công");
                $scope.initialize();
                console.log("success", resp.data);
              });
            }
          });
        };
        reader.readAsArrayBuffer(files[0]);
      } else {
        console.error("No files selected.");
      }
    };
  
    $scope.apiUpdate = function () {
      let item = angular.copy($scope.formUpdate);
      $http
        .put(`/employee/${item.id}`, item)
        .then((resp) => {
          $scope.showSuccessNotification("Cập nhật thông tin thành công");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
          $scope.showError = false;
          $scope.unload();
        })
        .catch((error) => {
          console.log("Error", error);
          return;
        });
    };
    $scope.update = function () {
      let fileInput = document.getElementById("image-update");
      if ($scope.formUpdate.avatar.length > 0 && !fileInput.files.length > 0) {
        $scope.apiUpdate();
      } else {
        let data = new FormData();
        data.append("file", fileInput.files[0]);
        $scope.load();
        $http
          .post("/rest/upload", data, {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined },
          })
          .then((resp) => {
            $scope.formUpdate.avatar = resp.data.name;
            $scope.apiUpdate();
            $scope.unload();
          })
          .catch((error) => {
            console.log("Error", error);
            $scope.unload();
          });
      }
    };
  
    $scope.edit = function (employee) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(employee);
      } else {
        $scope.formUpdate = angular.copy(employee);
        $scope.formUpdate.updatedAt = new Date();
      }
    };
  
    $scope.delete = function (item) {
      $http
        .delete(`/employee/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessNotification("Cập nhật thông tin thành công");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      let fileInput = document.getElementById("image-update");
      let imagePreviewUpdate = document.getElementById("image-preview-update");
      imagePreviewUpdate.src = "/assets/img/no-img.png";
      fileInput.value = "";
      fileInput.type = "file";
      $scope.formUpdateEmployee.$setPristine();
      $scope.formUpdateEmployee.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      let fileInput = document.getElementById("image");
      let imagePreview = document.getElementById("image-preview");
      imagePreview.src = "/assets/img/no-img.png";
      fileInput.value = "";
      fileInput.type = "file";
      $scope.formCreateEmployee.$setPristine();
      $scope.formCreateEmployee.$setUntouched();
    };
  
    $scope.getById = function (item) {
      $http.get(`/api/employee/${item.id}`).then(function (response) {
        $scope.listEm = response.data;
        console.log(item.id);
      });
    };
  
    // search code employee
    $scope.getByMa = function (item) {
      // console.log(item.id);
      $http.get(`/api/employee/search/${item.id}`).then(function (response) {
        console.log(item.code);
        $scope.listEm = response.data;
        // console.log(item.code);
      });
    };
  
    //detaol Employee
    $scope.edit = function (employee) {
      $scope.formUpdate = angular.copy(employee);
      $scope.formUpdate.valid_form = new Date(employee.valid_form);
      $scope.formUpdate.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    };
    $scope.show = function (employee) {
      $scope.formShow = angular.copy(employee);
      $scope.formShow.valid_form = new Date(employee.valid_form);
      $scope.formShow.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    };
  
    //delete or update status Employee
    $scope.updateStatusEmployee = function (item) {
      console.log(item);
      $http.put(`/api/employee/delete/${item.id}`, item).then(function (resp) {
        // $scope.getAll();
        $scope.getAllStatusDangLam();
        console.log(item.id);
      });
    };
  
    // xuát file danh sách excel Employee
    $scope.xuatFile = function () {
      $http
        .get(apiEmployee + "/excel")
        .then(function (response) {
          alert("Xuất File Thành Công");
          // $scope.pageEm = response.data.content;
          // $scope.totalPages = response.data.totalPages
        })
        .catch((error) => {
          alert("hihi");
        });
    };
  
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
        return Math.ceil((1.0 * $scope.employee.length) / this.size);
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
      },
    };
  });
  //end js Hieu
  
  app.controller(
    "myAppOfView-ctrl",
    function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-bottom-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
  
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
  
      console.log("myAppOfView-ctrl");
    }
  );
  app.controller(
    "myAppOfView-ctrl2",
    function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {
      console.log("myAppOfView-ctrl2");
      $httpProvider.useApplyAsync(1000); //true
    }
  );
  
  app.config(function ($routeProvider) {
    $routeProvider
  
      // Tham khao
      .when("/homeTest/123", {
        templateUrl: "thamkhao/homeTest.html",
        controller: "myAppOfView-ctrl",
      })
      .when("/productTest", {
        templateUrl: "thamkhao/productTest.html",
        controller: "myAppOfView-ctrl",
      })
      .when("/cartTest", {
        templateUrl: "thamkhao/cartTest.html",
        controller: "myAppOfView-ctrl2",
      })
      // Tham khao
      // <!-- Thuong -->
  
      // <!-- Hieu -->
  
      // <!-- Nguyen -->
  
      .when("/admin/product", {
        templateUrl: "/ofView/Nguyen/product/product.html",
        controller: "nguyen-product-ctrl",
      })
      .when("/admin/bill", {
        templateUrl: "/ofView/Nguyen/bill/bill.html",
        controller: "nguyen-bill-ctrl",
      });
  
    // <!-- Tinh -->
  });
  
  app.controller(
    "myAppOfView-ctrl",
    function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {
      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-bottom-right",
        preventDuplicates: false,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
  
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
  
      console.log("myAppOfView-ctrl");
    }
  );
  app.controller(
    "myAppOfView-ctrl2",
    function ($scope, $rootScope, $http, $routeParams, $location, jwtHelper) {
      console.log("myAppOfView-ctrl2");
    }
  );
  
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
      $scope.loading = true;
    };
    $scope.unload = function () {
      $scope.loading = false;
    };
  
    $scope.formUpdatePd = {
      product: {
        id: null,
      },
    };
  
    $scope.formInputImage = {
      path: null,
      name: null,
      productDetail: {
        id: null,
      },
    };
  
    $scope.formInputPd = {
      product: {
        id: null,
      },
    };
  
    $scope.showAlert = false;
    $scope.getAlert = function (message) {
      $scope.alertMessage = message;
      $scope.showAlert = true;
      $timeout(function () {
        $scope.closeAlert();
      }, 5000);
    };
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    const apiUrlProduct = "http://localhost:8080/api/product";
    const apiUrlCategory = "http://localhost:8080/api/category";
    const apiUrlMaterial = "http://localhost:8080/api/material";
    const apiUrlBrand = "http://localhost:8080/api/category/brands";
  
    $scope.initialize = function () {
      $http.get(apiUrlProduct).then(function (resp) {
        $scope.originalProduct = resp.data;
        $scope.products = angular.copy($scope.originalProduct);
      });
    };
    $scope.initialize();
  
    $scope.showToast = function (message) {
      $scope.toastMessage = message;
      var toastElList = [].slice.call(document.querySelectorAll("#liveToast"));
      var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
      });
      toastList.forEach((toast) => toast.show());
    };
  
    $scope.showToastUpdate = function (message) {
      $scope.toastMessage = message;
      var toastElList = [].slice.call(
        document.querySelectorAll("#liveToastUpdate")
      );
      var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
      });
      toastList.forEach((toast) => toast.show());
    };
  
    $scope.getSelectOption = function () {
      $http.get(apiUrlCategory).then(function (response) {
        console.log(response);
        $scope.categories = response.data;
      });
      $http.get(apiUrlMaterial).then(function (response) {
        console.log(response);
        $scope.materials = response.data;
      });
      $http.get(apiUrlBrand).then(function (response) {
        console.log(response);
        $scope.brands = response.data;
      });
    };
    $scope.getSelectOption();
  
    //filter status
    $scope.changeStatus = function (selectedItem) {
      console.log(selectedItem);
      if (selectedItem != "") {
        $scope.products = $scope.originalProduct.filter(function (item) {
          if (item && item.status) {
            return item.status == selectedItem;
          }
          return false;
        });
      } else {
        $scope.products = angular.copy($scope.originalProduct);
      }
      $scope.changePageSize();
    };
  
    //create product
    $scope.create = function () {
      // console.log(editor1.getHTMLCode())
      // $scope.formInput.describe = editor1.getHTMLCode();
      if ($scope.checkTrungTenCreate == true) return;
      let item = angular.copy($scope.formInput);
      $scope.load();
      $http
        .post(apiUrlProduct, item)
        .then((resp) => {
          $("#modalAddProduct").modal("hide");
          $scope.unload();
          $scope.showToast("Thêm sản phẩm thành công!");
          $scope.initialize();
          $scope.resetFormInput();
        })
        .catch((error) => {
          $scope.unload();
          console.log("Error", error);
        });
    };
  
    //check trùng tên sản phẩm
    $scope.checkTrungTenCreate = false;
    $scope.checkTrungTenSP = function (inputName) {
      if (inputName == undefined) {
        $scope.checkTrungTenCreate = false;
        return;
      }
      for (let i = 0; i < $scope.products.length; i++) {
        let data = $scope.products[i];
        if (data.name == inputName.trim()) {
          console.log("a");
          $scope.checkTrungTenCreate = true;
          return;
        }
        $scope.checkTrungTenCreate = false;
      }
    };
  
    //reset form input product
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.checkTrungTenCreate = false;
      $scope.formCreateProduct.$setPristine();
      $scope.formCreateProduct.$setUntouched();
    };
  
    //show product
    $scope.edit = function (product) {
      $scope.formUpdate = angular.copy(product);
      console.log($scope.formUpdate);
      // editor2.setHTMLCode($scope.formUpdate.describe);
  
      $http
        .get(apiUrlProduct + "/" + product.id + "/productDetail")
        .then(function (response) {
          console.log("proDetail" + response);
          $scope.productDetails = response.data;
        });
    };
  
    $scope.showTab = function () {
      var someListItemEl = document.querySelector("#tabhome");
      var tab = new bootstrap.Tab(someListItemEl);
      tab.show();
    };
  
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
    };
  
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
    };
    $scope.enableEditForm(true, true);
  
    //check productDetail co trang thai 1 ko
    $scope.checkStatusProductDetail = function (
      listProductDetail,
      statusProduct
    ) {
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
    };
  
    $scope.update = function (productId) {
      let item = angular.copy($scope.formUpdate);
      // console.log("cc" + item.category)
  
      if (
        $scope.checkStatusProductDetail($scope.productDetails, item.status) ==
        false
      )
        return;
  
      $scope.load();
      $http
        .put(`${apiUrlProduct}/` + productId, item)
        .then((resp) => {
          $scope.enableEditForm(true, true);
          $scope.unload();
          $scope.showToast("Cập nhật thành công!");
          $scope.showToastUpdate("Cập nhật thành công!");
          $scope.initialize();
          $scope.resetFormUpdate();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    // $scope.updateStatus = 0;
    $scope.updateStatusProduct = function (productId, statusUpdate) {
      $scope.load();
      $http
        .put(apiUrlProduct + "/status/" + productId, statusUpdate)
        .then((resp) => {
          // alert("Update status product successfully!")
          $scope.initialize();
          $scope.unload();
          $scope.showToast("Cập nhật thành công!");
          var idModal = "updateStatusProduct-" + productId;
          var myModal = bootstrap.Modal.getOrCreateInstance(
            document.getElementById(idModal)
          );
          myModal.hide();
          $scope.resetFormInput();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    var editor1 = new RichTextEditor("#div_editor");
    $scope.cc1 = function () {
      $scope.getForm();
      // console.log(editor1.getHTMLCode())
      $scope.formInput.describe = editor1.getHTMLCode();
    };
  
    $scope.cancelEdit = function () {
      $scope.enableEditForm(true, true);
      $http
        .get(apiUrlProduct + "/" + $scope.formUpdate.id)
        .then(function (response) {
          console.log(response);
          $scope.formUpdate = response.data;
        });
      // $scope.formUpdate = $scope.productEdit
    };
  
    var btnPd = document.getElementById("addProductDetail");
    btnPd.style.display = "none";
  
    $scope.showAddProductDetail = function (value) {
      if (value == "pd") {
        btnPd.style.display = "block";
      } else {
        btnPd.style.display = "none";
      }
    };
  
    const apiUrlSize = "http://localhost:8080/api/size";
    const apiUrlColor = "http://localhost:8080/api/color";
  
    $scope.getSelectOptionPD = function () {
      $http.get(apiUrlSize).then(function (response) {
        console.log(response);
        $scope.sizes = response.data;
      });
      $http.get(apiUrlColor).then(function (response) {
        console.log(response);
        $scope.colors = response.data;
      });
    };
    $scope.getSelectOptionPD();
  
    const apiUrlProductDetail = "http://localhost:8080/api/productDetail";
    const apiImage = "http://localhost:8080/api/image";
  
    $scope.showLoadImage = false;
    $scope.loadImage = function () {
      $scope.showLoadImage = true;
    };
    $scope.unLoadImage = function () {
      $scope.showLoadImage = false;
    };
  
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
    };
  
    $scope.listImageCreate = [];
  
    function layAnhTuCloud(textInput) {
      const imageInput = document.getElementById(textInput);
      imageInput.addEventListener("change", function () {
        if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            // imagePreview.src = e.target.result;
  
            let data = new FormData();
            data.append("file", imageInput.files[0]);
            $scope.loadImage();
            $http
              .post("http://localhost:8080/rest/upload", data, {
                transformRequest: angular.identity,
                headers: { "Content-Type": undefined },
              })
              .then((resp) => {
                $scope.unLoadImage();
                let objectImage = {
                  path: null,
                  name: null,
                  productDetail: {
                    id: null,
                  },
                };
                objectImage.path = resp.data.name;
                $scope.listImageCreate.push(objectImage);
                console.log($scope.listImageCreate);
              })
              .catch((error) => {
                $scope.unLoadImage();
                console.log("Error", error);
              });
          };
          reader.readAsDataURL(imageInput.files[0]);
        }
      });
    }
    layAnhTuCloud("imageCreate");
  
    $scope.removeImage = function (image) {
      var index = $scope.listImageCreate.indexOf(image);
      $scope.listImageCreate.splice(index, 1);
    };
  
    //create product detail
    $scope.submitProductDetail = function (listImage) {
      $scope.checkTrungFK = false;
      console.log($scope.formInputPd);
      $scope.formInputPd.product = $scope.formUpdate;
      let itemcheck = angular.copy($scope.formInputPd);
      $http
        .post(apiUrlProductDetail + "/checkFk", itemcheck)
        .then((resp) => {
          if (resp.data == "") {
            $scope.checkTrungFK = false;
  
            $scope.formInputPd.product = $scope.formUpdate;
            let item = angular.copy($scope.formInputPd);
            item.product.id = $scope.formUpdate.id;
            let productDetailRequest = {
              productDetail: item,
              imagesList: listImage,
            };
            console.log(productDetailRequest);
            $scope.load();
            if ($scope.checkTrungProductDetail() == true) return;
            console.log(item);
            if ($scope.checkSoLuongToiThieu(item.quantity, item.status) == true)
              return;
  
            $http
              .post(apiUrlProductDetail, productDetailRequest)
              .then((resp) => {
                $http
                  .get(
                    apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail"
                  )
                  .then(function (response) {
                    console.log("pd" + response);
                    $scope.productDetails = response.data;
                    $("#modalProductDetail").modal("hide");
                    $("#modalDetail").modal("show");
                    $scope.unload();
                    $scope.showToastUpdate("Thêm chi tiết sản phẩm thành công!");
                    $scope.showToast("Thêm chi tiết sản phẩm thành công!");
                    $scope.formInputPd = {
                      describe: "",
                    };
                    $scope.listImageUpdate = [];
                  });
              })
              .catch((error) => {
                console.log("Error", error);
              });
          } else {
            $scope.quantityStatusPD = false;
            $scope.checkTrungFK = true;
          }
        })
        .catch((error) => {
          console.log("Error", error);
          return false;
        });
    };
  
    $scope.checkTrungProductDetail = function () {
      $scope.checkTrungFK = false;
      console.log($scope.formInputPd);
      $scope.formInputPd.product = $scope.formUpdate;
      let item = angular.copy($scope.formInputPd);
      $http
        .post(apiUrlProductDetail + "/checkFk", item)
        .then((resp) => {
          if (resp.data == "") {
            console.log("cc1");
            $scope.checkTrungFK = false;
            // $('#modalProductDetail').modal('hide');
            // $('#modalDetail').modal('show');
            return false;
          } else {
            console.log("cc2");
            $scope.checkTrungFK = true;
            return true;
          }
        })
        .catch((error) => {
          console.log("Error", error);
          return false;
        });
    };
  
    $scope.cancelEditPd = function () {
      $http
        .get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
        .then(function (response) {
          console.log(response);
          $scope.productDetails = response.data;
        });
      $scope.resetValiAddPD();
      // $scope.formInputPd = {}
    };
  
    $scope.resetValiAddPD = function () {
      $scope.checkTrungFK = false;
      $scope.formInputPd = {};
      $scope.formCreateProductDetail.$setPristine();
      $scope.formCreateProductDetail.$setUntouched();
    };
  
    $scope.formUpdateImage = {
      path: null,
      name: null,
      productDetail: {
        id: null,
      },
    };
  
    $scope.listImageUpdate = [];
  
    $scope.getImageByPDid = function (id) {
      $http.get(apiImage + "/pd/" + id).then(function (response) {
        console.log(response.data);
        $scope.listImageUpdate = response.data;
        return $scope.listImageUpdate;
      });
    };
  
    function layAnhTuCloudUpdate(textInput) {
      const imageInput = document.getElementById(textInput);
      imageInput.addEventListener("change", function () {
        if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            // imagePreview.src = e.target.result;
  
            let data = new FormData();
            data.append("file", imageInput.files[0]);
            $scope.loadImage();
            $http
              .post("http://localhost:8080/rest/upload", data, {
                transformRequest: angular.identity,
                headers: { "Content-Type": undefined },
              })
              .then((resp) => {
                $scope.unLoadImage();
                let objectImage = {
                  path: null,
                  name: null,
                  productDetail: {
                    id: null,
                  },
                };
                objectImage.path = resp.data.name;
                $scope.listImageUpdate.push(objectImage);
                console.log($scope.listImageUpdate);
              })
              .catch((error) => {
                $scope.unLoadImage();
                console.log("Error", error);
              });
          };
          reader.readAsDataURL(imageInput.files[0]);
        }
      });
    }
    layAnhTuCloudUpdate("imageUpdate");
  
    $scope.removeImageUpdate = function (image) {
      var index = $scope.listImageUpdate.indexOf(image);
      $scope.listImageUpdate.splice(index, 1);
    };
  
    $scope.editProductDetail = function (productDetail) {
      $scope.formUpdatePd = angular.copy(productDetail);
      let listimage = $scope.getImageByPDid($scope.formUpdatePd.id);
      // console.log(listimage)
      // console.log($scope.listImageUpdate)
    };
  
    $scope.updateProductDetail = function (listImage) {
      $scope.formUpdatePd.product = $scope.formUpdate;
      let item = angular.copy($scope.formUpdatePd);
      item.product.id = $scope.formUpdate.id;
      let productDetailRequest = { productDetail: item, imagesList: listImage };
      console.log(productDetailRequest);
      $scope.load();
      $http
        .put(
          apiUrlProductDetail + "/" + $scope.formUpdatePd.id,
          productDetailRequest
        )
        .then((resp) => {
          $http
            .get(apiUrlProduct + "/" + $scope.formUpdate.id + "/productDetail")
            .then(function (response) {
              console.log("pd" + response);
              $scope.productDetails = response.data;
              $("#modalUpdateDetail").modal("hide");
              $("#modalDetail").modal("show");
              $scope.unload();
              $scope.showToastUpdate("Cập nhật thành công!");
              $scope.showToast("Cập nhật thành công!");
              $scope.formUpdatePd = {};
              $scope.listImageUpdate = [];
            });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.products = $scope.originalProduct.filter(function (item) {
          if (item && item.code) {
            return item.code
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
        return Math.ceil((1.0 * $scope.products.length) / this.size);
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
      },
    };
  });
  
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
  
    $scope.showSuccessMessage = function (message) {
      $scope.alertMessage = message;
      $scope.showAlert = true;
      $timeout(function () {
        $scope.closeAlert();
      }, 5000);
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.bill = $scope.originalBill.filter(function (item) {
          if (item && item.code) {
            return item.code
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
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
      console.log(fromDate);
      console.log(toDate);
      console.log(filterTypeBill);
      console.log(filterStatus);
      if (fromDate == null) {
        fromDate = undefined;
      }
      if (toDate == null) {
        toDate = undefined;
      }
      if (filterTypeBill == "" || filterTypeBill == null) {
        filterTypeBill = undefined;
      }
      console.log(filterStatus);
      if (filterStatus == "" || filterStatus == null) {
        filterStatus = undefined;
      }
  
      console.log(fromDate);
      console.log(toDate);
      console.log(filterTypeBill);
      console.log(filterStatus);
  
      if (
        filterStatus == undefined &&
        filterTypeBill == undefined &&
        fromDate == undefined &&
        toDate == undefined
      ) {
        $scope.bill = angular.copy($scope.originalBill);
        return;
      }
  
      $scope.bill = $scope.originalBill.filter(function (item) {
        //nếu thời gian null
        if (fromDate == undefined && toDate == undefined) {
          if (filterStatus != undefined && filterTypeBill != undefined) {
            if (item && item.status && item.typeBill) {
              return (
                item.status == filterStatus && item.typeBill == filterTypeBill
              );
            }
          }
          if (filterStatus != undefined && filterTypeBill == undefined) {
            if (item && item.status) {
              return item.status == filterStatus;
            }
          }
          if (filterStatus == undefined && filterTypeBill != undefined) {
            if (item && item.typeBill) {
              return item.typeBill == filterTypeBill;
            }
          }
        }
  
        //nếu status va typebill null
        if (filterStatus == undefined && filterTypeBill == undefined) {
          if (fromDate != undefined && toDate == undefined) {
            if (item && item.createdAt) {
              return (
                new Date(item.createdAt).getDate() >= new Date(fromDate).getDate()
              );
            }
          }
          if (fromDate == undefined && toDate != undefined) {
            if (item && item.createdAt) {
              return (
                new Date(item.createdAt).getDate() <= new Date(toDate).getDate()
              );
            }
          }
          if (fromDate != undefined && toDate != undefined) {
            if (item && item.createdAt) {
              return (
                new Date(item.createdAt).getDate() >=
                  new Date(fromDate).getDate() &&
                new Date(item.createdAt).getDate() <= new Date(toDate).getDate()
              );
            }
          }
        }
  
        //có hoặc ko có cái nào null
        if (
          filterStatus != undefined ||
          filterTypeBill != undefined ||
          fromDate != undefined ||
          toDate != undefined
        ) {
          //tất cả khác null
          if (
            filterStatus != undefined &&
            filterTypeBill != undefined &&
            fromDate != undefined &&
            toDate != undefined
          ) {
            if (item && item.typeBill && item.status && item.createdAt) {
              return (
                new Date(item.createdAt).getTime() >=
                  new Date(fromDate).getTime() &&
                new Date(item.createdAt).getTime() <=
                  new Date(toDate).getTime() &&
                item.status == filterStatus &&
                item.typeBill == filterTypeBill
              );
            }
          }
        }
        return false;
      });
      $scope.changePageSize();
    };
  
    $scope.resetFilter = function () {
      $scope.bill = angular.copy($scope.originalBill);
      $scope.typeBill = "";
      $scope.billStatus = "";
      $scope.fromDate = null;
      $scope.toDate = null;
      $scope.changePageSize();
    };
  
    $scope.initialize = function () {
      $http.get("http://localhost:8080/bills").then(function (resp) {
        $scope.originalBill = resp.data;
        $scope.bill = angular.copy($scope.originalBill);
      });
    };
    $scope.initialize();
  
    $scope.loadCustomers = function () {
      $http
        .get("http://localhost:8080/customer") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.customerEntitys = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading customers", error);
        });
    };
  
    $scope.loadCustomers();
  
    $scope.loadEmployees = function () {
      $http
        .get("http://localhost:8080/employee") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.employees = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading employees", error);
        });
    };
    $scope.loadEmployees();
  
    $scope.loadVoucher = function () {
      $http
        .get("http://localhost:8080/api/voucher") // Thay đổi đường dẫn API tương ứng
        .then(function (resp) {
          $scope.vouchers = resp.data;
        })
        .catch(function (error) {
          console.log("Error loading vuchers", error);
        });
    };
    $scope.loadVoucher();
  
    $scope.loadBillDetail = function (id) {
      $http
        .get("http://localhost:8080/bills/" + id + "/billDetail") // Thay đổi đường dẫn API tương ứng
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
    };
  
    $scope.edit = function (bill) {
      $scope.showTab();
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(bill);
      } else {
        $scope.formUpdate = angular.copy(bill);
        $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
      }
      $scope.loadBillDetail(bill.id);
      $scope.getInfoBill(bill);
      console.log(bill);
    };
  
    $scope.getInfoBill = function (bill) {
      $scope.tongTien = bill.totalAmount;
      $scope.giamGia = bill.totalAmount - bill.totalAmountAfterDiscount;
      $scope.khachPhaiTra = bill.totalAmountAfterDiscount;
      $scope.khachDaTra = 0;
  
      // console.log(bill.typeBill)
      // console.log(bill.paymentMethod.id)
      if (bill.typeBill === 1 && bill.paymentMethod.id === 3) {
        $scope.khachDaTra = $scope.khachPhaiTra;
      } else if (bill.typeBill === 1 && bill.paymentMethod.id != 3) {
        $scope.khachDaTra = 0;
      } else if (
        bill.typeBill == 2 &&
        (bill.paymentMethod.id === 1 ||
          bill.paymentMethod.id === 2 ||
          bill.paymentMethod.id === 3)
      ) {
        $scope.khachDaTra = $scope.khachPhaiTra;
      } else if (
        bill.typeBill == 3 &&
        (bill.paymentMethod.id === 1 ||
          bill.paymentMethod.id === 2 ||
          bill.paymentMethod.id === 3)
      ) {
        $scope.khachDaTra = $scope.khachPhaiTra;
      } else if (bill.typeBill === 3 && bill.paymentMethod.id === 4) {
        $scope.khachDaTra = 0;
      }
    };
  
    //change tab
    $scope.showTab = function () {
      var someListItemEl = document.querySelector("#tabhome");
      var tab = new bootstrap.Tab(someListItemEl);
      tab.show();
    };
  
    // $scope.edit = function (bill) {
    //     $scope.formUpdate = angular.copy(bill);
    // }
  
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      $http
        .post("http://localhost:8080/bills", item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create bill successfully");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      $http
        .put(`http://localhost:8080/bills/${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update bill successfully");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.updateStatus = function (status, item) {
      console.log("c");
      console.log(status);
      console.log(item);
      $http
        .put(`http://localhost:8080/bills/status/${item.id}`, status)
        .then(function (resp) {
          $scope.showSuccessMessage("Cập nhật hóa đơn thành công");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateBill.$setPristine();
      $scope.formUpdateBill.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateBill.$setPristine();
      $scope.formCreateBill.$setUntouched();
    };
  
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
        return Math.ceil((1.0 * $scope.bill.length) / this.size);
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
      },
    };
  });
  
  // Tạo cái mới đừng dùng những cái có sẵn chỉ để tham khảo
  // Các phím tắt khi sử dụng visual
  // https://www.thegioididong.com/game-app/tong-hop-cac-phim-tat-trong-visual-studio-code-giup-lap-trinh-1314635
  