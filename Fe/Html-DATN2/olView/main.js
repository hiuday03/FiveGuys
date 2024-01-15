


var app = angular.module("myApp", ["ngRoute", "angular-jwt"]);


// app.config(function($httpProvider) {
//     $httpProvider.interceptors.push('authInterceptor');
// });




// app.factory('authInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
//   return {
//       'request': function(config) {
//           // Lấy token từ cookies
//           var token = localStorage.getItem('token');

          
          
//           // Nếu có token, thêm header 'Authorization'
//           if (token) {
//               config.headers['Authorization'] = 'Bearer ' + token;
//           }
          
//           return config;
//       },
//       'responseError': function(response) {
//           // Xử lý các lỗi khi nhận response
//           return $q.reject(response);
//       }
//   };
// }]);


// 111
// Tạo một interceptor trong AngularJS
app.factory('TokenInterceptor', function($q, $injector) {
  var isRefreshing = false;
  var requestsToRetry = [];

  return {
      request: function(config) {
          var token = localStorage.getItem('token');
          if (token) {
              config.headers['Authorization'] = 'Bearer ' + token;
          }
          return config;
      },
      responseError: function(response) {
          var authService = $injector.get('AuthService');
          var $http = $injector.get('$http');
          var status = response.status;

          // Account not active
          if (status === 406) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
      return window.location.href = "http://127.0.0.1:5555/login/login.html";
          }

          // Token expired or invalid
          if (status === 401) {
              var deferred = $q.defer();
              var token = localStorage.getItem('refreshToken');
              localStorage.removeItem('token');
              if (!token || isRefreshing) {
                  authService.removeToken();
                  // Redirect to login or handle accordingly
                  return deferred.promise;
              }

              isRefreshing = true;
              authService.refreshToken(token)
                  .then(function(data) {
                      localStorage.setItem('token', data.accessToken);
                      isRefreshing = false;
                      requestsToRetry.forEach(function(config) {
                          config.headers.Authorization = 'Bearer ' + data.accessToken;
                          $http(config).then(function(response) {
                              deferred.resolve(response);
                          }, function(error) {
                              deferred.reject(error);
                          });
                      });
                      requestsToRetry = [];
                  })
                  .catch(function(error) {
                      authService.removeToken();
                      // Redirect to login or handle accordingly
                      isRefreshing = false;
                      deferred.reject(error);
                  });

              return deferred.promise;
          }

          return $q.reject(response);
      }
  };
});

// Thêm interceptor vào các request của AngularJS
app.config(function($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
});

app.factory('AuthService', function($http) {
  var isAuthenticated = false;
  var authService = {};

  authService.isAuthenticated = function() {
    // Kiểm tra xác thực ở đây, ví dụ kiểm tra localStorage hoặc thông tin xác thực khác
    var token = localStorage.getItem('token');
    return !!token; // Trả về true nếu người dùng đã xác thực, ngược lại trả về false
  };

  authService.refreshToken = function(refreshToken) {
      return $http.post('http://localhost:8080/RFToken/' + refreshToken)
          .then(function(response) {

              return response.data;
          })
          .catch(function(error) {
              throw error;
          });
  };

  // Các hàm khác trong AuthService nếu cần

  return authService;
});


// 111


app.config(['$compileProvider', function($compileProvider){
  $compileProvider.debugInfoEnabled(false);
  }]);

  
  
  app.config(function($httpProvider){
    $httpProvider.useApplyAsync(1000); //true
    });

    
app.config(function($routeProvider) {
  $routeProvider

  .when("/home", {
    templateUrl : "home.html",
    controller : "myApp-ctrl2"
  })
  .when("/cart", {
    templateUrl : "cart.html",
    controller : "myApp-ctrl2"
  })
  .when("/product-detail/:id", {
    templateUrl : "product-detail.html",
    controller : "myApp-ctrl2"
  })
  .when("/product", {
    templateUrl : "product.html",
    controller : "myApp-ctrl2"
  })
  .when("/product-search", {
    templateUrl : "product-search.html",
    controller : "myApp-ctrl2"
  }) 
  .when("/product-sortType", {
    templateUrl : "product-sortType.html",
    controller : "myApp-ctrl2"
  }) 
  .when("/paymentSuccess", {
    templateUrl : "paymentSuccess.html",
    controller : "myApp-ctrl2"
  })
  .when("/paymentFailed", {
    templateUrl : "paymentFailed.html",
    controller : "myApp-ctrl2"
  })
  .when("/checkOrder", {
    templateUrl : "checkOrder.html",
    controller : "myApp-ctrl2"
  })
  .when("/checkOrderDetail", {
    templateUrl : "checkOrderDetail.html",
    controller : "myApp-ctrl2"
  })
  .when("/account-info", {
    templateUrl: "accountManagemrnt/account-info.html",
    controller: "myApp-ctrl2",
    resolve: {
      isAuthenticated: function(AuthService, $location) {
        // Sử dụng AuthService để kiểm tra xác thực
        if (!AuthService.isAuthenticated()) {
          // Sử dụng $location.path() để chuyển hướng trong ứng dụng AngularJS
          window.location.href = "http://127.0.0.1:5555/login/login.html";
        }
      }
    }
  })
  .when("/account-address", {
    templateUrl : "accountManagemrnt/account-address.html",
    controller : "myApp-ctrl2",
    resolve: {
      isAuthenticated: function(AuthService, $location) {
        // Sử dụng AuthService để kiểm tra xác thực
        if (!AuthService.isAuthenticated()) {
          // Sử dụng $location.path() để chuyển hướng trong ứng dụng AngularJS
          window.location.href = "http://127.0.0.1:5555/login/login.html";
        }
      }
    }
  })
  .when("/account-favorite", {
    templateUrl : "accountManagemrnt/account-favorite.html",
    controller : "myApp-ctrl2",
    resolve: {
      isAuthenticated: function(AuthService, $location) {
        // Sử dụng AuthService để kiểm tra xác thực
        if (!AuthService.isAuthenticated()) {
          // Sử dụng $location.path() để chuyển hướng trong ứng dụng AngularJS
          window.location.href = "http://127.0.0.1:5555/login/login.html";
        }
      }
    }
  })
  .when("/account-history", {
    templateUrl : "accountManagemrnt/account-history.html",
    controller : "myApp-ctrl2",
    resolve: {
      isAuthenticated: function(AuthService, $location) {
        // Sử dụng AuthService để kiểm tra xác thực
        if (!AuthService.isAuthenticated()) {
          // Sử dụng $location.path() để chuyển hướng trong ứng dụng AngularJS
          window.location.href = "http://127.0.0.1:5555/login/login.html";
        }
      }
    }
  })
  .when("/account-historyDetail", {
    templateUrl : "accountManagemrnt/account-historyDetail.html",
    controller : "myApp-ctrl2",
    resolve: {
      isAuthenticated: function(AuthService, $location) {
        // Sử dụng AuthService để kiểm tra xác thực
        if (!AuthService.isAuthenticated()) {
          // Sử dụng $location.path() để chuyển hướng trong ứng dụng AngularJS
          window.location.href = "http://127.0.0.1:5555/login/login.html";
        }
      }
    }
  })
  .when("/account-evaluate", {
    templateUrl : "accountManagemrnt/account-evaluate.html",
    controller : "myApp-ctrl2",
    resolve: {
      isAuthenticated: function(AuthService, $location) {
        // Sử dụng AuthService để kiểm tra xác thực
        if (!AuthService.isAuthenticated()) {
          // Sử dụng $location.path() để chuyển hướng trong ứng dụng AngularJS
          window.location.href = "http://127.0.0.1:5555/login/login.html";
        }
      }
    }
  })
  // test ảnh
  // .when("/img", {
  //   templateUrl : "testImage.html",
  //   controller : "myApp-ctrl2"
  // })
  // .when("/login", {
  //   templateUrl : "login.html",
  //   controller : "LoginCtrl"
  // })
  ;
  
});

