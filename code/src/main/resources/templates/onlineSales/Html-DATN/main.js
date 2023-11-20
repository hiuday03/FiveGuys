var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/home", {
    templateUrl : "home.html",
    controller : "myApp-ctrl"
  })
  .when("/cart", {
    templateUrl : "cart.html",
    controller : "myApp-ctrl"
  })
  .when("/product-detail/:id", {
    templateUrl : "product-detail.html",
    controller : "myApp-ctrl"
  })
  .when("/checkout", {
    templateUrl : "checkout.html",
    controller : "myApp-ctrl"
  });
});

app.controller("myApp-ctrl", function ($scope,$rootScope, $http, $timeout, $routeParams) {
  $scope.currentPage = 0; // Trang hiện tại
  $scope.dataId = null;
  $scope.totalQuantity = 0;
  $scope.kmMa = "";
  $scope.totalAmount = 0;
  $scope.totalAmountAfterDiscount = 0;
  $scope.KM = null;
  $rootScope.countProduct = 0;
  $scope.isUserLoggedIn = null;
  $scope.images = []; // Danh sách ảnh nhỏ
  $scope.mainImage = ''; // Ảnh lớn chính


  

  

  $scope.initialize = function () {
    $scope.loadPage($scope.currentPage);
  }
  
  // Page

  $scope.loadPage = function (page) {
    $http.get('http://localhost:8080/api/ol/products?page=' + page).then(function(response) {
      $scope.products = response.data.content;
      $scope.totalPages = response.data.totalPages;
    }, function(error) {
      console.error('Error fetching products:', error);
    });
  }

  $scope.nextPage = function () {
    $scope.$apply(function () {
      if ($scope.currentPage < $scope.totalPages - 1) {
        $scope.currentPage++;
        $timeout(function () {
          $scope.loadPage($scope.currentPage);
        });
      }
    });
  }

  $scope.prevPage = function () {
    $scope.$apply(function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $timeout(function () {
        $scope.loadPage($scope.currentPage);
      });
    }
  });
  }
  
  // Page



  // select color and size
  $scope.selectColor = function(colorId) {
    $scope.selectedColor = colorId;
  $scope.checkSelectd();

  $scope.getImagesByColorAndProduct(colorId);

}

