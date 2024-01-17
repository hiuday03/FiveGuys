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

// app.config(function ($routeProvider) {
//   $routeProvider

//     // Tham khao
//     .when("/homeTest/123", {
//       templateUrl: "thamkhao/homeTest.html",
//       controller: "myAppOfView-ctrl",
//     })
//     .when("/productTest", {
//       templateUrl: "thamkhao/productTest.html",
//       controller: "myAppOfView-ctrl",
//     })
//     .when("/cartTest", {
//       templateUrl: "thamkhao/cartTest.html",
//       controller: "myAppOfView-ctrl2",
//     })
//     // Tham khao
//     // <!-- Thuong -->

//     // <!-- Hieu -->

//     .when("/admin/account/account", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/account.html",
//       controller: "account-ctrl",
//     })
//     .when("/admin/account/address", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/address.html",
//       controller: "address-ctrl",
//     })
//     .when("/admin/account/customer", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/customer.html",
//       controller: "customer-ctrl",
//     })
//     .when("/admin/account/employee", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/employee_home.html",
//       controller: "employee-ctrl",
//     })
//     .when("/admin/account/favorite", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/favorite.html",
//       controller: "favorite-ctrl",
//     })
//     .when("/admin/account/rating", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/rating.html",
//       controller: "rating-ctrl",
//     })
//     .when("/admin/account/role", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/role.html",
//       controller: "role-ctrl",
//     })
//     .when("/admin/brand", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/brand.html",
//       controller: "brand-ctrl",
//     })
//     .when("/admin/category", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/category-list.html",
//       controller: "category-ctrl",
//     })
//     .when("/admin/color", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/color-list.html",
//       controller: "color-ctrl",
//     })
//     .when("/admin/size", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/size-list.html",
//       controller: "size-ctrl",
//     })
//     .when("/admin/material", {
//       templateUrl: "/Fe/Html-DATN2/ofView/admin/material-list.html",
//       controller: "material-ctrl",
//     })
//     // tinh
//     .when("/admin/voucher", {
//       templateUrl: "/Fe/Html-DATN2/ofView/Tinh/html/voucher/voucher_home.html",
//       controller: "voucher-list-controller",
//     })
//     .when("/admin/index", {
//       templateUrl: "/Fe/Html-DATN2/ofView/Tinh/html/thongKe/thongKe.html",
//       controller: "statistical-ctrl",
//     });

//   // <!-- Nguyen -->
// });

// Hieu js
//--------------------------------tinh thong kê-----------------------------

//---------------------------------Tịnh end thong kê---------------------------
//---------------------------------Tịnh Voucher---------------------------
//---------------------------------Tịnh end Voucher---------------------------

app.controller("brand-ctrl", function ($scope, $http, $timeout) {
  $scope.originalBrand = [];
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
          .delete(apiBrand + `/${item.id}`)
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
          return $scope.size.slice(start, start + this.size);
      },
      get count() {
          return Math.ceil((1.0 * $scope.size.length) / this.size);
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

// app.controller("size-ctrl", function ($scope, $http, $timeout) {
//   const apiUrlSize = "http://localhost:8080/api/size";

//   $scope.sizes = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };
//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };
//   $scope.initialize = function () {
//     $http.get(apiUrlSize + "/page").then((resp) => {
//       $scope.sizes = resp.data.content;
//       $scope.totalPages = resp.data.totalPages;
//     });
//   };
//   $scope.initialize();

//   $scope.edit = function (cate) {
//     $scope.formUpdate = angular.copy(cate);
//   };
//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     $http
//       .post(apiUrlSize, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Create size successfully!");
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//         $scope.resetFormInput();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     $http
//       .put(`${apiUrlSize}/${item.id}`, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Update size successfully!");
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//         $scope.resetFormUpdate();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`${apiUrlSize}/${item.id}`)
//       .then((resp) => {
//         $scope.showSuccessMessage("Delete color successfully!");
//         $scope.initialize();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateColor.$setPristine();
//     $scope.formUpdateColor.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formAddColor.$setPristine();
//     $scope.formAddColor.$setUntouched();
//   };

//   //ham hien thi nut phan trang
//   $scope.displayPageRange = function () {
//     var range = [];
//     for (var i = 1; i <= $scope.totalPages; i++) {
//       range.push(i);
//     }
//     return range;
//   };

//   //ham hien thi trang
//   $scope.setPage = function (page) {
//     $currentPage = page;
//     page = page - 1;
//     $http.get(apiUrlSize + "/page?page=" + page).then(function (response) {
//       $scope.sizes = response.data.content;
//       $scope.totalPage = response.data.totalPages;
//     });
//   };
// });

// app.controller("material-ctrl", function ($scope, $http, $timeout) {
//   const apiUrlMaterial = "http://localhost:8080/api/material";

//   $scope.materials = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };
//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };
//   $scope.initialize = function () {
//     $http.get(apiUrlMaterial + "/page").then((resp) => {
//       $scope.materials = resp.data.content;
//       $scope.totalPages = resp.data.totalPages;
//     });
//   };
//   $scope.initialize();

//   $scope.edit = function (cate) {
//     $scope.formUpdate = angular.copy(cate);
//   };
//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     $http
//       .post(apiUrlMaterial, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Create material successfully!");
//         $scope.resetFormInput();
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     $http
//       .put(`${apiUrlMaterial}/${item.id}`, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Update material successfully!");
//         $scope.resetFormUpdate();
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`${apiUrlMaterial}/${item.id}`)
//       .then((resp) => {
//         $scope.showSuccessMessage("Delete color successfully!");
//         $scope.initialize();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateColor.$setPristine();
//     $scope.formUpdateColor.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formAddColor.$setPristine();
//     $scope.formAddColor.$setUntouched();
//   };

//   // //ham lay tat ca san pham co phan trang
//   // $scope.getProduct = function () {
//   //     $http.get(apiUrlProduct + "/page")
//   //         .then(function (response) {
//   //             $scope.products = response.data.content;
//   //             $scope.totalPages = response.data.totalPages;
//   //         });
//   // }
//   // $scope.getProduct();

//   //ham hien thi nut phan trang
//   $scope.displayPageRange = function () {
//     var range = [];
//     for (var i = 1; i <= $scope.totalPages; i++) {
//       range.push(i);
//     }
//     return range;
//   };

//   //ham hien thi trang
//   $scope.setPage = function (page) {
//     page = page - 1;
//     $http.get(apiUrlMaterial + "/page?page=" + page).then(function (response) {
//       console.log(response);
//       $scope.materials = response.data.content;
//       $scope.totalPage = response.data.totalPages;
//     });
//   };

//   //tao doi tuong
//   // const getProduct = function () {
//   //     return {
//   //         "name": $scope.name,
//   //         "collar": $scope.collar,
//   //         "wrist": $scope.wrist,
//   //         "describe": $scope.describe,
//   //         "brand": $scope.brand,
//   //         "material": {
//   //             id: $scope.idMaterial,
//   //         },
//   //         "material": {
//   //             id: $scope.idMaterial,
//   //         },
//   //     }
//   // }
// });

// app.controller("color-ctrl", function ($scope, $http, $timeout) {
//   const apiUrlColor = "http://localhost:8080/api/color";

//   $scope.colors = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };
//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };
//   $scope.initialize = function () {
//     $http.get(apiUrlColor + "/page").then((resp) => {
//       $scope.colors = resp.data.content;
//       $scope.totalPages = resp.data.totalPages;
//     });
//   };
//   $scope.initialize();

//   $scope.edit = function (cate) {
//     $scope.formUpdate = angular.copy(cate);
//   };
//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     $http
//       .post(apiUrlColor, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Create color successfully!");
//         $scope.resetFormInput();
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     $http
//       .put(`${apiUrlColor}/${item.id}`, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Update color successfully!");
//         $scope.resetFormUpdate();
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`${apiUrlColor}/${item.id}`)
//       .then((resp) => {
//         $scope.showSuccessMessage("Delete color successfully!");
//         $scope.initialize();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateColor.$setPristine();
//     $scope.formUpdateColor.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formAddColor.$setPristine();
//     $scope.formAddColor.$setUntouched();
//   };