app.controller("myApp-ctrl2", function ($scope,$filter,$rootScope, $http, $routeParams,$location,jwtHelper) {
  $scope.currentPage = 0; // Trang hiện tại
  $scope.dataId = null;
  $scope.totalQuantity = 0;
  $scope.kmMa = "";
  $scope.totalAmount = 0;
  $scope.totalAmountAfterDiscount = 0;
  $scope.valueVoucher = 0;
  $scope.KM = null;
  $rootScope.countProduct = 0;
  $scope.isCustomerLoggedIn = false;
  $scope.isEmployeeLoggedIn = false;
  
  $scope.images = []; // Danh sách ảnh nhỏ
  $scope.mainImage = ''; // Ảnh lớn chính
  $scope.selectedSizes = [];
  $scope.selectedColors = [];
  $scope.selectedMaterials = [];
  $scope.selectedCategories = [];
  // $rootScope.products = [];
  $scope.dataFill = null;
  $scope.selectedSortType = '0';




  // $scope.sendToken = function() {
  //   var token = $cookies.get('token');
  //   console.log(token);
  
  //   var data = {
  //     token: token
  //   };
  
  //   $http.post('http://localhost:8080/transfer-token', data)
  //     .then(function(response) {
  //       console.log('Token sent successfully');
  //     })
  //     .catch(function(error) {
  //       console.error('Error sending token:', error);
  //     });
  // };
  
  // $scope.sendToken();

  
  $scope.goToOfView = function() {
    window.location.href = '/ofView/index.html#!/homeTest/123'; // Đổi URL tương ứng
  };


  reloadHomeDataFill();

// $scope.redirectToAdmin = function() {
//       console.log("Sssss")

//     var token = localStorage.getItem('token');
//     if (token) {
//       console.log("Sssss")
//         window.location.href = 'http://localhost:8080/admin/index'; // Chuyển hướng đến trang admin
//     } else {
//         // Redirect user to login or handle no token scenario
//     }
// };


// $scope.callAdminEndpoint = function() {
//     $http.get('http://localhost:8080/api/admin') // Sử dụng 'text' làm kiểu dữ liệu trả về
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




// Kiểm tra người trả tiền
  $scope.checkThePayper = function() {
    $http.get('http://localhost:8080/api/ol/bill/checkThePayper')
      .then(function(response) {
        console.log(response.data); // Log data from the response
       if(response.data){
        $scope.cart.clear();
        $http.put('http://localhost:8080/api/ol/bill/updateCheckoutStatus')
        .then(function(updateResponse) {
          console.log('checkOutBill set to false');
        })
        .catch(function(updateError) {
          console.error('Error updating checkOutBill:', updateError);
        });
       }
      })
      .catch(function(error) {
        console.error('Error:', error); // Log any errors
      });
  };
  
  function reloadHomeDataFill() {
    $http.get('http://localhost:8080/api/ol/products/dataFill')
        .then(function (response) {
          if (response.data) {
              $scope.dataFill = response.data;

          }
        });
  }

  
  $scope.initialize = function () {
    var params = $location.search();

    if (params.categories && params.categories.length > 0) {
        $scope.selectedCategories = JSON.parse(params.categories);
    }

    // $scope.currentPage = params.page || 0;
    // $scope.loadPage();

};


$scope.showLoadMoreProduct = false; 
$scope.productsFull = null;
  $scope.loadPage = function () {

    var selectedSortType = $scope.selectedSortType;

    var categoryId = $routeParams.categoryId;
    if (categoryId) {
      $scope.selectedCategories = [categoryId];
    }
    var params = {
      // page: $scope.currentPage,
    sizes: $scope.selectedSizes, 
    colors: $scope.selectedColors, 
    categories: $scope.selectedCategories, 
    materials: $scope.selectedMaterials,
    sortType: selectedSortType
    };

    // Gọi API backend với các tham số tương ứng
    $http.get('http://localhost:8080/api/ol/products', { params: params }).then(function(response) {
      $scope.products = response.data.slice(0, 16); 
      $scope.productsFull = response.data; 
                if (response.data.length > 16) {
                    $scope.showLoadMoreProduct = true;
                } else {
                    $scope.showLoadMoreProduct = false; 
                }
    }, function(error) {
      console.error('Error fetching products:', error);
    });
  };


  $scope.loadFullProduct = function () {
    $scope.products = $scope.productsFull;
    $scope.showLoadMoreProduct = false; 

  }

  $scope.initialize();


  $scope.updateSelectedSizes = (selectedSize) => {
    selectedSize.isSelected = !selectedSize.isSelected;
    if (!selectedSize.isSelected) {
        // Nếu người dùng bỏ chọn, xóa kích cỡ khỏi danh sách selectedSizes
        const index = $scope.selectedSizes.indexOf(selectedSize.id);
        if (index !== -1) {
            $scope.selectedSizes.splice(index, 1);
        }
    } else {
        // Nếu người dùng chọn, thêm kích cỡ vào danh sách selectedSizes
        $scope.selectedSizes.push(selectedSize.id);
    }
    // localStorage.setItem('selectedSizes', JSON.stringify($scope.selectedSizes));
    $scope.loadPage();
};


$scope.updateSelectedColors = (selectedColor) => {
  selectedColor.isSelected = !selectedColor.isSelected; 
  $scope.selectedColors = $scope.dataFill.colorList
    .filter((color) => color.isSelected)
    .map((selectedColor) => selectedColor.id);
  // localStorage.setItem('selectedColors', JSON.stringify($scope.selectedColors));
  $scope.loadPage();
};
$scope.updateSelectedMaterials = (selectedMaterial) => {
  selectedMaterial.isSelected = !selectedMaterial.isSelected;
  $scope.selectedMaterials = $scope.dataFill.materialList
      .filter((material) => material.isSelected)
      .map((selectedMaterial) => selectedMaterial.id);
  // localStorage.setItem('selectedMaterials', JSON.stringify($scope.selectedMaterials));
  $scope.loadPage();
};




$scope.updateSelectedCategories = function(selectedCategories) {
  $scope.selectedCategories = [];
  $scope.selectedCategories.push(selectedCategories.id) ;
  $scope.loadPage($scope.currentPage);
};

  //Data fill

  // select color and size
  $scope.selectColor = function(colorId) {
    $scope.selectedColor = colorId;
  $scope.checkSelectd();

  $scope.getImagesByColorAndProduct(colorId);

}


$scope.selectSize = function(sizeId) {
  $scope.selectedSize = sizeId;
  $scope.checkSelectd();
}

$scope.checkSelectd = function(){
  if ($scope.selectedColor !== undefined && $scope.selectedSize !== undefined) {
    $scope.getProductDetail();
  }
}
$scope.productDetailInfo = null;
$scope.getProductInfo = function(productId) {
    if (productId) {
      $http.get('http://localhost:8080/api/ol/products/colorAndSize/' + productId)
        .then(function(response) {
          $scope.productDetailInfo = response.data;
        console.log($scope.productDetailInfo)
          // Kiểm tra xem selectedColor đã được chọn hay chưa
          if (!$scope.selectedColor && $scope.productDetailInfo.listOfColor.length > 0) {
            $scope.selectedColor = $scope.productDetailInfo.listOfColor[0].id; // Chọn màu đầu tiên
            $scope.checkSelectd(); // Gọi hàm kiểm tra
          }
        }, function(error) {
          console.error('Error fetching product detail:', error);
        });
    } 
  };
$scope.getProductInfo($routeParams.id);

$scope.getProductDetail = function() {
    $http.get('http://localhost:8080/api/ol/products/detail', {
        params: {
            coloId: $scope.selectedColor,
            sizeId: $scope.selectedSize,
            productId: $scope.productDetailInfo.olViewProductDetailRespone.id 
        }
    }).then(function(response) {
        if (response.data) {
            $scope.productDetail = response.data;
            $scope.quantity = $scope.productDetail.quantity;

            $scope.getImagesByColorAndProduct($scope.productDetailInfo.listOfColor[0].id);
        } else {
            $scope.quantity = 0;
        }
    }).catch(function(error) {
        console.error('Error fetching product detail:', error);
    });
}
  
  // select color and size

//Get image Color and Product


$scope.getImagesByColorAndProduct = function() {
  $http.get('http://localhost:8080/api/ol/products/images', {
    params: {
      coloId: $scope.selectedColor,
      productId: $scope.productDetailInfo.olViewProductDetailRespone.id 
    }
  }).then(function(response) {
    if (response.data) {
      $scope.images = response.data;
      if ($scope.images.length > 0) {
        $scope.mainImage = $scope.images[0].path; // Hiển thị ảnh đầu tiên khi load
      }
    } 
  }).catch(function(error) {
    console.error('Error fetching product detail:', error);
  });
}

$scope.setMainImage = function(path) {
  $scope.mainImage = path; // Đặt ảnh chính khi nhấp vào ảnh nhỏ
}



//Get image Color and Product


$scope.userData = null;
// $scope.isCustomerLoggedIn = false;
// $scope.isEmployeeLoggedIn = false;
$scope.isAdmin = false;
$scope.username = null;

// Check if the user is logged in
async function isUserLoggedIn() {
  const token = localStorage.getItem('token');

  if (!token) {
    $scope.isAdmin = false;
    return false;
  }

  const decodedToken = jwtHelper.decodeToken(token);
  $scope.username = decodedToken.sub;
  $scope.exp = decodedToken.exp;
  $scope.isAdmin = decodedToken.role && decodedToken.role.length > 0 &&
    (decodedToken.role[0].authority === 'ADMIN' || decodedToken.role[0].authority === 'STAFF');

  try {
    const response = await $http.get('http://localhost:8080/api/ol/user?username=' + $scope.username);
    if (response.status === 200 && response.data) {
      $scope.role = response.data.account.role.fullName;
      $scope.userData = response.data;

      if ($scope.role === 'STAFF' || $scope.role === 'ADMIN') {
        $scope.isEmployeeLoggedIn = true;
      } else if ($scope.role === 'CUSTOMER') {
        $scope.isCustomerLoggedIn = true;
        $scope.cart.saveDataAndClearLocalStorage();
        loadCart();
      }
    }
  } catch (error) {
    console.error("Error checking user login status:", error);
  }

  return true;
}

// Check if the user is logged in
isUserLoggedIn().then(userLoggedIn => {
  console.log("User is logged in:", userLoggedIn);
});



//refresh tokrn
// function checkAndRefreshToken() {
//   // const accessToken = localStorage.getItem('token');
//   const expirationTime = $scope.exp;
//   const currentTime = new Date().getTime();

//   if (expirationTime && expirationTime < currentTime) {
//       const refreshToken = localStorage.getItem('refreshToken');
//       // Gọi API để làm mới token
//       AuthService.refreshToken(refreshToken)
//           .then(function(data) {
        

//               var token = data.accessToken;
//               localStorage.removeItem('token');
//               localStorage.setItem('token', token);
//           })
//           .catch(function(error) {
//               // Xử lý lỗi khi làm mới token không thành công
//               console.error('Error refreshing token:', error);
//           });
//   }
// }
// checkAndRefreshToken();
// setInterval(checkAndRefreshToken, 3 * 60 * 1000); 





// Giỏ hàng người dùng
function loadCart() {
  if($scope.username != null){
    $http.get('http://localhost:8080/api/ol/cartDetail?username=' + $scope.username)
      .then(function (response) {
        if (response.data) {
          $scope.cartItems = response.data;
        }
      })
      .catch(function (error) {
        console.error("Error loading cart:", error);
      });
    }

}

$scope.applyVoucher = function() {
  if ($scope.selectedVoucher != null) {
    if ($scope.selectedVoucher.quantity > 0) {
      if ($scope.totalAmount >= $scope.selectedVoucher.minimumTotalAmount) {
        var voucherCopy = angular.copy($scope.selectedVoucher);
        delete voucherCopy.selected;
        $scope.voucherData = voucherCopy;

        if ($scope.selectedVoucher.valueType === 1) {
          $scope.valueVoucher = $scope.selectedVoucher.value;
          $scope.totalAmountAfterDiscount = $scope.totalAmount - $scope.valueVoucher;

        } else if ($scope.selectedVoucher.valueType === 2) {
          var discountPercentage = $scope.selectedVoucher.value / 100;
          $scope.valueVoucher = $scope.totalAmount * discountPercentage;
          $scope.totalAmountAfterDiscount = $scope.totalAmount - $scope.valueVoucher;
        }

        $scope.voucherMessage = 'Mã giảm giá đã được áp dụng';
        $scope.showSuccessNotification($scope.voucherMessage);
      } else {
        $scope.voucherData = null;
        $scope.valueVoucher = 0;
        $scope.voucherMessage =
          'Mã giảm giá ' +
          $scope.selectedVoucher.code +
          ' chỉ sử dụng cho đơn hàng có tổng trị giá trên ' +
          $filter('number')($scope.selectedVoucher.minimumTotalAmount) +
          ' đ';
        $scope.showErrorNotification($scope.voucherMessage);

        if ($scope.totalAmount < $scope.selectedVoucher.minimumTotalAmount) {
          $scope.selectedVoucher.selected = false;
          $scope.selectedVoucher = null;
          $scope.totalAmountAfterDiscount = $scope.totalAmount; // Initialize totalAmountAfterDiscount

        }
      }
    }
  } else {
    // No voucher selected, reset to original total amount
    $scope.voucherData = null;
    $scope.voucherMessage = '';
    $scope.valueVoucher = 0;
    $scope.totalAmountAfterDiscount = $scope.totalAmount; 
    

  }
};

// Giỏ hàng người dùng
function loadLocal() {
  if ($scope.username == null) {
        $scope.cartItems = $scope.cart.items;
        console.log($scope.cartItems)
        count();
      } 

}



function countTotalPrice(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


  function count() {
    if (!$scope.isAdmin && $scope.cartItems) {
              // Lọc $scope.cartItem và tính tổng số lượng
              $rootScope.countProduct = $scope.cartItems.reduce((total, item) => total + item.quantity, 0);
              $scope.totalAmount = countTotalPrice($scope.cartItems);
              $scope.totalAmountAfterDiscount = $scope.totalAmount - $scope.valueVoucher;
          } else if ($scope.isEmployeeLoggedIn) {
            $rootScope.countProduct = 0;
          } else {
            if  ($scope.cart.items == null){
              $scope.cart.items = [];
            }
              $rootScope.countProduct = $scope.cart.items.reduce((total, item) => total + item.quantity, 0);
              $scope.totalAmount = countTotalPrice($scope.cart.items);
              $scope.totalAmountAfterDiscount = $scope.totalAmount - $scope.valueVoucher;
          }

          if ($scope.cartItems != '') {
          $scope.applyVoucher();
            
          }

    }
   


    
    // Watch for changes in cart.items and update countProduct
    $scope.$watchCollection('cart.items', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            count();
        }
    });
    $scope.$watch('cartItems', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            count();
        }
    });
    
    // Watch for changes in cart.items and update countProduct


  $scope.cart = {
    items: [],
    add(productDetailId, quantity) {
          if ($scope.username != null) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/add', { productDetailId: productDetailId , quantity: quantity ,username :$scope.username })
                  .then(function (response) {
                    if (response.data.employeeLoggedIn === true) {
                      // $scope.isEmployeeLoggedIn = true;
                      $scope.showErrorNotification("Nhân viên không thể mua hàng!");
                     } else if (response.data === 1) {
                        $scope.showSuccessNotification("Thêm vào giỏ thành công!");
                        loadCart();
                      }
                      else if (response.data === 2)  {
                        $scope.showErrorNotification("Sản phẩm không có đủ số lượng trong kho!");
                
                      }else {
                        $scope.showErrorNotification("Thêm vào giỏ thất bại!");
                      }
                  })
                  .catch(function (error) {
                    $scope.showWarningNotification("Có lỗi xảy ra!");
                      console.error(error);
                  });
             
          } else {

              // Thực hiện hành động khi chưa đăng nhập
              var item = $scope.cart.items.find(item => item.id == productDetailId);

        if (item) {
    $http.get('http://localhost:8080/api/ol/productDetail/quantity/' + item.id)
        .then(quantityResp => {
            var availableQuantity = quantityResp.data;
            if (availableQuantity !== null && typeof availableQuantity === 'number') {
                var totalQuantity = item.quantity + $scope.quantitySelected;
                if (totalQuantity <= availableQuantity) {
                    item.quantity = totalQuantity;
                    $scope.cart.saveToLocalStorage();
                    count();
                    $scope.showSuccessNotification("Thêm vào giỏ thành công!");
                    loadLocal();
                } else {
                    $scope.showErrorNotification("Số lượng vượt quá số lượng hiện có!");
                }
            } else {
                $scope.showErrorNotification("Không thể lấy số lượng sản phẩm!");
            }
        })
        .catch(error => {
            console.error('Error fetching product quantity:', error);
            // Handle error if the product quantity couldn't be fetched
        });
      } else {
                  $http.get('http://localhost:8080/api/ol/products/detail/' + productDetailId)
                      .then(resp => {
                          if (typeof resp.data === 'object') {
                              let newItem = resp.data;
                              if (newItem.quantity > 0) {
                                  if ($scope.quantitySelected <= newItem.quantity) {
                                      newItem.quantity = $scope.quantitySelected;
                                      $scope.cart.items.push(newItem);
                                      $scope.cart.saveToLocalStorage();
                                      count();
                                      $scope.showSuccessNotification("Thêm vào giỏ thành công!");
                                      loadLocal();
                                  } else {
                                      $scope.showErrorNotification("Sản phẩm không có đủ số lượng trong kho!");
                                  }
                              } else {
                                  $scope.showErrorNotification("Sản phẩm không có sẵn trong kho!");
                              }
                          } else {
                              console.error('Error fetching product details:', resp.data);
                          }
                      })
                      .catch(error => {
                          console.error('Error fetching product details:', error);
                          // Handle error if the product details couldn't be fetched
                      });
              }
              

              loadLocal();


          }
          // count();
          // $scope.applyVoucher();

  },
    update(cartDetailId, quantity) {
      if ($scope.username != null) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/update', { cartDetailId: cartDetailId, quantity: quantity ,username :$scope.username })
                  .then(function (response) {

                    if (response.data === 1)  {
                      $scope.showSuccessNotification("Cập nhật giỏ thành công!");
                    } else if (response.data === 2)  {
                      $scope.showErrorNotification("Sản phẩm không có đủ số lượng trong kho!");
                    }else {
                      $scope.showErrorNotification("Cập nhật giỏ thất bại!");
                    }
                      if (response.data) {
                        loadCart();
                      // count();
                      } 
                  })
                  .catch(function (error) {
                    $scope.showWarningNotification("Có lỗi xảy ra!");
                      console.error(error);
                  });
          } else {
            var item = $scope.cart.items.find(item => item.id == cartDetailId);

            if (item) {
                $http.get('http://localhost:8080/api/ol/productDetail/quantity/' + item.id)
                    .then(quantityResp => {
                        var availableQuantity = quantityResp.data;
                        if (availableQuantity !== null && typeof availableQuantity === 'number') {
                            if (quantity <= availableQuantity) {
                                item.quantity = quantity;
                                $scope.cart.saveToLocalStorage();
                                // count();
                                loadLocal();
                                $scope.showSuccessNotification("Cập nhật giỏ hàng thành công!");
                            } else {
                              item.quantity = availableQuantity;
                              $scope.cart.saveToLocalStorage();
                              // count();
                              loadLocal();
                                $scope.showErrorNotification("Số lượng vượt quá số lượng hiện có!");
                            }
                        } else {
                            $scope.showErrorNotification("Không thể lấy số lượng sản phẩm!");
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching product quantity:', error);
                        // Handle error if the product quantity couldn't be fetched
                    });
            } else {
                // Rest of your existing logic for updating item in cart...
            }
            
              loadLocal();
          }
          // count();
          // $scope.applyVoucher();
              // $scope.applyVoucher();


  },
    remove(id) {
      if ($scope.username != null) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/remove', { cartDetailId: id })
                  .then(function (response) {
                    loadCart();
                            count();
                    $scope.showSuccessNotification("Xóa sản phẩm thành công!");
                  })
                  .catch(function (error) {
                    $scope.showWarningNotification("Có lỗi xảy ra!");
                      console.error(error);
                  });

          } else {
              // Thực hiện hành động khi chưa đăng nhập
              var index = $scope.cart.items.findIndex(item => item.id == id);
              if (index !== -1) {
                  $scope.cart.items.splice(index, 1);
                  $scope.cart.saveToLocalStorage();
              // count();
              loadLocal();

              }

          }
          // $scope.applyVoucher();

          // count();


  
  },
  clear() {
    if ($scope.username != null) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/clear?username=' + $scope.username)
                  .then(function (response) {
                    loadCart();
                            // count();
                    $scope.showSuccessNotification("Xóa tất cả sản phẩm khỏi giỏ hàng thành công!");
                  })
                  .catch(function (error) {
                    $scope.showWarningNotification("Có lỗi xảy ra!");
                      console.error(error);
                  });
          } else {
              // Thực hiện hành động khi chưa đăng nhập
              $scope.cart.items = [];
              $scope.cart.saveToLocalStorage();
              // count();
              loadLocal();

          }
          // count();
          // $scope.applyVoucher();
  },

        // Tính thành tiền các mặt hàng trong giỏ
        amt_of(){},

      saveDataAndClearLocalStorage() {
        // Kiểm tra xem local storage có dữ liệu hay không
        var localStorageData = JSON.parse(localStorage.getItem("cart"));
        if (localStorageData && Array.isArray(localStorageData) && localStorageData.length > 0 && localStorageData != []) {
                    $http.post('http://localhost:8080/api/ol/cart/saveAll', {localStorageData,username :$scope.username})
                        .then(function (response) {
                            if (response.data) {
                                console.log("Sản phẩm đã được lưu vào server.");
                                localStorage.removeItem("cart");
                                localStorageData = [];
                                $scope.cartItems = [];
                                $scope.cart.items = [];
                                // Lưu thay đổi vào localStorage
                                $scope.cart.saveToLocalStorage();
                                loadCart();
                            } else {
                                console.log("Không thể lưu sản phẩm lên server.");
                            }
                        })
                        .catch(function (error) {
                            console.error("Lỗi khi thực hiện API:", error);
                        });
        }
    },
    
    

      

        saveToLocalStorage(){
        var json = JSON.stringify(angular.copy(this.items));
        localStorage.setItem("cart",json)
        },
        loadFromLocalStorage(){
            var json = localStorage.getItem("cart");
            this.items = json ? JSON.parse(json) : [];
         }

    };


    
        
    $scope.cart.loadFromLocalStorage();


    loadLocal();

    
    $scope.selectedPayment = null; // Khởi tạo giá trị ban đầu
    $scope.selectedPaymentName = null; // Khởi tạo giá trị ban đầu
    
    $scope.selectPaymentMethod = function(paymentMethod) {
        $scope.selectedPayment = paymentMethod; 
        $scope.selectedPaymentName = paymentMethod.name
        console.log($scope.selectedPaymentName)
    };
    
    function getProductDetailId(item, isCustomerLoggedIn) {
      if (isCustomerLoggedIn) {
        return item.productDetail.id; 
      } else {
        return item.id;
      }
    }

    $scope.isPaymentClicked = false;
    $scope.checkPhoneNumber= true;
        $scope.address = "";
        // paymentMethod voucher
        $scope.bill = {
          code: 'HD' + Number(String(new Date().getTime()).slice(-6)),
          createdAt: new Date(),
          paymentDate: new Date(),
          totalAmount: 0,
          totalAmountAfterDiscount: 0,
          reciverName: "",
          deliveryDate: new Date(),
          shippingFee: 0,
          address: "",
          phoneNumber: "",
          note: "",
          typeBill: 2,
          status: 10,
          // paymentStatus: 0,
          paymentMethod: "",
          voucher: "",
          customerEntity: "",
        
          get billDetail(){
         if ($scope.cartItems && $scope.cartItems.length > 0) {
          const isCustomerLoggedIn = $scope.isCustomerLoggedIn;
          return $scope.cartItems.map(item => {
              return {
                  productDetail: { id: getProductDetailId(item, isCustomerLoggedIn) },
                  price: item.price,
                  quantity: item.quantity,
                  status: 1
              };
          });
      } else {
          return []; 
      }
  },
          purchase() {
           
   
          // Kiểm tra các trường thông tin bắt buộc
    let isBillReciverInvalid = !$scope.bill.reciverName || $scope.bill.reciverName.trim().length === 0;
    let isBillAddressDetailInvalid = !$scope.billAddressDetail || $scope.billAddressDetail.trim().length === 0;
    let isBillAddressCityInvalid = !$scope.billAddressCity || $scope.billAddressCity.trim().length === 0;
    let isBillAddressDistrictInvalid = !$scope.billAddressDistrict || $scope.billAddressDistrict.trim().length === 0;
    let isBillAddressWardInvalid = !$scope.billAddressWard || $scope.billAddressWard.trim().length === 0;
  
    let isBillPhoneNumberInvalid = !isValidPhoneNumber($scope.bill.phoneNumber);
    
    let isBillPaymentInvalid = $scope.selectedPayment == null;



    // Thêm kiểm tra cho các trường khác nếu cần
  
    // Hiển thị thông báo lỗi dưới các trường thông tin
    $scope.isBillReciverInvalid = isBillReciverInvalid;
    $scope.isBillAddressDetailInvalid = isBillAddressDetailInvalid;
    $scope.isBillAddressCityInvalid = isBillAddressCityInvalid;
    $scope.isBillAddressDistrictInvalid = isBillAddressDistrictInvalid;
    $scope.isBillAddressWardInvalid = isBillAddressWardInvalid;
    $scope.isBillPhoneNumberInvalid = isBillPhoneNumberInvalid;
    $scope.isBillPaymentInvalid = isBillPaymentInvalid;
    // Hiển thị thông báo lỗi cho các trường khác nếu cần
  
    // Tiếp tục chỉ khi không có lỗi
    if (isBillReciverInvalid || isBillAddressDetailInvalid || isBillAddressCityInvalid || isBillAddressDistrictInvalid || isBillAddressWardInvalid || isBillPhoneNumberInvalid || isBillPaymentInvalid) {
      $scope.showErrorNotification("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

            var fullAddress =
      $scope.billAddressDetail +
      ', ' +
      $scope.billAddressWard +
      ', ' +
      $scope.billAddressDistrict +
      ', ' +
      $scope.billAddressCity;

            // Nếu thông tin đã đầy đủ, tiến hành gửi dữ liệu lên server
            var bill = angular.copy(this);
            bill.totalAmount = $scope.totalAmount;
            bill.totalAmountAfterDiscount = $scope.totalAmountAfterDiscount;
            bill.address = fullAddress;
            bill.paymentMethod = $scope.selectedPayment;
            bill.voucher = $scope.voucherData;
            bill.customerEntity = $scope.userData;
            // Tiến hành gửi dữ liệu lên server
            $http.post("http://localhost:8080/api/ol/bill/create", bill)
              .then(resp => {
               // Xử lý phản hồi từ server
                  let body = resp.data;
                  if (body != null && body.hasOwnProperty("redirect") ) {
                      window.location.href = body.redirect; 
                  } else if (typeof body === 'number') {
                      // Nếu phản hồi là một số nguyên
                      if (body === 2) {
                       $scope.showErrorNotification("Sản phẩm không có đủ số lượng trong kho!")
                      } else if (body === 3) {
                        $scope.showErrorNotification("Mã giảm giá không có đủ số lượng trong kho!")
                          // Xử lý logic tương ứng
                      } else {
                        $scope.showWarningNotification("Có lỗi xảy ra!");

                      }
                  } else {
                    $scope.showWarningNotification("Có lỗi xảy ra!");

                  }
              })
              .catch(error => {
                $scope.showErrorNotification("Đặt hàng thất bại");
                console.log(error);
              });
       
        }
          
      }
    
// Customer


// Controller code
$scope.selectedVoucher = null;
// $scope.originalTotalAmount = $scope.totalAmount; // Store the original total amount

$scope.selectVoucher = function(selectedVoucher) {
  if (selectedVoucher.quantity > 0) {
    if ($scope.selectedVoucher === selectedVoucher) {
      // Deselect the voucher and reset totalAmountAfterDiscount
      $scope.selectedVoucher = null;
      selectedVoucher.selected = false;
      $scope.totalAmountAfterDiscount = $scope.totalAmount;
      $scope.applyVoucher();
    } else {
      $scope.selectedVoucher = selectedVoucher;
      angular.forEach($scope.listVouchers, function(voucher) {
        voucher.selected = false;
      });
      selectedVoucher.selected = true;
      $scope.applyVoucher();
    }
  }
};

$scope.valueVoucher = 0;
$scope.voucherMessage = '';
$scope.voucherData = null;
// $scope.totalAmountAfterDiscount = $scope.totalAmo  unt; 





$scope.back = function() {
  // Thực hiện khi Trở lại được nhấn, ví dụ như đóng modal
  $('#voucherModal').modal('hide'); // Đóng modal
};



  $scope.reloadHomeDataVouchers = function() {
    $http.get('http://localhost:8080/api/ol/vouchers')
      .then(function(response) {
        if (response.data) {
          $scope.listVouchers = response.data;
        }
      })
      .catch(function(error) {
        alert("Có lỗi xảy ra khi gọi API!");
        console.error(error);
      });
  };
  
  $scope.reloadHomeDataVouchers();

  // $scope.searchCode = null; // Biến lưu trữ mã code tìm kiếm

  // Hàm tìm kiếm voucher bằng mã code
  // $scope.searchByCode = function() {
  //     if($scope.searchByCode != null){
  //       console.log($scope.searchCode)
  //       $http.get('http://localhost:8080/api/ol/vouchers/' + $scope.searchCode)
  //         .then(function(response) {
  //             // Xử lý khi có kết quả trả về từ server
  //             $scope.listVouchers = null;

  //             $scope.listVouchers = response.data;
  //         })
  //         .catch(function(error) {
  //             // Xử lý khi có lỗi xảy ra
  //             console.error('Error:', error);
  //             // Đặt foundVoucher về null nếu không tìm thấy
  //             $scope.reloadHomeDataVouchers();
  //         });
  //     }
  // };

  //PayMentMethod
  $scope.reloadPaymentMethod = function() {
    $http.get('http://localhost:8080/api/ol/paymentMethods')
      .then(function(response) {
        if (response.data) {
          $scope.listPaymentMethods = response.data;
        }
      })
      .catch(function(error) {
        alert("Có lỗi xảy ra khi gọi API!");
        console.error(error);
      });
  };
  
  // $scope.reloadPaymentMethod();


  //Validate

  //quantity select
$scope.quantitySelected = 1; // Số lượng mặc định

$scope.checkQuantityChange2 = function(quantity) {
  if (isNaN(quantity) || quantity < 1 || !Number.isInteger(quantity)) {
      $scope.quantitySelected = 1; // Set lại giá trị là 1 nếu không hợp lệ
  }
};

  $scope.checkQuantityChange = function(item) {
    if (isNaN(item.quantity) || item.quantity < 1 || !Number.isInteger(item.quantity)) {
      item.quantity = 1; // Set lại giá trị là 1 nếu không hợp lệ
    }
  };



  $scope.hasProductsInBill = function() {
    return $scope.bill && $scope.bill.billDetail && $scope.bill.billDetail.length > 0;
  };
  
  $scope.errorFields = {
    reciverName: false,
    phoneNumber: false,
    address: false,
    // Thêm các trường khác cần kiểm tra
  };

  
  
  $scope.openVoucherModal = function() {
    $('#voucherModal').modal('show');
  };

  // Chọn address

  $scope.openAddress = function() {
    $('#addressModal').modal('show');
  };
  $scope.closeAddress = function() {
    $('#addressModal').modal('hide');
  };



  // JS Search home
  $scope.overlayActive = false;
  $scope.productSearch = [];
  $scope.limit = 4;
  $scope.showLoadMore = false; // Ban đầu không hiển thị nút xem thêm
  
  $scope.searchText = ''; 

// Độ dài của danh sách kết quả tìm kiếm


  $scope.searchProducts = function() {
    $location.search('searchText', $scope.searchText);

    if ($scope.searchText !== '') {
        $http.get('http://localhost:8080/api/ol/products/search', { params: { keyword: $scope.searchText, limit: 4 } })
            .then(function(response) {
                $scope.productSearch = response.data.slice(0, 4); 
                if (response.data.length > 4) {
                    $scope.showLoadMore = true;
                } else {
                    $scope.showLoadMore = false; 
                }
            })
            .catch(function(error) {
                console.error('Error fetching products:', error);
            });
    }else{
      $scope.productSearch = [];
      $scope.showLoadMore = false; 


    }
};

$scope.loadMore = function() {

  $http.get('http://localhost:8080/api/ol/products/search', { params: { keyword: $scope.searchText} })
      .then(function(response) {
          $scope.productSearch = (response.data); 
$scope.searchResultsLength = $scope.productSearch.length;
          
      })
      .catch(function(error) {
          console.error('Error fetching more products:', error);
      });

};
$scope.checkSearch = function() {
  var urlParams = $location.search();
  if (urlParams && urlParams.searchText) {
    $scope.searchText = urlParams.searchText;
    $scope.loadMore();
  } else {
    $scope.searchText = ''; 
  }
}

$scope.checkSearch();
  


  
  $scope.toggleOverlay = function() {
      $scope.overlayActive = !$scope.overlayActive;
  };

  $scope.openOverlay = function() {
      $scope.overlayActive = true;
  };

  //Load product hot Home
  $scope.loadProductsBySortType = function(sortType) {
    var params = {
      sortType: sortType
    };
  
    $http.get('http://localhost:8080/api/ol/productsType', { params: params })
      .then(function(response) {
        if (response.data) {
          if (sortType === 0) {
            $scope.productDate = response.data.slice(0, 12);
          } else if (sortType === 1) {
            $scope.productSell = response.data.slice(0, 12);
          }
          $scope.productsSortType = response.data;
        }
      })
      .catch(function(error) {
        console.error('Error fetching products:', error);
      });
  };
    $scope.loadProductsBySortType(0);
    $scope.loadProductsBySortType(1);
  $scope.loadAllProductsBySortType = function(sortType) {
    var params = {
      sortType: sortType
    };
  
    $http.get('http://localhost:8080/api/ol/productsType', { params: params })
      .then(function(response) {
        if (response.data) {
          $scope.productsSortType = response.data;
        }
      })
      .catch(function(error) {
        console.error('Error fetching all products:', error);
      });
  };
  
  $scope.checkSortType = function() {
    var urlParams = $location.search();
    if (urlParams && urlParams.sortType) {
      $scope.sortType = urlParams.sortType;
      if ($scope.sortType == 0 || $scope.sortType == 1) {
        $scope.loadProductsBySortType($scope.sortType);
      } else {
        $scope.loadAllProductsBySortType($scope.sortType);
      }
    } else {
      $scope.sortType = '';
    }
  };
  
  $scope.checkSortType();


  //Các sản phẩm cùng thể loại ở chi tiết sản phẩm
  $scope.loadProductsByCategory = function() {
    var params = {
      productId: $routeParams.id
    };
    $http.get('http://localhost:8080/api/ol/products/category', { params: params })
      .then(function(response) {
        if (response.data) {
            $scope.productCate = response.data.slice(0, 6);
        }
      })
      .catch(function(error) {
        console.error('Error fetching products:', error);
      });
  };
  // console.log($scope.productDetailInfo.olViewProductDetailRespone.nameCategory )
  $scope.loadProductsByCategory();

  //Js Address


//   const host = "https://provinces.open-api.vn/api/";

//   const renderData = (array, select) => {
//     const element = document.querySelector("#" + select);
//     if (element) {
//         let row = '<option disable value="">Chọn</option>';
//         array.forEach(element => {
//             row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
//         });
//         element.innerHTML = row;
//     }
// }

  
//   const callAPI = (api, callback) => {
//       return axios.get(api)
//           .then((response) => {
//               callback(response.data);
//           })
//           .catch((error) => {
//               console.error("Error fetching data:", error);
//           });
//   }
  
//   const callApiDistrict = (api, dropdownId) => {
//       callAPI(api, (data) => {
//           renderData(data.districts, dropdownId);
//       });
//   }
  
//   const callApiWard = (api, dropdownId) => {
//       callAPI(api, (data) => {
//           renderData(data.wards, dropdownId);
//       });
//   }
  
//   const printResult = () => {
//     let houseNumber1 = $("#houseNumber1").val();
//     let city1 = $("#city1 option:selected").text();
//     let district1 = $("#district1 option:selected").text();
//     let ward1 = $("#ward1 option:selected").text();

//     let result1 = houseNumber1 && district1 && city1 && ward1 ? `${houseNumber1}, ${ward1}, ${district1}, ${city1}` : '';
//     $scope.address = result1;


//     $("#resultInput1").val(result1);
// }
  
//   // Load city data for the first set of elements
//   callAPI(host + '?depth=1', (data) => {
//       renderData(data, "city1");
//   });
  
//   // Load city data for the second set of elements
//   callAPI(host + '?depth=1', (data) => {
//       renderData(data, "city2");
//   });
  
//   // Event listeners and initial call
//   $("#city1, #city2, #district1, #district2, #ward1, #ward2, #houseNumber1, #houseNumber2").on('change input', function () {
//       const id = $(this).attr("id");
  
//       if (id.startsWith("city")) {
//           const districtId = id.replace("city", "district");
//           const selectedCityId = $(this).find(':selected').data('id');
//           $("#" + districtId).empty().html('<option value="" selected>Chọn quận huyện</option>');
  
//           if (selectedCityId) {
//               callApiDistrict(host + "p/" + selectedCityId + "?depth=2", districtId);
//           }
//       } else if (id.startsWith("district")) {
//           const wardId = id.replace("district", "ward");
//           const selectedDistrictId = $(this).find(':selected').data('id');
//           $("#" + wardId).empty().html('<option value="" selected>Chọn phường xã</option>');
  
//           if (selectedDistrictId) {
//               callApiWard(host + "d/" + selectedDistrictId + "?depth=2", wardId);
//           }
//       }
  
//       printResult();
//   });
  
//   // Initial call when the page loads
//   printResult();
  

//Js Home Slide 
let slideIndex = 0;
let slideInterval;

$scope.showSlide = function(index) {
  const slides = document.querySelectorAll('.carousel-item');
  if (slides.length > 0) {
    if (index >= slides.length) { slideIndex = 0; }
    if (index < 0) { slideIndex = slides.length - 1; }
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    slides[slideIndex].classList.add('active');
  }
}


$scope.prevSlide = function() {
  slideIndex--;
  $scope.showSlide(slideIndex);
}

$scope.nextSlide = function() {
  slideIndex++;
  $scope.showSlide(slideIndex);
}

function startSlideShow() {
  slideInterval = setInterval(() => {
    $scope.nextSlide();
  }, 20000); // Chuyển slide sau mỗi 10 giây (10000 milliseconds)
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

startSlideShow();


  // notify

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

// Hàm hiển thị thông báo thành công
$scope.showSuccessNotification = function(message) {
toastr["success"](message);
};

// Hàm hiển thị thông báo lỗi
$scope.showErrorNotification = function(message) {
  toastr["error"](message);
};


$scope.showWarningNotification = function(message) {
  toastr["warning"](message);
};

// $scope.showSuccessNotification("Thêm vào giỏ thành công!");

// $scope.showErrorNotification("Thêm vào giỏ thất bại!");

// $scope.showWarningNotification("Có lỗi xảy ra!");



  // Account Manage


$scope.updateAccount = function(userData) {
  // Khởi tạo flags để theo dõi trạng thái lỗi của từng trường
  let isFullNameInvalid = false;
  let isEmailInvalid = false;
  let isPhoneNumberInvalid = false;
  let isGenderInvalid = false;

  // Kiểm tra các trường thông tin bắt buộc
  if (!userData || !userData.fullName || userData.fullName.trim().length === 0) {
    isFullNameInvalid = true;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.account || !userData.account.email || !emailPattern.test(userData.account.email)) {
    isEmailInvalid = true;
  }

  // Kiểm tra số điện thoại
  isPhoneNumberInvalid = !isValidPhoneNumber(userData.account.phoneNumber);

  if (userData.gender === undefined) {
    isGenderInvalid = true;
  }

  // Hiển thị thông báo lỗi dưới các trường thông tin
  $scope.isFullNameInvalid = isFullNameInvalid;
  $scope.isEmailInvalid = isEmailInvalid;
  $scope.isPhoneNumberInvalid = isPhoneNumberInvalid;
  $scope.isGenderInvalid = isGenderInvalid;

  // Tiếp tục chỉ khi không có lỗi
  if (isFullNameInvalid || isEmailInvalid || isPhoneNumberInvalid || isGenderInvalid) {
    return;
  }

  // Gọi API cập nhật thông tin
  $http.post('http://localhost:8080/api/ol/authenticated/updateUser', userData)
    .then(function(response) {
      $scope.showSuccessNotification("Cập nhật thông tin thành công");
    })
    .catch(function(error) {
      $scope.showErrorNotification("Cập nhật thông tin thất bại");
    });
};

function isValidPhoneNumber(phoneNumber) {
  // Regular expression cho số điện thoại di động và cố định Việt Nam
  const regexMobile = /(09|03|07|08|05)+([0-9]{8})\b/;
  const regexLandline = /(02|024|028)+([0-9]{7})\b/;

  return regexMobile.test(phoneNumber) || regexLandline.test(phoneNumber);
}


$scope.passwordData = {
  newPassword: '',
  confirmNewPassword: ''
};

$scope.changePassword = function() {
  if($scope.username != null){
  const password = $scope.passwordData.newPassword;
  const confirmPassword = $scope.passwordData.confirmNewPassword;

  // Kiểm tra mật khẩu và xác nhận mật khẩu trùng khớp
  const passwordsMatch = password === confirmPassword;
  if (!passwordsMatch) {
      return;
  }

  // Kiểm tra tất cả các điều kiện khi mật khẩu trùng khớp và bấm cập nhật
  if ($scope.isPasswordValid()) {
    const data = {
      username: $scope.username,
      newPassword: $scope.passwordData.newPassword
  };

      $http.post('http://localhost:8080/api/ol/authenticated/resetPassword', data)
      .then(function(response) {
        $scope.showSuccessNotification("Mật khẩu đã được đổi thành công");
      })
      .catch(function(error) {
          // Xử lý khi có lỗi xảy ra
      $scope.showErrorNotification("Đổi mật khẩu thất bại");

          console.error('Không thể reset mật khẩu:', error.data);
      });
  } 
} 


};
$scope.isPasswordValid = function() {
  const password = $scope.passwordData.newPassword;

  // Kiểm tra password có tồn tại và có độ dài lớn hơn 10 không
  const isLengthValid = password && password.length > 10;

  // Kiểm tra mật khẩu có chứa ký tự hoa và số không
  const containsUpperCase = /[A-Z]/.test(password);
  const containsNumber = /\d/.test(password);

  return isLengthValid && containsUpperCase && containsNumber;
};

$scope.logout = function() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = 'http://127.0.0.1:5555/olView/index.html#!/home';
};

$scope.getAddressList = function() {
  if ($scope.username != null && !$scope.isAdmin) {
    $http.get('http://localhost:8080/api/ol/authenticated/address?username=' + $scope.username)
      .then(function successCallback(response) {
        $scope.addressList = response.data;
      }, function errorCallback(response) {
        // Xử lý khi gọi API không thành công
        console.error('Error while fetching data');
      });
  }
};

$scope.addressData = {};


$scope.fillDataToUpdate = function(selectedAddress) {
  $scope.addressData = angular.copy(selectedAddress);
  var addressComponents = $scope.addressData.address.split(',');

  if (addressComponents.length >= 4) {
    $scope.addressDatacity = addressComponents[3].trim();
    $scope.addressDatadistrict = addressComponents[2].trim();
    $scope.addressDataward = addressComponents[1].trim();
    $scope.addressDataaddressDetail = addressComponents[0].trim();
  }

};

$scope.fillDataToBill  = function(address) {
if (address != '') {
console.log(address)

  $scope.defaultAddress = address;
  // Gán dữ liệu từ địa chỉ mặc định vào hóa đơn
  $scope.bill.reciverName = $scope.defaultAddress.name;
  $scope.bill.phoneNumber = $scope.defaultAddress.phoneNumber;

  // Xử lý dữ liệu địa chỉ
  var addressComponents = $scope.defaultAddress.address.split(',');

  if (addressComponents.length >= 4) {
      $scope.billAddressCity = addressComponents[3].trim();
      $scope.billAddressDistrict = addressComponents[2].trim();
      $scope.billAddressWard = addressComponents[1].trim();
      $scope.billAddressDetail = addressComponents[0].trim();
  }
}
 

};

$scope.getDefaultAddress  = function() {


if ($scope.username != null && !$scope.isAdmin) {

  $http.get('http://localhost:8080/api/ol/authenticated/addressDefault?username=' + $scope.username)
  .then(function(response) {
   $scope.fillDataToBill(response.data);
console.log(response.data)
  })
  .catch(function(error) {
      console.error('Error:', error);
  });
}

};
$scope.getDefaultAddress();


$scope.selectAddressBill  = function(address) {
  $scope.fillDataToBill(address);

};

$scope.deleteDataAddress = function(addressId) {
  $http.delete('http://localhost:8080/api/ol/authenticated/deleteAddress/' + addressId)
      .then(function successCallback(response) {
        $scope.getAddressList();
          $scope.showSuccessNotification("Đã xóa địa chỉ thành công");
      }, function errorCallback(response) {
          console.error('Không thể xóa địa chỉ');
      $scope.showErrorNotification("Xóa địa chỉ thất bại");

      });
};

$scope.updateAddress = function() {

    // Kiểm tra các trường thông tin bắt buộc
    let isNameUserAddressInvalid = !$scope.addressData.name || $scope.addressData.name.trim().length === 0;
    let isNameDetailAddressInvalid = !$scope.addressDataaddressDetail || $scope.addressDataaddressDetail.trim().length === 0;
    let isCityAddressInvalid = !$scope.addressDatacity || $scope.addressDatacity.trim().length === 0;
    let isDistrictAddressInvalid = !$scope.addressDatadistrict || $scope.addressDatadistrict.trim().length === 0;
    let isWardAddressInvalid = !$scope.addressDataward || $scope.addressDataward.trim().length === 0;
  
    let isPhoneNumberAddressInvalid = !isValidPhoneNumber($scope.addressData.phoneNumber);
    // Thêm kiểm tra cho các trường khác nếu cần
  
    // Hiển thị thông báo lỗi dưới các trường thông tin
    $scope.isNameUserAddressInvalid = isNameUserAddressInvalid;
    $scope.isNameDetailAddressInvalid = isNameDetailAddressInvalid;
    $scope.isCityAddressInvalid = isCityAddressInvalid;
    $scope.isDistrictAddressInvalid = isDistrictAddressInvalid;
    $scope.isWardAddressInvalid = isWardAddressInvalid;
    $scope.isPhoneNumberAddressInvalid = isPhoneNumberAddressInvalid;
    // Hiển thị thông báo lỗi cho các trường khác nếu cần
  
    // Tiếp tục chỉ khi không có lỗi
    if (isNameUserAddressInvalid || isNameDetailAddressInvalid || isCityAddressInvalid || isWardAddressInvalid || isPhoneNumberAddressInvalid || isDistrictAddressInvalid) {
      return;
    }
  var fullAddress =
      $scope.addressDataaddressDetail +
      ', ' +
      $scope.addressDataward +
      ', ' +
      $scope.addressDatadistrict +
      ', ' +
      $scope.addressDatacity;

  // Tạo object để gửi thông tin địa chỉ
  var updatedAddress = {
      id: $scope.addressData.id,
      name: $scope.addressData.name,
      phoneNumber: $scope.addressData.phoneNumber,
      address: fullAddress,
      status: $scope.addressData.status,
      createdAt: $scope.addressData.createdAt,
      customer: $scope.addressData.customer,
      defaultAddress: $scope.addressData.defaultAddress
  };
  $http.post('http://localhost:8080/api/ol/authenticated/updateAddress', updatedAddress)
    .then(function(response) {
      $scope.getAddressList();
    $scope.showSuccessNotification("Cập nhật địa chỉ thành công!");
    })
    .catch(function(error) {
      $scope.showErrorNotification("Cập nhật địa chỉ thất bại!");

    });
};


$scope.addAddress = function() {
  // Kiểm tra các trường thông tin bắt buộc
  let isNameUserAddressInvalid = !$scope.addressData.name || $scope.addressData.name.trim().length === 0;
  let isNameDetailAddressInvalid = !$scope.addressDataaddressDetail || $scope.addressDataaddressDetail.trim().length === 0;
  let isCityAddressInvalid = !$scope.addressDatacity || $scope.addressDatacity.trim().length === 0;
  let isDistrictAddressInvalid = !$scope.addressDatadistrict || $scope.addressDatadistrict.trim().length === 0;
  let isWardAddressInvalid = !$scope.addressDataward || $scope.addressDataward.trim().length === 0;

  let isPhoneNumberAddressInvalid = !isValidPhoneNumber($scope.addressData.phoneNumber);
  // Thêm kiểm tra cho các trường khác nếu cần

  // Hiển thị thông báo lỗi dưới các trường thông tin
  $scope.isNameUserAddressInvalid = isNameUserAddressInvalid;
  $scope.isNameDetailAddressInvalid = isNameDetailAddressInvalid;
  $scope.isCityAddressInvalid = isCityAddressInvalid;
  $scope.isDistrictAddressInvalid = isDistrictAddressInvalid;
  $scope.isWardAddressInvalid = isWardAddressInvalid;
  $scope.isPhoneNumberAddressInvalid = isPhoneNumberAddressInvalid;
  // Hiển thị thông báo lỗi cho các trường khác nếu cần

  // Tiếp tục chỉ khi không có lỗi
  if (isNameUserAddressInvalid || isNameDetailAddressInvalid || isCityAddressInvalid || isWardAddressInvalid || isPhoneNumberAddressInvalid || isDistrictAddressInvalid) {
    return;
  }

  var fullAddress =
      $scope.addressDataaddressDetail +
      ', ' +
      $scope.addressDataward +
      ', ' +
      $scope.addressDatadistrict +
      ', ' +
      $scope.addressDatacity;

  // Tạo object để gửi thông tin địa chỉ mới
  var newAddress = {
      name: $scope.addressData.name,
      phoneNumber: $scope.addressData.phoneNumber,
      address: fullAddress,
      customer: $scope.userData,
      defaultAddress: $scope.addressData.defaultAddress
  };

  $http.post('http://localhost:8080/api/ol/authenticated/addAddress', newAddress)
    .then(function(response) {
      $scope.getAddressList();
      $scope.showSuccessNotification("Thêm địa chỉ mới thành công!");
    })
    .catch(function(error) {
      $scope.showErrorNotification("Thêm địa chỉ mới thất bại!");
    });
};


$scope.getFavoritesList = function() {
  if ($scope.username != null && !$scope.isAdmin) {
      $http({
          method: 'GET',
          url: 'http://localhost:8080/api/ol/authenticated/favorites',
          params: { username: $scope.username, page: $scope.currentPage }
      })
      .then(
          function successCallback(response) {
              $scope.favoritesList = response.data;

              // Kiểm tra xem favoritesList.content có tồn tại và là mảng không
              if ($scope.favoritesList && $scope.favoritesList.content && Array.isArray($scope.favoritesList.content)) {
                  $rootScope.countFavorite = $scope.favoritesList.content.length;
              } else {
                  $rootScope.countFavorite = 0;
              }
          },
          function errorCallback(response) {
              // Xử lý khi gọi API không thành công
              console.error('Error while fetching data');
          }
      );
  }else{
    $rootScope.countFavorite = '';
  }
};


$scope.setCurrentPageRateFavorite = function(page) {
  if (page >= 0 && page < $scope.favoritesList.totalPages) {
      $scope.currentPage = page;
      $scope.getFavoritesList();
  }
};


$scope.getFavoritesList();

$scope.deleteDataFavorite = function(favorites) {
  $http.delete('http://localhost:8080/api/ol/authenticated/favorites/' + favorites)
      .then(function successCallback(response) {
        $scope.getFavoritesList();
          $scope.showSuccessNotification("Xóa sản phẩm thành công");
      }, function errorCallback(response) {
      $scope.showErrorNotification("Xóa sản phẩm  thất bại");
      });
};


$scope.addFavorite = function(productId) {
if ($scope.username  == null) {
  $scope.showErrorNotification("Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích");

  return;
}

if ($scope.isAdmin) {
  $scope.showErrorNotification("Nhân viên không thêm được sản phẩm vào danh sách yêu thích");
  return;

}
  if (productId != null ) {
    var newFavorite = {
      customer: $scope.userData, // Thay vào đây thông tin về khách hàng đã đăng nhập
      idProduct: productId,
      status: 1 
    };

    $http.post('http://localhost:8080/api/ol/authenticated/addFavorites', newFavorite)
      .then(function(response) {
        if (response.data === 1) {
$scope.getFavoritesList();

          $scope.showSuccessNotification("Đã thêm vào yêu thích!");
        } else if (response.data === 2) {
          $scope.showErrorNotification("Sản phẩm đã tồn tại trong danh sách yêu thích của bạn!");
        } else {
          $scope.showErrorNotification("Có lỗi xảy ra khi thêm vào yêu thích!");
        }
      })
      .catch(function(error) {
        $scope.showErrorNotification("Không thể thêm vào yêu thích!");
      });
  } else {
    $scope.showErrorNotification("Vui lòng chọn sản phẩm cụ thể");
    return;
  }


}


$scope.choiceProductDetail = function(productDetail){
  // ng-click="choiceProductDetail(favorite.productDetail)"
  $scope.selectSize(productDetail.size.id);
  $scope.selectColor(productDetail.color.id);
  // $scope.productDetailInfo.olViewProductDetailRespone.id = productDetail.product.id;
}


// bill

// $scope.listBills = function() {
//   console.log($scope.isAdmin)

//   if ($scope.username != null && !$scope.isAdmin) {
//     $http({
//       method: 'GET',
//       url: 'http://localhost:8080/api/ol/authenticated/bills?username=' + $scope.username 
//   }).then(function successCallback(response) {
//       $scope.listBills = response.data;
//   }, function errorCallback(response) {
//       console.error('Error:', response.data);
//   });
//   }


// };


$scope.showBillDetail = function() {
  var billId = $routeParams.billId;
if(billId != null){
  $http.get('http://localhost:8080/api/ol/authenticated/bills/' + billId)
      .then(function(response) {
      $scope.selectedBill = response.data;
      console.log($scope.selectedBill)
      })
      .catch(function(error) {
          console.error('Error fetching bill details:', error);
      });
};
}




$scope.rating = {
  stars: 0,
  content: ''
};

$scope.toggleStars = function(index) {
  $scope.rating.stars = index + 1; // Lấy giá trị từ index và thêm 1
  const stars = document.querySelectorAll('.fa-star');
  for (let i = 0; i <= index; i++) {
      stars[i].classList.add('checked');
  }
  for (let i = index + 1; i < stars.length; i++) {
      stars[i].classList.remove('checked');
  }
};


$scope.currentPage = 0;
$scope.pageSize = 7;

$scope.listBills = function() {
  if ($scope.username != null && !$scope.isAdmin) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/api/ol/authenticated/bills',
      params: { username: $scope.username, page: $scope.currentPage }
  }).then(function(response) {
      $scope.billPage = response.data;

      if ($scope.billPage.totalElements === 0) {
          $scope.noBillsMessage = "Không có hóa đơn nào được tìm thấy cho khách hàng này";
      } else {
          $scope.noBillsMessage = null;
      }
  }, function errorCallback(response) {
      console.error('Error:', response.data);
  });
  }


};

