# 🛍️ Web Programming Group Project  
**Company Name:**  
**Class Time:** Friday@12pm  
**Due Date:** December 5, 2025  

---

## 👥 GROUP MEMBERS

Dejaunae Clue- 2304199 - Product/Cart  
Shania Foster - 2404262 -   Registration, Login, Locked, reset (JS, CSS, HTML) Group Member 2
Jadon Fearon - 2405548 - Login/Password
Nathan-Neil Shelly - 2408989  Checkout/Invoice/Analytics

---
## 📁 PROJECT STRUCTURE & FILE NAMING

```
CompanyName_Mon9am/
├── 📁 css/
│   ├── style.css          (Main stylesheet - all shared styles)
│   ├── responsive.css     (Media queries for mobile/desktop)
│   ├── auth.css           (Optional - registration/login specific styles)
│   ├── products.css       (Optional - product catalog styles)
│   └── cart.css           (Optional - cart/checkout styles)
│
├── 📁 js/
│   ├── common.js          (Shared helper functions - ALL MEMBERS USE)
│   ├── registration.js    (Member 1 - registration logic)
│   ├── login.js           (Member 2 - login logic)
│   ├── products.js        (Member 3 - product display)
│   ├── cart.js            (Member 3 - shopping cart)
│   ├── checkout.js        (Member 4 - checkout process)
│   ├── invoice.js         (Member 4 - invoice generation)
│   └── analytics.js       (Member 4 - ShowUserFrequency, ShowInvoices, GetUserInvoices)
│
├── 📁 assets/
│   ├── 📁 images/
│   │   ├── 📁 products/   (Product images: product-001.jpg, product-002.jpg, etc.)
│   │   ├── 📁 ui/         (UI elements: logo.png, banner.jpg, icons, etc.)
│   │   └── 📁 charts/     (Chart graphics: bar-chart-bg.jpg, etc.)
│   └── 📁 docs/           (Optional - documentation files)
│
├── 📄 index.html          (LOGIN PAGE - Member 2)
├── 📄 register.html       (REGISTRATION PAGE - Member 2)
├── 📄 products.html       (PRODUCT CATALOG - Member 3)
├── 📄 cart.html           (SHOPPING CART - Member 3)
├── 📄 checkout.html       (CHECKOUT - Member 4)
├── 📄 invoice.html        (INVOICE DISPLAY - Member 4)
├── 📄 dashboard.html      (ANALYTICS DASHBOARD - Member 4)
├── 📄 locked.html          (ACCOUNT LOCKED PAGE - Member 2)
└── 📄 README.md           (Project documentation - ALL MEMBERS)
```

### Colours
```css
:root {
    --primary-color: #______;
    --secondary-color: #______;
    --accent-color: #______;
    --text-dark: #333333;
    --text-light: #666666;
    --background: #FFFFFF;
    --border-color: #DDDDDD;
    --error-color: #DC3545;
    --success-color: #28A745;
}
```

### Typography  
```
- **Headings:** 
- **Body Text:** 
- **Base Font Size:** 16px
- **Line Height:** 1.6
```
## 🎯 NAMING CONVENTIONS  
```
// Use camelCase for variables and functions
let firstName = "John";
let userAge = 25;
let isLoggedIn = true;

// Use PascalCase for constructor functions (if needed)
function User(name, age) {
    this.name = name;
    this.age = age;
}

// Use UPPER_CASE for constants
const MAX_LOGIN_ATTEMPTS = 3;
const TAX_RATE = 0.15;
const COMPANY_NAME = "YourCompanyName";
```

## 📝 CODE COMMENTING 

```javascript
/**
 * Question [Number]: [Question Text from Assignment]
 * 
 * Function: [Function Name]
 * Purpose: [What this function does]
 * Author: [Your Name] - [Your Role]

// Example:

 * Question 5a: ShowUserFrequency() - Show user frequency based on Gender and Age Group
 * 
 * Function: ShowUserFrequency
 * Purpose: Display frequency bar charts for gender and age group distribution
 * Author: John Doe - Member 4 (Analytics)
```
##  FUNCTIONS

### Registration

### Login

### Products & Cart
- `loadProducts()` - Display products from localStorage
- `addToCart(productId)` - Add item to cart
- `updateCartQuantity(productId, quantity)` - Update item quantity
- `removeFromCart(productId)` - Remove item from cart
- `displayCart()` - Show cart contents
- `clearCart()` - Remove all items

### Checkout & Invoice

###Analytics
-
