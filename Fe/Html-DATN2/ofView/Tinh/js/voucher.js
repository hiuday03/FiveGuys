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
        $scope.showSuccessNotification("Thêm thông tin thành công");
        $scope.resetFormInput();
        $scope.getAll();
        $("#modalAdd").modal("hide");
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
        $scope.getAll();
        $scope.showSuccessNotification("Cập nhật thông tin thành công");

        $scope.resetFormInput();
        $scope.getAll();
        $("#modalAdd").modal("hide");
      })
      .catch(function (error) {
        console.log("Error", error);
      });
    $scope.getAll();
  };

  //delete update status voucher
  $scope.updateStatusVoucher = function (item) {
    $http
      .put(apiUrlVoucher + "/delete/" + `${item.id}`, item)
      .then(function (resp) {
        $scope.getAll();
      });
  };

  //submit add and update
  $scope.submit = function () {
    let item = angular.copy($scope.formInput);
    if ($scope.label1.update === "Thêm") {
      $scope.addVoucher();
    } else if ($scope.label1.update === "Sửa") {
      $scope.updateVoucher();
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
      $scope.showErrorNotification("Không có file nào được chọn");
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
    size: 5,
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
