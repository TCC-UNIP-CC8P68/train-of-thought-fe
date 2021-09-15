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