var app3 = angular.module('resetPass', ['ngRoute']);
app3.controller('resetPassCtrcl', function ($scope, $http, $location) {

    $scope.resetPass = function () {
        // Lấy userName từ localStorage
        var email = localStorage.getItem('email');

        if (!email) {
            console.error('Không tìm thấy tên người dùng');
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
            .then(function (response) {
                if (response.data === true) {
                    console.log('Đặt lại mật khẩu thành công!');
                    localStorage.removeItem('email');

                    // Thực hiện các hành động sau khi reset mật khẩu thành công
                    window.location.href = 'http://127.0.0.1:5500/login/login.html';

                } else {
                    console.log('Đặt lại mật khẩu không thành công!');
                    // Thực hiện xử lý khi quá trình reset mật khẩu không thành công
                }
            })
            .catch(function (error) {
                console.error('Lỗi đặt lại mật khẩu:', error);
            });
    };
});

var app2 = angular.module('otp', ['ngRoute']);

app2.controller('otpCtrcl', function ($scope, $http, $location) {


    $scope.forgotPassword = function () {
        $http.post('http://localhost:8080/auth/forgot-password/' + $scope.email)
            .then(function (response) {
                $scope.message = response.data.message; // Lưu thông báo từ server để hiển thị cho người dùng
            })
            .catch(function (error) {
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

    $scope.submitOTP = function () {

        var data = {
            email: $scope.email,
            enteredOTP: $scope.otp
        };
        console.log(data)

        $http.post('http://localhost:8080/auth/confirm-otp', data)
            .then(function (response) {
                // Xử lý kết quả từ server sau khi xác nhận OTP thành công
                if (response.data === true) {
                    localStorage.setItem('email', $scope.email);
                    console.log('OTP được xác nhận thành công!');
                    // Thực hiện các hành động khác sau khi xác nhận mã OTP thành công
                    window.location.href = 'http://127.0.0.1:5500/resetPass.html';

                } else {
                    // Mã OTP không hợp lệ
                    console.log('OTP không hợp lệ!');
                    // Thực hiện xử lý khi mã OTP không hợp lệ
                }
            })
            .catch(function (error) {
                console.error('Lỗi xác nhận OTP:', error);
            });
    };

});

var app = angular.module('security2', ['ngRoute']);

app.controller('LoginCtrl2', function ($scope, $http, $location) {

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


    $scope.login = function () {
        console.log('Login successful:');

        if (!$scope.username || !$scope.password) {
            alert('Vui lòng điền đầy đủ thông tin tên người dùng và mật khẩu.');
            return true;
        }

        var data = {
            username: $scope.username,
            password: $scope.password
        };
        $http.post('http://localhost:8080/auth/login', data)
            .then(function (response) {
                // Lưu token vào Local Storage
                localStorage.setItem('token', response.data.token);
                console.log('Đăng nhập thành công:', response.data.token);
                alert('Đăng nhập thành công');

                window.location.href = 'http://127.0.0.1:5502/olView/index.html#!/home';
            })
            .catch(function (error) {
                if (error.status === 404) {
                    alert('Tài khoản không tồn tại.');
                } else if (error.status === 401) {
                    alert('Sai tên người dùng hoặc mật khẩu.');
                } else {
                    alert('Đăng nhập không thành công.');
                }
                console.error('Đăng nhập không thành công:', error);
            });
    };

    $scope.validateEmail = function (email) {
        // Biểu thức chính quy kiểm tra định dạng email
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailPattern.test(email);
    };
    
    $scope.registerUser = function () {
        // Kiểm tra xem các trường thông tin đăng ký đã được điền đầy đủ hay không
        if (!$scope.user.lastName || !$scope.user.firstName || !$scope.user.email || !$scope.user.account || !$scope.user.password || !$scope.user.confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return true;
        } else if (!$scope.validateEmail($scope.user.email)) {
            alert('Định dạng email không hợp lệ');
            return true;
        } else if ($scope.user.password !== $scope.user.confirmPassword) {
            alert('Mật khẩu xác nhận không khớp');
            return true;
        }
    
        // Gọi API để kiểm tra email đã được sử dụng trước đó hay chưa
        $http.post('http://localhost:8080/account/check-email', { email: $scope.user.email })
            .then(function (emailResponse) {
                if (emailResponse.data.exists) {
                    alert('Email đã được sử dụng. Vui lòng chọn email khác.');
                    return;
                } else {
                    // Nếu email chưa được sử dụng, tiến hành kiểm tra account
                    $http.post('http://localhost:8080/account/check-account', { account: $scope.user.account })
                        .then(function (accountResponse) {
                            if (accountResponse.data.exists) {
                                alert('Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.');
                                return;
                            } else {
                                // Nếu cả email và account đều chưa được sử dụng, thực hiện đăng ký
                                $http.post('http://localhost:8080/auth/register', $scope.user)
                                    .then(function (registerResponse) {
                                        console.log('Kết quả từ API:', registerResponse.data);
                                        alert('Đăng ký thành công');
    
                                        // Xử lý kết quả từ API khi đăng ký thành công
                                    })
                                    .catch(function (registerError) {
                                        alert('Đăng kí thất bại');
                                        console.error('Lỗi khi gọi API:', registerError);
                                    });
                            }
                        })
                        .catch(function (accountError) {
                            alert('Lỗi khi kiểm tra account:', accountError);
                            console.error('Lỗi khi kiểm tra account:', accountError);
                        });
                }
            })
            .catch(function (emailError) {
                alert('Lỗi khi kiểm tra email:', emailError);
                console.error('Lỗi khi kiểm tra email:', emailError);
            });
    };
    


    $scope.logout = function () {
        // Xóa token khỏi localStorage
        localStorage.removeItem('token');
        alert('Đăng xuất thành công');

        window.location.href = 'http://127.0.0.1:5502/olView/index.html#!/home';

        // Reset trạng thái của ứng dụng
        // $scope.isCustomerLoggedIn = false;
        // $scope.isEmployeeLoggedIn = false;
        // $scope.customerData = null; 

        // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chính (tùy theo logic của bạn)
        // $location.path('/login'); // hoặc $location.path('/home');
    };

});


