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

async function postConfiguration(email, setBy, timeoutValue) {
  fetch('http://localhost:8085/configuration?email='+email, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email, 
      "setBy": setBy,
      "timeoutValue": timeoutValue
    })
  });
}

async function putConfiguration(email, setBy, timeoutValue) {
  fetch('http://localhost:8085/configuration?email='+email, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email, 
      "setBy": setBy,
      "timeoutValue": timeoutValue
    })
  });
}

async function getConfiguration(email) {
  return new Promise((resolve, reject) => {
    try {
      fetch('http://localhost:8085/configuration?email='+email, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        resolve(data[0]);
      })
      .catch(error => console.error(error));}
    catch (ex) {
        reject(ex);
    }
  });  
}

async function getUrlException(email) {
  fetch('http://localhost:8085/urlexception?email='+email, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.error(error));  
}

async function verifyUrlException(email, url) {
  fetch('http://localhost:8085/verifyurlexception?userId='+email+'&url='+url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.error(error));  
}
