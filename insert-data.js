document.getElementById('guest-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  
  const memberCount = formData.get("memberCount");
  memberarray=[];

  for(let i=1;i<=memberCount;i++) {
    memberdata = {
      name: formData.get(`memberName${i}`),
      phone: formData.get(`memberPhone${i}`),
    }
    memberarray.push(memberdata)
  }

  const data = {
    members: memberarray,
    memberCount: memberCount,
    company: formData.get('company').toLowerCase().trim(),
    purpose: formData.get('purpose'),
    from: formData.get('checkIn'),
    to: formData.get('checkOut'),
    roomNo: formData.get('roomNo'),
    officer: formData.get('officer').toLowerCase().trim(),
  };

  const response = await fetch('https://gh-98vt.onrender.com/api/submit-guest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.message);
});
