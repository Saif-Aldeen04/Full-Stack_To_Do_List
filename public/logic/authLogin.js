// Get the login form element
const form = document.getElementById("loginForm");

// Add event listener for form submission
form.addEventListener("submit", async (e) => {
    // Prevent default form submission
    e.preventDefault();
    
    // Get and trim input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate inputs
    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    // Send login request to server
    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    // Parse response
    const data = await res.json();
    if (!data.success) {
        alert(data.message);
        return;
    }

    // Redirect to home page on successful login
    window.location.href = "/home";
});