let app_employee = angular.module("employee", []);

app_employee.controller("employee-ctrl", function ($scope, $http, $timeout) {
    $scope.employee = [];
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

    $scope.initialize = function () {
        $http.get("/employee").then(function (resp) {
            $scope.employee = resp.data;
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

    $scope.edit = function (employee) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(employee);
        } else {
            $scope.formUpdate = angular.copy(employee);
            $scope.formUpdate.updatedAt = new Date();
        }
    }


    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        $http.post("/employee", item).then(function (resp) {
            $scope.showSuccessMessage("Create employee successfully");
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
        $http.put(`/employee/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update employee successfully");
            $scope.resetFormUpdate();
            $scope.initialize();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
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
        $scope.formUpdateEmployee.$setPristine();
        $scope.formUpdateEmployee.$setUntouched();
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateEmployee.$setPristine();
        $scope.formCreateEmployee.$setUntouched();
    }// getById Employee
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
        $http.get(apiUrlEmployee + "/excel").then(function (response) {
            // $scope.pageEm = response.data.content;
            // $scope.totalPages = response.data.totalPages
        })
    }

    $scope.paper = {
        page: 0,
        size: 5,
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
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        }
    }
});