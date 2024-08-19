// Cart array to store cart items with image URLs
const cart = [];

// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) {
        console.error('Cart items or cart total element not found.');
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.product}" style="width: 50px; height: 50px;">
            <div class="details">
                <span>${item.product}</span>
                <span>฿${item.price.toFixed(2)}</span>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = `฿${total.toFixed(2)}`;
}

// Function to handle "Add to Cart" button click
function handleAddToCart(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const product = event.target.getAttribute('data-product');
        const price = parseFloat(event.target.getAttribute('data-price'));
        const image = event.target.getAttribute('data-image');
        
        if (!isNaN(price) && product && image) {
            cart.push({ product, price, image });
            updateCart();
        } else {
            console.error('Invalid product data');
        }
    }
}

// Attach event listener to document for cart button
document.addEventListener('click', handleAddToCart);

// Modal functionality
const modal = document.getElementById('cart-modal');
const cartIcon = document.getElementById('cart-icon'); // Ensure your cart icon has this ID
const closeModal = document.querySelector('.modal .close');

if (cartIcon) {
    cartIcon.addEventListener('click', function() {
        modal.style.display = 'block';
    });
} else {
    console.error('Cart icon not found.');
}

if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
} else {
    console.error('Close button not found.');
}

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Event listener for the checkout button
const checkoutBtn = document.getElementById('checkout');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        // Clear cart array
        cart.length = 0;
        // Update cart display
        updateCart();
        // Show alert
        alert('Checkout Successful!');
        // Close the modal
        if (modal) {
            modal.style.display = 'none';
        } else {
            console.error('Cart modal not found.');
        }
    });
} else {
    console.error('Checkout button not found.');
}
