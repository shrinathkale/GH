const memberCountInput = document.getElementById("memberCount");
const membersContainer = document.getElementById("membersContainer");

memberCountInput.addEventListener("input", () => {
    const count = parseInt(memberCountInput.value) || 0;
    membersContainer.innerHTML = "";

    for (let i = 1; i <= count; i++) {
        const memberFields = document.createElement("div");
        memberFields.classList.add("member");

        memberFields.innerHTML = `
          <h3>Member ${i}</h3>
          <input type="text" name="memberName${i}" placeholder="Member ${i} Name" value="" required>
          <input type="tel" name="memberPhone${i}" placeholder="Member ${i} Phone" value="">
        `;

        membersContainer.appendChild(memberFields);
    }
});

document.querySelector("button").addEventListener("click", async function() {
    const res = await fetch("http://localhost:3000/api/guests");
    const guests = await res.json();

    const container = document.getElementById("guestRequests");
    container.innerHTML = "";
    guests.forEach((guest, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <h3>Request #${index + 1}</h3>
          <p><strong>Company:</strong> ${guest.company}</p>
          <p><strong>Purpose:</strong> ${guest.purpose}</p>
          <p><strong>Stay:</strong> ${new Date(guest.checkIn).toDateString()} to ${new Date(guest.checkOut).toDateString()}</p>
          <p><strong>Members:</strong></p>
          <ul>
            ${guest.members.map(m => `<li>${m.name} - ${m.email} - ${m.phone}</li>`).join("")}
          </ul>
          <hr>`;
    container.appendChild(div);
    });
})