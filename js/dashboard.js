// Question 7a: ShowUserFrequency() - Display user frequency by gender and age
function showUserFrequency() {
    const users = getFromLocalStorage('RegistrationData') || [];
    
    if (users.length === 0) {
        alert('No registered users found.');
        return;
    }
    
    // Count by gender
    const genderCount = { Male: 0, Female: 0, Other: 0 };
    
    // Count by age group
    const ageGroups = {
        '18-25': 0,
        '26-35': 0,
        '36-50': 0,
        '50+': 0
    };
    
    const today = new Date();
    
    users.forEach(user => {
        // Count gender
        if (genderCount.hasOwnProperty(user.gender)) {
            genderCount[user.gender]++;
        } else {
            genderCount.Other++;
        }
        
        // Calculate age and categorize
        const dob = new Date(user.dateofBirth);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age >= 18 && age <= 25) ageGroups['18-25']++;
        else if (age >= 26 && age <= 35) ageGroups['26-35']++;
        else if (age >= 36 && age <= 50) ageGroups['36-50']++;
        else if (age > 50) ageGroups['50+']++;
    });
    
    // Display charts
    displayFrequencyCharts(genderCount, ageGroups);
}

// Display frequency bar charts
function displayFrequencyCharts(genderCount, ageGroups) {
    const container = document.getElementById('frequencyCharts');
    if (!container) return;
    
    const maxGender = Math.max(...Object.values(genderCount));
    const maxAge = Math.max(...Object.values(ageGroups));
    
    let html = '<div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 3px 15px rgba(0,0,0,0.05);">';
    
    // Gender chart
    html += '<h4 style="margin-bottom: 1rem; color: var(--rose-gold);">Users by Gender</h4>';
    html += '<div style="margin-bottom: 2rem;">';
    for (let gender in genderCount) {
        const count = genderCount[gender];
        const width = maxGender > 0 ? (count / maxGender) * 100 : 0;
        html += `
            <div style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <span>${gender}</span>
                    <span style="font-weight: 600;">${count}</span>
                </div>
                <div style="background: var(--light-gray); height: 30px; border-radius: 5px; overflow: hidden;">
                    <div style="background: var(--rose-gold); height: 100%; width: ${width}%; transition: width 0.5s;"></div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    
    // Age group chart
    html += '<h4 style="margin-bottom: 1rem; color: var(--rose-gold);">Users by Age Group</h4>';
    html += '<div>';
    for (let group in ageGroups) {
        const count = ageGroups[group];
        const width = maxAge > 0 ? (count / maxAge) * 100 : 0;
        html += `
            <div style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <span>${group}</span>
                    <span style="font-weight: 600;">${count}</span>
                </div>
                <div style="background: var(--light-gray); height: 30px; border-radius: 5px; overflow: hidden;">
                    <div style="background: var(--rose-gold); height: 100%; width: ${width}%; transition: width 0.5s;"></div>
                </div>
            </div>
        `;
    }
    html += '</div></div>';
    
    container.innerHTML = html;
}

// Question 7b: ShowInvoices() - Display all invoices
function showInvoices() {
    const invoices = getFromLocalStorage('orderHistory') || [];
    
    if (invoices.length === 0) {
        console.log('No invoices found.');
        alert('No invoices found in the system.');
        return;
    }
    
    console.log('=== ALL INVOICES ===');
    invoices.forEach((invoice, index) => {
        console.log(`\nInvoice #${index + 1}:`);
        console.log('ID:', invoice.id);
        console.log('Date:', new Date(invoice.createdAt).toLocaleString());
        console.log('Customer:', invoice.customer?.name || 'N/A');
        console.log('Total:', `JMD $${invoice.totals?.total?.toFixed(2) || '0.00'}`);
        console.log('Items:', invoice.items);
    });
    
    alert(`Found ${invoices.length} invoice(s). Check console for details.`);
}

// Question 7c: GetUserInvoices() - Get invoices for logged-in user
function getUserInvoices() {
    // Get current user's TRN from session or prompt
    const trn = prompt('Enter your TRN to view invoices:');
    
    if (!trn) {
        alert('TRN is required.');
        return;
    }
    
    const users = getFromLocalStorage('RegistrationData') || [];
    const user = users.find(u => u.trn === trn);
    
    if (!user) {
        alert('User not found with that TRN.');
        return;
    }
    
    const userInvoices = user.invoices || [];
    
    if (userInvoices.length === 0) {
        console.log(`No invoices found for TRN: ${trn}`);
        alert('No invoices found for this user.');
        return;
    }
    
    console.log(`=== INVOICES FOR TRN: ${trn} ===`);
    userInvoices.forEach((invoice, index) => {
        console.log(`\nInvoice #${index + 1}:`);
        console.log(invoice);
    });
    
    alert(`Found ${userInvoices.length} invoice(s) for this user. Check console for details.`);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}

// Update cart badge on page load
document.addEventListener('DOMContentLoaded', function() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const cart = getFromLocalStorage('cart') || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems === 0 ? 'none' : 'flex';
    }
});