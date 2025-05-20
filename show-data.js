document.getElementById('guestsAvailable').addEventListener('click', async () => {
    try {
      const res = await fetch('https://gh-98vt.onrender.com/api/get-guests'); // adjust port if needed
      const data = await res.json();

      const list = document.getElementById("guestContainer");
      list.innerHTML="";
      list.style.marginTop = "0px";
      list.style.textAlign = "left";

      if (data.length === 0) {
        list.style.marginTop = "50px";
        list.style.textAlign = "center";
        list.innerHTML = "<h3>No Guests Available..</h3>";
        return;
      }

        data.forEach(guest => {
          const toDate = guest.to ? guest.to : `<span style="color: green; font-weight: bold;">Available</span>`;
          const item = document.createElement('div');
          item.innerHTML = `
            <strong style="font-size:'32px'">Room No: </strong> <p style="font-size:'20px'">${guest.roomNo}</p><br>
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
        list.appendChild(item);
        });

        list.style.margin = '20px'; 

    } catch (err) {
      alert('Failed to fetch guests');
      console.error(err);
    }
  });

document.getElementById('guestsAll').addEventListener('click', async () => {
    try {
      const res = await fetch('https://gh-98vt.onrender.com/api/get-guestsAll'); // adjust port if needed
      const data = await res.json();

      const list = document.getElementById("guestContainer");
      list.innerHTML="";

      list.style.marginTop = "0px";
      list.style.textAlign = "left";

      if (data.length === 0) {
        list.style.marginTop = "50px";
        list.style.textAlign = "center";
        list.innerHTML = "<h3>No Guests Available..</h3>";
        return;
      }

        data.forEach(guest => {
          const toDate = guest.to ? guest.to : `<span style="color: green; font-weight: bold;">Available</span>`;
          const item = document.createElement('div');
          item.innerHTML = `
            <strong style="font-size:'32px'">Room No: </strong> <p style="font-size:'20px'">${guest.roomNo}</p><br>
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
        list.appendChild(item);
        });

        list.style.margin = '20px'; 

        document.body.appendChild(list);

    } catch (err) {
      alert('Failed to fetch guests');
      console.error(err);
    }
});
