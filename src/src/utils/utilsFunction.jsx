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