// $scope.listBills();

$scope.setCurrentPage = function(page) {
  if (page >= 0 && page < $scope.billPage.totalPages) {
      $scope.currentPage = page;
      $scope.listBills();
  }
};

// $scope.range = function(totalPages) {
//   var pages = [];
//   for (var i = 0; i < totalPages; i++) {
//       pages.push(i);
//   }
//   return pages;
// };
// rate

$scope.listRatesFuc = function() {
if ($scope.username != null && !$scope.isAdmin) {

  $http({
    method: 'GET',
    url: 'http://localhost:8080/api/ol/authenticated/rates',
    params: { username: $scope.username, page: $scope.currentPage }
}).then(function(response) {
    $scope.listRates = response.data;

    if ($scope.listRates.totalElements === 0) {
        $scope.noBillsMessage = "Không có hóa đơn nào được tìm thấy cho khách hàng này";
    } else {
        $scope.noBillsMessage = null;
    }
}, function errorCallback(response) {
    console.error('Error:', response.data);
});
  
}


};

$scope.setCurrentPageRate = function(page) {
  if (page >= 0 && page < $scope.listRates.totalPages) {
      $scope.currentPage = page;
      $scope.listRatesFuc();
      
  }
};

$scope.getRates = function() {
  var productId = $routeParams.id; 
$scope.productId = $routeParams.id; 

  $http({
    method: 'GET',
    url: 'http://localhost:8080/api/ol/authenticated/listRate',
    params: { productId: productId, page: $scope.currentPage }
}) .then(function(response) {
          $scope.ratings = response.data; 
      })
      .catch(function(error) {
          console.error('Error fetching ratings:', error);
      });
};
$scope.setCurrentPageRateProduct = function(page) {
  if (page >= 0 && page < $scope.ratings.totalPages) {
      $scope.currentPage = page;
      $scope.getRates();
  }
};



