
//   let overlayActive = false;
//   let productSearch = [];
//   let limit = 4;
//   let showLoadMore = false;
//   let searchText = '';
//   let isNavigatingToProductDetail = false;








//   function openOverlay() {

//     const overlay = document.getElementById('overlay');
//     overlay.classList.toggle('active');
//     overlay.classList.toggle('inactive');
//   }
  
  
//   function toggleOverlay() {
//     const overlay = document.getElementById('overlay');
//     overlay.classList.remove('active');
//     overlay.classList.add('inactive');
    
//     // Đặt giá trị trống cho ô tìm kiếm khi đóng overlay
//     document.getElementById('form1').value = '';
//     // Gọi hàm để xóa dữ liệu và ẩn kết quả tìm kiếm
//     clearAndHideSearchResults();
  
//     // Kiểm tra nếu đang chuyển đến trang chi tiết sản phẩm thì ẩn ô tìm kiếm
//     if (isNavigatingToProductDetail) {
//       document.getElementById('form1').style.display = 'none';
//     }
//   }
  
//   // Hàm để xác định trạng thái chuyển đến trang chi tiết sản phẩm
//   function navigateToProductDetail(productId) {
//     isNavigatingToProductDetail = true;
//     console.log("Hello")
  
//     // Chuyển đến trang chi tiết sản phẩm với productId
//     window.location.href = `#!product-detail/${productId}`;
//   }
  


//   function clearAndHideSearchResults() {
//     const productDisplay = document.getElementById('productDisplay');
//     productDisplay.innerHTML = ''; // Xóa nội dung của kết quả tìm kiếm
  
//     // Ẩn nút "Xem thêm"
//     const loadMoreBtn = document.getElementById('loadMoreBtn');
//     loadMoreBtn.style.display = 'none';
//   }
  

// function loadProductSearch(searchText) {

//   var searchTextParam = toLowerCaseNonAccentVietnamese(searchText)
//     fetch(`http://localhost:8080/api/ol/products/search?keyword=${searchTextParam}`)
//       .then(response => response.json())
//       .then(data => {
//         productSearch = data;
//         displayProducts(productSearch);
//         searchResultsLength = productSearch.length;
//       })
//       .catch(error => {
//         console.error('Error fetching more products:', error);
//       });
//   }
  

//   function displayProducts(products) {
//     const productDisplay = document.getElementById('productDisplay');
//     productDisplay.innerHTML = '';

//     products.forEach(product => {
//       const productElement = document.createElement('div');
//       productElement.className = 'col-md-3 mb-4';
//       productElement.innerHTML = `
//         <div class="card w-100 my-2 shadow-2-strong">
//           <a href="#!product-detail/${product.id}">
//             <img class="card-img-top" width="100%" height="100%" class="rounded-2" loading="lazy" src="${product.path}" />
//           </a>
//           <div class="card-body d-flex flex-column">
//             <div style="display: flex; justify-content: space-between;">
//               <span class="product-price">${product.price} đ</span>
//               <a href="#" class="btn btn-light  py-2 icon-hover px-3">
//                 <i class="me-1 fa fa-heart fa-lg"></i>
//               </a>
//             </div>
//             <p class="card-title">
//               ${product.name}
//               ${product.nameCategory}
//               ${product.nameMaterial}
//               ${product.code}
//             </p>
//           </div>
//         </div>
//       `;
//       productDisplay.appendChild(productElement);
//     });

//     const loadMoreBtn = document.getElementById('loadMoreBtn');
//     if (showLoadMore) {
//       loadMoreBtn.style.display = 'block';
//     } else {
//       loadMoreBtn.style.display = 'none';
//     }
//   }

//   function checkSearch() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const searchTextParam = urlParams.get('searchText');
//     if (searchTextParam) {
//       searchText = searchTextParam;
//       loadMore();
//     } else {
//       searchText = '';
//     }
//   }

//   checkSearch();


//   function toLowerCaseNonAccentVietnamese(str) {
//     str = str.toLowerCase();
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     str = str.replace(/đ/g, "d");
//     // Some system encode vietnamese combining accent as individual utf-8 characters
//     str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã 
//     str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
//     return str;

















    
// }