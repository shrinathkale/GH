document.getElementById('update-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const data = {
    company: formData.get("company"),
    roomNo: formData.get('roomNo'),
    to: formData.get('leaveDate')
  };

  try{
    const response = await fetch(`https://gh-98vt.onrender.com/api/update-guest`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
    });

    const result = await response.json();
    if(response.ok) {
      alert(result.message);
    }
    else {
      alert(result.error);
    }
  }
  catch(error)  {
    console.error("Failed to load server",error);
  }  
});
