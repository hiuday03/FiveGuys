var app = angular.module("employee-list-app", [])
app.controller("employee-list-controller", function ($scope, $http, $timeout) {

    const apiUrlEmployee = "http://localhost:8080/api/employee";
    const apiUrlRole = "http://localhost:8080/api/roles";
    $scope.employee = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;

    // get Employee
    $scope.getAll = function () {
        $http.get(apiUrlEmployee).then(function (response) {
            $scope.listEm = response.data;
            // $scope.totalPages = response.totalPages;
        })
    }
    $scope.getAll();

    // getById Employee
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

    $scope.getAll();

    // get Role
    $scope.getRole = function () {
        $http.get(apiUrlRole).then(function (response) {
            $scope.listRole = response.data;
            // console.log($scope.listRole);
        })
    }
    $scope.getRole();

    $scope.edit = function (employee) {
        $scope.formUpdate = angular.copy(employee);
        $scope.formUpdate.valid_form = new Date(employee.valid_form)
        $scope.formUpdate.valid_until = new Date(employee.valid_until); // Hoặc là giá trị ngày mặc định của bạn
    }

    //delete Employ
    $scope.delete = function (item) {
        $http.delete(`/api/employee/${item.id}`).then(function (response) {
            $scope.getAll();
            console.log(item.id);
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    // create Employee
    $scope.addEmploy = function () {
        let item = angular.copy($scope.formInput);
        $http.post("/api/employee", item).then(function (resp) {
            $scope.showSuccessMessage("Create customer successfully");
            $scope.resetFormInput();
            $scope.getAll();
            $('#modalAdd').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }
    // update Employee
    $scope.updateEmploy = function () {
        // let item = angular.copy($scope.formInput);
        let item = angular.copy($scope.formUpdate);
        console.log(item)
        $http.put(`/api/employee/${item.id}`, item).then(function (resp) {
            $scope.showSuccessMessage("Update customer successfully");
            $scope.resetFormUpdate();
            $scope.getAll();
            $('#modalUpdate').modal('hide');
        }).catch(function (error) {
            console.log("Error", error);
        });
    }
    $scope.updateStatusEmployee = function (item) {
        console.log(item)
        $http.put(`/api/employee/delete/${item.id}`, item).then(function (resp) {
            $scope.getAll();
            console.log(item.id);
        })
    }

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.addformEmployee.$setPristine();
        $scope.addformEmployee.$setUntouched();
    }
    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateEmployee.$setPristine();
        $scope.formUpdateEmployee.$setUntouched();
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

    $scope.paper = {
        page: 0,
        size: 5,
        get items() {
            let start = this.page * this.size;
            if ($scope.listEm) {
                return $scope.listEm.slice(start, start + this.size);
            }
        },
        get count() {
            if ($scope.listEm) {
                return Math.ceil(1.0 * $scope.listEm.length / this.size);
            }

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
})