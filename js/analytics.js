/* ============================================================================
 * Member: Nathan-Neil Shelly - Member 3 (invoice, checkout and analytics)
 * Student ID: 2408989
 * Class: Friday/12PM
 * ============================================================================

// Storage key constant for accessing order history from localStorage
const ANALYTICS_KEYS = {
	orderHistory: "orderHistory"
};

// Format a number as a currency string in Jamaican Dollars
function formatCurrency(amount) {
	return `JMD $${amount.toFixed(2)}`;
}

// Retrieve order history from localStorage with error handling
// Returns empty array if storage is empty or corrupted
function getOrderHistory() {
	try {
		const raw = localStorage.getItem(ANALYTICS_KEYS.orderHistory);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch (err) {
		console.warn("Unable to read order history", err);
		return [];
	}
}

// Calculate key analytics metrics from order history
// Returns order count, total sales, average order value, and top-selling product
function calculateAnalytics() {
	const orders = getOrderHistory();
	const orderCount = orders.length;
	// Sum all order totals to get total sales revenue
	const totalSales = orders.reduce((sum, order) => sum + (order.totals?.total || 0), 0);
	// Calculate average revenue per order
	const avgOrder = orderCount ? totalSales / orderCount : 0;

	// Build a map of product names to total quantities sold
	const productTotals = new Map();
	orders.forEach(order => {
		(order.items || []).forEach(item => {
			const current = productTotals.get(item.name) || 0;
			productTotals.set(item.name, current + item.quantity);
		});
	});

	// Find the product with the highest total quantity sold
	let topProduct = null;
	productTotals.forEach((qty, name) => {
		if (!topProduct || qty > topProduct.quantity) {
			topProduct = { name, quantity: qty };
		}
	});

	return { orders, orderCount, totalSales, avgOrder, topProduct };
}

// Display analytics metrics on the page
function renderAnalytics() {
	const { orderCount, totalSales, avgOrder, topProduct } = calculateAnalytics();

	// Retrieve all DOM elements where analytics will be displayed
	const totalSalesEl = document.getElementById("analyticsTotalSales");
	const orderCountEl = document.getElementById("analyticsOrderCount");
	const avgOrderEl = document.getElementById("analyticsAvgOrder");
	const topProductEl = document.getElementById("analyticsTopProduct");

	// Populate analytics elements with calculated values
	if (totalSalesEl) totalSalesEl.textContent = formatCurrency(totalSales);
	if (orderCountEl) orderCountEl.textContent = `${orderCount}`;
	if (avgOrderEl) avgOrderEl.textContent = formatCurrency(avgOrder);
	if (topProductEl) {
		topProductEl.textContent = topProduct ? `${topProduct.name} (${topProduct.quantity})` : "N/A";
	}
}

// Log analytics metrics to browser console for debugging and monitoring
function logAnalytics() {
	const { orderCount, totalSales, avgOrder, topProduct } = calculateAnalytics();
	console.info("[Analytics] Orders:", orderCount);
	console.info("[Analytics] Total Sales:", formatCurrency(totalSales));
	console.info("[Analytics] Average Order:", formatCurrency(avgOrder));
	if (topProduct) console.info("[Analytics] Top Product:", `${topProduct.name} (${topProduct.quantity})`);
}

// Initialize analytics when page loads: render metrics and log to console
document.addEventListener("DOMContentLoaded", () => {
	renderAnalytics();
	logAnalytics();
});

