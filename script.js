
const adminCredentials = {
    username: "admin",
    password: "admin"
};

const encrypt = (data, key) => btoa(unescape(encodeURIComponent(data)));
const decrypt = (data, key) => decodeURIComponent(escape(atob(data)));

let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("authForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        showAdminPage();
    } else {
        const user = users.find(user => user.username === username && decrypt(user.password, "key") === password);
        if (user) {
            showUserPage();
        } else {
            alert("Invalid credentials!");
        }
    }
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    const encryptedPassword = encrypt(password, "key");
    users.push({ username, password: encryptedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert("User registered successfully!");
    showLoginPage();
});

document.getElementById("registerButton").addEventListener("click", function() {
    showRegisterPage();
});

document.getElementById("backToLogin").addEventListener("click", function() {
    showLoginPage();
});

function showAdminPage() {
    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("userPage").classList.add("hidden");
    document.getElementById("adminPage").classList.remove("hidden");

    const usersTable = document.getElementById("usersTable");
    usersTable.innerHTML = "";

    users.forEach(user => {
        const decryptedPassword = decrypt(user.password, "key");
        const row = `<tr><td>${user.username}</td><td>${decryptedPassword}</td></tr>`;
        usersTable.innerHTML += row;
    });
}

function showUserPage() {
    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("adminPage").classList.add("hidden");
    document.getElementById("userPage").classList.remove("hidden");
}

function showRegisterPage() {
    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("userPage").classList.add("hidden");
    document.getElementById("adminPage").classList.add("hidden");
    document.getElementById("registerPage").classList.remove("hidden");
}

function showLoginPage() {
    document.getElementById("authPage").classList.remove("hidden");
    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("userPage").classList.add("hidden");
    document.getElementById("adminPage").classList.add("hidden");
}
document.getElementById("backToLoginFromAdmin").addEventListener("click", function() {
    showLoginPage();
});

document.getElementById("toggleEncryption").addEventListener("click", function() {
    const button = document.getElementById("toggleEncryption");
    const usersTable = document.getElementById("usersTable");
    usersTable.innerHTML = "";

    if (button.textContent === "Show Encrypted Data") {
        users.forEach(user => {
            const row = `<tr><td>${user.username}</td><td>${user.password}</td></tr>`;
            usersTable.innerHTML += row;
        });
        button.textContent = "Show Decrypted Data";
    } else {
        users.forEach(user => {
            const decryptedPassword = decrypt(user.password, "key");
            const row = `<tr><td>${user.username}</td><td>${decryptedPassword}</td></tr>`;
            usersTable.innerHTML += row;
        });
        button.textContent = "Show Encrypted Data";
    }
});