//   // //ham lay tat ca san pham co phan trang
//   // $scope.getProduct = function () {
//   //     $http.get(apiUrlProduct + "/page")
//   //         .then(function (response) {
//   //             $scope.products = response.data.content;
//   //             $scope.totalPages = response.data.totalPages;
//   //         });
//   // }
//   // $scope.getProduct();

//   //ham hien thi nut phan trang
//   $scope.displayPageRange = function () {
//     var range = [];
//     for (var i = 1; i <= $scope.totalPages; i++) {
//       range.push(i);
//     }
//     return range;
//   };

//   //ham hien thi trang
//   $scope.setPage = function (page) {
//     page = page - 1;
//     $http.get(apiUrlColor + "/page?page=" + page).then(function (response) {
//       console.log(response);
//       $scope.colors = response.data.content;
//       $scope.totalPage = response.data.totalPages;
//     });
//   };

//   //tao doi tuong
//   // const getProduct = function () {
//   //     return {
//   //         "name": $scope.name,
//   //         "collar": $scope.collar,
//   //         "wrist": $scope.wrist,
//   //         "describe": $scope.describe,
//   //         "brand": $scope.brand,
//   //         "color": {
//   //             id: $scope.idColor,
//   //         },
//   //         "material": {
//   //             id: $scope.idMaterial,
//   //         },
//   //     }
//   // }
// });

// app.controller("category-ctrl", function ($scope, $http, $timeout) {
//   const apiUrlCategory = "http://localhost:8080/api/category";

//   $scope.categories = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };
//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };
//   $scope.initialize = function () {
//     $http.get(apiUrlCategory + "/page").then((resp) => {
//       $scope.categories = resp.data.content;
//       $scope.totalPages = resp.data.totalPages;
//     });
//   };
//   $scope.initialize();

//   $scope.edit = function (cate) {
//     $scope.formUpdate = angular.copy(cate);
//   };
//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     $http
//       .post(apiUrlCategory, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Create category successfully!");
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//         $scope.resetFormInput();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     $http
//       .put(`${apiUrlCategory}/${item.id}`, item)
//       .then((resp) => {
//         $scope.showSuccessMessage("Update category successfully!");
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//         $scope.resetFormUpdate();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`${apiUrlCategory}/${item.id}`)
//       .then((resp) => {
//         $scope.showSuccessMessage("Delete color successfully!");
//         $scope.initialize();
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateColor.$setPristine();
//     $scope.formUpdateColor.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formAddColor.$setPristine();
//     $scope.formAddColor.$setUntouched();
//   };

//   //ham hien thi nut phan trang
//   $scope.displayPageRange = function () {
//     var range = [];
//     for (var i = 1; i <= $scope.totalPages; i++) {
//       range.push(i);
//     }
//     return range;
//   };

//   //ham hien thi trang
//   $scope.setPage = function (page) {
//     $currentPage = page;
//     page = page - 1;
//     $http.get(apiUrlCategory + "/page?page=" + page).then(function (response) {
//       $scope.categories = response.data.content;
//       $scope.totalPage = response.data.totalPages;
//     });
//   };
// });

// app.controller("favorite-ctrl", function ($scope, $http, $timeout) {
//   $scope.originalFavorite = [];
//   $scope.favorite = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.currentDate = new Date();

//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };

//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };

//   $scope.search = function () {
//     // Kiểm tra từ khóa tìm kiếm
//     if ($scope.searchKeyword.trim() !== "") {
//       $scope.favorite = $scope.originalFavorite.filter(function (item) {
//         if (item && item.content) {
//           return item.content
//             .toLowerCase()
//             .includes($scope.searchKeyword.toLowerCase());
//         }
//         return false;
//       });
//     } else {
//       // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalFavorite
//       $scope.favorite = angular.copy($scope.originalFavorite);
//     }
//     // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
//     $scope.changePageSize();
//   };

