const formatCurrency = price => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
const formatDate = dateString => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleString('vi-VN', options);
};
function generateInvoiceHTML(resp) {
    const listBillDT= Object.values(resp.billDetail).map(billDT => `
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
        <div><span>Khách hàng:</span> ${resp.addressCustomer ? resp.addressCustomer[0].customer.fullName : 'Khách lẻ'}</div>
        <div><span>SĐT:</span> ${resp.addressCustomer ? resp.addressCustomer[0].phoneNumber : ''}</div>
        <div><span>Địa chỉ:</span> ${resp.addressCustomer ? resp.addressCustomer[0].address : ''}</div>
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

export default generateInvoiceHTML