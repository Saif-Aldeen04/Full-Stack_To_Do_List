// Get the signup form element
const form = document.getElementById("signupForm");

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

    // Send signup request to server
    const res = await fetch("/sign_up", {
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

    // Redirect to home page on successful signup
    window.location.href = "/home";
});