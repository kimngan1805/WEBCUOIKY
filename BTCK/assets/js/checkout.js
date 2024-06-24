// JavaScript code for checkout.html

// Function to parse and decode URL parameter
const getCartFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cartParam = urlParams.get('cart');
    if (cartParam) {
        try {
            // Decode and parse JSON data
            const decodedCartData = decodeURIComponent(cartParam);
            const cartData = JSON.parse(decodedCartData);
            return cartData;
        } catch (error) {
            console.error('Error parsing cart data from URL:', error);
            return [];
        }
    }
    return [];
};

// Function to display cart items on the checkout page
const showCartItems = (cartItems) => {
    const listOrderCheckout = document.getElementById('list-order-checkout');
    listOrderCheckout.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    cartItems.forEach(item => {
        let productInfo = getProductInfo(item.product_id); // Replace with your actual product fetching method
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
                <div class="totalPrice">$${(productInfo.price * item.quantity).toFixed(3)} VND</div>
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
checkoutCartPriceFinal.innerText = `${totalPrice.toFixed(3)} VND`;

};

// Helper function to get product info by ID (replace with your actual product fetching method)
const getProductInfo = (productId) => {
    let product = products.find(p => p.id == productId) ||
                  products2.find(p => p.id == productId) ||
                  products3.find(p => p.id == productId) ||
                  products4.find(p => p.id == productId); // Ensure to include products4
    return product;
};

// Function to fetch products data (adjust this according to your structure)
const fetchProductsData = () => {
    // Fetch products data as needed
    // Example fetch:
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        // Save products data globally or use as needed
        products = data;
        // After fetching data, show cart items if cart is present in URL
        const cartItems = getCartFromUrl();
        if (cartItems.length > 0) {
            showCartItems(cartItems);
        } else {
            // Handle case where no cart items are found
            console.log('No cart items found in URL.');
        }
    })
    .catch(error => console.error('Error fetching products data:', error));
};

// Call fetchProductsData function to initiate fetching products and displaying cart items
fetchProductsData();



document.addEventListener("DOMContentLoaded", function() {
    // Khởi tạo flatpickr cho ô nhập liệu chọn ngày
    flatpickr(".date-order input", {
        enableTime: false, // Chỉ cho phép chọn ngày, không cho phép chọn giờ
        minDate: "today", // Ngày nhỏ nhất có thể chọn là hôm nay
        dateFormat: "d-m-Y", // Định dạng ngày tháng (ngày-tháng-năm)
        locale: "vi", // Ngôn ngữ hiển thị là Tiếng Việt
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const checkoutBtn = document.querySelector('.complete-checkout-btn');
    const successMessage = document.getElementById('order-success-message');

    checkoutBtn.addEventListener('click', function() {
        // Gửi request đặt hàng tại đây (nếu cần)

        // Hiển thị thông báo đặt hàng thành công
        successMessage.style.display = 'block';
    });
});

function closeMessage() {
    const successMessage = document.getElementById('order-success-message');
    successMessage.style.display = 'none';
}
