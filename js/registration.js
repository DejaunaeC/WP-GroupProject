document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prevent default submit so we can validate
    
        // Collect form data
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const dateofBirth = document.getElementById("dateofBirth").value;
        const gender = document.getElementById("gender").value;
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("newpassword").value;
        const confirmPassword = document.getElementById("confirmpassword").value;
    
        // -------------------------------------------
        // 1. HTML Required Fields Already Validate
        // -------------------------------------------
    
        // -------------------------------------------
        // 2. Password length check
        // -------------------------------------------
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
    
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
    
        // -------------------------------------------
        // 3. Calculate age to ensure visitor is over 18
        // -------------------------------------------
        const today = new Date();
        const dob = new Date(dateofBirth);
    
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
    
        if (age < 18) {
            alert("You must be at least 18 years old to register.");
            return;
        }
    
        // -------------------------------------------
        // 4. TRN Format Validation (000-000-000)
        // -------------------------------------------
        const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    
        if (!trnPattern.test(trn)) {
            alert("TRN must be in the format 000-000-000.");
            return;
        }
    
        // -------------------------------------------
        // 5. TRN must be unique (Check localStorage)
        // -------------------------------------------
        let registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    
        const trnExists = registrationData.some(user => user.trn === trn);
    
        if (trnExists) {
            alert("This TRN already exists. Please use a unique TRN.");
            return;
        }
    
        // -------------------------------------------
        // 6. Store registration info as an object
        // -------------------------------------------
        const registrationRecord = {
            firstName,
            lastName,
            dateofBirth,
            gender,
            phoneNumber,
            email,
            trn,                      // used instead of username
            password,
            dateOfRegistration: new Date().toISOString(),
            cart: {},
            invoices: []
        };
    
        // Append to localStorage array
        registrationData.push(registrationRecord);
        localStorage.setItem("RegistrationData", JSON.stringify(registrationData));
    
        alert("Registration successful!");
        location = 'products.html';
    });
    
    // -------------------------------------------
    // 7. CANCEL BUTTON (Clear the form)
    // -------------------------------------------
    const cancelBtn = document.querySelector("button[type='reset']");
    cancelBtn.addEventListener("click", () => {
        if (confirm("Clear all form data?")) {
            form.reset();
        }
    });

});
