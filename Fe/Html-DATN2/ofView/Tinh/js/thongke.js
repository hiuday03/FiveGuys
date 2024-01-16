app.controller(
  "statistical-ctrl",
  function ($scope, $http, $timeout, $document, $filter) {
    $scope.customes = {
      decrease: "decrease",
    };

    const api = "http://localhost:8080/thong-ke";
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
    $scope.formtimkiem = "1";
    $scope.timkiemStatus = function () {
      if ($scope.formtimkiem === "0") {
        $http.get(api + "/search-status-bill/1").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.formtimkiem === "2") {
        $http.get(api + "/search-status-bill/2").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.formtimkiem === "3") {
        $http.get(api + "/search-status-bill/3").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.formtimkiem === "4") {
        $http.get(api + "/search-status-bill/10").then(function (response) {
          $scope.getallbilllist = response.data;
        });
      } else if ($scope.formtimkiem === "1") {
        $http.get(api + "/get-all-list").then(function (getall) {
          $scope.getallbilllist = getall.data;
        });
      }
    };
    $scope.timkiemStatus();
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
    today.setMonth(today.getMonth());
    let thangfomat = $filter("date")(today, "yyyy-MM-dd");
    var today1 = new Date();
    today1.setMonth(today1.getMonth() - 1);
    let thang1fomat = $filter("date")(today1, "yyyy-MM-dd");
    var today2 = new Date();
    today2.setMonth(today2.getMonth() - 2);
    let thang2fomat = $filter("date")(today2, "yyyy-MM-dd");
    var today3 = new Date();
    today3.setMonth(today3.getMonth() - 3);
    let thang3fomat = $filter("date")(today3, "yyyy-MM-dd");
    var today4 = new Date();
    today4.setMonth(today4.getMonth() - 4);
    let thang4fomat = $filter("date")(today4, "yyyy-MM-dd");
    var today5 = new Date();
    today5.setMonth(today5.getMonth() - 5);
    let thang5fomat = $filter("date")(today5, "yyyy-MM-dd");
    var today6 = new Date();
    today6.setMonth(today6.getMonth() - 6);
    let thang6fomat = $filter("date")(today6, "yyyy-MM-dd");
    var today7 = new Date();
    today7.setMonth(today7.getMonth() - 7);
    let thang7fomat = $filter("date")(today7, "yyyy-MM-dd");
    var today8 = new Date();
    today8.setMonth(today8.getMonth() - 8);
    let thang8fomat = $filter("date")(today8, "yyyy-MM-dd");
    var today9 = new Date();
    today9.setMonth(today9.getMonth() - 9);
    let thang9fomat = $filter("date")(today9, "yyyy-MM-dd");
    var today10 = new Date();
    today10.setMonth(today10.getMonth() - 10);
    let thang10fomat = $filter("date")(today10, "yyyy-MM-dd");
    var today11 = new Date();
    today11.setMonth(today11.getMonth() - 11);
    let thang11fomat = $filter("date")(today11, "yyyy-MM-dd");
    console.log(thang10fomat);
    //-----fomat nam
    var today = new Date();
    today.setFullYear(today.getFullYear());
    let namfomat = $filter("date")(today, "yyyy-MM-dd");
    var today1 = new Date();
    today1.setFullYear(today1.getFullYear() - 1);
    let nam1fomat = $filter("date")(today1, "yyyy-MM-dd");
    var today2 = new Date();
    today2.setFullYear(today2.getFullYear() - 2);
    let nam2fomat = $filter("date")(today2, "yyyy-MM-dd");
    var today3 = new Date();
    today3.setFullYear(today3.getFullYear() - 3);
    let nam3fomat = $filter("date")(today3, "yyyy-MM-dd");
    var today4 = new Date();
    today4.setFullYear(today4.getFullYear() - 4);
    let nam4fomat = $filter("date")(today4, "yyyy-MM-dd");

    $scope.listCustomerDay = function () {
      if ($scope.selectedOption === "1") {
        // list san pham bán dc-------
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
            renderChartNgay();
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
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang7fomat}`, thang7fomat)
          .then(function (getall6) {
            $scope.listcustomerday7 = getall6.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang8fomat}`, thang8fomat)
          .then(function (getall6) {
            $scope.listcustomerday8 = getall6.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-thang/" + `${thang9fomat}`, thang9fomat)
          .then(function (getall6) {
            $scope.listcustomerday9 = getall6.data;
          });
        $http
          .get(
            api + "/san-pham-ban-ra-thang/" + `${thang10fomat}`,
            thang11fomat
          )
          .then(function (getall6) {
            $scope.listcustomerday10 = getall6.data;
          });
        $http
          .get(
            api + "/san-pham-ban-ra-thang/" + `${thang11fomat}`,
            thang11fomat
          )
          .then(function (getall6) {
            $scope.listcustomerday11 = getall6.data;
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
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang7fomat}`, thang7fomat)
          .then(function (getbill6) {
            $scope.listbillday7 = getbill6.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang8fomat}`, thang8fomat)
          .then(function (getbill6) {
            $scope.listbillday8 = getbill6.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang9fomat}`, thang9fomat)
          .then(function (getbill6) {
            $scope.listbillday9 = getbill6.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang10fomat}`, thang10fomat)
          .then(function (getbill6) {
            $scope.listbillday10 = getbill6.data;
          });
        $http
          .get(api + "/tong-hoa-don-thang/" + `${thang11fomat}`, thang11fomat)
          .then(function (getbill6) {
            $scope.listbillday11 = getbill6.data;
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
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang7fomat}`, thang7fomat)
          .then(function (getbill6) {
            $scope.listdoanhthuday7 = getbill6.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang8fomat}`, thang8fomat)
          .then(function (getbill6) {
            $scope.listdoanhthuday8 = getbill6.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang9fomat}`, thang9fomat)
          .then(function (getbill6) {
            $scope.listdoanhthuday9 = getbill6.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang10fomat}`, thang10fomat)
          .then(function (getbill6) {
            $scope.listdoanhthuday10 = getbill6.data;
          });
        $http
          .get(api + "/tong-doanh-thu-thang/" + `${thang11fomat}`, thang11fomat)
          .then(function (getbill6) {
            $scope.listdoanhthuday11 = getbill6.data;
            renderChartThang();
          });
      } else if ($scope.selectedOption === "3") {
        $http
          .get(api + "/san-pham-ban-ra-nam/" + `${namfomat}`, namfomat)
          .then(function (getall) {
            $scope.listcustomerday = getall.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-nam/" + `${nam1fomat}`, nam1fomat)
          .then(function (getall1) {
            $scope.listcustomerday1 = getall1.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-nam/" + `${nam2fomat}`, nam2fomat)
          .then(function (getall2) {
            $scope.listcustomerday2 = getall2.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-nam/" + `${nam3fomat}`, nam3fomat)
          .then(function (getall3) {
            $scope.listcustomerday3 = getall3.data;
          });
        $http
          .get(api + "/san-pham-ban-ra-nam/" + `${nam4fomat}`, nam4fomat)
          .then(function (getall4) {
            $scope.listcustomerday4 = getall4.data;
          });

        //List bill---------
        $http
          .get(api + "/tong-hoa-don-nam/" + `${namfomat}`, namfomat)
          .then(function (getbill) {
            $scope.listbillday = getbill.data;
          });
        $http
          .get(api + "/tong-hoa-don-nam/" + `${nam1fomat}`, nam1fomat)
          .then(function (getbill1) {
            $scope.listbillday1 = getbill1.data;
          });
        $http
          .get(api + "/tong-hoa-don-nam/" + `${nam2fomat}`, thang2fomat)
          .then(function (getbill2) {
            $scope.listbillday2 = getbill2.data;
          });
        $http
          .get(api + "/tong-hoa-don-nam/" + `${nam3fomat}`, nam3fomat)
          .then(function (getbill3) {
            $scope.listbillday3 = getbill3.data;
          });
        $http
          .get(api + "/tong-hoa-don-nam/" + `${nam4fomat}`, nam4fomat)
          .then(function (getbill4) {
            $scope.listbillday4 = getbill4.data;
          });

        //List Doanh thu-------
        $http
          .get(api + "/tong-doanh-thu-nam/" + `${namfomat}`, namfomat)
          .then(function (getbill) {
            $scope.listdoanhthuday = getbill.data;
          });
        $http
          .get(api + "/tong-doanh-thu-nam/" + `${nam1fomat}`, nam1fomat)
          .then(function (getbill1) {
            $scope.listdoanhthuday1 = getbill1.data;
          });
        $http
          .get(api + "/tong-doanh-thu-nam/" + `${nam2fomat}`, nam2fomat)
          .then(function (getbill2) {
            $scope.listdoanhthuday2 = getbill2.data;
          });
        $http
          .get(api + "/tong-doanh-thu-nam/" + `${nam3fomat}`, nam3fomat)
          .then(function (getbill3) {
            $scope.listdoanhthuday3 = getbill3.data;
          });
        $http
          .get(api + "/tong-doanh-thu-nam/" + `${nam4fomat}`, nam4fomat)
          .then(function (getbill4) {
            $scope.listdoanhthuday4 = getbill4.data;
            renderChartNam();
          });
      }
    };

    $scope.delayedExecution = function () {
      // Delay execution of delayedAction() by 2 seconds (2000 milliseconds)
      $timeout($scope.listCustomerDay, 2000);
    };

    function renderChartNgay() {
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
    function renderChartThang() {
      new ApexCharts(document.querySelector("#reportsChart"), {
        series: [
          {
            name: "Hóa Đơn",
            data: [
              $scope.listbillday11,
              $scope.listbillday10,
              $scope.listbillday9,
              $scope.listbillday8,
              $scope.listbillday7,
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
              $scope.listcustomerday11,
              $scope.listcustomerday10,
              $scope.listcustomerday9,
              $scope.listcustomerday8,
              $scope.listcustomerday7,
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
              $scope.listdoanhthuday11,
              $scope.listdoanhthuday10,
              $scope.listdoanhthuday9,
              $scope.listdoanhthuday8,
              $scope.listdoanhthuday7,
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
            `${thang11fomat}`,
            `${thang10fomat}`,
            `${thang9fomat}`,
            `${thang8fomat}`,
            `${thang7fomat}`,
            `${thang6fomat}`,
            `${thang5fomat}`,
            `${thang4fomat}`,
            `${thang3fomat}`,
            `${thang2fomat}`,
            `${thang1fomat}`,
            `${thangfomat}`,
            // $scope.formattedDateTomorrow,
          ],
        },
        tooltip: {
          x: {
            format: "MM/yyyy",
          },
        },
      }).render();
    }
    function renderChartNam() {
      //------------

      new ApexCharts(document.querySelector("#reportsChart"), {
        series: [
          {
            name: "Hóa Đơn",
            data: [
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
            `${nam4fomat}`,
            `${nam3fomat}`,
            `${nam2fomat}`,
            `${nam1fomat}`,
            `${namfomat}`,
            // $scope.formattedDateTomorrow,
          ],
        },
        tooltip: {
          x: {
            format: "yyyy",
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
