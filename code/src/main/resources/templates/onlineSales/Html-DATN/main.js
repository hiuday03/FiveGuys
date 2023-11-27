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
  .when("/product", {
    templateUrl : "product.html",
    controller : "myApp-ctrl"
  });
});

app.controller("myApp-ctrl", function ($scope,$rootScope, $http, $timeout, $routeParams,$location) {
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
  $scope.selectedSizes = [];
  $scope.selectedColors = [];
  $scope.selectedMaterials = [];
  $scope.selectedCategories = [];
  // $rootScope.products = [];
  $scope.dataFill = null;
  $scope.selectedSortType = '0';
  reloadHomeDataFill();


  function reloadHomeDataFill() {
    $http.get('http://localhost:8080/api/ol/products/dataFill')
        .then(function (response) {
          if (response.data) {
              $scope.dataFill = response.data;

    console.log($scope.dataFill)
          }
        });
  }

  
  $scope.initialize = function () {
    var params = $location.search();

    if (params.categories && params.categories.length > 0) {
        $scope.selectedCategories = JSON.parse(params.categories);
    }

    $scope.currentPage = params.page || 0;
    $scope.loadData();
};

$scope.loadData = function () {
  $scope.loadPage($scope.currentPage);
  // $scope.updateSelectedColorsState();
};
  // Page

  $scope.loadPage = function (page) {

    var selectedSortType = $scope.selectedSortType;

    var categoryId = $routeParams.categoryId;
    if (categoryId) {
      $scope.selectedCategories = [categoryId];
    }
    var params = {
      page: $scope.currentPage,
    sizes: $scope.selectedSizes, 
    colors: $scope.selectedColors, 
    categories: $scope.selectedCategories, 
    materials: $scope.selectedMaterials,
    sortType: selectedSortType
    };

    // Gọi API backend với các tham số tương ứng
    $http.get('http://localhost:8080/api/ol/products', { params: params }).then(function(response) {
      if (response.data) {
        $scope.products = response.data.content;
        $scope.totalPages = response.data.totalPages;
      }
    }, function(error) {
      console.error('Error fetching products:', error);
    });
  };

  $scope.initialize();


  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPages - 1) {
        $scope.currentPage++;
        $location.search('page', $scope.currentPage);
        $location.search('categories', JSON.stringify($scope.selectedCategories));
        $scope.loadData(); // Load lại dữ liệu sau khi đã cập nhật trang và thể loại
    }
};

$scope.prevPage = function () {
    if ($scope.currentPage > 0) {
        $scope.currentPage--;
        $location.search('page', $scope.currentPage);
        $location.search('categories', JSON.stringify($scope.selectedCategories));
        $scope.loadData(); // Load lại dữ liệu sau khi đã cập nhật trang và thể loại
    }
};

  
  // Page



$scope.updateSelectedSizes = (selectedSize) => {
  selectedSize.isSelected = !selectedSize.isSelected; 
  $scope.selectedSizes = $scope.dataFill.sizeList
    .filter((size) => size.isSelected)
    .map((selectedSize) => selectedSize.id);
  // localStorage.setItem('selectedSizes', JSON.stringify($scope.selectedSizes));
  $scope.loadData();
};

$scope.updateSelectedColors = (selectedColor) => {
  selectedColor.isSelected = !selectedColor.isSelected; 
  $scope.selectedColors = $scope.dataFill.colorList
    .filter((color) => color.isSelected)
    .map((selectedColor) => selectedColor.id);
  // localStorage.setItem('selectedColors', JSON.stringify($scope.selectedColors));
  $scope.loadData();
};

$scope.updateSelectedMaterials = (selectedMaterial) => {
  selectedMaterial.isSelected = !selectedMaterial.isSelected; 
  $scope.selectedMaterials = $scope.dataFill.materialList
    .filter((material) => material.isSelected)
    .map((selectedMaterial) => selectedMaterial.id);
  // localStorage.setItem('selectedMaterials', JSON.stringify($scope.selectedMaterials));
  $scope.loadData();
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
        }
     
      });
}


