// Storage key constants for managing cart and order data in localStorage
const STORAGE_KEYS = {
	cart: "cartItems",
	latestOrder: "latestOrder",
	orderHistory: "orderHistory"
};

// Tax and discount rates applied to orders
const DISCOUNT_RATE = 0.10;  // 10% discount
const TAX_RATE = 0.15;       // 15% GCT tax

// Navigate to a different page based on pageId parameter
// Special handling for home page redirects to index.html
function showPage(pageId) {
	if (pageId === "home") {
		window.location.href = "index.html";
		return;
	}
	window.location.href = `${pageId}.html`;
}

// Format a number as a currency string in Jamaican Dollars
function formatCurrency(amount) {
	return `JMD $${amount.toFixed(2)}`;
}

// Retrieve cart items from localStorage with error handling
// Returns sample fallback items if storage is empty or corrupted
function getCartItems() {
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.cart);
		if (stored) {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed) && parsed.length) return parsed;
		}
	} catch (err) {
		console.warn("Unable to read cart, using defaults", err);
	}
	// Fallback sample cart to keep page usable
	return [
		{ id: "ltf-01", name: "Lattafa Yara", price: 8500, quantity: 1 },
		{ id: "ltf-02", name: "Lattafa Opulent Oud", price: 9200, quantity: 2 }
	];
}

// Calculate order totals including subtotal, discount, tax, and final total
function calculateTotals(items) {
	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const discount = subtotal * DISCOUNT_RATE;
	const taxable = subtotal - discount;
	const tax = taxable * TAX_RATE;
	const total = taxable + tax;
	return { subtotal, discount, tax, total };
}

// Render the checkout summary with itemized list and totals on the page
function renderCheckoutSummary() {
	const items = getCartItems();
	const summary = document.getElementById("checkoutSummary");
	const amountInput = document.getElementById("checkoutAmount");

	if (!summary) return;

	// Show empty cart message if no items
	if (!items.length) {
		summary.innerHTML = "<p>Your cart is empty.</p>";
		if (amountInput) amountInput.value = 0;
		return;
	}

	const totals = calculateTotals(items);
	// Build HTML for each item with name, quantity, price, and total
	const itemList = items.map(item => `
		<div class="summary-item">
			<div>
				<p class="item-name">${item.name}</p>
				<p class="item-meta">Qty: ${item.quantity} × ${formatCurrency(item.price)}</p>
			</div>
			<p class="item-total">${formatCurrency(item.price * item.quantity)}</p>
		</div>
	`).join("");

	// Display itemized list and financial breakdown
	summary.innerHTML = `
		<div class="summary-list">${itemList}</div>
		<div class="summary-row"><span>Subtotal</span><span>${formatCurrency(totals.subtotal)}</span></div>
		<div class="summary-row"><span>Discount (10%)</span><span>- ${formatCurrency(totals.discount)}</span></div>
		<div class="summary-row"><span>Tax (15% GCT)</span><span>${formatCurrency(totals.tax)}</span></div>
		<div class="summary-row total"><span>Total</span><span>${formatCurrency(totals.total)}</span></div>
	`;

	// Update hidden amount input for payment processing
	if (amountInput) amountInput.value = totals.total.toFixed(2);
}

// Mask credit card number showing only last 4 digits for security
function maskCardNumber(number) {
	const digits = number.replace(/\D/g, "");
	if (digits.length < 4) return "••••";
	return `•••• ${digits.slice(-4)}`;
}

// Save order to localStorage as both latest order and in order history
function persistOrder(order) {
	localStorage.setItem(STORAGE_KEYS.latestOrder, JSON.stringify(order));

	const historyRaw = localStorage.getItem(STORAGE_KEYS.orderHistory);
	const history = historyRaw ? JSON.parse(historyRaw) : [];
	history.push(order);
	localStorage.setItem(STORAGE_KEYS.orderHistory, JSON.stringify(history));
}

// Handle checkout form submission, validate, create order, and redirect to invoice
function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.target;
	if (!form.reportValidity()) return;  // Stop if form has validation errors

	const items = getCartItems();
	const totals = calculateTotals(items);

	// Build order object with customer, payment, and cart information
	const order = {
		id: `INV-${Date.now()}`,
		createdAt: new Date().toISOString(),
		customer: {
			name: form.checkoutName.value,
			email: form.checkoutEmail.value,
			phone: form.checkoutPhone.value,
			address: form.checkoutAddress.value,
			city: form.checkoutCity.value,
			parish: form.checkoutParish.value
		},
		payment: {
			name: form.cardName.value,
			last4: maskCardNumber(form.cardNumber.value)
		},
		items,
		totals
	};

	// Save order and clear cart before redirecting to invoice
	persistOrder(order);
	localStorage.removeItem(STORAGE_KEYS.cart);

	window.location.href = "invoice.html";
}

// Apply formatting to credit card inputs (card number and expiry date)
function formatCardInputs() {
	const cardNumber = document.getElementById("cardNumber");
	const expiryDate = document.getElementById("expiryDate");

	// Format card number with spaces every 4 digits (e.g., 1234 5678 9012 3456)
	if (cardNumber) {
		cardNumber.addEventListener("input", () => {
			const digits = cardNumber.value.replace(/\D/g, "").slice(0, 16);
			cardNumber.value = digits.replace(/(.{4})/g, "$1 ").trim();
		});
	}

	// Format expiry date as MM/YY
	if (expiryDate) {
		expiryDate.addEventListener("input", () => {
			const digits = expiryDate.value.replace(/\D/g, "").slice(0, 4);
			if (digits.length >= 3) {
				expiryDate.value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
			} else {
				expiryDate.value = digits;
			}
		});
	}
}

// Initialize page: render checkout summary, format inputs, and attach form submit handler
document.addEventListener("DOMContentLoaded", () => {
	renderCheckoutSummary();
	formatCardInputs();

	// Attach submit handler to the checkout form
	const form = document.getElementById("checkoutForm");
	if (form) {
		form.addEventListener("submit", handleFormSubmit);
	}
});
