// login.js

document.getElementById("change-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(this);
  const oldUsername = formData.get("oldusername");
  const oldPassword = formData.get("oldpassword");
  const newPassword = formData.get("newpassword");
  const key = formData.get("key");

  const data = {
    oldUsername: oldUsername,
    oldPassword: oldPassword,
    newPassword: newPassword,
    key: key
  }


  try {
    const response = await fetch("http://localhost:3000/api/change", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      window.location.href = "index.html"; // redirect to dashboard
    } else {
      alert(result.error || "Change failed");
    }
  } catch (error) {
    alert("Server error or not reachable");
  }
});