// Giỏ hàng người dùng
function checkCart() {
  isUserLoggedIn().then(function (isLoggedIn) {
      if (!isLoggedIn) {
        $scope.cartItems = $scope.cart.items;
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
              $scope.totalAmountAfterDiscount = $scope.totalAmount;
          } else {
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
            $scope.applyVoucher();
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
          $scope.applyVoucher();


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
          $scope.applyVoucher();


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
          $scope.applyVoucher();

      });
  },

        // Tính thành tiền các mặt hàng trong giỏ
        amt_of(){},

        // Tính tổng số lượng các mặt hàng trong giỏ
      
      // get amount() {
      //     if ($scope.isUserLoggedIn && $scope.cartItems) {
      //         // Lọc $scope.cartItem và tính tổng giá trị
      //         return $scope.cartItems.reduce((total, item) => total + item.quantity * item.productDetail.price, 0);
      //     } else if ($scope.cartItems) {
      //         // Tính tổng giá trị từ local storage
      //         return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
      //     }
      //     return 0; 
      // },
      saveDataAndClearLocalStorage() {
        // Kiểm tra xem local storage có dữ liệu hay không
        var localStorageData = JSON.parse(localStorage.getItem("cart"));
      
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
                                $scope.cartItems = null;
                                $scope.cart.items.splice(0, this.items.length);
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
         bill.totalAmountAfterDiscount = $scope.totalAmountAfterDiscount;
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






// Controller code
$scope.selectedVoucher = null
$scope.selectVoucher = function(selectedVoucher) {
  if ($scope.selectedVoucher === selectedVoucher) {
    $scope.selectedVoucher = null; // Nếu đã chọn voucher này rồi thì bỏ chọn nó
    selectedVoucher.selected = false;
    $scope.applyVoucher();
  } else {
    $scope.selectedVoucher = selectedVoucher;
    angular.forEach($scope.listVouchers, function(voucher) {
      voucher.selected = false; // Reset các voucher khác đã được chọn trước đó
    });
    selectedVoucher.selected = true; // Đánh dấu voucher hiện tại là đã chọn
    $scope.applyVoucher();

  }
};


$scope.valueVoucher = 0;
$scope.voucherMessage = ''; // Khởi tạo thông điệp rỗng ban đầu


$scope.applyVoucher= function () {
  if ($scope.selectedVoucher != null){

  if ( $scope.selectedVoucher.quantity > 0) {
    if ($scope.totalAmount >= $scope.selectedVoucher.minimumTotalAmount) {
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

      $scope.valueVoucher = 0;
    $scope.voucherMessage = 'Mã giảm giá ' + $scope.selectedVoucher.code + ' chỉ sử dụng cho đơn hàng có tổng trị giá trên ' + $scope.selectedVoucher.minimumTotalAmount;
    // $scope.selectedVoucher = null;
    }
  }
}else{
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

  $scope.selectPaymentMethod = function(selectPaymentMethod) {
   if(selectPaymentMethod != null){
    $scope.selectedPaymentMethod = selectPaymentMethod;
   }
  };

  //Validate

  $scope.checkQuantityChange = function(item) {
    if (isNaN(item.quantity) || item.quantity < 1 || !Number.isInteger(item.quantity)) {
      item.quantity = 1; // Set lại giá trị là 1 nếu không hợp lệ
    }
  };
  
  $scope.openVoucherModal = function() {
    $('#voucherModal').modal('show');
  };

  // JS Search home
  $scope.overlayActive = false;

  $scope.toggleOverlay = function() {
      $scope.overlayActive = !$scope.overlayActive;
  };

  $scope.openOverlay = function() {
      $scope.overlayActive = true;
  };

  $scope.search = function() {
      // Xử lý tìm kiếm tại đây
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

