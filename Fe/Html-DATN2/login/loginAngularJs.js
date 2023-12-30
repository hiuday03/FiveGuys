
var app3= angular.module('resetPass', ['ngRoute']);


app3.controller('resetPassCtrcl', function ($scope, $http, $location) {

    $scope.resetPass = function() {
        // Lấy userName từ localStorage
        var email = localStorage.getItem('email');
    
        if (!email) {
            console.error('User name not found in localStorage');
            return;
        }
    
        if ($scope.password !== $scope.passwordCheck) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }
    
        // Tạo đối tượng data để gửi đi thông qua API
        var data = {
            email: email,
            newPassword: $scope.password
        };
    
        // Gọi API để reset mật khẩu
        $http.post('http://localhost:8080/auth/reset-password', data)
        .then(function(response) {
            if (response.data === true) {
                console.log('Password reset successful!');
         localStorage.removeItem('email');

                // Thực hiện các hành động sau khi reset mật khẩu thành công
        window.location.href = 'http://127.0.0.1:5502/login/login.html';

            } else {
                console.log('Password reset failed!');
                // Thực hiện xử lý khi quá trình reset mật khẩu không thành công
            }
        })
        .catch(function(error) {
            console.error('Error resetting password:', error);
        });
    };
    
  
});





var app2 = angular.module('otp', ['ngRoute']);


app2.controller('otpCtrcl', function ($scope, $http, $location) {


    $scope.forgotPassword = function() {
        $http.post('http://localhost:8080/auth/forgot-password/' + $scope.email)
            .then(function(response) {
                $scope.message = response.data.message; // Lưu thông báo từ server để hiển thị cho người dùng
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
    };

    $scope.resendOTP = function () {
        $http.post('http://localhost:8080/auth/reSendOTP/' + $scope.email)
            .then(function (response) {
                console.log('Gửi lại OTP thành công:', response.data);
                // Xử lý kết quả nếu cần thiết
            })
            .catch(function (error) {
                console.error('Lỗi khi gửi lại OTP:', error);
            });
    };

    $scope.submitOTP = function() {

        var data = {
            email: $scope.email,
            enteredOTP: $scope.otp
        };
        console.log(data)

        $http.post('http://localhost:8080/auth/confirm-otp', data)
            .then(function(response) {
                // Xử lý kết quả từ server sau khi xác nhận OTP thành công
                if (response.data === true) {
                    localStorage.setItem('email', $scope.email);
                    console.log('OTP confirmed successfully!');
                    // Thực hiện các hành động khác sau khi xác nhận mã OTP thành công
        window.location.href = 'http://127.0.0.1:5502/login/resetPass.html';

                } else {
                    // Mã OTP không hợp lệ
                    console.log('Invalid OTP!');
                    // Thực hiện xử lý khi mã OTP không hợp lệ
                }
            })
            .catch(function(error) {
                console.error('Error confirming OTP:', error);
            });
    };

});








var app = angular.module('security2', ['ngRoute' , 'ngCookies']);


app.controller('LoginCtrl2', function ($scope, $http,$location,$cookies) {

    // app.config(function ($routeProvider) {
    //     $routeProvider
    //         .when('/forgotPass', {
    //             templateUrl: 'login/forgotPassword.html',
    //             controller: 'LoginCtrl' // Controller cho trang này (nếu cần)
    //         })        
    //         .when('/login', {
    //             templateUrl: 'login/index.html',
    //             controller: 'LoginCtrl' // Controller cho trang này (nếu cần)
    //         })
    //         .otherwise({ redirectTo: '/login' }); // Route mặc định
    // });
    

    $scope.user = {};


    $scope.login = function() {
        console.log('Login successful:');
    
        var data = {
            username: $scope.username,
            password: $scope.password
        };
        $http.post('http://localhost:8080/auth/login', data)
            .then(function(response) {
                localStorage.setItem('token', response.data.token);
                console.log('Login successful:', response.data.token);
                alert('Login successful');
    
                window.location.href = 'http://127.0.0.1:5502/olView/index.html#!/home';
            })
            .catch(function(error) {
                alert('Login failed');
                console.error('Login failed:', error);
            });
    };



    $scope.registerUser = function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp');
            return;
        }

        // Gọi API đăng ký
        $http.post('http://localhost:8080/auth/register', $scope.user)
            .then(function(response) {
                console.log('Kết quả từ API:', response.data);
                alert('Register success');

                // Xử lý kết quả từ API
            })
            .catch(function(error) {
                alert('Register failed');

                console.error('Lỗi khi gọi API:', error);
            });
    };
    

    $scope.logout = function() {
        // Xóa token từ cookie
        localStorage.removeItem('token');
        alert('logout success');
        window.location.href = 'http://127.0.0.1:5502/olView/index.html#!/home';
    };
    




});