//   $scope.initialize = function () {
//     $http.get("/favorite").then(function (resp) {
//       $scope.originalFavorite = resp.data;
//       $scope.favorite = angular.copy($scope.originalFavorite);
//     });
//   };

//   $scope.initialize();

//   $scope.loadCustomers = function () {
//     $http
//       .get("/customer") // Thay đổi đường dẫn API tương ứng
//       .then(function (resp) {
//         $scope.customers = resp.data;
//       })
//       .catch(function (error) {
//         console.log("Error loading customers", error);
//       });
//   };

//   $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

//   $scope.loadProducts = function () {
//     $http
//       .get("/api/product") // Thay đổi đường dẫn API tương ứng
//       .then(function (resp) {
//         $scope.products = resp.data;
//       })
//       .catch(function (error) {
//         console.log("Error loading products", error);
//       });
//   };

//   $scope.loadProducts();

//   $scope.edit = function (favorite) {
//     if ($scope.formUpdate.updatedAt) {
//       $scope.formUpdate = angular.copy(favorite);
//     } else {
//       $scope.formUpdate = angular.copy(favorite);
//       $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
//     }
//   };

//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     item.createdAt = $scope.currentDate;
//     item.createdAt = $scope.currentDate;
//     $http
//       .post("/favorite", item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Create favorite successfully");
//         $scope.resetFormInput();
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     console.log(item);
//     item.updatedAt = $scope.currentDate;

//     $http
//       .put(`/favorite/${item.id}`, item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Update Favorite successfully");
//         $scope.resetFormUpdate();
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`/favorite/${item.id}`)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Delete Favorite successfully");
//         $scope.initialize();
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateFavorite.$setPristine();
//     $scope.formUpdateFavorite.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formCreateFavorite.$setPristine();
//     $scope.formCreateFavorite.$setUntouched();
//   };

//   $scope.changePageSize = function () {
//     $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
//   };

//   $scope.paper = {
//     page: 0,
//     size: 5, // Kích thước mặc định ban đầu
//     get items() {
//       let start = this.page * this.size;
//       return $scope.favorite.slice(start, start + this.size);
//     },
//     get count() {
//       return Math.ceil((1.0 * $scope.favorite.length) / this.size);
//     },
//     first() {
//       this.page = 0;
//     },
//     prev() {
//       if (this.page > 0) {
//         this.page--;
//       }
//     },
//     next() {
//       if (this.page < this.count - 1) {
//         this.page++;
//       }
//     },
//     last() {
//       this.page = this.count - 1;
//     },
//   };
// });

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
// app.controller("address-ctrl", function ($scope, $http, $timeout) {
//   $scope.originalAddress = [];
//   $scope.address = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.currentDate = new Date();

//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };
//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };

//   $scope.search = function () {
//     // Kiểm tra từ khóa tìm kiếm
//     if ($scope.searchKeyword.trim() !== "") {
//       $scope.address = $scope.originalAddress.filter(function (item) {
//         if (item && item.address) {
//           return item.address
//             .toLowerCase()
//             .includes($scope.searchKeyword.toLowerCase());
//         }
//         return false;
//       });
//     } else {
//       // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalAddress
//       $scope.address = angular.copy($scope.originalAddress);
//     }
//     // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
//     $scope.changePageSize();
//   };
//   $scope.initialize = function () {
//     $http.get("/address").then(function (resp) {
//       $scope.originalAddress = resp.data;
//       $scope.address = angular.copy($scope.originalAddress);
//     });
//   };

//   $scope.initialize();

//   // $scope.customers = []; // Khởi tạo danh sách khách hàng

//   $scope.loadCustomers = function () {
//     $http
//       .get("/customer") // Thay đổi đường dẫn API tương ứng
//       .then(function (resp) {
//         $scope.customers = resp.data;
//       })
//       .catch(function (error) {
//         console.log("Error loading customers", error);
//       });
//   };

//   $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

//   $scope.edit = function (address) {
//     if ($scope.formUpdate.updatedAt) {
//       $scope.formUpdate = angular.copy(address);
//     } else {
//       $scope.formUpdate = angular.copy(address);
//       $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
//     }
//   };
//   // $scope.edit = function (address) {
//   //     $scope.formUpdate = angular.copy(address);
//   // }

//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     item.createdAt = $scope.currentDate;
//     item.address = getResult1();

//     $http
//       .post("/address", item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Create address successfully");
//         $scope.resetFormInput();
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };
//   function getResult1() {
//     let houseNumber1 = $("#houseNumber1").val();
//     let city1 = $("#city1 option:selected").text();
//     let district1 = $("#district1 option:selected").text();
//     let ward1 = $("#ward1 option:selected").text();

//     return houseNumber1 && district1 && city1 && ward1
//       ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
//       : "";
//   }

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     console.log(item);
//     item.updatedAt = $scope.currentDate;
//     item.address = getResult2();

//     $http
//       .put(`/address/${item.id}`, item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Update address successfully");
//         $scope.resetFormUpdate();
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };
//   function getResult2() {
//     let houseNumber2 = $("#houseNumber2").val();
//     let city2 = $("#city2 option:selected").text();
//     let district2 = $("#district2 option:selected").text();
//     let ward2 = $("#ward2 option:selected").text();

//     return houseNumber2 && district2 && city2 && ward2
//       ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
//       : "";
//   }

//   $scope.delete = function (item) {
//     $http
//       .delete(`/address/${item.id}`)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Delete address successfully");
//         $scope.initialize();
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateAddress.$setPristine();
//     $scope.formUpdateAddress.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formCreateAddress.$setPristine();
//     $scope.formCreateAddress.$setUntouched();
//   };

//   $scope.changePageSize = function () {
//     $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
//   };

