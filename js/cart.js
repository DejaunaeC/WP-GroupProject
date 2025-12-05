/* ============================================================================
 * Member: Dejaunae Clue - Member 3 (Products & Cart)
 * Student ID: 2304199
 * Class: Friday/12PM
 * ============================================================================
 */

// Question 4a: Create a shopping cart page that lists items
// Display cart with name, price, quantity, sub-total, discount, tax, and total

function displayCart() {
    var cartItems = document.getElementById('cartItems');
    var cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems || !cartSummary) return;
    
    var cart = getFromLocalStorage('cart') || [];
    
    // Empty cart message
    if (cart.length === 0) {
        cartItems.innerHTML = 
            '<div class="empty-state">' +
                '<h3>Your cart is empty</h3>' +
                '<p>Add some fragrances to get started!</p>' +
                '<a href="products.html" class="btn">Browse Products</a>' +
            '</div>';
        cartSummary.innerHTML = '';
        return;
    }
    
    // Display cart items
    cartItems.innerHTML = '';
    var subtotal = 0;
    
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        
        var cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = 
            '<div class="cart-item-image">' +
                '<img src="' + item.image + '" alt="' + item.name + '" onerror="this.src=\'assets/placeholder.png\'">' +
            '</div>' +
            '<div class="cart-item-details">' +
                '<h4>' + item.name + '</h4>' +
                '<p class="cart-item-brand">' + item.brand + ' - ' + item.size + '</p>' +
            '</div>' +
            '<div class="cart-item-price">JMD $' + item.price.toLocaleString() + '</div>' +
            '<div class="quantity-control">' +
                '<button onclick="updateQuantity(' + item.cartId + ', -1)" aria-label="Decrease quantity">−</button>' +
                '<input type="number" value="' + item.quantity + '" readonly aria-label="Quantity">' +
                '<button onclick="updateQuantity(' + item.cartId + ', 1)" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<div class="cart-item-subtotal">JMD $' + itemSubtotal.toLocaleString() + '</div>' +
            '<button class="delete-btn" onclick="removeFromCart(' + item.cartId + ')" aria-label="Remove item">×</button>';
        
        cartItems.appendChild(cartItemDiv);
    }
    
    // Question 4c: Calculate and display total price
    var discount = subtotal * 0.10;
    var taxableAmount = subtotal - discount;
    var tax = taxableAmount * 0.15;
    var total = taxableAmount + tax;
    
    cartSummary.innerHTML = 
        '<div class="summary-row">' +
            '<span>Subtotal:</span>' +
            '<span>JMD $' + subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</span>' +
        '</div>' +
        '<div class="summary-row">' +
            '<span>Discount (10%):</span>' +
            '<span class="discount-amount">-JMD $' + discount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</span>' +
        '</div>' +
        '<div class="summary-row">' +
            '<span>Tax (15% GCT):</span>' +
            '<span>JMD $' + tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</span>' +
        '</div>' +
        '<div class="summary-row total">' +
            '<span>Total:</span>' +
            '<span>JMD $' + total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</span>' +
        '</div>';
}

/* Allow users to update quantities */
function updateQuantity(cartId, change) {
    var cart = getFromLocalStorage('cart') || [];
    
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].cartId === cartId) {
            cart[i].quantity += change;
            
            // Remove item if quantity becomes 0 or negative
            if (cart[i].quantity <= 0) {
                removeFromCart(cartId);
                return;
            }
            
            saveToLocalStorage('cart', cart);
            displayCart();
            updateCartBadge();
            break;
        }
    }
}

/* Question 4b: Allow users to remove items from cart */
function removeFromCart(cartId) {
    if (!confirm('Remove this item from cart?')) {
        return;
    }
    
    var cart = getFromLocalStorage('cart') || [];
    var newCart = [];
    
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].cartId !== cartId) {
            newCart.push(cart[i]);
        }
    }
    
    saveToLocalStorage('cart', newCart);
    displayCart();
    updateCartBadge();
}

/* Remove all items from shopping cart */
function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        saveToLocalStorage('cart', []);
        displayCart();
        updateCartBadge();
    }
}

// Check Out button
function proceedToCheckout() {
    var cart = getFromLocalStorage('cart') || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }
    
    window.location.href = 'checkout.html';
}

// Update cart badge in navigation
function updateCartBadge() {
    var cartBadge = document.getElementById('cartBadge');
    if (!cartBadge) return;
    
    var cart = getFromLocalStorage('cart') || [];
    var totalItems = 0;
    
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems === 0 ? 'none' : 'flex';
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartBadge();
});