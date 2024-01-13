app.controller("nguyen-bill-ctrl", function ($scope, $http, $timeout) {
    $scope.originalBill = [];
    $scope.bill = [];
    $scope.formUpdate = {};
    $scope.formInput = {};
    $scope.showAlert = false;
    $scope.currentDate = new Date();

    // $scope.typeBill = ""
    // $scope.billStatus = ""
    // $scope.fromDate = null
    // $scope.toDate = null

    // Hàm hiển thị thông báo thành công
    $scope.showSuccessNotification = function (message) {
        toastr["success"](message);
    };
    // Hàm hiển thị thông báo lỗi
    $scope.showErrorNotification = function (message) {
        toastr["error"](message);
    };
    $scope.showWarningNotification = function (message) {
        toastr["warning"](message);
    };

    $scope.search = function () {
        // Kiểm tra từ khóa tìm kiếm
        if ($scope.searchKeyword.trim() !== '') {
            $scope.bill = $scope.originalBill.filter(function (item) {
                // if (item && item.code) {
                return item.code.toLowerCase().includes($scope.searchKeyword.toLowerCase());
                // }
                // return false;
            });
        } else {
            // Nếu từ khóa tìm kiếm trống, hiển thị lại dữ liệu ban đầu từ originalBill
            $scope.bill = angular.copy($scope.originalBill);
        }
        // Sau khi lọc, cập nhật dữ liệu hiển thị cho trang đầu tiên
        $scope.changePageSize();
    };

    $scope.filter = function (fromDate, toDate, filterTypeBill, filterStatus) {
        if (fromDate == null) {
            fromDate = undefined
        }
        if (toDate == null) {
            toDate = undefined
        }
        if (filterTypeBill == "" || filterTypeBill == null) {
            filterTypeBill = undefined
        }
        if (filterStatus == "" || filterStatus == null) {
            filterStatus = undefined
        }

        let a = $scope.originalBill;

        if (fromDate != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getDate() >= new Date(fromDate).getDate())
                    && (new Date(item.createdAt).getFullYear() >= new Date(fromDate).getFullYear())
            })
        }
        if (toDate != undefined) {
            a = a.filter(function (item) {
                return (new Date(item.createdAt).getDate() <= new Date(toDate).getDate())
                    && (new Date(item.createdAt).getFullYear() >= new Date(toDate).getFullYear())
            })
        }
        if (filterStatus != undefined) {
            a = a.filter(function (item) {
                return item.status == filterStatus
            })
        }
        if (filterTypeBill != undefined) {
            a = a.filter(function (item) {
                return item.typeBill == filterTypeBill
            })
        }
        $scope.bill = a;

        // $scope.bill = $scope.originalBill.filter(function (item) {

        //     // return (item.status == filterStatus) && () 
        //     //nếu thời gian null
        //     // if (fromDate == undefined && toDate == undefined) {
        //     //     if (filterStatus != undefined && filterTypeBill != undefined) {
        //     //         if (item && item.status && item.typeBill) {
        //     //             return (item.status == filterStatus && item.typeBill == filterTypeBill)
        //     //         }
        //     //     }
        //     //     if (filterStatus != undefined && filterTypeBill == undefined) {
        //     //         if (item && item.status) {
        //     //             return (item.status == filterStatus)
        //     //         }
        //     //     }
        //     //     if (filterStatus == undefined && filterTypeBill != undefined) {
        //     //         if (item && item.typeBill) {
        //     //             return (item.typeBill == filterTypeBill)
        //     //         }
        //     //     }
        //     // }

        //     //nếu status va typebill null
        //     // if (filterStatus == undefined && filterTypeBill == undefined) {
        //     //     if (fromDate != undefined && toDate == undefined) {
        //     //         if (item && item.createdAt) {
        //     //             return (new Date(item.createdAt).getDate() >= new Date(fromDate).getDate())
        //     //         }
        //     //     }
        //     //     if (fromDate == undefined && toDate != undefined) {
        //     //         if (item && item.createdAt) {
        //     //             return (new Date(item.createdAt).getDate() <= new Date(toDate).getDate())
        //     //         }
        //     //     }
        //     //     if (fromDate != undefined && toDate != undefined) {
        //     //         if (item && item.createdAt) {
        //     //             return ((new Date(item.createdAt).getDate() >= new Date(fromDate).getDate())
        //     //                 && (new Date(item.createdAt).getDate() <= new Date(toDate).getDate()))
        //     //         }
        //     //     }
        //     // }

        //     //có hoặc ko có cái nào null
        //     // if (filterStatus != undefined || filterTypeBill != undefined
        //     //     || fromDate != undefined || toDate != undefined) {

        //     //     //tất cả khác null
        //     //     if (filterStatus != undefined && filterTypeBill != undefined
        //     //         && fromDate != undefined && toDate != undefined) {
        //     //         if (item && item.typeBill && item.status && item.createdAt) {
        //     //             return ((new Date(item.createdAt).getTime() >= new Date(fromDate).getTime())
        //     //                 && (new Date(item.createdAt).getTime() <= new Date(toDate).getTime()))
        //     //                 && (item.status == filterStatus && item.typeBill == filterTypeBill)
        //     //         }
        //     //     }
        //     // }
        //     return false;
        // });
        $scope.changePageSize();
    };

    $scope.resetFilter = function () {
        $scope.bill = angular.copy($scope.originalBill);
        $scope.typeBill = ""
        $scope.billStatus = ""
        $scope.fromDate = null
        $scope.toDate = null
        $scope.searchKeyword = undefined
        $scope.changePageSize();
    }

    $scope.initialize = function () {
        $http.get("http://localhost:8080/bills").then(function (resp) {
            $scope.originalBill = resp.data;
            $scope.bill = angular.copy($scope.originalBill);
        });
    }
    $scope.initialize();

    $scope.loadCustomers = function () {
        $http.get("http://localhost:8080/customer") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.customerEntitys = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading customers", error);
            });
    }

    $scope.loadCustomers();

    $scope.loadEmployees = function () {
        $http.get("http://localhost:8080/employee") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.employees = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading employees", error);
            });
    }
    $scope.loadEmployees();

    $scope.loadVoucher = function () {
        $http.get("http://localhost:8080/api/voucher") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.vouchers = resp.data;
            })
            .catch(function (error) {
                console.log("Error loading vuchers", error);
            });
    }
    $scope.loadVoucher();

    $scope.loadBillDetail = function (id) {
        $http.get("http://localhost:8080/bills/" + id + "/billDetail") // Thay đổi đường dẫn API tương ứng
            .then(function (resp) {
                $scope.billDetails = resp.data;
                var arr = resp.data;
                $scope.tongSoSanPham = 0;
                if (arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        $scope.tongSoSanPham += arr[i].quantity;
                    }
                }
                // console.log($scope.tongSoSanPham)
            })
            .catch(function (error) {
                console.log("Error loading billDetails", error);
            });
    }

    $scope.edit = function (bill) {
        $scope.showTab()
        if ($scope.formUpdate.updatedAt) {
            $scope.formUpdate = angular.copy(bill);
        } else {
            $scope.formUpdate = angular.copy(bill);
            $scope.formUpdate.updatedAt = new Date(); // Hoặc là giá trị ngày mặc định của bạn
        }
        $scope.loadBillDetail(bill.id)
        $scope.getInfoBill(bill)
        console.log(bill)
        $scope.currentStatus = bill.status
        // $scope.showNote(bill.status)
    }

    $scope.exportBill = function () {
        let data = angular.copy($scope.formUpdate)
        $scope.printBill(data)
    }

    $scope.printBill = resp => {
        const invoiceHTML = generateInvoiceHTML(resp);
        const invoiceWindow = window.open('', '_blank');
        invoiceWindow.document.write(invoiceHTML);
        invoiceWindow.document.close();
    }

    // $scope.showNote = function (billStatus) {
    //     var areaNote = document.getElementById("areaNote")
    //     var labelNote = document.getElementById("labelNote")
    //     if(billStatus == 4){
    //         areaNote.style.display = "block"
    //         labelNote.style.display = "block"
    //     }else{
    //         areaNote.style.display = "none"
    //         labelNote.style.display = "none"
    //     }
    //     console.log($scope.formUpdate.status +" - " + $scope.currentStatus)
    //     if(billStatus == 4){
    //         areaNote.disabled = true
    //     }
    //     if($scope.formUpdate.status == 4 && $scope.currentStatus != 4){
    //         areaNote.disabled = false
    //     }else{
    //         areaNote.disabled = true
    //     }
    // }
    // $scope.showNote(1);


    $scope.getInfoBill = function (bill) {
        $scope.tongTien = bill.totalAmount;
        $scope.giamGia = bill.totalAmount - bill.totalAmountAfterDiscount;
        $scope.khachPhaiTra = bill.totalAmountAfterDiscount;
        $scope.khachDaTra = 0

        // console.log(bill.typeBill)
        // console.log(bill.paymentMethod.id)
        if (bill.typeBill === 2 && bill.paymentMethod.id === 3) {
            $scope.khachDaTra = $scope.khachPhaiTra;
        } else if (bill.typeBill === 2 && bill.paymentMethod.id != 3) {
            $scope.khachDaTra = 0;
        } else if (bill.typeBill == 1 &&
            (bill.paymentMethod.id === 1 || bill.paymentMethod.id === 2 || bill.paymentMethod.id === 3)) {
            $scope.khachDaTra = $scope.khachPhaiTra;
        } else if (bill.typeBill == 3 &&
            (bill.paymentMethod.id === 1 || bill.paymentMethod.id === 2 || bill.paymentMethod.id === 3)) {
            $scope.khachDaTra = $scope.khachPhaiTra;
        } else if (bill.typeBill === 3 && bill.paymentMethod.id === 4) {
            $scope.khachDaTra = 0
        }
    }

    //change tab
    $scope.showTab = function () {
        var someListItemEl = document.querySelector('#tabhome')
        var tab = new bootstrap.Tab(someListItemEl)
        tab.show()
    }


    $scope.update = function () {
        let item = angular.copy($scope.formUpdate);
        console.log(item)
        $http.put(`http://localhost:8080/bills/${item.id}`, item).then(function (resp) {
            $scope.initialize();
            $scope.showSuccessNotification("Cập nhật trạng thái hóa đơn thành công")
            // $('#modalUpdate').modal('hide');
            $scope.loadBillDetail()
            $scope.currentStatus = bill.status
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.updateStatus = function (status, item) {
        console.log("c")
        console.log(status)
        console.log(item)
        $http.put(`http://localhost:8080/bills/status/${item.id}`, status).then(function (resp) {
            // $scope.resetFormUpdate();
            $scope.initialize();
            // $('#modalUpdate').modal('hide');
            $scope.showSuccessNotification("Cập nhật trạng thái hóa đơn thành công")
            $scope.edit(item)
        }).catch(function (error) {
            console.log("Error", error);
        });
    }

    $scope.changePageSize = function () {
        $scope.paper.page = 0; // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    $scope.paper = {
        page: 0,
        size: 5, // Kích thước mặc định ban đầu
        get items() {
            let start = this.page * this.size;
            return $scope.bill.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.bill.length / this.size);
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




    const formatCurrency = price => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    const formatDate = dateString => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('vi-VN', options);
    };
    function generateInvoiceHTML(resp) {
        const listBillDT = Object.values($scope.billDetails).map(billDT => `
            <tr>
                <td class="desc">${billDT.productDetail.product.name} ${billDT.productDetail.product.material.name} ${billDT.productDetail.size.name}</td>
                <td class="unit">${billDT.price}</td>
                <td class="qty">${billDT.quantity}</td>
                <td class="total">${formatCurrency(billDT.price * billDT.quantity)}</td>
            </tr>
        `).join('');
        const htmlContent = `<!DOCTYPE html>
    <html>
    <head>
        <style>
            .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }
    
    a {
      color: #5D6975;
      text-decoration: underline;
    }
    
    body {
      position: relative;
      width: 21cm;  
      height: 20cm; 
      margin: 0 auto; 
      color: #001028;
      background: #FFFFFF; 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      font-family: Arial;
    }
    
    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }
    
    #logo {
      text-align: center;
      margin-bottom: 10px;
    }
    
    #logo img {
      width: 90px;
    }
    
    h1 {
      border-top: 1px solid  #5D6975;
      border-bottom: 1px solid  #5D6975;
      color: #5D6975;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      margin: 0 0 20px 0;
      background: #F5F5F5;
    }
    
    #project {
      float: left;
    }
    
    #project span {
      color: #5D6975;
      text-align: right;
      width: 52px;
      margin-right: 10px;
      display: inline-block;
      font-size: 0.8em;
    }
    
    #company {
      float: right;
      text-align: right;
    }
    
    #project div,
    #company div {
      white-space: nowrap;        
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }
    
    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    }
    
    table th,
    table td {
      text-align: center;
    }
    
    table th {
      padding: 5px 20px;
      color: #5D6975;
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;        
      font-weight: normal;
    }
    
    table .service,
    table .desc {
      text-align: left;
    }
    
    table td {
      padding: 20px;
      text-align: right;
    }
    
    table td.service,
    table td.desc {
      vertical-align: top;
    }
    
    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }
    
    table td.grand {
      border-top: 1px solid #5D6975;;
    }
    
    .foter {
      color: #5D6975;
      width: 100%;
      height: 30px;
      border-top: 1px solid #C1CED9;
      padding: 8px 0;
      text-align: center;
    }
    
    .font-b {
        font-weight: bold;
    }
        </style>    
    </head>
    <body>
         <header class="clearfix">
          <div id="logo">
            <img src="https://res.cloudinary.com/dvtz5mjdb/image/upload/v1701333412/image/h1vzhjzyuuwhrhak1bcr.png">
          </div>
          <h1>HÓA ĐƠN</h1>
          <div id="company" class="clearfix">
            <div>#${resp.code}</div>
            <div>Ngày tạo: ${formatDate(resp.createdAt)}</div>
            <div>Ngày thanh toán: ${formatDate(resp.paymentDate)}</div>
          </div>
          <div id="project">
            <div><span>Khách hàng:</span> ${resp.customerEntity ? resp.customerEntity.fullName : 'Khách lẻ'}</div>
            <div><span>SĐT:</span> ${resp ? resp.phoneNumber : ''}</div>
            <div><span>Địa chỉ:</span> ${resp ? resp.address : ''}</div>
          </div>
        </header>
        <main>
          <table>
            <thead>
              <tr>
                <th class="desc">Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
                ${listBillDT}
              <tr>
                <td colspan="3" class="font-b">Tổng tiền hàng: </td>
                <td class="total font-b">${formatCurrency(resp.totalAmount)}</td>
              </tr>
              ${resp.voucher !== null ? `
                <tr>
                <td colspan="3" class="font-b">Giảm giá</td>
                <td class="total font-b">${resp.voucher.value}${resp.voucher.valueType == 2 ? '%' : '₫'}</td>
                </tr>
              ` : ''}
              <tr>
                <td colspan="3" class="grand font-b">Tổng thanh toán</td>
                <td class="total grand font-b">${resp.totalAmountAfterDiscount == 0 ? formatCurrency(resp.totalAmount) : formatCurrency(resp.totalAmountAfterDiscount)}</td>
              </tr>
            </tbody>
          </table>
           <div class="foter">
                Cảm ơn và hẹn gặp lại!
            </div>
        </main>
        <script>
             window.onload = function() {
                  window.print();
             };
        </script>
    </body>
    </html>`;

        return htmlContent;
    }
});