
// import generateInvoiceHTML from './invoice.js';


var app = angular.module("myAppOfView", ["ngRoute", "angular-jwt"]);

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



    // <!-- Nguyen -->




    // <!-- Tinh -->


    ;
});

// Hieu js
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

});



// Tạo cái mới đừng dùng những cái có sẵn chỉ để tham khảo
// Các phím tắt khi sử dụng visual
// https://www.thegioididong.com/game-app/tong-hop-cac-phim-tat-trong-visual-studio-code-giup-lap-trinh-1314635

