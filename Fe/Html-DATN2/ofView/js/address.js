
app.controller("address-ctrl", function ($scope, $http, $timeout) {
    $scope.originalAddress = [];
    $scope.address = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();
    const apiAddress = "http://localhost:8080/address";
    const apiCustomer = "http://localhost:8080/customer";

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

    $scope.timkiemStatus = function () {
        if ($scope.formtimkiem === "1") {
            $http.get(apiAddress + "/timkiem-status/1").then(function (response) {
                $scope.listVoucher = response.data;
            });
        } else if ($scope.formtimkiem === "2") {
            $http.get(apiAddress + "/timkiem-status/2").then(function (response) {
                $scope.listVoucher = response.data;
            });
        } else if ($scope.formtimkiem === "0") {
            $http.get(apiAddress + "/timkiem-status/0").then(function (response) {
                $scope.listVoucher = response.data;
            });
        } else if ($scope.formtimkiem === "1") {
            $http.get(apiAddress).then(function (response) {
                $scope.listVoucher = response.data;
            });
        }
    };
    $scope.timkiemStatus();

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== "") {
            $scope.address = $scope.originalAddress.filter(function (item) {
                if (item && item.address) {
                    return item.address
                        .toLowerCase()
                        .includes($scope.searchKeyword.toLowerCase());
                }
                return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalAddress
            $scope.address = angular.copy($scope.originalAddress);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };
    $scope.initialize = function () {
        $http.get(apiAddress).then(function (resp) {
            $scope.originalAddress = resp.data;
            $scope.address = angular.copy($scope.originalAddress);
        });
    };

    $scope.initialize();

    // $scope.customers = []; // Khởi tạo danh sách khách hàng

    $scope.loadCustomers = function () {
        $http
            .get(apiCustomer) // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    };

    $scope.loadCustomers(); // Gọi hàm để nạp danh sách khách hàng khi controller khởi chạy

    $scope.edit = function (address) {
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(address);
        } else {
            $scope.formUpdate = angular.copy(address);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
    };
    // $scope.edit = function (address) {
    //     $scope.formUpdate = angular.copy(address);
    // }

    $scope.create = function () {
        let item = angular.copy($scope.formInput);
        item.createdAt = $scope.currentDate;
        item.address = getResult1();

        $http
            .post(apiAddress, item)
            .then(function (resp) {
                $scope.showSuccessMessage("Create address successfully");
                $scope.resetFormInput();
                $scope.initialize();
                $("#modalAdd").modal("hide");
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };
    function getResult1() {
        let houseNumber1 = $("#houseNumber1").val();
        let city1 = $("#city1 option:selected").text();
        let district1 = $("#district1 option:selected").text();
        let ward1 = $("#ward1 option:selected").text();

        return houseNumber1 && district1 && city1 && ward1
            ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
            : "";
    }

    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item);
        item.updatedAt = $scope.currentDate;
        item.address = getResult2();

        $http
            .put(apiAddress + `/${item.id}`, item)
            .then(function (resp) {
                $scope.showSuccessMessage("Update address successfully");
                $scope.resetFormUpdate();
                $scope.initialize();
                $("#modalUpdate").modal("hide");
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };
    function getResult2() {
        let houseNumber2 = $("#houseNumber2").val();
        let city2 = $("#city2 option:selected").text();
        let district2 = $("#district2 option:selected").text();
        let ward2 = $("#ward2 option:selected").text();

        return houseNumber2 && district2 && city2 && ward2
            ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
            : "";
    }

    $scope.delete = function (item) {
        $http
            .delete(apiAddress + `/${item.id}`)
            .then(function (resp) {
                $scope.showSuccessMessage("Delete address successfully");
                $scope.initialize();
            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };

    $scope.resetFormUpdate = function () {
        $scope.formUpdate = {};
        $scope.formUpdateAddress.$setPristine();
        $scope.formUpdateAddress.$setUntouched();
    };

    $scope.resetFormInput = function () {
        $scope.formInput = {};
        $scope.formCreateAddress.$setPristine();
        $scope.formCreateAddress.$setUntouched();
    };

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.address.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil((1.0 * $scope.address.length) / this.size);
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

    const host = "https://provinces.open-api.vn/api/";

    var callAPI = (api, callback) => {
        return axios
            .get(api)
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    // Load city data for the first set of elements
    callAPI(host + "?depth=1", (data) => {
        renderData(data, "city1");
    });

    // Load city data for the second set of elements
    callAPI(host + "?depth=1", (data) => {
        renderData(data, "city2");
    });

    var callApiDistrict = (api, dropdownId) => {
        callAPI(api, (data) => {
            renderData(data.districts, dropdownId);
        });
    };

    var callApiWard = (api, dropdownId) => {
        callAPI(api, (data) => {
            renderData(data.wards, dropdownId);
        });
    };

    var renderData = (array, select) => {
        let row = '<option disable value="">Chọn</option>';
        array.forEach((element) => {
            row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
        });
        document.querySelector("#" + select).innerHTML = row;
    };

    $("#city1, #city2").change(function () {
        const dropdownId = $(this).attr("id");
        const districtDropdownId = dropdownId.replace("city", "district");
        const selectedCityId = $(this).find(":selected").data("id");

        // Clear district and ward dropdowns
        $("#" + districtDropdownId)
            .empty()
            .html('<option value="" selected>Chọn quận huyện</option>');

        const wardDropdownId = dropdownId.replace("city", "ward");
        $("#" + wardDropdownId)
            .empty()
            .html('<option value="" selected>Chọn phường xã</option>');

        if (selectedCityId) {
            callApiDistrict(
                host + "p/" + selectedCityId + "?depth=2",
                districtDropdownId
            );
        }
        printResult();
    });

    $("#district1, #district2").change(function () {
        const dropdownId = $(this).attr("id");
        const wardDropdownId = dropdownId.replace("district", "ward");
        const selectedDistrictId = $(this).find(":selected").data("id");

        $("#" + wardDropdownId)
            .empty()
            .html('<option value="" selected>Chọn phường xã</option>');

        if (selectedDistrictId) {
            callApiWard(
                host + "d/" + selectedDistrictId + "?depth=2",
                wardDropdownId
            );
        }
        printResult();
    });

    $("#ward1, #ward2, #houseNumber1, #houseNumber2").on(
        "change input",
        function () {
            printResult();
        }
    );

    var printResult = () => {
        let houseNumber1 = $("#houseNumber1").val();
        let city1 = $("#city1 option:selected").text();
        let district1 = $("#district1 option:selected").text();
        let ward1 = $("#ward1 option:selected").text();

        let houseNumber2 = $("#houseNumber2").val();
        let city2 = $("#city2 option:selected").text();
        let district2 = $("#district2 option:selected").text();
        let ward2 = $("#ward2 option:selected").text();

        let result1 =
            houseNumber1 && district1 && city1 && ward1
                ? `Số nhà ${houseNumber1}, ${ward1}, ${district1}, ${city1}`
                : "";
        let result2 =
            houseNumber2 && district2 && city2 && ward2
                ? `Số nhà ${houseNumber2}, ${ward2}, ${district2}, ${city2}`
                : "";

        $("#inputAddress1").val(result1);
        $("#inputAddress2").val(result2);
    };

    // Initial call when the page loads
    printResult();
});