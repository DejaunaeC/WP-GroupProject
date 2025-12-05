document.getElementById("resetForm").addEventListener("submit", resetPassword);

function resetPassword(e){
    e.preventDefault();

    let trn = document.getElementById("resetTrn").value;
    let newPassword = document.getElementById("newPass").value;

    if(newPassword.length < 8){
        alert("Password must be at least 8 characters long.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    let userIndex = users.findIndex(user => user.trn === trn);

    if(userIndex === -1){
        alert("TRN not found.");
        return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("RegistrationData", JSON.stringify(users));

    alert("Password Successfully Reset!");

    window.location.href = "login.html";
}