//   $scope.paper = {
//     page: 0,
//     size: 5, // Kích thước mặc định ban đầu
//     get items() {
//       let start = this.page * this.size;
//       return $scope.address.slice(start, start + this.size);
//     },
//     get count() {
//       return Math.ceil((1.0 * $scope.address.length) / this.size);
//     },
//     first() {
//       this.page = 0;
//     },
//     prev() {
//       if (this.page > 0) {
//         this.page--;
//       }
//     },
//     next() {
//       if (this.page < this.count - 1) {
//         this.page++;
//       }
//     },
//     last() {
//       this.page = this.count - 1;
//     },
//   };

//   const host = "https://provinces.open-api.vn/api/";

//   var callAPI = (api, callback) => {
//     return axios
//       .get(api)
//       .then((response) => {
//         callback(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   // Load city data for the first set of elements
//   callAPI(host + "?depth=1", (data) => {
//     renderData(data, "city1");
//   });

//   // Load city data for the second set of elements
//   callAPI(host + "?depth=1", (data) => {
//     renderData(data, "city2");
//   });

//   var callApiDistrict = (api, dropdownId) => {
//     callAPI(api, (data) => {
//       renderData(data.districts, dropdownId);
//     });
//   };

//   var callApiWard = (api, dropdownId) => {
//     callAPI(api, (data) => {
//       renderData(data.wards, dropdownId);
//     });
//   };

//   var renderData = (array, select) => {
//     let row = '<option disable value="">Chọn</option>';
//     array.forEach((element) => {
//       row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
//     });
//     document.querySelector("#" + select).innerHTML = row;
//   };

//   $("#city1, #city2").change(function () {
//     const dropdownId = $(this).attr("id");
//     const districtDropdownId = dropdownId.replace("city", "district");
//     const selectedCityId = $(this).find(":selected").data("id");

//     // Clear district and ward dropdowns
//     $("#" + districtDropdownId)
//       .empty()
//       .html('<option value="" selected>Chọn quận huyện</option>');

//     const wardDropdownId = dropdownId.replace("city", "ward");
//     $("#" + wardDropdownId)
//       .empty()
//       .html('<option value="" selected>Chọn phường xã</option>');

//     if (selectedCityId) {
//       callApiDistrict(
//         host + "p/" + selectedCityId + "?depth=2",
//         districtDropdownId
//       );
//     }
//     printResult();
//   });

//   $("#district1, #district2").change(function () {
//     const dropdownId = $(this).attr("id");
//     const wardDropdownId = dropdownId.replace("district", "ward");
//     const selectedDistrictId = $(this).find(":selected").data("id");

//     $("#" + wardDropdownId)
//       .empty()
//       .html('<option value="" selected>Chọn phường xã</option>');

//     if (selectedDistrictId) {
//       callApiWard(
//         host + "d/" + selectedDistrictId + "?depth=2",
//         wardDropdownId
//       );
//     }
//     printResult();
//   });

//   $("#ward1, #ward2, #houseNumber1, #houseNumber2").on(
//     "change input",
//     function () {
//       printResult();
//     }
//   );

//   var printResult = () => {
//     let houseNumber1 = $("#houseNumber1").val();
//     let city1 = $("#city1 option:selected").text();
//     let district1 = $("#district1 option:selected").text();
//     let ward1 = $("#ward1 option:selected").text();

//     let houseNumber2 = $("#houseNumber2").val();
//     let city2 = $("#city2 option:selected").text();
//     let district2 = $("#district2 option:selected").text();
//     let ward2 = $("#ward2 option:selected").text();

//     let result1 =
//       houseNumber1 && district1 && city1 && ward1
//         ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
//         : "";
//     let result2 =
//       houseNumber2 && district2 && city2 && ward2
//         ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
//         : "";

//     $("#inputAddress1").val(result1);
//     $("#inputAddress2").val(result2);
//   };

//   // Initial call when the page loads
//   printResult();
// });

// app.controller("account-ctrl", function ($scope, $http, $timeout) {
//   $scope.originalAccount = [];
//   $scope.account = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.currentDate = new Date();
//   const apiUrlAccount = "http://localhost:8080/account";
//   const apiUrlRole = "http://localhost:8080/role";

//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };

//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };

//   $scope.search = function () {
//     // Kiểm tra từ khóa tìm kiếm
//     if ($scope.searchKeyword.trim() !== "") {
//       $scope.account = $scope.originalAccount.filter(function (item) {
//         if (item && item.account) {
//           return item.account
//             .toLowerCase()
//             .includes($scope.searchKeyword.toLowerCase());
//         }
//         return false;
//       });
//     } else {
//       // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalAccount
//       $scope.account = angular.copy($scope.originalAccount);
//     }
//     // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
//     $scope.changePageSize();
//   };
//   $scope.initialize = function () {
//     $http.get(apiUrlAccount).then(function (resp) {
//       $scope.originalAccount = resp.data;
//       $scope.account = angular.copy($scope.originalAccount);
//     });
//   };

//   $scope.initialize();

//   $scope.loadRoles = function () {
//     $http
//       .get(apiUrlRole)
//       .then(function (resp) {
//         $scope.roles = resp.data;
//       })
//       .catch(function (error) {
//         console.log("Error loading customers", error);
//       });
//   };

//   $scope.loadRoles();

//   $scope.edit = function (account) {
//     if ($scope.formUpdate.updatedAt) {
//       $scope.formUpdate = angular.copy(account);
//     } else {
//       $scope.formUpdate = angular.copy(account);
//       $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
//     }
//   };
//   // $scope.edit = function (account) {
//   //     $scope.formUpdate = angular.copy(account);
//   // }

//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     item.createdAt = $scope.currentDate;
//     item.password = "fiveguys123";
//     item.status = 1;
//     $http
//       .post(apiUrlAccount + "/save", item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Thêm tài khoản thành công");
//         $scope.resetFormInput();
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     console.log(item);
//     $http
//       .put(apiUrlAccount + `${item.id}`, item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Sửa tài khoản thành công");
//         $scope.resetFormUpdate();
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`/account/${item.id}`)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Xoá thành công");
//         $scope.initialize();
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateAccount.$setPristine();
//     $scope.formUpdateAccount.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formCreateAccount.$setPristine();
//     $scope.formCreateAccount.$setUntouched();
//   };

