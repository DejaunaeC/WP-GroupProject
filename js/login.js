let attempts = 3;

document.getElementById("loginForm").addEventListener("submit", loginUser);

function loginUser(e){
    e.preventDefault();

    let trn = document.getElementById("loginTrn").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    let validUser = users.find(user => user.trn === trn && user.password === password);

    if(validUser){
        alert("Login Successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } 
    else {
        attempts--;
        alert("Incorrect TRN or Password. Attempts left: " + attempts);

        if(attempts === 0){
            window.location.href = "locked.html"; // Redirect to locked page
        }
    }
} 