// $scope.listRatesFuc = function() {
//   $http({
//       method: 'GET',
//       url: 'http://localhost:8080/api/ol/authenticated/rates?username=' + $scope.username 
//   }).then(function (response) {
//       $scope.listRates = response.data;

//       console.log('Error:', response.data); 

//   }, function errorCallback(response) {
//       console.error('Error:', response.data);
//   });
// };


$scope.getNumber = function(num) {

  return new Array((num));
};


$scope.deleteDataRate = function(rate) {
  $http.delete('http://localhost:8080/api/ol/authenticated/deleteRate/' + rate)
      .then(function(response) {
        $scope.listRatesFuc();
        $scope.showSuccessNotification("Xóa đánh giá thành công");

      }, function errorCallback(response) {
      $scope.showErrorNotification("Xóa đánh giá thất bại");
      });
};

$scope.ratings = []; // To store the retrieved ratings

$scope.selectedBillDetail = null;

$scope.openReview = function(detail) {
  $scope.selectedBillDetail = detail;
  $('#reviewModal').modal('show');
};

$scope.closeReview = function() {
  $scope.selectedBillDetail = null;
  $('#reviewModal').modal('hide');
};




$scope.addRating = function() {
  if ($scope.rating.stars === 0) {
    $scope.showErrorNotification("Vui lòng chọn sao!"); 
    return;
  }

  var ratingData = {
    rate: $scope.rating.stars,
    content: $scope.rating.content,
    idCustomer: 2,
    idBillDetail: $scope.selectedBillDetail.id,
    rated: true
  };

  $http.post('http://localhost:8080/api/ol/authenticated/addRate', ratingData)
    .then(function(response) {
      if (response.data === true) {
        $scope.showSuccessNotification("Cảm ơn bạn đã đánh giá"); 
        $scope.showBillDetail();
        $scope.closeReview();
      } else {
        $scope.showErrorNotification("Bạn đã đánh giá cho sản phẩm này trước đó"); 
      }
    })
    .catch(function(error) {
      $scope.showErrorNotification("Đánh giá thất bại vui lòng thử lại"); 
    });
};



