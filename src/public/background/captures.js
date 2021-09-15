async function postCapturedUrl(email, capturedUrl, momentOfCapture) {
  fetch('http://localhost:8085/capture', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "email": email,
      "capturedUrl": capturedUrl,
      "momentOfCapture": momentOfCapture
    })
  });
}