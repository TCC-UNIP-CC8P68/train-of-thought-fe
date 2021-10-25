/*global chrome*/

export function getUserToken() {
  return new Promise((resolve, reject) => {
    try {
      chrome.identity.getAuthToken({interactive: true}, token => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
          return false;
        }
        resolve(token);
      });
    } catch(error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function getUserProfileData() {
  const userToken = await getUserToken();
  
  return fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + userToken)
  .then(response => response.json())
  .then(responseData => responseData)
  .catch(error => console.log(error));
}

  /*
  let userToken;
  chrome.identity.getAuthToken({
    interactive: true
  }, token => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      return false;
    }

    userToken = token;
  });
  console.log(userToken)
  */
  /*
  let userData;
  const url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + token;
  fetch(url)
  .then(response => response.json())
  .then(responseData => {
    console.log(responseData)
    return userData = responseData
  }).catch(error => console.log(error));
  console.log('MERDA DE FETCH', userData);
  */