// check order by phoneNumber
$scope.phoneNumberCheckOrder = ''; 
$scope.isPhoneNumberCheckOrder = false;

$scope.checkOrder = function() {
  $scope.isPhoneNumberCheckOrder = !isValidPhoneNumber($scope.phoneNumberCheckOrder);
  // Thêm kiểm tra cho các trường khác nếu cần
  console.log('Thông tin đơn hàng:');

  if ( $scope.isPhoneNumberCheckOrder) {
    return;
  }
  console.log('Thông tin đơn hàng:');

      $http.get('http://localhost:8080/api/ol/checkOrder/' + $scope.phoneNumberCheckOrder)
          .then(function(response) {
              // Xử lý dữ liệu khi API trả về thành công
              $scope.billInfo = response.data;
          })
          .catch(function(error) {
              // Xử lý lỗi khi gọi API không thành công
              console.error('Lỗi khi gọi API:', error);
              $scope.billInfo = null;
          });
};


$scope.showCheckOrder = function() {
  var billId = $routeParams.billId;
if(billId != null){
  $http.get('http://localhost:8080/api/ol/bills/' + billId)
      .then(function(response) {
      $scope.selectedBill2 = response.data;
      })
      .catch(function(error) {
          console.error('Error fetching bill details:', error);
      });
};
}


