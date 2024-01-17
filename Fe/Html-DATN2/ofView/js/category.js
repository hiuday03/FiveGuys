
app.controller("category-ctrl", function ($scope, $http, $timeout) {
    $scope.originalCategory = [];
    $scope.category = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();
    const apiCategory = "http://localhost:8080/api/category";
  
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
        $scope.category = $scope.originalCategory.filter(function (item) {
          if (item && item.name) {
            return item.name
              .toLowerCase()
              .includes($scope.searchKeyword.toLowerCase());
          }
          return false;
        });
      } else {
        // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalCategory
        $scope.category = angular.copy($scope.originalCategory);
      }
      // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
      $scope.changePageSize();
    };
  
    $scope.initialize = function () {
      $http.get(apiCategory).then(function (resp) {
        $scope.originalCategory = resp.data; // Lưu dữ liệu gốc
        $scope.category = angular.copy($scope.originalCategory); // Sao chép dữ liệu gốc sang mảng hiển thị
      });
    };
  
    $scope.initialize();
  
    $scope.edit = function (category) {
      if ($scope.formUpdate.updatedAt) {
        $scope.formUpdate = angular.copy(category);
      } else {
        $scope.formUpdate = angular.copy(category);
        $scope.formUpdate.updatedAt = new Date();
      }
    };
  
    // $scope.create = function () {
    //     let item = angular.copy($scope.formInput);
    //     item.createdAt = $scope.currentDate;
    //     $http.post("/category", item).then(function (resp) {
    //         $scope.showSuccessMessage("Create category successfully");
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
        .post(apiCategory, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Create Category successfully");
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
        .put(apiCategory + `${item.id}`, item)
        .then(function (resp) {
          $scope.showSuccessMessage("Update Category successfully");
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
        .delete(apiCategory + `/${item.id}`)
        .then(function (resp) {
          $scope.showSuccessMessage("Delete Category successfully");
          $scope.initialize();
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };
  
    $scope.resetFormUpdate = function () {
      $scope.formUpdate = {};
      $scope.formUpdateCategory.$setPristine();
      $scope.formUpdateCategory.$setUntouched();
    };
  
    $scope.resetFormInput = function () {
      $scope.formInput = {};
      $scope.formCreateCategory.$setPristine();
      $scope.formCreateCategory.$setUntouched();
    };
  
    $scope.changePageSize = function () {
      $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };
  
    $scope.paper = {
      page: 0,
      size: 5, // Kích thước mặc định ban đầu
      get items() {
        let start = this.page * this.size;
        return $scope.category.slice(start, start + this.size);
      },
      get count() {
        return Math.ceil((1.0 * $scope.category.length) / this.size);
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
  