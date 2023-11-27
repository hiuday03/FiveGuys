let app_employee = angular.module("employee", []);

app_employee.controller("employee-ctrl", function ($scope, $http, $timeout) {
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