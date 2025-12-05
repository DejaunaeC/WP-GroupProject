// ============================================================================
// DASHBOARD.JS - User Dashboard Functions
// ============================================================================

// Question 7a: ShowUserFrequency() - Display user frequency by gender and age
function showUserFrequency() {
    // Get all registered users from localStorage
    const users = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    
    if (users.length === 0) {
        alert('No registered users found.');
        return;
    }
    
    // Initialize counters for gender
    const genderCount = { Male: 0, Female: 0, Other: 0 };
    
    // Initialize counters for age groups
    const ageGroups = {
        '18-25': 0,
        '26-35': 0,
        '36-50': 0,
        '50+': 0
    };
    
    const today = new Date();
    
    // Loop through all users and count by gender and age
    users.forEach(user => {
        // Count by gender
        if (genderCount.hasOwnProperty(user.gender)) {
            genderCount[user.gender]++;
        } else {
            genderCount.Other++;
        }
        
        // Calculate user's age
        const dob = new Date(user.dateofBirth);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        // Adjust age if birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        // Count by age group
        if (age >= 18 && age <= 25) {
            ageGroups['18-25']++;
        } else if (age >= 26 && age <= 35) {
            ageGroups['26-35']++;
        } else if (age >= 36 && age <= 50) {
            ageGroups['36-50']++;
        } else if (age > 50) {
            ageGroups['50+']++;
        }
    });
    
    // Display the charts
    displayFrequencyCharts(genderCount, ageGroups);
}

// Display frequency bar charts for gender and age
function displayFrequencyCharts(genderCount, ageGroups) {
    const container = document.getElementById('frequencyCharts');
    if (!container) return;
    
    // Find the maximum values for scaling bars
    const maxGender = Math.max(...Object.values(genderCount));
    const maxAge = Math.max(...Object.values(ageGroups));
    
    let html = '<div class="chart-container">';
    
    // ---- GENDER CHART ----
    html += '<h4>Users by Gender</h4>';
    html += '<div class="chart-section">';
    
    // Create a bar for each gender
    for (let gender in genderCount) {
        const count = genderCount[gender];
        const width = maxGender > 0 ? (count / maxGender) * 100 : 0;
        
        html += '<div class="bar-item">';
        html += '<div class="bar-label">';
        html += '<span>' + gender + '</span>';
        html += '<span class="bar-count">' + count + '</span>';
        html += '</div>';
        html += '<div class="bar-track">';
        html += '<div class="bar-fill" style="width: ' + width + '%"></div>';
        html += '</div>';
        html += '</div>';
    }
    html += '</div>';
    
    // ---- AGE GROUP CHART ----
    html += '<h4>Users by Age Group</h4>';
    html += '<div class="chart-section">';
    
    // Create a bar for each age group
    for (let group in ageGroups) {
        const count = ageGroups[group];
        const width = maxAge > 0 ? (count / maxAge) * 100 : 0;
        
        html += '<div class="bar-item">';
        html += '<div class="bar-label">';
        html += '<span>' + group + '</span>';
        html += '<span class="bar-count">' + count + '</span>';
        html += '</div>';
        html += '<div class="bar-track">';
        html += '<div class="bar-fill" style="width: ' + width + '%"></div>';
        html += '</div>';
        html += '</div>';
    }
    html += '</div>';
    html += '</div>';
    
    container.innerHTML = html;
}

// Question 7b: ShowInvoices() - Display all invoices in console
function showInvoices() {
    // Get all invoices from order history
    const invoices = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
    if (invoices.length === 0) {
        console.log('No invoices found.');
        alert('No invoices found in the system.');
        return;
    }
    
    // Display all invoices in console
    console.log('=== ALL INVOICES ===');
    invoices.forEach((invoice, index) => {
        console.log('\nInvoice #' + (index + 1) + ':');
        console.log('ID:', invoice.id);
        console.log('Date:', new Date(invoice.createdAt).toLocaleString());
        console.log('Customer:', invoice.customer?.name || 'N/A');
        console.log('Total:', 'JMD $' + (invoice.totals?.total?.toFixed(2) || '0.00'));
        console.log('Items:', invoice.items);
    });
    
    alert('Found ' + invoices.length + ' invoice(s). Check console for details.');
}

// Question 7c: GetUserInvoices() - Get invoices for current logged-in user
function getUserInvoices() {
    // Get current logged-in user's TRN from session
    const currentUserTRN = sessionStorage.getItem('currentUserTRN');
    
    if (!currentUserTRN) {
        alert('No user logged in.');
        return;
    }
    
    // Get all users and find the current user
    const users = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    const user = users.find(u => u.trn === currentUserTRN);
    
    if (!user) {
        alert('User not found.');
        return;
    }
    
    // Get user's invoices
    const userInvoices = user.invoices || [];
    
    if (userInvoices.length === 0) {
        console.log('No invoices found for TRN: ' + currentUserTRN);
        alert('No invoices found for this user.');
        return;
    }
    
    // Display user's invoices in console
    console.log('=== INVOICES FOR ' + user.firstName + ' ' + user.lastName + ' (TRN: ' + currentUserTRN + ') ===');
    userInvoices.forEach((invoice, index) => {
        console.log('\nInvoice #' + (index + 1) + ':');
        console.log('ID:', invoice.id);
        console.log('Date:', new Date(invoice.createdAt).toLocaleString());
        console.log('Total:', 'JMD $' + (invoice.totals?.total?.toFixed(2) || '0.00'));
        console.log('Items:', invoice.items);
    });
    
    alert('Found ' + userInvoices.length + ' invoice(s) for ' + user.firstName + '. Check console for details.');
}

// Logout function - clear session and return to login
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}

// Update cart badge when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update cart badge
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalItems = 0;
        
        // Count total items in cart
        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].quantity;
        }
        
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems === 0 ? 'none' : 'flex';
    }
});