$scope.selectColorHome = function(colorId) {
  $scope.selectedColorHome = colorId;


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



// check người dùng đã đăng nhập chưa
function isUserLoggedIn() {
  return $http.get('http://localhost:8080/api/ol/user/authenticated').then(function (response) {
    $scope.isUserLoggedIn = response.data
    if (response.data) {
        // reloadCartItems();
        count();
        return response.data;
    
    }
  }).catch(function (error) {
      console.error("Error checking user login status:", error);
      return false; // Default to not logged in in case of an error
  });
}

// check người dùng đã đăng nhập chưa


// Giỏ hàng người dùng
function reloadCartItems() {
  $scope.cart.saveDataAndClearLocalStorage();
  $http.get('http://localhost:8080/api/ol/cartDetail')
      .then(function (response) {
        if (response.data) {
            $scope.cartItems = response.data;
            console.log($scope.cartItems)
            
        }
     
      });
}


// Giỏ hàng người dùng
function checkCart() {
  isUserLoggedIn().then(function (isLoggedIn) {
      if (!isLoggedIn) {
        $scope.cartItems = $scope.cart.items;
        console.log($scope.cartItems)
      } 
  }).catch(function (error) {
      console.error("Error checking user login status:", error);
  });
}

function countTotalPrice(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


  function count() {
    if ($scope.isUserLoggedIn && $scope.cartItems) {
              // Lọc $scope.cartItem và tính tổng số lượng
              $rootScope.countProduct = $scope.cartItems.reduce((total, item) => total + item.quantity, 0);
              $scope.totalAmount = countTotalPrice($scope.cartItems);
          } else {
              // Tính tổng số lượng từ local storage
              $rootScope.countProduct = $scope.cart.items.reduce((total, item) => total + item.quantity, 0);
              $scope.totalAmount = countTotalPrice($scope.cart.items);

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

       add(productId) {
        isUserLoggedIn().then(function (isLoggedIn) {
            if (isLoggedIn) {
                // Thực hiện hành động khi đã đăng nhập
                $http.post('http://localhost:8080/api/ol/cart/add', { productId: productId })
                    .then(function (response) {
                        if (response.data) {
                          alert("Thêm vào giỏ thành công!");
                        reloadCartItems();
                        count();
                        } else {
                            alert("Thêm vào giỏ hàng không thành công!");
                        }
                    })
                    .catch(function (error) {
                        alert("Có lỗi xảy ra khi gọi API!");
                        console.error(error);
                    });
               
            } else {
                // Thực hiện hành động khi chưa đăng nhập
                var item = $scope.cart.items.find(item => item.id == productId);
                if (item) {
                    item.quantity++;
                    $scope.cart.saveToLocalStorage();
                count();
                } else {
                    $http.get('http://localhost:8080/api/ol/products/detail/' + productId).then(resp => {
                        resp.data.quantity = 1;
                        $scope.cart.items.push(resp.data);
                        $scope.cart.saveToLocalStorage();
                        count();
                    });

                }
                checkCart();

            }
        });

    },
    update(productId, quantity) {
      isUserLoggedIn().then(function (isLoggedIn) {
          if (isLoggedIn) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/update', { productId: productId, quantity: quantity })
                  .then(function (response) {
                      if (response.data) {
                    reloadCartItems();
                      count();
                        //   alert("Cập nhật giỏ hàng thành công!");
                      } else {
                          alert("Cập nhật giỏ hàng không thành công!");
                      }
                  })
                  .catch(function (error) {
                      alert("Có lỗi xảy ra khi gọi API!");
                      console.error(error);
                  });

          } else {
              // Thực hiện hành động khi chưa đăng nhập
              var item = $scope.cart.items.find(item => item.id == productId);
              if (item) {
                  item.quantity = quantity;
                  $scope.cart.saveToLocalStorage();
              count();

              }
          checkCart();

          }

      });
  },
    remove(id) {
      isUserLoggedIn().then(function (isLoggedIn) {
          if (isLoggedIn) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/remove', { productId: id })
                  .then(function (response) {
              
                        alert("Xóa sản phẩm khỏi giỏ hàng thành công!");
                        reloadCartItems();
                            count();
                  })
                  .catch(function (error) {
                      alert("Có lỗi xảy ra khi gọi API!");
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
              checkCart();

          }


      });
  },
  clear() {
      isUserLoggedIn().then(function (isLoggedIn) {
          if (isLoggedIn) {
              // Thực hiện hành động khi đã đăng nhập
              $http.post('http://localhost:8080/api/ol/cart/clear')
                  .then(function (response) {
                        alert("Xóa tất cả sản phẩm khỏi giỏ hàng thành công!");
                        reloadCartItems();
                            count();
                  })
                  .catch(function (error) {
                      alert("Có lỗi xảy ra khi gọi API!");
                      console.error(error);
                  });
          } else {
              // Thực hiện hành động khi chưa đăng nhập
              $scope.cart.items = [];
              $scope.cart.saveToLocalStorage();
              count();
              checkCart();

          }

      });
  },

        // Tính thành tiền các mặt hàng trong giỏ
        amt_of(){},

        // Tính tổng số lượng các mặt hàng trong giỏ
      
      get amount() {
          if ($scope.isUserLoggedIn && $scope.cartItems) {
              // Lọc $scope.cartItem và tính tổng giá trị
              return $scope.cartItems.reduce((total, item) => total + item.quantity * item.productDetail.price, 0);
          } else if ($scope.cartItems) {
              // Tính tổng giá trị từ local storage
              return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
          }
          return 0; 
      },
      saveDataAndClearLocalStorage() {
        // Kiểm tra xem local storage có dữ liệu hay không
        var localStorageData = JSON.parse(localStorage.getItem("cart"));
        console.log(localStorageData);

        if (localStorageData && Array.isArray(localStorageData) && localStorageData.length > 0 && localStorageData != null) {
            isUserLoggedIn().then(function (isLoggedIn) {
                if (isLoggedIn) {
                    // Nếu người dùng đã đăng nhập, lưu từng sản phẩm vào server theo số lượng
                    $http.post('http://localhost:8080/api/ol/cart/saveAll', localStorageData)
                        .then(function (response) {
                            console.log(response);
                            if (response.data) {
                                console.log("Sản phẩm đã được lưu vào server.");
                                localStorage.removeItem("cart");
                                localStorageData = null;
                                console.log(localStorageData);
                                $scope.cartItems = null;
                                $scope.cart.items.splice(0, this.items.length);
                                console.log($scope.cart.items);
                                // Lưu thay đổi vào localStorage
                                $scope.cart.saveToLocalStorage();
                            } else {
                                console.log("Không thể lưu sản phẩm lên server.");
                            }
                        })
                        .catch(function (error) {
                            console.error("Lỗi khi thực hiện API:", error);
                        });
                }
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
          reloadCartItems();
    checkCart();

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
      status: 1,
    
      get billDetail(){
          return $scope.cartItems.map(item => {
              return {
                productDetail:{id: item.id},
                  price: item.price,
                  quantity: item.quantity,
                  status: 1
                  
              }
          });
      },
      purchase(){
         var bill = angular.copy(this);
         bill.totalAmount = $scope.totalAmount;
         bill.address = $scope.address;
         $http.post("http://localhost:8080/api/ol/bill/create",bill).then(resp => {
             alert("Dat hang thanh cong");
             console.log(bill)
             $scope.cart.clear();
            //  location.href = "/order/detail/" + resp.data.id;
         }).catch(error => {
             alert("Dat hang loi")
             console.log(error)
         })
      }
  }


  $scope.initialize();


  $scope.dataFill = null;
  //Data fill

function reloadHomeDataFill() {
  $http.get('http://localhost:8080/api/ol/products/dataFill')
      .then(function (response) {
        if (response.data) {
            $scope.dataFill = response.data;
        }
      });
}

reloadHomeDataFill();

  //Validate

  $scope.checkQuantityChange = function(item) {
    if (isNaN(item.quantity) || item.quantity < 1 || !Number.isInteger(item.quantity)) {
      item.quantity = 1; // Set lại giá trị là 1 nếu không hợp lệ
    }
  };
  

  //Js Address

  const host = "https://provinces.open-api.vn/api/";

  const renderData = (array, select) => {
    const element = document.querySelector("#" + select);
    if (element) {
        let row = '<option disable value="">Chọn</option>';
        array.forEach(element => {
            row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
        });
        element.innerHTML = row;
    }
}

  
  const callAPI = (api, callback) => {
      return axios.get(api)
          .then((response) => {
              callback(response.data);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }
  
  const callApiDistrict = (api, dropdownId) => {
      callAPI(api, (data) => {
          renderData(data.districts, dropdownId);
      });
  }
  
  const callApiWard = (api, dropdownId) => {
      callAPI(api, (data) => {
          renderData(data.wards, dropdownId);
      });
  }
  
  const printResult = () => {
    let houseNumber1 = $("#houseNumber1").val();
    let city1 = $("#city1 option:selected").text();
    let district1 = $("#district1 option:selected").text();
    let ward1 = $("#ward1 option:selected").text();

    let result1 = houseNumber1 && district1 && city1 && ward1 ? `${houseNumber1}, ${ward1}, ${district1}, ${city1}` : '';
    $scope.address = result1;


    $("#resultInput1").val(result1);
}
  
  // Load city data for the first set of elements
  callAPI(host + '?depth=1', (data) => {
      renderData(data, "city1");
  });
  
  // Load city data for the second set of elements
  callAPI(host + '?depth=1', (data) => {
      renderData(data, "city2");
  });
  
  // Event listeners and initial call
  $("#city1, #city2, #district1, #district2, #ward1, #ward2, #houseNumber1, #houseNumber2").on('change input', function () {
      const id = $(this).attr("id");
  
      if (id.startsWith("city")) {
          const districtId = id.replace("city", "district");
          const selectedCityId = $(this).find(':selected').data('id');
          $("#" + districtId).empty().html('<option value="" selected>Chọn quận huyện</option>');
  
          if (selectedCityId) {
              callApiDistrict(host + "p/" + selectedCityId + "?depth=2", districtId);
          }
      } else if (id.startsWith("district")) {
          const wardId = id.replace("district", "ward");
          const selectedDistrictId = $(this).find(':selected').data('id');
          $("#" + wardId).empty().html('<option value="" selected>Chọn phường xã</option>');
  
          if (selectedDistrictId) {
              callApiWard(host + "d/" + selectedDistrictId + "?depth=2", wardId);
          }
      }
  
      printResult();
  });
  
  // Initial call when the page loads
  printResult();
  
});