// Function để ánh xạ giá trị số về trạng thái tương ứng
$scope.getStatusText = function(statusCode) {

  switch (statusCode) {
      case 1:
          return 'Chờ xác nhận';
      case 2:
          return 'Đang giao hàng';
      case 3:
          return 'Thành công';
      case 4:
          return 'Đã hủy';
      case 10:
            return 'Giao dịch đang được xử lí';
      default:
          return 'Trạng thái không xác định';
  }
};









$scope.overlayActive = false;
$scope.productSearch = [];
$scope.limit = 4;
$scope.showLoadMore = false;
$scope.searchText = '';
$scope.isNavigatingToProductDetail = false;


$scope.closeOverlay = function (event) {
  // Kiểm tra xem sự kiện click có phát sinh từ nội dung overlay hay không
  if (event.target.id === 'overlay') {
    $scope.toggleOverlaySearch();
  }
};

$scope.openOverlaySearch = function () {
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('active');
    overlay.classList.toggle('inactive');

    $scope.loadProductSearch()
};

$scope.toggleOverlaySearch = function () {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    overlay.classList.add('inactive');
    document.getElementById('form1').value = '';
    $scope.clearAndHideSearchResults();

    if ($scope.isNavigatingToProductDetail) {
        document.getElementById('form1').style.display = 'none';
    }
};

