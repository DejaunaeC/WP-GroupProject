document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const dateofBirth = document.getElementById("dateofBirth").value;
        const gender = document.getElementById("gender").value;
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const trn = document.getElementById("trn").value.trim();
        const username = document.getElementById("newusername").value.trim();
        const password = document.getElementById("newpassword").value;
        const confirmPassword = document.getElementById("confirmpassword").value;

        // 
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // 
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // 
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
        // 
        const trnPattern = /^\d{3}-\d{3}-\d{3}$/;

        if (!trnPattern.test(trn)) {
            alert("TRN must be in the format 000-000-000.");
            return;
        }

        
        let registrationData = JSON.parse(localStorage.getItem("RegistrationData")) || [];

        const trnExists = registrationData.some(user => user.trn === trn);

        if (trnExists) {
            alert("This TRN already exists. Please use a unique TRN.");
            return;
        }

        // 
        const registrationRecord = {
            firstName,
            lastName,
            dateofBirth,
            gender,
            phoneNumber,
            email,
            username,
            trn,
            password,
            dateOfRegistration: new Date().toISOString(),
            cart: {},
            invoices: []
        };

        registrationData.push(registrationRecord);
        localStorage.setItem("RegistrationData", JSON.stringify(registrationData));

        alert("Registration successful!");
        window.location.href = "products.html";
    });

    // Cancel Button
    const cancelBtn = document.querySelector("button[type='reset']");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            if (confirm("Clear all form data?")) {
                form.reset();
            }
        });
    }

});