//   $scope.changePageSize = function () {
//     $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
//   };

//   $scope.paper = {
//     page: 0,
//     size: 5, // Kích thước mặc định ban đầu
//     get items() {
//       let start = this.page * this.size;
//       return $scope.account.slice(start, start + this.size);
//     },
//     get count() {
//       return Math.ceil((1.0 * $scope.account.length) / this.size);
//     },
//     first() {
//       this.page = 0;
//     },
//     prev() {
//       if (this.page > 0) {
//         this.page--;
//       }
//     },
//     next() {
//       if (this.page < this.count - 1) {
//         this.page++;
//       }
//     },
//     last() {
//       this.page = this.count - 1;
//     },
//   };
// });

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
      templateUrl: "/ofView/admin/account.html",
      controller: "account-ctrl",
    })
    .when("/admin/account/address", {
      templateUrl: "/ofView/admin/address.html",
      controller: "address-ctrl",
    })
    .when("/admin/account/customer", {
      templateUrl: "/ofView/admin/customer.html",
      controller: "customer-ctrl",
    })
    .when("/admin/account/employee", {
      templateUrl: "/ofView/admin/employee_home.html",
      controller: "employee-ctrl",
    })
    .when("/admin/account/favorite", {
      templateUrl: "/ofView/admin/favorite.html",
      controller: "favorite-ctrl",
    })
    .when("/admin/account/rating", {
      templateUrl: "/ofView/admin/rating.html",
      controller: "rating-ctrl",
    })
    .when("/admin/account/role", {
      templateUrl: "/ofView/admin/role.html",
      controller: "role-ctrl",
    })
    .when("/admin/brand", {
      templateUrl: "/ofView/admin/brand.html",
      controller: "brand-ctrl",
    })
    .when("/admin/category", {
      templateUrl: "/ofView/admin/category-list.html",
      controller: "category-ctrl",
    })
    .when("/admin/color", {
      templateUrl: "/ofView/admin/color-list.html",
      controller: "color-ctrl",
    })
    .when("/admin/size", {
      templateUrl: "/ofView/admin/size-list.html",
      controller: "size-ctrl",
    })
    .when("/admin/material", {
      templateUrl: "/ofView/admin/material-list.html",
      controller: "material-ctrl",
    })
    // tinh
    .when("/admin/voucher", {
      templateUrl: "/ofView/Tinh/html/voucher/voucher_home.html",
      controller: "voucher-list-controller",
    })
    .when("/admin/index", {
      templateUrl: "/ofView/Tinh/html/thongKe/thongKe.html",
      controller: "statistical-ctrl",
    });

  // <!-- Nguyen -->
});

// Hieu js
// --------------------------------tinh thong kê-----------------------------

// app.controller("brand-ctrl", function ($scope, $http, $timeout) {
//   $scope.originalbrand = [];
//   $scope.brand = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.currentDate = new Date();
//   const apiBrand = "http://localhost:8080/brand";

//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };

//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };

//   $scope.search = function () {
//     // Kiểm tra từ khóa tìm kiếm
//     if ($scope.searchKeyword.trim() !== "") {
//       $scope.brand = $scope.originalBrand.filter(function (item) {
//         if (item && item.name) {
//           return item.name
//             .toLowerCase()
//             .includes($scope.searchKeyword.toLowerCase());
//         }
//         return false;
//       });
//     } else {
//       // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalBrand
//       $scope.brand = angular.copy($scope.originalBrand);
//     }
//     // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
//     $scope.changePageSize();
//   };

//   $scope.initialize = function () {
//     $http.get(apiBrand).then(function (resp) {
//       $scope.originalBrand = resp.data; // Lưu dữ liệu gốc
//       $scope.brand = angular.copy($scope.originalBrand); // Sao chép dữ liệu gốc sang mảng hiển thị
//     });
//   };

//   $scope.initialize();

//   $scope.edit = function (brand) {
//     if ($scope.formUpdate.updatedAt) {
//       $scope.formUpdate = angular.copy(brand);
//     } else {
//       $scope.formUpdate = angular.copy(brand);
//       $scope.formUpdate.updatedAt = new Date();
//     }
//   };

//   // $scope.create = function () {
//   //     let item = angular.copy($scope.formInput);
//   //     item.createdAt = $scope.currentDate;
//   //     $http.post("/brand", item).then(function (resp) {
//   //         $scope.showSuccessMessage("Create brand successfully");
//   //         $scope.resetFormInput();
//   //         $scope.initialize();
//   //         $('#modalAdd').modal('hide');
//   //     }).catch(function (error) {
//   //         console.log("Error", error);
//   //     });
//   // }
//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     item.createdAt = $scope.currentDate;
//     $http
//       .post(apiBrand, item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Create brand successfully");
//         $scope.resetFormInput();
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//       })
//       .catch(function (error) {
//         if (error.status === 400 && error.data === "Name already exists") {
//           $scope.nameExists = true;
//         } else {
//           console.log("Error", error);
//         }
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     console.log(item);
//     item.updatedAt = $scope.currentDate;
//     $http
//       .put(apiBrand + `${item.id}`, item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Update Brand successfully");
//         $scope.resetFormUpdate();
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//       })
//       .catch(function (error) {
//         if (error.status === 400 && error.data === "Name already exists") {
//           $scope.nameExists = true;
//         } else {
//           console.log("Error", error);
//         }
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`/brand/${item.id}`)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Delete Brand successfully");
//         $scope.initialize();
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateBrand.$setPristine();
//     $scope.formUpdateBrand.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formCreateBrand.$setPristine();
//     $scope.formCreateBrand.$setUntouched();
//   };

//   $scope.changePageSize = function () {
//     $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
//   };

//   $scope.paper = {
//     page: 0,
//     size: 5, // Kích thước mặc định ban đầu
//     get items() {
//       let start = this.page * this.size;
//       return $scope.brand.slice(start, start + this.size);
//     },
//     get count() {
//       return Math.ceil((1.0 * $scope.brand.length) / this.size);
//     },
//     first() {
//       this.page = 0;
//     },
//     prev() {
//       if (this.page > 0) {
//         this.page--;
//       }
//     },
//     next() {
//       if (this.page < this.count - 1) {
//         this.page++;
//       }
//     },
//     last() {
//       this.page = this.count - 1;
//     },
//   };
// });

