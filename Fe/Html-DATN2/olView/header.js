
  let overlayActive = false;
  let productSearch = [];
  let limit = 4;
  let showLoadMore = false;
  let searchText = '';
  function openOverlay() {

    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('active');
    overlay.classList.toggle('inactive');
  }
  
  
  function toggleOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    overlay.classList.add('inactive');
  }



  

function loadProductSearch(searchText) {
    fetch(`http://localhost:8080/api/ol/products/search?keyword=${searchText}`)
      .then(response => response.json())
      .then(data => {
        productSearch = data;
        displayProducts(productSearch);
        searchResultsLength = productSearch.length;
      })
      .catch(error => {
        console.error('Error fetching more products:', error);
      });
  }
  

  function displayProducts(products) {
    const productDisplay = document.getElementById('productDisplay');
    productDisplay.innerHTML = '';

    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'col-md-3 mb-4';
      productElement.innerHTML = `
        <div class="card w-100 my-2 shadow-2-strong">
          <a href="#!product-detail/${product.id}">
            <img class="card-img-top" width="100%" height="100%" class="rounded-2" loading="lazy" src="${product.path}" />
          </a>
          <div class="card-body d-flex flex-column">
            <div style="display: flex; justify-content: space-between;">
              <span class="product-price">${product.price} đ</span>
              <a href="#" class="btn btn-light  py-2 icon-hover px-3">
                <i class="me-1 fa fa-heart fa-lg"></i>
              </a>
            </div>
            <p class="card-title">
              ${product.name}
              ${product.nameCategory}
              ${product.nameMaterial}
              ${product.code}
            </p>
          </div>
        </div>
      `;
      productDisplay.appendChild(productElement);
    });

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (showLoadMore) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  function checkSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTextParam = urlParams.get('searchText');
    if (searchTextParam) {
      searchText = searchTextParam;
      loadMore();
    } else {
      searchText = '';
    }
  }

  checkSearch();