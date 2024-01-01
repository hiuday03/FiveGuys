
// import generateInvoiceHTML from './invoice.js';


var app = angular.module("myAppOfView", ["ngRoute", "angular-jwt"]);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.factory('authInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
    return {
        'request': function(config) {
            // Lấy token từ localStorage
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


  // Tham khao
  .when("/homeTest/123", {
    templateUrl : "thamkhao/homeTest.html",
    controller : "myAppOfView-ctrl"
  })
  .when("/productTest", {
    templateUrl : "thamkhao/productTest.html",
    controller : "myAppOfView-ctrl"
  })
  .when("/cartTest", {
    templateUrl : "thamkhao/cartTest.html",
    controller : "myAppOfView-ctrl2"
  })
  // Tham khao
  // <!-- Thuong -->




// <!-- Hieu -->




// <!-- Nguyen -->




// <!-- Tinh -->


  ;
});

app.controller("myAppOfView-ctrl", function ($scope,$rootScope, $http, $routeParams,$location,jwtHelper) {

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
app.controller("myAppOfView-ctrl2", function ($scope,$rootScope, $http, $routeParams,$location,jwtHelper) {
  console.log("myAppOfView-ctrl2")

});


// Tạo cái mới đừng dùng những cái có sẵn chỉ để tham khảo
// Các phím tắt khi sử dụng visual
// https://www.thegioididong.com/game-app/tong-hop-cac-phim-tat-trong-visual-studio-code-giup-lap-trinh-1314635

