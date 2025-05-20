(async () => {
  try {
    const res = await fetch('https://gh-pqpi.onrender.com/api/get-guests');
    const data = await res.json();

    // Define total beds for each room
    const totalBeds = {
      1: 1,
      2: 4,
      3: 3,
      4: 4,
      5: 3,
      6: 4,
      7: 1,
      8: 1,
      9: 0,
      10: 0,
      11: 1,
      12: 2,
      13: 3
    };

    // Initialize booked beds count
    const bookedBeds = {
      1: 1,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0
    };

    // Count booked beds based on guest data
    data.forEach(guest => {
      const roomNo = guest.roomNo;
      if (bookedBeds.hasOwnProperty(roomNo)) {
        bookedBeds[roomNo] += guest.memberCount;
      }
    });

    const tableBody = document.getElementById("vaccancyTable").getElementsByTagName("tbody")[0];

    let totalCount = 0;
    let bookedCount = 0;
    let availableCount = 0;
    // Insert rows dynamically
    for (const roomNo in totalBeds) {
      const total = totalBeds[roomNo];
      const booked = bookedBeds[roomNo];
      const available = total - booked;

      const row = tableBody.insertRow();

      if(booked == 0 && total != 0){
        row.insertCell(0).innerHTML = `<strong style="font-weight:'bold'; color:green;">Room No ${roomNo}</strong>`;
      }
      else {
        row.insertCell(0).innerHTML = `Room No ${roomNo}`;
      }
      row.insertCell(1).innerText = total;
      row.insertCell(2).innerText = booked;
      row.insertCell(3).innerText = available;

      totalCount += total;
      bookedCount += booked;
      availableCount += available;
    }

    const rows = tableBody.insertRow();
    rows.insertCell(0).innerHTML = `<strong style="font-weight:'bold'">Total</strong>`;
    rows.insertCell(1).innerHTML = `<strong style="font-weight:'bold'">${totalCount}</strong>`;
    rows.insertCell(2).innerHTML = `<strong style="font-weight:'bold'">${bookedCount}</strong>`;
    rows.insertCell(3).innerHTML = `<strong style="font-weight:'bold'">${availableCount}</strong>`;

  } catch (err) {
    alert('Failed to fetch guests');
    console.error(err);
  }
})();
