/*global chrome*/

export function handleTime(time) {
  if (time === '' || isNaN(time)) {
    alert('valor timeout invalido');
  } else {
    let message = {field: "timeout", setBy: "popup", timeoutValue: time};
    chrome.runtime.sendMessage(message);
  }
}

export function setCaptureOnOff() {
  let allowCapture = document.querySelector("#allow_capture").checked;
  let message = {field: "allowCapture", setBy: "popup", allowCapture: allowCapture};
  chrome.runtime.sendMessage(message);
}

export function muteTabsOnOff() {
  let message = {field: "muteTabs"};
  chrome.runtime.sendMessage(message);
}

export function handleDashboard() {
  let message = {field: "dashboard"};
  chrome.runtime.sendMessage(message);
}

export function getUserProfile() {
  chrome.identity.getAuthToken({
    interactive: true
  }, token => {
    if (chrome.runtime.lastError) {
      alert(chrome.runtime.lastError.message);
      return;
    }

    const getUserData = new XMLHttpRequest();
    getUserData.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
    getUserData.onload = function() {
      console.log(getUserData.response);
    };
    getUserData.send();
});
}