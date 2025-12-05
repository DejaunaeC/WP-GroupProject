/**
 * ============================================================================
 * MEMBER 3: PRODUCTS.JS - Product Catalog & Display
 * ============================================================================
 * Assignment: Group Project - E-Commerce Website
 * Member: [Your Name] - Member 3 (Products & Cart)
 * Student ID: [Your ID]
 * Class: Friday/12PM
 * 
 * This file handles:
 * - Product data storage
 * - Product display and grid rendering
 * - Product modal/details view
 * - Add to cart functionality from product page
 * ============================================================================
 */

// ============================================================================
// Question 3: Product Catalogue
// 3a. Product List (Using Arrays & Objects)
// ============================================================================

/**
 * Product data array
 * Each product object contains: id, name, brand, price, image, rating, reviews, size, description, customerReviews
 */
var products = [
    {
        id: 1,
        name: 'Yara',
        brand: 'Lattafa',
        price: 7500,
        image: 'assets/products/Yara.webp',
        rating: 4.9,
        reviews: 456,
        size: '3.4oz',
        description: 'A sweet and fruity fragrance with notes of orchid, heliotrope, and tangerine. Perfect for day and evening wear with incredible longevity.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 2,
        name: 'Yara Candy',
        brand: 'Lattafa',
        price: 7800,
        image: 'assets/products/Yara Candy.webp',
        rating: 4.8,
        reviews: 389,
        size: '3.4oz',
        description: 'A sweeter version of the beloved Yara. Combines candy-like sweetness with elegant floral notes for a youthful, feminine scent.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 3,
        name: 'Angham',
        brand: 'Lattafa',
        price: 6500,
        image: 'assets/products/Angham.webp',
        rating: 4.7,
        reviews: 234,
        size: '3.4oz',
        description: 'Elegant and sophisticated with fruity top notes, floral heart, and warm woody base. Perfect for confident, modern women.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 4,
        name: 'Haya',
        brand: 'Lattafa',
        price: 7200,
        image: 'assets/products/Haya.webp',
        rating: 4.6,
        reviews: 178,
        size: '3.4oz',
        description: 'Fresh and vibrant with citrus and floral notes. A youthful, energetic fragrance perfect for daytime wear.',
        customerReviews:[
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 5,
        name: 'Nebras',
        brand: 'Lattafa',
        price: 6800,
        image: 'assets/images/products/Nebras.webp',
        rating: 4.7,
        reviews: 201,
        size: '3.4oz',
        description: 'A mysterious oriental fragrance with amber, musk, and floral notes. Warm and captivating for evening wear.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 6,
        name: 'Fakhar',
        brand: 'Lattafa',
        price: 8200,
        image: 'assets/products/Fakhar.webp',
        rating: 4.9,
        reviews: 512,
        size: '3.4oz',
        description: 'Luxurious and rich with rose, saffron, and oud. A statement fragrance that commands attention with excellent projection.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 7,
        name: 'The Kingdom',
        brand: 'Lattafa',
        price: 7500,
        image: 'assets/products/The Kingdom.webp',
        rating: 4.8,
        reviews: 345,
        size: '3.4oz',
        description: 'Royal and majestic with amber, vanilla, and floral notes. A warm, comforting scent perfect for all occasions.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 8,
        name: 'Rave Now',
        brand: 'Lattafa',
        price: 6200,
        image: 'assets/products/Rave Now.webp',
        rating: 4.5,
        reviews: 167,
        size: '3.4oz',
        description: 'Playful and energetic with fruity and floral notes. Perfect for young, vibrant personalities who love to stand out.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 9,
        name: 'Her Confession',
        brand: 'Lattafa',
        price: 7800,
        image: 'assets/products/Her Confession.webp',
        rating: 4.7,
        reviews: 289,
        size: '3.4oz',
        description: 'Romantic and feminine with jasmine, vanilla, and musk. A confession of elegance and grace in every spray.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 10,
        name: 'Teriaq',
        brand: 'Lattafa',
        price: 6900,
        image: 'assets/products/Teriaq.webp',
        rating: 4.6,
        reviews: 198,
        size: '3.4oz',
        description: 'Exotic and intriguing with spicy and woody notes. A unique fragrance for women who dare to be different.',
        customerReviews:[
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 11,
        name: 'Anabiyedh Coral',
        brand: 'Lattafa',
        price: 7100,
        image: 'assets/products/Coral.webp',
        rating: 4.7,
        reviews: 223,
        size: '3.4oz',
        description: 'Fresh and aquatic with floral undertones. Like a breeze from the ocean, refreshing and invigorating.',
        customerReviews:[
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 12,
        name: 'Qimmah',
        brand: 'Lattafa',
        price: 8500,
        image: 'assets/products/Qimmah.webp',
        rating: 4.9,
        reviews: 478,
        size: '3.4oz',
        description: 'Precious and luxurious with rose, oud, and amber. A masterpiece that embodies luxury and sophistication.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 13,
        name: 'Eclaire',
        brand: 'Lattafa',
        price: 6700,
        image: 'assets/products/Eclaire.webp',
        rating: 4.6,
        reviews: 187,
        size: '3.4oz',
        description: 'Sweet and gourmand with vanilla and caramel notes. A delicious scent that\'s comforting and warm.',
        customerReviews:[
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 14,
        name: 'Khamrah',
        brand: 'Lattafa',
        price: 8800,
        image: 'assets/products/Khamrah.webp',
        rating: 5.0,
        reviews: 623,
        size: '3.4oz',
        description: 'Rich and opulent with dates, spices, and vanilla. A luxurious oriental fragrance with exceptional performance.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 15,
        name: 'Khamrah Qahwa',
        brand: 'Lattafa',
        price: 9200,
        image: 'assets/products/Qahwa.webp',
        rating: 4.9,
        reviews: 534,
        size: '3.4oz',
        description: 'Coffee-inspired with rich notes of cardamom, vanilla, and praline. A unique gourmand fragrance that\'s addictively delicious.',
        customerReviews:[
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    },
    {
        id: 16,
        name: 'I am White Rouge',
        brand: 'Lattafa',
        price: 7400,
        image: 'assets/products/Rouge.webp',
        rating: 4.8,
        reviews: 312,
        size: '3.4oz',
        description: 'Elegant and feminine with white flowers and musk. A clean, sophisticated scent perfect for any occasion.',
        customerReviews: [
            { author: 'Sarah M.', date: '2025-11-15', rating: 5, text: 'Absolutely stunning! Smells like expensive perfume at an affordable price.' },
            { author: 'Lisa K.', date: '2025-11-10', rating: 5, text: 'My signature scent now. Get compliments everywhere I go!' }
        ]
    }
];

// Variable to track currently selected product in modal
var currentProduct = null;

// ============================================================================
// Question 3b: An updated product list must be kept on localStorage
// Store products to localStorage on page load
// ============================================================================
function saveProductsToLocalStorage() {
    saveToLocalStorage('AllProducts', products);
}

// ============================================================================
// Question 3c & 3d: Display the product list dynamically with "Add to Cart" buttons
// ============================================================================

/**
 * Load and display products on the page
 * This function creates product cards dynamically from the products array
 */
function loadProducts() {
    var grid = document.getElementById('productGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Loop through each product and create a card
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var card = document.createElement('div');
        card.className = 'product-card';
        
        // Add click handler to show modal
        card.onclick = (function(p) {
            return function() { showProductModal(p); };
        })(product);
        
        // Generate star rating display
        var stars = '';
        for (var j = 0; j < Math.floor(product.rating); j++) {
            stars += '★';
        }
        for (var j = Math.floor(product.rating); j < 5; j++) {
            stars += '☆';
        }
        
        // Build card HTML
        card.innerHTML = 
            '<div class="product-image">' +
                '<img src="' + product.image + '" alt="' + product.name + '" ' +
                'onerror="this.style.display=\'none\'; this.parentElement.style.fontSize=\'4rem\'; this.parentElement.innerHTML=\'✦\';">' +
            '</div>' +
            '<h3>' + product.name + '</h3>' +
            '<p class="product-brand">' + product.brand + '</p>' +
            '<div class="product-rating">' +
                '<span class="stars">' + stars + '</span>' +
                '<span class="rating-count">(' + product.rating + ')</span>' +
            '</div>' +
            '<div class="product-details">' +
                '<span class="product-size">' + product.size + '</span>' +
                '<div class="product-price">JMD $' + product.price.toLocaleString() + '</div>' +
            '</div>';
        
        grid.appendChild(card);
    }
}

/**
 * Show product details in a modal
 * @param {Object} product - Product object to display
 */
function showProductModal(product) {
    currentProduct = product;
    
    var modal = document.getElementById('productModal');
    var modalImg = document.getElementById('modalProductImg');
    
    // Set product image
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalImg.onerror = function() {
        this.style.display = 'none';
        this.parentElement.style.fontSize = '8rem';
        this.parentElement.innerHTML = '✦';
    };
    
    // Set product details
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductBrand').textContent = product.brand;
    
    // Generate star rating
    var stars = '';
    for (var i = 0; i < Math.floor(product.rating); i++) {
        stars += '★';
    }
    for (var i = Math.floor(product.rating); i < 5; i++) {
        stars += '☆';
    }
    document.getElementById('modalProductStars').textContent = stars;
    document.getElementById('modalProductRating').textContent = '(' + product.rating + ')';
    document.getElementById('modalProductReviews').textContent = product.reviews + ' reviews';
    
    document.getElementById('modalProductPrice').textContent = 
        'JMD $' + product.price.toLocaleString() + ' (' + product.size + ')';
    document.getElementById('modalProductDescription').textContent = product.description;
    
    // Display customer reviews
    var reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';
    for (var i = 0; i < product.customerReviews.length; i++) {
        var review = product.customerReviews[i];
        var reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        var reviewStars = '';
        for (var j = 0; j < review.rating; j++) {
            reviewStars += '★';
        }
        for (var j = review.rating; j < 5; j++) {
            reviewStars += '☆';
        }
        
        reviewCard.innerHTML = 
            '<div class="review-header">' +
                '<span class="review-author">' + review.author + '</span>' +
                '<span class="review-date">' + review.date + '</span>' +
            '</div>' +
            '<div class="product-rating" style="justify-content: flex-start;">' +
                '<span class="stars">' + reviewStars + '</span>' +
            '</div>' +
            '<p class="review-text">' + review.text + '</p>';
        
        reviewsContainer.appendChild(reviewCard);
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close the product modal
 */
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

// ============================================================================
// Question 3e: Add to Cart functionality
// When user clicks "Add to Cart", add product to shopping cart
// ============================================================================

/**
 * Add currently selected product to cart
 * This function is called from the modal's "Add to Cart" button
 */
function addToCart() {
    if (!currentProduct) return;
    
    // Get current cart from localStorage
    var cart = getFromLocalStorage('cart') || [];
    
    // Check if product already exists in cart
    var existingItemIndex = -1;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === currentProduct.id) {
            existingItemIndex = i;
            break;
        }
    }
    
    if (existingItemIndex !== -1) {
        // Product exists, increase quantity
        cart[existingItemIndex].quantity++;
    } else {
        // New product, add to cart
        var cartItem = {
            id: currentProduct.id,
            name: currentProduct.name,
            brand: currentProduct.brand,
            price: currentProduct.price,
            image: currentProduct.image,
            size: currentProduct.size,
            quantity: 1,
            cartId: Date.now() // Unique ID for this cart entry
        };
        cart.push(cartItem);
    }
    
    // Save cart to localStorage
    saveToLocalStorage('cart', cart);
    
    // Update cart badge
    updateCartBadge();
    
    // Close modal and show confirmation
    closeModal();
    alert(currentProduct.name + ' added to cart!');
}

/**
 * Update cart badge count in navigation
 */
function updateCartBadge() {
    var cartBadge = document.getElementById('cartBadge');
    if (!cartBadge) return;
    
    var cart = getFromLocalStorage('cart') || [];
    var totalItems = 0;
    
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    
    cartBadge.textContent = totalItems;
    if (totalItems === 0) {
        cartBadge.style.display = 'none';
    } else {
        cartBadge.style.display = 'flex';
    }
}

/**
 * Logout function
 */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session
        sessionStorage.clear();
        // Redirect to login
        window.location.href = 'index.html';
    }
}

// ============================================================================
// Initialize page on load
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Save products to localStorage
    saveProductsToLocalStorage();
    
    // Load and display products
    loadProducts();
    
    // Update cart badge
    updateCartBadge();
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
};