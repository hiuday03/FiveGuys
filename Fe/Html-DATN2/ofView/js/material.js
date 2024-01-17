app.controller("material-ctrl", function ($scope, $http, $timeout) {
    $scope.originalMaterial = [];
    $scope.material = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();
    const apiMaterial = "http://localhost:8080/api/material";
  
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
        $scope.material = $scope.originalMaterial.filter(function (item) {
          if (item && item.name) {
            return item.name
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
          }
          return false;
        });
      } else {
        // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalMaterial
        $scope.material = angular.copy($scope.originalMaterial);
      }
      // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
      $scope.changePageSize();
    };
  
    $scope.initialize = function () {
      $http.get(apiMaterial).then(function (resp) {
        $scope.originalMaterial = resp.data; // Lưu dữ liệu gốc
        $scope.material = angular.copy($scope.originalMaterial); // Sao chép dữ liệu gốc sang mảng hiển thị
      });
    };
  
    $scope.initialize();
  
    $scope.edit = function (material) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(material);
      } else {
        $scope.formUpdate = angular.copy(material);
        $scope.formUpdate.updatedAt = new Date();
      }
    };
  
    // $scope.create = function () {
    //     let item = angular.copy($scope.formInput);
    //     item.createdAt = $scope.currentDate;
    //     $http.post("/material", item).then(function (resp) {
    //         $scope.showSuccessMessage("Create material successfully");
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
        .post(apiMaterial, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create Material successfully");
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
        .put(apiMaterial + `${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update Material successfully");
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
        .delete(apiMaterial + `/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete Material successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateMaterial.$setPristine();
      $scope.formUpdateMaterial.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateMaterial.$setPristine();
      $scope.formCreateMaterial.$setUntouched();
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
  