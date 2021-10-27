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

export function getUserEmail() {
  return new Promise((resolve, reject) => {
    try {
      chrome.identity.getProfileUserInfo(async function(info) { 
        resolve(info.email)
      })
    }
    catch (ex) {
      reject(ex);
    }
  });
}
