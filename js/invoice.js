/* ============================================================================
 * Member: Nathan-Neil Shelly - Member 3 (invoice, checkout and analytics)
 * Student ID: 2408989
 * Class: Friday/12PM
 * ============================================================================
*/

// Storage key constants for managing order data in localStorage
const STORAGE_KEYS = {
	latestOrder: "latestOrder",
	orderHistory: "orderHistory"
};

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

// Return a default fallback order object with sample data
// Used when no order is stored in localStorage
function getFallbackOrder() {
	const now = new Date();
	return {
		id: "INV-000",
		createdAt: now.toISOString(),
		customer: {
			name: "Guest Customer",
			email: "guest@example.com",
			phone: "000-0000",
			address: "123 Sample Street",
			city: "Kingston",
			parish: "St. Andrew"
		},
		items: [
			{ id: "ltf-01", name: "Lattafa Yara", price: 8500, quantity: 1 },
			{ id: "ltf-02", name: "Lattafa Opulent Oud", price: 9200, quantity: 1 }
		],
		totals: null
	};
}

// Calculate order totals including subtotal, discount (10%), tax (15%), and final total
function calculateTotals(items) {
	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const discount = subtotal * 0.10;
	const taxable = subtotal - discount;
	const tax = taxable * 0.15;
	const total = taxable + tax;
	return { subtotal, discount, tax, total };
}

// Retrieve the latest order from localStorage, with error handling
// Returns fallback order if storage is empty or corrupted
function getLatestOrder() {
	try {
		const raw = localStorage.getItem(STORAGE_KEYS.latestOrder);
		if (raw) return JSON.parse(raw);
	} catch (err) {
		console.warn("Unable to read stored order", err);
	}
	return getFallbackOrder();
}

// Main function to render invoice data on the page
// Populates all invoice elements with order information and calculations
function renderInvoice() {
	const order = getLatestOrder();
	if (!order) return;

	const totals = order.totals || calculateTotals(order.items || []);

	// Retrieve all DOM elements where invoice data will be displayed
	const invoiceNumber = document.getElementById("invoiceNumber");
	const invoiceDate = document.getElementById("invoiceDate");
	const customerInfo = document.getElementById("customerInfo");
	const invoiceItems = document.getElementById("invoiceItems");

	// Populate invoice header information
	if (invoiceNumber) invoiceNumber.textContent = order.id || "INV-000";
	if (invoiceDate) invoiceDate.textContent = new Date(order.createdAt || Date.now()).toLocaleDateString();

	// Populate customer details
	if (customerInfo) {
		const c = order.customer || {};
		customerInfo.innerHTML = `
			<p>${c.name || "Guest"}</p>
			<p>${c.email || ""}</p>
			<p>${c.phone || ""}</p>
			<p>${c.address || ""}</p>
			<p>${[c.city, c.parish].filter(Boolean).join(", ")}</p>
		`;
	}

	// Generate table rows for each item in the order
	if (invoiceItems && Array.isArray(order.items)) {
		invoiceItems.innerHTML = order.items.map(item => {
			const itemTotal = item.price * item.quantity;
			const itemDiscount = itemTotal * 0.10;
			const itemSubtotal = itemTotal - itemDiscount;
			return `
			<tr>
				<td>${item.name}</td>
				<td>${item.quantity}</td>
				<td>${formatCurrency(item.price)}</td>
				<td>${formatCurrency(itemDiscount)}</td>
				<td>${formatCurrency(itemSubtotal)}</td>
			</tr>
		`;
		}).join("");
	}

	// Retrieve total calculation elements
	const subtotalEl = document.getElementById("invoiceSubtotal");
	const discountEl = document.getElementById("invoiceDiscount");
	const taxEl = document.getElementById("invoiceTax");
	const totalEl = document.getElementById("invoiceTotal");

	// Populate financial totals with formatted currency values
	if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal || 0);
	if (discountEl) discountEl.textContent = `- ${formatCurrency(totals.discount || 0)}`;
	if (taxEl) taxEl.textContent = formatCurrency(totals.tax || 0);
	if (totalEl) totalEl.textContent = formatCurrency(totals.total || 0);
}

// Render the invoice when the page has finished loading
document.addEventListener("DOMContentLoaded", renderInvoice);

function returnHome() {
    window.location.href = 'products.html';

	// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}
}


