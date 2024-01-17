app.controller("size-ctrl", function ($scope, $http, $timeout) {
    $scope.originalSize = [];
    $scope.size = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();
    const apiSize = "http://localhost:8080/api/size";
  
    $scope.showSuccessMessage = function (message) {
      $scope.alertMessage = message;
      $scope.showAlert = true;
      $timeout(function () {
        $scope.closeAlert();
      }, 5000);
    };
  
    $scope.closeAlert = function () {
      $scope.showAlert = false;
    };
  
    $scope.search = function () {
      // Kiểm tra từ khóa tìm kiếm
      if ($scope.searchKeyword.trim() !== "") {
        $scope.size = $scope.originalSize.filter(function (item) {
          if (item && item.name) {
            return item.name
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
          }
          return false;
        });
      } else {
        // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalSize
        $scope.size = angular.copy($scope.originalSize);
      }
      // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
      $scope.changePageSize();
    };
  
    $scope.initialize = function () {
      $http.get(apiSize).then(function (resp) {
        $scope.originalSize = resp.data; // Lưu dữ liệu gốc
        $scope.size = angular.copy($scope.originalSize); // Sao chép dữ liệu gốc sang mảng hiển thị
      });
    };
  
    $scope.initialize();
  
    $scope.edit = function (size) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(size);
      } else {
        $scope.formUpdate = angular.copy(size);
        $scope.formUpdate.updatedAt = new Date();
      }
    };
  
    // $scope.create = function () {
    //     let item = angular.copy($scope.formInput);
    //     item.createdAt = $scope.currentDate;
    //     $http.post("/size", item).then(function (resp) {
    //         $scope.showSuccessMessage("Create size successfully");
    //         $scope.resetFormInput();
    //         $scope.initialize();
    //         $('#modalAdd').modal('hide');
    //     }).catch(function (error) {
    //         console.log("Error", error);
    //     });
    // }
    $scope.create = function () {
      let item = angular.copy($scope.formInput);
      item.createdAt = $scope.currentDate;
      $http
        .post(apiSize, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create Size successfully");
          $scope.resetFormInput();
          $scope.initialize();
          $("#modalAdd").modal("hide");
        })
        .catch(function (error) {
          if (error.status === 400 && error.data === "Name already exists") {
            $scope.nameExists = true;
          } else {
            console.log("Error", error);
          }
        });
    };
  
    $scope.update = function () {
      let item = angular.copy($scope.formUpdate);
      console.log(item);
      item.updatedAt = $scope.currentDate;
      $http
        .put(apiSize + `${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update Size successfully");
          $scope.resetFormUpdate();
          $scope.initialize();
          $("#modalUpdate").modal("hide");
        })
        .catch(function (error) {
          if (error.status === 400 && error.data === "Name already exists") {
            $scope.nameExists = true;
          } else {
            console.log("Error", error);
          }
        });
    };
  
    $scope.delete = function (item) {
      $http
        .delete(apiSize + `/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete Size successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateSize.$setPristine();
      $scope.formUpdateSize.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateSize.$setPristine();
      $scope.formCreateSize.$setUntouched();
    };
  
    $scope.changePageSize = function () {
      $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };
  
    $scope.paper = {
      page: 0,
      size: 5, // Kích thước mặc định ban đầu
      get items() {
        let start = this.page * this.size;
        return $scope.size.slice(start, start + this.size);
      },
      get count() {
        return Math.ceil((1.0 * $scope.size.length) / this.size);
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
      },
    };
  });
  