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

async function postConfiguration(email, setBy, timeoutValue, allowCapture) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8085/configuration?email='+email, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email, 
        "setBy": setBy,
        "timeoutValue": timeoutValue,
        "allowCapture": allowCapture
      })
    }).then(response => response.json())
    .then(data => {
      resolve(data);
    });
  });
}

async function putConfiguration(email, setBy, timeoutValue, allowCapture) {
  fetch('http://localhost:8085/configuration?email='+email, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email, 
      "setBy": setBy,
      "timeoutValue": timeoutValue,
      "allowCapture": allowCapture
    })
  });
}

async function putConfigurationTimeout(email, setBy, timeoutValue) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8085/configuration/timeout?email='+email, {
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
    }).then(response => response.json())
    .then(data => {
      resolve(data[0]);
    });
  });  
}

async function putConfigurationAllowCapture(email, setBy, allowCapture) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8085/configuration/allowcapture?email='+email, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email, 
        "setBy": setBy,
        "allowCapture": allowCapture
      })
    }).then(response => response.json())
    .then(data => {
      resolve(data[0]);
    });
  });  
}

async function getConfiguration(email) {
  return new Promise((resolve, reject) => {
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
    .catch(error => console.error(error));
  });  
}

async function getUrlException(email) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8085/urlexception?email='+email, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      resolve(data);
    })
    .catch(error => console.error(error));  
  });  
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

async function getMetaTags(url) {
  try {
    const TAGS = [
      "title",
      "description",
      "strong"
    ]
    let x = new XMLHttpRequest();
    x.onreadystatechange = function() {
      if(this.readyState==4 && this.status==200) {
        let response = this.responseText;

        let metaTags = []
        for(let i=0;i<TAGS.length; i++) {
          let reg = "<"+TAGS[i]+".*?>(.*?)<\/"+TAGS[i]+">";
         
          let res = [... matchAll(response, reg)];
          if(res !== null) {
            for (let j=0; j < res.length; j++) {
              metaTags.push(res[j][0])
            }
          }            
        }
        console.log(JSON.stringify(metaTags))
      }
    }
    x.open("GET", url);
    x.send();
  } catch (error) {
    console.log(error)
  }
}