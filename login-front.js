// login.js

document.getElementById("in-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(this);
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch("https://gh-pqpi.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      window.location.href = "insert-front.html"; // redirect to dashboard
    } else {
      alert(result.error || "Login failed");
    }
  } catch (error) {
    alert("Server error or not reachable");
  }
});
