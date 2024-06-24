let listProductHTML = document.querySelector('.listProduct');
let listproducts2HTML = document.querySelector('.listproducts2');
let listproducts3HTML = document.querySelector('.listproducts3');
let listproducts4HTML = document.querySelector('.listproducts4'); // Tham chiếu mới
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let searchForm = document.getElementById('search-form');
let searchInput = document.getElementById('search-input');
let products = [];
let products2 = [];
let products3 = [];
let products4 = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = (productList, listElement) => {
    listElement.innerHTML = '';
    if (productList.length > 0) {
        productList.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">${product.price}.000</div>
            <button class="addCart">THÊM VÀO GIỎ</button>`;
            listElement.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

listproducts2HTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

listproducts3HTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

listproducts4HTML.addEventListener('click', (event) => { // Sự kiện mới cho listproducts4HTML
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let info = products.find(p => p.id == item.product_id) ||
                       products2.find(p => p.id == item.product_id) ||
                       products3.find(p => p.id == item.product_id) ||
                       products4.find(p => p.id == item.product_id); // Thêm products4

            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                <img src="${info.image}">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">${info.price * item.quantity}.000</div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${item.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            default:
                cart[positionItemInCart].quantity -= 1;
                if (cart[positionItemInCart].quantity <= 0) {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML(products, listProductHTML);

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    });

    fetch('products2.json')
    .then(response => response.json())
    .then(data => {
        products2 = data;
        addDataToHTML(products2, listproducts2HTML);
    });

    fetch('products3.json')
    .then(response => response.json())
    .then(data => {
        products3 = data;
        addDataToHTML(products3, listproducts3HTML);
    });

    fetch('products4.json') // Fetch mới cho products4
    .then(response => response.json())
    .then(data => {
        products4 = data;
        addDataToHTML(products4, listproducts4HTML);
    });
};

initApp();

// Sự kiện tìm kiếm
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchTerm = searchInput.value.toLowerCase();
    let allProducts = [...products, ...products2, ...products3, ...products4]; // Thêm products4

    let filteredProducts = allProducts.filter(product => product.name.toLowerCase().includes(searchTerm));

    let listProductHTML = document.querySelector('.listProduct');
    let listproducts2HTML = document.querySelector('.listproducts2');
    let listproducts3HTML = document.querySelector('.listproducts3');
    let listproducts4HTML = document.querySelector('.listproducts4'); // Tham chiếu mới

    if (filteredProducts.length > 0) {
        addDataToHTML(filteredProducts, listProductHTML);
        addDataToHTML([], listproducts2HTML);
        addDataToHTML([], listproducts3HTML);
        addDataToHTML([], listproducts4HTML); // Cập nhật kết quả tìm kiếm
    } else {
        listProductHTML.innerHTML = '<p>Không tìm thấy sản phẩm.</p>';
        listproducts2HTML.innerHTML = '';
        listproducts3HTML.innerHTML = '';
        listproducts4HTML.innerHTML = ''; // Cập nhật không tìm thấy
    }
    
    // Ẩn các label khi hiển thị kết quả tìm kiếm
    document.querySelectorAll('.logo').forEach(label => label.style.display = 'none');
});
// Add this event listener to handle checkout button click
document.querySelector('.complete-checkout-btn').addEventListener('click', () => {
    showCheckoutPage();
});

// Function to show checkout page and populate cart items
const showCheckoutPage = () => {
    const checkoutPage = document.querySelector('.checkout-page');
    checkoutPage.classList.add('active');

    const listOrderCheckout = document.getElementById('list-order-checkout');
    listOrderCheckout.innerHTML = ''; // Clear previous items

    let totalPrice = 0;

    cart.forEach(item => {
        let productInfo = getProductInfo(item.product_id); // Helper function to get product info
        if (productInfo) {
            let itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="image">
                    <img src="${productInfo.image}">
                </div>
                <div class="name">
                    ${productInfo.name}
                </div>
                <div class="totalPrice">$${productInfo.price * item.quantity}</div>
                <div class="quantity">
                    <span>${item.quantity}</span>
                </div>
            `;
            listOrderCheckout.appendChild(itemElement);
            totalPrice += productInfo.price * item.quantity;
        }
    });

    // Update total price
    const checkoutCartPriceFinal = document.getElementById('checkout-cart-price-final');
    checkoutCartPriceFinal.innerText = totalPrice;
};

// Helper function to get product info by ID
const getProductInfo = (productId) => {
    let product = products.find(p => p.id == productId) ||
                  products2.find(p => p.id == productId) ||
                  products3.find(p => p.id == productId) ||
                  products4.find(p => p.id == productId); // Ensure to include products4
    return product;
};



function goToCheckout() {
    // Chuyển đổi dữ liệu giỏ hàng thành chuỗi JSON
    let cartData = JSON.stringify(cart);
    // Mã hóa chuỗi JSON để tránh lỗi khi truyền qua URL
    let encodedCartData = encodeURIComponent(cartData);
    // Chuyển hướng đến trang checkout.html với tham số cartData trên URL
    window.location.href = `checkout.html?cart=${encodedCartData}`;
}