$scope.navigateToProductDetail = function (productId) {
    $scope.isNavigatingToProductDetail = true;
    window.location.href = `#!product-detail/${productId}`;
};

$scope.clearAndHideSearchResults = function () {
  const productDisplay = document.getElementById('productDisplay');
  if (productDisplay && productDisplay.style) {
      productDisplay.innerHTML = '';
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      if (loadMoreBtn && loadMoreBtn.style) {
          loadMoreBtn.style.display = 'none';
      }
  }
};

$scope.displayProducts = function (products) {
    const productDisplay = document.getElementById('productDisplay');

    // Kiểm tra xem productDisplay có tồn tại và có thuộc tính style không
    if (productDisplay && productDisplay.style) {
        productDisplay.innerHTML = '';

        products.forEach(product => {
            // Định dạng giá theo định dạng VND
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

            // Bỏ ký hiệu đồng (₫)
            const priceWithoutCurrencySymbol = formattedPrice.replace('₫', 'đ');

            const productElement = document.createElement('div');
            productElement.className = 'col-md-3 mb-4';
            productElement.innerHTML = `
                <div class="card w-100 my-2 shadow-2-strong">
                    <a href="#!product-detail/${product.id}">
                        <img class="card-img-top" width="100%" height="100%" class="rounded-2" loading="lazy" src="${product.path}" />
                    </a>
                    <div class="card-body d-flex flex-column">
                        <div style="display: flex; justify-content: space-between;">
                            <span class="product-price">${priceWithoutCurrencySymbol}</span>
                            <a href="#" class="btn btn-light  py-2 icon-hover px-3"></a>
                        </div>
                        <p class="card-title">
                            ${product.name}
                            ${product.nameCategory}
                            ${product.nameMaterial}
                            ${product.code}
                        </p>
                    </div>
                </div>
            `;
            productDisplay.appendChild(productElement);
        });

        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if ($scope.showLoadMore) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    } else {
        console.error('Product display element not found or does not have a style property.');
    }
};


$scope.searchText= '';
$scope.productSearch = '';
$scope.loadProductSearch = function () {
  console.log($scope.searchText);
  var searchTextParam = $scope.toLowerCaseNonAccentVietnamese($scope.searchText);
  $http.get(`http://localhost:8080/api/ol/products/search?keyword=${searchTextParam}`)
      .then(function (response) {
          $scope.productSearch = response.data;
          console.log($scope.productSearch);
          $scope.displayProducts($scope.productSearch);
      })
      .catch(function (error) {
          console.error('Error fetching more products:', error);
      });
};





$scope.checkSearch = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTextParam = urlParams.get('searchText');
    if (searchTextParam) {
        $scope.searchText = searchTextParam;
        $scope.loadMore();
    } else {
        $scope.searchText = '';
    }
};

$scope.toLowerCaseNonAccentVietnamese = function (str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    return str;
};

$scope.checkSearch();
});