app.controller("size-ctrl", function ($scope, $http, $timeout) {
  $scope.originalSize = [];
  $scope.size = [];
  $scope.formUpdate = {};
  $scope.formInput = {};
  $scope.showAlert = false;
  $scope.currentDate = new Date();
  const apiSize = "http://localhost:8080/api/size";

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
      $scope.size = $scope.originalSize.filter(function (item) {
        if (item && item.name) {
          return item.name
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
        }
        return false;
      });
    } else {
      // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalSize
      $scope.size = angular.copy($scope.originalSize);
    }
    // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
    $scope.changePageSize();
  };

  $scope.initialize = function () {
    $http.get(apiSize).then(function (resp) {
      $scope.originalSize = resp.data; // Lưu dữ liệu gốc
      $scope.size = angular.copy($scope.originalSize); // Sao chép dữ liệu gốc sang mảng hiển thị
    });
  };

  $scope.initialize();

  $scope.edit = function (size) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(size);
    } else {
      $scope.formUpdate = angular.copy(size);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

  // $scope.create = function () {
  //     let item = angular.copy($scope.formInput);
  //     item.createdAt = $scope.currentDate;
  //     $http.post("/size", item).then(function (resp) {
  //         $scope.showSuccessMessage("Create size successfully");
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
      .post(apiSize, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create Size successfully");
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
      .put(apiSize + `${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update Size successfully");
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
      .delete(apiSize + `/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Size successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateSize.$setPristine();
    $scope.formUpdateSize.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateSize.$setPristine();
    $scope.formCreateSize.$setUntouched();
  };

  $scope.changePageSize = function () {
    $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
  };

  $scope.paper = {
    page: 0,
    size: 5, // Kích thước mặc định ban đầu
    get items() {
      let start = this.page * this.size;
      return $scope.size.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil((1.0 * $scope.size.length) / this.size);
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


app.controller("material-ctrl", function ($scope, $http, $timeout) {
  $scope.originalMaterial = [];
  $scope.material = [];
  $scope.formUpdate = {};
  $scope.formInput = {};
  $scope.showAlert = false;
  $scope.currentDate = new Date();
  const apiMaterial = "http://localhost:8080/api/material";

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
      $scope.material = $scope.originalMaterial.filter(function (item) {
        if (item && item.name) {
          return item.name
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
        }
        return false;
      });
    } else {
      // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalMaterial
      $scope.material = angular.copy($scope.originalMaterial);
    }
    // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
    $scope.changePageSize();
  };

  $scope.initialize = function () {
    $http.get(apiMaterial).then(function (resp) {
      $scope.originalMaterial = resp.data; // Lưu dữ liệu gốc
      $scope.material = angular.copy($scope.originalMaterial); // Sao chép dữ liệu gốc sang mảng hiển thị
    });
  };

  $scope.initialize();

  $scope.edit = function (material) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(material);
    } else {
      $scope.formUpdate = angular.copy(material);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

  // $scope.create = function () {
  //     let item = angular.copy($scope.formInput);
  //     item.createdAt = $scope.currentDate;
  //     $http.post("/material", item).then(function (resp) {
  //         $scope.showSuccessMessage("Create material successfully");
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
      .post(apiMaterial, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create Material successfully");
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
      .put(apiMaterial + `${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update Material successfully");
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
      .delete(apiMaterial + `/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Material successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateMaterial.$setPristine();
    $scope.formUpdateMaterial.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateMaterial.$setPristine();
    $scope.formCreateMaterial.$setUntouched();
  };

  $scope.changePageSize = function () {
    $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
  };

  $scope.paper = {
    page: 0,
    size: 5, // Kích thước mặc định ban đầu
    get items() {
      let start = this.page * this.size;
      return $scope.size.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil((1.0 * $scope.size.length) / this.size);
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


app.controller("color-ctrl", function ($scope, $http, $timeout) {
  $scope.originalColor = [];
  $scope.color = [];
  $scope.formUpdate = {};
  $scope.formInput = {};
  $scope.showAlert = false;
  $scope.currentDate = new Date();
  const apiColor = "http://localhost:8080/api/color";

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
      $scope.color = $scope.originalColor.filter(function (item) {
        if (item && item.name) {
          return item.name
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
        }
        return false;
      });
    } else {
      // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalColor
      $scope.color = angular.copy($scope.originalColor);
    }
    // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
    $scope.changePageSize();
  };

  $scope.initialize = function () {
    $http.get(apiColor).then(function (resp) {
      $scope.originalColor = resp.data; // Lưu dữ liệu gốc
      $scope.color = angular.copy($scope.originalColor); // Sao chép dữ liệu gốc sang mảng hiển thị
    });
  };

  $scope.initialize();

  $scope.edit = function (color) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(color);
    } else {
      $scope.formUpdate = angular.copy(color);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

  // $scope.create = function () {
  //     let item = angular.copy($scope.formInput);
  //     item.createdAt = $scope.currentDate;
  //     $http.post("/color", item).then(function (resp) {
  //         $scope.showSuccessMessage("Create color successfully");
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
      .post(apiColor, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create Color successfully");
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
      .put(apiColor + `${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update Color successfully");
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
      .delete(apiColor + `/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Color successfully");
        $scope.initialize();
      })
      .catch(function (error) {
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
    $scope.formCreateColor.$setPristine();
    $scope.formCreateColor.$setUntouched();
  };

  $scope.changePageSize = function () {
    $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
  };

  $scope.paper = {
    page: 0,
    size: 5, // Kích thước mặc định ban đầu
    get items() {
      let start = this.page * this.size;
      return $scope.size.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil((1.0 * $scope.size.length) / this.size);
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



app.controller("category-ctrl", function ($scope, $http, $timeout) {
  $scope.originalCategory = [];
  $scope.category = [];
  $scope.formUpdate = {};
  $scope.formInput = {};
  $scope.showAlert = false;
  $scope.currentDate = new Date();
  const apiCategory = "http://localhost:8080/api/category";

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
      $scope.category = $scope.originalCategory.filter(function (item) {
        if (item && item.name) {
          return item.name
            .toLowerCase()
            .includes($scope.searchKeyword.toLowerCase());
        }
        return false;
      });
    } else {
      // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalCategory
      $scope.category = angular.copy($scope.originalCategory);
    }
    // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
    $scope.changePageSize();
  };

  $scope.initialize = function () {
    $http.get(apiCategory).then(function (resp) {
      $scope.originalCategory = resp.data; // Lưu dữ liệu gốc
      $scope.category = angular.copy($scope.originalCategory); // Sao chép dữ liệu gốc sang mảng hiển thị
    });
  };

  $scope.initialize();

  $scope.edit = function (category) {
    if ($scope.formUpdate.updatedAt) {
      $scope.formUpdate = angular.copy(category);
    } else {
      $scope.formUpdate = angular.copy(category);
      $scope.formUpdate.updatedAt = new Date();
    }
  };

  // $scope.create = function () {
  //     let item = angular.copy($scope.formInput);
  //     item.createdAt = $scope.currentDate;
  //     $http.post("/category", item).then(function (resp) {
  //         $scope.showSuccessMessage("Create category successfully");
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
      .post(apiCategory, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Create Category successfully");
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
      .put(apiCategory + `${item.id}`, item)
      .then(function (resp) {
        $scope.showSuccessMessage("Update Category successfully");
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
      .delete(apiCategory + `/${item.id}`)
      .then(function (resp) {
        $scope.showSuccessMessage("Delete Category successfully");
        $scope.initialize();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  $scope.resetFormUpdate = function () {
    $scope.formUpdate = {};
    $scope.formUpdateCategory.$setPristine();
    $scope.formUpdateCategory.$setUntouched();
  };

  $scope.resetFormInput = function () {
    $scope.formInput = {};
    $scope.formCreateCategory.$setPristine();
    $scope.formCreateCategory.$setUntouched();
  };

  $scope.changePageSize = function () {
    $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
  };

  $scope.paper = {
    page: 0,
    size: 5, // Kích thước mặc định ban đầu
    get items() {
      let start = this.page * this.size;
      return $scope.category.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil((1.0 * $scope.category.length) / this.size);
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

  $scope.loadProducts = function () {
      $http
          .get("/api/product") // Thay đổi đường dẫn API tương ứng
          .then(function (resp) {
              $scope.products = resp.data;
          })
          .catch(function (error) {
              console.log("Error loading products", error);
          });
  };

  $scope.loadProducts();

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

  const apiRating = "http://localhost:8080/rating";

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
    $http.get(apiRating).then(function (resp) {
      $scope.originalRating = resp.data;
      $scope.rating = angular.copy($scope.originalRating);
    });
  };
  $scope.initialize();

  //chuyên status =2
  $scope.DanhGiaXacNhan = function (item) {
    console.log(item);
    $http
      .put(apiRating + "/update-status-rating-xac-nhan/" + `${item}`)
      .then(function () {
        $scope.initialize();
      });
  };
  //chuyên status =3
  $scope.DanhGiaHuy = function (item) {
    $http
      .put(apiRating + "/update-status-rating-huy/" + `${item}`)
      .then(function () {
        $scope.initialize();
      });
  };

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

  $scope.loadBillDetails = function () {
    $http
      .get("/billDetail") // Thay đổi đường dẫn API tương ứng
      .then(function (resp) {
        $scope.billDetails = resp.data;
      })
      .catch(function (error) {
        console.log("Error loading billDetails", error);
      });
  };

  $scope.loadBillDetails();

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
// app.controller("role-ctrl", function ($scope, $http, $timeout) {
//   $scope.originalRole = [];
//   $scope.role = [];
//   $scope.formUpdate = {};
//   $scope.formInput = {};
//   $scope.showAlert = false;
//   $scope.currentDate = new Date();

//   $scope.showSuccessMessage = function (message) {
//     $scope.alertMessage = message;
//     $scope.showAlert = true;
//     $timeout(function () {
//       $scope.closeAlert();
//     }, 5000);
//   };

//   $scope.closeAlert = function () {
//     $scope.showAlert = false;
//   };

//   $scope.search = function () {
//     // Kiểm tra từ khóa tìm kiếm
//     if ($scope.searchKeyword.trim() !== "") {
//       $scope.role = $scope.originalRole.filter(function (item) {
//         if (item && item.fullName) {
//           return item.fullName
//             .toLowerCase()
//             .includes($scope.searchKeyword.toLowerCase());
//         }
//         return false;
//       });
//     } else {
//       // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalRole
//       $scope.role = angular.copy($scope.originalRole);
//     }
//     // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
//     $scope.changePageSize();
//   };

//   $scope.initialize = function () {
//     $http.get("/role").then(function (resp) {
//       $scope.originalRole = resp.data; // Lưu dữ liệu gốc
//       $scope.role = angular.copy($scope.originalRole); // Sao chép dữ liệu gốc sang mảng hiển thị
//     });
//   };

//   $scope.initialize();

//   $scope.edit = function (role) {
//     if ($scope.formUpdate.updatedAt) {
//       $scope.formUpdate = angular.copy(role);
//     } else {
//       $scope.formUpdate = angular.copy(role);
//       $scope.formUpdate.updatedAt = new Date();
//     }
//   };

//   $scope.create = function () {
//     let item = angular.copy($scope.formInput);
//     item.createdAt = $scope.currentDate;
//     $http
//       .post("/role", item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Create role successfully");
//         $scope.resetFormInput();
//         $scope.initialize();
//         $("#modalAdd").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.update = function () {
//     let item = angular.copy($scope.formUpdate);
//     console.log(item);
//     item.updatedAt = $scope.currentDate;
//     $http
//       .put(`/role/${item.id}`, item)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Update Role successfully");
//         $scope.resetFormUpdate();
//         $scope.initialize();
//         $("#modalUpdate").modal("hide");
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.delete = function (item) {
//     $http
//       .delete(`/role/${item.id}`)
//       .then(function (resp) {
//         $scope.showSuccessMessage("Delete Role successfully");
//         $scope.initialize();
//       })
//       .catch(function (error) {
//         console.log("Error", error);
//       });
//   };

//   $scope.resetFormUpdate = function () {
//     $scope.formUpdate = {};
//     $scope.formUpdateRole.$setPristine();
//     $scope.formUpdateRole.$setUntouched();
//   };

//   $scope.resetFormInput = function () {
//     $scope.formInput = {};
//     $scope.formCreateRole.$setPristine();
//     $scope.formCreateRole.$setUntouched();
//   };

//   $scope.changePageSize = function () {
//     $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
//   };

//   $scope.paper = {
//     page: 0,
//     size: 5, // Kích thước mặc định ban đầu
//     get items() {
//       let start = this.page * this.size;
//       return $scope.role.slice(start, start + this.size);
//     },
//     get count() {
//       return Math.ceil((1.0 * $scope.role.length) / this.size);
//     },
//     first() {
//       this.page = 0;
//     },
//     prev() {
//       if (this.page > 0) {
//         this.page--;
//       }
//     },
//     next() {
//       if (this.page < this.count - 1) {
//         this.page++;
//       }
//     },
//     last() {
//       this.page = this.count - 1;
//     },
//   };
// });

app.controller("address-ctrl", function ($scope, $http, $timeout) {
  $scope.originalAddress = [];
  $scope.address = [];
  $scope.formUpdate = {};
  $scope.formInput = {};
  $scope.showAlert = false;
  $scope.currentDate = new Date();
  const apiAddress = "http://localhost:8080/address";
  const apiCustomer = "http://localhost:8080/customer";

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

  $scope.timkiemStatus = function () {
    if ($scope.formtimkiem === "1") {
      $http.get(apiAddress + "/timkiem-status/1").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "2") {
      $http.get(apiAddress + "/timkiem-status/2").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "0") {
      $http.get(apiAddress + "/timkiem-status/0").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "1") {
      $http.get(apiAddress).then(function (response) {
        $scope.listVoucher = response.data;
      });
    }
  };
  $scope.timkiemStatus();

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
    $http.get(apiAddress).then(function (resp) {
      $scope.originalAddress = resp.data;
      $scope.address = angular.copy($scope.originalAddress);
    });
  };

  $scope.initialize();

  // $scope.customers = []; // Khởi tạo danh sách khách hàng

  $scope.loadCustomers = function () {
    $http
      .get(apiCustomer) // Thay đổi đường dẫn API tương ứng
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
      .post(apiAddress, item)
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
      .put(apiAddress + `/${item.id}`, item)
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
      .delete(apiAddress + `/${item.id}`)
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

  $scope.timkiemStatus = function () {
    if ($scope.formtimkiem === "1") {
      $http.get(apiUrlAccount + "/timkiem-status/1").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "2") {
      $http.get(apiUrlAccount + "/timkiem-status/2").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "0") {
      $http.get(apiUrlAccount + "/timkiem-status/0").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "1") {
      $http.get(apiUrlAccount).then(function (response) {
        $scope.listVoucher = response.data;
      });
    }
  };
  $scope.timkiemStatus();

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
      .put(apiUrlAccount + "/" + `${item.id}`, item)
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
  const apiCustomer = "http://localhost:8080/customer";
  const apiAccount = "http://localhost:8080/account";

  imgShow("image", "image-preview");
  imgShow("image-update", "image-preview-update");

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

  $scope.timkiemStatus = function () {
    if ($scope.formtimkiem === "0") {
      $http.get(apiCustomer + "/timkiem-status/1").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "2") {
      $http.get(apiCustomer + "/timkiem-status/2").then(function (response) {
        $scope.listVoucher = response.data;
      });
    } else if ($scope.formtimkiem === "1") {
      $http.get(apiCustomer).then(function (response) {
        $scope.listVoucher = response.data;
      });
    }
  };
  $scope.timkiemStatus();

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
    $http.get(apiCustomer).then(function (resp) {
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

  $scope.createKA = function () {
    let fileInput = document.getElementById("image");
    if (fileInput.files.length > 0) {
      let data = new FormData();
      data.append("file", fileInput.files[0]);
      $scope.load();
      $http
        .post("http://localhost:8080/rest/upload", data, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then((resp) => {
          $scope.formInput.avatar = resp.data.name;
          let data = angular.copy($scope.formInput);

          let dataCustomer = {
            fullName: $scope.formInput.fullName,
            avatar: $scope.formInput.avatar,
            birthDate: $scope.formInput.birthDate,
            gender: $scope.formInput.gender,
            status: 1,
          };

          let dataAccount = {
            account: $scope.formInput.account,
            email: $scope.formInput.email,
            phoneNumber: $scope.formInput.phoneNumber,
            status: 1,
            role: {
              id: 3,
            },
          };

          let dataEA = {
            customerEntity: dataCustomer,
            accountEntity: dataAccount,
          };
          console.log(dataEA);

          $http
            .post(apiCustomer + "/createaKA", dataEA)
            .then((resp) => {
              $scope.showSuccessNotification("Thêm khách hàng thành công");
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
        });
    } else {
      $scope.showErrorImg = function (message) {
        $scope.alertErrorImg = message;
        $scope.showError = true;
      };
      $scope.showErrorImg("Please upload file");
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
      .put(apiCustomer + `/${item.id}`, item)
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
        .post("http://localhost:8080/rest/upload", data, {
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
      .put(apiCustomer + "/update-status" + `/${item.id}`, item)
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
    $http.get(apiCustomer + "/excel").then(function (response) {
      $scope.showSuccessNotification("Xuất file thành công");
      // $scope.pageEm = response.data.content;
      // $scope.totalPages = response.data.totalPages
    });
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
