document.getElementById('searchBtn').addEventListener('click', async () => {
  const option = document.getElementById('searchOption').value;
  const value = document.getElementById('searchInput').value.toLowerCase().trim();
  const result = document.getElementById('result');

  result.innerHTML = ""; // clear previous results

  if (!value) {
    result.innerHTML = "<p>Please enter a value to search.</p>";
    return;
  }

  try {
    const res = await fetch('https://gh-98vt.onrender.com/api/get-guestsAll');
    const data = await res.json();

    const matchedGuests = data.filter(guest => {
      switch (option) {
        case 'company':
          return guest.company.toLowerCase().includes(value);
        case 'roomNo':
          return guest.roomNo.toString().toLowerCase().includes(value);
        case 'name':
          return guest.members.some(member => member.name.toLowerCase().includes(value));
        case 'date':
            const enteredDate = new Date(value);
            const fromDate = new Date(guest.from);
            const toDate = guest.to ? new Date(guest.to) : null;

            return fromDate <= enteredDate && (!toDate || enteredDate <= toDate);
        case 'officer':
          return guest.officer?.toLowerCase().includes(value);
        default:
          return false;
      }
    });

    if (matchedGuests.length === 0) {
      result.style.marginTop = "50px";
      result.style.textAlign = "center";
      result.innerHTML = "<h3>No Matching Guests Found.</h3>";
      return;
    }

    matchedGuests.forEach(guest => {
      const toDate = guest.to ? guest.to : `<span style="color: green; font-weight: bold;">Available</span>`;
      const item = document.createElement('div');
      item.innerHTML = `
        <strong>Room No:</strong><p> ${guest.roomNo}</p><br>
        <strong>No of members:</strong> ${guest.members.length}<br>
        <strong>Company:</strong> ${guest.company}<br>
        <strong>From:</strong> ${guest.from}<br>
        <strong>To:</strong> ${toDate}<br>
        <strong>Purpose:</strong> ${guest.purpose}<br>
        <strong>Recommending Officer:</strong> ${guest.officer}<br>
        <strong>Members:</strong><br>
        <ul>
          ${guest.members.map(member => `
            <li>
              Name: ${member.name}<br>
              Phone: ${member.phone}
            </li>
          `).join('')}
        </ul>
        <hr>
      `;
      result.appendChild(item);
    });

    result.style.margin = '20px';
    result.style.textAlign = 'left'

  } catch (err) {
    alert('Failed to fetch guests');
    console.error(err);
  }
});
