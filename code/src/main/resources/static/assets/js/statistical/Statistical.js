let app_statistical = angular.module("statistical", []);

app_statistical.controller(
  "statistical-ctrl",
  function ($scope, $http, $timeout, $document, $filter) {
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
