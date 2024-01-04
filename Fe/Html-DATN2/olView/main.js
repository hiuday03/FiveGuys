


var app = angular.module("myApp", ["ngRoute", "angular-jwt"]);


app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.factory('authInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
  return {
      'request': function(config) {
          // Lấy token từ cookies
          var token = localStorage.getItem('token');

          
          
          // Nếu có token, thêm header 'Authorization'
          if (token) {
              config.headers['Authorization'] = 'Bearer ' + token;
          }
          
          return config;
      },
      'responseError': function(response) {
          // Xử lý các lỗi khi nhận response
          return $q.reject(response);
      }
  };
}]);


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
  .when("/account-info", {
    templateUrl : "accountManagemrnt/account-info.html",
    controller : "myApp-ctrl2"
  })
  .when("/account-address", {
    templateUrl : "accountManagemrnt/account-address.html",
    controller : "myApp-ctrl2"
  })
  .when("/account-favorite", {
    templateUrl : "accountManagemrnt/account-favorite.html",
    controller : "myApp-ctrl2"
  })
  .when("/account-history", {
    templateUrl : "accountManagemrnt/account-history.html",
    controller : "myApp-ctrl2"
  })
  .when("/account-historyDetail", {
    templateUrl : "accountManagemrnt/account-historyDetail.html",
    controller : "myApp-ctrl2"
  })
  .when("/account-evaluate", {
    templateUrl : "accountManagemrnt/account-evaluate.html",
    controller : "myApp-ctrl2"
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

app.controller("myApp-ctrl2", function ($scope,$rootScope, $http, $routeParams,$location,jwtHelper) {
  $scope.currentPage = 0; // Trang hiện tại
  $scope.dataId = null;
  $scope.totalQuantity = 0;
  $scope.kmMa = "";
  $scope.totalAmount = 0;
  $scope.totalAmountAfterDiscount = 0;
  $scope.KM = null;
  $rootScope.countProduct = 0;
  $scope.isCustomerLoggedIn = false;
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
    $scope.loadPage();

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
$scope.username = null; 
// check người dùng đã đăng nhập chưa
function checkUserLoggedIn(username) {
  $http.get('http://localhost:8080/api/ol/user?username=' + username)
    .then(function (response) {
      console.log(response.data);
      if (response.status === 200 && response.data !== null) {
        if (response.data.employeeLoggedIn === true) {
          $scope.isEmployeeLoggedIn = true;
          $scope.userData = response.data;
          console.log(userData)
          console.log("Employee is logged in.");
          return ;
        } else if(response.data.loggedIn === false){
          $scope.isCustomerLoggedIn = false;
          $scope.isEmployeeLoggedIn = false;
          console.log("User is not logged in.");
          return ;
        } else {
          $scope.isCustomerLoggedIn = true;
          $scope.userData = response.data;
          console.log($scope.userData)
          console.log("Customer is logged in.");

          if ($scope.isCustomerLoggedIn) {
            $scope.cart.saveDataAndClearLocalStorage();
            loadCart();
          }
          return ;

          
        }
      } else {
        // Reset variables and return false
        $scope.isCustomerLoggedIn = false;
        $scope.isEmployeeLoggedIn = false;
        console.log("User is not logged in.");
        return ;
      }
    })
    .catch(function (error) {
      console.error("Error checking user login status:", error);
      // Reset variables and return false in case of errors
      $scope.isCustomerLoggedIn = false;
      $scope.isEmployeeLoggedIn = false;
      console.log("Error occurred. User is not logged in.");
      return;
    });
}

function isUserLoggedIn() {
  // var token = $cookies.get('token');
         // Lấy token từ cookies
         var token = localStorage.getItem('token');

  if (!token) {
    $scope.isCustomerLoggedIn = false;
    $scope.isEmployeeLoggedIn = false;
    $scope.userData = null;
    $scope.isAdmin = false;

    return Promise.resolve(false);
  }

  var decodedToken = jwtHelper.decodeToken(token);
  $scope.username = decodedToken.sub;
  if (decodedToken.role && decodedToken.role.length > 0) {
    console.log(decodedToken.role[0].authority);
    $scope.isAdmin = decodedToken.role[0].authority === 'ADMIN' || decodedToken.role[0].authority === 'STAFF';
  } else {
    $scope.isAdmin = false;
  }
  console.log($scope.isAdmin)
  return checkUserLoggedIn($scope.username);
}
// check người dùng đã đăng nhập chưa
isUserLoggedIn();

// Giỏ hàng người dùng
function loadCart() {
  if($scope.username != null){
    $http.get('http://localhost:8080/api/ol/cartDetail?username=' + $scope.username)
      .then(function (response) {
        if (response.data) {
          $scope.cartItems = response.data;
          console.log($scope.cartItems);
        }
      })
      .catch(function (error) {
        console.error("Error loading cart:", error);
      });
    }

}



// Giỏ hàng người dùng
function loadLocal() {
  if ($scope.username == null) {
        $scope.cartItems = $scope.cart.items;
        count();
      } 

}



function countTotalPrice(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


  function count() {
    if ($scope.isCustomerLoggedIn && $scope.cartItems) {
              // Lọc $scope.cartItem và tính tổng số lượng
              $rootScope.countProduct = $scope.cartItems.reduce((total, item) => total + item.quantity, 0);
              $scope.totalAmount = countTotalPrice($scope.cartItems);
              $scope.totalAmountAfterDiscount = $scope.totalAmount;
          } else if ($scope.isEmployeeLoggedIn) {
            $rootScope.countProduct = 0;
          } else {
            if  ($scope.cart.items == null){
              $scope.cart.items = [];
            }
              // Tính tổng số lượng từ local storage
              $rootScope.countProduct = $scope.cart.items.reduce((total, item) => total + item.quantity, 0);
              $scope.totalAmount = countTotalPrice($scope.cart.items);
              $scope.totalAmountAfterDiscount = $scope.totalAmount;

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
                      $scope.isEmployeeLoggedIn = true;
                      $scope.showErrorNotification("Nhân viên không thể mua hàng!");
                     } else if (response.data) {
                        $scope.showSuccessNotification("Thêm vào giỏ thành công!");
                        loadCart();
                      count();
                      } else {
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
                  item.quantity += $scope.quantitySelected;
                  $scope.cart.saveToLocalStorage();
                  count();
              } else {
                  $http.get('http://localhost:8080/api/ol/products/detail/' + productDetailId)
                      .then(resp => {
                          let newItem = resp.data;
                          newItem.quantity = $scope.quantitySelected;
                          $scope.cart.items.push(newItem);
                          $scope.cart.saveToLocalStorage();
                          count();
                      })
                      .catch(error => {
                          console.error('Error fetching product details:', error);
                          // Handle error if the product details couldn't be fetched
                      });
              }
              
              $scope.showSuccessNotification("Thêm vào giỏ thành công!");

              loadLocal();

          }
          $scope.applyVoucher();

  },
    update(cartDetailId, quantity) {
      if ($scope.username != null) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/update', { cartDetailId: cartDetailId, quantity: quantity ,username :$scope.username })
                  .then(function (response) {
                      if (response.data) {
                        loadCart();
                      count();
                      $scope.showSuccessNotification("Cập nhật giỏ thành công!");

                      } else {
                        $scope.showErrorNotification("Cập nhật giỏ thất bại!");

                      }
                  })
                  .catch(function (error) {
                    $scope.showWarningNotification("Có lỗi xảy ra!");
                      console.error(error);
                  });

          } else {
              // Thực hiện hành động khi chưa đăng nhập
              var item = $scope.cart.items.find(item => item.id == cartDetailId);
              if (item) {
                  item.quantity = quantity;
                  $scope.cart.saveToLocalStorage();
              count();

              }
              loadLocal();
          }
          $scope.applyVoucher();


  },
    remove(id) {
      if ($scope.username != null) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/remove', { cartDetailId: id ,username :$scope.username})
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
              count();

              }
              loadLocal();

          }
          $scope.applyVoucher();


  
  },
  clear() {
    if ($scope.username != null) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/clear?username=' + $scope.username)
                  .then(function (response) {
                    loadCart();
                            count();
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
              count();
              loadLocal();

          }
          $scope.applyVoucher();
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
          code: "test cdn",
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
          status: 1,
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
            console.log(bill);
          
            // Tiến hành gửi dữ liệu lên server
            $http.post("http://localhost:8080/api/ol/bill/create", bill)
              .then(resp => {
                console.log(bill);
                window.location.href = resp.data.rederect;
              })
              .catch(error => {
                alert("Đặt hàng thất bại");
                console.log(error);
              });
       
        }
          
      }
    
// Customer


// Controller code
$scope.selectedVoucher = null

$scope.selectVoucher = function(selectedVoucher) {
  if (selectedVoucher.quantity > 0) {
    if ($scope.selectedVoucher === selectedVoucher) {
      $scope.selectedVoucher = null;
      selectedVoucher.selected = false;
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
$scope.voucherMessage = ''; // Khởi tạo thông điệp rỗng ban đầu
$scope.voucherData = null;

$scope.applyVoucher= function () {
  if ($scope.selectedVoucher != null){

  if ( $scope.selectedVoucher.quantity > 0) {
    if ($scope.totalAmount >= $scope.selectedVoucher.minimumTotalAmount) {
      var voucherCopy = angular.copy($scope.selectedVoucher); 
      delete voucherCopy.selected; 
       $scope.voucherData = voucherCopy;
      // Nếu loại giảm giá là trực tiếp (valueType = 1)
      if ($scope.selectedVoucher.valueType === 1) {
        $scope.valueVoucher = $scope.selectedVoucher.value;
        $scope.totalAmountAfterDiscount = $scope.totalAmount - $scope.valueVoucher; // Giảm trực tiếp
      }
      // Nếu loại giảm giá là phần trăm (valueType khác 1)
      else {
        var discountPercentage = $scope.selectedVoucher.value / 100;
        $scope.valueVoucher = $scope.totalAmount * discountPercentage;
        $scope.totalAmountAfterDiscount = $scope.totalAmount - $scope.valueVoucher; // Giảm theo phần trăm
      }
      $scope.voucherMessage = 'Mã giảm giá đã được áp dụng'; // Cập nhật thông điệp thành công
    } else {
  count();
  $scope.voucherData = null;

      $scope.valueVoucher = 0;
    $scope.voucherMessage = 'Mã giảm giá ' + $scope.selectedVoucher.code + ' chỉ sử dụng cho đơn hàng có tổng trị giá trên ' + $scope.selectedVoucher.minimumTotalAmount;
    // $scope.selectedVoucher = null;
    }
  }
}else{
$scope.voucherData = null;

  $scope.voucherMessage = '';
  count();
  $scope.valueVoucher = 0;
}

};




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

  $scope.searchCode = null; // Biến lưu trữ mã code tìm kiếm

  // Hàm tìm kiếm voucher bằng mã code
  $scope.searchByCode = function() {
      if($scope.searchByCode != null){
        console.log($scope.searchCode)
        $http.get('http://localhost:8080/api/ol/vouchers/' + $scope.searchCode)
          .then(function(response) {
              // Xử lý khi có kết quả trả về từ server
              $scope.listVouchers = null;

              $scope.listVouchers = response.data;
          })
          .catch(function(error) {
              // Xử lý khi có lỗi xảy ra
              console.error('Error:', error);
              // Đặt foundVoucher về null nếu không tìm thấy
              $scope.reloadHomeDataVouchers();
          });
      }
  };

  //PayMentMethod
  $scope.reloadPaymentMothod = function() {
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
  
  $scope.reloadPaymentMothod();


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

// $scope.birthDate2 = new Date('1989-12-31T17:00:00.000+00:00');
// $scope.formattedBirthDate = $filter('date')($scope.birthDate2, 'yyyy-MM-dd');
// $scope.birthDate = new Date('1989-12-31');

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
  $http.post('http://localhost:8080/api/ol/updateUser', userData)
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

$scope.checkPassword = function() {
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

      $http.post('http://localhost:8080/api/ol/resetPassword', data)
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
  window.location.href = 'http://127.0.0.1:5502/olView/index.html#!/home';
};

$scope.getAddressList = function() {
  if ($scope.username != null) {
    $http.get('http://localhost:8080/api/ol/address?username=' + $scope.username)
      .then(function successCallback(response) {
        console.log('Response data:', response.data); // Xem dữ liệu trả về từ API
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
};

$scope.getDefaultAddress  = function() {
  $http.get('http://localhost:8080/api/ol/addressDefault')
      .then(function(response) {
       $scope.fillDataToBill(response.data);
      })
      .catch(function(error) {
          console.error('Error:', error);
      });
};

$scope.selectAddressBill  = function(address) {
  $scope.fillDataToBill(address);

};

$scope.deleteDataAddress = function(addressId) {
  $http.delete('http://localhost:8080/api/ol/deleteAddress/' + addressId)
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
  $http.post('http://localhost:8080/api/ol/updateAddress', updatedAddress)
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

  $http.post('http://localhost:8080/api/ol/addAddress', newAddress)
    .then(function(response) {
      $scope.getAddressList();
      $scope.showSuccessNotification("Thêm địa chỉ mới thành công!");
    })
    .catch(function(error) {
      $scope.showErrorNotification("Thêm địa chỉ mới thất bại!");
    });
};




$scope.getFavoritesList = function() {
  if ($scope.username != null) {
    $http.get('http://localhost:8080/api/ol/favorites?username=' + $scope.username)
      .then(function successCallback(response) {
        console.log('Response data:', response.data); // Xem dữ liệu trả về từ API
        $scope.favoritesList = response.data;
      }, function errorCallback(response) {
        // Xử lý khi gọi API không thành công
        console.error('Error while fetching data');
      });
  }
};

$scope.deleteDataFavorite = function(favorites) {
  $http.delete('http://localhost:8080/api/ol/favorites/' + favorites)
      .then(function successCallback(response) {
        $scope.getFavoritesList();
          $scope.showSuccessNotification("Xóa sản phẩm thành công");
      }, function errorCallback(response) {
      $scope.showErrorNotification("Xóa sản phẩm  thất bại");
      });
};


$scope.addFavorite = function(productDetailId) {

  if(productDetailId != null){

  var newFavorite = {

    customer: $scope.userData, // Thay vào đây thông tin về khách hàng đã đăng nhập
    productDetail:  productDetailId , 
    status: 1 
  };

  $http.post('http://localhost:8080/api/ol/addFavorites', newFavorite)
    .then(function(response) {
      // Xử lý khi yêu thích được thêm thành công
      $scope.showSuccessNotification("Đã thêm vào yêu thích!");
    })
    .catch(function(error) {
      // Xử lý khi thêm yêu thích thất bại
      $scope.showErrorNotification("Không thể thêm vào yêu thích!");
    });


}else{
  $scope.showErrorNotification("Vui lòng chọn sản phẩm cụ thể");
  return;
}
}

$scope.choiceProductDetail = function(productDetail){
  // ng-click="choiceProductDetail(favorite.productDetail)"
console.log(productDetail);
  $scope.selectSize(productDetail.size.id);
  $scope.selectColor(productDetail.color.id);
  // $scope.productDetailInfo.olViewProductDetailRespone.id = productDetail.product.id;
}


// bill

$scope.listBills = function() {
  $http({
      method: 'GET',
      url: 'http://localhost:8080/api/ol/bills?username=' + $scope.username 
  }).then(function successCallback(response) {
      $scope.listBills = response.data;
  }, function errorCallback(response) {
      console.error('Error:', response.data);
  });
};


$scope.showBillDetail = function() {
  var billId = $routeParams.billId;
if(billId != null){
  $http.get('http://localhost:8080/api/ol/bills/' + billId)
      .then(function(response) {
      $scope.selectedBill = response.data;
      console.log($scope.selectedBill)
      })
      .catch(function(error) {
          console.error('Error fetching bill details:', error);
      });
};
}

$scope.openReview = function() {
  $('#reviewModal').modal('show');
};
$scope.closeReview = function() {
  $('#reviewModal').modal('hide');
};


$scope.toggleStars = function(index) {
  const stars = document.querySelectorAll('.fa-star');
  for (let i = 0; i <= index; i++) {
      stars[i].classList.add('checked');
  }
  for (let i = index + 1; i < stars.length; i++) {
      stars[i].classList.remove('checked');
  }
}


// rate


$scope.listRatesFuc = function() {
  $http({
      method: 'GET',
      url: 'http://localhost:8080/api/ol/rates?username=' + $scope.username 
  }).then(function (response) {
      $scope.listRates = response.data;
  }, function errorCallback(response) {
      console.error('Error:', response.data);
  });
};


$scope.getNumber = function(num) {
  return new Array(num);
};


$scope.deleteDataRate = function(rate) {
  $http.delete('http://localhost:8080/api/ol/deleteRate/' + rate)
      .then(function(response) {
        $scope.listRatesFuc();
        $scope.showSuccessNotification("Xóa đánh giá thành công");

      }, function errorCallback(response) {
      $scope.showErrorNotification("Xóa đánh giá thất bại");
      });
};

});

